// Основные элементы
const videoPlayerTag = document.querySelector('.video-player__video-tag');
const videoPlayer = document.querySelector(".video-player");
const progressBar = document.querySelector('.video-navigation__progress');
const playVideoBtn = document.querySelector('.video-player__play-btn');
const videoNewsMuteBtn = document.querySelector(".video-navigation__sound_btn");
const videoNewsFullScreenBtn = document.querySelector('.video-navigation__fullscreen');
const videoNavigationPlayBtn = document.querySelector(".video-navigation__btn");
const durationEl = document.querySelector('.video-navigation__timeline_duration');
const currentEl = document.querySelector('.video-navigation__timeline_current');
const videoDescription = document.querySelector(".video-player__media_description");
const videoNavigation = document.querySelector(".video-navigation");
const volumeInput = document.querySelector(".video-navigation__range-input");
const volumeSlider = document.querySelector('[data-id="video-navigation__slider-round"]');

// Проверка существования элементов
if (!videoPlayerTag || !videoPlayer || !progressBar || !playVideoBtn || !videoNewsMuteBtn || 
    !videoNewsFullScreenBtn || !videoNavigationPlayBtn || !durationEl || !currentEl || 
    !videoDescription || !videoNavigation || !volumeInput || !volumeSlider) {
    console.error("Один из элементов видео-плеера не найден!");
}

// Форматирование времени
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Инициализация слайдеров
const initSliders = () => {
    // Слайдер прогресса воспроизведения
    if (progressBar && !progressBar.noUiSlider) {
        noUiSlider.create(progressBar, {
            start: 0,
            connect: [true, false],
            range: { 'min': 0, 'max': 100 },
            behaviour: 'tap-drag',
            step: 0.1
        });

        // Обновление позиции видео
        progressBar.noUiSlider.on('slide', values => {
            const seekTime = (parseFloat(values[0]) * videoPlayerTag.duration / 100);
            videoPlayerTag.currentTime = seekTime;
        });
    }

    // Слайдер громкости
    if (volumeSlider && !volumeSlider.noUiSlider) {
        noUiSlider.create(volumeSlider, {
            start: [videoPlayerTag.volume || 0.7],
            connect: 'lower',
            step: 0.01,
            range: { 'min': 0, 'max': 1 }
        });

        // Синхронизация громкости
        volumeSlider.noUiSlider.on('update', (values) => {
            const volume = parseFloat(values[0]);
            volumeInput.value = volume;
            videoPlayerTag.volume = volume;
            
            // Автоматическое управление состоянием звука
            const isMuted = volume === 0;
            videoPlayerTag.muted = isMuted;
            videoNewsMuteBtn.classList.toggle('muted', isMuted);
        });
    }
};

// Обработчики событий видео
const setupVideoEvents = () => {
    // Обновление прогресса и времени
    videoPlayerTag.addEventListener('timeupdate', () => {
        const progress = (videoPlayerTag.currentTime / videoPlayerTag.duration) * 100;
        progressBar?.noUiSlider?.set(progress);
        currentEl.textContent = formatTime(videoPlayerTag.currentTime);
    });

    // Обновление длительности при загрузке
    videoPlayerTag.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(videoPlayerTag.duration);
        
        // Обновление диапазона слайдера
        if (progressBar?.noUiSlider) {
            progressBar.noUiSlider.updateOptions({
                range: { 'min': 0, 'max': 100 }
            });
        }
    });
};

// Управление воспроизведением
const setupPlaybackControls = () => {
    // Основная кнопка воспроизведения
    playVideoBtn?.addEventListener("click", () => {
        videoPlayerTag.play();
        videoDescription.classList.add('hidden');
        videoNavigation.classList.remove("hidden");
        playVideoBtn.classList.add('hidden');
        videoNavigationPlayBtn.classList.add("played");
    });

    // Кнопка паузы в навигации
    videoNavigationPlayBtn?.addEventListener("click", () => {
        const isPlaying = !videoPlayerTag.paused;
        
        if (isPlaying) {
            videoPlayerTag.pause();
            videoNavigationPlayBtn.classList.remove("played");
        } else {
            videoPlayerTag.play();
            videoNavigationPlayBtn.classList.add("played");
            videoDescription.classList.add('hidden');
            videoNavigation.classList.remove("hidden");
        }
    });
};

// Управление звуком
const setupVolumeControls = () => {
    // Слайдер громкости
    volumeInput?.addEventListener('input', function() {
        volumeSlider?.noUiSlider?.set(this.value);
    });

    // Кнопка отключения звука
    videoNewsMuteBtn?.addEventListener("click", () => {
        const isMuted = !videoPlayerTag.muted;
        videoPlayerTag.muted = isMuted;
        videoNewsMuteBtn.classList.toggle('muted', isMuted);
        
        // Установка соответствующего уровня громкости
        if (isMuted) {
            volumeSlider?.noUiSlider?.set(0);
        } else {
            volumeSlider?.noUiSlider?.set(videoPlayerTag.volume || 0.5);
        }
    });
};

// Управление полноэкранным режимом
const setupFullscreenControls = () => {
    videoNewsFullScreenBtn?.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(console.error);
        } else {
            videoPlayer.requestFullscreen().catch(console.error);
        }
    });
};

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
    initSliders();
    setupVideoEvents();
    setupPlaybackControls();
    setupVolumeControls();
    setupFullscreenControls();
    
    // Установка начальной длительности
    if (videoPlayerTag.readyState > 0) {
        durationEl.textContent = formatTime(videoPlayerTag.duration);
    }
});