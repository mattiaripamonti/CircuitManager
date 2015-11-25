/**
 * Created by Mattia on 15/11/2015.
 */
angular.module('CircuitManager.new_scheda', ['firebase.utils', 'ngRoute', 'ngDragDrop'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/new_scheda', {
            controller: 'menuleftCtrl',
            templateUrl: 'pages/menu-left/menu-left.html'
        });
    }])

    .controller('New_SchedaCtrl', ['$scope','$location','$firebaseArray','fbutil', function($scope, $location, $firebaseArray,fbutil) {

        $scope.scheda_form = {};
        $scope.scheda_form.id_es = [];
        $scope.scheda_form.tot_attrezzi = [];
        $scope.exs_scheda = [];

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return false;
        }

        var ref = fbutil.ref('web/ct/esercizi');
        var list = $firebaseArray(ref);

        list.$loaded()
            .then(function(schede) {
                console.log(schede);
               $scope.exs_list = schede;
            })
            .catch(function(error) {
                console.log("Error:", error);
            });


        $scope.$watchCollection('exs_scheda', function() {

            $scope.scheda_form.tot_attrezzi = [];
            var tot_attrezzi = [];
            var tot_diff = 0;

            //CALCOLO ATTREZZI

            for (i=0; i<$scope.exs_scheda.length; i++) {
                for (x=0; x<$scope.exs_scheda[i].attrezzi.length; x++) {
                    tot_attrezzi.push($scope.exs_scheda[i].attrezzi[x]);
                }
            }

            angular.forEach(tot_attrezzi, function(value, key) {
                if (Number.isInteger(arrayObjectIndexOf($scope.scheda_form.tot_attrezzi, value.tipo, "tipo"))){
                    $scope.scheda_form.tot_attrezzi[arrayObjectIndexOf($scope.scheda_form.tot_attrezzi, value.tipo, "tipo")].quantita = (parseInt($scope.scheda_form.tot_attrezzi[arrayObjectIndexOf($scope.scheda_form.tot_attrezzi, value.tipo, "tipo")].quantita) + parseInt(value.quantita));
                } else {
                    $scope.scheda_form.tot_attrezzi.push({quantita: value.quantita, tipo:value.tipo})
                }
            });

            //CALCOLO DIFF

            for (i=0; i<$scope.exs_scheda.length; i++) {
                switch($scope.exs_scheda[i].diff) {
                    case "Bassa":
                        tot_diff = (tot_diff+1);
                        break;
                    case "Media":
                        tot_diff = (tot_diff+2);
                        break;
                    case "Alta":
                        tot_diff = (tot_diff+3);
                        break;
                }
            }

            if (tot_diff/$scope.exs_scheda.length > 1.5 && tot_diff/$scope.exs_scheda.length <= 2.3){
                $scope.scheda_form.diff = "Media";
            } else if (tot_diff/$scope.exs_scheda.length > 2.3){
                $scope.scheda_form.diff = "Alta";
            } else {
                $scope.scheda_form.diff = "Bassa";
            }

        });


        $scope.insScheda = function(){
            $scope.err = null;
            
            var data_corr = new Date();
            $scope.scheda_form.data_agg = data_corr.getTime().toString();

            angular.forEach($scope.exs_scheda, function(value, key) {
                $scope.scheda_form.id_es.push({id: value.$id});
            });

            console.log($scope.scheda_form);

            var ref = fbutil.ref('web/ct/schede');
            return fbutil.handler(function(cb) {
                ref.push().set($scope.scheda_form, cb);
            });


        };


        $scope.expand_exs = function(exs){
            $scope.exs_detail = exs;
        }


    }]);