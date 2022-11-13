import React from "react";
import "../userstyle/loading-animation.scss";

export default function LoadingAnimation() {
  return (
    <>
      <div class="section-loading">
        <ul class="list-bars">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
