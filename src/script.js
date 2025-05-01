const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type:"fraction"
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.slider-btn--prev',
      prevEl: '.slider-btn--next',
    },
  
  });

  const scheduleSlider = new Swiper('.header__schedule_slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slideClass:"schedule-slide",
    wrapperClass:"schedule-wrapper",
    slidesPerView:5,
    slidesPerGroup:3,
    slidesPerGroupSkip: 1,
    spaceBetween:20,
    // Navigation arrows
    navigation: {
      nextEl: '.schedule-navigation__btn--right',
      prevEl: '.schedule-navigation__btn--left',
    },
  
  });
  const scheduleSliderFixed = new Swiper('.schedule-list--fixed', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slideClass:"schedule-list__item--fixed",
    wrapperClass:"schedule-list--wrapper",
    slidesPerView:6,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type:"fraction"
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.schedule-navigation__btn--left',
      prevEl: '.schedule-navigation__btn--right',
    },
  
  });
    const tabBtns = document.querySelectorAll(".header__media_tab");
    const tabs = document.querySelectorAll(".header__media_content");
   
function showTab(tabId) {

  tabBtns.forEach(button => button.classList.remove('active'));
  tabs.forEach(panel => panel.classList.remove('active'));


  const tabButton = document.querySelector(`button[data-tab="${tabId}"]`);
  const tabPanel = document.getElementById(tabId);

  if (tabButton && tabPanel) {
    tabButton.classList.add('active');
    tabPanel.classList.add('active');
  }
}


tabBtns.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;
    showTab(tabId);
  });
});


showTab('tab2');


  function fixHeaderOnScroll() {
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');
    if(window.pageYOffset> 600) {
        header.classList.add("fixed");
        main.classList.add("active");
    }else {
        header.classList.remove("fixed");
        main.classList.remove("active");
    }
  }
  window.addEventListener("scroll",fixHeaderOnScroll)
//   swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal
// swiper-pagination-current
// swiper-pagination-total