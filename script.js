let tariffs = document.querySelectorAll("#tariffs");
let minute = document.querySelector("#minutes");
let second = document.querySelector("#seconds");
let timeCircles = document.querySelectorAll(".time__circle");

tariffs.forEach((elem) => {
  elem.addEventListener("click", addActiveTariff);
});

function addActiveTariff(event) {
  clearAll();
  let clickedTariff = event.target.closest("#tariffs");
  clickedTariff.classList.add("active__tariff");
}

function clearAll() {
  tariffs.forEach((elem) => {
    elem.classList.remove("active__tariff");
    elem.classList.add("non__active-tariff");
  });
}

let time = 120;

let timerId = setInterval(updateCountdown, 1000);

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minute.innerHTML = `0${minutes}`;
  second.innerHTML = `${seconds}`;
  time--;
  if (time == -1) {
    clearTimeout(timerId);
  } else if (time == 29) {
    minute.classList.add("time__numbers-red");
    second.classList.add("time__numbers-red");
    timeCircles.forEach((elem) => {
      elem.classList.add("time__circle-red");
    });
  }
}

// остановка счетчика
