angular.module('Elifoot').factory('Practices', ['$http', function($http) {

  var allPracticesArray = [
    { identification: 'Treino 1', description: 'Treino Dummy 1', type: 'Ofensivo', datetime: new Date()},
    { identification: 'Treino 2', description: 'Treino de Adaptação', type: 'Treino de preparação para o jogo a disputar.', datetime: new Date()},
    { identification: 'Treino 3', description: 'Treino Dummy 3', type: 'Ofensivo', datetime: new Date()},
    { identification: 'Treino 4', description: 'Treino Dummy 4', type: 'Defensivo', datetime: new Date()},
    { identification: 'Treino 5', description: 'Treino Dummy 5', type: 'Ofensivo', datetime: new Date()}
  ];

  return {
    allPractices: function() {
      return allPracticesArray;
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
