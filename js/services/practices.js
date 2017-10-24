angular.module('Elifoot').factory('Practices', ['$http', function($http) {

  return {
    getPractice: function(eventId, teamId) {
      return $http.post('./js/services/phpservices/practices/getPracticeInformation.php', {
        'teamId' : teamId,
        'eventId' : eventId
      });
    },
    deletePractice: function(teamId, eventId) {
      return $http.post('./js/services/phpservices/practices/deletePractice.php', {
        'teamId' : teamId,
        'eventId' : eventId
      });
    },
    savePlayerInPractice: function(event, exercise, datetime, type, volume, intensity, density,
        frequency, description, selectedField, selectedFieldSize, player) {
          console.log('teamId:' + event.teamId);
          console.log('eventId:' + event.selectedGameId);
          console.log('title:' + event.title);
          console.log('exercise:' + exercise);
          console.log('startDate:' + datetime);
          console.log('type:' + type);
          console.log('volume:' + volume);
          console.log('intensity:' + intensity);
          console.log('density:' + density);
          console.log('frequency:' + frequency);
          console.log('description:' + description);
          console.log('fieldLocation:' + selectedField);
          console.log('fieldWeight:' + selectedFieldSize.weight);
          console.log('fieldHeight:' + selectedFieldSize.height);
          console.log('playerId:' + player.playerId);
          console.log('topPosition:' + player.topPosition);
          console.log('leftPosition:' + player.leftPosition);
          return $http.post('./js/services/phpservices/practices/savePractice.php', {
            'teamId' : event.teamId,
            'eventId' : event.selectedGameId,
            'title' : event.title,
            'exercise' : exercise,
            'startDate' : datetime,
            'type' : type,
            'volume' : volume,
            'intensity' : intensity,
            'density' : density,
            'frequency' : frequency,
            'description' : description,
            'fieldLocation' : selectedField,
            'fieldWeight' : selectedFieldSize.weight,
            'fieldHeight' : selectedFieldSize.height,
            'playerId' : player.playerId,
            'topPosition' : player.topPosition,
            'leftPosition' : player.leftPosition
        });
    }
  };
}]);
