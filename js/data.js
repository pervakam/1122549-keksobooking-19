'use strict';

(function () {
  var cardTitle = ['Заголовок объявления 1', 'Заголовок объявления 2', 'Заголовок объявления 3', 'Заголовок объявления 4', 'Заголовок объявления 5', 'Заголовок объявления 6', 'Заголовок объявления 7', 'Заголовок объявления 8'];
  var cardPriceMin = 0;
  var cardPriceMax = 1000000;
  var cardType = ['palace', 'flat', 'house', 'bungalo'];
  var cardRooms = [1, 2, 3, 100];
  var cardGuests = [1, 2, 3, 0];
  var cardCheckin = ['12:00', '13:00', '14:00'];
  var cardCheckout = ['12:00', '13:00', '14:00'];
  var cardFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var cardDescription = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'];
  var cardPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var cardLocationXMin = 0;
  var cardLocationXMax = 1200;
  var cardLocationYMin = 130;
  var cardLocationYMax = 630;
  var cards = [];
  var cardLength = 10;

  var getRandomInteger = window.util.getRandomInteger;
  var getRandomElement = window.util.getRandomElement;
  var getRandomArray = window.util.getRandomArray;

  var fillCard = function () {

    for (var j = 0; j < cardLength; j++) {
      var randomPositionX = getRandomInteger(cardLocationXMin, cardLocationXMax);
      var randomPositionY = getRandomInteger(cardLocationYMin, cardLocationYMax);

      cards.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (j + 1) + '.png'
          },
          offer: {
            title: getRandomElement(cardTitle),
            address: randomPositionX + ',' + randomPositionY,
            price: getRandomInteger(cardPriceMin, cardPriceMax),
            type: getRandomElement(cardType),
            rooms: getRandomElement(cardRooms),
            guests: getRandomElement(cardGuests),
            checkin: getRandomElement(cardCheckin),
            checkout: getRandomElement(cardCheckout),
            features: getRandomArray(cardFeatures),
            description: getRandomElement(cardDescription),
            photos: getRandomElement(cardPhotos)
          },
          location: {
            x: randomPositionX,
            y: randomPositionY
          }
        });
    }
    window.data = {
      cards: cards
    };

    console.log(cards);
  };

  fillCard()


})();
