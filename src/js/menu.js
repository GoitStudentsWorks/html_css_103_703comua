// (() => {
//   const mobileMenu = document.querySelector('.js-menu-container');
//   const openMenuBtn = document.querySelector('.js-open-menu');
//   const closeMenuBtn = document.querySelector('.js-close-menu');
//   const closeMenuLink = document.querySelectorAll('.mob-menu-link');

//   const toggleMenu = () => {
//     const isMenuOpen =
//       openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
//     openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
//     mobileMenu.classList.toggle('is-open');

//     const scrollLockMethod = !isMenuOpen
//       ? 'disableBodyScroll'
//       : 'enableBodyScroll';
//     bodyScrollLock[scrollLockMethod](document.body);
//   };
//   closeMenuLink.forEach(item => item.addEventListener('click', toggleMenu));
//   openMenuBtn.addEventListener('click', toggleMenu);
//   closeMenuBtn.addEventListener('click', toggleMenu);

//   // Close the mobile menu on wider screens if the device orientation changes check
//   window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
//     if (!e.matches) return;
//     mobileMenu.classList.remove('is-open');
//     openMenuBtn.setAttribute('aria-expanded', false);
//     bodyScrollLock.enableBodyScroll(document.body);
//   });
// })();

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

    const scrollLockMethod = isMenuOpen ? 'disableBodyScroll' : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  // Изначально скрываем иконку закрытия меню
  closeMenuIcon.classList.add('is-hidden');

  openMenuBtn.addEventListener('click', toggleMenu);

  const closeMenuLink = document.querySelectorAll('.mob-menu-link');
  closeMenuLink.forEach(item => item.addEventListener('click', toggleMenu));

  const closeMenuBtn = document.querySelector('.js-close-menu');
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on wider screens if the device orientation changes check
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuIcon.classList.remove('is-hidden');
    closeMenuIcon.classList.add('is-hidden');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();
