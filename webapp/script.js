var app = angular.module('myApp', ['ngRoute']);

app.service('RegionService', function ($http) {
    var service = {
        regions: [],
        region: ''
    };

    $http.get('http://garsh0p.no-ip.biz:5100/regions').
        success(function(data) {
            service.regions = data.regions;
        });

    return service;
});


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:region/rankings', {
        templateUrl: 'rankings.html',
        controller: 'RankingsController',
        activeTab: 'rankings'
    }).
    when('/:region/players', {
        templateUrl: 'players.html',
        controller: 'PlayersController',
        activeTab: 'players'
    }).
    when('/:region/tournaments', {
        templateUrl: 'tournaments.html',
        controller: 'TournamentsController',
        activeTab: 'tournaments'
    }).
    otherwise({
        redirectTo: '/norcal/rankings'
    });
}]);

app.controller("RegionDropdownController", function($scope, $route, RegionService) {
    $scope.regionService = RegionService;
    $scope.$route = $route;
});

app.controller("RankingsController", function($scope, $http, $routeParams, RegionService) {
    RegionService.region = $routeParams.region;

    $http.get('http://garsh0p.no-ip.biz:5100/' + $routeParams.region + '/rankings').
        success(function(data) {
            $scope.data = data;
        });
});

app.controller("TournamentsController", function($scope, $http, $routeParams, RegionService) {
    RegionService.region = $routeParams.region;

    $http.get('http://garsh0p.no-ip.biz:5100/' + $routeParams.region + '/tournaments').
        success(function(data) {
            $scope.data = data;
        });
});

app.controller("PlayersController", function($scope, $http, $routeParams, RegionService) {
    RegionService.region = $routeParams.region;

    $http.get('http://garsh0p.no-ip.biz:5100/' + $routeParams.region + '/players').
        success(function(data) {
            $scope.data = data;
        });
});