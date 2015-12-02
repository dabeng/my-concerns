angular.module('countdown').controller('CountdownDetailCtrl', function($scope, $stateParams, Countdowns) {
  $scope.countdown = Countdowns.get($stateParams.countdownId);
});