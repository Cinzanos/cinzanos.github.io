document.addEventListener('DOMContentLoaded', function() {
    // Добавление анимации на прокрутку
    window.addEventListener('scroll', function() {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          element.classList.add('in-view');
        }
      });
    });
  });
  