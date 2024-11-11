const timer = document.querySelector('[data-timer]');

function startCountdown(targetDateString) {
  const targetDate = new Date(targetDateString);
  let countdownInterval;

  const countdownElements = {
    days: document.querySelector('[data-js="timer-days"]'),
    hours: document.querySelector('[data-js="timer-hours"]'),
    minutes: document.querySelector('[data-js="timer-minutes"]'),
  };

  function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      if (timer) {
        timer.setAttribute('data-timer', 'off');
      }
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
  countdownInterval = setInterval(updateCountdown, 10000);
}

const targetDate = '11 November 2024 19:06';
startCountdown(targetDate);
