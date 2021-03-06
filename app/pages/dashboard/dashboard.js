/**
 * Created by Mattia on 15/11/2015.
 */
angular.module('CircuitManager.dashboard', ['firebase.utils', 'firebase.auth', 'ngRoute','LocalStorageModule'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/dashboard', {
            controller: 'menuleftCtrl',
            templateUrl: 'pages/menu-left/menu-left.html'
        });
    }])

    .controller('DashCtrl', ['$scope', 'Auth', '$location','localStorageService', function($scope, Auth, $location, localStorageService) {

        $scope.user_auth = localStorageService.get("user_auth");

    }]);