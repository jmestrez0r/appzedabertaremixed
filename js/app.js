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

          if(viewValue >= 0 && viewValue <= 100) {
            // it is valid
            return true;
          } else {
            alert('Insira um valor entre 0 e 100!');
            viewValue = '';
            modelValue = '';
            return false;
          }
        }
      };

      ctrl.$validators.integerHeight = function(modelValue, viewValue) {
        var INTEGER_REGEXP = /^-?\d+$/;
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          if(viewValue >= 0 && viewValue <= 250) {
            // it is valid
            return true;
          } else {
            alert('250cms é o limite máximo de Altura!');
            viewValue = '';
            modelValue = '';
            return false;
          }
        }
      };

      ctrl.$validators.decimalWeight = function(modelValue, viewValue) {
        var DECIMAL_REGEXP = /^\d+(\.\d{1,2})?$/;
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (DECIMAL_REGEXP.test(viewValue)) {
          if(viewValue >= 0 && viewValue <= 150) {
            // it is valid
            return true;
          } else {
            alert('150kgs é o limite máximo de Peso!');
            viewValue = '';
            modelValue = '';
            return false;
          }
        }
      };
    }
  };
});
