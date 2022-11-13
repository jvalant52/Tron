import React from "react";
import { useEffect } from "react";

export default function Articles({ account, mainContract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [num, setNum] = React.useState("");
  const [article, setArticle] = React.useState([]);
  const getArticleData = async (e) => {
    let no_a = await mainContract.getAllUserArticlesId();
    setNum(no_a.length);
    for (let i = 0; i < no_a.length; i++) {
      const question = await mainContract.getArticle(no_a[i]);
      // console.log(question.article_title);
      let like = question.noOfLikes;
      like = parseInt(like._hex, 16);
      const title = question.article_title;
      article.push([like, title]);
    }
    setArticle(article);
    setLoading(false);
  };
  useEffect(() => {
    getArticleData();
  }, [mainContract]);

  if (isLoading) {
    return "loading";
  }
  return (
    <>
      <div className="articles-block">
        <div className="card-title">
          <div className="title">
            <h3>
              <span>{num}</span> Articles
            </h3>
          </div>
          <div className="filter-btns">
            <button className="tag-button">Score</button>
            <button className="tag-button">Newest</button>
          </div>
        </div>
        <div className="card">
          {article.map((inde) => {
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
