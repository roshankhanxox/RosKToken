async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	const Faucet = await ethers.getContractFactory("Faucet");
	const faucet = await Faucet.deploy(
		"0x17eF05ca2AB25FE1e6dFC9a5995CbC1884Ecd9f4"
	);

	console.log("Faucet address:", faucet.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
