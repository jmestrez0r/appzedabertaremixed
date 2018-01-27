angular.module('Elifoot').factory('UserDetails', ['$http', function($http) {
  return {
    validatePassword: function(user, password) {
      return $http.post('./js/services/phpservices/userinformation/validatePassword.php', {'user' : user, 'password' : password});
    },
    getUserInformation: function(user) {
      //verify first in the database
      return $http.post('./js/services/phpservices/userinformation/getUser.php', {'user' : user});
    },
    updateUserInformation: function(oldUsername, oldPassword, newPassword,
      userPlaceOfBirth, userAge, userPicture, userNationality, name) {
      return $http.post('./js/services/phpservices/userinformation/updateUser.php', {
          'oldUser': oldUsername,
          'oldPassword': oldPassword,
          'newPassword': newPassword,
          'placeOfBirth': userPlaceOfBirth,
          'age': userAge,
          'picture': userPicture,
          'nationality': userNationality,
          'name': name
      });
    }
  };
}]);
