angular.module('webapp')

.controller("signup", function($scope, $http, authService){
    $scope.verif ="";
    $scope.submit = function(){
    	console.log($scope.user);
    	authService.signup($scope.user).then(function(response){
    		$scope.verif = "OK";
        console.log(response.data);
    	});
    }
});
