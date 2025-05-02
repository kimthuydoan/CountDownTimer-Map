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
            
            // Nếu còn ít hơn 10 giây, thêm hiệu ứng cảnh báo
            if (totalSeconds < 10) {
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

// Xác định IDs của các ô màu trong từng khu vực (dựa vào mũi tên trong ảnh)
const leftZoneIDs = [
  "blue1", "blue3", "blue5", 
  "red1", "red3", "red5", 
  "green1", "green3", "green5"
];

const rightZoneIDs = [
  "blue2", "blue4", "blue6", 
  "red2", "red4", "red6", 
  "green2", "green4", "green6"
];

// Hàm trộn mảng (Fisher-Yates shuffle)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Hàm random mới chia thành hai khu vực
function random() {
  // Tạo pool màu cho mỗi khu vực (3 màu mỗi loại)
  const colorPool = [...Array(3).fill("blue"), ...Array(3).fill("red"), ...Array(3).fill("green")];
  
  // Trộn ngẫu nhiên các màu
  const leftColors = shuffle([...colorPool]);
  const rightColors = shuffle([...colorPool]);
  
  // Áp dụng các màu vào từng khu vực
  leftZoneIDs.forEach((id, index) => {
    const box = document.getElementById(id);
    if (box) {
      box.src = `./image/${leftColors[index]}.jpg`;
    }
  });
  
  rightZoneIDs.forEach((id, index) => {
    const box = document.getElementById(id);
    if (box) {
      box.src = `./image/${rightColors[index]}.jpg`;
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