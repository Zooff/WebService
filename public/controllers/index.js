angular.module('webapp')

.controller("signin", function($scope, $http, authService){
    $scope.signin = function(){
      authService.login($scope.user, function(res){
        window.location = "/home";
      }, function(res){
        alert(res.data);
      });
    };

    $scope.moveTosignUp = function(){
      window.location = '/signup';
    }
});
