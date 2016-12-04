angular.module('webapp')

.controller("getGroup", function($scope, $http, $routeParams, authService){
	var $id = $routeParams.id;
	console.log($id);
	$http.get("/api/groups/" + $id).then(function(response){
		$scope.myData = response.data;
		$scope.size = response.data.board.length;
		console.log($scope.size);
	});
	$scope.range = function(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
        input.push(i);
    }
    return input;
};
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
    	console.log($id);
			console.log($scope.comment);
    	$http.post("/api/groups/" + $id + "/addComment", $scope.comment).then(function(response){
    		window.location.reload();
    		$scope.verif = "OK";
    	});
    };

    $scope.buttonAddComm = function() {
    	$scope.comm = !$scope.comm;
    };
})

.controller("deleteGr", function($scope, $http, $routeParams, authService){
	$scope.delete = function(){
		var $id = $routeParams.id;
		$http.delete("/api/groups/" + $id).then(function(response){
			window.location = '/home';
			$scope.verif = "OK";
		});
	};

	$scope.join = function(){
		var $id = $routeParams.id;
		$http.put("api/groups/" + $id + "/join").then(function(response){
			window.location.reload();
		});
	}

	$scope.leave = function(){
		var $id = $routeParams.id;
		$http.put("api/groups/" + $id + "/leave").then(function(response){
			window.location.reload();
		});
	};
});
