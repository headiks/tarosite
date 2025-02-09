const cardImages = [
    "Колесо Фортуны.jpg", 
    "Луна.jpg", 
    "Мир.jpg", 
    "Повешенный.jpg", 
    "Умеренность.jpg",
    "Император.jpg", 
    "Жрица.jpg"
];

let shuffledImages = [...cardImages].sort(() => 0.5 - Math.random());
let selectedCards = [];

function revealCard(index) {
    const card = document.getElementById(`card-${index}`);
    const cardContainer = card.parentElement;

    if (shuffledImages.length > 0 && selectedCards.length < 3) {
        card.classList.add("hidden");

        setTimeout(() => {
            const newImage = shuffledImages.shift(); 
            card.src = `images/${newImage}`;
            card.classList.remove("hidden");
            card.classList.add("visible");

            let cardName = newImage.replace(".jpg", "");
            cardContainer.querySelector(".card-title").innerText = cardName;
            cardContainer.classList.add("revealed");

            selectedCards.push(cardName);

            if (selectedCards.length === 3) {
                sendSelectedCards();
            }

            cardContainer.onclick = null;
        }, 500);
    }
}

function sendSelectedCards() {
    const jsonData = JSON.stringify({ selectedCards });

    if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.sendData(jsonData);
        Telegram.WebApp.close();
    } else {
        console.log("Выбранные карты:", jsonData);
    }
}
