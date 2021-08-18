const form = () => {
    let forms = document.querySelectorAll('.js-form-send')

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let request = new XMLHttpRequest()

            let btn = form.querySelector('button[type=submit]')

            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    form.innerHTML =
                        `<div class="modal-form__final">
							<img class="modal-form__final-img" src="img/quiz/final-icon.png" alt="">
							<div class="modal-form__final-title">
								Ваша заявка отправлена
							</div>
						</div>`
                } else if (this.status === 404) {
                    // btn.setAttribute('disabled', 'true')
                    console.log(dataPost)
                    console.log('Ашипка')
                }
            }

            request.open(form.method, form.action, true)
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

            let data = new FormData(form)
            let dataPost


            // Формируем массив данных для отправки 
            data.forEach(function (value, key) {
                dataPost += '&' + key + '=' + value
            })

            request.send(dataPost)
        })
    })
}

form()