'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var notice = document.querySelector('.notice');
  var noticeFieldset = notice.querySelectorAll('fieldset');

  var activateMap = function (evt) {
    if (evt.key === window.util.ENTER_KEY || evt.button === window.util.MOUSE_LEFT) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      for (var a = 0; a < noticeFieldset.length; a++) {
        noticeFieldset[a].removeAttribute('disabled');
      }

      window.load.loadCardContent(window.pins.generatePins, window.messages.onError);
    }

    mapPinMain.removeEventListener('keydown', activateMap);
    mapPinMain.removeEventListener('mousedown', activateMap);
  };

  mapPinMain.addEventListener('keydown', activateMap);
  mapPinMain.addEventListener('mousedown', activateMap);

})();

