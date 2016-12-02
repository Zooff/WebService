var home = angular.module("home", []);

home.controller("getUsers", function($scope, $http){
	$scope.redirectUser = function($id){
		window.location = 'http://localhost:3000/users/detail#!?id=' + $id;
	};
	$http.get("/users").then(function(response){
		$scope.myData = response.data;
	});
});

home.controller("getGroups", function($scope, $http){
	$scope.redirectGroup = function($id){
		window.location = 'http://localhost:3000/groups/detail#!?id=' + $id; 
	};
	$http.get("/groups").then(function(response){
		$scope.myData = response.data;
	});
});
