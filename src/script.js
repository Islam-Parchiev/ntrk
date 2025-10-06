import './js/headerLive.js';
const radio = document.querySelector('#radio');
const fullscreenRadio = document.querySelector('[data-id="fullScreenRadio"]');
const slSwiper = document.querySelector('.swiper');
const headerScheduleSliders = document.querySelectorAll(".header__schedule_slider");
const header = document.querySelector(".header");

// Обработчики полноэкранного режима
if (fullscreenRadio && radio) {
    fullscreenRadio.addEventListener('click', () => {
        radio.requestFullscreen().catch(console.error);
    });
}

// Инициализация основного слайдера
if (slSwiper) {
    const swiper = new Swiper(slSwiper, {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction"
        },
        navigation: {
            nextEl: '.slider-btn--next',
            prevEl: '.slider-btn--prev',
        },
    });
}

// Функция инициализации слайдеров расписания
function initScheduleSliders() {
    if (!headerScheduleSliders.length) return;
    
    // Общая конфигурация слайдеров
    const commonConfig = {
        direction: 'horizontal',
        loop: false,
        slideClass: "schedule-slide",
        wrapperClass: "schedule-wrapper",
        slidesPerGroup: 1,
        slidesPerGroupSkip: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.schedule-navigation__btn--next',
            prevEl: '.schedule-navigation__btn--prev',
        }
    };
    
    // Конфигурация для фиксированного хедера
    const fixedHeaderConfig = {
        ...commonConfig,
        slidesPerView: 1,
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 5 },
            400: { slidesPerView: 1, spaceBetween: 5 },
            480: { slidesPerView: 3, spaceBetween: 10 },
            550: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            750: { slidesPerView: 3, slidesPerGroup: 3, slidesPerGroupSkip: 3, spaceBetween: 10 },
            1000: { slidesPerView: 4, spaceBetween: 10 },
            1100: { slidesPerView: 5, spaceBetween: 10 }
        }
    };
    
    // Конфигурация для обычного хедера
    const normalHeaderConfig = {
        ...commonConfig,
        slidesPerView: 1,
        breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 8 },
            400: { slidesPerView: 3, spaceBetween: 5 },
            480: { slidesPerView: 3, spaceBetween: 10 },
            550: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            750: { slidesPerView: 3, slidesPerGroup: 3, slidesPerGroupSkip: 3, spaceBetween: 10 },
            1000: { slidesPerView: 4, spaceBetween: 10 },
            1100: { slidesPerView: 5, spaceBetween: 10 }
        }
    };
    
    // Выбор конфигурации в зависимости от состояния хедера
    const config = header.classList.contains("fixed") 
        ? fixedHeaderConfig 
        : normalHeaderConfig;
    
    // Инициализация слайдеров
    headerScheduleSliders.forEach(slider => {
        new Swiper(slider, config);
    });
}

// Инициализация слайдеров расписания
initScheduleSliders();


const tabBtns = document.querySelectorAll(".header__media_tab");
const tabs = document.querySelectorAll(".header__media_content");
const scheduleLists = document.querySelectorAll(".header__schedule_slider");

function showTab(tabId) {
  // Снимаем активные классы со всех элементов
  tabBtns.forEach(btn => btn.classList.remove('active'));
  tabs.forEach(tab => tab.classList.remove('active'));
  scheduleLists.forEach(list => list.classList.remove('active'));

  // Находим элементы для активации
  const activeBtn = document.querySelector(`button[data-media-tab="${tabId}"]`);
  const activeTab = document.getElementById(tabId);
  const activeSchedule = document.querySelector(`div[data-schedule="${tabId}"]`);

  // Активируем элементы, если они существуют
  if (activeBtn) activeBtn.classList.add('active');
  if (activeTab) activeTab.classList.add('active');
  if (activeSchedule) activeSchedule.classList.add('active');
}

// Добавляем обработчики событий
tabBtns.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-media-tab');
    if (tabId) showTab(tabId);
  });
});

// Инициализация с проверкой
if (tabBtns.length && tabs.length && scheduleLists.length) {
  showTab('tv');
} else {
  console.warn('Не найдены элементы для инициализации вкладок');
}



function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function initSlidersOnce() {
  if (!initSlidersOnce.executed) {
    initScheduleSliders();
    initSlidersOnce.executed = true;
  }
}

function handleHeaderState() {
  const header = document.querySelector('.header');
  const body = document.body;
  const isFixed = window.pageYOffset > 600;
  const isWatchPage = window.location.pathname.includes('watch.html');

  if (isWatchPage) return;
  
  header.classList.toggle('fixed', isFixed);
  header.classList.toggle('animate', isFixed);
  body.classList.toggle('active', isFixed);
  
  if (isFixed) initSlidersOnce();
}

document.addEventListener('DOMContentLoaded', () => {

  handleHeaderState();
  

  if (!window.location.pathname.includes('watch.html')) {
    const optimizedScrollHandler = debounce(handleHeaderState, 100);
    window.addEventListener('scroll', optimizedScrollHandler);
  }
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


const contentItemWrapper = document.querySelector('.header__media--video');
const overlay = document.querySelector('.overlay');
function isMobileOrTablet() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Check for common mobile phone keywords
  const isPhone = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent);

  // Check for common tablet keywords
  const isTablet = /android|ipad|playbook|silk/i.test(userAgent) && !isPhone; // Ensure it's not also a phone

  return {
    isMobile: isPhone || isTablet,
    isPhone: isPhone,
    isTablet: isTablet
  };
}
if (isMobileOrTablet().isMobile) {
  console.log('test');
  
  contentItemWrapper.addEventListener('touchstart', (event) => {
    event.stopPropagation();
        console.log('click');
          if (overlay) {
              overlay.classList.add('visible');
          }
      });

      document.addEventListener('click', (event) => {
        event.stopPropagation();
        if (!contentItemWrapper.contains(event.target)) {
          const overlay = document.querySelector('.overlay');
          if (overlay && overlay.classList.contains('visible')) {
            overlay.classList.remove('visible');
            console.log('overlay hidden - clicked outside');
          }
        }
      });
}