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
      return $http.post('./js/services/phpservices/playerInformation/getPlayerSpecs.php', {'attributes_id' : attributesId});
    },

    createPlayerInformation: function(player, physicalHeight, physicalResist, physicalAgility,
       physicalJumpHeight, physicalJumpLong, acelaration, velocity10m, velocity20m, velocity50m,
       velocity100m, mentalLeadership, mentalTeam, mentalTeamWork, mentalDetermination, mentalCreativity,
       mentalFocus, mentalAgressive, technicalCruzamento, technicalDrible, technicalWork, technicalShoot,
       technicalFinish, technicalHead, technicalFirst, technicalReceive, technicalFree, technicalLaunch,
       technicalPenalty, technicalCorner, technicalTech, technicalShortPass, technicalLongPass,
       technicalLongShoot) {
      return $http.post('./js/services/phpservices/playerInformation/addPlayerInformation.php', {
        'team_id': player.teamId, 'physicalHeight': physicalHeight,
        'physicalResist':physicalResist, 'physicalAgility':physicalAgility,
        'physicalJumpHeight':physicalJumpHeight, 'physicalJumpLong':physicalJumpLong,
        'acelaration':acelaration, 'velocity10m':velocity10m, 'velocity20m':velocity20m,
        'velocity50m':velocity50m, 'velocity100m':velocity100m, 'mentalLeadership':mentalLeadership,
        'mentalTeam':mentalTeam, 'mentalTeamWork':mentalTeamWork, 'mentalDetermination':mentalDetermination,
        'mentalCreativity':mentalCreativity, 'mentalFocus':mentalFocus, 'mentalAgressive':mentalAgressive,
        'technicalCruzamento':technicalCruzamento, 'technicalDrible':technicalDrible,
        'technicalWork':technicalWork, 'technicalShoot':technicalShoot, 'technicalFinish':technicalFinish,
        'technicalHead':technicalHead, 'technicalFirst':technicalFirst, 'technicalReceive':technicalReceive,
        'technicalFree':technicalFree, 'technicalLaunch':technicalLaunch,
        'technicalPenalty':technicalPenalty, 'technicalCorner':technicalCorner,
        'technicalTech':technicalTech, 'technicalShortPass':technicalShortPass,
        'technicalLongPass':technicalLongPass, 'technicalLongShoot':technicalLongShoot});
    },

    getPlayerInformationId: function(physicalHeight, physicalResist, physicalAgility,
       physicalJumpHeight, physicalJumpLong, acelaration, velocity10m, velocity20m, velocity50m,
       velocity100m, mentalLeadership, mentalTeam, mentalTeamWork, mentalDetermination, mentalCreativity,
       mentalFocus, mentalAgressive, technicalCruzamento, technicalDrible, technicalWork, technicalShoot,
       technicalFinish, technicalHead, technicalFirst, technicalReceive, technicalFree, technicalLaunch,
       technicalPenalty, technicalCorner, technicalTech, technicalShortPass, technicalLongPass,
       technicalLongShoot) {
         return $http.post('./js/services/phpservices/playerInformation/getPlayerInformationId.php', {
           'physicalHeight': physicalHeight,
           'physicalResist':physicalResist, 'physicalAgility':physicalAgility,
           'physicalJumpHeight':physicalJumpHeight, 'physicalJumpLong':physicalJumpLong,
           'acelaration':acelaration, 'velocity10m':velocity10m, 'velocity20m':velocity20m,
           'velocity50m':velocity50m, 'velocity100m':velocity100m, 'mentalLeadership':mentalLeadership,
           'mentalTeam':mentalTeam, 'mentalTeamWork':mentalTeamWork, 'mentalDetermination':mentalDetermination,
           'mentalCreativity':mentalCreativity, 'mentalFocus':mentalFocus, 'mentalAgressive':mentalAgressive,
           'technicalCruzamento':technicalCruzamento, 'technicalDrible':technicalDrible,
           'technicalWork':technicalWork, 'technicalShoot':technicalShoot, 'technicalFinish':technicalFinish,
           'technicalHead':technicalHead, 'technicalFirst':technicalFirst, 'technicalReceive':technicalReceive,
           'technicalFree':technicalFree, 'technicalLaunch':technicalLaunch,
           'technicalPenalty':technicalPenalty, 'technicalCorner':technicalCorner,
           'technicalTech':technicalTech, 'technicalShortPass':technicalShortPass,
           'technicalLongPass':technicalLongPass, 'technicalLongShoot':technicalLongShoot});
     },

    savePlayer: function(player) {
      return $http.post('./js/services/phpservices/playerInformation/createPlayer.php', {
        'team_id':player.teamId, 'name':player.name, 'position':player.position,
        'jerseyNumber': player.jerseyNumber, 'nationality': player.nationality,
        'picture': player.pictureBlob, 'contractUntil': player.contractUntil,
        'marketValue': player.marketValue, 'attributesId': player.attributesId});
    },

    updatePlayerInformation: function(player, physicalHeight, physicalResist, physicalAgility,
       physicalJumpHeight, physicalJumpLong, acelaration, velocity10m, velocity20m, velocity50m,
       velocity100m, mentalLeadership, mentalTeam, mentalTeamWork, mentalDetermination, mentalCreativity,
       mentalFocus, mentalAgressive, technicalCruzamento, technicalDrible, technicalWork, technicalShoot,
       technicalFinish, technicalHead, technicalFirst, technicalReceive, technicalFree, technicalLaunch,
       technicalPenalty, technicalCorner, technicalTech, technicalShortPass, technicalLongPass,
       technicalLongShoot) {
      return $http.post('./js/services/phpservices/playerInformation/updatePlayerInformation.php', {
        'attributes_id':player.attributesId, 'physicalHeight':physicalHeight,
        'physicalResist':physicalResist, 'physicalAgility':physicalAgility,
        'physicalJumpHeight':physicalJumpHeight, 'physicalJumpLong':physicalJumpLong,
        'acelaration':acelaration, 'velocity10m':velocity10m, 'velocity20m':velocity20m,
        'velocity50m':velocity50m, 'velocity100m':velocity100m, 'mentalLeadership':mentalLeadership,
        'mentalTeam':mentalTeam, 'mentalTeamWork':mentalTeamWork, 'mentalDetermination':mentalDetermination,
        'mentalCreativity':mentalCreativity, 'mentalFocus':mentalFocus, 'mentalAgressive':mentalAgressive,
        'technicalCruzamento':technicalCruzamento, 'technicalDrible':technicalDrible,
        'technicalWork':technicalWork, 'technicalShoot':technicalShoot, 'technicalFinish':technicalFinish,
        'technicalHead':technicalHead, 'technicalFirst':technicalFirst, 'technicalReceive':technicalReceive,
        'technicalFree':technicalFree, 'technicalLaunch':technicalLaunch,
        'technicalPenalty':technicalPenalty, 'technicalCorner':technicalCorner,
        'technicalTech':technicalTech, 'technicalShortPass':technicalShortPass,
        'technicalLongPass':technicalLongPass, 'technicalLongShoot':technicalLongShoot});
    },

    updatePlayer: function(player) {
      return $http.post('./js/services/phpservices/playerInformation/updatePlayer.php', {
        'player_id': player.playerId, 'team_id':player.teamId, 'name':player.name,
        'position':player.position, 'jerseyNumber':player.jerseyNumber, 'nationality':player.nationality,
        'picture':player.pictureBlob, 'contractUntil':player.contractUntil, 'marketValue':player.marketValue});
    },

    deletePlayer: function(player) {
      return $http.post('./js/services/phpservices/playerInformation/deletePlayer.php', {
        'player_id': player.playerId, 'team_id': player.teamId, 'attributesId':player.attributesId});
    }
  };
}]);
