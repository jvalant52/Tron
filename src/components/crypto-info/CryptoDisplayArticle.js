import React from "react";
import pic from "./Cryptoinfo-style/coin2.png";
import "./Cryptoinfo-style/CryptoDisplayArticle.scss";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Axios from "axios";

const CryptoDisplayArticle = ({ account, mainContract }) => {
  const location = useLocation();
  const id = location.state.id;
  const [isLoading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [cid, setCID] = React.useState();
  const [des, setDes] = React.useState("");
  console.log("id" + id);

  const showArtices = async (e) => {
    const article = await mainContract.getArticle(id);
    const cidOfImage = article.article_image_cid;
    const title = article.article_title;
    const article_cid = article.article_cid;
    setTitle(title);
    setDes(article_cid);
    const url = "https://ipfs.io/ipfs/" + article_cid;
    console.log("cid" + cidOfImage);
    if (cidOfImage == "No Image Found") {
      setCID(pic);
    } else {
      setCID(cidOfImage);
    }
    await Axios.get(url).then((response) => {
      setDes(response.data.body);
    });
    console.log(title, cid, des);
    setLoading(false);
  };

  useEffect(() => {
    showArtices();
  }, [mainContract]);

  if (isLoading) {
    return "loading";
  }
  return (
    <>
      <div className="article-container">
        <img classname="article-img" src={cid} />

        <div className="article-title">
          <div className="Answer-description">
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </div>
        </div>
        <div className="article-p">
          <div className="Answer-description">
            <div dangerouslySetInnerHTML={{ __html: des }} />
          </div>
        </div>

        <div className="btns-display-article">
          <div className="article-button1">
            <button>Like</button>
          </div>

          <div className="article-button2">
            <button>Tip</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CryptoDisplayArticle;
