var signup = angular.module("signup", []);

signup.controller("test", function($scope){
    $scope.test = "Ju";
});

signup.controller("submit", function($scope, $http){
    $scope.submit = function(){
    	console.log($scope.user);
    	$http.post("/users/signup", $scope.user).then(function(response){
    		$scope.verif = "OK";
    	});
    }
});