import { menuToggle } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
  const refs = {
    preloader: document.querySelector('.preloader'),
    scrollLinks: document.querySelectorAll('[data-scrollto]'),
    runTexts: document.querySelectorAll('[data-runtext]'),
    accordeon: document.querySelectorAll('[data-accordeon]'),
    header: document.querySelector('.header'),
    lookSwiper: document.querySelector('.swiper--look'),
  };

  // SCROLL TO BLOCK
  refs.scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.innerWidth < 1024) {
        if (document.querySelector('[data-js="menu-backdrop"]').classList.contains('is-open')) {
          menuToggle();
        }
      }
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const distance = rect.top + window.scrollY - refs.header.getBoundingClientRect().height;

        window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
        setTimeout(() => {
          history.pushState(null, null, targetId);
        }, 500);
      }
    });
  });

  //SLIDERS
  if (refs.lookSwiper) {
    const swiper = new Swiper(refs.lookSwiper, {
      allowTouchMove: true,
      slidesPerView: 'auto',
      breakpoints: {
        768: {
          spaceBetween: 40,
          centeredSlides: false,
        },
        0: {
          spaceBetween: 26,
          centeredSlides: true,
        },
      },
    });
  }

  window.addEventListener('load', () => {
    if (refs.preloader) {
      refs.preloader.classList.add('hidden');
    }
  });
});
