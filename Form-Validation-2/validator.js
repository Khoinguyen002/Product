function Validator(selector) {
  formSelector = document.querySelector(selector)
  if (formSelector) {
    var inputElements = formSelector.querySelectorAll('input[name]')
    var checkboxElements = formSelector.querySelectorAll('[name="Favorites"]')
    var formRules = {}
    var checkaudio = false
    var validatorRules = {
      require(value) {
        return value ? '' : 'Vui lòng nhập trường này'
      },
      email(value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regex.test(value) ? '' : 'Vui lòng nhập đúng định dạng email !'
      },
      min(min) {
        return function (value) {
          return value.length >= min ? '' : `Vui lòng nhập tối thiểu ${min} kí tự`
        }
      },
      confirm(selector) {
        return function (value) {
          return value === formSelector.querySelector(selector).value ? '' : 'Mật khẩu không khớp'
        }
      }
    }
    // Định nghĩa hàm
    function validate(inputElement, formRules, ) {
      var checkcheckbox = false
      var errorElement = getParent(inputElement).querySelector('.form-message')
        switch (inputElement.type) {
          case 'checkbox':
            for (var checkboxElement of checkboxElements) {
              if (checkboxElement.matches(':checked')) {
              checkcheckbox = true
              }
            }
            errorElement.innerText = checkcheckbox ? '' : 'Vui lòng chọn trường này'
            break;
          case 'radio': 
            if (inputElement.checked) {
              checkaudio = true
            }
            errorElement.innerText = checkaudio ? '' : 'Vui lòng chọn trường này'
            break;
          default:
            for (i = 0; i < formRules[inputElement.name].length; i++) {
              errorElement.innerText = formRules[inputElement.name][i](inputElement.value.trim())
              if (errorElement.innerText) break
            }
        }
      
      
      if (errorElement.innerText) {
        getParent(inputElement).classList.add('invalid')
      } else getParent(inputElement).classList.remove('invalid')
      return !!errorElement.innerText
    }
    
    function getParent(inputElement) {
      do {
        inputElement = inputElement.parentElement
      } while (!inputElement.matches('.form-group'))
      return inputElement
    }
    
    function getInfo(data) {
      console.log(data)
    }

    // Lưu trữ các function tuơng ứng với mỗi input
    for (var inputElement of inputElements) {
      if (inputElement.getAttribute('rules')) {
        var rules = inputElement.getAttribute('rules').split('|')
        for (var rule of rules) {
          if (Array.isArray(formRules[inputElement.name])) {
            formRules[inputElement.name].push(rule.includes(':') ? validatorRules[rule.split(':')[0]](rule.split(':')[1]) : validatorRules[rule])
          } else formRules[inputElement.name] = [validatorRules[rule]]
        }
      }
    }

    // Xử lý các sự kiện
    inputElements.forEach((inputElement) => {
      inputElement.onblur = () => {
        if (inputElement.name == 'password' && formSelector.querySelector('#password_confirmation').value != '') {
          validate(formSelector.querySelector('#password_confirmation'), formRules)
        }
        validate(inputElement, formRules)
      } 

      inputElement.oninput = () => {
        getParent(inputElement).classList.remove('invalid')
        getParent(inputElement).querySelector('.form-message').innerText = ''
      }
    })

    formSelector.onsubmit = (e) => {
      var isValid = true
      e.preventDefault()
      inputElements.forEach((inputElement) => {
        if (validate(inputElement, formRules)) {isValid = false}
      })
      if (isValid) {
        var data = Array.from(inputElements).reduce((accumulator, inputElement) => {
          switch (inputElement.type) {
            case 'checkbox': 
              if (inputElement.matches(':checked')) {
                if (Array.isArray(accumulator[inputElement.name]) ) {
                  accumulator[inputElement.name].push(inputElement.value)
                } else accumulator[inputElement.name] = [inputElement.value]
              }
              break
            case 'radio':
              if (inputElement.checked) {
                accumulator[inputElement.name] = inputElement.value
              }
              break
            default:
              accumulator[inputElement.name] = inputElement.value
          }    
          return accumulator 
        }, {})

        getInfo(data)
      }
    }
    
  }
}
