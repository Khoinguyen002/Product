const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
var currentSongIndex = 0

const app = {
    firstSongIndex: 0,
    songs: [
        {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "./asset/Ái Nộ - Masew, Khôi Vũ.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
            id: 'song_0'
        },
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./asset/Sài Gòn Hôm Nay Mưa - JSOL, Hoàng Duyên.mp3",
            image: "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
            id: 'song_1'
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path: "./asset/Đường Tôi Chở Em Về - Bùi Trường Linh.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
            id: 'song_2'
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./asset/Ái Nộ - Masew, Khôi Vũ.mp3",
            image: "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
            id: 'song_3'
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "./asset/Ái Nộ - Masew, Khôi Vũ.mp3",
            image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
            id: 'song_4'
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path: "./asset/Ái Nộ - Masew, Khôi Vũ.mp3",
            image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
            id: 'song_5'
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./asset/Ái Nộ - Masew, Khôi Vũ.mp3",
            image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
            id: 'song_6'
        }
    ],
    render() {
        const htmls_playlist = this.songs.map(song => {
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
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls_playlist.join('')
        
    },
    defineProperties() {
        // Object.defineProperty(this, 'currentSong', {
        //     get() {
        //         return {name: 'Khoi'}
        //     }
        // })
        this.firstSong = this.songs[this.firstSongIndex]
        
    },
    handleEvents() {
        const cd = $('.cd')
        const songs = $$('.song')
        var cdWidth = cd.offsetWidth     
        document.onscroll = () =>{
            const scrollTop = window.scrollY
            const newcdWidth = cdWidth - scrollTop
            cd.style.width = newcdWidth < 0 ? 0: newcdWidth + 'px'
            cd.style.opacity = newcdWidth / cdWidth
        }

        songs.forEach(function(song, index) {
            song.onclick = () => {
                $('.cd-thumb').style.backgroundImage = song.querySelector('.thumb').style.backgroundImage
                $('h2').innerHTML = song.querySelector('.title').innerHTML
                $('#audio').attributes[1].value = app.songs[index].path
                $('.song.active').classList.remove('active')
                song.classList.add('active')
                $('#audio').play()
                $('.player').classList.add('playing')
                currentSongIndex = index
            }
        })
        
    },
    loadFirstSong() {
        $('h2').innerHTML = this.firstSong.name
        $('.cd-thumb').style.backgroundImage = `url(${this.firstSong.image})`
        $('#audio').attributes[1].value = this.firstSong.path
        $('.song').classList.add('active')
    },
    songController() {
        // Start
        $('.fas.fa-play').onclick = () => {
            $('#audio').play()
            $('.player').classList.add('playing')
        }
        // Pause
        $('.fas.fa-pause').onclick = () => {
            $('#audio').pause()
            $('.player').classList.remove('playing')
        }
        // NextSong
        $('.btn.btn-next').onclick = () => {
            // $('h2').innerHTML = song.querySelector('.title').innerHTML
            // $('#audio').src = this.songs[currentSongIndex += 1].path
            $('#audio').attributes[1].value = this.songs[currentSongIndex += 1].path
            // $('.song.active + .song').classList.add('active')
            $(`#song_${currentSongIndex}`).classList.add('active')
            $('.song.active').classList.remove('active')
            $('#audio').play()
            $('.player').classList.add('playing')
            $('h2').innerHTML = $(`#song_${currentSongIndex}`).querySelector('.title').innerHTML
            $('.cd-thumb').style.backgroundImage = $(`#song_${currentSongIndex}`).querySelector('.thumb').style.backgroundImage
        }
        // PreviousSong
        $('.btn.btn-prev').onclick = () => {
            $('#audio').attributes[1].value = this.songs[currentSongIndex -= 1].path
            $('.song.active').classList.remove('active')
            $(`#song_${currentSongIndex}`).classList.add('active')
            $('#audio').play()
            $('.player').classList.add('playing')
            $('h2').innerHTML = $(`#song_${currentSongIndex}`).querySelector('.title').innerHTML
            $('.cd-thumb').style.backgroundImage = $(`#song_${currentSongIndex}`).querySelector('.thumb').style.backgroundImage
        }
        // Reload
        $('.btn.btn-repeat').onclick = () => {
            $('#audio').currentTime = 0
            $('#audio').play()
        }
        // Random
        $('.btn.btn-random').onclick = () => {
            const randomSongIndex = Math.round(Math.random() * (this.songs.length - 1))
            $('#audio').attributes[1].value = this.songs[randomSongIndex].path
            $('.song.active').classList.remove('active')
            $(`#song_${randomSongIndex}`).classList.add('active')
            $('#audio').play()
            $('.player').classList.add('playing')
            currentSongIndex = randomSongIndex
        }
        // Progress
        $('#audio').currentTime.onchange =() => {
            $('.progress').value = $('#audio').currentTime
        }
            
         
        
        
    },
    start() {
        this.defineProperties()
        this.render()
        this.loadFirstSong()
        this.handleEvents()
        this.songController()
        
    }

}
app.start()
console.log($('.progress').value)
console.log($('#audio').currentTime)