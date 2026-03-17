// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  
  // --- 1. Логика формы (как и была, но с маленьким дополнением) ---
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      successMessage.style.display = 'block';
      form.reset();
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Маленькое "приключение": сообщение исчезает через 5 секунд
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    });
  }

  // --- 2. Анимация появления элементов при скролле (Intersection Observer) ---
  const animatedElements = document.querySelectorAll('.card, .section-head, .cert, .service');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        // После того, как анимация один раз проигралась, можно перестать наблюдать
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // 10% элемента видно
    rootMargin: '0px 0px -50px 0px' // небольшой отступ снизу
  });

  animatedElements.forEach(el => {
    el.style.opacity = '0'; // начальное состояние - прозрачный
    observer.observe(el);
  });

  // --- 3. Маленький счетчик посещений для приключений (хранится в localStorage) ---
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
      
      // Добавляем счетчик в футер, но очень деликатно
      const counterSpan = document.createElement('span');
      counterSpan.style.fontSize = '0.8rem';
      counterSpan.style.color = 'var(--muted)';
      counterSpan.style.marginLeft = '10px';
      counterSpan.textContent = `🌟 ${visits}`;
      
      // Чтобы не дублировать, проверим, есть ли уже
      if (!footer.querySelector('.visit-counter')) {
        counterSpan.classList.add('visit-counter');
        footer.appendChild(counterSpan);
      }
    }
  }

  // Вызовем функцию обновления счетчика
  updateVisitCounter();

  // --- 4. Добавим плавный скролл для якорей (на случай, если браузер не поддерживает) ---
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

  // --- 5. Маленькое приключение: случайный цвет для акцента при двойном клике на лого ---
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('dblclick', function() {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      document.documentElement.style.setProperty('--accent', randomColor);
      document.documentElement.style.setProperty('--accent-dark', randomColor);
      
      // Показываем подсказку
      alert('🎨 Цвет акцента изменен! Обновите страницу, чтобы вернуть обратно.');
    });
  }
});