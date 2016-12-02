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
    }

    $scope.buttonUpdate = function() {
		$scope.upd = !$scope.upd;
    }
});