import slotsABI from './contracts/slots.sol.js';

export default async function setupState() {
  console.log('setting up the contract state');
  window.dapp.contracts = {
    slots: {
      address: slotsABI.address,
      contract: new window.web3.eth.Contract(slotsABI.abi, slotsABI.address),
      isConnected: await web3.eth.getCode(slotsABI.address) !== '0x',
    }
  };
}