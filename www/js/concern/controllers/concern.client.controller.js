angular.module('concern').controller('ConcernCtrl',
  function($scope, $rootScope, $ionicActionSheet, $cordovaCamera, $cordovaSQLite) {
  $scope.fields = {'imageSrc':'img/picture.png'};

  $scope.setCover = function() {
    $ionicActionSheet.show({
        buttons: [
          { text: 'Take a picture' },
          { text: 'Select a picture from album' }
        ],
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          var options = {};
          if (index === 0) {
            options = {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 300,
              targetHeight: 300,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation:true
            };
          } else if (index === 1) {
            options = {
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 300,
              targetHeight: 300
            };
          }
          $cordovaCamera.getPicture(options).then(function(imageSrc) {
            if (index === 0) {
              $scope.fields.imageSrc = 'data:image/jpeg;base64,' + imageSrc;
            } else if (index === 1) {
              $scope.fields.imageSrc = imageSrc;
            }
          }, function(err) {
            // error
          });
          if (index === 1) {
            // $cordovaCamera.cleanup(); // only for FILE_URI
          }
          return true;
        }
      });
  };

  $scope.create = function() {
    var query = 'INSERT INTO countdown (special_day, content) VALUES (?,?)';
    $cordovaSQLite.execute($rootScope.db, query, [$scope.fields.special_day.toDateString(), $scope.fields.content]).then(function(res) {
      $scope.fields = {'imageSrc':'img/picture.png'};
      console.log('insertid: ' + res.insertId);
    }, function (err) {
      console.error(err);
    });
  }
  
});