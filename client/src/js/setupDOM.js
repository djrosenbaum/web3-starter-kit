export default function setupDOM() {
  console.log('setup the dom!');
  displayNetworkStatus();
  displayContractStatus();
  displayCostToPlay();
  displayEvents();
  addListeners();
}

function displayNetworkStatus() {
  document.getElementById('network_status').innerHTML = window.dapp.connected ? 'connected' : 'not connected';
}

function displayContractStatus() {
  document.getElementById('contract_status').innerHTML = window.dapp.contracts.slots.isConnected ? 'connected' : 'not connected';

  // Contract not deployed
  if (!window.dapp.contracts.slots.isConnected) {
    console.log('Contract not deployed');
    return;
  }
}

async function displayCostToPlay() {
  const costToPlay = await window.dapp.contracts.slots.contract.methods.costToPlay().call();

  document.getElementById('costToPlay').innerHTML = `${web3.utils.fromWei(costToPlay.toString())} ETH`;
}

// const costToPlay = await window.dapp.contracts.slots.contract.methods.costToPlay().call();

function addListeners() {
  console.log('add listeners');
  document.getElementById('spin').addEventListener('click', spin);
}

async function displayEvents() {
  const pastEvents = await window.dapp.contracts.slots.contract.getPastEvents("allEvents", {
    fromBlock: 0,
    toBlock: 'latest',
  });

  let markup = '';

  pastEvents.forEach((event) => {
    markup += `<tr>
      <td>${event.returnValues._player}</td>
      <td></td>
    </tr>`;
  });

  console.log('markup:', markup);

  document.querySelector('.results tbody').innerHTML += markup;

  console.log(pastEvents);
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