'use strict';

(function () {
  var baseCard = document.querySelector('#card').content.querySelector('.popup');
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');


  var createCard = function (card) {
    for (var i = 0; i < 8; i++) {
      var cardElement = baseCard.cloneNode(true);
      // var card = window.data.cards[1];

      cardElement.querySelector('.popup__avatar').src = card[i].author.avatar;
      cardElement.querySelector('.popup__title').textContent = card[i].offer.title;
      cardElement.querySelector('.popup__text--address').textContent = card[i].offer.address;
      cardElement.querySelector('.popup__text--price').textContent = card[i].offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = card[i].offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = (card[i].offer.rooms + ' комнаты для ' + card[i].offer.guests + ' гостей');
      cardElement.querySelector('.popup__text--time').textContent = ('Заезд после ' + card[i].offer.checkin + ', выезд до ' + card[i].offer.checkout);
      cardElement.querySelector('.popup__features').push = card[i].offer.features;
      cardElement.querySelector('.popup__description').textContent = card[i].offer.description;
      cardElement.querySelector('.popup__photos').src = card[i].offer.photos;

      map.insertBefore(cardElement, filterContainer);
      window.card.popupCard = cardElement;
      return cardElement;
    }
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



