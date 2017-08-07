angular.module('Elifoot').factory('TeamPlayers', ['$http', function($http) {
  return {
    all: function(teamId) {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/teams/'+teamId+'/players',
            headers: {
              'X-Auth-Token': 'db1386cd081342f8a0339d58d7a174e3'
            }
        });
    },

    effectiveTeam: function(teamId) {
      return $http({
          method: 'GET',
          url: 'http://api.football-data.org/v1/competitions/'+teamId+'/teams',
          headers: {
            'X-Auth-Token': 'db1386cd081342f8a0339d58d7a174e3'
          }
      });
    },

    showSelectedTeam: function(selectedTeamId) {
      return $http({
          method: 'GET',
          url: 'http://api.football-data.org/v1/teams/'+selectedTeamId+'/players',
          headers: {
            'X-Auth-Token': 'db1386cd081342f8a0339d58d7a174e3'
          }
      });
    }
  };
}]);
