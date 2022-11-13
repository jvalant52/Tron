import React from "react";
import i1 from "../100_USER_BADGE.png";

export default function Badges() {
  return (
    <>
      <div className="badges-block">
        <div className="card-title">
          <div className="title">
            <h3>
              <span>1</span> Badges
            </h3>
          </div>
        </div>
        <div className="card">
          <p>
            <img src={i1} width={50} height={50} alt="Badge1"></img>
          </p>
        </div>
      </div>
    </>
  );
}
