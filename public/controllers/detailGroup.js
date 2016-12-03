angular.module('webapp')

.controller("getGroup", function($scope, $http, $routeParams, authService){
	var $id = $routeParams.id;
	console.log($id);
	$http.get("/api/groups/" + $id).then(function(response){
		$scope.myData = response.data;
		console.log(response.data.board);
	});
})

.controller("submitGr", function($scope, $http, $routeParams, authService){
    $scope.submitUpd = function(){
    	var $id = $routeParams.id;
    	console.log($scope.group);
    	console.log($id);
    	$http.put("/api/groups/" + $id, $scope.group).then(function(response){
    		window.location.reload();
    		$scope.verif = "OK";
    	});
    };

    $scope.buttonUpdate = function() {
		$scope.upd = !$scope.upd;
    };

    $scope.submitComm = function(){
    	var $id = $routeParams.id;
    	console.log($scope.group);
    	console.log($id);
    	$http.post("/api/groups/" + $id + "/addComment", $scope.comment).then(function(response){
    		window.location.reload();
    		$scope.verif = "OK";
    	});
    };

    $scope.buttonAddComm = function() {
    	$scope.comm = !$scope.comm;
    };
})

.controller("deleteGr", function($scope, $http, authService){
	$scope.delete = function(){
		var $id = $routeParams.id;
		$http.delete("/api/groups/" + $id).then(function(response){
			window.location = '/home';
			$scope.verif = "OK";
		});
	};
});
