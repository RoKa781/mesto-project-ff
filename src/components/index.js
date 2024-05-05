import "../pages/index.css";
import { createCard, deleteCard, likeCard, cardList } from "./card";
import { closeModal, openModal } from "./modal";
import { initialCards } from "./cards";

const addButton = document.querySelector(".profile__add-button");
const profileButton = document.querySelector(".profile__edit-button");
const editForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const nameInput = editForm.name;
const jobInput = editForm.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupImg = document.querySelector(".popup__image");
const popupImgCaption = document.querySelector(".popup__caption");
const cardFormName = cardForm["place-name"];
const cardFormLink = cardForm.link;

addButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

profileButton.addEventListener("click", function () {
  openModal(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

export function openCard(card) {
  openModal(imagePopup);
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupImgCaption.textContent = card.name;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

editForm.addEventListener("submit", handleFormSubmit);

cardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  cardList.prepend(
    createCard(
      cardFormName.value,
      cardFormLink.value,
      deleteCard,
      likeCard,
      openCard
    )
  );
  cardForm.reset();
  closeModal(newCardPopup);
});

initialCards.forEach(function (card) {
  cardList.append(
    createCard(card.name, card.link, deleteCard, likeCard, openCard)
  );
});