import React from "react";
import "../userstyle/inside-card.scss";
import { useEffect } from "react";

export default function Questions({ account, mainContract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [num, setNum] = React.useState("");
  const [que, setQue] = React.useState([]);
  const getQuestionData = async (e) => {
    let no_q = await mainContract.getAllUserQuestionsId();
    setNum(no_q.length);
    for (let i = 0; i < no_q.length; i++) {
      const question = await mainContract.getQuestion(no_q[i]);
      let like = question.q_upvote;
      like = parseInt(like._hex, 16);
      const title = question.q_title;
      que.push([like, title]);
    }
    setQue(que);
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
      <div className="questions-block">
        <div className="card-title">
          <div className="title">
            <h3>
              <span>{num}</span> Questions
            </h3>
          </div>
          <div className="filter-btns">
            <button className="tag-button">Score</button>
            <button className="tag-button">Newest</button>
          </div>
        </div>
        <div className="card">
          {que.map((inde) => {
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
