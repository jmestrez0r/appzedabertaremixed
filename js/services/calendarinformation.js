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
    getPracticesList: function(teamId, startDate, endDate) {
        //verify first in the database
        return $http.post('./js/services/phpservices/calendar/getPractices.php', {
          'teamId' : teamId,
          'startDate' : startDate,
          'endDate' : endDate
        });
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
    getEventId: function(eventTitle, defineUrl, eventType, startDate, endDate, defineColor, teamId) {
        //verify first in the database
        return $http.post('./js/services/phpservices/calendar/getEventId.php', {
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
    },
    getEventsCountByType: function(teamId, type, startDate, endDate) {
      return $http.post('./js/services/phpservices/calendar/getEventsCount.php', {
        'startDate' : startDate,
        'endDate' : endDate,
        'teamId' : teamId,
        'type' : type
      });
    },
    getNearByEventByType: function(teamId, type) {
      return $http.post('./js/services/phpservices/calendar/getNearByEventByType.php', {
        'teamId' : teamId,
        'type' : type
      });
    },
    getTodaysEventsByType: function(teamId, type) {
      return $http.post('./js/services/phpservices/calendar/getTodaysEventsByType.php', {
        'teamId' : teamId,
        'type' : type
      });
    },
    getEventsCountByTypeStatistics: function(teamId, startDate, endDate) {
      return $http.post('./js/services/phpservices/calendar/getEventsCountByType.php', {
        'teamId' : teamId,
        'startDate' : startDate,
        'endDate' : endDate,
      });
    }
  };
}]);
