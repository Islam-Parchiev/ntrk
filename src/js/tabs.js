const tabContent = document.querySelectorAll(".tab-content");
const tabsS = document.querySelectorAll(".tab");


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



showTabT('two');