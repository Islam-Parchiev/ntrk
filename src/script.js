const body = document.querySelector('.body');

const videoO = document.getElementById("videoOne");
const muteButton = document.querySelector('[data-id="muteVideo"]');
const unmuteButton = document.querySelector('[data-id="unmuteVideo"]');
const fullscreenButton = document.querySelector('[data-id="fullScreenVideo"]');
const radio = document.querySelector('#radio');
const fullscreenRadio = document.querySelector('[data-id="fullScreenRadio"]');
const slSwiper = document.querySelector('.swiper');
const headerScheduleSliders = document.querySelectorAll(".header__schedule_slider");
const header = document.querySelector(".header");
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
      nextEl: '.slider-btn--next',
      prevEl: '.slider-btn--prev',
    },

  });
}
function scheduleSliders() {
  if (headerScheduleSliders) {
  if(header.classList.contains("fixed")) {
    console.log("fixed");
headerScheduleSliders.forEach((slider) => {
    new Swiper(slider, {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      slideClass: "schedule-slide",
      wrapperClass: "schedule-wrapper",
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 1,
      spaceBetween: 10,
      // Navigation arrows
      navigation: {
        nextEl: '.schedule-navigation__btn--next',
        prevEl: '.schedule-navigation__btn--prev',
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,

          spaceBetween: 5
        },
         400: {
          slidesPerView: 1,

          spaceBetween: 5
        },
        // when window width is >= 480px
        
        480: {
          slidesPerView: 3,

          spaceBetween: 10
        },
        550: {
          slidesPerView: 2,

          spaceBetween: 10
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,

          spaceBetween: 10
        },
        750: {
          slidesPerView: 3,
          slidesPerGroupSkip: 3,
          slidesPerGroup: 3,
          spaceBetween: 10
        },
        1000: {
          slidesPerView: 4,

          spaceBetween: 10
        },
        1100: {
          slidesPerView: 5,

          spaceBetween: 10
        }
      }
    });
  })
  }else {
console.log("not fix  ed");
  
  headerScheduleSliders.forEach((slider) => {
    new Swiper(slider, {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      slideClass: "schedule-slide",
      wrapperClass: "schedule-wrapper",
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 1,
      spaceBetween: 0,
      // Navigation arrows
      navigation: {
        nextEl: '.schedule-navigation__btn--next',
        prevEl: '.schedule-navigation__btn--prev',
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,

          spaceBetween: 8
        },
         400: {
          slidesPerView: 3,

          spaceBetween: 5
        },
        // when window width is >= 480px
        
        480: {
          slidesPerView: 3,

          spaceBetween: 10
        },
        550: {
          slidesPerView: 2,

          spaceBetween: 10
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,

          spaceBetween: 10
        },
        750: {
          slidesPerView: 3,
          slidesPerGroupSkip: 3,
          slidesPerGroup: 3,
          spaceBetween: 10
        },
        1000: {
          slidesPerView: 4,

          spaceBetween: 10
        },
        1100: {
          slidesPerView: 5,

          spaceBetween: 10
        }
      }
    });
  })
  }
}
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

