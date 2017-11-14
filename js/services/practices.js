angular.module('Elifoot').factory('Practices', ['$http', function($http) {

  return {
    getPractice: function(eventId, teamId, exercise) {
      return $http.post('./js/services/phpservices/practices/getPracticeInformation.php', {
        'teamId' : teamId,
        'eventId' : eventId,
        'exercise' : exercise
      });
    },
    getAllPracticesInfo: function(teamId) {
      return $http.post('./js/services/phpservices/practices/getAllPracticesInfo.php', {
        'teamId' : teamId
      });
    },
    getAllExercisesOfAPractice: function(teamId, eventId) {
      return $http.post('./js/services/phpservices/practices/getAllExercisesOfAPractice.php', {
        'teamId' : teamId,
        'eventId' : eventId
      });
    },
    deletePractice: function(teamId, eventId, exercise) {
      return $http.post('./js/services/phpservices/practices/deletePractice.php', {
        'teamId' : teamId,
        'eventId' : eventId,
        'exercise' : exercise
      });
    },
    getPracticesOfATimelineToLoadTheGraphics: function(startDate, endDate, teamId) {
      return $http.post('./js/services/phpservices/practices/getPracticesOfATimelineToLoadTheGraphics.php', {
        'startDate' : startDate,
        'endDate' : endDate,
        'teamId' : teamId
      });
    },
    savePlayerInPractice: function(event, exercise, datetime, type, volume, intensity, density,
        frequency, description, selectedField, selectedFieldSize, player, iconId, iconTopPosition,
        iconLeftPosition) {
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
            'leftPosition' : player.leftPosition,
            'iconId' : iconId,
            'iconTopPosition' : iconTopPosition,
            'iconLeftPosition' : iconLeftPosition
        });
    }
  };
}]);
