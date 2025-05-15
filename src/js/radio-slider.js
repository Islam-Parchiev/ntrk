const input = document.querySelector('.range-input');
const radioSlider = new Swiper(".radio-slider", {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: "fraction"
    },
    slideClass: "radio-slider__slide",
    wrapperClass: "radio-slider__wrapper",
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 1,
    spaceBetween: 20,
    // Navigation arrows
    navigation: {
        nextEl: '.radio-slider__btn--next',
        prevEl: '.radio-slider__btn--prev',
    },

});
var softSlider = document.getElementById('slider-round');

noUiSlider.create(softSlider, {
    start: [30],
    connect:'lower',
    range: {
        'min': [0],
        'max': [100]
    }
});


// Из слайдера в input
softSlider.noUiSlider.on('update', function (values, handle) {
    input.value = values[handle];
    console.log(values[handle]);
});

// Из input в слайдер
input.addEventListener('change', function () {
    softSlider.noUiSlider.set(this.value);
    console.log(this.value);
});



// const slider = document.getElementById('volume-slider');
// const volumeValue = document.getElementById('volume-value');

// noUiSlider.create(slider, {
//   start: [50], // Начальное значение громкости
//   range: {
//     'min': 0,
//     'max': 100
//   },
//   orientation: 'horizontal', // Горизонтальное расположение
//   direction: 'ltr', // Направление слева направо
//   connect: 'lower', // Заполнять слева
//   step: 1,        // Шаг изменения громкости
//   tooltips: false,  // Отключаем тултипы (не нужны в этом примере)
// });

// // Обновление значения громкости при изменении положения ползунка
// slider.noUiSlider.on('update', function (values, handle) {
//   const volume = parseInt(values[handle]);
//   volumeValue.textContent = volume;

//   // Здесь можно добавить код для установки громкости видео/аудио
//   // Например: myAudio.volume = volume / 100;
// });


// Инициализация аудио
const audio = document.getElementById('audio');
const slider = document.getElementById('audio-slider');

// Инициализация слайдера
noUiSlider.create(slider, {
  start: 0,
  connect: [true, false], // Только прогресс-бар
  range: {
    'min': 0,
    'max': 100
  },
  behaviour: 'tap-drag', // Поведение слайдера
  step: 0.1,
  format: {
    to: function(value) {
      return value;
    },
    from: function(value) {
      return value;
    }
  }
});

// Обновление слайдера при воспроизведении
audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  slider.noUiSlider.set(progress);
});

// Перемотка при взаимодействии со слайдером
slider.noUiSlider.on('slide', (values) => {
  const seekTime = (values[0] * audio.duration) / 100;
  audio.currentTime = seekTime;
});

// Форматирование времени
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Обновление времени
audio.addEventListener('timeupdate', () => {
  document.querySelector('.current-time').textContent = formatTime(audio.currentTime);
  document.querySelector('.duration').textContent = formatTime(audio.duration);
});

// Инициализация продолжительности трека
audio.addEventListener('loadedmetadata', () => {
  slider.noUiSlider.updateOptions({
    range: {
      'min': 0,
      'max': audio.duration
    }
  });
});