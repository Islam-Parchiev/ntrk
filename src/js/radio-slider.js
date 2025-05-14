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

