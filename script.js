// ================= ĐỒNG HỒ ĐẾM NGƯỢC ====================
let countdown;
let isRunning = false;
let isPaused = false;
let totalSeconds = 0;

function startCountdown() {
    if (isPaused && totalSeconds > 0) {
        resumeCountdown();
        return;
    }

    const hours = parseInt(document.getElementById("hours-input").value) || 0;
    const minutes = parseInt(document.getElementById("minutes-input").value) || 0;
    const seconds = parseInt(document.getElementById("seconds-input").value) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) return;

    document.getElementById("time-inputs").style.display = "none";
    document.getElementById("time-display").style.display = "flex";

    updateTimerDisplay();

    if (isRunning) {
        clearInterval(countdown);
    }

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
    [array[i], array[j]] = [array[j], array[i]]; // Sửa lỗi cú pháp: thêm dấu ] vào đoạn swap
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
      leftBox.style.display = "block";
    }

    const rightBox = document.getElementById(pair.right);
    if (rightBox) {
      rightBox.src = `./image/${color}.jpg`;
      rightBox.style.display = "block";
    }
  });
}
// ================= CHỌN THEO CẶP (GENERATE LAYOUT) =================
function generateLayout() {
  const regions1 = {
    top: ["blue1", "blue2", "blue3","blue4","blue5","blue6"],
    left: ["green1", "green2", "green3", "green4", "green5", "green6"],
    right: ["blue4", "blue6", "red2", "red4", "red6", "green4", "green6"]
  };

  const regions2 = {
    top: ["blue1", "blue2", "blue3","blue4","blue5","blue6"],
    right: ["green1", "green2", "green3", "green4", "green5", "green6"],
    left: ["blue4", "blue6", "red2", "red4", "red6", "green4", "green6"]
  };

  const regions3 = {
    left: ["blue1", "blue2", "blue3","blue4","blue5","blue6"],
    green: ["green1", "green2", "green3", "green4", "green5", "green6"],
    right: ["blue4", "blue6", "red2", "red4", "red6", "green4", "green6"]
  };

  const regions4 = {
    top: ["blue1", "blue2", "blue3","blue4","blue5","blue6"],
    right: ["green1", "green2", "green3", "green4", "green5", "green6"],
    left: ["blue4", "blue6", "red2", "red4", "red6", "green4", "green6"]
  };

  Object.values(regions1,regions2,regions3).flat().forEach(id => {
    const el = document.getElementById(id);
    if (!el) {
      console.error(`Element ${id} not found in DOM!`);
    } else {
      console.log(`Element ${id} found`);
    }
  });

  const caseNumber = Math.floor(Math.random() * 6) + 1;
  console.log("Selected case:", caseNumber);

  Object.values(regions).flat().forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.src = "";
      el.style.display = "none";
      el.style.visibility = "hidden";
      console.log(`Reset ${id}`);
    }
  });

  if (caseNumber === 1) {
    regions.top.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/green.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned green to ${id}, src: ${el.src}`);
      }
    });
    regions.left.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/blue.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned blue to ${id}, src: ${el.src}`);
      }
    });
    regions.right.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/red.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned red to ${id}, src: ${el.src}`);
      }
    });
  } else if (caseNumber === 2) {
    regions.top.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/red.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned red to ${id}, src: ${el.src}`);
      }
    });
    regions.left.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/blue.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned blue to ${id}, src: ${el.src}`);
      }
    });
    regions.right.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/green.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned green to ${id}, src: ${el.src}`);
      }
    });
  } else if (caseNumber === 3) {
    regions.top.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/green.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned green to ${id}, src: ${el.src}`);
      }
    });
    regions.left.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/red.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned red to ${id}, src: ${el.src}`);
      }
    });
    regions.right.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/blue.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned blue to ${id}, src: ${el.src}`);
      }
    });
  } else if (caseNumber === 4) {
    regions.top.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/blue.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned blue to ${id}, src: ${el.src}`);
      }
    });
    regions.left.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/red.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned red to ${id}, src: ${el.src}`);
      }
    });
    regions.right.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/green.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned green to ${id}, src: ${el.src}`);
      }
    });
  } else if (caseNumber === 5) {
    regions.top.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/red.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned red to ${id}, src: ${el.src}`);
      }
    });
    regions.left.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/green.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned green to ${id}, src: ${el.src}`);
      }
    });
    regions.right.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/blue.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned blue to ${id}, src: ${el.src}`);
      }
    });
  } else if (caseNumber === 6) {
    regions.top.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/blue.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned blue to ${id}, src: ${el.src}`);
      }
    });
    regions.left.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/green.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned green to ${id}, src: ${el.src}`);
      }
    });
    regions.right.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.src = `./image/red.jpg`;
        el.style.display = "block";
        el.style.visibility = "visible";
        console.log(`Assigned red to ${id}, src: ${el.src}`);
      }
    });
  }
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