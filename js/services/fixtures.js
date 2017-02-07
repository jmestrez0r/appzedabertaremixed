angular.module('Elifoot').factory('Fixtures', ['$http', function($http) {
  return {
    all: function() {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/fixtures',
            headers: {
              'X-Auth-Token': 'db1386cd081342f8a0339d58d7a174e3'
            }
        });
    }
  };
}])
