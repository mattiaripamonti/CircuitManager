/**
 * Created by Mattia on 15/11/2015.
 */

angular.module('CircuitManager.menuleft', ['firebase.utils', 'firebase.auth', 'ngRoute','snap'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/dashboard', {
            controller: 'menuleftCtrl',
            templateUrl: 'pages/menu-left/menu-left.html'
        });
    }])

    .controller('menuleftCtrl', ['$scope', 'Auth', '$location','snapRemote', function($scope, Auth, $location,snapRemote) {

        $scope.active_link = { template: "pages/dashboard/dashboard.html" };

        $scope.logout = function() {
            Auth.$unauth();
            $location.path('/login');
        };

        $scope.change_page = function(content) {
            $scope.active_link = { template: "pages/"+content+"/"+content+".html" };
            snapRemote.close();
            $scope.menuOpen = false;
        };

    } ]);
