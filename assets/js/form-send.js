import { formValidation } from './form-validation.js';
import { goToSubstep } from './test.js';
import { popup } from './modal.js';

const testForm = document.querySelector('#test-form');
const loginForm = document.querySelector('#login-form');
const registrationForm = document.querySelector('#registration-form');
const сhequeDataForm = document.querySelector('#сheque-data-form');
const downloadChequeForm = document.querySelector('#download-сheque-form');
const forgotPasswordForm = document.querySelector('#forgot-password-form');
const callbackForm = document.querySelector('#callback-form');

const consoleAndResetData = form => {
  const formData = new FormData(form);
  console.log(Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, value])));
  form.reset();
};

// ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ "ТЕСТА" (#test-form)
const handleTestFormSubmit = e => {
  e.preventDefault();
  if (!formValidation(e.target)) return;
  consoleAndResetData(e.target); // Заменить эту функцию на логику отправкитеста
  goToSubstep(2);
};

// ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ "ЛОГИН" (#login-form)
const handleLoginFormSubmit = e => {
  e.preventDefault();
  if (!formValidation(e.target)) return;
  consoleAndResetData(e.target);
};

// ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ "Регистрации" (#registration-form)
const handleRegisterFormSubmit = e => {
  e.preventDefault();
  if (!formValidation(e.target)) return;
  consoleAndResetData(e.target);
};

// ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ "ВВЕДИТЕ ДАННЫЕ ЧЕКА ВРУЧНУЮ" (#сheque-data-form)
const handleChequeDataFormSubmit = e => {
  e.preventDefault();
  if (!formValidation(e.target)) return;
  consoleAndResetData(e.target);
};

// ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ "ЗАГРУЗИТЬ ЧЕК" (#download-сheque-form)
const handleDownloadChequeFormSubmit = e => {
  e.preventDefault();
  if (!formValidation(e.target)) return;
  consoleAndResetData(e.target);
  popup('confirm-сheque-download');
};

// ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ "ЗАБЫЛИ ПАРОЛЬ?" (#forgot-password-form)
const handleForgotPasswordFormSubmit = e => {
  e.preventDefault();
  if (!formValidation(e.target)) return;
  consoleAndResetData(e.target);
  popup('confirm-password');
};

// ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ "ОБРАТНАЯ СВЯЗЬ" (#callback-form)
const handleCallbackFormSubmit = e => {
  e.preventDefault();
  if (!formValidation(e.target)) return;
  consoleAndResetData(e.target);
  popup('confirm');
};

testForm.addEventListener('submit', handleTestFormSubmit);
loginForm.addEventListener('submit', handleLoginFormSubmit);
registrationForm.addEventListener('submit', handleRegisterFormSubmit);
сhequeDataForm.addEventListener('submit', handleChequeDataFormSubmit);
downloadChequeForm.addEventListener('submit', handleDownloadChequeFormSubmit);
forgotPasswordForm.addEventListener('submit', handleForgotPasswordFormSubmit);
callbackForm.addEventListener('submit', handleCallbackFormSubmit);
