export default function displayNetworkStatus() {
  document.getElementById('network_status').innerHTML = window.dapp.connected ? 'connected' : 'not connected';
}