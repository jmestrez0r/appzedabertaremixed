angular.module('Elifoot').factory('Classification', ['$http', function($http) {
  return {
    all: function() {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/competitions/398/leagueTable',
            headers: {
              'X-Auth-Token': 'db1386cd081342f8a0339d58d7a174e3'
            }
        });
    },
    getAvailableTeams: function() {
      return $http({
          method: 'GET',
          url: 'http://api.football-data.org/v1/competitions/398/teams',
          headers: {
            'X-Auth-Token': 'db1386cd081342f8a0339d58d7a174e3'
          }
      });
    }
  };
}]);
