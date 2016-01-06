'use strict';

angular.module('countdown')
.factory('Countdown', function($cordovaSQLite, $rootScope, DBA) {

  var self = this;

  self.all = function() {

    return DBA.query('SELECT * FROM countdown')
      .then(function(result){
        return DBA.getAll(result);
      });

  };

  self.get = function(countdownId) {
    var parameters = [countdownId];
    return DBA.query('SELECT * FROM countdown WHERE id = (?)', parameters)
      .then(function(result) {
        return DBA.getOne(result);
      });
  }

  return self;
})  ;