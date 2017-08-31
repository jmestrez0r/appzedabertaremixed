angular.module('Elifoot').factory('Fixtures', ['$http', function($http) {
  return {
    all: function(teamId) {
        return $http({
            method: 'GET',
            url: 'http://api.football-data.org/v1/teams/'+teamId+'/fixtures',
            headers: {
              'X-Auth-Token': sessionStorage.getItem('X-Auth-Token')
            }
        });
    }
  };
}])
