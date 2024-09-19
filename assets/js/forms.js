const inputs = document.querySelectorAll('.input');
const agreeCheckboxes = document.querySelectorAll('[data-agree]');
const labelsForFile = document.querySelectorAll('.label-for-file');
const inputsFile = document.querySelectorAll('.input-file');
const validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];

const handleInvalidClassRemove = e => {
  const input = e.target;
  const label = input.closest('label');
  if (label) {
    label.classList.remove('invalid');
  }
  input.classList.remove('invalid');
};

inputs.forEach(input => {
  input.addEventListener('focus', handleInvalidClassRemove);
  if (input.type === 'file') {
    input.addEventListener('input', handleInvalidClassRemove);
  }
});

agreeCheckboxes.forEach(input => {
  input.addEventListener('change', e => {
    const agree = e.target;
    const submitButton = agree.closest('form').querySelector('.button--submit');
    if (agree.checked) {
      submitButton.removeAttribute('disabled');
      return;
    }
    submitButton.setAttribute('disabled', true);
  });
});

// INPUT TYPE FILE

// Обработчики для dragover и drop событий
labelsForFile.forEach(fileLabel => {
  fileLabel.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  fileLabel.addEventListener('drop', function (event) {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0], fileLabel);
  });
});

// Обработчик изменения файлового input
inputsFile.forEach(input => {
  input.addEventListener('change', function (event) {
    const label = event.target.closest('.label-for-file');
    handleFile(event.target.files[0], label);
  });
});

// Функция обработки файла
const handleFile = (file, label) => {
  const downloadFile = label.closest('.download-file');
  if (file) {
    if (validFormats.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        label.classList.add('loaded');
        label.style.setProperty('--uploaded-image', `url(${e.target.result})`);
        label.style.background = `#ffffff url(${e.target.result}) no-repeat center center/cover`;

        // Добавляем кнопку сброса после загрузки изображения
        const existingResetButton = downloadFile.querySelector('.file-reset');
        if (!existingResetButton) {
          const resetButton = document.createElement('button');
          resetButton.type = 'button';
          resetButton.classList.add('file-reset');
          downloadFile.appendChild(resetButton);

          // Обработчик для кнопки сброса
          resetButton.addEventListener('click', function () {
            resetFile(label);
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      label.querySelector('.label__text').innerHTML = `<span class="error">Не верный формат файла!</span>`;
    }
  } else {
    // Если файл не выбран или удален, вызываем сброс состояния
    resetFile(label);
  }
};

// Функция сброса состояния поля файла
const resetFile = label => {
  const inputFile = label.querySelector('.input-file');
  const downloadFile = label.closest('.download-file');
  const labelDefaultText = label.querySelector('.label__text').dataset.text;

  label.classList.remove('loaded');
  label.style.background = '';
  label.querySelector('.label__text').innerHTML = labelDefaultText;

  // Сбрасываем значение input и удаляем кнопку
  inputFile.value = '';
  const resetButton = downloadFile.querySelector('.file-reset');
  if (resetButton) {
    resetButton.remove();
  }
};

// PHONE MASK

const handleTelFocus = e => {
  const tel = e.target;
  if (!tel.value) {
    tel.value = '+7 ___ ___-__-__';
  }
};

const handleTelBlur = e => {
  const tel = e.target;
  if (tel.value === '+7 ___ ___-__-__') {
    tel.value = '';
  }
};

const handleTelInput = e => {
  e.preventDefault();
  const input = e.target;
  const tel = input.closest('form').querySelector("[type='tel']");
  const phonePattern = /^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/;
  if (!phonePattern.test(tel.value)) {
    tel.value = '';
  }
};

const handleTelClick = e => {
  const tel = e.target;
  const underscoreIndex = tel.value.indexOf('_');
  tel.setSelectionRange(underscoreIndex, underscoreIndex);
};

const handleTelKeydown = e => {
  e.preventDefault();

  const tel = e.target;
  const value = tel.value;
  const inputType = e.inputType;
  let cursorPosition = tel.selectionStart;
  if (cursorPosition <= 2) return;

  if (inputType === 'deleteContentBackward') {
    while (cursorPosition > 2 && !/\d/.test(value[cursorPosition - 1])) {
      cursorPosition--;
    }

    if (cursorPosition > 2 && /\d/.test(value[cursorPosition - 1])) {
      const newValue = value.slice(0, cursorPosition - 1) + '_' + value.slice(cursorPosition);
      tel.value = newValue;
      tel.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    }
    return;
  }

  if (/\d/.test(e.data)) {
    const underscoreIndex = value.indexOf('_');
    if (underscoreIndex !== -1 && underscoreIndex > 2) {
      const newValue = value.slice(0, underscoreIndex) + e.data + value.slice(underscoreIndex + 1);
      tel.value = newValue;
      tel.setSelectionRange(underscoreIndex + 1, underscoreIndex + 1);
    }
  }
};

inputs.forEach(input => {
  if (input.type === 'tel') {
    input.addEventListener('focus', handleTelFocus);
    input.addEventListener('blur', handleTelBlur);
    input.addEventListener('beforeinput', handleTelKeydown);
    input.addEventListener('input', handleTelInput);
    input.addEventListener('click', handleTelClick);
  }
});
