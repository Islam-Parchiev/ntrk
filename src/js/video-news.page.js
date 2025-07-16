// Основные элементы
const videoPlayerTag = document.querySelector('.video-player__video-tag');
const videoPlayer = document.querySelector(".video-player");
const progressBar = document.querySelector('.video-navigation__progress');
const playVideoBtn = document.querySelector('.video-player__play-btn');
const videoMuteBtn = document.querySelector(".video-navigation__sound_btn");
const videoFullScreenBtn = document.querySelector('.video-navigation__fullscreen');
const durationEl = document.querySelector('.video-navigation__timeline_duration');
const currentEl = document.querySelector('.video-navigation__timeline_current');
const videoDescription = document.querySelector(".video-player__media_description");
const videoNavigation = document.querySelector(".video-navigation");
const volumeInput = document.querySelector(".video-navigation__range-input");
const videoNavBtn = document.querySelector('.video-navigation__btn');
const volumeSlider = document.querySelector('[data-id="video-navigation__slider-round"]');

// Проверка существования элементов
if (!videoPlayerTag || !videoPlayer || !progressBar || !playVideoBtn || !videoMuteBtn || 
    !videoFullScreenBtn || !durationEl || !currentEl || !videoDescription || 
    !videoNavigation || !volumeInput || !videoNavBtn || !volumeSlider) {
    console.error('Один из элементов видео-плеера не найден!');
}

// Форматирование времени
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Инициализация слайдеров
const initSliders = () => {
    // Прогресс воспроизведения
    noUiSlider.create(progressBar, {
        start: 0,
        connect: [true, false],
        range: { min: 0, max: 100 },
        behaviour: 'tap-drag',
        step: 0.1
    });
    
    // Громкость
    noUiSlider.create(volumeSlider, {
        start: [videoPlayerTag.volume || 0.5],
        connect: 'lower',
        step: 0.01,
        range: { min: 0, max: 1 }
    });
};

// Обработчики событий
const setupEventListeners = () => {
    // Обновление времени и прогресса
    videoPlayerTag.addEventListener('timeupdate', updateProgress);
    
    // Перемотка видео
    progressBar.noUiSlider.on('slide', (values) => {
        const seekTime = (parseFloat(values[0]) * videoPlayerTag.duration / 100);
        videoPlayerTag.currentTime = seekTime;
    });
    
    // Обновление длительности видео
    videoPlayerTag.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(videoPlayerTag.duration);
    });
    
    // Основная кнопка воспроизведения
    playVideoBtn.addEventListener("click", toggleMainPlayback);
    
    // Кнопка паузы в навигации
    videoNavBtn.addEventListener("click", toggleNavigationPlayback);
    
    // Управление громкостью
    volumeSlider.noUiSlider.on('update', (values) => {
        const volume = parseFloat(values[0]);
        volumeInput.value = volume;
        videoPlayerTag.volume = volume;
        
        // Автоматическое управление состоянием звука
        videoPlayerTag.muted = (volume === 0);
        videoMuteBtn.classList.toggle('muted', volume === 0);
    });
    
    // Обновление слайдера громкости из input
    volumeInput.addEventListener('input', () => {
        volumeSlider.noUiSlider.set(volumeInput.value);
    });
    
    // Кнопка отключения звука
    videoMuteBtn.addEventListener("click", toggleMute);
    
    // Полноэкранный режим
    videoFullScreenBtn.addEventListener('click', toggleFullScreen);
};

// Обновление прогресса видео
const updateProgress = () => {
    if (videoPlayerTag.duration) {
        const progress = (videoPlayerTag.currentTime / videoPlayerTag.duration) * 100;
        progressBar.noUiSlider.set(progress);
        currentEl.textContent = formatTime(videoPlayerTag.currentTime);
    }
};

// Переключение основной кнопки воспроизведения
const toggleMainPlayback = () => {
    if (videoPlayerTag.paused) {
        videoPlayerTag.play()
            .then(() => {
                playVideoBtn.classList.add("played");
                videoPlayer.classList.add("playing");
                videoDescription.classList.add('hidden');
                videoNavigation.classList.remove("hidden");
                videoNavBtn.classList.add("played");
            })
            .catch(error => {
                console.error('Ошибка воспроизведения:', error);
            });
    } else {
        videoPlayerTag.pause();
        playVideoBtn.classList.remove("played");
        videoPlayer.classList.remove("playing");
        videoDescription.classList.remove('hidden');
        videoNavigation.classList.add("hidden");
        videoNavBtn.classList.remove("played");
    }
};

// Переключение кнопки воспроизведения в навигации
const toggleNavigationPlayback = () => {
    if (videoPlayerTag.paused) {
        videoPlayerTag.play();
        videoNavBtn.classList.add('played');
        videoPlayer.classList.add("playing");
    } else {
        videoPlayerTag.pause();
        videoNavBtn.classList.remove('played');
        videoPlayer.classList.remove("playing");
    }
};

// Переключение звука
const toggleMute = () => {
    const isMuted = !videoPlayerTag.muted;
    videoPlayerTag.muted = isMuted;
    videoMuteBtn.classList.toggle('muted', isMuted);
    
    // Установка соответствующего уровня громкости
    if (isMuted) {
        volumeSlider.noUiSlider.set(0);
    } else {
        const newVolume = videoPlayerTag.volume > 0 ? videoPlayerTag.volume : 0.5;
        volumeSlider.noUiSlider.set(newVolume);
    }
};

// Переключение полноэкранного режима
const toggleFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
    } else {
        videoPlayer.requestFullscreen().catch(console.error);
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация слайдеров
    initSliders();
    
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Установка начальной длительности
    if (videoPlayerTag.readyState > 0) {
        durationEl.textContent = formatTime(videoPlayerTag.duration);
    }
});