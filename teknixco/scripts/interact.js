async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Interacting with the contract using:", deployer.address);

    const contractAddress = "";  // Replace with the deployed contract address
    const Teknixco = await ethers.getContractFactory("Teknixco");
    const teknixco = Teknixco.attach(contractAddress);

    const balance = await teknixco.balances(deployer.address);
    console.log("Balance:", balance.toString());

    const recipient = "";  // Replace with a recipient address
    const amount = 100;  // Amount to transfer
    const transferTx = await teknixco.transfer(recipient, amount);
    await transferTx.wait();

    console.log(`Transferred ${amount} to ${recipient}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});