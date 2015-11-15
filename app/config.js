/**
 * Created by Mattia on 14/11/2015.
 */


// Declare app level module which depends on filters, and services
angular.module('CircuitManager.config', [])

    // version of this seed app is compatible with angularFire 1.0.0
    // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
    .constant('version', '1.0.0')

    // your Firebase data URL goes here, no trailing slash
    .constant('FBURL', 'https://crackling-inferno-8395.firebaseio.com');
