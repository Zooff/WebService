angular.module('webapp')
.controller("submit", function($scope, $http, authService){
    $scope.submit = function(){
    	console.log($scope.group);
    	$http.post("/api/groups/createGroup", $scope.group).then(function(response){
    		$scope.verif = "OK";
    	});
    }
});
