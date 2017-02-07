angular.module('Elifoot').factory('TeamPlayers', ['$http', function($http) {
  return {
    all: function() {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/teams/495/players',
            headers: {
              'X-Auth-Token': 'db1386cd081342f8a0339d58d7a174e3'
            }
        });
    },

    effectiveTeam: function() {
      return $http({
          method: 'GET',
          url: 'http://api.football-data.org/v1/teams/495',
          headers: {
            'X-Auth-Token': 'db1386cd081342f8a0339d58d7a174e3'
          }
      });
    }
  };
}]);
