var myApp = angular.module('contactsApp',[]);
myApp.controller('appCtrl', ['$scope', '$http', function($scope,$http){
	
	var refresh = function(){
		$http.get('/contList').then(function(response){
			console.log("i got data i requested");
			$scope.conList = response.data;
			// console.log($scope.conList);
			$scope.list = {};
		});
	};
	refresh();
	$scope.addContact = function(){
		console.log($scope.list);
		$http.post('/contList',$scope.list).then(function(response){
			// console.log(response);
			refresh();
		});
	};
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contList/' + id).then(function(response){
			console.log(response);
			refresh();
		});
	};
	$scope.edit  = function(id){
		$http.get('/contList/' + id).then(function(response){
			console.log(response);
			$scope.list = response.data;
		});
	};
	$scope.update = function(){
		console.log($scope.list._id);
		$http.put('/contList/' + $scope.list._id, $scope.list).then(function(response){
			refresh();
		});
	};

}]);