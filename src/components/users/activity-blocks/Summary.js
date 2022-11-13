import React from "react";
import i1 from "../100_USER_BADGE.png";
import "../userstyle/summary.scss";

export default function Summary() {
  // var list = `Who's the person with more answers than Jon Skeet? When will
  //               they catch him in rep terms? Who's the person with more answers
  //               than Jon Skeet? When will they catch him in rep terms?`;

  // var resultList = list.slice(0, 70) + "...";
  return (
    <div className="summary-right-block">
      <div className="answers-block">
        <div className="card-title">
          <div className="title">
            <h3>Answers</h3>
            {/* <span className="view-all">view all answers</span> */}
          </div>
          <div className="filter-btns">
            <button className="tag-button">Score</button>
            <button className="tag-button">Newest</button>
          </div>
        </div>
        <div className="card">
          <div className="logged-in-scroll-card">
            {/* run this code to create tags list  */}
            {/* . */}
            {/* . */}
            {/* . */}

            <div className="div-creator">
              <div className="inside-div-creator">
                <div className="total-likes">Likes</div>
                <div className="summary-qa-list">
                  Who's the person with more answers than Jon Skeet? When will
                  they catch him in rep terms?
                </div>
                <div className="qa-date">24 July'22</div>
              </div>
            </div>

            {/* till here */}
          </div>
        </div>
      </div>
      <div className="questions-block">
        <div className="card-title">
          <div className="title">
            <h3>Questions</h3>
            {/* <span className="view-all">view all questions</span> */}
          </div>
          <div className="filter-btns">
            <button className="tag-button">Score</button>
            <button className="tag-button">Newest</button>
          </div>
        </div>
        <div className="card">
          <div className="logged-in-scroll-card">
            {/* run this code to create tags list  */}
            {/* . */}
            {/* . */}
            {/* . */}

            <div className="div-creator">
              <div className="inside-div-creator">
                <div className="total-likes">Likes</div>
                <div className="summary-qa-list">
                  Who's the person with more answers than Jon Skeet? When will
                  they catch him in rep terms?
                </div>
                <div className="qa-date">24 July'22</div>
              </div>
            </div>
            {/* till here */}
          </div>
        </div>
      </div>
      <div className="badges-block">
        <div className="card-title">
          <div className="title">
            <h3>Badges</h3>
          </div>
        </div>
        <div className="card">
          <div className="logged-in-scroll-card">
            <img src={i1} width={50} height={50} alt="Badge1"></img>

            {/* till here */}
          </div>
        </div>
      </div>
      <div className="prominence-block">
        <div className="card-title">
          <div className="title">
            <h3>Prominences</h3>
          </div>
          {/* <span className="view-all-rpl-btn">view all prominences</span> */}
        </div>
        <div className="card">
          <div className="logged-in-scroll-card">
            {/* run this code to create tags list  */}
            {/* . */}
            {/* . */}
            {/* . */}

            <div className="div-creator">
              <div className="inside-div-creator">
                <div className="tag-name">tag</div>
                <div className="tag-score">
                  <div className="tag-score-digit"> Tag</div> Score
                </div>
              </div>
            </div>

            {/* till here */}
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
            {/* run this code to create tags list  */}
            {/* . */}
            {/* . */}
            {/* . */}

            <div className="div-creator">
              <div className="inside-div-creator">
                <div className="tag-name">tag</div>
                <div className="tag-score">
                  <div className="tag-score-digit"> Tag</div> Score
                </div>
              </div>
            </div>

            {/* till here */}
          </div>
        </div>
      </div>
      <div className="post-block">
        <div className="card-title">
          <div className="title">
            <h3>Articles</h3>
            {/* <span className="view-all">view all answers</span> */}
          </div>
          <div className="filter-btns">
            <button className="tag-button">Score</button>
            <button className="tag-button">Newest</button>
          </div>
        </div>
        <div className="card">
          <div className="logged-in-scroll-card">
            {/* run this code to create tags list  */}
            {/* . */}
            {/* . */}
            {/* . */}

            <div className="div-creator">
              <div className="inside-div-creator">
                <div className="total-likes">Likes</div>
                <div className="summary-qa-list">
                  Who's the person with more answers than Jon Skeet? When will
                  they catch him in rep terms?
                </div>
                <div className="qa-date">24 July'22</div>
              </div>
            </div>

            {/* till here */}
          </div>
        </div>
      </div>
    </div>
  );
}
