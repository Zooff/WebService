var createGroup = angular.module("createGroup", []);

createGroup.controller("submit", function($scope, $http){
    $scope.submit = function(){
    	console.log($scope.group);
    	$http.post("/groups/createGroup", $scope.group).then(function(response){
    		$scope.verif = "OK";
    	});
    }
});