"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("bouncingBallzCanvas");
    var ctx = canvas.getContext("2d");
    var circles = [];
    var lastTime = 0;
    var backgroundColor = "#f0f0f0";
    var image = new Image();
    image.src = "./assets/BouncingBallz.png";
    image.onload = function () { return initializeCanvas(); };
    var controlsContainer = createControlsContainer();
    document.body.appendChild(controlsContainer);
    function createControlsContainer() {
        var container = document.createElement("div");
        container.style.cssText =
            "position: absolute; top: 120px; left: 10px; user-select: none;";
        container.appendChild(createDisplay());
        container.appendChild(createClearButton());
        return container;
    }
    function createDisplay() {
        var display = document.createElement("div");
        display.style.cssText = "color: black; font-weight: bold;";
        display.textContent = "Ballz count: 0";
        return display;
    }
    function createClearButton() {
        var clearButton = document.createElement("button");
        clearButton.textContent = "Clear Ballz";
        clearButton.style.cssText =
            "padding: 10px 20px; margin-top: 10px; border: none; border-radius: 10px; background-color: #ff6464; color: #fff; cursor: pointer;";
        clearButton.addEventListener("click", clearCircles);
        return clearButton;
    }
    function updateBallCountDisplay() {
        controlsContainer.firstChild.textContent = "Ballz count: ".concat(circles.length);
    }
    function spawnCircle(event) {
        if (circles.length < 15) {
            var newCircle = {
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
        return "#".concat(Math.floor(Math.random() * 16777215).toString(16));
    }
    function initializeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.addEventListener("click", spawnCircle);
    }
    function updateCircles(deltaTime) {
        circles.forEach(function (circle) {
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
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var imageWidth = 300;
        var imageHeight = 120;
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, canvas.width / 2 - imageWidth / 2, 10, imageWidth, imageHeight);
        circles.forEach(function (circle) {
            ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
            ctx === null || ctx === void 0 ? void 0 : ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            ctx.fillStyle = circle.color;
            ctx === null || ctx === void 0 ? void 0 : ctx.fill();
            ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
        });
    }
    function tick(currentTime) {
        var deltaTime = currentTime - lastTime;
        updateCircles(deltaTime);
        drawCircles();
        lastTime = currentTime;
        requestAnimationFrame(tick);
    }
    window.addEventListener("resize", initializeCanvas);
    initializeCanvas();
    requestAnimationFrame(tick);
});
