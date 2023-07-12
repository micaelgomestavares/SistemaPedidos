const arrow = document.querySelectorAll('.arrow');

// eslint-disable-next-line no-plusplus
for (let i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener('click', (e) => {
    const arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle('showMenu');
  });
}
