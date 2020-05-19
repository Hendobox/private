import Web3 from "web3"; 

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    // wait for loading to complete
    window.addEventListener("load", async () => {
      // modern dapp browser
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // request account access 
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      else if (window.web3) {
        // Use metamask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // use console port by default
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
};

export { initWeb3 };
