import React from "react";
import "./sidebar.scss";
import membericon from "./group.png";
import staticon from "./stats.png";
import { useEffect } from "react";
import { use } from "chai";

function Sidebar({ mainContract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [article, setArticle] = React.useState("");
  const [user, setUser] = React.useState("");

  const getSidebarDetails = async () => {
    let no_questions = await mainContract.q_id();
    no_questions = parseInt(no_questions._hex, 16);
    let no_answers = await mainContract.a_id();
    no_answers = parseInt(no_answers._hex, 16);
    let no_articles = await mainContract.article_id();
    no_articles = parseInt(no_articles._hex, 16);
    let users = await mainContract.getAllUsers();
    users = users.length;
    setUser(users);
    setQuestion(no_questions);
    setAnswer(no_answers);
    setArticle(no_articles);
    setLoading(false);
  };

  useEffect(() => {
    getSidebarDetails();
  }, [mainContract]);

  if (isLoading) {
    return "Loading...";
  }
  return (
    <>
      <div className="right-section">
        <div className="sidebar-grid-container">
          <div className="sidebar-heading">
            <h2 className="stats-img">
              <img src={staticon} alt="Stats img" />
              Stats
            </h2>
          </div>
          <div class="sidebar-grid-item">
            <p className="sidebar-title">Question</p>
            <h2 className="sidebar-number-1">{question}</h2>
          </div>
          <div class="sidebar-grid-item">
            <p className="sidebar-title">Answers</p>
            <h2 className="sidebar-number-2">{answer}</h2>
          </div>
          <div class="sidebar-grid-item">
            <p className="sidebar-title">Articles</p>
            <h2 className="sidebar-number-3">{article}</h2>
          </div>
          <div class="sidebar-grid-item">
            <p className="sidebar-title">Users</p>
            <h2 className="sidebar-number-4">{user}</h2>
          </div>
        </div>

        <div className="top-members">
          <div className="heading-members">
            <h2>
              <img src={membericon} alt="Top img" />
              Top Members
            </h2>
          </div>
          <div class="sidebar-cards">
            <div class="sidebar-sub-card">
              <h3 class="sidebar-card-title">
                <img
                  className="profile-img-1"
                  src="https://i.pravatar.cc/70"
                  alt=""
                />
                <div className="profile-header-text">Lorem</div>
              </h3>
              <p>Lorem ipsum dolor sit. This is a dummy Text.</p>
            </div>
          </div>
          <div class="sidebar-cards">
            <div class="sidebar-sub-card">
              <h3 class="sidebar-card-title">
                <img
                  className="profile-img-1"
                  src="https://i.pravatar.cc/70"
                  alt=""
                />
                <div className="profile-header-text">Ipsum</div>
              </h3>
              <p>Lorem ipsum dolor sit. This is a dummy Text.</p>
            </div>
          </div>
          <div class="sidebar-cards">
            <div class="sidebar-sub-card">
              <h3 class="sidebar-card-title">
                <img
                  className="profile-img-1"
                  src="https://i.pravatar.cc/70"
                  alt=""
                />
                <div className="profile-header-text">Dolor</div>
              </h3>
              <p>Lorem ipsum dolor sit. This is a dummy Text.</p>
            </div>
          </div>
          <div class="sidebar-cards">
            <div class="sidebar-sub-card">
              <h3 class="sidebar-card-title">
                <img
                  className="profile-img-1"
                  src="https://i.pravatar.cc/70"
                  alt=""
                />
                <div className="profile-header-text">Sit</div>
              </h3>
              <p>Lorem ipsum dolor sit. This is a dummy Text.</p>
            </div>
          </div>
          <div class="sidebar-cards">
            <div class="sidebar-sub-card">
              <h3 class="sidebar-card-title">
                <img
                  className="profile-img-1"
                  src="https://i.pravatar.cc/70"
                  alt=""
                />
                <div className="profile-header-text">Daa</div>
              </h3>
              <p>Lorem ipsum dolor sit. This is a dummy Text.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
