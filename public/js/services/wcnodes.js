angular.module('wcNodeService', [])

	// super simple service
	// each function returns a promise object 
	.factory('WcNodes', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/wcNodes');
			},
			create : function(wcNodeData) {
				return $http.post('/api/wcNodes', wcNodeData);
			},
			delete : function(id) {
				return $http.delete('/api/wcNodes/' + id);
			},
			upvote : function(id) {
				return $http.get('/api/wcNodes/upvote/' + id);
			},
			downvote : function(id) {
				return $http.get('/api/wcNodes/downvote/' + id);
			}
		}
	}]);