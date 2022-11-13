import React, { useEffect } from "react";
import "./home.css";
import ParticlesConfig from "./particalsconfig";
import Downarrow from "../down-arrow";
import Logo from "./logo.png";
import Faq from "react-faq-component";
import HomeGlobe from "./HomeGlobe";
import homelogo from './stackchain.png'
const data = {
  title: "FAQ (How it works)",
  rows: [
    {
      title: "What is StackChain?",
      content: `It is a community-based platform that will help users find solutions to their queries. 
      Users will have the option to connect with the expert for that technology stack. Users can get
       vanity points and rewards based on their contributions.
      `,
    },
    {
      title: "How to set up my profile?",
      content:
        "At the top right of the homepage, you'll find the 'My Profile' button. Upon clicking it, it will redirect you to your profile where you are free to customize and edit it.",
    },
    {
      title: "Where do I ask a question?",
      content: `You can ask a question by going to the 'Add Question' page. In the forum, you can search for the question that has already been asked to avoid repetitive questions on the platform.
      If you don't find the question you wanted to ask, you can create it on the text editor and ask the question in the forum.
      `,
    },
    {
      title: "How do I answer a question?",
      content: `You can answer by clicking on the answer bar and entering your text.
      `,
    },
    {
      title: "What is an article? How do I post one?",
      content: `An article is a post that you write to your fellow developers. This post can be anything related to coding or developing Web - from tips and tricks to the latest developments.
            `,
    },
    {
      title: "What is a prominence score? How does it affect me?",
      content: `The prominence score is the score given to the user for participating in the platform by asking questions, responding to queries, posting articles, and upvoting answers.
      `,
    },
    {
      title:
        "Are ASK tokens necessary? What are the benefits of the ASK token?",
      content: `An ASK token is a reward a user is given for 10,000 prominence points. These tokens are used for asking questions, answering, and posting articles.
      `,
    },
    {
      title: "What is a +1 or -1?",
      content: `A +1 / -1 is a way to support or demote a question, answer, or article. 
      `,
    },
    {
      title: "What are Tips?",
      content: `Tips are functions present to support an author of an article. This way, you not only shower appreciation but also enable them to post more articles on the platform.
      Tips are also provided for articles under the Crypto News page.
      
            `,
    },
    {
      title: "How do I claim rewards?",
      content: `You go to your profile and click on the 'Claim Rewards' on the top right above your profile. You are eligible for awards if you've got 10,000 prominence points.
      `,
    },
    {
      title: "How to log in?",
      content: `Log-In: You must create your StackChain profile and link to your Metamask account. Once you're done, you can click on the profile option and edit/customize your profile details.
      `,
    },
  ],
};
const styles = {
  bgColor: "transparent",
  titleTextColor: "white",
  rowTitleColor: "black",
  rowContentColor: "black",
  arrowColor: "red",
};
const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};
const Home = () => {
  useEffect(() => {
    const canvas_ = document.getElementsByTagName("canvas");
    console.log((canvas_[0].style.zIndex = -1));
    console.log(canvas_[0].style.zIndex);
  }, []);
  return (
    <>
      <div className="background">
        <div className="part">
          <ParticlesConfig className="parti"></ParticlesConfig>
        </div>
        <div className="text-home z-Index">
          <div className="landing">
            {/* <img src={Logo} className="logo" /> */}
            <div className="globe-div">
              <img className="home2-logo" src={homelogo} />
              <HomeGlobe />
            </div>
            {/* <div className="home-logo">
              <img className="home2-logo" src={homelogo}/>

            </div> */}
            <div className="tag-line">
              Your one stop space fo all queries on Web3
            </div>
          </div>
          <div className="user-guide">
            <div className="tag-line user-guide-title">User Guide</div>
            <div className="user-guide-body">
              <div className="steps">
                Log in - Log in to your profile and make sure you've connected
                your Metamask wallet.
              </div>
              <div className="arrow">
                <Downarrow />
              </div>
              <div className="steps">
                Buy ASK token - Make sure you have an ASK token to pose a
                question, answer or post articles.
              </div>
              <div className="arrow">
                <Downarrow />
              </div>
              <div className="steps">
                Add questions, articles, and post answers - help your fellow
                developers and learn while on the run.
              </div>
              <div className="arrow">
                <Downarrow />
              </div>
              <div className="steps">
                Increase your profile score - the more you participate, the more
                your prominence increases.
              </div>
              <div className="arrow">
                <Downarrow />
              </div>
              <div className="steps">
                Get rewards and use the ASK tokens to quench your curiosity.{" "}
              </div>
            </div>
          </div>
          <div className="about-us">
            <div className="about-us-content">
              <div className="about-us-title">About Project</div>
              <div className="about-project-body">
                We cater to provide a community-based platform for all
                developers and coders who strive to create the wonderful world
                of Web3. Ask away all your doubts and queries to your fellow
                coders and experts in the programming tools. You also get to
                answer questions of your peer developers and get rewarded for
                the kind act of sharing your knowledge. We have a dedicated page
                for crypto news to increase crypto literacy while eliminating
                bias and prejudice against all things in Web3. Here you can find
                the latest news, stock market prices, and tips for investing in
                cryptocurrency.
              </div>
            </div>
          </div>
          <div className="FAQs">
            <div className="FAQs-title">FAQs</div>
            <div className="faq-body-">
              <Faq data={data} styles={styles} config={config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
