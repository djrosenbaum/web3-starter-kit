export default async function displayCostToPlay() {
  const costToPlay = await window.dapp.contracts.slots.contract.methods.costToPlay().call();

  document.getElementById('costToPlay').innerHTML = `${web3.utils.fromWei(costToPlay.toString())} ETH`;
}