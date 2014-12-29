var app = angular.module('timezoneFinderApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
    when('/welcome', {
      templateUrl: 'welcome.html',
      controller: 'MainController'
    }).
    when('/list', {
      templateUrl: 'list.html',
      controller: 'MainController'
    }).
    otherwise({
      redirectTo: '/welcome'
    });
}]);

app.directive('cityTimezone', function() {
  return {
    scope: {
      city: '=city'
    },
    template: 'The timezone in {{city.name}} is {{city.timezone}}.',
  };
});

app.controller('MainController', ['$scope', function($scope) {
  // Defines our cities.
  $scope.cities = [
    { name: 'London', timezone: 'GMT' },
    { name: 'Tokyo', timezone: 'JST' },
    { name: 'Melbourne', timezone: 'EDT' },
    { name: 'Los Angeles', timezone: 'PST' },
    { name: 'New York', timezone: 'EST' }
  ];

  // The default city.
  $scope.selectedCity = $scope.cities[0];
}]);