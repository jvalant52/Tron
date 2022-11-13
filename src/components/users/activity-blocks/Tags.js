import React from "react";
import { useEffect } from "react";

export default function Tags({ account, mainContract }) {
  const [len, setLen] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [tag, setTag] = React.useState([]);

  const getTagActivity = async (e) => {
    const userTags = await mainContract.getUserTags(account);
    setLen(userTags.length);
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

  useEffect(() => {
    getTagActivity();
  }, [mainContract]);

  if (isLoading) {
    return "loading";
  }
  return (
    <>
      <div className="tags-block">
        <div className="card-title">
          <div className="title">
            <h3>
              <span>{len}</span> Tags
            </h3>
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

            {tag.map((inde) => {
              return (
                <div className="div-creator">
                  <div className="inside-div-creator">
                    <div className="tag-name">{inde[0]}</div>
                    <div className="tag-score">
                      <div className="tag-score-digit"> {inde[1]}</div> Score
                    </div>
                  </div>
                </div>
              );
            })}

            {/* till here */}
          </div>
        </div>
      </div>
    </>
  );
}
