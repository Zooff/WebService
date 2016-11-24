var home = angular.module("home", []);

home.controller("getUsers", function($scope, $http){
	$http.get("/users").then(function(response){
		$scope.myData = response.data;
	});
});

home.controller("getGroups", function($scope, $http){
	$http.get("/groups").then(function(response){
		$scope.myData = response.data;
	});
});