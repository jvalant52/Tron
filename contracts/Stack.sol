//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Stack {
    address public owner;
    address[] public users;
    mapping(address => bool) isAdded;
    uint256 public q_id;
    uint256 public a_id;
    uint256 public article_id;
    struct QuestionInfo {
        uint256 q_id;
        address user;
        string q_title;
        string q_cid;
        uint256 q_upvote;
        uint256 q_downvote;
        uint256[] ans_id;
        string[] q_taglist;
    }
    mapping(uint256 => QuestionInfo) public idToQuestion;
    mapping(address => uint256[]) public userToQuestions;
    mapping(uint256 => mapping(address => bool)) public isUpVotedQuestion;
    mapping(uint256 => mapping(address => bool)) public isDownVotedQuestion;
    struct AnswerInfo {
        uint256 a_id;
        address user;
        string a_cid;
        uint256 a_upvote;
        uint256 a_downvote;
        bool isApproved;
    }
    mapping(uint256 => AnswerInfo) public idToAnswer;
    mapping(address => uint256[]) public userToAnswers;
    mapping(uint256 => mapping(address => bool)) public isUpVotedAnswer;
    mapping(uint256 => mapping(address => bool)) public isDownVotedAnswer;
    struct ArticleInfo {
        uint256 article_id;
        address user;
        string article_title;
        string article_cid;
        string article_image_cid;
        uint256 noOfLikes;
        uint256 tip;
    }
    mapping(uint256 => ArticleInfo) public idToArticle;
    mapping(address => uint256[]) public userToArticle;
    mapping(uint256 => mapping(address => bool)) public isUserLikedIt;

    struct UserProfileInfo {
        address user;
        string name;
        string userImageCID;
        string email;
        string designation;
        string aboutUSer;
        uint256 expertFees;
        string[] taglist;
        mapping(string => bool) isTagAdded;
    }
    mapping(address => UserProfileInfo) public addressToUserProfileInfo;
    struct UserInfo {
        address user;
        uint256 noOfQuestions;
        uint256 noOfAnswers;
        uint256 noOfArticles;
        uint256 totalScore;
        uint256 reputationScore;
        uint256 totalReward;
        uint256 totalRedeem;
        uint256 totalTip;
        uint256 expertFeesEarned;
    }
    mapping(address => UserInfo) public addressToUserInfo;
    mapping(address => mapping(string => uint256)) public addressToTagToScore;

    uint256 withdrawEligibleAmount = 100;
    uint256 public tokensSold = 0;

    constructor() {
        owner = msg.sender;
    }

    //Questions---------------------------------------------------------------------
    function addQuestion(
        string memory title,
        string memory q_cid,
        string[] memory tag_name
    ) public {
        q_id += 1;
        idToQuestion[q_id] = QuestionInfo(
            q_id,
            msg.sender,
            title,
            q_cid,
            0,
            0,
            new uint256[](0),
            tag_name
        );
        userToQuestions[msg.sender].push(q_id);
        addressToUserInfo[msg.sender].noOfQuestions += 1;
        isUpVotedQuestion[q_id][msg.sender] = false;
        isDownVotedQuestion[q_id][msg.sender] = false;
        add_score_qa(tag_name);
    }

    function getQuestion(uint256 qid)
        public
        view
        returns (QuestionInfo memory)
    {
        return idToQuestion[qid];
    }

    function q_upVote(uint256 qid) public {
        if (isUpVotedQuestion[qid][msg.sender] == false) {
            idToQuestion[qid].q_upvote += 1;
            address user = idToQuestion[qid].user;
            add_score_vote(user);
            isUpVotedQuestion[qid][msg.sender] = true;
        }
    }

    function q_downvote(uint256 qid) public {
        if (isDownVotedQuestion[qid][msg.sender] == false)
            idToQuestion[qid].q_downvote += 1;
        address user = idToQuestion[qid].user;
        minus_score_vote(user);
        isDownVotedQuestion[qid][msg.sender] = true;
    }

    //Answers---------------------------------------------------------------------
    function addAnswer(uint256 qid, string memory a_cid) public {
        a_id += 1;
        idToAnswer[a_id] = AnswerInfo(a_id, msg.sender, a_cid, 0, 0, false);
        userToAnswers[msg.sender].push(a_id);
        idToQuestion[qid].ans_id.push(a_id);
        addressToUserInfo[msg.sender].noOfAnswers += 1;
        addressToUserInfo[msg.sender].totalScore += 5;
        addressToUserInfo[msg.sender].reputationScore += 5;
        isUpVotedAnswer[q_id][msg.sender] = false;
        isDownVotedAnswer[q_id][msg.sender] = false;
    }

    function getAnswer(uint256 aid) public view returns (AnswerInfo memory) {
        return idToAnswer[aid];
    }

    function a_upVote(uint256 aid) public {
        if (isUpVotedAnswer[aid][msg.sender] == false) {
            idToAnswer[aid].a_upvote += 1;
            address user = idToAnswer[aid].user;
            add_score_vote(user);
            isUpVotedAnswer[aid][msg.sender] = true;
        }
    }

    function a_downvote(uint256 aid) public {
        if (isDownVotedAnswer[aid][msg.sender] == false) {
            idToAnswer[aid].a_downvote += 1;
            address user = idToAnswer[aid].user;
            minus_score_vote(user);
            isDownVotedAnswer[aid][msg.sender] = true;
        }
    }

    //Articles---------------------------------------------------------------------
    function addArticle(
        string memory title,
        string memory article_cid,
        string memory image_cid,
        string[] memory tag_name
    ) public {
        article_id += 1;
        idToArticle[article_id] = ArticleInfo(
            article_id,
            msg.sender,
            title,
            article_cid,
            image_cid,
            0,
            0
        );
        userToArticle[msg.sender].push(article_id);
        addressToUserInfo[msg.sender].noOfArticles += 1;
        isUserLikedIt[article_id][msg.sender] = false;
        add_score_qa(tag_name);
    }

    function getArticle(uint256 articleid)
        public
        view
        returns (ArticleInfo memory)
    {
        return idToArticle[articleid];
    }

    function addLike(uint256 articleid) public {
        if (isUserLikedIt[article_id][msg.sender] == false) {
            idToArticle[articleid].noOfLikes += 1;
            isUserLikedIt[article_id][msg.sender] = true;
        }
    }

    function add_score_qa(string[] memory tag_name) private {
        addressToUserInfo[msg.sender].totalScore += 5;
        addressToUserInfo[msg.sender].reputationScore += 5;
        for (uint256 i = 0; i < tag_name.length; i++) {
            addressToTagToScore[msg.sender][tag_name[i]] += 5;
            if (
                addressToUserProfileInfo[msg.sender].isTagAdded[tag_name[i]] ==
                false
            ) {
                addressToUserProfileInfo[msg.sender].taglist.push(tag_name[i]);
                addressToUserProfileInfo[msg.sender].isTagAdded[tag_name[i]] ==
                    true;
            }
        }
    }

    function add_score_vote(address user) private {
        addressToUserInfo[user].totalScore += 5;
        addressToUserInfo[msg.sender].reputationScore += 5;
    }

    function minus_score_vote(address user) private {
        addressToUserInfo[user].totalScore -= 5;
        addressToUserInfo[msg.sender].reputationScore -= 5;
    }

    function createProfile(
        string memory name,
        string memory cid,
        string memory email,
        string memory designation,
        string memory aboutUser,
        uint256 fees,
        string[] memory listOfTags
    ) public {
        if (!isAdded[msg.sender]) {
            users.push(msg.sender);
            isAdded[msg.sender] = true;
        }
        addressToUserProfileInfo[msg.sender].user = msg.sender;
        addressToUserProfileInfo[msg.sender].name = name;
        addressToUserProfileInfo[msg.sender].userImageCID = cid;
        addressToUserProfileInfo[msg.sender].email = email;
        addressToUserProfileInfo[msg.sender].designation = designation;
        addressToUserProfileInfo[msg.sender].aboutUSer = aboutUser;
        addressToUserProfileInfo[msg.sender].expertFees = fees;
        addressToUserProfileInfo[msg.sender].taglist = listOfTags;
        // addressToUserInfo[msg.sender].user = msg.sender;
        // addressToUserInfo[msg.sender].noOfQuestions = 0;
        // addressToUserInfo[msg.sender].noOfAnswers = 0;
        // addressToUserInfo[msg.sender].totalScore = 0;
        // addressToUserInfo[msg.sender].reputationScore = 0;
        // addressToUserInfo[msg.sender].totalReward = 0;
        // addressToUserInfo[msg.sender].totalRedeem = 0;
        // addressToUserInfo[msg.sender].totalTip = 0;
        // addressToUserInfo[msg.sender].expertFeesEarned = 0;
        addressToUserInfo[msg.sender] = UserInfo(
            msg.sender,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        );
        // user = UserInfo(msg.sender,name,email,designation,0,0,0,0,0,0,listOfTags);
    }

    function approve(uint256 aid) public {
        address user = idToAnswer[aid].user;
        idToAnswer[aid].isApproved = true;
        addressToUserInfo[user].totalScore += 5;
        addressToUserInfo[msg.sender].reputationScore += 5;
    }

    function getAllUserQuestionsId() public view returns (uint256[] memory) {
        return userToQuestions[msg.sender];
    }

    function getAllUserAnswersId() public view returns (uint256[] memory) {
        return userToAnswers[msg.sender];
    }

    function getAllUserArticlesId() public view returns (uint256[] memory) {
        return userToArticle[msg.sender];
    }

    function getUserTage() public view returns (string[] memory) {
        return addressToUserProfileInfo[msg.sender].taglist;
    }

    function getTokensSold() public view returns (uint256) {
        return tokensSold;
    }

    function setTokenSold(uint256 tokei) public {
        tokensSold = tokei;
    }

    function getUserFromArticleId(uint256 articleid)
        public
        view
        returns (address)
    {
        return idToArticle[articleid].user;
    }

    function getTipFromArticleId(uint256 articleid)
        public
        view
        returns (uint256)
    {
        return idToArticle[articleid].tip;
    }

    function setTipFromArticleId(uint256 articleid, uint256 tip) public {
        idToArticle[articleid].tip = tip;
    }

    function getUserTotalTip(address user) public view returns (uint256) {
        return addressToUserInfo[user].totalTip;
    }

    function setUserTotalTip(address user, uint256 totaltip) public {
        addressToUserInfo[user].totalTip = totaltip;
    }

    function getTotalScore(address user) public view returns (uint256) {
        return addressToUserInfo[user].totalScore;
    }

    function getTotalRedeem(address user) public view returns (uint256) {
        return addressToUserInfo[user].totalRedeem;
    }

    function getExpertFeesEarned(address user) public view returns (uint256) {
        return addressToUserInfo[user].expertFeesEarned;
    }

    function setExpertFeesEarned(address user, uint256 fee) public {
        addressToUserInfo[user].expertFeesEarned = fee;
    }

    function setTotalScore(address user, uint256 score) public {
        addressToUserInfo[user].totalScore = score;
    }

    function setTotalRedeem(address user, uint256 redeem) public {
        addressToUserInfo[user].totalRedeem = redeem;
    }

    function getUserName(address user) public view returns (string memory) {
        return addressToUserProfileInfo[user].name;
    }

    function getUserEmail(address user) public view returns (string memory) {
        return addressToUserProfileInfo[user].email;
    }

    function getUserDesignation(address user)
        public
        view
        returns (string memory)
    {
        return addressToUserProfileInfo[user].designation;
    }

    function getUserDescription(address user)
        public
        view
        returns (string memory)
    {
        return addressToUserProfileInfo[user].aboutUSer;
    }

    function getUserTags(address user) public view returns (string[] memory) {
        return addressToUserProfileInfo[user].taglist;
    }

    function getExpertFees(address user) public view returns (uint256) {
        return addressToUserProfileInfo[user].expertFees;
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    function isUserUpvotedQuestion(uint256 qid, address user)
        public
        view
        returns (bool)
    {
        return isUpVotedQuestion[qid][user];
    }

    function isDownUpvotedQuestion(uint256 qid, address user)
        public
        view
        returns (bool)
    {
        return isDownVotedQuestion[qid][user];
    }

    function isUserUpvotedAnswer(uint256 qid, address user)
        public
        view
        returns (bool)
    {
        return isUpVotedAnswer[qid][user];
    }

    function isDownUpvotedAnswer(uint256 qid, address user)
        public
        view
        returns (bool)
    {
        return isUpVotedAnswer[qid][user];
    }

    function isUserLikedArticle(uint256 qid, address user)
        public
        view
        returns (bool)
    {
        return isUserLikedIt[qid][user];
    }

    function getUserInfo(address user) public view returns (UserInfo memory) {
        return addressToUserInfo[user];
    }

    function getUserCID(address user) public view returns (string memory) {
        return addressToUserProfileInfo[user].userImageCID;
    }
}
