// Используем делегирование событий для общего контейнера
document.querySelector('.releases__items').addEventListener('click', (e) => {
    // Находим ближайший элемент релиза
    const releaseItem = e.target.closest('.releases-item');
    if (!releaseItem) return;

    // Получаем элементы внутри релиза
    const video = releaseItem.querySelector('.releases-item__media video');
    const playBtn = releaseItem.querySelector('.releases-item__play-btn');

    // Проверяем, был ли клик по кнопке воспроизведения
    if (e.target.closest('.releases-item__play-btn')) {
        // Останавливаем все другие видео
        document.querySelectorAll('.releases-item__media video').forEach(otherVideo => {
            if (otherVideo !== video) {
                otherVideo.pause();
                otherVideo.parentElement.querySelector('.releases-item__play-btn')?.classList.remove('hidden');
            }
        });

        // Воспроизводим текущее видео
        video.play().then(() => {
            playBtn.classList.add('hidden');
        }).catch(error => {
            console.error('Ошибка воспроизведения видео:', error);
        });
    }
    // Проверяем, был ли клик по самому видео
    else if (e.target === video) {
        video.pause();
        playBtn.classList.remove('hidden');
    }
});