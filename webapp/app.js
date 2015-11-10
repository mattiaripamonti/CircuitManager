/**
 * Created by Mattia on 07/11/2015.
 */

var app = angular.module('CircuitManger',[
    'controllers',
    'services',
    'directives',
    'ngRoute',
    'ngAnimate',
    'ngAria',
    'lumx'
]);

angular.module('controllers', []);

angular.module('services', []);

angular.module('directives', []);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "view/login.html"
        })
    ;
});
