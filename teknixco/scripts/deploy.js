async function main() {
    // Get the deployer's account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory for the Teknixco contract
    const Teknixco = await ethers.getContractFactory("Teknixco");

    // Deploy the contract
    const teknixco = await Teknixco.deploy();
    console.log("Teknixco contract deployed to:", teknixco.target);
}

// Execute the deployment function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
