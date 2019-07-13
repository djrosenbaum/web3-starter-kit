export default async function setupWeb3() {
  if (window.ethereum) {
    window.web3 = await new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch(error) {
      console.error(error);
    }
  } else if (window.web3) {
    window.web3 = await new Web3(Web3.givenProvider);
  } else {
    // console.log('no provider detected');
    window.web3 = await new Web3();
    //window.web3 = new Web3(https://mainnet.infura.io/YOUR_INFURA_API_KEY);
  }

  if(window.web3.currentProvider && window.web3.currentProvider.isConnected()) {
    console.log('successfully connected');
  } else {
    console.log("provider not connected");
  }
}