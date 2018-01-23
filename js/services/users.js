angular.module('Elifoot').factory('UserDetais', ['$http', function($http) {
  return {
    validatePassword: function(user, password) {
      return $http.post('./js/services/phpservices/userinformation/validatePassword.php', {'user' : user, 'password' : password});
    },
    getUserInformation: function(user) {
      //verify first in the database
      return $http.post('./js/services/phpservices/userinformation/getUser.php', {'user' : user});
    }
  };
}]);
