  function filterNews(category) {
      const newsItems = document.querySelectorAll('[data-category]');
      console.log(category);
      newsItems.forEach(item => item.classList.remove('active'));
      newsItems.forEach(item => item.classList.remove("main-news-item"));

      if (category === 'all') {
          newsItems.forEach(item => item.classList.add('active'));
      } else {
          newsItems.forEach(item => {
              if (item.dataset.category === category) {
                  item.classList.add("active");
              }
          })
      }
      const el = document.querySelector(".news-item.active");
      if (el && el.classList.contains("active")) {
          el.classList.add("main-news-item");
      }
  }

  document.addEventListener('DOMContentLoaded', () => {
      if (document.querySelector('[data-tab="all"]')) {
          document.querySelector('[data-tab="all"]').classList.add('active');
          filterNews('all');
      } else {
          document.querySelector('[data-tab="1"]').classList.add('active');
          filterNews('1');
      }


  });

  document.querySelectorAll('[data-tab]').forEach(button => {
      button.addEventListener('click', () => {
          document.querySelectorAll('[data-tab]').forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          const category = button.dataset.tab;
          filterNews(category);
      });
  });