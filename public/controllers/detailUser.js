angular.module('webapp')

.controller("getUser", function($scope, $http, $routeParams, authService){
	var $id = $routeParams.id;
	$http.get("/api/users/" + $id).then(function(response){
		$scope.myData = response.data;
	});
})

.controller("submitUs", function($scope, $http, $routeParams, authService){
    $scope.submitUpd = function(){
    	var $id = $routeParams.id;
    	console.log($scope.user);
    	console.log($id);
    	$http.put("/api/users/" + $id, $scope.user).then(function(response){
    		//window.location.reload();
    		$scope.verif = "OK";
    	});
    };

    $scope.buttonUpdate = function() {
		$scope.upd = !$scope.upd;
    };
})
.controller("deleteUs", function($scope, $http, $routeParams, authService){
	$scope.delete = function() {
		var $id = $routeParams.id;
		$http.delete("/api/users/" + $id).then(function(response){
			window.location = '/';
			$scope.verif = "OK";
		})
	}
});
