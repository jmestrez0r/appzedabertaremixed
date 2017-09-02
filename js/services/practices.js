angular.module('Elifoot').factory('Practices', ['$http', function($http) {

  var allPracticesArray = [
    { title: 'Treino 1', description: 'Treino Dummy 1', exercise: '', type: 'Ofensivo', datetime: new Date(), volume: '', intensity: '', density: '', frequency: ''},
    { title: 'Treino 2', description: 'Treino de Adaptação', exercise: '', type: 'Treino de preparação para o jogo a disputar.', datetime: new Date(), volume: '', intensity: '', density: '', frequency: ''},
    { title: 'Treino 3', description: 'Treino Dummy 3', exercise: '', type: 'Ofensivo', datetime: new Date(), volume: '', intensity: '', density: '', frequency: ''},
    { title: 'Treino 4', description: 'Treino Dummy 4', exercise: '', type: 'Defensivo', datetime: new Date(), volume: '', intensity: '', density: '', frequency: ''},
    { title: 'Treino 5', description: 'Treino Dummy 5', exercise: '', type: 'Ofensivo', datetime: new Date(), volume: '', intensity: '', density: '', frequency: ''},
    { title: 'Treino 6', description: 'Treino Dummy 5', exercise: '', type: 'Defensivo', datetime: new Date(), volume: '', intensity: '', density: '', frequency: ''}
  ];

  var availableTypes = [
    {
      selected: false,
      name: 'Transição ofensiva'
    }, {
      selected: false,
      name: 'Transição defensiva'
    }, {
      selected: false,
      name: 'Organização ofensiva'
    }, {
      selected: false,
      name: 'Organização defensiva'
    }, {
      selected: false,
      name: 'Esquemas tacticos'
    }
  ];

  return {
    allPractices: function() {
      return allPracticesArray;
    },

    getAvailableTypes: function() {
      return availableTypes;
    },

    savePracticeDetail: function(detail) {
      allPracticesArray.push(detail);
      console.log(allPracticesArray);
    },

    checkPractice: function(identification) {
      if(identification == undefined) {
        return;
      } else {
        allPracticesArray.get(identification);
      }
    },

    duplicatePractice: function(identification) {
      if(identification == undefined) {
        return;
      } else {
        var practice = allPracticesArray.get(identification);
        practice.identification = practice.identification + ' duplicate';
        allPracticesArray.add(practice);
      }
    },

    removePractice: function(identification) {
      if(identification == undefined) {
        return;
      } else {
        allPracticesArray.remove(identification);
      }
    },

    nearPractice: function(date) {
      return allPracticesArray[1];
      /*for(var i = 0; i < allPracticesArray.length; i++) {
        var nearPractice = allPracticesArray[i];
        if(nearPractice.datetime < moment(date).add(1, 'hours') &&
            nearPractice.datetime > moment(date).add(-1, 'hours')) {
              return nearPractice;
        }
      }*/
    },

    todaysPractices: function(date) {
      var todaysPractices = [];
      for(var i = 0; i < allPracticesArray.length; i++) {
        var nearPractice = allPracticesArray[i];
        todaysPractices[i] = nearPractice;
        /*if(nearPractice.datetime < moment(date).add(1, 'hours') &&
            nearPractice.datetime > moment(date).add(-1, 'hours')) {
              return nearPractice;
        }*/
      }
      return todaysPractices;
    }
  };
}]);
