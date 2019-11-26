export default function setupDOM() {
  console.log('setup the dom!');
  displayMarkup();
  addListeners();
}

function displayMarkup() {
  console.log('markup');
  document.getElementById('network_status').innerHTML = window.dapp.connected ? 'connected' : 'not connected';
  document.getElementById('contract_status').innerHTML = window.dapp.contracts.simpleStorage.isConnected ? 'connected' : 'not connected';

  // Contract not deployed
  if (!window.dapp.contracts.simpleStorage.isConnected) {
    console.log('Contract not deployed');
    return;
  }
  get();
}

function addListeners() {
  console.log('add listeners');
  document.getElementById('get').addEventListener('click', get);
  document.getElementById('set').addEventListener('click', set);
}

async function get() {
  const value = await window.dapp.contracts.simpleStorage.contract.get();
  document.getElementById('get_value').value = value;
}

function set() {
  let inputValue = document.getElementById('set_value').value;
  inputValue = parseInt(inputValue, 10);

  window.dapp.contracts.simpleStorage.contract.set(inputValue);
}