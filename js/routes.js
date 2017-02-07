angular.module("Elifoot").config( ['$routeProvider', function($routeProvider) {

    $routeProvider
    .when('/', {
      redirectTo: '/home'
    })
    .when('/home', {
      templateUrl: '/templates/pages/home/index.html',
      controller: 'FeedsController'
    })
    .when('/news', {
      templateUrl: '/templates/pages/home/news.html',
      controller: 'FeedsController'
    })
    .when('/calendar', {
      templateUrl: '/templates/pages/calendar/index.html',
      controller: 'CalendarController'
    })
    .when('/practices', {
      templateUrl: '/templates/pages/practices/index.html',
      controller: 'PracticesController'
    })
    .when('/about', {
      templateUrl: '/templates/pages/about/index.html'
    })
    .when('/players', {
      templateUrl: '/templates/pages/teams/players.html',
      controller: 'TeamPlayersController'
    })
    .when('/classification', {
      templateUrl: '/templates/pages/classification/index.html',
      controller: 'ClassificationController'
    });
}]);
