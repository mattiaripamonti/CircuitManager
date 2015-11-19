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

    .controller('Ins_EserciziCtrl', ['$scope', 'Auth', '$location','localStorageService', function($scope, Auth, $location, localStorageService) {

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
                console.log(value);
                console.log(value.tipo);
                console.log(value.quantita);
                var json = {[value.tipo]: value.quantita};
                return json
            });

            console.log($scope.exs_form);
            //if( assertValidAccountProps() ) {
            //    var name = $scope.name;
            //    var email = $scope.email;
            //    var pass = $scope.pass;
            //    // create user credentials in Firebase auth system
            //    Auth.$createUser({email: email, password: pass})
            //        .then(function() {
            //            // authenticate so we have permission to write to Firebase
            //            return Auth.$authWithPassword({email: email, password: pass });
            //        })
            //        .then(function(user) {
            //            console.log(user);
            //            // create a user profile in our data store
            //            var ref = fbutil.ref('web/users', user.uid);
            //            return fbutil.handler(function(cb) {
            //                ref.set({email: email, name: name}, cb);
            //            });
            //        })
            //        .then(function(/* user */) {
            //            // redirect to the dashboard page
            //            $location.path('/login');
            //        }, function(err) {
            //            $scope.err = errMessage(err);
            //        });
            //}
        };

        function assertValidAccountProps() {
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