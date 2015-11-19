angular.module('CircuitManager.login', ['firebase.utils', 'firebase.auth', 'ngRoute','LocalStorageModule'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'pages/login/login.html'
      });
    }])

    .controller('LoginCtrl', ['$scope', 'Auth', '$location','fbutil','$firebaseObject','localStorageService',
        function($scope, Auth, $location,fbutil,$firebaseObject,localStorageService) {
      $scope.email = 'mr.ripamonti@gmail.com';
      $scope.pass = 'admin';

        $scope.registration = function(){
            $location.path('/registration');
        };

      $scope.login = function(email, pass) {
        $scope.err = null;
        Auth.$authWithPassword({ email: email, password: pass }, {rememberMe: true})
            .then(function(response) {
                var user_auth = $firebaseObject(fbutil.ref('web/users', response.uid));
                user_auth.$loaded()
                    .then(function(data) {
                        console.log(data);
                        localStorageService.set('user_auth', data.name);
                        $location.path('/main');
                    });
            }, function(err) {
              $scope.err = errMessage(err);
            });
      };

      function errMessage(err) {
        return angular.isObject(err) && err.code? err.code : err + '';
      }



    }]);