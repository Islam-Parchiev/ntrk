const livePlayBtn = document.querySelector(".main-media__play");
const liveMuteBtn = document.querySelector(".main-media__mute");
const liveVideo = document.querySelector(".live__main-media");
const liveVideoTag = document.querySelector(".live-video-tag");
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
            liveVideoTag.play();
        } else {
            livePlayBtn.classList.remove("pause");
            liveVideoTag.pause();
        }

    }
})
fullScreenBtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document
      .exitFullscreen()
      .then(() => console.log("Document Exited from Full screen mode"))
      .catch((err) => console.error(err));
  } else {
    liveVideo.requestFullscreen();
  }

})
liveMuteBtn.addEventListener("click", () => {
    if (liveVideoTag.muted===true) {
        liveVideoTag.muted = false;
        liveMuteBtn.classList.remove('muted');
    } else {
        liveVideoTag.muted = true;
        liveMuteBtn.classList.add('muted');
    }
})