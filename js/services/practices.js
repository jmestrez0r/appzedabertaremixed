angular.module('Elifoot').factory('Practices', ['$http', function($http) {

  var allPracticesArray = [
    {identification: 'Treino 1', description: 'Treino Dummy 1'},
    {identification: 'Treino 2', description: 'Treino Dummy 2'},
    {identification: 'Treino 3', description: 'Treino Dummy 3'},
    {identification: 'Treino 4', description: 'Treino Dummy 4'},
    {identification: 'Treino 5', description: 'Treino Dummy 5'}
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
    }
  };
}]);
