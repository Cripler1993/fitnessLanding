let tariffs = document.querySelectorAll("#tariffs");

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
