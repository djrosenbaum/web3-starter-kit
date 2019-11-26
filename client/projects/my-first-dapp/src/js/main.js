import setupWeb3 from './setupWeb3';
import setupState from './setupState';
import setupDOM from './setupDOM';

async function init() {
  window.dapp = window.dapp || {};
  await setupWeb3();
  await setupState();
  setupDOM();
}

window.addEventListener('load', () => {
  init();
});