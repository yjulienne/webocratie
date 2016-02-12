angular.module('wcNodeController', [])

	// inject the WcNode service factory into our controller
	.controller('mainController', ['$scope','$http','WcNodes', function($scope, $http, WcNodes) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all wcNodes and show them
		// use the service to get all the wcNodes
		WcNodes.get()
			.success(function(data) {
				$scope.wcNodes = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createWcNode = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				WcNodes.create($scope.formData)

					// if successful creation, call our get function to get all the new wcNodes
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.wcNodes = data; // assign our new list of wcNodes
					});
			}
		};

		// DELETE ==================================================================
		// delete a wcNode after checking it
		$scope.deleteWcNode = function(id) {
			$scope.loading = true;

			WcNodes.delete(id)
				// if successful creation, call our get function to get all the new wcNodes
				.success(function(data) {
					$scope.loading = false;
					$scope.wcNodes = data; // assign our new list of wcNodes
				});
		};
	}]);