/**
 * Created by Mattia on 15/11/2015.
 */
angular.module('CircuitManager.schede_comp', ['firebase.utils', 'ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/schede_comp', {
            controller: 'menuleftCtrl',
            templateUrl: 'pages/menu-left/menu-left.html'
        });
    }])

    .controller('Schede_CompCtrl', ['$scope','$location','$firebaseArray','fbutil', function($scope, $location, $firebaseArray,fbutil) {

        var ref = fbutil.ref('web/ct/schede');
        var list = $firebaseArray(ref);

        list.$loaded()
            .then(function(schede) {
               $scope.schede_comp = schede;
            })
            .catch(function(error) {
                console.log("Error:", error);
            });


    }]);