import "../pages/index.css";
import { createCard, deleteCard, likeCard, openDeleteForm } from "./card";
import { closeModal, openModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import { config, getUserInfo, getCards, renderLoading} from "./api";

const addButton = document.querySelector(".profile__add-button");
const profileButton = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.name;
const jobInput = profileForm.description;
const cardForm = document.forms["new-place"];
const cardFormLink = cardForm.link;
const cardFormName = cardForm["place-name"];
const avatarForm = document.forms["edit-avatar"]
const avatarInput = avatarForm.avatar
const buttonOpenPopupCard = document.querySelector(".popup_type_new-card");
const buttonOpenPopupProfile = document.querySelector(".popup_type_edit");
const buttonOpenPopupAvatar = document.querySelector(".popup_type_avatar_edit")
const imagePopup = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupImgCaption = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardList = document.querySelector(".places__list");
const userName = document.querySelector(".profile__title");
const userAvatar = document.querySelector(".profile__image");
const userAbout = document.querySelector(".profile__description");
const avatarButton = document.querySelector('.profile__avatar-button');
export let userId;

addButton.addEventListener("click", function () {
  openModal(buttonOpenPopupCard);
  clearValidation(cardForm, validationConfig);
});

profileButton.addEventListener("click", function () {
  openModal(buttonOpenPopupProfile);
  clearValidation(profileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

avatarButton.addEventListener("click", function () {
  openModal(buttonOpenPopupAvatar);
  clearValidation(avatarForm, validationConfig);
  avatarInput.value = '';
});

export function openCard(card) {
  openModal(imagePopup);
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupImgCaption.textContent = card.name;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  editProfileInfo();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

profileForm.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true)
  postCard()
  cardForm.reset();
});

avatarForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  renderLoading(true)
  updateAvatar();
})

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

function editProfileInfo() {
  fetch(`${config.baseUrl}/users/me`, {
  method: "PATCH",
  headers: config.headers,
  body: JSON.stringify({
    name: nameInput.value,
    about: jobInput.value,
  }),
})
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка ${res.status}`);
    }
    return res.json();
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  })
  .finally(() => {
    renderLoading(false);
    closeModal(buttonOpenPopupProfile);
  });
}

function updateAvatar() {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      userAvatar.style = `background-image: url('${data.avatar}')`;
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(buttonOpenPopupAvatar);
    });
}

function postCard() {
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardFormName.value,
      link: cardFormLink.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
      }
      return res.json();
    })
    .then((newCard) => {
      cardList.prepend(
        createCard(
          newCard.name,
          newCard.link,
          newCard.likes,
          newCard.owner._id,
          newCard._id,
          openDeleteForm,
          likeCard,
          openCard
        )
      );
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(buttonOpenPopupCard);
    });
}

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardData]) => {
    userAbout.textContent = userData.about;
    userName.textContent = userData.name;
    userAvatar.style = `background-image: url('${userData.avatar}')`;
    userId = userData._id;

    cardData.forEach(function (card) {
      cardList.append(
        createCard(card.name, card.link, card.likes, card.owner._id, card._id, openDeleteForm, likeCard, openCard)
      );
    });
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  });