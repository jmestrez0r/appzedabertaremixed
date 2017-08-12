var amodule = angular.module("Elifoot").controller('CalendarController',
   function($scope, $compile, $timeout, uiCalendarConfig, CalendarInformation) {
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
        color: 'orange'
      },{
        title: 'Treino de Adaptação',
        start: new Date(y, m, d+7, 19, 0),
        url:'#/practices',
        color: 'orange'
      }, {
        id: 999,
        title: 'Reunião Premier League',
        start: new Date(y, m, d+4, 10, 0),
        allDay: false,
        color: 'orange'
      },{
        id: 999,
        title: 'Concentração: ' + selfTeam + ' vs Sporting CP',
        start: new Date(y, m, d+1, 15, 0),
        allDay: false,
        color: 'blue'
      },{
        id: 999,
        title: selfTeam + ' vs Sporting CP',
        start: new Date(y, m, d+1, 19, 0),
        url:'#/practices',
        allDay: false,
        color: 'red'
      },{
        id: 999,
        title: 'Concentração: ' + selfTeam + ' vs SL Benfica',
        start: new Date(y, m, d+8, 15, 0),
        allDay: false,
        color: 'blue'
      },{
        id: 999,
        title: selfTeam + ' vs SL Benfica',
        start: new Date(y, m, d+8, 19, 0),
        url:'#/practices',
        allDay: false,
        color: 'red'
      },{
        title: 'Treino Intenso',
        url:'#/practices',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2),
        color: 'red'
      },{
        title: 'Treino Intenso',
        url:'#/practices',
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
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
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
});
