import React from "react";
import "./Cryptoinfo-style/Coin.scss";
function Coin({ name, icon, price, symbol }) {
  return (
    <>
      <div className="coin">
        <div>
          <img className="imgs" src={icon}></img>
        </div>

        <div className="name">
          <h1>{name}</h1>
        </div>

        <div className="price">
          <h3 className="coin-h3-style">{price}</h3>
        </div>

        <div className="symbol">
          <h3 className="coin-h3-style">{symbol}</h3>
        </div>
      </div>
    </>
  );
}
export default Coin;
