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


// const swiper = new Swiper(slSwiper, {
//     // Optional parameters
//     direction: 'horizontal',
//     loop: true,
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//       type: "fraction"
//     },

//     // Navigation arrows
//     navigation: {
//       nextEl: '.slider-btn--prev',
//       prevEl: '.slider-btn--next',
//     },

//   });