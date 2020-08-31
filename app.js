const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const palette = document.getElementById("jsPalette");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// function onMouseLeave(event) {
//   painting = false;
// }

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

//내가 추가한 팔레트

function selectColor(event) {
  const chosenColor = palette.value;
  //console.log(palette.value);
  ctx.strokeStyle = chosenColor;
  ctx.fillStyle = chosenColor;
}

if (palette) {
  palette.addEventListener("change", selectColor);
  palette.addEventListener("click", selectColor);
}

function handleBurshSize(event) {
  //const brushSize = range.value;
  const brushSize = event.target.value;
  ctx.lineWidth = brushSize;
}

if (range) {
  range.addEventListener("change", handleBurshSize);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
