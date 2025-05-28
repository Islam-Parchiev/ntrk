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