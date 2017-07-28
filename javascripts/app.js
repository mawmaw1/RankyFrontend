var TIMER_VALUE = 5000;

//var HOST = "http://139.59.211.36/rankyTest";
 var HOST = "http://localhost:3020/rankyTest";


angular.module("players", ['ng','ngRoute'])
    .controller('playersCtrl', function ($http, $scope, $timeout) {

        $timeout(getPlayers, 0);

        function getPlayers() {

            $http({
                method: 'GET',
                url: HOST + '/api/players'
            }).then(function successCallback(res) {
                $scope.players = res.data;
                $timeout(getPlayers, TIMER_VALUE);
            }, function errorCallback(res) {
                $scope.error = res.status + ": " + res.data.statusText;
            });
        }

    }).controller('matchesCtrl', function ($http, $scope, $timeout, $filter) {

    $timeout(getMatches, 0);

    function getMatches() {

        $http({
            method: 'GET',
            url: HOST + '/api/matches'
        }).then(function successCallback(res) {
            $scope.matches = res.data;
            $timeout(getMatches, TIMER_VALUE);
        }, function errorCallback(res) {
            $scope.error = res.status + ": " + res.data.statusText;
        });
    }


}).controller('NewMatches', function ($http, $scope, $timeout, $location) {

    $timeout(getPlayers, 0);

    function getPlayers() {

        $http({
            method: 'GET',
            url: HOST + '/api/players'
        }).then(function successCallback(res) {
            $scope.players = res.data;
            $timeout(getPlayers, 2000000);
        }, function errorCallback(res) {
            $scope.error = res.status + ": " + res.data.statusText;
        });
    }

    $scope.newMatch = function (match) {

        var newMatch = {
            "team1":[
                match.score1,
                match.player1,
                match.player2
            ],
            "team2":[
                match.score2,
                match.player3,
                match.player4
            ]

        }

        $http.post(HOST + "/api/matches", newMatch).then(
            function ok(res) {
                alert("Match was successfully created!")
                $location.path("/Ranking")
            },
            function error(res) {
                console.log(res);
            });
    };


})

    .config(function ($routeProvider) {
        $routeProvider
            .when("/Ranking", {
                templateUrl: "views/Ranking.html",
                controller: "playersCtrl"
            })
            .when("/Matches", {
                templateUrl: "views/Matches.html",
                controller: "matchesCtrl"
            })
            .when("/NewMatch", {
                templateUrl: "views/NewMatch.html",
                controller: "NewMatches"
            })
            .otherwise({
                redirectTo: "/Ranking"
            });
    }).filter('makeBold', function () {

}).filter('range', function () {
    return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i < max; i++)
            input.push(i);
        return input;
    };
});