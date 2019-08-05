import displayContractStatus from './display/contract-status';
import displayCostToPlay from './display/cost-to-play';
import displayEvents from './display/events';
import displayNetworkStatus from './display/network-status';
import displaySlots from './display/slots';

export default function setupDOM() {
  console.log('setup the dom!');
  displayNetworkStatus();
  displayContractStatus();
  displayCostToPlay();
  displaySlots();
  displayEvents();
  addListeners();
}

// Contract not deployed
// if (!window.dapp.contracts.slots.isConnected) {
//   console.log('Contract not deployed');
//   return;
// }

function addListeners() {
  console.log('add listeners');
  document.getElementById('spin').addEventListener('click', spin);
}

async function spin() {
  const affiliate = '0x727C98364025d2EE552d4ec13e53c315dFEa57b8';
  const data = window.dapp.contracts.slots.contract.methods.spin(affiliate).encodeABI();
  const cost = await window.dapp.contracts.slots.contract.methods.costToPlay().call();

  sendTransaction({
    cost,
    data
  });
}

async function sendTransaction(payload) {
  const { cost, data } = payload;

  const BN = window.web3.utils.BN;

  const from = await web3.eth.getCoinbase();
  const to = window.dapp.contracts.slots.address;
  const value = new BN(cost);

  web3.eth.sendTransaction({
    from,
    to,
    value,
    data
  }).on('transactionHash', (hash) => {
    // console.log('transaction hash:', hash);
  }).on('receipt', (receipt) => {
    // console.log('transaction receipt:', hash);
  }).on('confirmation', (nonce, receipt) => {
    // console.log('confirmation receipt:', receipt);
  }).on('error', console.error); // If a out of gas error, the second parameter is the receipt.;
}