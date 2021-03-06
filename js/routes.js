angular.module("Elifoot").config( ['$routeProvider', function($routeProvider) {

    $routeProvider
    .when('/', {
      redirectTo: '/home'
    })
    .when('/home', {
      templateUrl: './templates/pages/home/index.html',
      controller: 'FeedsController'
    })
    .when('/news', {
      templateUrl: './templates/pages/home/news.html',
      controller: 'FeedsController'
    })
    .when('/calendar', {
      templateUrl: './templates/pages/calendar/index.html',
      controller: 'CalendarController'
    })
    .when('/gamescalendar', {
      templateUrl: './templates/pages/gamescalendar/index.html',
      controller: 'FixturesController'
    })
    .when('/gamecall', {
      templateUrl: './templates/pages/gamecall/index.html',
      controller: 'TacticsController'
    })
    .when('/currentgame', {
      templateUrl: './templates/pages/currentgame/index.html',
      controller: 'CurrentGameController'
    })
    .when('/practices', {
      templateUrl: './templates/pages/practices/index.html',
      controller: 'PracticesController'
    })
    .when('/mesocycle', {
      templateUrl: './templates/pages/mesocycle/index.html',
      controller: 'MesocycleController'
    })
    .when('/tactics', {
      templateUrl: './templates/pages/tactics/index.html',
      controller: 'TacticsController'
    })
    .when('/players', {
      templateUrl: './templates/pages/teams/players.html',
      controller: 'TeamPlayersController'
    })
    .when('/addplayer', {
      templateUrl: './templates/pages/teams/addplayer.html',
      controller: 'TeamPlayersController'
    })
    .when('/editplayer', {
      templateUrl: './templates/pages/teams/edit.html',
      controller: 'TeamPlayersController'
    })
    .when('/classification', {
      templateUrl: './templates/pages/classification/index.html',
      controller: 'ClassificationController'
    })
    .when('/profile', {
      templateUrl: './templates/pages/user/profile.html',
      controller: 'UserController'
    })
    .when('/logout', {
      templateUrl: './templates/pages/home/index.html',
      controller: 'FeedsController'
    })
    .when('/about', {
      templateUrl: './templates/pages/about/index.html'
    });
}]);
