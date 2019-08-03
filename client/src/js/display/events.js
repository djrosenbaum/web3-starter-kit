export default async function displayEvents() {
  const pastEvents = await window.dapp.contracts.slots.contract.getPastEvents("allEvents", {
    fromBlock: 0,
    toBlock: 'latest',
  });

  let markup = '';

  pastEvents.forEach((event) => {
    console.log('event:', event);
    markup += `<tr>
      <td class="address">${event.returnValues._player}</td>
      <td class="result">${event.returnValues._result.map(result => '<span class="ether-' + result + '"></span>').join('')}</td>
    </tr>`;
  });

  document.querySelector('.results tbody').innerHTML += markup;

  console.log(pastEvents);
}