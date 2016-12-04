var index = angular.module("index", []);

console.log("Load");

index.controller("signin", function($scope, $http){
    $scope.signinaa = function(){
    	console.log($scope.user);
    	$http.post("/authenticate", $scope.user).then(function(response){
    		$scope.verif = "OK";
        console.log(response.data);
    	});
    }
});
