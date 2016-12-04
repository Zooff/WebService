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
    };

    $scope.buttonUpdate = function() {
		$scope.upd = !$scope.upd;
    };

    $scope.submitComm = function(){
    	var $id = $location.search().id;
    	console.log($scope.group);
    	console.log($id);
    	$http.post("/groups/" + $id + "/addComment", $scope.comment).then(function(response){
    		window.location.reload();
    		$scope.verif = "OK";
    	});
    };

    $scope.buttonAddComm = function() {
    	$scope.comm = !$scope.comm;
    };
});

detailGroup.controller("action", function($scope, $http, $location){
	$scope.delete = function(){
		var $id = $location.search().id;
		$http.delete("/groups/" + $id).then(function(response){
			window.location = 'http://localhost:3000/home';
			$scope.verif = "OK";
		});
	};

	$scope.join = function(){
		var $id = $location.search().id;
		$http.put("/groups/" + $id + "join/" + $iduser).then(function(response){
			window.location.reload();
		})
	}

	$scope.leave = function(){
		var $id = $location.search().id;
		$http.put("/groups/" + $id + "leave/" + $iduser).then(function(response){
			window.location.reload();
		})
	}
});
