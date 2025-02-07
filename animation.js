const cardImages = ["хуй.jpg", "card2.jpg", "card3.jpg", "card4.jpg", "card5.jpg"];
let shuffledImages = cardImages.sort(() => 0.5 - Math.random());

function revealCard(event) {
    const card = event.currentTarget; // Получаем кликнутую карту
    const img = card.querySelector('.card-img');
    const title = card.querySelector('.card-title');

    const index = card.id.split('-')[1]; // Получаем индекс карты из ее ID
    
    if (shuffledImages.length > 0) {
        // Скрываем текст
        title.classList.add('hidden');

        // Исчезновение картинки
        img.classList.add("hidden");

        setTimeout(() => {
            // Меняем картинку
            const newImage = shuffledImages.shift();
            img.src = `images/${newImage}`;
            img.classList.remove("hidden");
            img.classList.add("visible"); // Плавное появление картинки

            // Извлекаем имя файла без расширения для подписи
            const cardName = newImage.replace(/\.[^/.]+$/, ""); // Убираем расширение
            title.textContent = cardName; // Обновляем подпись с названием карты

            // Показываем название карты
            title.classList.remove('hidden');

            // Отключаем клик после смены карты
            card.removeEventListener('click', revealCard);
        }, 500); // Задержка смены изображения после исчезновения
    }
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', revealCard);
});
