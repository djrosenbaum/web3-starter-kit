import { ethers } from 'ethers';

export default async function setupWeb3() {
  console.log('setup web3');
  console.log('ethers:', Object.keys(ethers));

  if (window.ethereum || window.web3) {
    window.dapp.provider = new ethers.providers.Web3Provider(web3.currentProvider);
  } else {
    console.log('no provider detected');
    window.dapp.provider = new ethers.providers.BaseProvider();
  }
}