function passwordEye(fieldSelector) {
    const controls = document.querySelectorAll(fieldSelector)

    controls.forEach(control => {
        const input = control.querySelector('.f-control__input')
        const btn = control.querySelector('.f-control__eye')

        btn.addEventListener('click', (e) => {
            e.preventDefault()
            let type = btn.classList.contains('visible') ? 'text' : 'password'
            btn.classList.toggle('visible')
            input.setAttribute('type', type)
        })
    })
}

passwordEye('.f-control--password')