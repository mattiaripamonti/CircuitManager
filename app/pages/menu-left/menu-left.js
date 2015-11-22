/**
 * Created by Mattia on 15/11/2015.
 */

angular.module('CircuitManager.menuleft', ['firebase.utils', 'firebase.auth', 'ngRoute','snap'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/main', {
            controller: 'menuleftCtrl',
            templateUrl: 'pages/menu-left/menu-left.html'
        });
    }])

    .controller('menuleftCtrl', ['$scope', 'Auth', '$location','snapRemote', function($scope, Auth, $location,snapRemote) {

        function get_page(location){
            if (location != '/main'){
                $scope.active_link = { template: "pages"+location+location+".html" };
                $location.path(location);
            } else {
                $scope.active_link = { template: 'pages/dashboard/dashboard.html' };
            }
        }

        get_page($location.path());

        $scope.logout = function() {
            Auth.$unauth();
            $location.path('/login');
        };

        $scope.change_page = function(content) {
            $scope.active_link = { template: "pages/"+content+"/"+content+".html" };
            $location.path("/"+content);
            snapRemote.close();
            $scope.menuOpen = false;
        };

    } ]);
