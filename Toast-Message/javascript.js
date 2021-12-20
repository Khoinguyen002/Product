const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btn = $$('.btn')
const main = $('#toast')

var html = ``
const btnInfo = {
  success: {
    header: 'Success',
    message: 'Thực hiện thành công !',
    iconclass: 'fa-check-circle'
  },
  warning: {
    header: 'Warning',
    message: 'Xuất hiện nghi vấn !',
    iconclass: 'fa-exclamation-triangle'
  },
  error: {
    header: 'Error',
    message: 'Có lỗi xảy ra !',
    iconclass: 'fa-exclamation-triangle'
  }, 

}
function render(element) {
  const sortBtn = element.classList[2].slice(5)
  const toast = document.createElement('div')

  toast.classList.add('toast', `toast__${sortBtn}`)
  toast.style.animation = 'slideFromLeft 0.5s ease, fadeout 0.5s ease 2s'
  toast.style.backgroundColor = `#fff`
  toast.innerHTML =`
        <div class="icon">
          <i class="fas ${btnInfo[sortBtn].iconclass}"></i>
        </div>
        <div class="body">
          <h3 class="header">${btnInfo[sortBtn].header}</h3>
          <div class="message">${btnInfo[sortBtn].message}</div>
          <div class="time">4:42PM</div>
        </div>
        <div class="close"> 
          <i class="fas fa-times"></i>
        </div>
      `
  main.appendChild(toast)

  const autoremoveToast = setTimeout(()=>{
    main.removeChild(toast)
  },2500)
  
  toast.onclick = (e) => {
    if (e.target.closest('.close')) {
      main.removeChild(toast)
      clearTimeout(autoremoveToast)
    }
  }
}

btn.forEach(element => {
  element.onclick = () => {
    render(element)
  }
});
