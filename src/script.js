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


  function fixHeaderOnScroll() {
    const header = document.querySelector('.header');
    if(window.pageYOffset> 300) {
        header.classList.add("fixed");
    }else {
        header.classList.remove("fixed");
    }
  }
  window.addEventListener("scroll",fixHeaderOnScroll)
//   swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal
// swiper-pagination-current
// swiper-pagination-total