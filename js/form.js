'use strict';

(function () {
  var inputAddress = document.getElementById('address');
  var notice = document.querySelector('.notice');
  var announcementForm = document.querySelector('.ad-form');
  var noticeFieldset = notice.querySelectorAll('fieldset');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var selectCapacity = capacity.querySelectorAll('option');
  var titleInput = announcementForm.querySelector('#title');
  var priceInput = announcementForm.querySelector('#price');
  var typeInput = announcementForm.querySelector('#type');
  var timeInInput = announcementForm.querySelector('#timein');
  var timeOutInput = announcementForm.querySelector('#timeout');
  var descriptionInput = announcementForm.querySelector('#description');
  var resetButton = announcementForm.querySelector('.ad-form__reset');

  var PriceForType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var NumbersOfRooms = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var defaultAddressValue = function () {
    inputAddress.value = (window.pins.DefaultPinPosition.X + window.pins.MainPinCenter.X) + ',' + (window.pins.DefaultPinPosition.Y + window.pins.MainPinCenter.Y);
  };

  defaultAddressValue();

  var resetButtonHandler = function () {
    window.map.initialState();
  };

  var announcementFormDisabled = function () {
    var emptyInput = '';

    titleInput.value = emptyInput;
    priceInput.value = emptyInput;
    descriptionInput.value = emptyInput;

    announcementForm.reset();

    noticeFieldset.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });
  };

  announcementFormDisabled();

  var titleLengthControlHandler = function (evt) {
    var target = evt.target;

    if (target.validity.tooShort) {
      target.setCustomValidity('Заголовок должен состоять минимум из ' + target.minLength + ' символов!');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Заголовок должен состоять максимум из ' + target.maxLength + ' символов!');
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле!');
    } else {
      target.setCustomValidity('');
    }
  };

  var setCapacity = function (selectedRooms) {
    var suitableCapacities = NumbersOfRooms[selectedRooms];
    selectCapacity.forEach(function (option) {
      option.hidden = !suitableCapacities.includes(parseInt(option.value, 10));
    });
  };

  var setRoomsAndCapacities = function () {
    setCapacity(roomNumber.value);
    capacity.value = NumbersOfRooms[roomNumber.value][0];
  };

  var selectHousingHandler = function () {
    typeInput.childNodes.forEach(function () {
      priceInput.min = PriceForType[typeInput.value];
      priceInput.placeholder = priceInput.min;
    });

    return priceInput.placeholder;
  };

  var timeInCheckHandler = function () {
    timeOutInput.value = timeInInput.value;
  };

  var timeOutCheckHandler = function () {
    timeInInput.value = timeOutInput.value;
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    var filledForm = new FormData(announcementForm);

    window.load.sendForm(filledForm, function () {
      window.messages.successMessage();
      window.map.initialState();
    }, window.messages.errorMessage);

  };

  var setHandlers = function () {
    announcementForm.addEventListener('submit', submitHandler);
    titleInput.addEventListener('invalid', titleLengthControlHandler);
    typeInput.addEventListener('change', selectHousingHandler);
    timeOutInput.addEventListener('change', timeOutCheckHandler);
    timeInInput.addEventListener('change', timeInCheckHandler);
    resetButton.addEventListener('click', resetButtonHandler);
    roomNumber.addEventListener('change', setRoomsAndCapacities);
  };

  window.form = {
    setHandlers: setHandlers,
    announcementFormDisabled: announcementFormDisabled,
    defaultAddressValue: defaultAddressValue,
    selectHousingHandler: selectHousingHandler,
    setRoomsAndCapacities: setRoomsAndCapacities
  };
}
)();
