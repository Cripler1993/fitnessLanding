let tariffs = document.querySelectorAll("#tariffs");
let minute = document.querySelector("#minutes");
let second = document.querySelector("#seconds");
let timeCircles = document.querySelectorAll(".time__circle");
let modalWrapper = document.querySelector(".modal__wrapper");
let discountItems = document.querySelectorAll(".discount__item");
let modalClose = document.querySelector(".modal__close");

let time = 1;

let allTariffs = {};

const url = "https://t-pay.iqfit.app/subscribe/list-test";

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    allTariffs = data.reduce((acc, elem) => {
      if (elem.name in acc) {
        acc[elem.name].push(elem);
      } else {
        acc[elem.name] = [elem];
      }
      return acc;
    }, {});
    renderTariffs(allTariffs, true);
  });

function renderTariffs(obj, isDiscount) {
  tariffs.forEach((elem) => {
    let [tariffWithDiscount, tariffWithoutDiscount, modalTariff] =
      obj[elem.dataset.key];
    if (isDiscount) {
      elem.querySelector(
        ".with__discount"
      ).innerHTML = `${tariffWithDiscount.price}₽`;
      elem.querySelector(
        ".without__discount"
      ).innerHTML = `${tariffWithoutDiscount.price}₽`;
    } else {
      elem.querySelector(
        ".with__discount"
      ).innerHTML = `${tariffWithoutDiscount.price}₽`;
      elem.querySelector(".without__discount").classList.add("hide");
      elem.querySelector(".item__discount").classList.add("hide");
    }
    let modal = modalWrapper.querySelector(
      '[data-key="' + elem.dataset.key + '"]'
    );
    if (modal) {
      modal.querySelector(
        ".discount__item-price p"
      ).innerHTML = `${modalTariff.price}₽`;
      modal.querySelector(
        ".without__price"
      ).innerHTML = `${tariffWithoutDiscount.price}₽`;
    }
  });
}
// тарифы на главной странице

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

// таймер

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
    renderTariffs(allTariffs, false);
    setTimeout(modalOpen, 4000);
  } else if (time <= 29) {
    minute.classList.add("time__numbers-red");
    second.classList.add("time__numbers-red");
    timeCircles.forEach((elem) => {
      elem.classList.add("time__circle-red");
    });
  }
}
// модальное окно

function modalOpen() {
  modalWrapper.classList.add("active");
}

modalClose.addEventListener("click", function () {
  modalWrapper.classList.add("hidden");
});

discountItems.forEach((elem) => {
  elem.addEventListener("click", addModalActiveTariff);
});

function addModalActiveTariff(event) {
  clearAllModalTarrifs();
  let clickedTariff = event.target.closest(".discount__item");
  clickedTariff.classList.add("discount__item-active");
}

function clearAllModalTarrifs() {
  discountItems.forEach((elem) => {
    elem.classList.remove("discount__item-active");
  });
}
