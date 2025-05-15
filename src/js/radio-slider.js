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
    start: [1],
    connect:'lower',
    range: {
        'min': [1],
        'max': [4000]
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