function debounce(func, delay) {
  let timeoutId;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
function fixHeaderOnScroll() {
  const header = document.querySelector('.header');
  const body = document.querySelector("body");
  if (!window.location.pathname.split("/").find((item) => item === "watch.html")) {

    if (window.pageYOffset > 600) {
      header.classList.add("fixed");
      header.classList.add("animate");
      body.classList.add("active");
      scheduleSliders()
    } else {
      header.classList.remove("fixed");
      header.classList.remove("animate");
      body.classList.remove("active");
      scheduleSliders()
    }
  }
}
window.addEventListener('DOMContentLoaded', ()=> {
  fixHeaderOnScroll()

  const debouncedHandler = debounce(fixHeaderOnScroll, 100);
  
  window.addEventListener('scroll', debouncedHandler);
});



const menuButton = document.querySelector(".header__search_btn");

const menuCloseBtn = document.querySelector(".menu__close");
const menu = document.querySelector("[data-menu='search']");
const navigators = menu.querySelectorAll(".navigator");
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

const burgerBtn = document.querySelector('.header__burger_btn');
const burgerMenu = document.querySelector("[data-menu='burger']");
const burgerNavigators = burgerMenu.querySelectorAll(".navigator");
const burgermenuitem = burgerNavigators.length;
const burgerMenuClose = document.querySelector(".burger__menu_close");
burgerBtn.addEventListener("click", () => {
  if (burgerMenu.classList.contains("open")) {
    for (let i = 0; i < burgermenuitem; i++) {
      burgerNavigators[i].style.transition = `all .1s linear .${i + 1}s`;
    }
    burgerMenu.style.transition = `all .2s linear .${menuitem + 1}s`;
    burgerMenu.classList.toggle("open");
    bodyMenu.classList.toggle("dis-scroll");
  } else {
    bodyMenu.classList.toggle("dis-scroll");
    burgerMenu.classList.toggle("open");
    burgerMenu.style.transition = "all .2s linear .0s";
    for (let i = 0; i < burgermenuitem; i++) {
      burgerNavigators[i].style.transition = `all .1s linear .${i + 1}s`;
    }
  }
})

burgerMenuClose.addEventListener("click", function () {
  if (menu.classList.contains("open")) {
    for (let i = 0; i < burgermenuitem; i++) {
      burgerNavigators[i].style.transition = `all .1s linear .${i + 1}s`;
    }
    burgerMenu.style.transition = `all .2s linear .${burgermenuitem + 1}s`;
    burgerMenu.classList.toggle("open");
    bodyMenu.classList.toggle("dis-scroll");
  } else {
    bodyMenu.classList.toggle("dis-scroll");
    burgerMenu.classList.toggle("open");
    burgerMenu.style.transition = "all .2s linear .0s";
    for (let i = 0; i < burgermenuitem; i++) {
      burgerNavigators[i].style.transition = `all .1s linear .${i + 1}s`;
    }
  }
});




// PopularItem
window.addEventListener("DOMContentLoaded", () => {


  function popularItem() {

    const popularItems = document.querySelectorAll('.popular-item');
    if (popularItems) {


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
        let softSlider = item.querySelector('[data-id="video-navigation__slider-round"]');

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


        videoNewsMuteBtn.addEventListener("click", () => {
          if (videoNewsMuteBtn.classList.contains("muted")) {
            videoTag.muted = false;
            videoNewsMuteBtn.classList.remove('muted');
            softSlider.noUiSlider.set(0.2);
          } else {
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
          // Рассчитываем процент проигранного времени
          const progress = videoTag.duration > 0 ? (videoTag.currentTime / videoTag.duration) * 100 : 0;

          progressBar.noUiSlider.set(progress);
          currentEl.textContent = formatTime(videoTag.currentTime);

        });
        progressBar.noUiSlider.on('slide', values => {
          if (videoTag.duration > 0) {

            const seekTime = (values[0] * videoTag.duration) / 100;
            videoTag.currentTime = seekTime;
          }
        });
        videoTag.addEventListener('loadedmetadata', () => {
          durationEl.textContent = formatTime(videoTag.duration);
          item.querySelector(".popular-item__media_timeline").textContent = formatTime(videoTag.duration)
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

    }



  }
  popularItem()
})



function dropdown() {
  const filtersBlock = document.querySelector(".filters");
  const filtersBtns = document.querySelectorAll(".news-content__filters_btn");
  if (filtersBlock && filtersBtns) {


    filtersBtns.forEach((item) => item.addEventListener("click", () => filtersBlock.classList.toggle("active")));
    document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
      const dropdownBtn = dropdownWrapper.querySelector('.dropdown__button');
      const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
      const dropdownItems = dropdownList.querySelectorAll('.dropdown__list-item');
      const dropdownInput = dropdownWrapper.querySelector('.dropdown__input_hidden')

      dropdownBtn.addEventListener('click', function () {
        dropdownList.classList.toggle('dropdown__list_visible');
        this.classList.toggle('dropdown__button_active');
      });

      dropdownItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
          dropdownItems.forEach(function (el) {
            el.classList.remove('dropdown__list-item_active');
          })
          e.target.classList.add('dropdown__list-item_active');
          dropdownBtn.innerText = this.innerText;
          console.log("value:", this.dataset.value);
          dropdownInput.value = this.dataset.value;
          dropdownList.classList.remove('dropdown__list_visible');
        })
      })

      document.addEventListener('click', function (e) {
        if (e.target !== dropdownBtn) {
          dropdownBtn.classList.remove('dropdown__button_active');
          dropdownList.classList.remove('dropdown__list_visible');
        }
      })

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
          dropdownBtn.classList.remove('dropdown__button_active');
          dropdownList.classList.remove('dropdown__list_visible');
        }
      })
    })

  }
}
dropdown();