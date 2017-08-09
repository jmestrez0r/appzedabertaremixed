angular.module('Elifoot').factory('Classification', ['$http', function($http) {

  return {
    all: function(leagueTable) {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/competitions/'+leagueTable+'/leagueTable',
            headers: {
              'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
            }
        });
    },

    getAvailableTeams: function(leagueTable) {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/competitions/'+leagueTable+'/teams',
            headers: {
              'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
            }
        });
    }
  };
}]);
