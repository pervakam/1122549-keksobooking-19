'use strict';

(function () {
  var inputAdres = document.getElementById('address');
  var MAPPINWIDTH = 62;
  var MAPPINHEIGHT = 84;
  var mapPinMain = document.querySelector('.map__pin--main');
  var MAPPINX = parseFloat(mapPinMain.style.left) + MAPPINWIDTH / 2;
  var MAPPINY = parseFloat(mapPinMain.style.top) + MAPPINHEIGHT;
  var notice = document.querySelector('.notice');
  var form = document.querySelector('.ad-form');
  var noticeFieldset = notice.querySelectorAll('fieldset');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var selectCapacity = capacity.getElementsByTagName('option');


  inputAdres.setAttribute('placeholder', MAPPINX + ',' + MAPPINY);

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
    var MOUSE_LEFT = 0;
    var ENTER_KEY = 'Enter';

    if (evt.key === ENTER_KEY) {
      form.classList.remove('ad-form--disabled');
    }
    if (evt.button === MOUSE_LEFT) {
      form.classList.remove('ad-form--disabled');
    }

    for (var a = 0; a < noticeFieldset.length; a++) {
      noticeFieldset[a].removeAttribute('disabled');
    }
  };

  mapPinMain.addEventListener('keydown', activateForm);
  mapPinMain.addEventListener('mousedown', activateForm);

})();
