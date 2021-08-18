document.addEventListener('DOMContentLoaded', () => {
    @include('functions/select.js')
    @include('functions/phoneMask.js')
    @include('functions/modal.js')

    // Функция для стилизации селекта
    select('.select')

    // Маска для полей телефона
    phoneMask()

    // Активация модальных форм
    bindModal('.js-popup-btn', true)
})