const body = document.querySelector('.body');

const videoO = document.getElementById("videoOne");
const muteButton = document.querySelector('[data-id="muteVideo"]');
const unmuteButton = document.querySelector('[data-id="unmuteVideo"]');
const fullscreenButton = document.querySelector('[data-id="fullScreenVideo"]');
const slSwiper = document.querySelector('.swiper');
const popularItems = document.querySelectorAll('.popular-item');
const popularItemInput = document.querySelector(".video-navigation__range-input");
const headerScheduleSliders = document.querySelectorAll(".header__schedule_slider");

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



popularItems.forEach(item => {
  const videoTag = item.querySelector(".popular-item__media_video-tag");
  item.querySelector(".popular-item__media_timeline").textContent = formatTime(videoTag.duration)
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.classList.contains("btn-hidden")) {
      item.classList.remove("btn-hidden");
      item.querySelector(".popular-item__media_video-tag").pause()
    }
    if (e.target.classList.contains("popular-item__media_btn") || e.target.nodeName === "path" || e.target.nodeName === "svg") {

      console.log('dddsa');
      item.querySelector(".popular-item__media_video-tag").play()
      item.classList.add("btn-hidden")
    }

  })
})

document.addEventListener('DOMContentLoaded', function () {
  const p = document.getElementById("my-player"); // Use getElementById!
  if (p) {

    const player = videojs(p, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      loop: false,
      muted: false,
      poster: './assets/poster.jpg',
      playbackRates: [0.5, 1, 1.5, 2],
    });
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

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