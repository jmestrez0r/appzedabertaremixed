angular.module('Elifoot').factory('CalendarInformation', ['$http', function($http) {

  var selfTeam = sessionStorage.getItem('effectiveTeamName');

  return {
    getEvents: function(teamId) {
        //verify first in the database
        return $http.post('./js/services/phpservices/calendar/getEvents.php', {'teamId' : teamId});
    },
    getGames: function(teamId) {
        //verify first in the database
        return $http.post('./js/services/phpservices/calendar/getGames.php', {'teamId' : teamId});
    },
    saveEvent: function(eventTitle, defineUrl, eventType, startDate, endDate, defineColor, teamId) {
        //verify first in the database
        return $http.post('./js/services/phpservices/calendar/saveEvent.php', {
          'eventTitle' : eventTitle,
          'defineUrl' : defineUrl,
          'eventType' : eventType,
          'startDate' : startDate,
          'endDate' : endDate,
          'defineColor' : defineColor,
          'teamId' : teamId
        });
    },
    updateEvent: function(eventId, eventTitle, defineUrl, eventType, startDate, endDate, defineColor, teamId) {
        //verify first in the database
        return $http.post('./js/services/phpservices/calendar/saveEvent.php', {
          'eventId' : eventId,
          'eventTitle' : eventTitle,
          'defineUrl' : defineUrl,
          'eventType' : eventType,
          'startDate' : startDate,
          'endDate' : endDate,
          'defineColor' : defineColor,
          'teamId' : teamId
        });
    }
  };
}]);
