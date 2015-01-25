(function() {
  var app = angular.module('api', []);

  app.directive('searchDemo', function() {
    return {
      restrict: 'E',
      templateUrl: 'search.html'
    }
  });

  app.controller('SearchController', ['$http', '$scope', function($http, $scope) {

    $scope.request = {
      page_size: 15,
      page: 1,
      phrase: 'dog',
      fields: 'id,title,thumb'
    };

    $scope.send = function(request) {

      $scope.isLoading = true;

      if(!request.page) {
        delete request.page
      }

      if(!request.phrase) {
        delete request.phrase;
      }

      if(!request.page_size) {
        delete request.page_size;
      }

      var req = {
        method: 'GET',
        url: 'https://connect.gettyimages.com/v3/search/images',
        headers: {
          'Api-Key': '7wjf4bsm2gpahzdm6yetrz2t'
        },
        params: request
      };

      $scope.apirequest = req.url + '?' + serialize(req.params);
      $http(req).success(function(data, status, headers, config) {
        $scope.isLoading = false;
        $scope.apiresponse = data;
        $scope.responsecode = status;
      }).error(function(data, status, headers, config) {
        $scope.isLoading = false;
        $scope.apiresponse = data;
        $scope.responsecode = status;
      });
    };

  }]);

  var serialize = function(dictionary) {
    var query = []
    for (key in dictionary) {
      query.push(key + '=' + dictionary[key]);
    }

    return query.join('&');
  }

})();
