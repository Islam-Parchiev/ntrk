const videoPlayer = document.querySelector('.video-player__video-tag');
const progressBar = document.querySelector('.video-navigation__progress');
noUiSlider.create(progressBar, {
    start: 0,
    connect: [true, false],
    range: {
        'min': 0,
        'max': 100
    },
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
    currentEl.textContent = formatTime(videoPlayer.currentTime);

});
progressBar.noUiSlider.on('slide', values => {
    const seekTime = (values[0] * videoPlayer.duration) / 100;
    videoPlayer.currentTime = seekTime;
});


window.addEventListener('DOMContentLoaded', () => {
    durationEl.textContent = formatTime(videoPlayer.duration);
})
videoPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(videoPlayer.duration);
    progressBar.noUiSlider.updateOptions({
        range: {
            'min': 0,
            'max': videoPlayer.duration
        }
    });
});





playVideoBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("video-navigation__btn") || e.target.nodeName === "path" || e.target.nodeName === "rect" || e.target.nodeName === "svg") {
        if (playVideoBtn.classList.contains("played")) {
            playVideoBtn.classList.remove("played");
            videoPlayer.pause();
        } else {
            playVideoBtn.classList.add("played");
            videoPlayer.play();
        }

    }
})

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
console.log(video.volume)

videoNewsMuteBtn.addEventListener("click", () => {
    if (video.muted === true && videoNewsMuteBtn.classList.contains("muted")) {
        video.muted = false;
        videoNewsMuteBtn.classList.remove("muted");
        input.value = 0.2;
        video.volume = 0.2;
        softSlider.noUiSlider.set(0.2);
    } else {
        video.muted = true;
        videoNewsMuteBtn.classList.add("muted");
        input.value = 0;
        video.volume = 0;
        softSlider.noUiSlider.set(0);
    }
})


videoNewsFullScreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document
            .exitFullscreen()
            .then(() => console.log("Document Exited from Full screen mode"))
            .catch((err) => console.error(err));
    } else {
        videoMediaTag.requestFullscreen();
    }

})
