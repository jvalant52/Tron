import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { create } from "ipfs-http-client";
import Arrow from "./up-arrow";
import Axios from "axios";
import membericon from "./group.png";
import staticon from "./stats.png";
import "./singlequestion.scss";
import { useLocation } from "react-router";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function SingleQuestion({ account, mainContract, id }) {
  const editorRef = useRef(0);
  const location = useLocation();
  const id_q = location.state.que_id;
  console.log(id_q);
  const submitAnswer = async () => {
    var cid;
    // // const client = create("https://ipfs.infura.io:5001/api/v0");
    // const { cid } = await client.add([editorRef.current.getContent()]);
    // // console.log(cid._baseCache.get("z"));
    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/metadata',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '4455109c-4819-40f5-9ec5-5882af32a7ed'
      },
      data: {
        name: "'" + "" + "'",
        description: "'" + [editorRef.current.getContent()] + "'",
        file_url: "'" + "" + "'",

      }
    };
    var questionCID;
    await axios.request(options).then(function (response) {
      console.log(response.data.metadata_uri);
      cid = response.data.metadata_uri;
    }).catch(function (error) {
      console.error(error);
    });

    const answer_cid = cid;
    const question = await mainContract.getQuestion(id_q);
    const tx = await mainContract.addAnswer(question.q_id, answer_cid);
    await tx.wait();
  };

  const [isLoading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = useState([]);
  const [q_name, setQName] = useState("");
  const [a_content, setAContent] = useState([]);
  const [src, setSrc] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [score, setScore] = useState("");
  const [que, setQue] = useState("");
  const [ans, setAns] = useState("");
  const [ansLen, setAnsLen] = useState("");

  const getQuestionAndAnswer = async (e) => {
    const question = await mainContract.getQuestion(id_q);
    setTitle(question.q_title);
    // console.log(question.q_cid);
    // const url = "https://ipfs.io/ipfs/" + question.q_cid;
    var urls = question.q_cid.substring(7);
    var url = "https://ipfs.io/ipfs/" + urls;
    await Axios.get(url).then((response) => {
      console.log(response.data.description);
      setContent(response.data.description);
      // setLoading(false);
    });

    const que_taglist = question.q_taglist;
    for (let i = 0; i < que_taglist.length; i++) {
      // console.log(que_taglist[i]);
      src.push(que_taglist[i]);
    }
    setSrc(src);

    const answer = question.ans_id;
    setAnsLen(answer.length);

    console.log(answer);

    const addresss = question.user;
    const user = await mainContract.getUserCID(addresss);
    console.log(user);
    setUserImage(user);
    const name = await mainContract.getUserName(addresss);
    setQName(name);

    const userInfoStruct = await mainContract.getUserInfo(addresss);
    let score = userInfoStruct.reputationScore;
    score = parseInt(score._hex, 16);
    setScore(score);

    let noQuestions = userInfoStruct.noOfQuestions;
    noQuestions = parseInt(noQuestions._hex, 16);
    setQue(noQuestions);

    let noAnswers = userInfoStruct.noOfAnswers;
    noAnswers = parseInt(noAnswers._hex, 16);
    setAns(noAnswers);

    for (let i = 0; i < answer.length; i++) {
      let ans = parseInt(answer[i]._hex, 16);
      console.log(ans);
      const answerinfo = await mainContract.getAnswer(ans);
      const user_address = answerinfo.user;
      const name = await mainContract.getUserName(user_address);
      const user_cid = await mainContract.getUserCID(user_address);
      const userInfoStruct = await mainContract.getUserInfo(user_address);
      let score = userInfoStruct.reputationScore;
      score = parseInt(score._hex, 16);

      let noQuestions = userInfoStruct.noOfQuestions;
      noQuestions = parseInt(noQuestions._hex, 16);

      let noAnswers = userInfoStruct.noOfAnswers;
      noAnswers = parseInt(noAnswers._hex, 16);



      //------------------------------------------------------------------------------------------------------------------//

      //------------------------------------------------------------------------------------------------------------------//

      const ans_cid = answerinfo.a_cid;
      // const ans_url = "https://ipfs.io/ipfs/" + ans_cid;
      // console.log(ans_url);
      var ans_urls = answerinfo.a_cid.substring(7);
      var ans_url = "https://ipfs.io/ipfs/" + ans_urls;
      console.log(ans_url)
      await Axios.get(ans_url).then((response) => {
        console.log(response.data);
        a_content.push([
          response.data.description,
          user_cid,
          name,
          score,
          noQuestions,
          noAnswers,
        ]);
      });
      setAContent(a_content);
      console.log(a_content[0][0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuestionAndAnswer();
  }, [mainContract]);

  if (isLoading) {
    return "loading";
  }
  if (ansLen > 0) {
    return (
      <>
        <div className="DisplayFlex">
          <div className="left-section">
            <div className="single_Question">{title}</div>
            <div className="single_Question_description">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="custome_tags">
              <div className="disp-flex">
                <div className="left-side">
                  <div className="tags">
                    {src.map((inde) => {
                      return <div className="tag">{inde}</div>;
                    })}
                  </div>

                  <div className="vote-option">
                    <div className="up-down-vote">
                      <div className="upvote">
                        <Arrow />
                      </div>
                      <div className="downvote">
                        <Arrow />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile right-side">
                  <div className="all-user-profile-image">
                    <img src={userImage} alt="avatar" />
                  </div>
                  <div className="all-user-profile-right">
                    <h3>{q_name}</h3>
                    <h4>{score} Prominence</h4>
                    <div>
                      <svg
                        className="all-user-svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 122.88 96.44"
                      >
                        <path d="M12,73.51q.2-34.74.39-69.38A3.21,3.21,0,0,1,15,1h0C23.4-.75,36.64-.31,45.63,3.14a35.46,35.46,0,0,1,16,11.65,37.34,37.34,0,0,1,16-11.15C86.12.4,99-.38,108.23,1A3.2,3.2,0,0,1,111,4.14h0V73.8A3.21,3.21,0,0,1,107.77,77a3.49,3.49,0,0,1-.74-.09A53.45,53.45,0,0,0,83.58,79.1a71,71,0,0,0-15.77,8.26,69.09,69.09,0,0,1,21.24-3.1,125.42,125.42,0,0,1,27.41,3.48V14.84h3.21a3.21,3.21,0,0,1,3.21,3.21V91.94a3.21,3.21,0,0,1-3.21,3.21,3.18,3.18,0,0,1-1-.17A121.77,121.77,0,0,0,89,90.65a61.89,61.89,0,0,0-25.76,5.26,3.39,3.39,0,0,1-3.64,0,61.86,61.86,0,0,0-25.76-5.26A121.77,121.77,0,0,0,4.24,95a3.18,3.18,0,0,1-1,.17A3.21,3.21,0,0,1,0,91.94V18.05a3.21,3.21,0,0,1,3.21-3.21H6.42v72.9a125.42,125.42,0,0,1,27.41-3.48,68.84,68.84,0,0,1,22.71,3.57A48.7,48.7,0,0,0,41,79.39c-7-2.3-17.68-3.07-25.49-2.4A3.21,3.21,0,0,1,12,74.06a5,5,0,0,1,0-.55ZM73.64,64.4a2.3,2.3,0,1,1-2.5-3.85,51.46,51.46,0,0,1,11.8-5.4,53.73,53.73,0,0,1,13-2.67,2.29,2.29,0,1,1,.25,4.58,49.42,49.42,0,0,0-11.79,2.46A46.73,46.73,0,0,0,73.64,64.4Zm.2-17.76a2.29,2.29,0,0,1-2.46-3.87,52.71,52.71,0,0,1,11.74-5.3A54.12,54.12,0,0,1,95.9,34.85a2.3,2.3,0,0,1,.25,4.59,49.3,49.3,0,0,0-11.63,2.4,48,48,0,0,0-10.68,4.8Zm.06-17.7a2.3,2.3,0,1,1-2.46-3.89,52.54,52.54,0,0,1,11.72-5.27,53.71,53.71,0,0,1,12.74-2.6,2.29,2.29,0,1,1,.25,4.58,49.35,49.35,0,0,0-11.59,2.39A47.91,47.91,0,0,0,73.9,28.94ZM51.74,60.55a2.3,2.3,0,1,1-2.5,3.85,46.73,46.73,0,0,0-10.72-4.88,49.42,49.42,0,0,0-11.79-2.46A2.29,2.29,0,1,1,27,52.48a53.73,53.73,0,0,1,13,2.67,51.46,51.46,0,0,1,11.8,5.4ZM51.5,42.77A2.29,2.29,0,0,1,49,46.64a48,48,0,0,0-10.68-4.8,49.3,49.3,0,0,0-11.63-2.4A2.3,2.3,0,0,1,27,34.85a54.12,54.12,0,0,1,12.78,2.62,52.71,52.71,0,0,1,11.74,5.3Zm-.06-17.72A2.3,2.3,0,1,1,49,28.94a47.91,47.91,0,0,0-10.66-4.79,49.35,49.35,0,0,0-11.59-2.39A2.29,2.29,0,1,1,27,17.18a53.71,53.71,0,0,1,12.74,2.6,52.54,52.54,0,0,1,11.72,5.27ZM104.56,7c-7.42-.7-18.06.12-24.73,2.65A30,30,0,0,0,64.7,21.46V81.72a76.76,76.76,0,0,1,16.72-8.66,62.85,62.85,0,0,1,23.14-2.87V7ZM58.28,81.1V21.37c-3.36-5.93-8.79-9.89-14.93-12.24-7-2.67-17.75-3.27-24.56-2.3l-.36,63.56c7.43-.27,17.69.68,24.52,2.91a54.94,54.94,0,0,1,15.33,7.8Z" />
                      </svg>
                      <span>{que} Questions</span>
                    </div>
                    <div>
                      <span>
                        <svg
                          className="all-user-svg"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 115.031 122.88"
                        >
                          <g>
                            <path d="M68.988,7.718H27.144c-2.73,0-5.25,0.473-7.508,1.418c-2.258,0.945-4.357,2.362-6.248,4.252 c-1.89,1.89-3.307,3.99-4.252,6.248c-0.945,2.258-1.417,4.777-1.417,7.508V67.99c0,2.73,0.473,5.25,1.417,7.508 c0.945,2.258,2.363,4.357,4.252,6.248c1.943,1.89,4.043,3.36,6.301,4.252c2.258,0.945,4.725,1.418,7.455,1.418h17.956 c2.101,0,3.833,1.732,3.833,3.833c0,0.473-0.105,0.893-0.21,1.313c-0.683,2.52-1.417,5.04-2.258,7.455 c-0.893,2.572-1.837,4.987-2.888,7.35c-0.525,1.208-1.155,2.363-1.837,3.57c3.675-1.627,7.14-3.518,10.343-5.617 c3.36-2.205,6.511-4.673,9.398-7.351c2.939-2.73,5.564-5.723,7.979-8.925c0.735-0.998,1.891-1.522,3.046-1.522h15.436 c2.729,0,5.197-0.473,7.455-1.418c2.258-0.944,4.357-2.362,6.301-4.253c1.89-1.89,3.307-3.99,4.252-6.248 c0.945-2.257,1.418-4.777,1.418-7.508V27.249c0-2.73-0.473-5.25-1.418-7.508c-0.945-2.258-2.362-4.358-4.252-6.248 c-1.891-1.89-3.991-3.308-6.248-4.252c-2.258-0.945-4.778-1.417-7.508-1.417H68.988V7.718L68.988,7.718z M38.325,52.816 c-0.918-0.882-1.394-2.057-1.418-3.239c-0.023-1.182,0.404-2.375,1.286-3.294c0.882-0.918,2.056-1.394,3.238-1.417 c1.183-0.024,2.375,0.401,3.294,1.285l7.941,7.64l15.808-20.081c-0.007-0.02,0.132-0.137,0.153-0.152 c1.905-1.649,4.779-1.466,6.463,0.411c1.686,1.88,1.549,4.767-0.308,6.477L55.81,63.54c0.009,0.009-0.104,0.108-0.117,0.119 c-0.888,0.779-2.01,1.162-3.125,1.143c-1.125-0.02-2.247-0.446-3.121-1.285L38.325,52.816L38.325,52.816z M46.097,0.053h41.845 c3.675,0,7.14,0.683,10.395,1.995c3.203,1.313,6.144,3.308,8.769,5.933c2.625,2.625,4.62,5.565,5.933,8.768 c1.313,3.203,1.994,6.668,1.994,10.396V67.99c0,3.728-0.682,7.192-1.994,10.396s-3.308,6.143-5.933,8.768s-5.565,4.568-8.769,5.933 c-3.202,1.313-6.667,1.995-10.395,1.995H74.396c-2.362,2.993-4.936,5.828-7.665,8.4c-3.256,3.045-6.721,5.775-10.448,8.19 c-3.728,2.468-7.718,4.62-11.971,6.458c-4.2,1.838-8.715,3.359-13.44,4.62c-1.365,0.367-2.835-0.053-3.833-1.155 c-1.417-1.575-1.26-3.99,0.315-5.408c2.205-1.942,4.095-3.938,5.618-5.932c1.47-1.943,2.678-3.938,3.57-5.986v-0.052 c0.998-2.205,1.891-4.463,2.678-6.721c0.262-0.787,0.525-1.627,0.788-2.467H27.091c-3.675,0-7.14-0.683-10.396-1.996 c-3.203-1.312-6.143-3.307-8.768-5.933c-2.625-2.625-4.62-5.564-5.933-8.768C0.683,75.078,0,71.613,0,67.938V27.091 c0-3.675,0.683-7.141,1.995-10.396c1.313-3.203,3.308-6.143,5.933-8.768c2.625-2.625,5.565-4.62,8.768-5.933S23.363,0,27.091,0 h18.953L46.097,0.053L46.097,0.053z" />
                          </g>
                        </svg>
                        {ans} Answers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="Answers">
              <div className="Answer-heading">Answers</div>

              {a_content.map((inde) => {
                return (
                  <div className="Answer-component">
                    {/* Answer description */}
                    <div className="Answer-description">
                      <div dangerouslySetInnerHTML={{ __html: inde[0] }} />
                    </div>
                    {/* Answer Interaction */}
                    <div className="Answer-engagement">
                      <div className="answer-voting up-down-vote">
                        <div className="upvote">
                          <Arrow />
                        </div>
                        <div className="downvote">
                          <Arrow />
                        </div>
                      </div>
                      <div className="flex-grow"></div>

                      <div className="profile right-side">
                        <div className="all-user-profile-image">
                          <img src={inde[1]} alt="avatar" />
                        </div>
                        <div className="all-user-profile-right">
                          <h3>{inde[2]}</h3>
                          <h4>{inde[3]} Prominence</h4>
                          <div>
                            <svg
                              className="all-user-svg"
                              id="Layer_1"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 122.88 96.44"
                            >
                              <path d="M12,73.51q.2-34.74.39-69.38A3.21,3.21,0,0,1,15,1h0C23.4-.75,36.64-.31,45.63,3.14a35.46,35.46,0,0,1,16,11.65,37.34,37.34,0,0,1,16-11.15C86.12.4,99-.38,108.23,1A3.2,3.2,0,0,1,111,4.14h0V73.8A3.21,3.21,0,0,1,107.77,77a3.49,3.49,0,0,1-.74-.09A53.45,53.45,0,0,0,83.58,79.1a71,71,0,0,0-15.77,8.26,69.09,69.09,0,0,1,21.24-3.1,125.42,125.42,0,0,1,27.41,3.48V14.84h3.21a3.21,3.21,0,0,1,3.21,3.21V91.94a3.21,3.21,0,0,1-3.21,3.21,3.18,3.18,0,0,1-1-.17A121.77,121.77,0,0,0,89,90.65a61.89,61.89,0,0,0-25.76,5.26,3.39,3.39,0,0,1-3.64,0,61.86,61.86,0,0,0-25.76-5.26A121.77,121.77,0,0,0,4.24,95a3.18,3.18,0,0,1-1,.17A3.21,3.21,0,0,1,0,91.94V18.05a3.21,3.21,0,0,1,3.21-3.21H6.42v72.9a125.42,125.42,0,0,1,27.41-3.48,68.84,68.84,0,0,1,22.71,3.57A48.7,48.7,0,0,0,41,79.39c-7-2.3-17.68-3.07-25.49-2.4A3.21,3.21,0,0,1,12,74.06a5,5,0,0,1,0-.55ZM73.64,64.4a2.3,2.3,0,1,1-2.5-3.85,51.46,51.46,0,0,1,11.8-5.4,53.73,53.73,0,0,1,13-2.67,2.29,2.29,0,1,1,.25,4.58,49.42,49.42,0,0,0-11.79,2.46A46.73,46.73,0,0,0,73.64,64.4Zm.2-17.76a2.29,2.29,0,0,1-2.46-3.87,52.71,52.71,0,0,1,11.74-5.3A54.12,54.12,0,0,1,95.9,34.85a2.3,2.3,0,0,1,.25,4.59,49.3,49.3,0,0,0-11.63,2.4,48,48,0,0,0-10.68,4.8Zm.06-17.7a2.3,2.3,0,1,1-2.46-3.89,52.54,52.54,0,0,1,11.72-5.27,53.71,53.71,0,0,1,12.74-2.6,2.29,2.29,0,1,1,.25,4.58,49.35,49.35,0,0,0-11.59,2.39A47.91,47.91,0,0,0,73.9,28.94ZM51.74,60.55a2.3,2.3,0,1,1-2.5,3.85,46.73,46.73,0,0,0-10.72-4.88,49.42,49.42,0,0,0-11.79-2.46A2.29,2.29,0,1,1,27,52.48a53.73,53.73,0,0,1,13,2.67,51.46,51.46,0,0,1,11.8,5.4ZM51.5,42.77A2.29,2.29,0,0,1,49,46.64a48,48,0,0,0-10.68-4.8,49.3,49.3,0,0,0-11.63-2.4A2.3,2.3,0,0,1,27,34.85a54.12,54.12,0,0,1,12.78,2.62,52.71,52.71,0,0,1,11.74,5.3Zm-.06-17.72A2.3,2.3,0,1,1,49,28.94a47.91,47.91,0,0,0-10.66-4.79,49.35,49.35,0,0,0-11.59-2.39A2.29,2.29,0,1,1,27,17.18a53.71,53.71,0,0,1,12.74,2.6,52.54,52.54,0,0,1,11.72,5.27ZM104.56,7c-7.42-.7-18.06.12-24.73,2.65A30,30,0,0,0,64.7,21.46V81.72a76.76,76.76,0,0,1,16.72-8.66,62.85,62.85,0,0,1,23.14-2.87V7ZM58.28,81.1V21.37c-3.36-5.93-8.79-9.89-14.93-12.24-7-2.67-17.75-3.27-24.56-2.3l-.36,63.56c7.43-.27,17.69.68,24.52,2.91a54.94,54.94,0,0,1,15.33,7.8Z" />
                            </svg>
                            <span>{inde[4]} Questions</span>
                          </div>
                          <div>
                            <span>
                              <svg
                                className="all-user-svg"
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 115.031 122.88"
                              >
                                <g>
                                  <path d="M68.988,7.718H27.144c-2.73,0-5.25,0.473-7.508,1.418c-2.258,0.945-4.357,2.362-6.248,4.252 c-1.89,1.89-3.307,3.99-4.252,6.248c-0.945,2.258-1.417,4.777-1.417,7.508V67.99c0,2.73,0.473,5.25,1.417,7.508 c0.945,2.258,2.363,4.357,4.252,6.248c1.943,1.89,4.043,3.36,6.301,4.252c2.258,0.945,4.725,1.418,7.455,1.418h17.956 c2.101,0,3.833,1.732,3.833,3.833c0,0.473-0.105,0.893-0.21,1.313c-0.683,2.52-1.417,5.04-2.258,7.455 c-0.893,2.572-1.837,4.987-2.888,7.35c-0.525,1.208-1.155,2.363-1.837,3.57c3.675-1.627,7.14-3.518,10.343-5.617 c3.36-2.205,6.511-4.673,9.398-7.351c2.939-2.73,5.564-5.723,7.979-8.925c0.735-0.998,1.891-1.522,3.046-1.522h15.436 c2.729,0,5.197-0.473,7.455-1.418c2.258-0.944,4.357-2.362,6.301-4.253c1.89-1.89,3.307-3.99,4.252-6.248 c0.945-2.257,1.418-4.777,1.418-7.508V27.249c0-2.73-0.473-5.25-1.418-7.508c-0.945-2.258-2.362-4.358-4.252-6.248 c-1.891-1.89-3.991-3.308-6.248-4.252c-2.258-0.945-4.778-1.417-7.508-1.417H68.988V7.718L68.988,7.718z M38.325,52.816 c-0.918-0.882-1.394-2.057-1.418-3.239c-0.023-1.182,0.404-2.375,1.286-3.294c0.882-0.918,2.056-1.394,3.238-1.417 c1.183-0.024,2.375,0.401,3.294,1.285l7.941,7.64l15.808-20.081c-0.007-0.02,0.132-0.137,0.153-0.152 c1.905-1.649,4.779-1.466,6.463,0.411c1.686,1.88,1.549,4.767-0.308,6.477L55.81,63.54c0.009,0.009-0.104,0.108-0.117,0.119 c-0.888,0.779-2.01,1.162-3.125,1.143c-1.125-0.02-2.247-0.446-3.121-1.285L38.325,52.816L38.325,52.816z M46.097,0.053h41.845 c3.675,0,7.14,0.683,10.395,1.995c3.203,1.313,6.144,3.308,8.769,5.933c2.625,2.625,4.62,5.565,5.933,8.768 c1.313,3.203,1.994,6.668,1.994,10.396V67.99c0,3.728-0.682,7.192-1.994,10.396s-3.308,6.143-5.933,8.768s-5.565,4.568-8.769,5.933 c-3.202,1.313-6.667,1.995-10.395,1.995H74.396c-2.362,2.993-4.936,5.828-7.665,8.4c-3.256,3.045-6.721,5.775-10.448,8.19 c-3.728,2.468-7.718,4.62-11.971,6.458c-4.2,1.838-8.715,3.359-13.44,4.62c-1.365,0.367-2.835-0.053-3.833-1.155 c-1.417-1.575-1.26-3.99,0.315-5.408c2.205-1.942,4.095-3.938,5.618-5.932c1.47-1.943,2.678-3.938,3.57-5.986v-0.052 c0.998-2.205,1.891-4.463,2.678-6.721c0.262-0.787,0.525-1.627,0.788-2.467H27.091c-3.675,0-7.14-0.683-10.396-1.996 c-3.203-1.312-6.143-3.307-8.768-5.933c-2.625-2.625-4.62-5.564-5.933-8.768C0.683,75.078,0,71.613,0,67.938V27.091 c0-3.675,0.683-7.141,1.995-10.396c1.313-3.203,3.308-6.143,5.933-8.768c2.625-2.625,5.565-4.62,8.768-5.933S23.363,0,27.091,0 h18.953L46.097,0.053L46.097,0.053z" />
                                </g>
                              </svg>
                              {inde[5]} Answers
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Enter the Answer */}
              <div className="Text-area">
                <div className="Instruction-title">Enter Answer below.</div>
                <Editor
                  apiKey=""
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | image",
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: "image",
                    file_picker_callback: function (callback, value, meta) {
                      if (meta.filetype == "image") {
                        var input = document.getElementById("my-file");
                        input.click();
                        input.onchange = function () {
                          var file = input.files[0];
                          var reader = new FileReader();
                          reader.onload = function (e) {
                            console.log("name", e.target.result);
                            callback(e.target.result, {
                              alt: file.name,
                            });
                          };
                          reader.readAsDataURL(file);
                        };
                      }
                    },
                    paste_data_images: true,

                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                // tinymce.init({
                //     selector: 'textarea',  // change this value according to your HTML
                //     plugins: 'image',
                //     toolbar: 'image',
                //     image_list: [
                //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
                //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
                //     ]
                //   });
                />
              </div>

              <div className="submit-answer">
                <button
                  className="submit-answer-btn"
                  onClick={() => {
                    submitAnswer();
                  }}
                >
                  Submit the answer.
                </button>
              </div>
            </div>
          </div>
          <div>
            <Sidebar mainContract={mainContract} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="main">
          <div className="left-section">
            <div className="single_Question">{title}</div>
            <div className="single_Question_description">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="custome_tags">
              <div className="disp-flex">
                <div className="left-side">
                  <div className="tags">
                    {src.map((inde) => {
                      return <div className="tag">{inde}</div>;
                    })}
                  </div>

                  <div className="vote-option">
                    <div className="up-down-vote">
                      <div className="upvote">
                        <Arrow />
                      </div>
                      <div className="downvote">
                        <Arrow />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile right-side">
                  <div className="all-user-profile-image">
                    <img src={userImage} alt="avatar" />
                  </div>
                  <div className="all-user-profile-right">
                    <h3>hi</h3>
                    <h4>{score} Prominence</h4>
                    <div>
                      <svg
                        className="all-user-svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 122.88 96.44"
                      >
                        <path d="M12,73.51q.2-34.74.39-69.38A3.21,3.21,0,0,1,15,1h0C23.4-.75,36.64-.31,45.63,3.14a35.46,35.46,0,0,1,16,11.65,37.34,37.34,0,0,1,16-11.15C86.12.4,99-.38,108.23,1A3.2,3.2,0,0,1,111,4.14h0V73.8A3.21,3.21,0,0,1,107.77,77a3.49,3.49,0,0,1-.74-.09A53.45,53.45,0,0,0,83.58,79.1a71,71,0,0,0-15.77,8.26,69.09,69.09,0,0,1,21.24-3.1,125.42,125.42,0,0,1,27.41,3.48V14.84h3.21a3.21,3.21,0,0,1,3.21,3.21V91.94a3.21,3.21,0,0,1-3.21,3.21,3.18,3.18,0,0,1-1-.17A121.77,121.77,0,0,0,89,90.65a61.89,61.89,0,0,0-25.76,5.26,3.39,3.39,0,0,1-3.64,0,61.86,61.86,0,0,0-25.76-5.26A121.77,121.77,0,0,0,4.24,95a3.18,3.18,0,0,1-1,.17A3.21,3.21,0,0,1,0,91.94V18.05a3.21,3.21,0,0,1,3.21-3.21H6.42v72.9a125.42,125.42,0,0,1,27.41-3.48,68.84,68.84,0,0,1,22.71,3.57A48.7,48.7,0,0,0,41,79.39c-7-2.3-17.68-3.07-25.49-2.4A3.21,3.21,0,0,1,12,74.06a5,5,0,0,1,0-.55ZM73.64,64.4a2.3,2.3,0,1,1-2.5-3.85,51.46,51.46,0,0,1,11.8-5.4,53.73,53.73,0,0,1,13-2.67,2.29,2.29,0,1,1,.25,4.58,49.42,49.42,0,0,0-11.79,2.46A46.73,46.73,0,0,0,73.64,64.4Zm.2-17.76a2.29,2.29,0,0,1-2.46-3.87,52.71,52.71,0,0,1,11.74-5.3A54.12,54.12,0,0,1,95.9,34.85a2.3,2.3,0,0,1,.25,4.59,49.3,49.3,0,0,0-11.63,2.4,48,48,0,0,0-10.68,4.8Zm.06-17.7a2.3,2.3,0,1,1-2.46-3.89,52.54,52.54,0,0,1,11.72-5.27,53.71,53.71,0,0,1,12.74-2.6,2.29,2.29,0,1,1,.25,4.58,49.35,49.35,0,0,0-11.59,2.39A47.91,47.91,0,0,0,73.9,28.94ZM51.74,60.55a2.3,2.3,0,1,1-2.5,3.85,46.73,46.73,0,0,0-10.72-4.88,49.42,49.42,0,0,0-11.79-2.46A2.29,2.29,0,1,1,27,52.48a53.73,53.73,0,0,1,13,2.67,51.46,51.46,0,0,1,11.8,5.4ZM51.5,42.77A2.29,2.29,0,0,1,49,46.64a48,48,0,0,0-10.68-4.8,49.3,49.3,0,0,0-11.63-2.4A2.3,2.3,0,0,1,27,34.85a54.12,54.12,0,0,1,12.78,2.62,52.71,52.71,0,0,1,11.74,5.3Zm-.06-17.72A2.3,2.3,0,1,1,49,28.94a47.91,47.91,0,0,0-10.66-4.79,49.35,49.35,0,0,0-11.59-2.39A2.29,2.29,0,1,1,27,17.18a53.71,53.71,0,0,1,12.74,2.6,52.54,52.54,0,0,1,11.72,5.27ZM104.56,7c-7.42-.7-18.06.12-24.73,2.65A30,30,0,0,0,64.7,21.46V81.72a76.76,76.76,0,0,1,16.72-8.66,62.85,62.85,0,0,1,23.14-2.87V7ZM58.28,81.1V21.37c-3.36-5.93-8.79-9.89-14.93-12.24-7-2.67-17.75-3.27-24.56-2.3l-.36,63.56c7.43-.27,17.69.68,24.52,2.91a54.94,54.94,0,0,1,15.33,7.8Z" />
                      </svg>
                      <span>{que} Questions</span>
                    </div>
                    <div>
                      <span>
                        <svg
                          className="all-user-svg"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 115.031 122.88"
                        >
                          <g>
                            <path d="M68.988,7.718H27.144c-2.73,0-5.25,0.473-7.508,1.418c-2.258,0.945-4.357,2.362-6.248,4.252 c-1.89,1.89-3.307,3.99-4.252,6.248c-0.945,2.258-1.417,4.777-1.417,7.508V67.99c0,2.73,0.473,5.25,1.417,7.508 c0.945,2.258,2.363,4.357,4.252,6.248c1.943,1.89,4.043,3.36,6.301,4.252c2.258,0.945,4.725,1.418,7.455,1.418h17.956 c2.101,0,3.833,1.732,3.833,3.833c0,0.473-0.105,0.893-0.21,1.313c-0.683,2.52-1.417,5.04-2.258,7.455 c-0.893,2.572-1.837,4.987-2.888,7.35c-0.525,1.208-1.155,2.363-1.837,3.57c3.675-1.627,7.14-3.518,10.343-5.617 c3.36-2.205,6.511-4.673,9.398-7.351c2.939-2.73,5.564-5.723,7.979-8.925c0.735-0.998,1.891-1.522,3.046-1.522h15.436 c2.729,0,5.197-0.473,7.455-1.418c2.258-0.944,4.357-2.362,6.301-4.253c1.89-1.89,3.307-3.99,4.252-6.248 c0.945-2.257,1.418-4.777,1.418-7.508V27.249c0-2.73-0.473-5.25-1.418-7.508c-0.945-2.258-2.362-4.358-4.252-6.248 c-1.891-1.89-3.991-3.308-6.248-4.252c-2.258-0.945-4.778-1.417-7.508-1.417H68.988V7.718L68.988,7.718z M38.325,52.816 c-0.918-0.882-1.394-2.057-1.418-3.239c-0.023-1.182,0.404-2.375,1.286-3.294c0.882-0.918,2.056-1.394,3.238-1.417 c1.183-0.024,2.375,0.401,3.294,1.285l7.941,7.64l15.808-20.081c-0.007-0.02,0.132-0.137,0.153-0.152 c1.905-1.649,4.779-1.466,6.463,0.411c1.686,1.88,1.549,4.767-0.308,6.477L55.81,63.54c0.009,0.009-0.104,0.108-0.117,0.119 c-0.888,0.779-2.01,1.162-3.125,1.143c-1.125-0.02-2.247-0.446-3.121-1.285L38.325,52.816L38.325,52.816z M46.097,0.053h41.845 c3.675,0,7.14,0.683,10.395,1.995c3.203,1.313,6.144,3.308,8.769,5.933c2.625,2.625,4.62,5.565,5.933,8.768 c1.313,3.203,1.994,6.668,1.994,10.396V67.99c0,3.728-0.682,7.192-1.994,10.396s-3.308,6.143-5.933,8.768s-5.565,4.568-8.769,5.933 c-3.202,1.313-6.667,1.995-10.395,1.995H74.396c-2.362,2.993-4.936,5.828-7.665,8.4c-3.256,3.045-6.721,5.775-10.448,8.19 c-3.728,2.468-7.718,4.62-11.971,6.458c-4.2,1.838-8.715,3.359-13.44,4.62c-1.365,0.367-2.835-0.053-3.833-1.155 c-1.417-1.575-1.26-3.99,0.315-5.408c2.205-1.942,4.095-3.938,5.618-5.932c1.47-1.943,2.678-3.938,3.57-5.986v-0.052 c0.998-2.205,1.891-4.463,2.678-6.721c0.262-0.787,0.525-1.627,0.788-2.467H27.091c-3.675,0-7.14-0.683-10.396-1.996 c-3.203-1.312-6.143-3.307-8.768-5.933c-2.625-2.625-4.62-5.564-5.933-8.768C0.683,75.078,0,71.613,0,67.938V27.091 c0-3.675,0.683-7.141,1.995-10.396c1.313-3.203,3.308-6.143,5.933-8.768c2.625-2.625,5.565-4.62,8.768-5.933S23.363,0,27.091,0 h18.953L46.097,0.053L46.097,0.053z" />
                          </g>
                        </svg>
                        {ans} Answers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Answers">
              {/* Enter the Answer */}
              <div className="Text-area">
                <div className="Instruction-title">Enter Answer below.</div>
                <Editor
                  apiKey=""
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | image",
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: "image",
                    file_picker_callback: function (callback, value, meta) {
                      if (meta.filetype == "image") {
                        var input = document.getElementById("my-file");
                        input.click();
                        input.onchange = function () {
                          var file = input.files[0];
                          var reader = new FileReader();
                          reader.onload = function (e) {
                            console.log("name", e.target.result);
                            callback(e.target.result, {
                              alt: file.name,
                            });
                          };
                          reader.readAsDataURL(file);
                        };
                      }
                    },
                    paste_data_images: true,

                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                // tinymce.init({
                //     selector: 'textarea',  // change this value according to your HTML
                //     plugins: 'image',
                //     toolbar: 'image',
                //     image_list: [
                //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
                //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
                //     ]
                //   });
                />
              </div>

              <div className="submit-answer">
                <button
                  className="submit-answer-btn"
                  onClick={() => {
                    submitAnswer();
                  }}
                >
                  Submit the answer.
                </button>
              </div>
            </div>
          </div>
          <Sidebar mainContract={mainContract} />
        </div>
      </>
    );
  }
}
