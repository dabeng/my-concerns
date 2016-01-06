angular.module('countdown').controller('CountdownsCtrl', function($scope, Countdown) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    Countdown.all().then(function(countdowns){
      $scope.countdowns = countdowns;
    });
  });

  // $scope.countdowns = Countdown.all();
  $scope.remove = function(countdown) {
    Countdowns.remove(countdown);
  };
})