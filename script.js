// ================== ĐỒNG HỒ ĐẾM NGƯỢC ====================
let countdown;
let isRunning = false;
let totalSeconds = 0;

function startCountdown() {
    // Lấy giá trị từ input
    const hours = parseInt(document.getElementById("hours-input").value) || 0;
    const minutes = parseInt(document.getElementById("minutes-input").value) || 0;
    const seconds = parseInt(document.getElementById("seconds-input").value) || 0;
    
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    if (totalSeconds <= 0) return;
    
    // Ẩn input, hiển thị đồng hồ
    document.getElementById("time-inputs").style.display = "none";
    document.getElementById("time-display").style.display = "flex";
    
    // Cập nhật hiển thị ban đầu
    updateTimerDisplay();
    
    // Nếu đã đang chạy, dừng timer cũ
    if (isRunning) {
        clearInterval(countdown);
    }
    
    // Bắt đầu đếm ngược
    isRunning = true;
    const audio = document.getElementById("beep-audio");
    audio.play();
    
    countdown = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
            
            // Nếu còn ít hơn 30 giây, thêm hiệu ứng cảnh báo
            if (totalSeconds < 30) {
                document.getElementById("seconds").classList.add("warning");
            }
        } else {
            clearInterval(countdown);
            isRunning = false;
            alert("Hết giờ!");
            audio.pause();
            audio.currentTime = 0;
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

function pauseCountdown() {
    if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
        const audio = document.getElementById("beep-audio");
        audio.pause();
    }
}

function resetCountdown() {
    // Dừng đếm ngược
    clearInterval(countdown);
    isRunning = false;
    
    // Hiển thị lại input
    document.getElementById("time-inputs").style.display = "flex";
    document.getElementById("time-display").style.display = "none";
    
    // Reset các giá trị
    document.getElementById("hours-input").value = "0";
    document.getElementById("minutes-input").value = "12";
    document.getElementById("seconds-input").value = "0";
    
    // Xóa hiệu ứng cảnh báo
    document.getElementById("seconds").classList.remove("warning");
    
    // Dừng âm thanh
    const audio = document.getElementById("beep-audio");
    audio.pause();
    audio.currentTime = 0;
}

// ================= CHỌN NGẪU NHIÊN Ô MÀU =====================

// Xác định các cặp ID đối xứng nhau giữa hai bên (dựa vào mũi tên trong ảnh)
const symmetricPairs = [
  // Cặp 1
  { left: "blue1", right: "blue2" },
  // Cặp 2
  { left: "blue3", right: "blue4" },
  // Cặp 3
  { left: "blue5", right: "blue6" },
  // Cặp 4
  { left: "red1", right: "red2" },
  // Cặp 5
  { left: "red3", right: "red4" },
  // Cặp 6
  { left: "red5", right: "red6" },
  // Cặp 7
  { left: "green1", right: "green2" },
  // Cặp 8
  { left: "green3", right: "green4" },
  // Cặp 9
  { left: "green5", right: "green6" }
];

// Vị trí các ô trong mỗi khối (để đảm bảo mỗi khối có đủ 3 màu)
const leftZoneIDs = symmetricPairs.map(pair => pair.left);
const rightZoneIDs = symmetricPairs.map(pair => pair.right);

// Hàm trộn mảng (Fisher-Yates shuffle)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Hàm random mới đảm bảo tính đối xứng
function random() {
  // Tạo pool màu (3 màu mỗi loại)
  const colorPool = [...Array(3).fill("blue"), ...Array(3).fill("red"), ...Array(3).fill("green")];
  
  // Trộn ngẫu nhiên các màu
  const shuffledColors = shuffle([...colorPool]);
  
  // Áp dụng các màu đối xứng vào cả hai bên
  symmetricPairs.forEach((pair, index) => {
    const color = shuffledColors[index];
    
    // Áp dụng màu cho bên trái
    const leftBox = document.getElementById(pair.left);
    if (leftBox) {
      leftBox.src = `./image/${color}.jpg`;
    }
    
    // Áp dụng cùng màu cho bên phải ở vị trí đối xứng
    const rightBox = document.getElementById(pair.right);
    if (rightBox) {
      rightBox.src = `./image/${color}.jpg`;
    }
  });
}

// ===================== CHỤP MÀN HÌNH BẢN ĐỒ ===================

function screenshot() {
  const mapElement = document.querySelector(".map.select");
  if (!mapElement) return;
  
  html2canvas(mapElement).then(canvas => {
    const link = document.createElement("a");
    link.download = "ban_do_thi_dau.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}