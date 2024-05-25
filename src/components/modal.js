export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEsc);
}

function closeOnEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function closePopupHandler(popup) {
  return function (event) {
    if (event.target === popup || event.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  };
}

export function setEventListeners () {
  const popups = document.querySelectorAll(".popup"); 
  popups.forEach(function(popup) {
    popup.addEventListener("click", closePopupHandler(popup));
  });
} 
