'use strict';

(function () {

  var onError = function (message) {
    console.log(message);
  };

  window.messages = {
    onError: onError
  };
})();
