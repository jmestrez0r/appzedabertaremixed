angular.module('Elifoot').factory('Fixtures', ['$http', function($http) {
  return {
    all: function() {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/fixtures',
            headers: {
              'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
            }
        });
    }
  };
}])
