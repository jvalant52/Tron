import React from "react";
import "../userstyle/loading-anim-trans.scss";

export default function LoadingAnimTrans() {
  return (
    <>
      <div className="loading-background">
        <div class="loading-container">
          <div className="loading-title">
            <h2>Waiting For Transaction To Be Completed</h2>
          </div>
          <div class="loading-block">
            <div class="circle green"></div>
            <div class="circle orange"></div>
          </div>
        </div>
      </div>
    </>
  );
}
