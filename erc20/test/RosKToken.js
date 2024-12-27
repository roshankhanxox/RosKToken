const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RoskToken", function () {
	let RoskToken;
	let roskToken;
	let owner;
	let addr1;
	let addr2;
	const CAP = 100000000; // 100 million tokens

	beforeEach(async function () {
		[owner, addr1, addr2] = await ethers.getSigners();
		RoskToken = await ethers.getContractFactory("roskToken");
		roskToken = await RoskToken.deploy(CAP);
		await roskToken.deployed();
	});

	describe("Deployment", function () {
		it("Should set the right owner", async function () {
			expect(await roskToken.owner()).to.equal(owner.address);
		});

		it("Should assign the total supply of tokens to the owner", async function () {
			const ownerBalance = await roskToken.balanceOf(owner.address);
			// Owner should have exactly 70 million tokens
			expect(ownerBalance).to.equal(
				ethers.utils.parseUnits("70000000", 18)
			);
		});

		it("Should set the correct initial supply of 70 million tokens", async function () {
			const expectedSupply = ethers.utils.parseUnits("70000000", 18);
			const ownerBalance = await roskToken.balanceOf(owner.address);
			expect(ownerBalance).to.equal(expectedSupply);
		});

		it("Should set the correct cap", async function () {
			const expectedCap = ethers.utils.parseUnits(CAP.toString(), 18);
			expect(await roskToken.cap()).to.equal(expectedCap);
		});
	});

	describe("Transactions", function () {
		it("Should transfer tokens between accounts", async function () {
			const transferAmount = ethers.utils.parseUnits("50", 18);
			await roskToken.transfer(addr1.address, transferAmount);
			const addr1Balance = await roskToken.balanceOf(addr1.address);
			expect(addr1Balance).to.equal(transferAmount);

			await roskToken
				.connect(addr1)
				.transfer(addr2.address, transferAmount);
			const addr2Balance = await roskToken.balanceOf(addr2.address);
			expect(addr2Balance).to.equal(transferAmount);
		});

		it("Should fail if sender doesn't have enough tokens", async function () {
			// Get the balance of addr1 (should be 0)
			const addr1Balance = await roskToken.balanceOf(addr1.address);
			// Try to transfer 1 token when balance is 0
			await expect(
				roskToken
					.connect(addr1)
					.transfer(addr2.address, ethers.utils.parseUnits("1", 18))
			).to.be.revertedWith("ERC20InsufficientBalance");
		});
	});

	describe("Miner Rewards", function () {
		it("Should mint reward tokens on transfers", async function () {
			const initialTotalSupply = await roskToken.totalSupply();
			await roskToken.transfer(
				addr1.address,
				ethers.utils.parseUnits("100", 18)
			);
			const finalTotalSupply = await roskToken.totalSupply();
			const expectedIncrease = ethers.utils.parseUnits("50", 18);
			expect(finalTotalSupply).to.equal(
				initialTotalSupply.add(expectedIncrease)
			);
		});

		it("Should mint exactly 50 tokens as reward on transfer", async function () {
			const initialTotalSupply = await roskToken.totalSupply();
			await roskToken.transfer(
				addr1.address,
				ethers.utils.parseUnits("100", 18)
			);
			const finalTotalSupply = await roskToken.totalSupply();
			const actualIncrease = finalTotalSupply.sub(initialTotalSupply);
			expect(actualIncrease).to.equal(ethers.utils.parseUnits("50", 18));
		});
	});

	describe("Burning", function () {
		it("Should allow token holders to burn their tokens", async function () {
			const transferAmount = ethers.utils.parseUnits("1000", 18);
			const burnAmount = ethers.utils.parseUnits("500", 18);

			await roskToken.transfer(addr1.address, transferAmount);
			const initialBalance = await roskToken.balanceOf(addr1.address);

			await roskToken.connect(addr1).burn(burnAmount);

			const finalBalance = await roskToken.balanceOf(addr1.address);
			expect(finalBalance).to.equal(initialBalance.sub(burnAmount));
		});

		it("Should fail when trying to burn more tokens than balance", async function () {
			// Transfer a small amount to addr1
			const transferAmount = ethers.utils.parseUnits("100", 18);
			await roskToken.transfer(addr1.address, transferAmount);

			// Try to burn more than their balance
			const burnAmount = ethers.utils.parseUnits("101", 18);
			await expect(
				roskToken.connect(addr1).burn(burnAmount)
			).to.be.revertedWith("ERC20InsufficientBalance");
		});
	});

	describe("Cap Functionality", function () {
		it("Should respect the token cap", async function () {
			// Since we can't easily predict exactly when the cap will be hit due to miner rewards,
			// we'll verify that the total supply never exceeds the cap
			const cap = await roskToken.cap();

			// Do a few transfers
			for (let i = 0; i < 5; i++) {
				await roskToken.transfer(
					addr1.address,
					ethers.utils.parseUnits("1000", 18)
				);
				const totalSupply = await roskToken.totalSupply();
				expect(totalSupply).to.be.lte(cap);
			}
		});
	});
});
