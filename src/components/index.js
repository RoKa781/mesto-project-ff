import "../pages/index.css";
import { createCard, deleteCard, likeCard} from "./card";
import { closeModal, openModal } from "./modal";
import { initialCards } from "./cards";

const addButton = document.querySelector(".profile__add-button");
const profileButton = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.name;
const jobInput = profileForm.description;
const cardForm = document.forms["new-place"];
const cardFormLink = cardForm.link;
const cardFormName = cardForm["place-name"];
const buttonOpenPopupCard = document.querySelector(".popup_type_new-card");
const buttonOpenPopupProfile = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupImgCaption = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardList = document.querySelector(".places__list");

addButton.addEventListener("click", function () {
  openModal(buttonOpenPopupCard);
});

profileButton.addEventListener("click", function () {
  openModal(buttonOpenPopupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

export function openCard(card) {
  openModal(imagePopup);
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupImgCaption.textContent = card.name;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(buttonOpenPopupProfile);
}

profileForm.addEventListener("submit", handleEditFormSubmit);

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
  closeModal(buttonOpenPopupCard);
});

initialCards.forEach(function (card) {
  cardList.append(
    createCard(card.name, card.link, deleteCard, likeCard, openCard)
  );
});