var amodule = angular.module("Elifoot").controller('CalendarController',
   function($scope, $compile, $timeout, uiCalendarConfig, CalendarInformation, ngDialog) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var selfTeam = sessionStorage.getItem('effectiveTeamName');

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */

    $scope.events = [{
        title: 'Treino de Adaptação',
        start: new Date(y, m, d, 19, 0),
        url:'#/practices',
        type: 'practice',
        color: 'orange'
      },{
        title: 'Treino de Adaptação',
        start: new Date(y, m, d+7, 19, 0),
        url:'#/practices',
        type: 'practice',
        color: 'orange'
      }, {
        id: 999,
        title: 'Reunião Premier League',
        start: new Date(y, m, d+4, 10, 0),
        allDay: false,
        type: 'meeting',
        color: 'orange'
      },{
        id: 999,
        title: 'Concentração: ' + selfTeam + ' vs Sporting CP',
        start: new Date(y, m, d+1, 15, 0),
        allDay: false,
        type: 'focus',
        color: 'blue'
      },{
        id: 999,
        title: selfTeam + ' vs Sporting CP',
        start: new Date(y, m, d+1, 19, 0),
        url:'#/tactics',
        type: 'game',
        allDay: false,
        color: 'red'
      },{
        id: 999,
        title: 'Concentração: ' + selfTeam + ' vs SL Benfica',
        start: new Date(y, m, d+8, 15, 0),
        allDay: false,
        type: 'focus',
        color: 'blue'
      },{
        id: 999,
        title: selfTeam + ' vs SL Benfica',
        start: new Date(y, m, d+8, 19, 0),
        url:'#/tactics',
        type: 'game',
        allDay: false,
        color: 'red'
      },{
        title: 'Treino Intenso',
        url:'#/practices',
        type: 'practice',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2),
        color: 'red'
      },{
        title: 'Treino Intenso',
        url:'#/practices',
        type: 'practice',
        start: new Date(y, m, (d+8) - 5),
        end: new Date(y, m, (d+8) - 2),
        color: 'red'
      }];

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
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
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
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
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

    $scope.gamesList = CalendarInformation.getGames();
});
