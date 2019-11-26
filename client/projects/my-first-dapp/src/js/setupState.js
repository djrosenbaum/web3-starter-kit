import SimpleStorageABI from './contracts/simple-storage.sol.js';
import { ethers } from 'ethers';

export default async function setupState() {
  console.log('setting up the contract state');
  window.dapp.contracts = {
    simpleStorage: {
      address: SimpleStorageABI.address,
      contract: new ethers.Contract(SimpleStorageABI.address, SimpleStorageABI.abi, window.dapp.provider.getSigner()),
      isConnected: await window.dapp.provider.getCode(SimpleStorageABI.address) !== '0x',
    }
  };
}