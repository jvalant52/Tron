import React, { useState } from "react";

import useravtar from "./man.png";
import SingleUserProfile from "./general-block/SingleUserProfile";
import SingleUserActivity from "./general-block/SingleUserActivity";
import LoadingAnimation from "./general-block/LoadingAnimation";

import "./userstyle/profile.scss";
import "./general-block/userprofile.scss";
import "./userstyle/popup.css";
import { useLocation } from "react-router";
import { useEffect } from "react";

const SingleUser = ({ mainContract }) => {
  const location = useLocation();
  const { account } = location.state;
  // console.log(account);
  const [isLoading, setLoading] = React.useState(true);
  const [showSingleUserProfile, setSingleUserProfile] = useState(true);
  const [showSingleUserActivity, setSingleUserActivity] = useState(false);
  //   const [buttonPopup, setButtonPopup] = useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const getProfileData = async (e) => {
    // console.log(mainContract);
    const userName = await mainContract.getUserName(account);
    setName(userName);
    // console.log(name);
    const userEmail = await mainContract.getUserEmail(account);
    setEmail(userEmail);
    // console.log(email);
    const userDesignation = await mainContract.getUserDesignation(account);
    setDesignation(userDesignation);
    const userAbout = await mainContract.getUserDescription(account);
    setAbout(userAbout);
    // console.log(userAbout);
    const userImage = await mainContract.getUserCID(account);
    setImageUrl(userImage);
    setLoading(false);
  };
  useEffect(() => {
    getProfileData();
    // setLoading(false);
  }, [mainContract]);
  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <section className="background-image">
        <div className="background-opacity"></div>
        <div className="inside-cover-image">
          <div className="show-at-bottom">
            <div className="first-block">
              <img
                className="user-profile-image"
                src={imageUrl}
                alt="user avatar"
                height="84px"
                width="84px"
              />
              <div className="user-info">
                <h1 className="user-name">{name}</h1>
                <h3>{designation}</h3>
                <span>
                  {" "}
                  <span>
                    <svg
                      className="svg-for-mail"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 37.195 37.195"
                      fill="#ffffff"
                    >
                      <g>
                        <g id="_x31_35_86_">
                          <g>
                            <path
                              d="M19.332,22.844c-0.5,0.416-1.114,0.441-1.612,0C11.84,17.616,5.957,12.391,0.074,7.162C0.044,7.208,0.028,7.271,0,7.319
				                        v23.677h37.195V7.998C31.239,12.946,25.286,17.896,19.332,22.844z"
                            />
                            <path
                              d="M16.729,18.922c0.607,0.541,1.217,1.082,1.823,1.623C24.264,15.8,29.971,11.056,35.68,6.311
				                        c-0.076-0.04-0.158-0.072-0.233-0.111H2.412c2.83,2.517,5.662,5.032,8.492,7.548C12.847,15.472,14.789,17.197,16.729,18.922z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  {email}
                </span>
              </div>
              <div className="btns">
                {/* <button
                  onClick={() => {
                    setButtonPopup(true);
                  }}
                >
                  Edit Profile
                </button>
                <button>Claim Rewards</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="main-container">
        <div className="nav-user">
          <div className="nav-user-bar">
            <button
              onClick={() => {
                setSingleUserProfile(true);
                setSingleUserActivity(false);
              }}
              className={showSingleUserProfile ? `active` : ``}
            >
              Profile
            </button>
            <button
              onClick={() => {
                setSingleUserActivity(true);
                setSingleUserProfile(false);
              }}
              className={showSingleUserActivity ? `active` : ``}
            >
              Activity
            </button>
          </div>
          {showSingleUserProfile ? (
            <SingleUserProfile account={account} mainContract={mainContract} />
          ) : null}
          {showSingleUserActivity ? (
            <SingleUserActivity account={account} mainContract={mainContract} />
          ) : null}
        </div>
      </section>
    </>
  );
};

export default SingleUser;
