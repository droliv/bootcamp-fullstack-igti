let redValue = document.querySelector('#redValue');
let greenValue = document.querySelector('#greenValue');
let blueValue = document.querySelector('#blueValue');
let blockColor = document.querySelector('.block');
redValue.value = 0;
greenValue.value = 0;
blueValue.value = 0;

function alterElement(element) {
  console.log(element);
}
function alterRed(element) {
  redValue.value = element.value;
  alterBlock();
}
function alterGreen(element) {
  greenValue.value = element.value;
  alterBlock();
}
function alterBlue(element) {
  blueValue.value = element.value;
  alterBlock();
}

function alterBlock() {
  blockColor.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
  console.log(blockColor.style.backgroundColor);
}
