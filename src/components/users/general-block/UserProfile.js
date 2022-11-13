import React from "react";
import "../general-block/userprofile.scss";
import { useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";
import i1 from "../100_USER_BADGE.png";
import { useCallback } from "react";

export default function UserProfile({ mainContract, account }) {
  // const [show, setShow] = useState(true);
  // const [show2, setShow2] = useState(true);

  const [isLoading, setLoading] = React.useState(true);
  const [designation, setDesignation] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [tag, setTag] = React.useState([]);
  const [score, setScore] = React.useState(null);
  const [noOfQuestions, setNoOfQuestions] = React.useState(null);
  const [noOfAnswers, setNoOfAnswers] = React.useState(null);
  const [noOfArticles, setNoOfArticles] = React.useState(null);
  const [rewards, setRewards] = React.useState(null);
  const [tips, setTips] = React.useState(null);

  const getOtherData = async (e) => {
    // console.log(mainContract);
    const userDesignation = await mainContract.getUserDesignation(account);
    setDesignation(userDesignation);
    const userAbout = await mainContract.getUserDescription(account);
    setAbout(userAbout);
    // console.log(tag);
    let userScore = await mainContract.getTotalScore(account);
    userScore = parseInt(userScore._hex, 16);
    setScore(userScore);
    // console.log(score);
    const userInfoStruct = await mainContract.getUserInfo(account);
    let userNoOfQuestions = userInfoStruct.noOfQuestions;
    userNoOfQuestions = parseInt(userNoOfQuestions._hex, 16);
    setNoOfQuestions(userNoOfQuestions);
    let userNoOfAnswers = userInfoStruct.noOfAnswers;
    userNoOfAnswers = parseInt(userNoOfAnswers._hex, 16);
    setNoOfAnswers(userNoOfAnswers);
    let userNoOfArticles = userInfoStruct.noOfArticles;
    userNoOfArticles = parseInt(userNoOfArticles._hex, 16);
    setNoOfArticles(userNoOfArticles);
    let userRewards = userInfoStruct.totalReward;
    userRewards = parseInt(userRewards._hex, 16);
    setRewards(userRewards);
    let userTips = userInfoStruct.totalTip;
    userTips = parseInt(userTips._hex, 16);
    setTips(userTips);

    const userTags = await mainContract.getUserTags(account);
    for (let i = 0; i < userTags.length; i++) {
      // console.log(userTags[i]);
      let score_tags = await mainContract.addressToTagToScore(
        account,
        userTags[i]
      );
      score_tags = parseInt(score_tags._hex, 16);
      tag.push([userTags[i], score_tags]);
    }
    setTag(tag);
    setLoading(false);
  };

  const addTags = useCallback(() => { }, [tag]);

  useEffect(() => {
    getOtherData();
    // setLoading(false);
  }, [mainContract]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <section className="profile-block">
        <div className="left-block">
          <div className="stats-title-h3">
            <h3>Stats</h3>
          </div>
          <div className="stats card">
            <div className="stats-inner-block">
              <div>{score}</div>
              <div className="stats-title">Prominences</div>
            </div>
            <div className="stats-inner-block">
              <div>{score}</div>
              <div className="stats-title">Score</div>
            </div>
            <div className="stats-inner-block">
              <div>{noOfQuestions}</div>
              <div className="stats-title">Questions</div>
            </div>
            <div className="stats-inner-block">
              <div>{noOfAnswers}</div>
              <div className="stats-title">Answers</div>
            </div>
            <div className="stats-inner-block">
              <div>{noOfArticles}</div>
              <div className="stats-title">Articles</div>
            </div>
            <div className="stats-inner-block">
              <div>{rewards}</div>
              <div className="stats-title">Rewards</div>
            </div>
            <div className="stats-inner-block">
              <div>{tips}</div>
              <div className="stats-title">Tips</div>
            </div>
            <div className="stats-inner-block">
              <div>{tips}</div>
              <div className="stats-title">Tokens</div>
            </div>
          </div>
        </div>
        <div className="right-block">
          <div className="about-block">
            <div className="card-title">
              <h3>About</h3>
            </div>
            <div className="card">
              <div className="card-inner-div">
                <div className="card-inner-content">
                  <p>{about ? about : "Add your description from the edit profile button"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="badges-block">
            <div className="card-title">
              <div className="title">
                <h3>Badges</h3>
              </div>
              {/* <span className="view-all-rpl-btn">view all badges</span> */}
            </div>
            <div className="card">
              <div className="card-inner-div">
                <div className="card-inner-content">
                  <p>
                    <img src={i1} width={50} height={50} alt="Badge1"></img>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="tags-block">
            <div className="card-title">
              <div className="title">
                <h3>Tags</h3>
                {/* <span className="view-all">view all tags</span> */}
              </div>
              <div className="filter-btns">
                <button className="tag-button">Score</button>
                <button className="tag-button">Newest</button>
              </div>
            </div>
            <div className="card">
              <div className="logged-in-scroll-card">
                {tag.map((inde) => {
                  return (
                    <div className="div-creator">
                      <div className="inside-div-creator">
                        <div className="tag-name">{inde[0]}</div>
                        <div className="tag-score">
                          <div className="tag-score-digit"> {inde[1]}</div>{" "}
                          Score
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className="post-block">
            <div className="card-title">
              <div className="title">
                <h3>Posts</h3>
              </div>
              <div className="btns-grp">
                <div className="filter-btns-all">
                  <button className="tag-button">All</button>
                  <button className="tag-button">Questions</button>
                  <button className="tag-button">Answers</button>
                  <button className="tag-button">Articles</button>
                </div>
                <div className="filter-btns">
                  <button className="tag-button">Score</button>
                  <button className="tag-button">Newest</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-inner-div">
                <div className="card-inner-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus animi modi officia. Debitis quas, velit odio
                    voluptates libero sapiente eos fugit nesciunt tempora
                    inventore ad? Numquam cum nisi accusamus nihil sit beatae
                    quo tenetur eos maiores, quis ullam excepturi? Distinctio
                    iusto, ea ipsum adipisci at harum totam minus facere
                    pariatur similique nisi ex molestias dignissimos consectetur
                    cupiditate natus, culpa debitis a dolor quibusdam? Error
                    modi aut ullam beatae voluptatibus officiis laboriosam
                    molestias qui eligendi non. Officia natus amet dignissimos
                    sunt consequuntur voluptatibus, vitae labore, a dolore ex
                    deserunt cumque non sequi optio quas libero laboriosam.
                    Adipisci harum numquam recusandae possimus.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
