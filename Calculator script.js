let expression = ""; // Biểu thức lưu trữ
let cursorPos = 0;   // Vị trí con trỏ

const displayInput = document.getElementById('display-input');
const displayResult = document.getElementById('display-result');

// Cập nhật màn hình
function updateDisplay() {
    let displayStr = expression.slice(0, cursorPos) + "|" + expression.slice(cursorPos);
    displayInput.innerText = displayStr;
}

// Xử lý các phím số, toán tử và π
document.querySelectorAll('.num, .op, .func').forEach(btn => {
    btn.addEventListener('click', (e) => {
        let val = btn.innerText;

        // Xử lý Pi và phím chức năng đặc biệt
        if (val === 'π') val = '3.14';
        if (val === ',') val = '.';

        // Loại bỏ ký tự điều hướng khỏi logic thêm chuỗi
        if (['<', '>', 'BK', 'AC', 'AS', '='].includes(val)) return;

        expression = expression.slice(0, cursorPos) + val + expression.slice(cursorPos);
        cursorPos++;
        updateDisplay();
    });
});

// Nút BK (Xóa trái)
document.getElementById('btn-bk').addEventListener('click', () => {
    if (cursorPos > 0) {
        expression = expression.slice(0, cursorPos - 1) + expression.slice(cursorPos);
        cursorPos--;
        updateDisplay();
    }
});

// Nút AS: Thay thế toàn bộ biểu thức bằng kết quả vừa tính
document.getElementById('btn-as').addEventListener('click', () => {
    // Lấy giá trị từ màn hình kết quả (display-result)
    let lastResult = displayResult.innerText;
    
    // Nếu kết quả không phải là "Lỗi" hoặc "0"
    if (lastResult !== "Lỗi" && lastResult !== "0") {
        expression = lastResult; // Thay thế toàn bộ biểu thức
        cursorPos = expression.length; // Đưa con trỏ xuống cuối
        updateDisplay(); // Cập nhật màn hình trên
    }
});

// Nút AC (Xóa hiển thị nhưng không xóa bộ nhớ)
document.getElementById('btn-ac').addEventListener('click', () => {
    expression = "";
    cursorPos = 0;
    displayResult.innerText = "0"; // Xóa màn hình
    updateDisplay();
});

// Nút di chuyển <
document.querySelector('.btn.func:nth-child(4)').addEventListener('click', () => {
    if (cursorPos > 0) cursorPos--;
    updateDisplay();
});

// Nút di chuyển >
document.querySelector('.btn.func:nth-child(5)').addEventListener('click', () => {
    if (cursorPos < expression.length) cursorPos++;
    updateDisplay();
});

// Nút = (Tính toán)
document.getElementById('btn-equal').addEventListener('click', () => {
    try {
        let calcExpr = expression.replace(/x/g, '*').replace(/π/g, '3.14');
        let result = eval(calcExpr);

        if (result === undefined || isNaN(result)) {
            displayResult.innerText = "0";
        } else {
            // Làm tròn kết quả để loại bỏ các số lẻ .99999...
            // .toFixed(10) sẽ giữ 10 số thập phân, sau đó dùng Number() để xóa số 0 thừa
            let roundedResult = Number(result.toFixed(10));
            displayResult.innerText = roundedResult;
        }
    } catch {
        displayResult.innerText = "Lỗi";
    }
});