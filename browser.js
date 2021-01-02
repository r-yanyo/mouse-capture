"use strict";

const { remote } = require("electron");

setInterval(() => {
  const mousePos = remote.getGlobal("mousePos");
  const screenSize = remote.getGlobal("screenSize");

  const { normalizedX, normalizedY } = normalize(
    mousePos.x,
    mousePos.y,
    screenSize.width,
    screenSize.height
  );
  const baseX = screenSize.width / 2;
  const baseY = 0;

  const angle = calcAngle(mousePos.x, mousePos.y, baseX, baseY);
  const norm = calcNorm(mousePos.x, mousePos.y, baseX, baseY);

  document.getElementById("image").style.height = norm / 7 + "px";
  document.getElementById("image").style.transform = `rotateZ(${angle}deg)`;
}, 10);

function normalize(inputX, inputY, screenMaxX, screenMaxY) {
  const normalizedX = parseInt((inputX * window.innerWidth) / screenMaxX, 10);
  const normalizedY = parseInt((inputY * window.innerHeight) / screenMaxY, 10);
  return { normalizedX, normalizedY };
}

function calcAngle(inputX, inputY, baseX, baseY) {
  const x = inputX - baseX;
  const y = inputY - baseY;
  return -(Math.atan2(x, y) * 180) / Math.PI;
}

function calcNorm(inputX, inputY, baseX, baseY) {
  const x = inputX - baseX;
  const y = inputY - baseY;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
