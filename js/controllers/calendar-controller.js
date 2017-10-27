var amodule = angular.module("Elifoot").controller('CalendarController',
   function($scope, $compile, $timeout, $cookies, uiCalendarConfig, CalendarInformation, Fixtures, ngDialog) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var selfTeam = sessionStorage.getItem('effectiveTeamName');
    var teamId = sessionStorage.getItem('teamId');

    $scope.forceDatePickers = function () {
      $('#startDateId').datetimepicker();
      $('#endDateId').datetimepicker();
    }

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */

    //TODO INVOKE FIXTURE EVENTS
    $scope.events = [{
        title: 'Dummy',
        start: new Date(y-9999, m, d, 19, 0),
        url:'#/practices',
        type: 'practice',
        color: 'orange'
      }];

    //get the information of the events
    CalendarInformation.getEvents(teamId).success(function (data) {

      for(var i = 0; i < data.length; i++) {
        var colorVar = colorVerification(data[i].type);
        var urlVar = urlVerification(data[i].type);

        $scope.events.push({
          id: data[i].eventId,
          title: data[i].title,
          url:   urlVar,
          type: data[i].type,
          start: data[i].startDate,
          end: data[i].endDate,
          color: colorVar
        });
      }

      Fixtures.all(teamId).success(function(data) {
          for(var i = 0; i < data.fixtures.length; i++) {
            var game = data.fixtures[i];

            //verify if the event exists
            if(!eventExit(game)) {
              $scope.events.push({
                id: '',
                title: game.homeTeamName + ' vs ' + game.awayTeamName,
                url:   '#/tactics',
                type: 'game',
                start: game.date,
                end: '',
                color: 'red'
              });
            }
          }
      });
    });

    function eventExit(game) {
      for(var i = 0; i < $scope.events.length; i++) {
        var storedGame = $scope.events[i];
        if(storedGame.title == game.homeTeamName + ' vs ' + game.awayTeamName &&
          storedGame.start == game.date.replace('T', ' ').replace('Z', '')) {
            return true;
        }
      }
      return false;
    }

    function urlVerification(type) {
      if(type == 'game') {
        return '#/tactics';
      } else if (type == 'meeting') {
        return '';
      } else if (type == 'practice') {
        return '#/practices';
      }
    }

    function colorVerification(type) {
      if(type == 'game') {
        return 'red';
      } else if (type == 'meeting') {
        return '';
      } else if (type == 'practice') {
        return 'orange';
      }
    }

    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };


    /* alert on eventClick */
    $scope.alertOnEventClick = function(date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
        console.log(date);
        console.log(' was clicked ');

        if(date.id == null || date.id == '' || date.id == undefined) {

          $cookies.putObject('selectedGameDescription', date.title);
          $cookies.putObject('selectedGameDate', date.start);

          var defineUrl = '';
          var defineColor = '';

          if(date.type == 'game') {
            defineUrl = '#/tactics';
            definedColor = 'red';
          } else if (date.type == 'practice') {
            defineUrl = '#/practices';
            defineColor = 'orange';
          }

          //save the event into database
          CalendarInformation.saveEvent(date.title, defineUrl, date.type, date.start, '', defineColor, teamId).success(function (data) {
            console.log(data);
            if(data == "New record!") {
              CalendarInformation.getEventId(date.title, defineUrl, date.type, date.start, '', defineColor, teamId).success(function (data2) {
                console.log(data2);
                $cookies.putObject('selectedGameId', data2[0].eventId);
                console.log('selectedGameId ' + data2[0].eventId);
                $cookies.putObject('selectedGameDescription', date.title);
              });
            }
          });
        } else {
          //setElementToLoadTactic
          $cookies.putObject('selectedGameDescription', date.title);
          $cookies.putObject('selectedGameId', date.id);
          $cookies.putObject('selectedGameDate', date.start);
          console.log('selectedGameId ' + date.id);
        }
    };

    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };

    $scope.eventType = {
        id: '',
        description: ''
    };
    $scope.eventTitle = '';
    $scope.startDate = '';
    $scope.endDate = '';

    //create new event button request
    $scope.createANewEvent = function() {
      ngDialog.open({
          template: 'createNewEvent.html',
          className: 'ngdialog-theme-default',
          scope: $scope,
          showClose: false,
          height: 400,
          weight: 600
        });
    };


    $scope.selectEventType = function(eventType) {
      $scope.eventType.id = eventType;
      if($scope.eventType.id == 'game') {
        $scope.eventType.description = 'Jogo';
      } else if ($scope.eventType.id == 'meeting') {
        $scope.eventType.description = 'Reunião';
      } else if ($scope.eventType.id == 'practice') {
        $scope.eventType.description = 'Treino';
      }
      return $scope.eventType;
    };

    /* add custom event*/
    $scope.addEvent = function(eventTitle, startDate, endDate) {
      var defineUrl = '';
      var defineColor = '';

      if($scope.eventType.id == 'game') {
        defineUrl = '#/tactics';
        defineColor = 'red';
      } else if ($scope.eventType.id == 'meeting') {
        defineColor = 'blue';
        defineUrl = '';
      } else if ($scope.eventType.id == 'practice') {
        defineUrl = '#/practices';
        defineColor = 'orange';
      }

      $scope.events.push({
        title: eventTitle,
        url:   defineUrl,
        type: $scope.eventType,
        start: startDate,
        end: endDate,
        color: defineColor
      });

      //save the event into database
      CalendarInformation.saveEvent(eventTitle, defineUrl, $scope.eventType.id, startDate, endDate, defineColor, teamId).success(function (data) {
        console.log(data);
        CalendarInformation.getEventId(eventTitle, defineUrl, $scope.eventType.id, startDate, endDate, defineColor, teamId).success(function (data2) {
            for(var i = 0; i < $scope.events.length; i++) {
              if($scope.events[i].title == eventTitle) {
                $scope.events[i].id = data2[0].eventId;

                $cookies.putObject('selectedGameDescription', eventTitle);
                $cookies.putObject('selectedGameId', data2[0].eventId);
                $cookies.putObject('selectedGameDate', startDate);

                //go to the pretended screen
                window.location.href = defineUrl;
                $scope.reload();

                return;
              }
            }
          });
      });
    };

    CalendarInformation.getGames(teamId).success(function (data) {
      console.log(data);
    });

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);

      CalendarInformation.deleteEvent($scope.selectedEventId).success(function (data) {
        console.log(data);
      });
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalendar = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
});
