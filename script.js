// ================== ĐỒNG HỒ ĐẾM NGƯỢC ====================
let countdown;
let isRunning = false;
let isPaused = false;
let totalSeconds = 0;

function startCountdown() {
    // Nếu đang pause thì tiếp tục
    if (isPaused && totalSeconds > 0) {
        resumeCountdown();
        return;
    }

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
    startInterval();
}

function startInterval() {
    isRunning = true;
    isPaused = false;

    countdown = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();

            if (totalSeconds < 30) {
                document.getElementById("seconds").classList.add("warning");

                const audio = document.getElementById("beep-audio");
                if (audio.paused) {
                    audio.play();
                }
            }
        } else {
            clearInterval(countdown);
            isRunning = false;
            isPaused = false;

            const audio = document.getElementById("beep-audio");
            audio.pause();
            audio.currentTime = 0;

            alert("Hết giờ!");
        }
    }, 1000);
}

function resumeCountdown() {
    if (!isRunning && totalSeconds > 0) {
        startInterval();
    }
}

function pauseCountdown() {
    if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
        isPaused = true;

        const audio = document.getElementById("beep-audio");
        audio.pause();
    }
}

function resetCountdown() {
    clearInterval(countdown);
    isRunning = false;
    isPaused = false;

    document.getElementById("time-inputs").style.display = "flex";
    document.getElementById("time-display").style.display = "none";

    document.getElementById("hours-input").value = "0";
    document.getElementById("minutes-input").value = "12";
    document.getElementById("seconds-input").value = "0";

    document.getElementById("seconds").classList.remove("warning");

    const audio = document.getElementById("beep-audio");
    audio.pause();
    audio.currentTime = 0;
}

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}


// ================= CHỌN NGẪU NHIÊN Ô MÀU =====================

const symmetricPairs = [
  { left: "blue1", right: "blue2" },
  { left: "blue3", right: "blue4" },
  { left: "blue5", right: "blue6" },
  { left: "red1", right: "red2" },
  { left: "red3", right: "red4" },
  { left: "red5", right: "red6" },
  { left: "green1", right: "green2" },
  { left: "green3", right: "green4" },
  { left: "green5", right: "green6" }
];

const leftZoneIDs = symmetricPairs.map(pair => pair.left);
const rightZoneIDs = symmetricPairs.map(pair => pair.right);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function random() {
  const colorPool = [...Array(3).fill("blue"), ...Array(3).fill("red"), ...Array(3).fill("green")];
  const shuffledColors = shuffle([...colorPool]);

  symmetricPairs.forEach((pair, index) => {
    const color = shuffledColors[index];

    const leftBox = document.getElementById(pair.left);
    if (leftBox) {
      leftBox.src = `./image/${color}.jpg`;
    }

    const rightBox = document.getElementById(pair.right);
    if (rightBox) {
      rightBox.src = `./image/${color}.jpg`;
    }
  });
}

// ================= CHỌN THEO CẶP (RANDOM PAIR) =================

function randomPair() {
  console.log("randomPair function called"); // Debugging
  
  // Define the left side IDs
  const leftSideIds = {
    blue: ["blue1", "blue3", "blue5"],   // Blue balls on left side
    red: ["red1", "red3", "red5"],       // Red balls on top
    green: ["green1", "green3", "green5"] // Green balls on right
  };
  
  // Define the right side IDs (symmetric to left side)
  const rightSideIds = {
    blue: ["blue2", "blue4", "blue6"],    // Blue balls on right side
    red: ["red2", "red4", "red6"],        // Red balls on top
    green: ["green2", "green4", "green6"]  // Green balls on left
  };

  // Set all left side balls
  leftSideIds.blue.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.src = "./image/blue.jpg"; // Blue balls on left side
    }
  });
  
  leftSideIds.red.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.src = "./image/red.jpg"; // Red balls on top
    }
  });
  
  leftSideIds.green.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.src = "./image/green.jpg"; // Green balls on right
    }
  });
  
  // Set all right side balls (mirror symmetry)
  rightSideIds.blue.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.src = "./image/blue.jpg"; // Blue balls on right side
    }
  });
  
  rightSideIds.red.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.src = "./image/red.jpg"; // Red balls on top
    }
  });
  
  rightSideIds.green.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.src = "./image/green.jpg"; // Green balls on left
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