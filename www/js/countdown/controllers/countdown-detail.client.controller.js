angular.module('countdown').controller('CountdownDetailCtrl', function($scope, $stateParams, Countdown) {
  Countdown.get($stateParams.countdownId).then(function(countdown){
    $scope.countdown = countdown;
  });
});