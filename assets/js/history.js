import { checkScrollbar } from './modal.js';
const historyButton = document.querySelector('[data-history]');
const nextButton = document.querySelector('[data-js="next-scene"]');
const history = document.querySelector('[data-js="history"]');

const max = 7;
const animationTime = 1000;
let sceneNumber = 1;
let pause = false;

const addCurrentClassToScene = className => {
  const sceneContainer = document.querySelector('.history-scens');
  for (let i = 0; i < max; i += 1) {
    sceneContainer.classList.remove(`scene--${i + 1}`);
  }
  sceneContainer.classList.add(className);
};

const goNextScene = e => {
  if (pause) return;
  pause = true;
  sceneNumber < max && sceneNumber++;
  addCurrentClassToScene(`scene--${sceneNumber}`);
  setTimeout(() => {
    pause = false;
  }, animationTime);
};

const goPrevScene = () => {
  if (pause || sceneNumber === 1) return;
  pause = true;
  sceneNumber > 1 && sceneNumber--;
  addCurrentClassToScene(`scene--${sceneNumber}`);
  setTimeout(() => {
    pause = false;
  }, animationTime);
};

const hideHistory = () => {
  checkScrollbar();
  document.body.classList.remove('body--history');
  history.classList.remove('active');
  setTimeout(() => {
    sceneNumber = 1;
    addCurrentClassToScene(`scene--1`);
  }, 1000);
};

const showHistory = () => {
  checkScrollbar();
  if (!sessionStorage.getItem('history')) {
    sessionStorage.setItem('history', 'done');
  }
  document.body.classList.add('body--history');
  history.classList.add('active');
};

const openHistory = e => {
  e.preventDefault();
  showHistory();
};

// Обработчик для колесика мыши
function handleWheel(event) {
  if (document.body.classList.contains('body--history')) {
    if (event.deltaY > 0) {
      goNextScene(event);
    } else if (event.deltaY < 0) {
      goPrevScene();
    }
  }
}

// Обработчик для свайпов
let touchStartY = null;
function handleTouchStart(event) {
  if (document.body.classList.contains('body--history')) {
    touchStartY = event.touches[0].clientY;
  }
}

function handleTouchEnd(event) {
  if (document.body.classList.contains('body--history')) {
    if (touchStartY === null) return;
    const touchEndY = event.changedTouches[0].clientY;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffY) > 30) {
      if (diffY < 0) {
        goNextScene(event);
      } else {
        goPrevScene();
      }
    }
    touchStartY = null;
  }
}

const handleNextButtonClick = () => {
  sceneNumber === max && hideHistory();
  goNextScene();
};

historyButton.addEventListener('click', openHistory);
nextButton.addEventListener('click', handleNextButtonClick);
window.addEventListener('wheel', handleWheel);
window.addEventListener('touchstart', handleTouchStart);
window.addEventListener('touchend', handleTouchEnd);
window.hideHistory = hideHistory;

if (!sessionStorage.getItem('history')) {
  showHistory();
}
