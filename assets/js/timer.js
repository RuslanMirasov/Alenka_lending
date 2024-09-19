function startCountdown(targetDateString) {
  const targetDate = new Date(targetDateString); // Преобразуем строку в дату

  const countdownElements = {
    days: document.querySelector('[data-js="timer-days"]'),
    hours: document.querySelector('[data-js="timer-hours"]'),
    minutes: document.querySelector('[data-js="timer-minutes"]'),
  };

  function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      countdownElements.days.textContent = '0';
      countdownElements.hours.textContent = '0';
      countdownElements.minutes.textContent = '0';
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    countdownElements.days.textContent = days;
    countdownElements.hours.textContent = hours;
    countdownElements.minutes.textContent = minutes;
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 60000);
}

const targetDate = '3 October 2024';
startCountdown(targetDate);
