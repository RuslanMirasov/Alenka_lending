const forms = document.querySelectorAll('.form');

const regex = {
  phone: /^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/,
  email: /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/,
  password: /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>,.?\/\\\-=`~]+$/,
};

const errorMessages = {
  empty: 'Поле не заполнено',
  email: 'Не верный формат E-mail',
  phone: 'Не верный формат телефона',
  password: 'Не верный формат пароля',
};

const addError = (labelEl, inputEl, errorEl, errorText) => {
  labelEl.classList.add('invalid');
  inputEl.classList.add('invalid');
  if (inputEl.type !== 'file') {
    if (!errorEl) {
      const errorEl = document.createElement('span');
      errorEl.setAttribute('class', 'error');
      errorEl.innerHTML = errorText;
      labelEl.querySelector('.label__text').append(errorEl);
      return;
    }
    errorEl.innerHTML = errorText;
    return;
  }
  labelEl.classList.remove('loaded');
  labelEl.style.background = '';
  const resetButton = labelEl.closest('.download-file').querySelector('.file-reset');
  if (resetButton) {
    resetButton.remove();
  }
  inputEl.value = '';
};

const resetAllForms = () => {
  forms.forEach(form => {
    form.reset();
    const fileLabel = form.querySelector('.label-for-file');
    if (fileLabel) {
      fileLabel.classList.remove('loaded');
      fileLabel.style.background = '';
      const resetButton = fileLabel.closest('.download-file').querySelector('.file-reset');
      if (resetButton) {
        resetButton.remove();
      }
    }
  });
};

// INPUT VALIDATION
const inputValidation = input => {
  let isValid = true;
  const labelEl = input.closest('label');
  const errorEl = labelEl.querySelector('.error');
  const value = input.value.trim();

  if (!value) {
    isValid = false;
    addError(labelEl, input, errorEl, errorMessages.empty);
  } else if (input.type === 'email' && !regex.email.test(value)) {
    isValid = false;
    addError(labelEl, input, errorEl, errorMessages.email);
  } else if (input.type === 'password' && !regex.password.test(value)) {
    isValid = false;
    addError(labelEl, input, errorEl, errorMessages.password);
  } else if (input.type === 'tel' && !regex.phone.test(value)) {
    isValid = false;
    addError(labelEl, input, errorEl, errorMessages.phone);
  }

  return isValid;
};

// FORM VALIDATION
export const formValidation = form => {
  let errors = 0;
  const requiredInputs = form.querySelectorAll('[required]');
  requiredInputs.forEach(input => {
    const isInputValid = inputValidation(input);
    if (!isInputValid) {
      errors += 1;
    }
  });
  return errors === 0;
};

// ON ALL FORMS SUBMIT FUNCTION
export const validateForm = (e, sendForm) => {
  e.preventDefault();
  const isFormValid = formValidation(e.target);
  if (!isFormValid) {
    return;
  }
  if (typeof sendForm === 'function') {
    sendForm(e);
    resetAllForms();
  }
};
