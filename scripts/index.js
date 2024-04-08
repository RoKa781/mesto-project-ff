// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup_type_new-card .popup__close');
const popupForm = document.querySelector('.popup.popup_type_new-card');
// @todo: Функция создания карточки
function addCards(name, link) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardItem.querySelector('.card__title').textContent = name;
    cardItem.querySelector('.card__image').src = link;
    cardList.append(cardItem);
    // @todo: Функция удаления карточки
    cardItem.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        evt.target.closest('.places__item').remove();
    });
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
    addCards(card.name, card.link)
});

addButton.addEventListener('click', function () {
    popupForm.classList.add('popup_is-opened');
});

closeButton.addEventListener('click', function () {
    popupForm.classList.remove('popup_is-opened');
});
