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
  var priceInput = form.querySelector('#price');
  var typeInput = form.querySelector('#type');
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');

  inputAdres.setAttribute('placeholder', mapPinX + ',' + mapPinY);

  for (var i = 0; i < noticeFieldset.length; i++) {
    noticeFieldset[i].setAttribute('disabled', 'disabled');
  }

  var setCapacity = function () {
    selectCapacity[1].classList.add('hidden');
    selectCapacity[2].classList.add('hidden');
    selectCapacity[3].classList.add('hidden');
    selectCapacity[3].removeAttribute('selected', 'selected');
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
      selectCapacity[3].setAttribute('selected', 'selected');
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

  var selectHousingHandler = function (evt) {
    var target = evt.target;

    if (target.value === 'bungalo') {
      priceInput.min = 0;
    } else if (target.value === 'flat') {
      priceInput.min = 1000;
    } else if (target.value === 'house') {
      priceInput.min = 5000;
    } else if (target.value === 'palace') {
      priceInput.min = 10000;
    }

    priceInput.placeholder = priceInput.min;
  };

  var timeCheckHandler = function (evt) {
    var chosenInput = (evt.target === timeInInput) ? timeInInput : timeOutInput;
    var remainingInput = (evt.target === timeInInput) ? timeOutInput : timeInInput;

    if (chosenInput.value === '12:00') {
      remainingInput.value = chosenInput.value;
    } else if (chosenInput.value === '13:00') {
      remainingInput.value = chosenInput.value;
    } else if (chosenInput.value === '14:00') {
      remainingInput.value = chosenInput.value;
    }
  };

  mapPinMain.addEventListener('keydown', activateForm);
  mapPinMain.addEventListener('mousedown', activateForm);
  typeInput.addEventListener('change', selectHousingHandler);
  timeOutInput.addEventListener('change', timeCheckHandler);
  timeInInput.addEventListener('change', timeCheckHandler);
})();
