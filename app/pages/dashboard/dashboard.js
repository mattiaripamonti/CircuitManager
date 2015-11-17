/**
 * Created by Mattia on 15/11/2015.
 */
angular.module('CircuitManager.dashboard', ['firebase.utils', 'firebase.auth', 'ngRoute','LocalStorageModule','snap'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/dashboard', {
            templateUrl: 'pages/dashboard/dashboard.html'
        });
    }])

    .controller('DashCtrl', ['$scope', 'Auth', '$location','localStorageService', function($scope, Auth, $location, localStorageService) {

        $scope.user_auth = localStorageService.get("user_auth");

    }]);