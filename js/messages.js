'use strict';

(function () {
  var main = document.querySelector('main');
  var successPopup = document.querySelector('#success').content.querySelector('.success');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');
  var errorCloseButton = errorPopup.querySelector('.error__button');

  var closeErrorHandler = function () {
    errorPopup.remove();
    errorCloseButton.removeEventListener('click', closeErrorHandler);
    document.removeEventListener('mousedown', closeErrorHandler);
    document.addEventListener('keydown', closeErrorHandlerByKey);
  };

  var closeErrorHandlerByKey = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      closeErrorHandler();
    }
  };

  var closeSuccessHandler = function () {
    successPopup.remove();
    document.removeEventListener('mousedown', closeSuccessHandler);
    document.removeEventListener('keydown', closeSuccessHandlerByKey);
  };

  var closeSuccessHandlerByKey = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      closeSuccessHandler();
    }
  };

  var errorMessage = function () {
    main.insertAdjacentElement('afterbegin', errorPopup);
    errorCloseButton.addEventListener('click', closeErrorHandler);
    document.addEventListener('mousedown', closeErrorHandler);
    document.addEventListener('keydown', closeErrorHandlerByKey);
  };

  var successMessage = function () {
    main.insertAdjacentElement('afterbegin', successPopup);
    document.addEventListener('mousedown', closeSuccessHandler);
    document.addEventListener('keydown', closeSuccessHandlerByKey);

  };


  window.messages = {
    errorMessage: errorMessage,
    successMessage: successMessage

  };
})();
