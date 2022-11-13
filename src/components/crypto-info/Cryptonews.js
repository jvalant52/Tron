import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cryptoinfo-style/News.scss";

const Cryptonews = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.coinstats.app/public/v1/news?skip=0&limit=10",
      // headers: {
      //   "X-RapidAPI-Key": "fbb16cf004msh1af9515587b6182p19a6c2jsn2ae4a5a1e3b6",
      //   "X-RapidAPI-Host": "CoinMarketCapzakutynskyV1.p.rapidapi.com",
      // },
    };
    axios.request(options).then((response) => {
      console.log(response.data);
      setApiData(response.data.news);
    });
    // .catch((error) => {
    //   console.error(error);
    // });
  }, []);

  console.log(typeof apiData);
  const first7Apidata = apiData.slice(0, 8);

  return (
    <>
      <div className="crypto-news">
        <div className="rightcolumn">
          <div className="article">
            <h2>Popular News</h2>
            {first7Apidata.map((data, _index) => (
              <div className="apidata" key={_index}>
                <div className="news-img-main">
                  <img className="news-img" src={data.imgURL} />
                </div>
                <a href={data.link}>
                  <p>{data.title}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cryptonews;
