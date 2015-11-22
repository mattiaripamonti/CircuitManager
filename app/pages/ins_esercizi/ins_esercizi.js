/**
 * Created by Mattia on 15/11/2015.
 */
angular.module('CircuitManager.ins_esercizi', ['firebase.utils', 'firebase.auth', 'ngRoute','LocalStorageModule'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/ins_esercizi', {
            controller: 'menuleftCtrl',
            templateUrl: 'pages/menu-left/menu-left.html'
        });
    }])

    .controller('Ins_EserciziCtrl', ['$scope', '$location','localStorageService','fbutil', function($scope, $location, localStorageService,fbutil) {

        $scope.exs_form = {};

        $scope.exs_form.autore = localStorageService.get("user_auth");

        $scope.exs_form.attrezzi = [{'id':'att1'}];

        $scope.add_attrezzo = function() {
            var newItemNo = $scope.exs_form.attrezzi.length+1;
            $scope.exs_form.attrezzi.push({'id':'att'+newItemNo});
        };

        $scope.remove_attrezzo = function() {
            var lastItem =  $scope.exs_form.attrezzi.length-1;
            $scope.exs_form.attrezzi.splice(lastItem);
        };


        $scope.insEsercizio = function(){
            $scope.err = null;

            $scope.exs_form.attrezzi = $.map($scope.exs_form.attrezzi, function(value, index) {
               return {id: value.id, quantita: value.quantita, tipo:value.tipo}
            });
            var data_corr = new Date();
            $scope.exs_form.data_agg = data_corr.getTime().toString();
            console.log($scope.exs_form);

            var ref = fbutil.ref('web/ct/esercizi');
                return fbutil.handler(function(cb) {
                    ref.push().set($scope.exs_form, cb);
                });

        };

        function assertValidExsProps() {
            if( !$scope.email ) {
                $scope.err = 'Please enter an email address';
            }
            else if( !$scope.pass || !$scope.confirm ) {
                $scope.err = 'Please enter a password';
            }
            else if( $scope.pass !== $scope.confirm ) {
                $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
        }

        function errMessage(err) {
            return angular.isObject(err) && err.code? err.code : err + '';
        }

    }]);