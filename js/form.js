'use strict';

(function () {
  var inputAdres = document.getElementById('address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinX = parseFloat(mapPinMain.style.left) + window.util.MAP_PIN_WIDTH / 2;
  var mapPinY = parseFloat(mapPinMain.style.top) + window.util.MAP_PIN_HEIGHT;
  var notice = document.querySelector('.notice');
  var form = document.querySelector('.ad-form');
  var noticeFieldset = notice.querySelectorAll('fieldset');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var selectCapacity = capacity.getElementsByTagName('option');

  inputAdres.setAttribute('placeholder', mapPinX + ',' + mapPinY);

  for (var i = 0; i < noticeFieldset.length; i++) {
    noticeFieldset[i].setAttribute('disabled', 'disabled');
  }

  var setCapacity = function () {
    selectCapacity[1].classList.add('hidden');
    selectCapacity[2].classList.add('hidden');
    selectCapacity[3].classList.add('hidden');
  };
  setCapacity();

  roomNumber.addEventListener('change', function () {
    if (roomNumber.value === '1') {
      setCapacity();
      selectCapacity[0].classList.remove('hidden');
    } else if (roomNumber.value === '2') {
      setCapacity();
      selectCapacity[0].classList.remove('hidden');
      selectCapacity[1].classList.remove('hidden');
    } else if (roomNumber.value === '3') {
      setCapacity();
      selectCapacity[0].classList.remove('hidden');
      selectCapacity[1].classList.remove('hidden');
      selectCapacity[2].classList.remove('hidden');
    } else if (roomNumber.value === '100') {
      setCapacity();
      selectCapacity[0].classList.add('hidden');
      selectCapacity[3].classList.remove('hidden');
    } else {
      setCapacity();
    }
  });

  var activateForm = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      form.classList.remove('ad-form--disabled');
    }
    if (evt.button === window.util.MOUSE_LEFT) {
      form.classList.remove('ad-form--disabled');
    }

    for (var a = 0; a < noticeFieldset.length; a++) {
      noticeFieldset[a].removeAttribute('disabled');
    }
  };

  mapPinMain.addEventListener('keydown', activateForm);
  mapPinMain.addEventListener('mousedown', activateForm);

})();
