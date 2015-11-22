/**
 * Created by Mattia on 15/11/2015.
 */
angular.module('CircuitManager.new_scheda', ['firebase.utils', 'ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/new_scheda', {
            controller: 'menuleftCtrl',
            templateUrl: 'pages/menu-left/menu-left.html'
        });
    }])

    .controller('New_SchedaCtrl', ['$scope','$location','$firebaseArray','fbutil', function($scope, $location, $firebaseArray,fbutil) {

        var ref = fbutil.ref('web/ct/esercizi');
        var list = $firebaseArray(ref);

        list.$loaded()
            .then(function(schede) {
                console.log(schede)
               $scope.exs_list = schede;
            })
            .catch(function(error) {
                console.log("Error:", error);
            });


        $scope.expand_exs = function(exs){
            $scope.exs_detail = exs
        }


    }]);