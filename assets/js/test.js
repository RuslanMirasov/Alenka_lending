import { validateForm } from './form-validation.js';

const testForm = document.querySelector('#test-form');
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

const goToSubstep = number => {
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

const handleTestFormSubmit = e => {
  const form = e.target;
  const formData = new FormData(form);

  // Выводим данные формы в консоль
  const formObject = Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, value]));
  console.log(formObject);

  alert('👍 Успешно отправляем форму теста. Данные выводим в консоль.');
  goToSubstep(2);
  //Очищаем форму
  e.target.reset();
};

testForm.addEventListener('submit', e => validateForm(e, handleTestFormSubmit));
