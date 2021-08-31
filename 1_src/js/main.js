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

    const accordion = (tabsSel, headerSel, contentSel) => {
        let tabs = document.querySelector(tabsSel)

        if (tabs) {
            console.log('asda', tabs)
            let header = tabs.querySelectorAll(headerSel)
            let content = tabs.querySelectorAll(contentSel)

            let lastIndex = 0
            let paddings = 14

            for (let i = 0; i < header.length; i++) {
                header[i].addEventListener('click', () => {
                    if (!(header[i].classList.contains('active'))) {
                        header[lastIndex].classList.remove('active')
                        content[lastIndex].style.maxHeight = '0px'
                        header[i].classList.add('active')
                        content[i].style.maxHeight = content[i].scrollHeight + paddings + 'px'
                        lastIndex = i
                    } else {
                        header[i].classList.remove('active')
                        content[i].style.maxHeight = '0px'
                        lastIndex = i
                    }
                })
            }
        }
    }

    accordion('.js-accordion', '.js-accordion__title', '.js-accordion__content')
})