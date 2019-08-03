export default function displayContractStatus() {
  document.getElementById('contract_status').innerHTML = window.dapp.contracts.slots.isConnected ? `<a href="https://etherscan.io/address/${window.dapp.contracts.slots.address}">${window.dapp.contracts.slots.address}</a>` : 'not connected';
}