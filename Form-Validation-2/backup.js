// Ham constructor
function Validator(option) {

  // Validate function
  function Validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(option.errorSelector)
    errorElement.innerText = rule.test(inputElement.value.trim())
    
    if (errorElement.innerText) {
      inputElement.parentElement.classList.add('invalid')
    } else inputElement.parentElement.classList.remove('invalid')
  }

  // Check function 
  function check() {
    if (!(inputConfirmPass.value === checkpass)) {
                
      inputConfirmPass.parentElement.querySelector(option.errorSelector).innerText = 'Mật khẩu không khớp'
      inputConfirmPass.parentElement.classList.add('invalid')
    } else {
      inputConfirmPass.parentElement.querySelector(option.errorSelector).innerText = ''
      inputConfirmPass.parentElement.classList.remove('invalid')
    }
  }
  // Láy element của form cần validate
  var formElement = document.querySelector(option.form)
  var checkpass 
  if (formElement) {
    option.rules.forEach((rule) => {
      var inputElement = formElement.querySelector(rule.selector) 
      
      if (inputElement) {
        
        // Xử lý trường hợp blur
        inputElement.onblur = () => { 
          Validate(inputElement, rule)
          if (rule.selector === option.passwordSelector) {
            if (inputElement.value !== '') {
              checkpass = inputElement.value
            }

            if (inputConfirmPass.value !== '') {check()}
          }
        }

        // Xử lý khi người dùng nhập vào input
        inputElement.oninput = () => {
          inputElement.parentElement.classList.remove('invalid')
          inputElement.parentElement.querySelector(option.errorSelector).innerText = ''
        }
      }
    })

    // Confirm password
    var inputConfirmPass = formElement.querySelector(option.password_confirmationSelector)
    inputConfirmPass.onblur = () => {
      if (checkpass == undefined) {
        inputConfirmPass.parentElement.querySelector(option.errorSelector).innerText = 'Vui lòng nhập mật khẩu'
        inputConfirmPass.parentElement.classList.add('invalid')
      } else
      if (!(inputConfirmPass.value === checkpass)) {
        inputConfirmPass.parentElement.querySelector(option.errorSelector).innerText = 'Mật khẩu không khớp'
        inputConfirmPass.parentElement.classList.add('invalid')
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

Validator.isPassword_confirmation = function (selector) {
  return {
    selector,
    test(value) {
    }
  }
}