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
  // refs.scrollLinks.forEach(link => {
  //   link.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     const target = `.${this.dataset.scrollto}`;
  //     const rect = document.querySelector(target).getBoundingClientRect();
  //     const distance = rect.top + window.scrollY - refs.header.getBoundingClientRect().height;
  //     window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
  //   });
  // });

  // SCROLL TO BLOCK
  refs.scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href'); // Получаем значение href, например #prize
      const targetElement = document.querySelector(targetId); // Ищем элемент с этим id

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const distance = rect.top + window.scrollY - refs.header.getBoundingClientRect().height;

        // Плавная прокрутка
        window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });

        // Используем setTimeout, чтобы добавить хэш после завершения прокрутки
        setTimeout(() => {
          // Добавляем хэш в адресную строку, не вызывая мгновенную прокрутку
          history.pushState(null, null, targetId);
        }, 500); // Задержка в зависимости от продолжительности прокрутки
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
