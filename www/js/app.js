// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'reminder', 'countdown', 'concern'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(window.cordova) {
      // the code using ionic SQLite plugin
      $rootScope.db = $cordovaSQLite.openDB({'name': 'my-concerns.db' });
    } else {
      // the code using WebSQL of brower
      $rootScope.db = window.openDatabase('my-concerns', '1.0', 'testing db', 100 * 1024 * 1024);
    }

    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS countdown(id integer primary key autoincrement, special_day text, content text)");
    /*
     * the following code snippets show us how to provide pre-populated data for SQLite
     *
    var query = "INSERT INTO countdown (special_day, content) VALUES (?,?)";
    $cordovaSQLite.execute($rootScope.db, query, [new Date(), 'Birthday']).then(function(res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.error(err);
    });
    $cordovaSQLite.execute($rootScope.db, query, [new Date(), 'Birthday2']);
    $cordovaSQLite.execute($rootScope.db, query, [new Date(), 'Birthday3']);
    $cordovaSQLite.execute($rootScope.db, query, [new Date(), 'Birthday4']);
    */
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.reminders', {
    url: '/reminders',
    views: {
      'tab-reminders': {
        templateUrl: 'templates/tab-reminders.html',
        controller: 'RemindersCtrl'
      }
    }
  })

  .state('tab.countdowns', {
      url: '/countdowns',
      views: {
        'tab-countdowns': {
          templateUrl: 'templates/tab-countdowns.html',
          controller: 'CountdownsCtrl'
        }
      }
    })
    .state('tab.countdown-detail', {
      url: '/countdowns/:countdownId',
      views: {
        'tab-countdowns': {
          templateUrl: 'templates/countdown-detail.html',
          controller: 'CountdownDetailCtrl'
        }
      }
    })

  .state('tab.concern', {
    url: '/concern',
    views: {
      'tab-concern': {
        templateUrl: 'templates/tab-concern.html',
        controller: 'ConcernCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/reminders');

});
