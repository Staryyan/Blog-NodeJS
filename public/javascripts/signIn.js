/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var app = angular.module('signInApp', []);

app.controller('signInCtrl', function ($scope, $http) {
    $scope.logIn = function () {
        $http({
            url: '../logIn',
            method: 'POST',
            data: {
                username: $scope.username,
                password: $scope.password
            }}).success(function(data) {
            if (data['succeed']) {
                window.location.href = './home.html';
            } else {
                $scope.signInWrong = true;
                $scope.wrongInfo = data['error'];
            }
        }).error(function(error) { console.log(error)});
    };
});
