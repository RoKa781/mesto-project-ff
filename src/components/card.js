import { setLike, deleteLike } from "./api";

export function createCard(
  name,
  link,
  likes,
  ownerId,
  cardId,
  userId,
  deleteCallback,
  openCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardTitle = cardItem.querySelector(".card__title");
  const cardImage = cardItem.querySelector(".card__image");
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const cardLikesCount = cardItem.querySelector(".card__like-counter");
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikesCount.textContent = likes.length;

  if (ownerId !== userId) {
    cardDeleteButton.disabled = true;
    cardDeleteButton.style.display = "none";
  }

  if (likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardDeleteButton.addEventListener("click", function (evt) {
    deleteCallback(cardItem, cardId);
  });
  cardLikeButton.addEventListener("click", function (evt) {
    handleLikeButton(cardLikeButton, cardId, cardLikesCount);
  });
  cardImage.addEventListener("click", function () {
    openCallback({ name, link });
  });
  return cardItem;
}

function handleLikeButton(cardLikeButton, cardId, cardLikesCount) {
  const likeAction = cardLikeButton.classList.contains("card__like-button_is-active") ? deleteLike : setLike;
  likeAction(cardId)
    .then((res) => {
      cardLikesCount.textContent = res.likes.length; 
      cardLikeButton.classList.toggle("card__like-button_is-active"); 
    })
    .catch((err) => {
      console.log(err);
    });
}
