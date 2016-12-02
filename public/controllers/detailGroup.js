var detailGroup = angular.module("detailGroup", []);

detailGroup.controller("getGroup", function($scope, $http, $location){
	var $id = $location.search().id;
	$http.get("/groups/" + $id).then(function(response){
		$scope.myData = response.data;
	});
});

detailGroup.controller("submit", function($scope, $http, $location){
    $scope.submitUpd = function(){
    	var $id = $location.search().id;
    	console.log($scope.group);
    	console.log($id);
    	$http.put("/groups/" + $id, $scope.group).then(function(response){
    		window.location.reload();
    		$scope.verif = "OK";
    	});
    }

    $scope.buttonUpdate = function() {
		$scope.upd = !$scope.upd;
    }

    $scope.submitComm = function(){
    	var $id = $location.search().id;
    	console.log($scope.group);
    	console.log($id);
    	$http.post("/groups/" + $id + "/addComment", $scope.comment).then(function(response){
    		window.location.reload();
    		$scope.verif = "OK";
    	});
    }

    $scope.buttonAddComm = function() {
    	$scope.comm = !$scope.comm;
    }
});
