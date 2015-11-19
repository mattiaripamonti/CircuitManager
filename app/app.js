
angular.module('CircuitManager', [
    'CircuitManager.config',
    'CircuitManager.login',
    'CircuitManager.security',
    'CircuitManager.registration',
    'CircuitManager.dashboard',
    'CircuitManager.ins_esercizi',
    'CircuitManager.menuleft',
    'ui.bootstrap'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/login'
        });
    }])

    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('CircuitManager');
    })

    .run(['$rootScope', 'Auth', function($rootScope, Auth) {
        // track status of authentication
        Auth.$onAuth(function(user) {
            $rootScope.loggedIn = !!user;
        });
    }]);
