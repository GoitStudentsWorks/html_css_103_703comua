(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.mob-menu-open-btn');
  const openMenuIcon = document.querySelector('.js-open-menu');
  const closeMenuIcon = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen = !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', isMenuOpen);

    openMenuIcon.classList.toggle('is-hidden', isMenuOpen);
    closeMenuIcon.classList.toggle('is-hidden', !isMenuOpen);

    const scrollLockMethod = isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  closeMenuIcon.classList.add('is-hidden');

  openMenuBtn.addEventListener('click', toggleMenu);

  // Функція для зняття фокусу з активних посилань
  const removeFocusFromLinks = () => {
    document.querySelectorAll('a').forEach(link => {
      link.blur();
    });
  };

  // Функція для плавного прокручування до якоря та закриття мобільного меню (якщо воно відкрите)
  const smoothScrollAndCloseMenu = event => {
    event.preventDefault(); // Запобігаємо стандартній дії посилання
    const targetId = event.currentTarget.getAttribute('href'); // Отримуємо ідентифікатор якоря
    const targetElement = document.querySelector(targetId); // Знаходимо елемент, який посилається якір
    if (targetElement) {
      // Прокручуємо сторінку до елемента з плавною анімацією
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Прокручуємо так, щоб елемент був у верхній частині вікна
      });
      // Закриваємо мобільне меню (якщо це мобільне меню і воно відкрите)
      const mobileMenu = document.querySelector('.js-menu-container');
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        toggleMenu();
      }
    }
    // Знімаємо фокус із активних посилань
    removeFocusFromLinks();
  };

  // Додаємо обробники подій для всіх посилань з якорями у мобільному меню
  const mobileMenuLinks = document.querySelectorAll('.mob-menu-link');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', smoothScrollAndCloseMenu);
  });

  // Додаємо обробники подій для всіх посилань з якорями на сторінці
  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]:not(.mob-menu-link)'
  );
  anchorLinks.forEach(link => {
    link.addEventListener('click', smoothScrollAndCloseMenu);
  });

  // Додаємо обробники подій для всіх посилань з якорями на сторінці
  document.addEventListener('click', removeFocusFromLinks);

  const closeMenuBtn = document.querySelector('.js-close-menu');
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuIcon.classList.remove('is-hidden');
    closeMenuIcon.classList.add('is-hidden');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

// считываем кнопку
const goTopBtn = document.querySelector('.go-top');

// обработчик на скролл окна
window.addEventListener('scroll', trackScroll);
// обработчик на нажатии
goTopBtn.addEventListener('click', goTop);

function trackScroll() {
  // вычисляем положение от верхушки страницы
  const scrolled = window.pageYOffset;
  // считаем высоту окна браузера
  const coords = document.documentElement.clientHeight;
  // если вышли за пределы первого окна
  if (scrolled > coords) {
    // кнопка появляется
    goTopBtn.classList.add('go-top-visible');
  } else {
    // иначе исчезает
    goTopBtn.classList.remove('go-top-visible');
  }
}

function goTop() {
  // пока не вернулись в начало страницы
  if (window.pageYOffset > 0) {
    // скроллим наверх
    window.scrollBy(0, -20); // второй аргумент - скорость
    setTimeout(goTop, 0); // входим в рекурсию
  }
}
