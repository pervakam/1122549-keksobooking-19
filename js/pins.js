'use strict';

(function () {
  var mapPin = document.querySelector('#pin').content.querySelector('button');
  var pinWidth = 50;
  var pinHeight = 70;
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinAfter = getComputedStyle(mapPinMain, '::after').getPropertyValue('border-top-width');
  var pinAfterTop = parseInt(pinAfter, 10);
  var pinElements = [];

  var cardLength = 8;


  var generatePin = function (card) {
    var item = document.createDocumentFragment();

    for (var k = 0; k < 8; k++) {
      var selectedPin = card[k];
      var pinElement = mapPin.cloneNode(true);
      var pinPositionLeft = (selectedPin.location.x - (pinWidth / 2)) + 'px';
      var pinPositionTop = (selectedPin.location.y - pinHeight) + 'px';

      pinElement.style.left = pinPositionLeft;
      pinElement.style.top = pinPositionTop;
      pinElement.querySelector('img').src = selectedPin.author.avatar;
      pinElement.querySelector('img').alt = selectedPin.offer.title;
      pinElement.classList.add('map__pin-new');

      item.appendChild(pinElement);

      pinElement.addEventListener('click', window.card.createCard(selectedPin));
    }

    mapPins.appendChild(item);

  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (mapPinMain.offsetLeft > map.offsetWidth - mapPinMain.offsetWidth) {
        mapPinMain.style.left = (map.offsetWidth - mapPinMain.offsetWidth) + 'px';
      } else if (mapPinMain.offsetTop > map.offsetHeight - mapPinMain.offsetHeight - pinAfterTop) {
        mapPinMain.style.top = (map.offsetHeight - mapPinMain.offsetHeight - pinAfterTop) + 'px';
      } else if (mapPinMain.offsetTop < map.offsetTop) {
        mapPinMain.style.top = map.offsetTop + 'px';
      } else if (mapPinMain.offsetLeft < map.offsetTop) {
        mapPinMain.style.left = map.offsetTop + 'px';
      }
    };


    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  window.pins = {
    generatePin: generatePin,
  }
})();
