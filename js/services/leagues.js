angular.module('Elifoot').factory('Leagues', ['$http', function($http) {
  return {
    all: function() {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/competitions/',
            headers: {
              'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
            }
        });
    }
  };
}]);
