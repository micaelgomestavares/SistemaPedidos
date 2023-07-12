$(document).ready(() => {
  $('.valorreal').maskMoney({
    prefix: 'R$: ',
    decimal: ',',
    thousands: '.',
  });
});

const timeDisplay = document.getElementById('_data');

const refreshTime = () => {
  const dateString = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  const formattedString = dateString.replace(', ', ' - ');
  timeDisplay.innerHTML = `<i class="fas fa-clock"></i> Data: ${formattedString}`;
  document.getElementById('data').value = formattedString;
};

refreshTime();
setInterval(refreshTime, 1000);
