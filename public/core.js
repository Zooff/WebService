var index = angular.module("index", []);

index.controller("f", function($scope){
    $scope.test = "Ju";
});

index.controller("getUsers", function($scope, $http){
	$http.get("/users").then(function(response){
		$scope.myData = response.data;
	});
});

index.controller("getGroups", function($scope, $http){
	$http.get("/groups").then(function(response){
		$scope.myData = response.data;
	});
});