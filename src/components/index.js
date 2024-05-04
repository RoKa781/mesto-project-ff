import "../pages/index.css";
import { createCard, deleteCard, likeCard, cardList } from "./card";
import { closeModal, openModal } from "./modal";

const addButton = document.querySelector(".profile__add-button");
const profileButton = document.querySelector(".profile__edit-button");
const editForm = document.forms["edit-profile"];
const editConteiner = document.querySelector(".popup_type_new-card");
const profileConteiner = document.querySelector(".popup_type_edit");
const cardForm = document.forms["new-place"];
const imageConteiner = document.querySelector(".popup_type_image");
const nameInput = editForm.name;
const jobInput = editForm.description;

addButton.addEventListener("click", function () {
  openModal(editConteiner);
});

profileButton.addEventListener("click", function () {
  openModal(profileConteiner);
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
});

export function openCard(card) {
  const popupImg = document.querySelector(".popup__image");
  const popupImgCaption = document.querySelector(".popup__caption");
  openModal(imageConteiner);
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupImgCaption.textContent = card.name;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal(evt);
}

editForm.addEventListener("submit", handleFormSubmit);

cardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const cardFormName = cardForm["place-name"];
  const cardFormLink = cardForm.link;
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
  closeModal(evt);
});
