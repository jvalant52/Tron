/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/1786917adca6412da6e31f6444c0174a",
      accounts: [
        "67cd81819a7101989d2f86d501508dd606ca4aa3f475376314f186bb4e672454",
      ],
    },
  },
};

// stack - 0x59841E54b680B6844BcCac30eaB05a39Fb9219Ad
// token - 0x7d5Bdd082eDb9cbea402fDE1c53b1a708Fbb236D
