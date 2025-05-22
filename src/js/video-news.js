const playBtn = document.querySelector(".video-news__play-btn");
const video =document.querySelector(".video-news__video-tag");
const videoDescription = document.querySelector(".video-news__media_description");
const input = document.querySelector(".video-navigation__range-input");
if(playBtn&&video) {
    playBtn.addEventListener("click",()=> {
        
            video.play();
            playBtn.classList.add("hidden");
            videoDescription.classList.add("hidden");
    })
}

const radioSlider = new Swiper(".radio-slider", {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.radio-slider-pagination',
        type: "fraction"
    },
    slideClass: "radio-slide",
    wrapperClass: "radio-slider__wrapper",
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 1,
    // Navigation arrows
    navigation: {
        nextEl: '.radio-slider-btn--next',
        prevEl: '.radio-slider-btn--prev',
    },

});
let softSlider = document.getElementById('video-navigation__slider-round');

noUiSlider.create(softSlider, {
    start: [0],
    connect:'lower',
    step: 0.01,
    range: {
        'min': [0.0],
        'max': [1]
    }
});


// Из слайдера в input
softSlider.noUiSlider.on('update', function (values, handle) {
    input.value = values[handle];
    video.volume=values[handle];
    console.log(values[handle]);
});

// Из input в слайдер
input.addEventListener('change', function () {
    softSlider.noUiSlider.set(this.value);
    console.log(this.value);
});




const videoPlayer = document.querySelector('.video-news__video-tag');
const progressBar = document.querySelector('.video-navigation__progress');
const playVideoBtn = document.querySelector(".video-navigation__pause-btn");
 noUiSlider.create(progressBar, {
        start: 0,
        connect: [true, false],
        range: {'min': 0, 'max': 100},
        behaviour: 'tap-drag',
        step: 0.1,
        format: {
            to: value => value,
            from: value => value
        }
    });

     videoPlayer.addEventListener('timeupdate', () => {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.noUiSlider.set(progress);
        // durationEl.textContent = formatTime(videoPlayer.currentTime);

    });
 progressBar.noUiSlider.on('slide', values => {
        const seekTime = (values[0] * videoPlayer.duration) / 100;
        videoPlayer.currentTime = seekTime;
    });
    // window.addEventListener('DOMContentLoaded',()=> {
    //   durationEl.textContent=formatTime(videoPlayer.duration);
    // })

 videoPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(videoPlayer.duration);
        progressBar.noUiSlider.updateOptions({
            range: {'min': 0, 'max': videoPlayer.duration}
        });
    });
    playVideoBtn.addEventListener("click",(e)=> {
if(e.target.classList.contains("popular-item__media_btn") || e.target.nodeName === "path" || e.target.nodeName === "rect"|| e.target.nodeName === "svg"){
    videoPlayer.play();
}
    })
// console.log(audioPlayers);
// audioPlayers.forEach(container => {
//     const audio = container.querySelector('.audio');
//     const slider = container.querySelector('.audio-slider');
//     const durationEl = container.querySelector('.duration');
//     // Инициализация слайдера
//     noUiSlider.create(slider, {
//         start: 0,
//         connect: [true, false],
//         range: {'min': 0, 'max': 100},
//         behaviour: 'tap-drag',
//         step: 0.1,
//         format: {
//             to: value => value,
//             from: value => value
//         }
//     });


//     audio.addEventListener('timeupdate', () => {
//         const progress = (audio.currentTime / audio.duration) * 100;
//         slider.noUiSlider.set(progress);
//         durationEl.textContent = formatTime(audio.currentTime);

//     });

//     slider.noUiSlider.on('slide', values => {
//         const seekTime = (values[0] * audio.duration) / 100;
//         audio.currentTime = seekTime;
//     });
//     window.addEventListener('DOMContentLoaded',()=> {
//       durationEl.textContent=formatTime(audio.duration);
//     })
//     audio.addEventListener('loadedmetadata', () => {
//         durationEl.textContent = formatTime(audio.duration);
//         slider.noUiSlider.updateOptions({
//             range: {'min': 0, 'max': audio.duration}
//         });
//     });
// });
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}