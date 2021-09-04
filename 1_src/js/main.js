document.addEventListener('DOMContentLoaded', () => {
    @include('functions/select.js')
    @include('functions/phoneMask.js')
    @include('functions/modal.js')
    @include('functions/passwordEye.js')

    // Function to style select
    select('.select')

    // Phone field mask
    phoneMask()

    // Activating modal windows
    bindModal('.js-popup-btn', true)

    // Hero-slider
    const heroSlider = new Swiper('.hero-slider__slider', {

    })

    // product-thumb-slider
    const productThumbSlider = new Swiper('.product-view__thumb', {
        slidesPerView: 4,
        spaceBetween: 8,
        threshold: 15
    })

    // product-slider
    const productSlider = new Swiper('.product-view__slider', {
        thumbs: {
            swiper: productThumbSlider
        },
        navigation: {
            nextEl: '.product-view__slider-btn--right',
            prevEl: '.product-view__slider-btn--left',
        },
    })


    // Tabs for product page
    const tabs = (tabsSel, headerSel, contentSel) => {
        let tabs = document.querySelector(tabsSel)
        if (tabs) {
            let header = tabs.querySelectorAll(headerSel)
            let content = tabs.querySelectorAll(contentSel)

            let lastIndex = 0

            for (let i = 0; i < header.length; i++) {
                header[i].addEventListener('click', () => {
                    header[lastIndex].classList.remove('active')
                    content[lastIndex].classList.remove('active')
                    header[i].classList.add('active')
                    content[i].classList.add('active')
                    lastIndex = i
                })
            }
        }

    }
    tabs('.product-tabs', '.product-tabs__title', '.product-tabs__block')

    const accordion = (tabsSel, headerSel, contentSel, paddings = 0, firstActive = 0) => {
        let tabs = document.querySelector(tabsSel)

        if (tabs) {
            console.log('asda', tabs)
            let header = tabs.querySelectorAll(headerSel)
            let content = tabs.querySelectorAll(contentSel)

            let lastIndex = 0
            let padding = paddings

            header[firstActive].classList.add('active')
            content[firstActive].classList.add('active')
            content[firstActive].style.maxHeight = content[firstActive].scrollHeight + padding + 'px'

            for (let i = 0; i < header.length; i++) {
                header[i].addEventListener('click', () => {
                    if (!(header[i].classList.contains('active'))) {
                        header[lastIndex].classList.remove('active')
                        content[lastIndex].classList.remove('active')
                        content[lastIndex].style.maxHeight = '0px'
                        content[i].classList.add('active')
                        header[i].classList.add('active')
                        content[i].style.maxHeight = content[i].scrollHeight + padding + 'px'
                        lastIndex = i
                    } else {
                        content[i].classList.remove('active')
                        header[i].classList.remove('active')
                        content[i].style.maxHeight = '0px'
                        lastIndex = i
                    }
                })
            }
        }
    }

    accordion('.js-accordion', '.js-accordion__title', '.js-accordion__content', 14)


    const mainMenu = (tabsSel, headerSel, contentSel, closeSel, overlaySel, paddings = 0, firstActive = 0) => {
        let tabs = document.querySelector(tabsSel)

        if (tabs) {
            console.log('asda', tabs)
            let header = tabs.querySelectorAll(headerSel)
            let content = tabs.querySelectorAll(contentSel)
            let close = tabs.querySelectorAll(closeSel)
            let overlay = document.querySelector(overlaySel)

            let lastIndex = 0
            let padding = paddings

            openMenu(firstActive)

            overlay.addEventListener('click', () => {
                closeMenu(lastIndex)
            })

            for (let i = 0; i < header.length; i++) {
                header[i].addEventListener('click', () => {
                    if (!(header[i].classList.contains('active'))) {
                        closeMenu(lastIndex)
                        openMenu(i)
                        lastIndex = i
                    } else {
                        closeMenu(i)
                        lastIndex = i
                    }
                })

                close[i].addEventListener('click', () => {
                    closeMenu(i)
                })
            }

            function closeMenu(index) {
                header[index].classList.remove('active')
                content[index].classList.remove('active')
                content[index].style.maxHeight = '0px'
                overlay.classList.remove('active')
            }

            function openMenu(index) {
                content[index].classList.add('active')
                header[index].classList.add('active')
                content[index].style.maxHeight = content[index].scrollHeight + padding + 'px'
                overlay.classList.add('active')
            }
        }
    }

    mainMenu('.js-menu', '.js-menu__title', '.js-menu__content', '.js-menu__close', '.main-menu__overlay', 38)

    bindModal('.js-video-play', true)

    const menu = (menuSel, openSel, closeSel) => {
        let menu = document.querySelector(menuSel)
        let closeBtn = document.querySelector(closeSel)
        let openBtn = document.querySelector(openSel)

        openBtn.addEventListener('click', () => {
            menu.classList.add('active')
        })

        closeBtn.addEventListener('click', () => {
            menu.classList.remove('active')
        })
    }
    menu('.header__list', '.header__menu-burger','.header__menu-close')
})