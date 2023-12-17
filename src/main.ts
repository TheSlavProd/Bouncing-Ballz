document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById(
    "bouncingBallzCanvas"
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const circles: Circle[] = [];
  let lastTime = 0;

  interface Circle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocityY: number;
    gravity: number;
    dampening: number;
  }

  const backgroundColor = "#f0f0f0";

  const image = new Image();
  image.src = "./assets/BouncingBallz.png";
  image.onload = () => initializeCanvas();

  const controlsContainer = createControlsContainer();

  document.body.appendChild(controlsContainer);

  function createControlsContainer() {
    const container = document.createElement("div");
    container.style.cssText =
      "position: absolute; top: 120px; left: 10px; user-select: none;";
    container.appendChild(createDisplay());
    container.appendChild(createClearButton());
    return container;
  }

  function createDisplay() {
    const display = document.createElement("div");
    display.style.cssText = "color: black; font-weight: bold;";
    display.textContent = "Ballz count: 0";
    return display;
  }

  function createClearButton() {
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear Ballz";
    clearButton.style.cssText =
      "padding: 10px 20px; margin-top: 10px; border: none; border-radius: 10px; background-color: #ff6464; color: #fff; cursor: pointer;";
    clearButton.addEventListener("click", clearCircles);
    return clearButton;
  }

  function updateBallCountDisplay() {
    controlsContainer.firstChild!.textContent = `Ballz count: ${circles.length}`;
  }

  function spawnCircle(event: MouseEvent) {
    if (circles.length < 15) {
      const newCircle: Circle = {
        x: event.clientX,
        y: event.clientY,
        radius: 20,
        color: getRandomColor(),
        velocityY: 0,
        gravity: 0.5,
        dampening: 0.8,
      };
      circles.push(newCircle);
      updateBallCountDisplay();
    }
  }

  function clearCircles() {
    circles.length = 0;
    updateBallCountDisplay();
  }

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.addEventListener("click", spawnCircle);
  }

  function updateCircles(deltaTime: number) {
    circles.forEach((circle) => {
      circle.velocityY += circle.gravity;
      circle.y += circle.velocityY;

      if (circle.y + circle.radius > canvas.height) {
        circle.y = canvas.height - circle.radius;
        circle.velocityY *= -circle.dampening;
        circle.color = getRandomColor();
      }
    });
  }

  function drawCircles() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.fillStyle = backgroundColor;
    ctx!.fillRect(0, 0, canvas.width, canvas.height);

    const imageWidth = 300;
    const imageHeight = 120;
    ctx?.drawImage(
      image,
      canvas.width / 2 - imageWidth / 2,
      10,
      imageWidth,
      imageHeight
    );

    circles.forEach((circle) => {
      ctx?.beginPath();
      ctx?.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx!.fillStyle = circle.color;
      ctx?.fill();
      ctx?.stroke();
    });
  }

  function tick(currentTime: number) {
    const deltaTime = currentTime - lastTime;
    updateCircles(deltaTime);
    drawCircles();
    lastTime = currentTime;
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", initializeCanvas);
  initializeCanvas();
  requestAnimationFrame(tick);
});
