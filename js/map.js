'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var notice = document.querySelector('.notice');
  var noticeFieldset = notice.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var filterFields = filterForm.querySelectorAll('select, fieldset');
  var serverData = null;

  var successHandler = function (data) {
    serverData = data;

    // var filteredData = window.filter.filterData(data);
    window.filter.filterData(data);
    window.filter.activateFilter(filterFields);
    // window.pins.generatePins(data);

  };

  var activateMap = function () {
    window.load.loadCardContent(successHandler, window.messages.onError);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.form.noticeActivate(noticeFieldset);

    mapPinMain.removeEventListener('keydown', activateMapHandler);
    mapPinMain.removeEventListener('mousedown', activateMapHandler);
  }

  var activateMapHandler = function (evt) {
    if (evt.key === window.util.ENTER_KEY || evt.button === window.util.MOUSE_LEFT) {
      activateMap();

    }
  };


  mapPinMain.addEventListener('keydown', activateMapHandler);
  mapPinMain.addEventListener('mousedown', activateMapHandler);

})();

