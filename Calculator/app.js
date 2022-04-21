// Khai báo các biến ------------------------------------------------------------------------------------------------

const table = document.querySelector('table')
const inputs1 = document.querySelectorAll('.form-1 input')
const inputs2 = document.querySelectorAll('.form-2 input')
const submitBtn1 = document.querySelector('.form-1 #submit')
const submitBtn2 = document.querySelector('.form-2 #submit')
const calAverBtn = document.querySelector('#calAver')
const defineHSGBtn = document.querySelector('#defineHSG')
const dropItems = document.querySelectorAll('.dropdown-item')
const dropDown = document.querySelector('.dropdown')

// Khai báo nơi chứa dữ liệu
const data = []

// Khai báo nơi chứa bang hiện tại là "Tự nhiên" hay "Xã hội"
let mod


// Định nghĩa các function  ------------------------------------------------------------------------------------------------


// Xử lý khi số học sinh > 8 => xuất hiện thanh scrollX chống tràn view, tránh đẩy 2 nút phía cuối ra khỏi view
function setTableHeight() {
    if(data.length > 8) {
        table.setAttribute('style', 'height: 480px;overflow-y: scroll;display: block')
    }
}

// Xử lý khi người dùng muốn xóa 1 học sinh cụ thể
function delStudent() {
    const delBtns = document.querySelectorAll('.del')
    Array.from(delBtns).forEach((delBtn, i) => {
        delBtn.onclick = function() {
            data.splice(i, 1)
            render()
            delStudent()
        }
    })
}

// Hàm đánh giá học sinh có đạt giỏi hay không
function classify() {
    if (data.every(student => student.averScore)) {
        data.forEach((student, i) => {
            if (Number(student.averScore) >= 8) {
                if (Number(student.math) >=8 || Number(student.literature) >=8) {
                    student.isHGS = true
                }
            } else student.isHGS = false
        })
        render()
    } else alert('Vui lòng tính toàn bộ điểm TB trước khi phân loại')
}


// Hàm tính toán điểm trung bình các môn học
function calAverScore() {
    data.forEach((student, i) => {
        let sum = 0
        for (j in student) {
            if (Number(data[i][j]) && j !== 'averScore' && j !== 'isHGS') {
                sum += Number(data[i][j])
            }
        }
        student.averScore = (sum/6).toFixed(1)
    })
    render()
}

// Hàm thu thập thông tin người dùng cung cấp
function collect([fullName, subject1, subject2, subject3, subject4, subject5, subject6]) {
    let testScore
    if (mod) {
        testScore = {
            name: fullName,
            math: subject1,
            literature: subject2,
            english: subject3,
            physical: subject4,
            chemistry: subject5,
            biology: subject6
        }
    } else {
        testScore = {
            name: fullName,
            math: subject1,
            literature: subject2,
            english: subject3,
            history: subject4,
            geography: subject5,
            civic_education: subject6
        }
    }
    data.push(testScore)
}

// Hàm xóa input sau khi nhập
function clear() {
    (mod ? inputs1 : inputs2).forEach((input) => {
        input.value = ''
    })
}

// Hàm render dữ liệu sau khi người dùng nhập
function render() {
    const html = data.map((student, i) => `
        <tr>
            <td>${i+1}</td>
            <td id="fullName" style="${student.isHGS && "background-color: #DC3545;color: white;font-weight: bolder"}">${student.name}</td>
            <td>${student.math}</td>
            <td>${student.literature}</td>
            <td>${student.english}</td>
            <td>${student[mod ? 'physical' : 'history']}</td>
            <td>${student[mod ? 'chemistry' : 'geography']}</td>
            <td>${student[mod ? 'biology' : 'civic_education']}</td>
            <td class="average">${student.averScore ? student.averScore : '?'}</td>
            <td><button class="del btn btn-danger">Xóa</button></td>
        </tr>
    `).join('')
    const thead = `
        <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Toán</th>
            <th>Văn</th>
            <th>Anh</th>
            <th>${mod ? 'Lý' : 'Sử'}</th>
            <th>${mod ? 'Hóa' : 'Địa'}</th>
            <th>${mod ? 'Sinh' : 'Công Dân'}</th>
            <th>Trung bình</th>
            <th>Tuỳ chọn</th>
        </tr>`
    table.innerHTML = thead+html

}

// Hàm tiền render, render ra dữ liệu ban đầu sau khi người dùng chọn bang
function preRender() {
    const thead = `
        <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Toán</th>
            <th>Văn</th>
            <th>Anh</th>
            <th>${mod ? 'Lý' : 'Sử'}</th>
            <th>${mod ? 'Hóa' : 'Địa'}</th>
            <th>${mod ? 'Sinh' : 'Công Dân'}</th>
            <th>Trung bình</th>
            <th>Tuỳ chọn</th>
        </tr>`
    table.innerHTML = thead
    calAverBtn.style.display = 'inline-block'
    defineHSGBtn.style.display = 'inline-block'
}

// Xử lý các sự kiện  ------------------------------------------------------------------------------------------------

// Xác định bang người dùng chọn, thực thi các hàm tương ứng khi người dùng click, thu thập dữ liệu và truyền vào data, render ra dữ liệu
Array.from(dropItems).forEach(dropItem => {
    dropItem.onclick = function() {
        mod = dropItem.innerText === "Tự nhiên" ? true : false
        dropDown.style.display = 'none'
        if (mod) {
            document.querySelector('.form-1').style.display = 'block'
        } else document.querySelector('.form-2').style.display = 'block'
        preRender()
        const submitBtn = mod ? submitBtn1 : submitBtn2
        submitBtn.onclick = function(e) {
            e.preventDefault()
            if(Array.from(mod ? inputs1 : inputs2).every(((input, i) => {
                if (i == 0) {
                    if (!Number(input.value) && input.value !== '') {
                        return true
                    } else return false
                } else return input.value !== '' && input.value >= 0 && input.value <= 10 
            }))) {
                collect(Array.from(mod ? inputs1 : inputs2).reduce((acc, input) => {
                    return [...acc, input.value]
                }, []))
                clear()
                render()
                delStudent()
                setTableHeight()
            } else alert('Bạn nhập thiếu hoặc số điểm chưa hợp lý hoặc tên chưa đúng. Vui lòng nhập lại!')
            
        
        }
    }
})

// Xử lý khi người dùng muốn tính ĐTB
calAverBtn.onclick = function() {
    calAverScore()
    delStudent()
}

// Xử lý khi người dùng muốn tìm HSG
defineHSGBtn.onclick = function() {
    classify()
    delStudent()
}