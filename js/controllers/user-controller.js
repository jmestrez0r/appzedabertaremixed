angular.module("Elifoot").controller('UserController',
  function($scope, UserDetails, $location, ngDialog) {

    // INITIAL LOGIN module
    $scope.username = sessionStorage.getItem('user');
    $scope.password;

    if($scope.username == undefined || $scope.username == '' || $scope.username == 'undefined') {
      $location.path('/home');
      return;
    }

    $scope.loadCurrentUserInformation = function() {
      UserDetails.getUserInformation($scope.username).success(function (data) {
        if(data[0] != null && data[0] != '') {
          $scope.userRealName = data[0].name;
          $scope.oldUsername = data[0].username;
          $scope.userPlaceOfBirth = data[0].placeOfBirth;
          $scope.userAge = data[0].age;
          $scope.userPicture = data[0].picture;
          $scope.userNationality = data[0].nationality;
          document.getElementById('avatarImageSourceId').src = $scope.userPicture;

          //blocked fields
          $scope.userTeam = data[0].effectiveTeamName;
          $scope.userProfileType = data[0].profileType;

          if($scope.userProfileType == 'coach') {
            $scope.userProfilePretty = 'Treinador';
          } else if($scope.userProfileType == 'player') {
              $scope.userProfilePretty = 'Treinador';
          } else if($scope.userProfileType == 'manager') {
              $scope.userProfilePretty = 'Dirigente';
          }

          $scope.crestUrl = data[0].crestUrl;
        }
      });
    }

    $scope.updateUserInformationValidation = function() {
      if($scope.oldPassword == undefined || $scope.oldPassword == '') {
        alert('A password é de preenchimento obrigatório.');
        return;
      }

      UserDetails.validatePassword($scope.oldUsername, $scope.oldPassword).success(function (data) {
        if(data[0] == '' || data[0] == null) {
          sessionStorage.setItem('user', '');
          $location.path('/home');
          return;
        }

        //picture
        $scope.userPicture = document.getElementById('avatarImageSourceId').src;
        if($scope.newPassword == undefined) {
          $scope.newPassword = '';
        }

        UserDetails.updateUserInformation($scope.oldUsername, $scope.oldPassword, $scope.newPassword,
          $scope.userPlaceOfBirth, $scope.userAge, $scope.userPicture, $scope.userNationality, $scope.userRealName).success(function (data) {
            if(data == 'Updated user') {
              ngDialog.open({
                  template: 'successMessage.html',
                  className: 'ngdialog-theme-default',
                  showClose: false
              });
            } else {
                sessionStorage.setItem('user', '');
                $location.path('/home');
                return;
            }
          });
      });
    }
});
