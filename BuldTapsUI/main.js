const $$ = document.querySelectorAll.bind(document),
    $ = document.querySelector.bind(document)

const tabsElements = $$('.tab-item')
const tabscontentElements = $$('.tab-pane')
const line = $(".tabs .line")

line.style.width = tabsElements[0].offsetWidth + 'px'
line.style.left = tabsElements[0].offsetLeft + 'px'

// Xử lý chuyển tab
tabsElements.forEach((tabsElement, index) => {
    tabsElement.onclick = () => {
        $('.tab-item.active').classList.remove('active')
        tabsElement.classList.add('active')
        $('.tab-pane.active').classList.remove('active')
        tabscontentElements[index].classList.add('active')
        line.style.width = tabsElement.offsetWidth + 'px'
        line.style.left = tabsElement.offsetLeft + 'px'
    }
})



