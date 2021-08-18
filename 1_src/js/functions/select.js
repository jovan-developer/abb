let select = function (selector, activeIndex = 0) {
    let selectArr = document.querySelectorAll(selector)
    let isWatcher = false 

    function selectsRemoveActive() {
        selectArr.forEach(select => {
            let selectList = select.querySelector('.select__list')
            selectList.classList.remove('active')
        })
    }

    selectArr.forEach(select => {
        let title = select.querySelector('.select__content')
        let selectItems = select.querySelectorAll('.select__item')
        let selectList = select.querySelector('.select__list')
        let selectDefault = select.querySelector('select')

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

        choseItem(selectItems[activeIndex])
        selectDefault.selectedIndex = activeIndex

        title.addEventListener('click', selectToggle)

        title.addEventListener('keydown', function (event) {
            if (event.code === 'Space') {
                selectToggle()
            }
        })

        if (selectItems.length > 1) {
            selectList.classList.add('selectable')
        }

        selectItems.forEach((item, idx) => {
            item.addEventListener('click', function () {
                choseItem(this)
                selectDefault.selectedIndex = idx
            })

            item.addEventListener('keydown', function (event) {
                if (event.code === 'Enter') {
                    choseItem(this)
                    selectDefault.selectedIndex = idx
                }
            })
        })

        function selectToggle() {
            selectsRemoveActive()
            selectList.classList.toggle('active')
        }

        function choseItem(item) {
            let text = item.innerHTML
            title.innerHTML = text
            selectList.classList.remove('active')
        }
    });
}