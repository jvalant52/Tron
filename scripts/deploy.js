const hre = require("hardhat");

async function main() {
  // const mainContract = await hre.ethers.getContractFactory("Stack");
  // const stack = await mainContract.deploy();

  // await stack.deployed();

  // console.log("MainContract deployed to:", stack.address); // 0x59841E54b680B6844BcCac30eaB05a39Fb9219Ad

  const customtoken = await hre.ethers.getContractFactory("customToken");
  const custom = await customtoken.deploy(1000);

  await custom.deployed();

  console.log("CustomToken deployed to:", custom.address); // 0x7d5Bdd082eDb9cbea402fDE1c53b1a708Fbb236D
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
