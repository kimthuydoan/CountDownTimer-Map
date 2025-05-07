
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
function randomPair() {
  const regions = {
    leftChild: {
      left: ["green1", "blue3", "blue5"],
      top: ["red1", "red3", "green5"],
      right: ["blue1", "green3", "red5"]
    },
    rightChild: {
      left: ["green2", "blue4", "blue6"],
      top: ["red2", "red4", "green6"],
      right: ["blue2", "green4", "red6"]
    }
  };

  
  const areaMapping = {
    LEFT: [...regions.leftChild.left, ...regions.rightChild.left], 
    TOP: [...regions.leftChild.top, ...regions.rightChild.top],    
    RIGHT: [...regions.leftChild.right, ...regions.rightChild.right] 
  };

  
  Object.values(areaMapping)
    .flat()
    .forEach((id) => {
      const el = document.getElementById(id);
      if (!el) {
        console.error(`Phần tử có ID ${id} không được tìm thấy trong DOM!`);
        return;
      }
      el.src = "";
      el.style.display = "none";
    });

 
  const caseNumber = Math.floor(Math.random() * 6) + 1;
  console.log(`Trường hợp được chọn: ${caseNumber}`);

  
  const cases = {
    1: { LEFT: "blue", TOP: "red", RIGHT: "green" },
    2: { LEFT: "blue", RIGHT: "red", TOP: "green" },
    3: { TOP: "blue", LEFT: "red", RIGHT: "green" },
    4: { TOP: "blue", RIGHT: "red", LEFT: "green" },
    5: { RIGHT: "blue", LEFT: "red", TOP: "green" },
    6: { RIGHT: "blue", TOP: "red", LEFT: "green" }
  };


  const selectedCase = cases[caseNumber];


  Object.entries(selectedCase).forEach(([area, color]) => {
    const ids = areaMapping[area];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) {
        console.error(`Phần tử có ID ${id} không được tìm thấy trong quá trình gán!`);
        return;
      }
      el.src = `./image/${color}.jpg`;
      el.style.display = "block";
      console.log(`Đã gán màu ${color} cho ${id}, src: ${el.src}`);
    });
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