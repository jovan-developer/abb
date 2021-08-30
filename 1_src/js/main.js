document.addEventListener('DOMContentLoaded', () => {
    @include('functions/select.js')
    @include('functions/phoneMask.js')
    @include('functions/modal.js')
    @include('functions/passwordEye.js')

    // Функция для стилизации селекта
    select('.select')

    // Маска для полей телефона
    phoneMask()

    // Активация модальных форм
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

    const tabs = (tabsSel, headerSel, contentSel) => {
        let tabs = document.querySelector(tabsSel)

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

    tabs('.product-tabs', '.product-tabs__title', '.product-tabs__block')
})