function phoneMask() {
    let telephones = document.querySelectorAll(".js-phone-mask")

    telephones.forEach(element => {
        Inputmask({
            "mask": "+7 (999) 999-99-99"
        }).mask(element)
    })
}