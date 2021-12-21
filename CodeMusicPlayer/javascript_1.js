const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const nextSongBtn = $('.btn-next')
const prevSongBtn = $('.btn-prev')
const randomSongBtn = $('.btn-random')
const repeatSongBtn = $('.btn-repeat')
var listSongIndexRandomed =[]
var songsApi = 'http://localhost:3000/songs'


const app = {
    currentSongIndex: 0,
    isplaying: false,
    israndom: false,
    isautorepeatsong: false,

    render() {
        const htmls_playlist = this.songs.map((song) => {
            return `
                <div class="song" id="${song.id}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                        <div class="optionbox">
                            <div class="deleteBtn">Xóa</div>
                        </div>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls_playlist.join('')
    },

    defineProperties(songs) {
        this.songs = songs
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentSongIndex]
            }
        })
        
    },
    handleEvents() {
        var cdWidth = cd.offsetWidth

        // Xử lí phóng to/ thu nhỏ cd
        document.onscroll = () =>{
            const scrollTop = window.scrollY
            const newcdWidth = cdWidth - scrollTop
            cd.style.width = newcdWidth < 0 ? 0: newcdWidth + 'px'
            cd.style.opacity = newcdWidth / cdWidth
        }

        // Xử lí khi click play
        playBtn.onclick = () => {
            if(app.isplaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Xử lý cd quay/ dừng
        const cdRotate = cdThumb.animate([
            //keyframes
            { transform: 'rotate(360deg)' }
        ],{
            iterations: Infinity,
            duration: 5000
        })
        cdRotate.pause()

        // Khi bai hat dc play
        audio.onplay = () => {
            this.isplaying = true
            player.classList.add('playing')
            cdRotate.play()
            this.scrollToActiveSong()
        }

        // khi bai hat bi pause
        audio.onpause = () => {
            this.isplaying = false
            player.classList.remove('playing')
            cdRotate.pause()
        }
        
        // khi tien do bai hat thay doi
        audio.ontimeupdate = () => {
            const progressPecent = audio.currentTime / audio.duration * 100
            if (audio.currentTime) {
                progress.value = progressPecent
            }
        }
        progress.onchange = () => {
            audio.currentTime = progress.value /100 * audio.duration
        }
        
        // Next song
        nextSongBtn.onclick = () => {
            if (this.israndom) {
                this.randomSong()
            } else this.nextSong()
        }

        // Previous song
        prevSongBtn.onclick = () => {
            if (this.israndom) {
                this.randomSong()
            } else this.prevSong()
        }

        // Bật / tắt repeatSongBtn
        repeatSongBtn.onclick = () => {
            this.isautorepeatsong = repeatSongBtn.classList.toggle('active')
            if (this.israndom) {this.israndom = randomSongBtn.classList.toggle('active')}
        }

        // Bật / tắt Random song
        randomSongBtn.onclick = () => {
            this.israndom = randomSongBtn.classList.toggle('active')
            if (this.isautorepeatsong) {this.isautorepeatsong = repeatSongBtn.classList.toggle('active')}
        }

        // Xử lí auto next/repeat/random song
        audio.onended = () => {
            if (this.isautorepeatsong) {
                audio.play()
            } else if (this.israndom) {
                this.randomSong()
            } else this.nextSong()
        }

    },
    // Xử lý optionBtn
    optionBtn() {
        const options = $$('.option')
        options.forEach(option => {
            option.onclick = () => {
                const optionbox = option.querySelector('.optionbox')
                optionbox.classList.toggle('active')
                optionbox.animate([
                    {opacity: 0},
                    {opacity: 1}               
                ],{
                    duration: 300
                })
            }
        })
    },
    // Chon 1 song / Xoa 1 song
    songSelector_Deletor() {
        $$('.song').forEach((song, index) => { 
            song.onclick = (event) => {
                if (event.target.classList[0] != 'option' 
                    && event.target.classList[0] != 'fas'
                    && event.target.classList[0] != 'optionbox'
                    && event.target.classList[0] != 'deleteBtn') {
                    this.currentSongIndex = index
                    this.loadcurrentSongAfterEvents()
                    audio.play()
                    song.animate([
                        {opacity: 0},
                        {opacity: 1}               
                    ],{
                        duration: 300
                    })

                } else {
                    song.querySelector('.optionbox').onclick = () => {
                        audio.pause()
                        var option = {
                            method: 'DELETE',
                        }
                        fetch(songsApi + '/' + song.id, option)
                            .then(() => fetch(songsApi))
                            .then(response => response.json())
                            .then((listsongs => {
                                this.songs = listsongs
                                song.remove()
                                this.songSelector_Deletor()
                            }))    
                    }                        
                }
            }
        })
    },

    nextSong() {
        this.currentSongIndex++
        this.currentSongIndex = this.currentSongIndex == this.songs.length ? 0: this.currentSongIndex
        this.loadcurrentSongAfterEvents()
    },
    prevSong() {
        if (this.currentSongIndex - 1  >= 0) {
            this.currentSongIndex--
            this.loadcurrentSongAfterEvents()
        }
    },
    randomSong() {
        listSongIndexRandomed.push(this.currentSongIndex)
        if (listSongIndexRandomed.length < this.songs.length) {
            do {
                this.currentSongIndex = Math.round(Math.random() * (this.songs.length - 1)) 
            } while (listSongIndexRandomed.some((songIndex => songIndex === this.currentSongIndex)))    
            this.loadcurrentSongAfterEvents()
        } else {
            listSongIndexRandomed = []
            this.randomSong()
        }
    },
    scrollToActiveSong() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({block: "center", behavior: "smooth"})
        },500)
    },
    loadcurrentSongAfterEvents() {
        if ($('.song.active')) {
            $('.song.active').classList.remove('active')
        }
        this.loadcurrentSong()
        audio.play()
    },

    loadcurrentSong() {
        heading.innerHTML = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
        $$('.song')[this.currentSongIndex].classList.add('active')
    },
            
    start() {
        fetch(songsApi)
            .then(response => response.json())
            .then(listsongs =>  {
                // Định nghĩa thuộc tính (flex) cho object
                this.defineProperties(listsongs)

                // Render ra playlist
                this.render()

                // load currentsong
                this.loadcurrentSong()

                // Xử lý khi lắng nghe các sự kiện
                this.handleEvents()

                // Xử lý khi chọn / xóa bài hát( tách ra khỏi handleEvents để tránh conflict khi xóa bài)
                this.songSelector_Deletor()
                this.optionBtn()
                
            })
    }                
}
app.start()
window.onload = () => {
    console.log('hihi');
}
