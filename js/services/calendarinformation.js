angular.module('Elifoot').factory('CalendarInformation', ['$http', function($http) {

  var selfTeam = sessionStorage.getItem('effectiveTeamName');
  var events = [{
      id: 1,
      title: 'Treino de Adaptação',
      //start: new Date(y, m, d, 19, 0),
      url:'#/practices',
      color: 'orange'
    },{
      id: 2,
      title: 'Treino de Adaptação',
      //start: new Date(y, m, d+7, 19, 0),
      url:'#/practices',
      color: 'orange'
    }, {
      id: 3,
      title: 'Reunião Premier League',
      //start: new Date(y, m, d+4, 10, 0),
      allDay: false,
      color: 'orange'
    },{
      id: 4,
      title: 'Concentração: ' + selfTeam + ' vs Sporting CP',
      //start: new Date(y, m, d+1, 15, 0),
      allDay: false,
      color: 'blue'
    },{
      id: 5,
      title: selfTeam + ' vs Sporting CP',
      //start: new Date(y, m, d+1, 19, 0),
      url:'#/practices',
      allDay: false,
      color: 'red'
    },{
      id: 6,
      title: 'Concentração: ' + selfTeam + ' vs SL Benfica',
      //start: new Date(y, m, d+8, 15, 0),
      allDay: false,
      color: 'blue'
    },{
      id: 7,
      title: selfTeam + ' vs SL Benfica',
      //start: new Date(y, m, d+8, 19, 0),
      url:'#/practices',
      allDay: false,
      color: 'red'
    },{
      id: 8,
      title: 'Treino Intenso',
      url:'#/practices',
      //start: new Date(y, m, d - 5),
      //end: new Date(y, m, d - 2),
      color: 'red'
    },{
      id: 9,
      title: 'Treino Intenso',
      url:'#/practices',
      //start: new Date(y, m, (d+8) - 5),
      //end: new Date(y, m, (d+8) - 2),
      color: 'red'
    }];

  return {
    getEvents: function() {
        return 10;
    }
  };
}]);
