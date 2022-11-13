import React from "react";
import { useState } from "react";
import "./AllQuestions.scss";
import { useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function AllQuestions({ account, mainContract }) {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = React.useState(true);
  const [content, setContent] = useState([]);

  const allQuestions = async (e) => {
    let num = await mainContract.q_id();
    num = parseInt(num._hex, 16);
    setCount(num);
    for (let i = 1; i <= num; i++) {
      const question = await mainContract.getQuestion(i);
      const title = question.q_title;
      let voted = question.q_upvote;
      voted = parseInt(voted._hex, 16);
      let ans_num = question.ans_id.length;
      console.log(ans_num);
      const address = question.user;
      const cid = await mainContract.getUserCID(address);
      var urls = question.q_cid.substring(7);
      var url = "https://ipfs.io/ipfs/" + urls;
      console.log(urls)
      // if (question.q_cid.substring(0, 4) === "ipfs") {
      //   url = "https://ipfs.io/ipfs/" + question.q_cid.substring(7);
      // }
      // else {
      //   url = "https://ipfs.io/ipfs/" + question.q_cid;
      // }
      await Axios.get(url).then((response) => {
        console.log(response.data);
        content.push([title, response.data.description, voted, ans_num, cid, i]);
        // setLoading(false);
      });

      setContent(content);
    }
    console.log(content);
    setLoading(false);
  };

  const add = async (e) => {
    const tx = await mainContract.q_upVote(e);
    await tx.wait();
  };
  const minus = async (e) => {
    const tx = await mainContract.q_downvote(e);
    await tx.wait();
  };

  useEffect(() => {
    if (mainContract) {
      allQuestions();
    }
  }, [mainContract]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      {content.map((inde) => {
        return (
          <div className="DisplayQuestions">
            <div className="DisplayQuestions-left">
              <div className="DisplayQuestions-votes">
                <p>{inde[2]}</p>
                <p> Votes</p>
              </div>
              <div className="DisplayQuestions-answer">
                <p> {inde[3]}</p>
                <p> Answer</p>
              </div>
              <div className="counter">
                <button className="plus" onClick={() => add(inde[5])}>
                  +
                </button>
                <div>
                  <h2>{inde[2]}</h2>
                </div>
                <button className="minus" onClick={() => minus(inde[5])}>
                  -
                </button>
              </div>
            </div>
            <div className="DisplayQuestions-right">
              <div>
                <div className="DisplayQuestions-askby">
                  <p>
                    <img
                      src={inde[4]}
                      alt=""
                      className="all-question-profile-img"
                    />
                    Ask by
                  </p>
                </div>
                {console.log(inde[5])}
                <Link
                  className="all-user-link"
                  to={"/single-question/"}
                  state={{ que_id: inde[5] }}
                >
                  <h3>{inde[0]}</h3>
                </Link>
                {inde[1]}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AllQuestions;
