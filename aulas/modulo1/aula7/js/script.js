window.addEventListener('load', start);

function start() {
  let name = document.getElementById('name');
  name.addEventListener('keyup', count);

  let form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function count(event) {
  let count = event.target.value.length;
  let text = document.getElementById('count');
  text.textContent = count;
}

function preventSubmit(event) {
  event.preventDefault();
}
