/**
 * Created by Mattia on 15/11/2015.
 */
angular.module('CircuitManager.registration', ['firebase.utils', 'firebase.auth', 'ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registration', {
            controller: 'RegistrationCtrl',
            templateUrl: 'pages/registration/registration.html'
        });
    }])

    .controller('RegistrationCtrl', ['$scope', 'Auth', '$location', 'fbutil', function($scope, Auth, $location, fbutil) {
        $scope.name = null;
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;



        $scope.createAccount = function() {
            $scope.err = null;
            console.log("start reg");
            if( assertValidAccountProps() ) {
                var name = $scope.name;
                var email = $scope.email;
                var pass = $scope.pass;
                // create user credentials in Firebase auth system
                Auth.$createUser({email: email, password: pass})
                    .then(function() {
                        // authenticate so we have permission to write to Firebase
                        return Auth.$authWithPassword({email: email, password: pass });
                    })
                    .then(function(user) {
                        console.log(user);
                        // create a user profile in our data store
                        var ref = fbutil.ref('web/users', user.uid);
                        return fbutil.handler(function(cb) {
                            ref.set({email: email, name: name}, cb);
                        });
                    })
                    .then(function(/* user */) {
                        // redirect to the dashboard page
                        $location.path('/login');
                    }, function(err) {
                        $scope.err = errMessage(err);
                    });
            }
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