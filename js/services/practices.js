angular.module('Elifoot').factory('Practices', ['$http', function($http) {

  return {
    getPracticesList: function() {
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
