$(function () {
    const state = {
        Lang: '',
        Country: '',
        Keyword: '',
        From: '',
        To: '',
    }
    // Định nghĩa các function

    function getData(state) {
        // https://gnews.io/api/v4/top-headlines?token=7ef01a451ca9ee02ba988f508ee90719 headline
        // https://gnews.io/api/v4/search?q=example&token=7ef01a451ca9ee02ba988f508ee90719  search

        // https://gnews.io/api/v4/top-headlines?token=586cfe15d5406bee538dc2fef959da8f headline
        // https://gnews.io/api/v4/search?q=example&token=586cfe15d5406bee538dc2fef959da8f  search
        
        // https://gnews.io/api/v4/top-headlines?token=e3dd236907f92c644cf4c7ac29d4d930 headline
        // https://gnews.io/api/v4/search?q=example&token=e3dd236907f92c644cf4c7ac29d4d930  search
        if (state) {
            const { Lang, Country, Keyword, From, To } = state
            return (
                $.ajax(`https://gnews.io/api/v4/search?q=${Keyword ? Keyword : 'None'}&from=${From ? From : 'None'}&to=${To ? To : 'None'}&lang=${Lang ? Lang : 'Any'}&country=${Country ? Country : 'Any'}&token=e3dd236907f92c644cf4c7ac29d4d930`,
                    {
                        beforeSend: () => $('section').html(`
                            <div class="text-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        `),
                        error: (status) => $('section').html(`
                            <div class="text-center">
                                <h1>Error ${status.status}<h1>
                            </div>
                        `)
                    })
            )
        } else {
            return (
                $.ajax('https://gnews.io/api/v4/top-headlines?token=e3dd236907f92c644cf4c7ac29d4d930',
                    {
                        beforeSend: () => $('section').html(`
                            <div class="text-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        `),
                        error: (status) => $('section').html(`
                            <div class="text-center">
                                <h1>Error ${status.status}<h1>
                            </div>
                        `)
                    })
            )
        }
    }
    function preRender() {
        getData()
            .then((data) => data.articles)
            .then((data) => {
                $('section').html(`
                <div id="slider">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active"></div>
                            <div class="carousel-item"></div>
                            <div class="carousel-item"></div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    </div>
                    <div id="content">
                        <div class="container">
                            <div class="line">
                                <div class="title">Breaking News!</div>
                            </div>
                            <div class="row g-3"></div>
                        </div>
                </div>
            `)
                $('.carousel-item').each((i, item) => {
                    let d = new Date(data[i].publishedAt)
                    let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
                    item.innerHTML = `
                    <div class="news-content">
                        <div class="info">
                            <a href="${data[i].url}" target="_blank">
                                <h2>${data[i].title}</h2>
                            </a>
                            <p>${time}</p>
                            <p>${data[i].description}</p>
                        </div>
                    </div>
                    `
                    const bgImg = document.createElement('div')
                    bgImg.setAttribute('style', `background-image: url(${data[i].image}); height: ${$('.carousel-item').height() - $('.info').outerHeight()}px`)
                    bgImg.setAttribute('class', "backgroundContent")
                    bgImg.setAttribute('alt', `alt="${data[i].source.name}`)
                    $('.news-content')[i].appendChild(bgImg)

                })
                $("#content .row").html(
                    data.map((item, i) => {
                        if (i > 2) {
                            let d = new Date(item.publishedAt)
                            let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
                            return `
                            <div class="col-lg-4 col-md-6 col-xl-3">
                                <div class="card">
                                    <a href="${item.url}" target="_blank">
                                        <img src="${item.image}" class="card-img-top" alt="${item.source.name}">
                                        <div class="card-body">
                                            <h5 class="card-title">${item.title}</h5>
                                            <p>${time}</p>
                                            <p class="card-text">${item.description}</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        `
                        }
                    }).join('')
                )
                $('section').hide()
                $('section').fadeIn()
            })
    }

    function signInRender() {
        $('section').html(`
            <div class="logIn">
                <div class="container">
                    <div class="d-flex justify-content-center h-100">
                        <div class="card">
                            <div class="card-header">
                                <h3>Sign In</h3>
                                <div class="d-flex justify-content-end social_icon">
                                    <span><i class="fab fa-facebook-square"></i></span>
                                    <span><i class="fab fa-google-plus-square"></i></span>
                                    <span><i class="fab fa-twitter-square"></i></span>
                                </div>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input id="username" type="text" class="form-control error" placeholder="username" name="username">
                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input id="password" type="password" class="form-control" placeholder="password" name="password">
                                    </div>
                                    <div class="row align-items-center remember">
                                        <input type="checkbox">Remember Me
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" value="Login" class="btn float-right login_btn">
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-center links">
                                    Don't have an account?<a class="signUpA" href="#">Sign Up</a>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <a href="#">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        $(".card-body form").validate({
            rules: {
                username: 'required',
                password: 'required'
            },
            submitHandler: (form) => {
                console.log($(form).serializeArray())
                $('.input-group input').val('')
            }
        })
        $('.signUpA').click(function () {
            signUpRender()
        })
        $('section').hide()
        $('section').fadeIn()
    }

    function signUpRender() {
        $('section').html(`
            <div class="signUp">
                <div class="container">
                    <div class="d-flex justify-content-center h-100">
                        <div class="card">
                            <div class="card-header">
                                <h3>Sign Up</h3>
                                <div class="d-flex justify-content-end social_icon">
                                    <span><i class="fab fa-facebook-square"></i></span>
                                    <span><i class="fab fa-google-plus-square"></i></span>
                                    <span><i class="fab fa-twitter-square"></i></span>
                                </div>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input id="username" type="text" class="form-control error" placeholder="username" name="username">
                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa-solid fa-envelope"></i></i></span>
                                        </div>
                                        <input id="email" type="email" class="form-control" placeholder="email" name="email">
                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input id="password" type="password" class="form-control" placeholder="password" name="password">
                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input id="password_confirmation" type="password" class="form-control" placeholder="password confirmation" name="password_confirmation">
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" value="SignUp" class="btn float-right login_btn">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        $(".card-body form").validate({
            rules: {
                username: "required",
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    validatePassword: true,
                },
                password_confirmation: {
                    required: true,
                    validateConfirmPassword: "#password",
                }
            },
            messages: {
                username: "Please enter your name!",
                password: {
                    required: "Please provide a password!",
                    validatePassword: "Password must have 8 to 16 characters including uppercase, lowercase and at least one number.",
                },
                password_confirmation: {
                    required: "Please provide a password!",
                    validateConfirmPassword: "Password does not match!"
                },
                email: {
                    required: "Please enter your email!",
                    email: "Please enter correct form email!"
                }
            },
            // submitHandler: function (form) {
            //     console.log($(form).serializeArray());
            //     $('.input-group input').val('')
            // }
        })
        $.validator.addMethod("validatePassword", function (value, element) {
            return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(value)
        })
        $.validator.addMethod("validateConfirmPassword", function (value, element, param3) {
            return this.optional(element) || $(param3).val() === value
        })
        $('section').hide()
        $('section').fadeIn()
    }

    function searchRender(state) {
        getData(state)
            .then((data) => data.articles)
            .then((data) => {
                $('section').html(`
                    <div class="container">
                        <div class="line">
                            <div class="title">Breaking News!</div>
                        </div>
                    </div>`+
                    data.map(item => {
                        const d = new Date(item.publishedAt)
                        const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
                        return `
                        <div class="container">
                            <div class="new-item">
                                <div class="image"
                                    style="background-image: url(${item.image});
                                        background-size: cover;
                                        background-repeat: no-repeat;"
                                >
                                </div>
                                <div class="info">
                                    <div class="new-item-content">
                                        <div class="description">
                                            <a href="${item.url}" target="_blank">
                                                <h5>${item.title}</h5>
                                            </a>
                                            <p>${time}</p>
                                            <p>${item.content}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <div class="line" style="opacity: 0.2"></div>
                        </div>
                        `
                    }).join('')
                )
                $('section').hide()
                $('section').fadeIn()
            })
    }
    
    // Khởi tạo DatePicker
    const getDatePickerTitle = elem => {
        // From the label or the aria-label
        const label = elem.nextElementSibling;
        let titleText = '';
        if (label && label.tagName === 'LABEL') {
            titleText = label.textContent;
        } else {
            titleText = elem.getAttribute('aria-label') || '';
        }
        return titleText;
    }

    const elems = document.querySelectorAll('.datepicker_input');
    for (const elem of elems) {
        const datepicker = new Datepicker(elem, {
            'format': 'yyyy/mm/dd', // UK format
            title: getDatePickerTitle(elem)
        });
    }

    
    // stick subNav 
    $(window).scroll(() => {
        if (window.scrollY >= 150) {
            $('.subNav').css('position', 'fixed')
            $('.subNav').css('top', '0px')
        } else {
            $('.subNav').css('position', 'relative')
        }
    })
    
    
    // Xử lý khi người dùng tìm kiếm
    $('.dropdown-menu a').click(function (e) {
        state[$(this).parent().attr('name')] = this.name
        $(this).parent().parent().children()[0].innerText = $(this).text() == "None" ? $(this).parent().attr('name') : $(this).text()
        searchRender(state)
    })

    $('.d-flex button').click(function () {
        $('.d-flex input').each((i, item) => {
            const num = Math.round(Math.random() * 23)
            const random = num < 10 ? '0' + num : num
            switch (i) {
                case 0:
                    state.Keyword = item.value.trim().replaceAll(' ','+')
                    break
                case 1:
                    state.From = item.value ? item.value.split('/').reduce((acc, letter) => {
                        return acc + "-" + letter
                    }) + 'T' + random + ':59:59Z' : ''
                    break
                case 2:
                    state.To = item.value ? item.value.split('/').reduce((acc, letter) => {
                        return acc + "-" + letter
                    }) + 'T' + random + ':59:59Z' : ''
            }
            item.value = ''
        })
        searchRender(state)
    })

    // Xử lý responsive
    $('.btnAlt').click(function () {
        if ($('.menuAlt').css('display') == 'none') {
            $('.menuAlt').fadeIn()
            $('.menuAlt').click(function (e) {
                $('.menuAlt').fadeOut()
            })
        } else $('.menuAlt').fadeOut()
    })

    $('.altNav').click(function (e) {
        e.stopPropagation()
    })

    $('.altNav a').click(function () {
        $('.menuAlt').fadeOut()
    })


    // Xử lý các nút điều hướng
    $('a').click(function () {
        if ($(this).text() == 'HOME') {
            preRender()
        }
    })

    $('#logInA').click(function () {
        signInRender()
    })

    $('.signUpA').click(function () {
        signUpRender()
    })
    preRender()
})