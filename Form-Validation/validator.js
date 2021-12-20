// Ham constructor
function Validator(option) {
  function getParent (inputElement, selector) {
    do {
      inputElement = inputElement.parentElement
    } while ((!inputElement.matches(selector)) && (inputElement.parentElement))
    return inputElement
  }
 
  // Validate function
  function Validate(inputElement, rule) {
    var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector)
    var selectorRules = option.rules.filter((e) => {
      return e.selector == rule.selector
    })
    console.log(inputElement)
    for ( i = 0; i < selectorRules.length; i++) {
      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          // console.log(inputElement)
          errorElement.innerText = selectorRules[i].test(formElement.querySelector(rule.selector + ':checked'))
          break;
        default:
          errorElement.innerText = selectorRules[i].test(inputElement.value.trim())
      }
      if (errorElement.innerText) break
    } 

    if (errorElement.innerText) {
      getParent (inputElement, option.formGroupSelector).classList.add('invalid')
    } else getParent (inputElement, option.formGroupSelector).classList.remove('invalid')

    return !!errorElement.innerText
  }

  // Láy element của form cần validate
  var formElement = document.querySelector(option.form)


  // Xử lý Submit
  if (formElement) {

    formElement.onsubmit = function (e) {
      e.preventDefault()
      var isValid = true
      var enableInputs = formElement.querySelectorAll('[name]:not([disable])')
      // Lặp qua từng rule và validate
      option.rules.forEach((rule) => {
        var inputElement = formElement.querySelector(rule.selector)
          if (Validate(inputElement, rule)) {isValid = false}
      })
      
      if (isValid) {
        if (typeof option.onSubmit === 'function') {
          var formValues = Array.from(enableInputs).reduce((values, input) => {
            switch(input.type) {
              case 'radio':
                if (input.matches(':checked')){
                  values[input.name] = input.value
                }
                break;
              case 'checkbox':
                if (input.matches(':checked')){
                  if (typeof values[input.name] === 'object' ) {  // Có thể dùng condition: Array.isArray(values[input.name])
                    values[input.name].push(input.value)
                  } else values[input.name] = [input.value]
                
                }
                break;
              case 'file':
                values[input.name] = input.files
                break; 
              default:
                values[input.name] = input.value
            }
            
            return values
            
          }, {})
          option.onSubmit(formValues)
        }
      }  
      
    }
    // Xử lý 
    option.rules.forEach((rule) => {
      var inputElements = formElement.querySelectorAll(rule.selector) 
      console.log(inputElements)
      inputElements.forEach((inputElement) => {
        if (inputElement) {
          
          // Xử lý trường hợp blur
          inputElement.onblur = () => { 
            Validate(inputElement, rule)
          }

          // Xử lý khi người dùng nhập vào input
          inputElement.oninput = () => {
            getParent (inputElement, option.formGroupSelector).classList.remove('invalid')
            getParent (inputElement, option.formGroupSelector).querySelector(option.errorSelector).innerText = ''
          }
        }
      })
    })
    var selectElement = formElement.querySelector(option.selectSelector)
    selectElement.onchange = () => {
      var errorElement = getParent(selectElement, option.formGroupSelector).querySelector(option.errorSelector)
      if (!selectElement.value) {
        errorElement.innerText = 'Vui lòng nhập trường này !'
        getParent (selectElement, option.formGroupSelector).classList.add('invalid')
      } else {
        errorElement.innerText = ''
        getParent (selectElement, option.formGroupSelector).classList.remove('invalid')
      }
    }
    

  }
}

// Định nghĩa rules
// Nguyên tắc của rules:
// 1. Khi có lỗi => Trả ra message lỗi 
// 2. Khi hợp lệ => undefine
Validator.isRequired = function (selector) {
  return {
    selector,
    test(value) {
      return value ? '' : 'Vui lòng nhập trường này !'
    }
  }
}

Validator.isEmail = function (selector) {
  return {
    selector,
    test(value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return regex.test(value) ? '' : 'Vui lòng nhập đúng định dạng email !'
    }
  }
}
Validator.isPassword = (selector) => {
  return {
    selector,
    test(value) {
      //check empty password field  
      if(value == "") {  
        return "**Fill the password please!";  
      }  
      
    //minimum password length validation  
      if(value.length < 6) {  
        return "**Password length must be atleast 6 characters";  
      }  
     
    //maximum length of password validation  
      if(value.length > 15) {  
        return "**Password length must not exceed 15 characters";  
      } else return ''
    }
  }
}

Validator.isPassword_confirmation = function (selector, getPassword) {
  return {
    selector,
    test(value) {
      return value === getPassword() ? '' : 'Mật khẩu không khớp !!'
    }
  }
}

