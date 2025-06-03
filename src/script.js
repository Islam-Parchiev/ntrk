const body = document.querySelector('.body');

const videoO = document.getElementById("videoOne");
const muteButton = document.querySelector('[data-id="muteVideo"]');
const unmuteButton = document.querySelector('[data-id="unmuteVideo"]');
const fullscreenButton = document.querySelector('[data-id="fullScreenVideo"]');
const radio = document.querySelector('#radio');
const fullscreenRadio = document.querySelector('[data-id="fullScreenRadio"]');
const slSwiper = document.querySelector('.swiper');
const headerScheduleSliders = document.querySelectorAll(".header__schedule_slider");

fullscreenRadio.addEventListener('click', () => {
  radio.requestFullscreen();
})
if (slSwiper) {


  const swiper = new Swiper(slSwiper, {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: "fraction"
    },

    // Navigation arrows
    navigation: {
      nextEl: '.slider-btn--prev',
      prevEl: '.slider-btn--next',
    },

  });
}
if (headerScheduleSliders) {

  headerScheduleSliders.forEach((slider) => {
    new Swiper(slider, {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      slideClass: "schedule-slide",
      wrapperClass: "schedule-wrapper",
      slidesPerView: 5,
      slidesPerGroup: 3,
      slidesPerGroupSkip: 1,
      spaceBetween: 20,
      // Navigation arrows
      navigation: {
        nextEl: '.schedule-navigation__btn--next',
        prevEl: '.schedule-navigation__btn--prev',
      },

    });
  })

}
const tabBtns = document.querySelectorAll(".header__media_tab");
const tabs = document.querySelectorAll(".header__media_content");
const scheduleLists = document.querySelectorAll(".header__schedule_slider");

function showTab(tabId) {

  tabBtns.forEach(button => button.classList.remove('active'));
  tabs.forEach(panel => panel.classList.remove('active'));
  scheduleLists.forEach(list => list.classList.remove('active'));

  const tabButton = document.querySelector(`button[data-media-tab="${tabId}"]`);
  const tabPanel = document.getElementById(tabId);
  const scheduleList = document.querySelector(`div[data-schedule="${tabId}"]`);
  if (tabButton && tabPanel && scheduleList) {
    tabButton.classList.add('active');
    tabPanel.classList.add('active');
    scheduleList.classList.add('active');
  }
}
tabBtns.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.mediaTab;
    showTab(tabId);
  });
});



showTab('tv');

function videoCustom() {
  const videoEl = document.querySelector('.header__media_video');
  const playBtn = document.querySelector('[data-id="play"]');
  const pauseBtn = document.querySelector('[data-id="pause"]');

  playBtn.addEventListener("click", () => {
    videoEl.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  });
  pauseBtn.addEventListener("click", () => {
    videoEl.pause();
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  });
}

function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    // Если не в полноэкранном режиме, запрашиваем его
    if (element.requestFullscreen) {
      element.requestFullscreen(); // Стандартный
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  } else {
    // Если в полноэкранном режиме, выходим из него
    if (document.exitFullscreen) {
      document.exitFullscreen(); // Стандартный
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}


function toggleMute() {

  muteButton.addEventListener("click", () => {
    videoO.muted = true;
    unmuteButton.classList.remove("hidden");
    muteButton.classList.add("hidden");
  })
  unmuteButton.addEventListener("click", () => {
    videoO.muted = false;
    muteButton.classList.remove("hidden");
    unmuteButton.classList.add("hidden");
  })
}



toggleMute()
fullscreenButton.addEventListener("click", function () {
  toggleFullscreen(videoO);
});
videoCustom()

function fixHeaderOnScroll() {
  const header = document.querySelector('.header');
  const body = document.querySelector("body");
  if (!window.location.pathname.split("/").find((item) => item === "watch.html")) {

    if (window.pageYOffset > 600) {
      header.classList.add("fixed");
      header.classList.add("animate");
      body.classList.add("active");
    } else {
      header.classList.remove("fixed");
      header.classList.remove("animate");
      body.classList.remove("active");
    }
  }
}
window.addEventListener("scroll", fixHeaderOnScroll)



const menuButton = document.querySelector(".header__search_btn");

const menuCloseBtn = document.querySelector(".menu__close");
const menu = document.querySelector(".menu");
const navigators = document.querySelectorAll(".menu > .navigator");
const bodyMenu = document.querySelector('.body');
const menuitem = navigators.length;
menuButton.addEventListener("click", function () {
    if (menu.classList.contains("open")) {
        for (let i = 0; i < menuitem; i++) {
            navigators[i].style.transition = `all .1s linear .${i + 1}s`;
        }
        menu.style.transition = `all .2s linear .${menuitem + 1}s`;
        menu.classList.toggle("open");
        bodyMenu.classList.toggle("dis-scroll");
    } else {
        bodyMenu.classList.toggle("dis-scroll");
        menu.classList.toggle("open");
        menu.style.transition = "all .2s linear .0s";
        for (let i = 0; i < menuitem; i++) {
            navigators[i].style.transition = `all .1s linear .${i + 1}s`;
        }
    }
});
menuCloseBtn.addEventListener("click", function () {
    if (menu.classList.contains("open")) {
        for (let i = 0; i < menuitem; i++) {
            navigators[i].style.transition = `all .1s linear .${i + 1}s`;
        }
        menu.style.transition = `all .2s linear .${menuitem + 1}s`;
        menu.classList.toggle("open");
        bodyMenu.classList.toggle("dis-scroll");
    } else {
        bodyMenu.classList.toggle("dis-scroll");
        menu.classList.toggle("open");
        menu.style.transition = "all .2s linear .0s";
        for (let i = 0; i < menuitem; i++) {
            navigators[i].style.transition = `all .1s linear .${i + 1}s`;
        }
    }
});




// video news page
const playVideoBtn = document.querySelector(".video-navigation__btn");
const playBtn = document.querySelector(".video-player__play-btn");
const videoNavigation = document.querySelector(".video-navigation");
const videoNewsFullScreenBtn = document.querySelector(".video-navigation__fullscreen");
const videoNewsMuteBtn = document.querySelector(".video-navigation__sound_btn");
const video = document.querySelector(".video-player__video-tag");
const videoMediaTag = document.querySelector(".video-player");
const videoDescription = document.querySelector(".video-player__media_description");
const input = document.querySelector(".video-navigation__range-input");
const currentEl = document.querySelector(".video-navigation__timeline_current");
const durationEl = document.querySelector(".video-navigation__timeline_duration");
if (playBtn && video) {
    playBtn.addEventListener("click", () => {

        video.play();
        playBtn.classList.add("hidden");
        videoDescription.classList.add("hidden");
        videoNavigation.classList.remove("hidden");
        playVideoBtn.classList.add("played");
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