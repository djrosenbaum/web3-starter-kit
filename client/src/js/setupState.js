import SimpleStorageABI from './contracts/simple-storage.sol.js';

export default async function setupState() {
  console.log('setting up the contract state');
  window.dapp.contracts = {
    simpleStorage: {
      address: SimpleStorageABI.address,
      contract: new window.web3.eth.Contract(SimpleStorageABI.abi, SimpleStorageABI.address)
    }
  };
}