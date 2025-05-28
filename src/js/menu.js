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


function menuFilters(category) {
    const newsItems = document.querySelectorAll('[data-menu-category]');
    console.log(category);
    newsItems.forEach(item => item.classList.remove('active'));
    if (category === 'all') {
        newsItems.forEach(item => item.classList.add('active'));
    } else {
        newsItems.forEach(item => {
            if (item.dataset.menuCategory === category) {
                item.classList.add("active");
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.split("/").find((item) => item === "tv-program.html")) {
        menuFilters('1');
        document.querySelector('[data-menutab="1"]').classList.add('active');
      }else {
        document.querySelector('[data-menutab="all"]').classList.add('active');

        menuFilters('all');
      }
});

document.querySelectorAll('[data-menutab]').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('[data-menutab]').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.menutab;
        menuFilters(category);
    });
});