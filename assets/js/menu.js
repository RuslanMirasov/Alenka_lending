const nenuBackdrop = document.querySelector('[data-js="menu-backdrop"]');
const burger = document.querySelector('[data-js="burger"]');

const handleMenuBackdropClick = e => {
  if (window.innerWidth < 1024) {
    if (e.target.classList.contains('menu-backdrop') || e.target.dataset.scrollto) {
      menuToggle();
    }
  }
};

export const menuToggle = () => {
  nenuBackdrop.classList.toggle('is-open');
  burger.classList.toggle('is-open');
  if (!document.body.classList.contains('freez')) {
    document.body.classList.add('freez');
    return;
  }
  document.body.classList.remove('freez');
};

burger.addEventListener('click', menuToggle);
nenuBackdrop.addEventListener('click', handleMenuBackdropClick);
