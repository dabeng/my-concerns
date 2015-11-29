angular.module('starter.controllers', [])

.controller('ScheduleCtrl', function($scope) {})

.controller('CountdownsCtrl', function($scope, Countdowns) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.countdowns = Countdowns.all();
  $scope.remove = function(countdown) {
    Countdowns.remove(countdown);
  };
})

.controller('CountdownDetailCtrl', function($scope, $stateParams, Countdowns) {
  $scope.countdown = Countdowns.get($stateParams.countdownId);
})

.controller('ConcernCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
