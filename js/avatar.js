'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImgSize = {
    WIDTH: '100',
    HEIGHT: '100'
  };

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var housingPhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housingPhoto = document.querySelector('.ad-form__photo');
  var housingPhotoContainer = document.querySelector('.ad-form__photo-container');


  var showPicture = function (fileChooser, photoItem) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        photoItem.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var avatarHandler = function () {
    showPicture(avatarFileChooser, avatar);
  };

  var housingPhotoHandler = function () {
    var housingPhotoElement = housingPhoto.cloneNode(true);
    var housingPhotoItem = document.createElement('img');
    housingPhotoElement.appendChild(housingPhotoItem);
    housingPhotoItem.width = ImgSize.WIDTH;
    housingPhotoItem.height = ImgSize.HEIGHT;
    showPicture(housingPhotoFileChooser, housingPhotoItem);
    housingPhotoContainer.appendChild(housingPhotoElement);
  };

  var uploadFiles = function () {
    avatarFileChooser.addEventListener('change', avatarHandler);
    housingPhotoFileChooser.addEventListener('change', housingPhotoHandler);
  };

  var resetPictures = function () {
    setDefaultAvatar();
    removeHousingPhotos();
  };

  var setDefaultAvatar = function () {
    avatar.src = DEFAULT_AVATAR;
  };

  var removeHousingPhotos = function () {
    var housingPhotos = housingPhotoContainer.querySelectorAll('.ad-form__photo');
    housingPhotos.forEach(function (photo) {
      photo.remove();
    });
  };

  window.avatar = {
    uploadFiles: uploadFiles,
    resetPictures: resetPictures
  };
})();
