angular.module("Elifoot", ['ngRoute', 'ui.calendar', 'kendo.directives',
  'ngDragDrop', 'ngDialog', 'ngCookies', 'chart.js'])
  .directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        var INTEGER_REGEXP = /^-?\d+$/;
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        alert('Campo Inválido!');

        viewValue = '';
        modelValue = '';
        // it is invalid
        return false;
      };
    }
  };
});
