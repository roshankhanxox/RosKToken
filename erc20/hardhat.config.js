require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

ROOTSTOCK_TESTNET_PRIVATE_KEY = process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY;
API_KEY = process.env.API_KEY;
module.exports = {
	solidity: "0.8.20",
	networks: {
		// rskMainnet: {
		// 	url: "https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}",
		// 	chainId: 30,
		// 	gasPrice: 60000000,
		// 	accounts: [process.env.ROOTSTOCK_MAINNET_PRIVATE_KEY],
		// },
		rskTestnet: {
			url: `https://rpc.testnet.rootstock.io/${API_KEY}`,
			chainId: 31,
			gasPrice: 60000000,
			accounts: [ROOTSTOCK_TESTNET_PRIVATE_KEY],
		},
		ganache: {
			url: "http://127.0.0.1:7545",
			accounts: [
				`0xb4bfd9fc8f0f107a276925cf40975b8bb31348ed768eeb881684c7b16201e04e`,
			],
		},
		// hardhat: {
		// 	chainId: 1337,
		// 	accounts: [
		// 		"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
		// 	],
		// },
	},
};
//0x17eF05ca2AB25FE1e6dFC9a5995CbC1884Ecd9f4 deployed token address
//0x7DF12Aba0Fd4bE708B1930190E48a9A7A6a90bAe deployed Faucet address
