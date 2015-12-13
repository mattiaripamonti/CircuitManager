/**
 * Created by Mattia on 15/11/2015.
 */
angular.module('CircuitManager.mod_esercizi', ['firebase.utils', 'ngRoute', 'ngDragDrop'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/mod_esercizi', {
            controller: 'menuleftCtrl',
            templateUrl: 'pages/menu-left/menu-left.html'
        });
    }])

    .controller('Mod_EserciziCtrl', ['$scope','$location','$firebaseArray','fbutil', function($scope, $location, $firebaseArray, fbutil) {

        var ref = fbutil.ref('web/ct/esercizi');
        var list = $firebaseArray(ref);

        list.$loaded()
            .then(function(schede) {
               $scope.exs_list = schede;
                console.log($scope.exs_list)
            })
            .catch(function(error) {
                console.log("Error:", error);
            });

        $scope.expand_exs = function(exs){
            $scope.exs_form = exs;
            console.log($scope.exs_form)
        };

        $scope.add_attrezzo = function() {
            var newItemNo = $scope.exs_form.attrezzi.length+1;
            $scope.exs_form.attrezzi.push({'id':'att'+newItemNo});
        };

        $scope.remove_attrezzo = function() {
            var lastItem =  $scope.exs_form.attrezzi.length-1;
            $scope.exs_form.attrezzi.splice(lastItem);
        };


        $scope.modEsercizio = function(){
            $scope.err = null;

            $scope.exs_form.attrezzi = $.map($scope.exs_form.attrezzi, function(value, index) {
                return {id: value.id, quantita: value.quantita, tipo:value.tipo}
            });

            var data_corr = new Date();
            $scope.exs_form.data_agg = data_corr.getTime().toString();

            list.$save(list.$indexFor($scope.exs_form.$id)).then(function(ref) {
                console.log(ref.key());
            })
                .catch(function(error) {
                    console.log("Error:", error);
                });
        };
    }]);