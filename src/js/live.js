const livePlayBtn = document.querySelector(".main-media__play");
const liveMuteBtn = document.querySelector(".main-media__mute");
const liveVideo = document.querySelector(".live-video-tag");
const fullScreenBtn = document.querySelector(".navigation-bar__fullscreen");
const liveVideoStatus = document.querySelector(".main-media__status");
if (liveVideoStatus.getAttribute("data-status") === 'online') {
    livePlayBtn.disabled = false;
    liveVideoStatus.classList.add("online");
} else {
    livePlayBtn.disabled = true;
    liveVideoStatus.classList.remove("online");
}
livePlayBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("main-media__play") || e.target.nodeName === "path" || e.target.nodeName === "svg" || e.target.nodeName === "circle" || e.target.nodeName === "rect") {
        if (!livePlayBtn.classList.contains("pause")) {
            livePlayBtn.classList.add("pause");
            liveVideo.play();
        } else {
            livePlayBtn.classList.remove("pause");
            liveVideo.pause();
        }

    }
})
fullScreenBtn.addEventListener('click', () => {
    liveVideo.requestFullscreen();
})
liveMuteBtn.addEventListener("click", () => {
    if (liveVideo.muted===true) {
        liveVideo.muted = false;
        liveMuteBtn.classList.remove('muted');
    } else {
        liveVideo.muted = true;
        liveMuteBtn.classList.add('muted');
    }
})