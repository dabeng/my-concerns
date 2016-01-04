'use strict';

angular.module('countdown').factory('Countdown', function($cordovaSQLite, $rootScope, $ionicPlatform) {
var self = this;


  self.all = function() {
    var countdowns = [];
    $cordovaSQLite.execute($rootScope.db, 'SELECT * FROM countdown')
    .then(function(res) {
      if(res.rows.length > 0) {
        for(var i = 0; i < res.rows.length; i++){
          countdowns.push(res.rows.item(i));
        }
      } else {
          console.log("No results found");
      }
    }, function (err) {
      console.error(err);
    });
    return countdowns;
  };

  self.get = function(countdownId) {
    var countdown = null;
    $cordovaSQLite.execute($rootScope.db, 'SELECT * FROM countdown WHERE id=' + countdownId)
    .then(function(res) {
      if(res.rows.length > 0) {
        countdown = res.rows.item(0);
      } else {
        console.log('No results found');
      }
    }, function (err) {
      console.error(err);
    });
    return countdown;
    }



  return self;
})  ;