angular.module('concern').controller('ConcernCtrl', function($scope, $rootScope, $cordovaSQLite) {
  $scope.fields = {};

  $scope.create = function() {
    var query = 'INSERT INTO countdown (special_day, content) VALUES (?,?)';
    $cordovaSQLite.execute($rootScope.db, query, [$scope.fields.special_day, $scope.fields.content]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
    }, function (err) {
        console.error(err);
    });
  }
  
});