const circles = [];
const total = 200;
let currentImage;

/**
 * Will be called on mount
 */
function setup() {
  const cnv = createCanvas(windowWidth / 2, windowHeight);
  const x = windowWidth - width;
  const y = windowHeight - height;
  cnv.position(x, y);

  const imageUpload = document.getElementById("image_upload");
  imageUpload.addEventListener("change", uploadImage, false);

  renderImage("./bigil.jpg");
}

/**
 * Will be called on each request animation frame
 */

function draw() {
  if (!currentImage) {
    return;
  }

  for (let i = 0; i < total; i++) {
    const circle = circles[i];
    circle.angle += (1 / circle.radius) * circle.dir;
    circle.pos.x += cos(circle.angle) * circle.radius;
    circle.pos.y += sin(circle.angle) * circle.radius;

    if (
      brightness(currentImage.get(round(circle.pos.x), round(circle.pos.y))) >
        70 ||
      circle.pos.x < 0 ||
      circle.pos.x > width ||
      circle.pos.y < 0 ||
      circle.pos.y > height
    ) {
      circle.dir *= -1;
      circle.radius = random(3, 10);
      circle.angle += PI;
    }

    /**
     * Extracting color from the pos and applying
     */
    stroke(currentImage.get(circle.pos.x, circle.pos.y));

    /**
     * Drawing lines between previous pos to current pos
     */
    line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y);

    /**
     * Setting previous pos
     */
    circle.prevPos.x = circle.pos.x;
    circle.prevPos.y = circle.pos.y;
  }
}

/**
 * Image upload handler
 */

function uploadImage(event) {
  const reader = new FileReader();
  reader.onload = event => {
    renderImage(event.target.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

function renderImage(imagePath) {
  loadImage(imagePath, loadedImage => {
    background(10);
    currentImage = loadedImage;
    // console.log(, currentImage.width);

    for (let i = 0; i < total; i++) {
      circles[i] = {};
      circles[i].prevPos = {
        x: currentImage.width / 2,
        y: currentImage.height / 2
      };
      circles[i].pos = {
        x: currentImage.width / 2,
        y: currentImage.height / 2
      };
      circles[i].dir = random() > 0.5 ? 1 : -1;
      circles[i].radius = random(5, 10);
      circles[i].angle = 0;
    }
  });
}
