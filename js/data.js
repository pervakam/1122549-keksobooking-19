'use strict';

(function () {
  var annoucementTitle = ['Заголовок объявления 1', 'Заголовок объявления 2', 'Заголовок объявления 3', 'Заголовок объявления 4', 'Заголовок объявления 5', 'Заголовок объявления 6', 'Заголовок объявления 7', 'Заголовок объявления 8'];
  var annoucementPriceMin = 0;
  var annoucementPriceMax = 1000000;
  var annoucementType = ['palace', 'flat', 'house', 'bungalo'];
  var annoucementRooms = [1, 2, 3, 100];
  var annoucementGuests = [1, 2, 3, 0];
  var annoucementCheckin = ['12:00', '13:00', '14:00'];
  var annoucementCheckout = ['12:00', '13:00', '14:00'];
  var annoucementFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var announcementDescription = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'];
  var announcementPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var announcementLocationXMin = 0;
  var announcementLocationXMax = 1200;
  var announcementLocationYMin = 130;
  var announcementLocationYMax = 630;
  var announcements = [];
  var announcementLength = 8;

  annoucementType[0] = 'Дворец';
  annoucementType[1] = 'Кваритра';
  annoucementType[2] = 'Дом';
  annoucementType[3] = 'Бунгало';

  var getRandomInteger = window.util.getRandomInteger;
  var getRandomElement = window.util.getRandomElement;
  var getRandomArray = window.util.getRandomArray;

  var createAnnoucementItem = function () {
    // var getRandomInteger = window.util.getRandomInteger;
    // var getRandomElement = window.util.getRandomElement;
    // var getRandomArray = window.util.getRandomArray;

    for (var j = 0; j < announcementLength; j++) {
      var randomPositionX = getRandomInteger(announcementLocationXMin, announcementLocationXMax);
      var randomPositionY = getRandomInteger(announcementLocationYMin, announcementLocationYMax);

      announcements.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (j + 1) + '.png'
          },
          offer: {
            title: getRandomElement(annoucementTitle),
            address: randomPositionX + ',' + randomPositionY,
            price: getRandomInteger(annoucementPriceMin, annoucementPriceMax),
            type: getRandomElement(annoucementType),
            rooms: getRandomElement(annoucementRooms),
            guests: getRandomElement(annoucementGuests),
            checkin: getRandomElement(annoucementCheckin),
            checkout: getRandomElement(annoucementCheckout),
            features: getRandomArray(annoucementFeatures),
            description: getRandomElement(announcementDescription),
            photos: getRandomElement(announcementPhotos)
          },
          location: {
            x: randomPositionX,
            y: randomPositionY
          }
        });

    }
    window.data = {
      announcements: announcements
    };

  };

  createAnnoucementItem(announcementLength);

})();
