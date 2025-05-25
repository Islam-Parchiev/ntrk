const tabContent = document.querySelectorAll(".tab-content");
const tabsS = document.querySelectorAll("li[data-tab]");
const menuTabItems = document.querySelectorAll("li[data-menutab]")

const programTabItems = document.querySelectorAll("li[data-program-tab]")
const programTabContents =document.querySelectorAll(".program-tab-content");

const transferTabItems = document.querySelectorAll("li[data-program-tab]")
const transferTabContents =document.querySelectorAll(".program-tab-content");
function showTabT(tabId) {

    tabsS.forEach(button => button.classList.remove('active'));
    tabContent.forEach(panel => panel.classList.remove('active'));

  const tabButton = document.querySelector(`li[data-tab="${tabId}"]`);
  console.log(tabButton);
  const tabC = document.querySelectorAll(`div[data-tab-content="${tabId}"]`);
  console.log(tabC);
  if (tabButton && tabC) {
    tabC.forEach((item)=>item.classList.add('active'));
    tabButton.classList.add('active');
  }
}
tabsS.forEach(item => {
  item.addEventListener('click', () => {
    const tabId = item.dataset.tab;
    console.log(tabId);
    showTabT(tabId);
  });
});

function menuTabs(tabId) {

  menuTabItems.forEach(button => button.classList.remove('active'));

const tabButton = document.querySelector(`li[data-menutab="${tabId}"]`);

if (tabButton) {
  tabButton.classList.add("active");
}
}
menuTabItems.forEach(item => {
item.addEventListener('click', () => {
  const tabId = item.dataset.menutab;
  console.log(tabId);
  menuTabs(tabId);
});
});

function programTabs(tabId) {

    programTabItems.forEach(item => item.classList.remove('active'));
    programTabContents.forEach(content => content.classList.remove('active'));

  const tabButton = document.querySelector(`li[data-program-tab="${tabId}"]`);
  console.log(tabButton);
  const tabC = document.querySelector(`div[data-program-tab-content="${tabId}"]`);
  console.log(tabC);
  if (tabButton && tabC) {
    tabC.classList.add('active');
    tabButton.classList.add('active');
  }
}
programTabItems.forEach(item => {
  item.addEventListener('click', () => {
    const tabId = item.dataset.programTab;
    console.log(tabId);
    programTabs(tabId);
  });
});

menuTabs(1)
showTabT(1);
programTabs(1);
