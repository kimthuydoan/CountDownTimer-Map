// script.js

// Hàm random ảnh cho mỗi ô màu
const blueIDs = ["blue1", "blue2", "blue3", "blue4", "blue5", "blue6"];
const redIDs = ["red1", "red2", "red3", "red4", "red5", "red6"];
const greenIDs = ["green1", "green2", "green3", "green4", "green5", "green6"];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

function random() {
    const images = [
        ...Array(6).fill("blue"),
        ...Array(6).fill("red"),
        ...Array(6).fill("green")
    ];
    shuffle(images);
    const allIDs = [...blueIDs, ...redIDs, ...greenIDs];
    allIDs.forEach((id, index) => {
        const box = document.getElementById(id);
        if (box) {
            box.src = `./image/${images[index]}.jpg`;
        }
    });
}

function screenshot() {
    const mapElement = document.querySelector(".map.select");
    htmlToImage.toJpeg(mapElement, { quality: 0.95 })
        .then(function (dataUrl) {
            const link = document.createElement('a');
            link.download = 'Map.jpeg';
            link.href = dataUrl;
            link.click();
        });
}

// ĐỒNG HỒ ĐẾM NGƯỢC
let countdownInterval;
let remainingTime = 0;
let isPaused = false;
let warningPlayed = false;

function startCountdown() {
    const hours = parseInt(document.getElementById("hours-input").value) || 0;
    const minutes = parseInt(document.getElementById("minutes-input").value) || 0;
    const seconds = parseInt(document.getElementById("seconds-input").value) || 0;

    remainingTime = (hours * 3600 + minutes * 60 + seconds);

    if (remainingTime <= 0) {
        alert("Vui lòng nhập thời gian lớn hơn 0!");
        return;
    }

    if (countdownInterval) clearInterval(countdownInterval);
    isPaused = false;
    warningPlayed = false;

    document.getElementById("time-inputs").style.display = "none";
    document.getElementById("time-display").style.display = "flex";

    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

function updateCountdown() {
    if (isPaused) return;

    const hrs = Math.floor(remainingTime / 3600);
    const mins = Math.floor((remainingTime % 3600) / 60);
    const secs = remainingTime % 60;

    document.getElementById("hours").innerText = String(hrs).padStart(2, '0');
    document.getElementById("minutes").innerText = String(mins).padStart(2, '0');
    document.getElementById("seconds").innerText = String(secs).padStart(2, '0');

    if (remainingTime === 10 && !warningPlayed) {
        document.getElementById("beep-audio").play();
        document.querySelectorAll('.box span').forEach(el => el.classList.add('warning'));
        warningPlayed = true;
    }

    if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("time-display").innerHTML = `
            <div class="box"><span>🏁</span><p>Hết giờ!</p></div>
        `;
        return;
    }

    remainingTime--;
}

function pauseCountdown() {
    isPaused = !isPaused;
}

function resetCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    remainingTime = 0;
    isPaused = false;
    warningPlayed = false;

    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";

    document.getElementById("time-inputs").style.display = "flex";
    document.getElementById("time-display").style.display = "none";

    document.querySelectorAll('.box span').forEach(el => el.classList.remove('warning'));
}