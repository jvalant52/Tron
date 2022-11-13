//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Stack.sol";

contract customToken is ERC20 {

   

    address payable owner;
    uint256 initialSupply;
    uint256 tokenPrice = 0.00001 ether;
    uint256 withdrawEligibleScore = 10000;
    address maincontract;
    
    constructor(uint256 _initialSupply)
        ERC20("ASK2WEB3 Token", "ASK")
    {
        owner = payable(msg.sender);
        _mint(owner, _initialSupply);
        initialSupply = _initialSupply;
        // maincontract = _mainContract;
    }
    Stack s = Stack(0xa7EBE8117a4CBa5d1965E43ba4c9eE9D6ceD1246);

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    function getTokenPrice() public view returns (uint256) {
        return tokenPrice;
    }

    function transferr(
        address _sender,
        address _recipient,
        uint256 _amount
    ) public virtual returns (bool) {
        _transfer(_sender, _recipient, _amount);
        return true;
    }

    function approve(
        address _owner,
        address _spender,
        uint256 _amount
    ) public {
        _approve(_owner, _spender, _amount);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getTotalSupply() public view returns (uint256) {
        return initialSupply;
    }

    //Buy tokens
    function buyTokens(uint256 _numberOfTokens) public payable {
        require(
            msg.value == (_numberOfTokens * getTokenPrice()),
            "not enough value"
        );
        require(balanceOf(owner) >= _numberOfTokens, "not enough token");
        transferr(owner, msg.sender, _numberOfTokens);
        uint256 tokes = s.getTokensSold();
        tokes += _numberOfTokens;
        s.setTokenSold(tokes);
    }

    function sendTip(uint256 articleid, uint256 amount) public payable {
        address user = s.getUserFromArticleId(articleid);
        uint256 tip = s.getTipFromArticleId(articleid);
        tip += amount;
        s.setTipFromArticleId(articleid, tip);
        uint256 totaltip = s.getUserTotalTip(user);
        totaltip += amount;
        s.setUserTotalTip(user, totaltip);
        //transfer money
        transfer(user, amount);
    }

    function claimRewards() public payable {
        address user = msg.sender;
        uint256 totalscore = s.getTotalScore(user);
        uint256 totalredeem = s.getTotalRedeem(user);
        require(
            totalscore >= withdrawEligibleScore,
            "Not eligible to withdraw yet."
        );
        if (totalscore > 0) {
            if (transferr(owner, user, 100)) {
                totalscore = totalscore - withdrawEligibleScore;
                s.setTotalScore(user, totalscore);
                totalredeem += 100;
                s.setTotalRedeem(user, totalredeem);
            }
        }
    }

    function expertFees(address expert, address user) public payable {
        uint256 fee = s.getExpertFees(user);
        if (transferr(user, expert, fee)) {
            uint256 feesEarned = s.getExpertFeesEarned(user);
            feesEarned += fee;
            s.setExpertFeesEarned(user, feesEarned);
        }
    }
}
