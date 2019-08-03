export default function displaySlots() {
  updateSlots();
  setInterval(updateSlots, 10000);
}

function getRandom() {
  return Math.floor(Math.random() * 10);
}

function updateSlots() {
  removeClasses('.slots .slot', 'ether-');

  document.querySelector('.slots .slot:nth-of-type(1)').classList.add(`ether-${getRandom()}`);
  document.querySelector('.slots .slot:nth-of-type(2)').classList.add(`ether-${getRandom()}`);
  document.querySelector('.slots .slot:nth-of-type(3)').classList.add(`ether-${getRandom()}`);
}

function removeClasses(selector, classPrefix) {
  console.log('removeClasses');
  const list = document.querySelectorAll(selector);

  console.log('list:', list);

  [].forEach.call(list, (item) => {
    item.classList.forEach((className) => {
      if (className.indexOf(classPrefix) > -1) {
        console.log('found:', className);
        item.classList.remove(className);
      }
    });
  });
}