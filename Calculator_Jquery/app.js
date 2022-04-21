$(document).ready(function () {
    // Khai báo các biến ------------------------------------------------------------------------------------------------

    const table = $('table')
    const calAverBtn = $('#calAver')
    const defineHSGBtn = $('#defineHSG')
    const dropItems = $('.dropdown-item')
    const dropDown = $('.dropdown')
    const form = $('#form')

    // Khai báo nơi chứa dữ liệu
    const state = {
        data: [],
        mod: '',
        constants: {}
    }

    const { data, constants } = state
    // Định nghĩa các function  ------------------------------------------------------------------------------------------------


    // Xử lý khi số học sinh > 8 => xuất hiện thanh scrollX chống tràn view, tránh đẩy 2 nút phía cuối ra khỏi view
    function setTableHeight() {
        if (data.length > 8) {
            table.attr('style', 'height: 480px;overflow-y: scroll;display: block')
        }
    }

    // Xử lý khi người dùng muốn xóa 1 học sinh cụ thể
    function delStudent() {
        $('.del').each(function(i) {
            $(this).click(function () {
                data.splice(i, 1)
                render()
                delStudent()
            })
        })
    }

    // Hàm đánh giá học sinh có đạt giỏi hay không
    function classify() {
        if (data.every(student => student.averScore)) {
            data.forEach((student, i) => {
                if (Number(student.averScore) >= 8) {
                    if (student.subject1 >= 8 || student.subject2 >= 8) {
                        student.isHGS = true
                    } else student.isHGS = false
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
                    sum += data[i][j]
                }
            }
            student.averScore = (sum / 6).toFixed(1)
        })
        render()
    }

    // Hàm thu thập thông tin người dùng cung cấp
    function collect([fullName, subject1, subject2, subject3, subject4, subject5, subject6]) {
        const testScore = {
            name: fullName,
            subject1,
            subject2,
            subject3,
            subject4,
            subject5,
            subject6
        }
        data.push(testScore)
    }

    // Hàm xóa input sau khi nhập
    function clear() {
        constants.inputs.each(function() {
            $(this).val('') 
        })
    }

    // Hàm thu thập dữ liệu và validate
    function validator() {
        const inputs = Array.from(constants.inputs)
        if (inputs.every(((input, i) => {
            if (i == 0) {
                if (!Number(input.value) && input.value !== '') {
                    return true
                } else return false
            } else return input.value !== '' && input.value >= 0 && input.value <= 10
        }))) {
            collect(inputs.reduce((acc, input, i) => {
                if (i == 0) {
                    return [...acc, input.value]
                } else return [...acc, Number(input.value)]
            }, []))
            clear()
            render()
            delStudent()
            setTableHeight()
        } else alert('Bạn nhập thiếu hoặc số điểm chưa hợp lý hoặc tên chưa đúng. Vui lòng nhập lại!')
    }

    // Hàm render dữ liệu sau khi người dùng nhập
    function render() {
        const html = data.map((student, i) => `
            <tr>
                <td>${i + 1}</td>
                <td id="fullName" style="${student.isHGS && "background-color: #DC3545;color: white;font-weight: bolder"}">${student.name}</td>
                <td>${student.subject1}</td>
                <td>${student.subject2}</td>
                <td>${student.subject3}</td>
                <td>${student.subject4}</td>
                <td>${student.subject5}</td>
                <td>${student.subject6}</td>
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
                <th>${state.mod ? 'Lý' : 'Sử'}</th>
                <th>${state.mod ? 'Hóa' : 'Địa'}</th>
                <th>${state.mod ? 'Sinh' : 'Công Dân'}</th>
                <th>Trung bình</th>
                <th>Tuỳ chọn</th>
            </tr>`
        table.html(thead + html)
    }

    // Hàm tiền render, render ra dữ liệu ban đầu sau khi người dùng chọn bang
    function preRender(mod) {
        const control = `
                <div class="row g-0">
                    <div class="col-md-6">
                        <label for="">
                            <span>Họ tên</span>
                            <input type="text">
                        </label><br/>
                        <label for="">
                            <span>Điểm Toán</span>
                            <input type="text">
                        </label><br/>
                        <label for="">
                            <span>Điểm Văn</span>
                            <input type="text">
                        </label><br/>
                        <label for="">
                            <span>Điểm Anh</span>
                            <input type="text">
                        </label><br/>
                    </div>
                    <div class="col-md-6">
                        <label for="">
                            <span>Điểm ${mod ? 'Lý' : 'Sử'}</span>
                            <input type="text">
                        </label><br/>
                        <label for="">
                            <span>Điểm ${mod ? 'Hóa' : 'Địa'}</span>
                            <input type="text">
                        </label><br/>
                        <label for="">
                            <span>${mod ? 'Điểm Sinh' : 'Công Dân'}</span>
                            <input type="text">
                        </label><br/>
                    </div>
                </div>
                <button class="btn btn-success submit">Nhập</button>`
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

        form.html(control)
        form.hide()
        form.fadeIn(function() {
            table.html(thead)
            table.hide()
            table.fadeIn(function() {
                calAverBtn.fadeIn()
                defineHSGBtn.fadeIn()
            })
        })

        constants.inputs = $('input')
        constants.submitBtn = $('.submit')
        constants.submitBtn.click(validator)
    }

    // Xử lý các sự kiện  ------------------------------------------------------------------------------------------------

    // Xác định bang người dùng chọn, thực thi các hàm tương ứng khi người dùng click, thu thập dữ liệu và truyền vào data, render ra dữ liệu
    dropItems.click(function() {
        state.mod = $(this).text() === "Tự nhiên" ? true : false
        dropDown.hide()
        preRender(state.mod)
    })

    // Xử lý khi người dùng muốn tính ĐTB
    calAverBtn.click(function () {
        calAverScore()
        delStudent()
    })

    // Xử lý khi người dùng muốn tìm HSG
    defineHSGBtn.click(function () {
        classify()
        delStudent()
    })
})