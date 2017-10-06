angular.module('Elifoot').factory('TeamPlayers', ['$http', function($http) {
  return {
    all: function(teamId) {
        //verify first in the database
        return $http.post('./js/services/phpservices/team/getTeam.php', {'team_id' : teamId});
    },

    allFromSource: function(teamId) {
      return $http({
          method: 'GET',
          url: 'http://api.football-data.org/v1/teams/'+teamId+'/players',
          headers: {
            'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
          }
      });
    },

    subPlayers: function(teamId, game) {
        return null;
    },

    effectiveTeam: function(teamId) {
      //verify first in the database
      return $http.post('./js/services/phpservices/team/getEffectiveTeam.php', {'team_id' : teamId});
    },

    effectiveTeamFromSource: function(teamId) {
      return $http({
          method: 'GET',
          url: 'http://api.football-data.org/v1/teams/'+teamId,
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
    },
    
    getPlayerSpecs: function(attributesId) {
      return $http.post('./js/services/phpservices/team/getPlayerSpecs.php', {'attributes_id' : attributesId});
    }
  };
}]);
