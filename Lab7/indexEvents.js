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

function changeRed() {
    paint.style.color = 'red'
}

function changeGreen() {
    paint.style.color = "green"
}

function changeBlue() {
    paint.style.color = 'blue'
}

const colors = ['yellow', 'blue', 'red', 'grey'];
let colorIndex = 0
function mudaCor() {
    const input = document.getElementById('noSubmit');
    input.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}

document.getElementById("colorSubmit").addEventListener("click", function() {
    let colorInput = document.getElementById("colorChange").value.trim(); // Get the input value and remove any extra whitespace
    
    if (colorInput) {
        document.body.style.backgroundColor = colorInput;
    } else {
        alert("Please type a valid color.");
    }
});


let counterHolder = document.getElementById("counterHolder")
let value = 0

function count() {
    value++
    counterHolder.textContent = value
}
