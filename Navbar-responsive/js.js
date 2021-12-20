const $ = document.querySelector.bind(document)

const barBtn = $('.fas.fa-bars')
const nav_overlay = $('.nav__overlay')
const nav_alt = $('.nav__alt')
const nav__altClose = $('.fas.fa-times')

barBtn.onclick = () => {
  nav_overlay.classList.add('active')
  nav_alt.classList.add('active')
}

nav__altClose.onclick = () => {
  nav_overlay.classList.remove('active')
  nav_alt.classList.remove('active')
}