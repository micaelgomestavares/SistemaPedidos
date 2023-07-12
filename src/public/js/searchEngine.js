/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */

const searchHistoric = () => {
  const input = document.getElementById('Search');
  const filter = input.value.toLowerCase();
  const nodes = document.getElementsByClassName('target');
  let i;
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = 'block';
    } else {
      nodes[i].style.display = 'none';
    }
  }
};
