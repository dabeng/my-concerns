angular.module('concern').controller('ConcernCtrl',
  function($scope, $rootScope, $ionicActionSheet, $cordovaCamera, $cordovaFile, $cordovaSQLite) {
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
              destinationType: Camera.DestinationType.FILE_URI,
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
          $cordovaCamera.getPicture(options).then(function(sourcePath) {
            // if (index === 0) {
              // $scope.fields.imageSrc = 'data:image/jpeg;base64,' + imageSrc;
            // } else if (index === 1) {
              // $scope.fields.imageSrc = imageSrc;
            // }
      var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1);
      var targetPath = sourceDirectory.slice(0, sourceDirectory.lastIndexOf('/', sourceDirectory.length-2)+1)
        + 'files/';

      console.log("Copying : " + sourceDirectory + sourceFileName);
      console.log("Copying " + cordova.file.dataDirectory + sourceFileName);
      $cordovaFile.copyFile(sourceDirectory, sourceFileName, targetPath, sourceFileName).then(function(success) {
         // $scope.fields.content = cordova.file.dataDirectory + sourceFileName;
           $scope.fields.content = 'good'
         }, function(error) {
         $scope.fields.content = 'bad';
      });
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
    // var query = 'INSERT INTO countdown (special_day, content) VALUES (?,?)';
    // $cordovaSQLite.execute($rootScope.db, query, [$scope.fields.special_day.toDateString(), $scope.fields.content]).then(function(res) {
    //   $scope.fields = {'imageSrc':'img/picture.png'};
    //   console.log('insertid: ' + res.insertId);
    // }, function (err) {
    //   console.error(err);
    // });
// $scope.fields.content = cordova.file.dataDirectory;
  $cordovaFile.createFile(cordova.file.dataDirectory, 'newd', true).then(function(success){
 
  //   //success.nativeURL will contain the path to the photo in permanent storage, do whatever you wish with it, e.g:
    $scope.fields.content = success.nativeURL;
  }, function(err){
  //   //an error occured
    $scope.fields.content = err.code;
  //   // console.error(err);
  });
  }
  
});