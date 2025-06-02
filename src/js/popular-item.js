window.addEventListener("DOMContentLoaded", () => {
    const popularItems = document.querySelectorAll('.popular-item');

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    // const popularItemInput = document.querySelector(".video-navigation__range-input");
    popularItems.forEach(item => {

        const videoTag = item.querySelector(".popular-item__media_video-tag");
        const input = item.querySelector(".video-navigation__range-input");
        const videoNewsMuteBtn = item.querySelector(".video-navigation__sound_btn");
        const progressBar = item.querySelector('.video-navigation__progress');
        const playBtn = item.querySelector('.popular-item__media_btn');
        const videoNavigationPlayBtn = item.querySelector(".video-navigation__btn");
        const currentEl = item.querySelector(".video-navigation__timeline_current");
        const durationEl = item.querySelector(".video-navigation__timeline_duration");
        const fullScreenBtn = item.querySelector(".video-navigation__fullscreen");
        let softSlider = item.querySelector('#video-navigation__slider-round');

        item.querySelector(".popular-item__media_timeline").textContent = formatTime(videoTag.duration)
        playBtn.addEventListener("click", () => {
            if (item.classList.contains("btn-hidden")) {
                videoTag.pause();
                item.classList.remove("played");
            }

            item.querySelector(".popular-item__media_video-tag").play();
            item.classList.add("played");
            item.querySelector('.popular-item__video-navigation').classList.remove("hidden");
            item.classList.add("btn-hidden")


        })
        videoNavigationPlayBtn.addEventListener("click", () => {
           
            if (item.classList.contains("played")) {
                videoTag.pause();
                item.classList.remove("played")
            } else {
                videoTag.play();
                item.classList.add("played")
            }
        })
        durationEl.textContent = formatTime(videoTag.duration);
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
            videoTag.volume = values[handle];
        
            if (videoTag.volume === 0) {
       
                videoNewsMuteBtn.classList.add('muted');
                videoTag.muted = true;
            } else {
                videoNewsMuteBtn.classList.remove('muted');
                videoTag.muted = false;
            }
        });

        // Из input в слайдер
        input.addEventListener('change', function () {
            softSlider.noUiSlider.set(this.value);
       
        });


        videoNewsMuteBtn.addEventListener("click",()=> {
            if(videoNewsMuteBtn.classList.contains("muted")) {
                videoTag.muted = false;
                videoNewsMuteBtn.classList.remove('muted');
                softSlider.noUiSlider.set(0.2);
            }else {
                  videoTag.muted = true;
                videoNewsMuteBtn.classList.add('muted');
                softSlider.noUiSlider.set(0);
            }
        })

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

        videoTag.addEventListener('timeupdate', () => {
            const progress = (videoTag.currentTime / videoTag.duration) * 100;
            progressBar.noUiSlider.set(progress);
            currentEl.textContent = formatTime(videoTag.currentTime);

        });
        progressBar.noUiSlider.on('slide', values => {
            const seekTime = (values[0] * videoTag.duration) / 100;
            videoTag.currentTime = seekTime;
        });
        videoTag.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(videoTag.duration);
             item.querySelector(".popular-item__media_timeline").textContent = formatTime(videoTag.duration)
            progressBar.noUiSlider.updateOptions({
                range: {
                    'min': 0,
                    'max': videoTag.duration
                }
            });
        });

        // Полноэкранный режим
      fullScreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document
            .exitFullscreen()
            .then(() => console.log("Document Exited from Full screen mode"))
            .catch((err) => console.error(err));
    } else {
        item.querySelector(".popular-item__media").requestFullscreen();
    }

})
    })




})