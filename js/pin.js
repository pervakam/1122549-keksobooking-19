'use strict';

var pin = function () {
  var mapPin = document.querySelector('#pin').content.querySelector('button');
  var pinWidth = 50;
  var pinHeight = 70;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  // var mapPinMain = document.querySelector('.map__pin--main');

  var generatePin = function () {

    var createPin = function (ad) {
      var pinElement = mapPin.cloneNode(true);
      var pinPosition = 'left: ' + (ad.location.x - (pinWidth / 2)) + 'px; top: ' + (ad.location.y - pinHeight) + 'px;';
      map.appendChild(pinElement);
      pinElement.style = pinPosition;
      pinElement.querySelector('img').src = ad.author.avatar;
      pinElement.querySelector('img').alt = ad.offer.title;
      return pinElement;
    };

    var item = document.createDocumentFragment();

    for (var k = 0; k < announcementLength; k++) {
      item.appendChild(createPin(announcements[k]));
    }

    mapPins.appendChild(item);
    generatePin();

    // window.pin = {
    //   pin: pin()
    // }
  };
};
