import React, {useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
  steerLeft,
  steerRight,
  throttleUp,
  throttleDown,
  selectX,
  selectY,
  selectSpeedX,
  selectSpeedY,
  selectThrottlePercent
} from "./helicopter/helicopter.js";

const Canvas = () => {
  const dispatch = useDispatch();

  const draw = ctx => {
    ctx.beginPath();
    ctx.arc(50, 50, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };

  const KeyDown = e => {
    if (e.key == "ArrowUp"){
      console.log(e.key);
      dispatch(throttleUp)
    }
    // switch (e.key) {
    //   case "ArrowDown":
    //     useDispatch(throttleDown)
    //     break;
    //   case "ArrowUp":
    //     useDispatch(throttleUp)
    //     break;
    //   case "ArrowRight":
    //     useDispatch(steerRight)
    //     break;
    //   case "ArrowLeft":
    //     useDispatch(steerLeft)
    //     break;
    //   default:
    // }
  };

  const keyUp = e => {

  };

  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context);
  }, [draw]);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      tabIndex="0"
      width="720"
      height="720"
      onKeyDown={KeyDown}
      onKeyUp={keyUp}
    ></canvas>
  );
};

export default Canvas;
