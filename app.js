const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

const palette = document.getElementById("jsPalette");

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log("creating path in", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // console.log("creating line in", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

/*
function onMouseDown(event) {
  painting = true;
} 더이상 안쓸거다. 그냥 마우스무브 사용
*/

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  console.log(color);
  ctx.strokeStyle = color;
}

// function onMouseLeave(event) {
//   painting = false;
// }

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

//내가 추가한 팔레트

function selectColor(event) {
  const chosenColor = palette.value;
  //console.log(palette.value);
  ctx.strokeStyle = chosenColor;
}

palette.addEventListener("change", selectColor);
