let select = function (selector, activeIndex = 0) {
    let selectArr = document.querySelectorAll(selector)
    let isWatcher = false

    function selectsRemoveActive() {
        selectArr.forEach(select => {
            select.classList.remove('active')
        })
    }

    selectArr.forEach(select => {
        let title = select.querySelector('.select__content')
        let selectItems = select.querySelectorAll('.select__item')
        let selectDefault = select.querySelector('select')
        let choiceText = select.querySelector('.select__item--def') || null
        let selectSearch

        if (!isWatcher) {
            document.addEventListener('click', function (e) {
                if (e.target.closest('.select') == null) {
                    selectsRemoveActive()
                } else {
                    // selectsRemoveActive()
                    // let parentEl = e.target.closest('.select').querySelector('.select__list')
                    // parentEl.classList.toggle('active')
                }
            })
            isWatcher = true
        }

        if (select.classList.contains('select-search')) {
            selectSearch = select.querySelector('.select__search')

            selectDefault.addEventListener('change', (e) => {
                console.log('this el', selectDefault.options[selectDefault.selectedIndex].value)
            })
        }

        if (choiceText) {
            choseItem(selectItems[0])
            selectDefault.selectedIndex = activeIndex
        } else {
            choseItem(selectItems[activeIndex])
            selectDefault.selectedIndex = activeIndex
        }

        title.addEventListener('click', selectToggle)

        title.addEventListener('keydown', function (event) {
            if (event.code === 'Space') {
                selectToggle()
            }
        })

        if (selectItems.length > 1) {
            select.classList.add('selectable')
        }

        selectItems.forEach((item, idx) => {
            item.addEventListener('click', function () {
                selectDefault.selectedIndex = idx
                choseItem(this)
            })

            item.addEventListener('keydown', function (event) {
                if (event.code === 'Enter') {
                    selectDefault.selectedIndex = idx
                    choseItem(this)
                }
            })
        })

        function selectToggle() {
            selectsRemoveActive()
            select.classList.toggle('active')
            console.log('selectToggle')
        }

        function choseItem(item) {
            let text = item.innerHTML
            title.innerHTML = text
            select.classList.remove('active')

            var event = new Event('change')
            selectDefault.dispatchEvent(event)
            console.log('choseItem')
        }
    });
}