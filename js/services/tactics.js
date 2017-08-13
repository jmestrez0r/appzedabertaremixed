angular.module('Elifoot').factory('Tactics', ['$http', function($http) {
  return {
      all: function() {
          return
      },
      createTacticDetail: function(gameId) {
          console.log('creating tactic and associate to game Id ' + gameId);
      }
  }
}]);
