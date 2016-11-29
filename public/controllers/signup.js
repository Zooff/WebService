var signup = angular.module("signup", []);

signup.controller("submit", function($scope, $http){
    $scope.submit = function(){
    	console.log($scope.user);
    	$http.post("/users/signup", $scope.user).then(function(response){
    		$scope.verif = "OK";
    	});
    }
});