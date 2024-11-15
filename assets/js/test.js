import { formValidation } from './form-validation.js';

const steps = document.querySelectorAll('[data-step]');
const substeps = document.querySelectorAll('[data-substep]');
const stepButtons = document.querySelectorAll('[data-tostep]');
const inputButtons = document.querySelectorAll('[data-input]');

const closeAllSteps = () => {
  closeAllSubsteps();
  steps.forEach(step => {
    step.classList.remove('visible');
    setTimeout(() => {
      step.classList.remove('active');
    }, 300);
  });
};

const closeAllSubsteps = () => {
  substeps.forEach(substep => {
    substep.classList.remove('visible');
    setTimeout(() => {
      substep.classList.remove('active');
    }, 300);
  });
};

const goToStep = number => {
  closeAllSteps();
  goToSubstep(1);
  const stepCounter = document.querySelector('[data-js="step-counter"]');
  stepCounter.innerHTML = number;
  setTimeout(() => {
    steps[number - 1].classList.add('active');
    setTimeout(() => {
      steps[number - 1].classList.add('visible');
    }, 20);
  }, 300);
};

export const goToSubstep = number => {
  const stepCounterWrapper = document.querySelector('.step-counter');
  number !== 2 ? stepCounterWrapper.classList.remove('hidden') : stepCounterWrapper.classList.add('hidden');
  closeAllSubsteps();
  setTimeout(() => {
    substeps[number - 1].classList.add('active');
    setTimeout(() => {
      substeps[number - 1].classList.add('visible');
      if (window.innerWidth < 1024) {
        const distance = stepCounterWrapper.getBoundingClientRect().top + window.scrollY - 95;
        window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
      }
    }, 20);
  }, 300);
};

const handleStepButtonClick = e => {
  const number = Number(e.target.dataset.tostep);
  goToStep(number);
};

stepButtons.forEach(button => {
  button.addEventListener('click', handleStepButtonClick);
});

const handleChangeInputValues = e => {
  const inputClass = e.target.dataset.input;
  const inputValue = e.target.innerText;
  document.querySelector(`.${inputClass}`).value = inputValue;
};

inputButtons.forEach(button => {
  button.addEventListener('click', handleChangeInputValues);
});

window.closeAllSteps = closeAllSteps;
window.goToStep = goToStep;
window.goToSubstep = goToSubstep;

//ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ "ТЕСТА" (#test-form)
const testForm = document.getElementById('test-form');

const handleTestFormSubmit = e => {
  e.preventDefault();
  const fileLabel = e.target.querySelector('.label-for-file');
  const resetButton = e.target.querySelector('.file-reset');

  //Проходим валидацию
  if (!formValidation(e.target)) return;

  // Если прошли валидацию, выполняем функцию registerEvent
  registerEvent('passedTest');

  // Очищаем форму
  e.target.reset();
  fileLabel.style.removeProperty('--uploaded-image');
  fileLabel.style.background = 'none';
  fileLabel.classList.remove('loaded');
  resetButton?.remove();

  // Переходим к шагу с результатами
  goToSubstep(2);
};

if (testForm) {
  testForm.addEventListener('submit', handleTestFormSubmit);
}
