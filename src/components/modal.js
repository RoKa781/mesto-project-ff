const popups = document.querySelectorAll(".popup");

export function closeModal(event) {
  if (
    event.key === "Escape" ||
    event.target === event.currentTarget ||
    event.target.classList.contains("popup__close")
  ) {
    popups.forEach(function (evt) {
      evt.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", closeModal);
    });
  }
}

export function openModal(event) {
  event.classList.add("popup_is-animated");
  event.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModal);
}

function popupHandler(event) {
  event.addEventListener("click", function (event) {
    closeModal(event);
  });
}

popups.forEach(popupHandler);
