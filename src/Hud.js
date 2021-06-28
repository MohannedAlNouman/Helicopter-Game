import React from "react";
import {useSelector} from "react-redux";

import {
  selectY,
  selectSpeedX,
  selectSpeedY,
  selectThrottlePercent
} from "./helicopter/helicopter.js";

const Hud = () => {
  return (
    <div className="hud">
      <div className="hudInfo">
        <div className="leftSide">
          Altitude: {Math.round(useSelector(selectY))} pixels
        </div>
        <div className="rightSide">
          Speed X: {useSelector(selectSpeedX)} pixels/second
        </div>
      </div>
      <br />
      <div>Speed Y: {Math.round(useSelector(selectSpeedY))} pixels/second</div>
      <div>Acceleration: {useSelector(selectThrottlePercent)}/100%</div>
    </div>
  );
};

export default Hud;
