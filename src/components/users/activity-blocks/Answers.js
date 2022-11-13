import React from "react";
import "../general-block/useractivity.scss";
import { useEffect } from "react";

export default function Answers({ account, mainContract }) {
  // var list = `Who's the person with more answers than Jon Skeet? When will
  //               they catch him in rep terms? Who's the person with more answers
  //               than Jon Skeet? When will they catch him in rep terms?`;

  // var resultList = list.slice(0, 70) + "...";
  const [isLoading, setLoading] = React.useState(true);
  const [num, setNum] = React.useState("");
  const [ans, setAns] = React.useState([]);
  const getQuestionData = async (e) => {
    let no_a = await mainContract.getAllUserAnswersId();
    setNum(no_a.length);
    for (let i = 0; i < no_a.length; i++) {
      const answer = await mainContract.getAnswer(no_a[i]);
      let like = answer.a_upvote;
      like = parseInt(like._hex, 16);
      const title = answer.a_cid;
      ans.push([like, title]);
    }
    setAns(ans);
    setLoading(false);
  };

  useEffect(() => {
    getQuestionData();
  }, [mainContract]);

  if (isLoading) {
    return "loading";
  }
  return (
    <>
      <div className="answers-block">
        <div className="card-title">
          <div className="title">
            <h3>
              <span>{num}</span> Answers
            </h3>
          </div>
          <div className="filter-btns">
            <button className="tag-button">Score</button>
            <button className="tag-button">Newest</button>
          </div>
        </div>
        <div className="card">
          {/* loop this code from here to */}
          {ans.map((inde) => {
            return (
              <div className="div-creator">
                <div className="inside-div-creator">
                  <div className="total-likes">{inde[0]}</div>
                  <div className="qa-list">{inde[1]}</div>
                  {/* <div className="qa-date">24 July 2022</div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
