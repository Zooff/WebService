var detailUser = angular.module("detailUser", []);

detailUser.controller("getUser", function($scope, $http, $location){
	var $id = $location.search().id;
	$http.get("/users/" + $id).then(function(response){
		$scope.myData = response.data;
	});
});

detailUser.controller("submit", function($scope, $http, $location){
    $scope.submitUpd = function(){
    	var $id = $location.search().id;
    	console.log($scope.user);
    	console.log($id);
    	$http.put("/users/" + $id, $scope.user).then(function(response){
    		window.location.reload();
    		$scope.verif = "OK";
    	});
    };

    $scope.buttonUpdate = function() {
		$scope.upd = !$scope.upd;
    };
});

detailUser.controller("delete", function($scope, $http, $location){
	$scope.delete = function() {
		var $id = $location.search().id;
		$http.delete("/users/" + $id).then(function(response){
			window.location = 'http://localhost:3000/';
			$scope.verif = "OK";
		})
	}
});