const menuButton = document.querySelector(".header__search_btn");

const menuCloseBtn = document.querySelector(".menu__close");
const menu = document.querySelector(".menu");
const navigators = document.querySelectorAll(".menu > .navigator");
const body = document.querySelector('.body');
const menuitem = navigators.length;
const videoO = document.getElementById("videoOne");
const muteButton = document.getElementById("muteVideo");
const unmuteButton = document.getElementById("unmuteVideo");
const fullscreenButton = document.getElementById("fullScreenVideo");
const slSwiper = document.querySelector('.swiper');
const popularItemVIdeo = document.querySelectorAll('.popular-item__media');
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

  const tabButton = document.querySelector(`button[data-tab="${tabId}"]`);
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
    const tabId = button.dataset.tab;
    showTab(tabId);
  });
});



showTab('tv');

function videoCustom() {
  const videoEl = document.querySelector('.header__media_video');
  const playBtn = document.querySelector('#play');
  const pauseBtn = document.querySelector("#pause");

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
  const main = document.querySelector('main[data-main]');
  if (!window.location.pathname.split("/").find((item) => item === "watch.html")) {

    if (window.pageYOffset > 600) {
      header.classList.add("fixed");
      main.classList.add("active");
    } else {
      header.classList.remove("fixed");
      main.classList.remove("active");
    }
  }
}
window.addEventListener("scroll", fixHeaderOnScroll)

menuButton.addEventListener("click", function () {
  if (menu.classList.contains("open")) {
    for (let i = 0; i < menuitem; i++) {
      navigators[i].style.transition = `all .1s linear .${i + 1}s`;
    }
    menu.style.transition = `all .2s linear .${menuitem + 1}s`;
    menu.classList.toggle("open");
    body.classList.toggle("dis-scroll");
  } else {
    body.classList.toggle("dis-scroll");
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
    body.classList.toggle("dis-scroll");
  } else {
    body.classList.toggle("dis-scroll");
    menu.classList.toggle("open");
    menu.style.transition = "all .2s linear .0s";
    for (let i = 0; i < menuitem; i++) {
      navigators[i].style.transition = `all .1s linear .${i + 1}s`;
    }
  }
});
console.log('tetaltmeamm');
popularItemVIdeo.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.classList.contains("btn-hidden")) {
      item.classList.remove("btn-hidden");
      item.querySelector(".popular-item__media_video-tag").pause()
    }
    if (e.target.classList.contains("popular-item__media_btn") || e.target.nodeName === "path" || e.target.nodeName === "svg") {


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