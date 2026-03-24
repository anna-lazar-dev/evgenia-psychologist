document.addEventListener('DOMContentLoaded', function() {
  // --- 1. Анимация появления элементов при скролле ---
  const animatedElements = document.querySelectorAll('.card, .section-head, .cert, .service');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // --- 2. Счетчик посещений ---
  function updateVisitCounter() {
    const footer = document.querySelector('.footer p:last-child');
    if (footer) {
      let visits = localStorage.getItem('visitCount');
      if (visits === null) {
        visits = 1;
      } else {
        visits = parseInt(visits) + 1;
      }
      localStorage.setItem('visitCount', visits);

      if (!footer.querySelector('.visit-counter')) {
        const counterSpan = document.createElement('span');
        counterSpan.classList.add('visit-counter');
        counterSpan.style.fontSize = '0.8rem';
        counterSpan.style.color = 'var(--muted)';
        counterSpan.style.marginLeft = '10px';
        counterSpan.textContent = `🌟 ${visits}`;
        footer.appendChild(counterSpan);
      }
    }
  }

  updateVisitCounter();

  // --- 3. Плавный скролл для якорей ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- 4. Смена акцентного цвета по двойному клику на лого ---
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('dblclick', function() {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      document.documentElement.style.setProperty('--accent', randomColor);
      document.documentElement.style.setProperty('--accent-dark', randomColor);
      alert('🎨 Цвет акцента изменен! Обновите страницу, чтобы вернуть обратно.');
    });
  }
});