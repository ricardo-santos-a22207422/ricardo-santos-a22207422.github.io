// Highlight planets on hover
function highlight(element) {
    element.style.backgroundColor = "#ffeb3b";
    element.style.fontWeight = "bold";
}

function removeHighlight(element) {
    element.style.backgroundColor = "";
    element.style.fontWeight = "normal";
}

// Show a random fun fact
function showFact() {
    const facts = [
        "Mercury has no atmosphere.",
        "Venus is the hottest planet in the Solar System.",
        "Earth is the only planet known to support life.",
        "Mars has the tallest volcano in the Solar System, Olympus Mons.",
        "Jupiter has over 79 moons!",
        "Saturn's rings are made of ice and rock.",
        "Uranus rotates on its side.",
        "Neptune has the strongest winds in the Solar System."
    ];
    const factElement = document.getElementById("fact");
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factElement.textContent = randomFact;
}

// Change the background color
function changeBackgroundColor() {
    const colorPicker = document.getElementById("colorPicker");
    document.body.style.backgroundColor = colorPicker.value;
}

// Show a secret message when scrolling to the bottom
window.addEventListener("scroll", function () {
    const message = document.getElementById("secret-message");
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        message.style.display = "block";
    }
});
