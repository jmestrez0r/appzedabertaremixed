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
    savePlayerInPractice: function(title, exercise, datetime, type, volume, intensity, density,
        frequency, description, selectedField, fieldWeight, fieldHeight, playerId, topPosition, leftPosition, teamId, eventId) {
          return $http.post('./js/services/phpservices/practices/savePractice.php', {
            'teamId' : teamId,
            'eventId' : eventId,
            'title' : title,
            'exercise' : exercise,
            'startDate' : datetime,
            'type' : type,
            'volume' : volume,
            'intensity' : intensity,
            'density' : density,
            'frequency' : frequency,
            'description' : description,
            'selectedField' : selectedField,
            'fieldWeight' : fieldWeight,
            'fieldHeight' : fieldHeight,
            'playerId' : playerId,
            'topPosition' : topPosition,
            'leftPosition' : leftPosition
          });
    }
  };
}]);
