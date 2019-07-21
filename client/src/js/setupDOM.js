export default function setupDOM() {
  console.log('setup the dom!');
  displayMarkup();
  addListeners();
}

function displayMarkup() {
  console.log('markup');
  document.getElementById('network_status').innerHTML = window.dapp.connected ? 'connected' : 'not connected';
  get();
}

function addListeners() {
  console.log('add listeners');
  document.getElementById('get').addEventListener('click', get);
  document.getElementById('set').addEventListener('click', set);
}

async function get() {
  const value = await window.dapp.contracts.simpleStorage.contract.methods.get().call();
  document.getElementById('get_value').value = value;
}

function set() {
  const value = parseInt(document.getElementById('set_value').value, 10);
  const data = window.dapp.contracts.simpleStorage.contract.methods.set(value).encodeABI();

  sendTransaction(data);
}

async function sendTransaction(data) {
  const BN = window.web3.utils.BN;

  const from = await web3.eth.getCoinbase();
  const to = window.dapp.contracts.simpleStorage.address;
  const value = new BN('0');
  
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