const colorPalettes = [
  ["#152A3B", "#0D809C", "#F5C03E", "#D63826", "#EBEBD6"],
  ["#0F4155", "#5399A1", "#8CA96B", "#CB5548", "#E7E6F5"],
  ["#E8614F", "#F3F2DB", "#79C3A7", "#668065", "#4B3331"],
  ["#DBE5EC", "#336B87", "#2A3132", "#E94D35", "#EFAC55"]
];
let queueNumber = [0, 1, 2, 3, 4];
let size = 500;
let num = 10;
let colorThemeIndex = 2;
let currentPalette, tileLen;

function setup() {
  if (windowWidth < size) {
    size = windowWidth;
  }
  createCanvas(size, size);
  background(25);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  noStroke();
  tileLen = size / num;
  currentPalette = colorPalettes[colorThemeIndex];
  for (let x = 0; x < size; x += tileLen) {
    for (let y = 0; y < size; y += tileLen) {
      queueNumber = shuffle(queueNumber);
      fill(currentPalette[queueNumber[0]]);
      rect(x, y, tileLen, tileLen);
      fill(currentPalette[queueNumber[1]]);
      switch (round(random(0.51, 9.49))) {
        case 1:
          triangle(x, y, x, y + tileLen, x + tileLen, y + tileLen);
          break;
        case 2:
          triangle(x, y, x + tileLen, y, x + tileLen, y + tileLen);
          break;
        case 3:
          triangle(x + tileLen, y, x + tileLen, y + tileLen, x, y);
          break;
        case 4:
          triangle(x + tileLen, y + tileLen, x + tileLen, y, x, y);
          break;
        case 5:
          triangle(x + tileLen, y, x + tileLen, y + tileLen, x, y + tileLen);
          break;
        case 6:
          triangle(x, y, x + tileLen, y + tileLen, x, y + tileLen);
          break;
        case 7:
          triangle(x + tileLen, y, x, y, x + tileLen, y + tileLen);
          break;
        case 8:
          triangle(x, y + tileLen, x + tileLen, y, x, y);
          break;
        case 9:
          triangle(x + tileLen, y, x, y + tileLen, x + tileLen, y + tileLen);
          break;
      }
    }
  }
}

function mouseClicked() {
  colorThemeIndex = (colorThemeIndex + 1) % 4;
  redraw();
}

function keyPressed() {
  if (keyCode >= 49 && keyCode <= 57) {
    num = Number(key);
    redraw();
  }
}
