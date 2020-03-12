'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapPinNew = document.querySelectorAll('.map__pinnew');

  var activationPin = function () {
    map.classList.remove('map--faded');
    window.load.loadCardContent();
  };

  var activateMap = function (evt) {
    if (evt.key === window.util.ENTER_KEY || evt.button === window.util.MOUSE_LEFT) {
      activationPin();
      mapPinMain.removeEventListener('keydown', activateMap);
      mapPinMain.removeEventListener('mousedown', activateMap);
    }
  };

  mapPinMain.addEventListener('keydown', activateMap);
  mapPinMain.addEventListener('mousedown', activateMap);


})();

