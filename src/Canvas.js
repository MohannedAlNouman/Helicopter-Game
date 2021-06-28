import React, {useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
  userInput,
  selectX,
  selectY,
  selectSpeedX,
  selectSpeedY,
  selectThrottlePercent
} from "./helicopter/helicopter.js";

const Canvas = () => {
  const disptach = useDispatch();

  let gravity = -2;
  let accMax = 3;

  let initialX = useSelector(selectX);
  let initialY = useSelector(selectY);
  let speedX = useSelector(selectSpeedX);
  let speedY = useSelector(selectSpeedY);
  let accPercent = useSelector(selectThrottlePercent);
  let acc = (accPercent / 100) * accMax + gravity;
  let deltaT = 5 / 1000;

  let finalX = deltaT * speedX + initialX;
  let finalY = deltaT * speedY + initialY;
  let finalSpeedY = (deltaT * acc) / 2 + speedY;

  let coordinates = {
    x: finalX,
    y: finalY,
    speedY: finalSpeedY,
    direction: ""
  };

  const drawHelicopter = ctx => {
    ctx.beginPath();
    ctx.rect(finalX, 670 - finalY, 50, 50);
    ctx.fill();
    ctx.closePath();
  };

  const draw = ctx => {
    ctx.clearRect(0, 0, 720, 720);
    drawHelicopter(ctx);
  };

  const handleKeyDown = e => {
    // console.debug("Key event", e);

    if (e.key === "ArrowUp") {
      coordinates.direction = "up";
    } else if (e.key === "ArrowDown") {
      coordinates.direction = "down";
    } else if (e.key === "ArrowRight") {
      coordinates.direction = "right";
    } else if (e.key === "ArrowLeft") {
      coordinates.direction = "left";
    }
  };

  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context);
    disptach(userInput(coordinates));

    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [draw]);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      tabIndex="0"
      width="720"
      height="720"
      onKeyDown={handleKeyDown}
    ></canvas>
  );
};

export default Canvas;
