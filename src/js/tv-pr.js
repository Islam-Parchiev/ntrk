function filterNews(category) {
    const newsItems = document.querySelectorAll('div[data-category]');
    console.log(category);
    newsItems.forEach(item => item.classList.remove('active'));
    if (category === 'all') {
        newsItems.forEach(item => item.classList.add('active'));
    } else {
        newsItems.forEach(item => {
            if (item.dataset.category === category) {
                item.classList.add("active");
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('[data-tab="1"]').classList.add('active');

    filterNews('1');
});

document.querySelectorAll('.ProgramTabBar__item').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.ProgramTabBar__item').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.tab;
        filterNews(category);
    });
});