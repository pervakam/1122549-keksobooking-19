'use strict';

(function () {
  var baseCard = document.querySelector('#card').content.querySelector('.popup');
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');


  var createCard = function (card) {
    var fragment = document.createDocumentFragment();
    var cardElement = baseCard.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = (card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей');
    cardElement.querySelector('.popup__text--time').textContent = ('Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout);
    cardElement.querySelector('.popup__features').push = card.offer.features;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').src = card.offer.photos;

    fragment.appendChild(cardElement);
    map.insertBefore(cardElement, filterContainer);
    window.card.popupCard = cardElement;


  };

  var resetCard = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      window.card.popupCard.remove();
    }
  };

  window.addEventListener('keydown', resetCard);


  window.card = {
    createCard: createCard,
  }
})();



