const releaseItems = document.querySelectorAll('.releases-item');
releaseItems.forEach((item) => {
    const releaseItemVideo = item.querySelector('.releases-item__media video');
    const releaseItemPlayBtn = item.querySelector('.releases-item__play-btn');
    releaseItemPlayBtn.addEventListener("click", (e) => {
        if (e.target.classList.contains("releases-item__play-btn") || e.target.nodeName === "path" || e.target.nodeName === "svg" || e.target.nodeName === "circle") {
            releaseItemPlayBtn.classList.add("hidden");
            releaseItemVideo.play();
        }
    })
    releaseItemVideo.addEventListener("click",()=> {
        releaseItemVideo.pause();
        releaseItemPlayBtn.classList.remove("hidden");
    })
})