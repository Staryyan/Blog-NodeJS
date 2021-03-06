/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var app = angular.module('signInApp', []);

app.controller('signInCtrl', function ($scope, $http, $location) {
    $scope.logIn = function () {
        $http({
            url: '../logIn',
            method: 'POST',
            data: {
                username: $scope.username,
                password: parsePassword()
            }}).success(function(data) {
            if (data['succeed']) {
                var cookie = new Cookies();
                cookie.setCookiesAsSession('name', $scope.username);
                window.location.href = './home.html';
            } else {
                $scope.signInWrong = true;
                $scope.wrongInfo = data['error'];
            }
        }).error(function(error) { console.log(error)});
    };

    $scope.register = function () {
        window.location.href = './register.html';
    }
});

function parsePassword() {
    return hex_md5($('#password').val());
}
