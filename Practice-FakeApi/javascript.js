$(document).ready(() => {
  // const btndiv = $('.btn')
  // const btndivv = document.querySelector('.btn')
  
  // const btns = $('button')
  // const img = $('img')
  
  // Array.from(btns).forEach((btn) => {
  //   btn.onclick = function () {
  //     if (btn.innerText === '500px') {
  //       img.attr("class", "smaller")
  //     } else if (btn.innerText === 'Default') {
  //       img.attr("class", "default")
  //     } else img.attr("class", "larger")
  //     console.log(img.css("width"))
    
  //   }
    
  // })
  // const btns = $('button')
  // var input
  // var text = $('<div class="text">aduma</div>')

  // $('<div class="text">aduma</div>').appendTo('body')
  // $('body').append('<div class="text">aduma</div>')
  // $('.text').after($('<div class="text">aduma</div>'))


  // Array.from(btns).forEach((btn) => {
  //   btn.onclick = () => {
  //     if(btn.innerText === 'Đọc HTML') {
  //       alert(text.html())
  //     } else if(btn.innerText === 'Đọc Text'){
  //       alert(text.text())
  //     } else if(btn.innerText === 'Gán HTML') {
  //       input = prompt('Nhập HTML')
  //       text.html(input)
  //     } else {
  //       input = prompt('Nhập Text')
  //       text.text(input)
  //     }
  //   }
  // })
  // this = 'may` da bi. lua` ahhi'
  // console.log($('.btn-primary'))

  // const btn = $('.btn-primary')
  // btn.click(() => {
  //   console.log($('#inputName').val())
  // })
  // $('#inputName').change(() => {
  //   console.log('noi dung da thay doi');
  // })
  // function confirm() {
  //   alert('toggle() method is finished!')
  // }
//   const img = $('img')
//   var isChanged = false
//   Array.from($('button')).forEach((btn) => {
//     btn.onclick = () => {
//       switch (btn.className) {
//         case "show":
//           img.fadeIn(1000)
//           break
//           case "hide":
//             // img.fadeOut(1000)
//           break
//           case "toggle":
//             img.fadeToggle(1000)
//           }
//         }
//       })
      
      
//       $('.inputInfo').bind('input', () => {
//         const x = $('.inputInfo').val()
//         console.log(x)
//       })
//   $('.show').click(() => {
//     $('img').show()
//     effect()
//   })
//   $('.hide').click(() => {
//     $('img').stop()
    
//   })

// })

// function effect() {

//   if ($('img').css("margin-left") == '0px') {
//     $('.show').animate(
//       {
//         opacity: 0
//       },2000
//     )
//     $('img').animate(
//       {
//         "margin-left": 500,
//       },2000, effect
//     )
    
//   } else {
//     $('img').animate(
//       {
//         "margin-left": 0
//       },2000, effect
//     )
    
//   }

  const addBtn = $('#btn')
  const inputElement = $('#inp')
  const ulTag = $('.content')
  const Api = 'http://localhost:3000/todos'
  var listTodos
  
  addBtn.click(function onclick() {
    const inputVal = inputElement.val()
    const data = {
      content: inputVal
    }
    if (data.content) {
      createWork(data)
    }
    inputElement.val('')
  })
  

  function delLi() {
    listTodos.forEach((listTodo) => {
      $(`#${listTodo.id}`).click(() => {
        deleteWork(listTodo.id)
      })
    })
}

  function deleteWork(id) {
    var option = {
      method: "DELETE",
    }
    fetch(Api + '/' + id, option)
      .then(()=> {fetchApi()})
  }

  function createWork(data) {
    var option = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(Api, option)
      .then(()=> {fetchApi()})
  }

  function fetchApi() {
    fetch(Api)
    .then(respond => respond.json())
    .then(function onthen(todoList) {
      render(todoList)
      listTodos = todoList
      delLi()
    })
    
  }
    
  function render(todoList) {
    var newEle = todoList.map((todo) => {
      return `<li id="${todo.id}">${todo.content}</li>`
    })
    
    ulTag.html(newEle.join(""))
    liElements = $('li')
  }

  fetchApi()

  // const a = prompt('Nhập a')
  // const b = prompt('Nhập b')
  // const c = prompt('Nhập c')
  
  // function calculate() {
  //   const delta = b**2 - 4*a*c
  //   console.log(delta);
  //   if (delta < 0) {
  //     alert('Phương trình vô nghiệm')
  //   } else if (delta == 0) {
  //     alert(`Phương trình có nghiệm kép là: ${-b/(2*a)}`)
  //   } else alert(`Phương trình có 2 nghiệm phân biệt: x1 = ${(-b + Math.sqrt(delta))/(2*a)}, x2 = ${(-b - Math.sqrt(delta))/(2*a)}`)
  // }

  // calculate()
  // const form = $('form')
  // const inputElement = $('.form-control')
  // const ren = $('#reversed_name')
  
  // form.submit(function (e) { 
  //   const inputVal = inputElement.val()
  //   e.preventDefault()
  //   console.log(inputVal);
  //   if (inputVal) {
  //     ren.text(inputVal.split("").reverse().join(''))
  //   }
    
  // })
})
    
