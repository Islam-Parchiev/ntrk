const popularItems = document.querySelectorAll('.popular-item');
const input = document.querySelector(".video-navigation__range-input");
const video = document.querySelector(".popular-item__media_video-tag");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
// const popularItemInput = document.querySelector(".video-navigation__range-input");
popularItems.forEach(item => {
    const videoTag = item.querySelector(".popular-item__media_video-tag");
    item.querySelector(".popular-item__media_timeline").textContent = formatTime(videoTag.duration)
    item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.classList.contains("btn-hidden")) {

            item.querySelector(".popular-item__media_video-tag").pause();
            item.classList.remove("played");
        }
        if (e.target.classList.contains("popular-item__media_btn") || e.target.nodeName === "path" || e.target.nodeName === "svg") {

            console.log('dddsa');
            item.querySelector(".popular-item__media_video-tag").play();
            item.classList.add("played");
            item.querySelector('.popular-item__video-navigation').classList.remove("hidden");
            item.classList.add("btn-hidden")
        }

    })
    item.querySelector(".video-navigation__timeline_current").textContent = formatTime(videoTag.current);
    item.querySelector(".video-navigation__timeline_duration").textContent = formatTime(videoTag.duration);
})



let softSlider = document.getElementById('video-navigation__slider-round');
noUiSlider.create(softSlider, {
    start: [0],
    connect: 'lower',
    step: 0.01,
    range: {
        'min': [0.0],
        'max': [1]
    }
});
// Из слайдера в input
softSlider.noUiSlider.on('update', function (values, handle) {
    input.value = values[handle];
    video.volume = values[handle];
    console.log(values[handle]);
    if (video.volume === 0) {
        console.log("000")
        videoNewsMuteBtn.classList.add('muted');
        video.muted = true;
    } else {
        videoNewsMuteBtn.classList.remove('muted');
        video.muted = false;
    }
});

// Из input в слайдер
input.addEventListener('change', function () {
    softSlider.noUiSlider.set(this.value);
    console.log(this.value);
});