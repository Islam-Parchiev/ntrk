// Основные элементы управления плеером
const playerAudio = document.querySelector(".player__controls > audio");
const playBtn = document.querySelector(".player__controls_btn--play");
const muteBtn = document.querySelector(".player__mute");
const volumeInput = document.querySelector('.range-input');
const volumeSlider = document.getElementById('slider-round');


const radioSlider = new Swiper(".radio-slider", {
    direction: 'horizontal',
    loop: true,
    pagination: { el: '.radio-slider-pagination', type: "fraction" },
    slideClass: "radio-slide",
    wrapperClass: "radio-slider__wrapper",
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
        nextEl: '.radio-slider-btn--next',
        prevEl: '.radio-slider-btn--prev',
    },
});

if (volumeSlider) {
    noUiSlider.create(volumeSlider, {
        start: [playerAudio.volume || 0.7],
        connect: 'lower',
        step: 0.01,
        range: { min: 0, max: 1 }
    });


    volumeSlider.noUiSlider.on('update', (values) => {
        const volume = parseFloat(values[0]);
        volumeInput.value = volume;
        playerAudio.volume = volume;
    });

    volumeInput.addEventListener('input', function() {
        volumeSlider.noUiSlider.set(this.value);
    });
}


playBtn?.addEventListener("click", () => {
    const isPlaying = !playerAudio.paused;
    
    playBtn.classList.toggle("active", !isPlaying);
    isPlaying ? playerAudio.pause() : playerAudio.play();
});

muteBtn?.addEventListener("click", () => {
    playerAudio.muted = !playerAudio.muted;
    muteBtn.classList.toggle('muted', playerAudio.muted);
});


const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};


class RadioPlayer {
    constructor(container) {
        this.container = container;
        this.audio = container.querySelector('.audio');
        this.slider = container.querySelector('.audio-slider');
        this.durationEl = container.querySelector('.duration');
        
        if (!this.audio || !this.slider || !this.durationEl) return;
        
        this.initSlider();
        this.setupEvents();
        this.updateDuration();
    }

    initSlider() {
        noUiSlider.create(this.slider, {
            start: 0,
            connect: [true, false],
            range: { min: 0, max: 100 },
            behaviour: 'tap-drag',
            step: 0.1
        });
    }

    setupEvents() {
    
        this.audio.addEventListener('timeupdate', () => {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.slider.noUiSlider.set(progress);
            this.durationEl.textContent = formatTime(this.audio.currentTime);
        });

 
        this.slider.noUiSlider.on('slide', (values) => {
            const seekTime = (parseFloat(values[0]) * this.audio.duration) / 100;
            this.audio.currentTime = seekTime;
        });


        this.audio.addEventListener('loadedmetadata', () => {
            this.updateDuration();
        });
    }

    updateDuration() {
        if (this.audio.duration) {
            this.durationEl.textContent = formatTime(this.audio.duration);
        } else {
 
            setTimeout(() => this.updateDuration(), 500);
        }
    }
}


document.querySelectorAll('.radio-item').forEach(container => {
    new RadioPlayer(container);
});