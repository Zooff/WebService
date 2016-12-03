angular.module('webapp')

.controller("getUsers", function($scope, $http, authService){
	$scope.redirectUser = function($id){
		window.location = '/users/' + $id;
	};
	$http.get("/api/users").then(function(response){
		$scope.myData = response.data;
	});
})

.controller("getGroups", function($scope, $http, authService){
	$scope.redirectGroup = function($id){
		window.location = '/groups/' + $id;
	};
	$http.get("/api/groups").then(function(response){
		$scope.myData = response.data;
	});
});
