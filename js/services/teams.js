angular.module('Elifoot').factory('TeamPlayers', ['$http', function($http) {
  return {
    all: function(teamId) {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/teams/'+teamId+'/players',
            headers: {
              'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
            }
        });
    },

    effectiveTeam: function(teamId) {
      return $http({
          method: 'GET',
          url: 'http://api.football-data.org/v1/competitions/'+teamId+'/teams',
          headers: {
            'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
          }
      });
    },

    teamDetail: function(teamId) {
      return $http({
          method: 'GET',
          url: 'http://api.football-data.org/v1/teams/'+teamId,
          headers: {
            'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
          }
      });
    }
  };
}]);
