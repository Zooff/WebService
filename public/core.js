var webapp = angular.module('webapp', ['ngRoute']);

webapp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider
    .when('/' , {
      templateUrl : 'views/signin.html',
      controller : 'signin'
    })
    .when('/signup', {
      templateUrl : 'views/signup.html',
      controller : 'signup'
    })
    .when('/home' , {
      templateUrl : 'views/home.html',
    })
    .when('/users/:id', {
      templateUrl : 'views/detailUser.html'
    })
    .when('/groups/createGroup', {
      templateUrl : 'views/createGroup.html'
    })
    .when('/groups/:id' ,{
      templateUrl : 'views/detailGroup.html'
    })
    .otherwise({
      redirectTo : '/'
    });
  $locationProvider.html5Mode(true);
}]);
