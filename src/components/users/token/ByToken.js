import React from "react";
import "./ByToken.scss";

const ByToken = ({ account, tokenContract }) => {
  const [count, setCount] = React.useState("");
  async function buytoken() {
    const tx = tokenContract.buyTokens(count);
    await tx.wait();
  }
  return (
    <>
      <div className="bytoken-main">
        <div className="token-main">
          <label className="token-lbl">Buy Tokens</label>
        </div>

        <div className="token-text">
          <input
            type="text"
            onChange={(event) => {
              setCount(event.target.value);
            }}
          ></input>
        </div>
        <div className="token-submit">
          <input type="submit" onClick={buytoken} />
        </div>
      </div>
    </>
  );
};
export default ByToken;
