let passar = document.getElementById("passar")
passar.addEventListener("mouseover", thanks)
function thanks() {
    this.textContent = "1. Obrigado por passares!"
}
passar.addEventListener("mouseout", reput)
function reput() {
    this.textContent = "1. Passa por Aqui" 
}

let paint = document.getElementById("paint")

document.querySelectorAll('#paint').forEach((e) => {
    e.addEventListener('click', () => {
        document.getElementById('paintp').style.color = e.dataset.color;
    })
})

const colors = ['yellow', 'blue', 'red', 'grey'];
let colorIndex = 0
mudaCor = () => {
    const input = document.getElementById('noSubmit');
    input.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}

document.querySelector('select').onchange = function() {
    document.body.style.backgroundColor = this.value;
}

if(!localStorage.getItem('counter')) {
    localStorage.setItem('counter', 0);
}

let counterHolder = document.getElementById("counterHolder")

function count() {
    let counter = localStorage.getItem('counter');
    counter++;
    counterHolder.textContent = counter;
    localStorage.setItem('counter', counter);
}
counterHolder.textContent = localStorage.getItem('counter');

document.querySelector('form').onsubmit = (e) => {
    e.preventDefault(); //to stop the page from reloading on submit
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    document.querySelector('#message').textContent = `Olá, o ${name} tem ${age}!`;
}

let autoCount = 0;

function autoCounting() {
    autoCount++;
    document.querySelector('#autoPlaceholder').textContent = autoCount;
}
setInterval(autoCounting, 1000);
