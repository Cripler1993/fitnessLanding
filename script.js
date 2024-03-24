let tariffs = document.querySelectorAll("#tariffs");

function addActiveTariff() {
  clearAll();
  tariffs.forEach((elem) => {
    elem.addEventListener("click", function () {
      elem.classList.remove("first__row-item");
      elem.classList.add("active__tariff");
    });
  });
}

function clearAll() {
  tariffs.forEach((elem) => {
    elem.classList.remove("active__tariff");
    elem.classList.add("first__row-item");
  });
}

addActiveTariff();
