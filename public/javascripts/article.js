/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */

var app = angular.module('articleApp', []);

app.controller('articleContentCtrl', function ($scope, $http, $location) {

    loadArticle();

    function loadArticle() {
        var url = $location.absUrl();
        console.log(url);
        var id = url.substr(url.indexOf('id=') + 3);

        $http({
            url: '../loadArticleDetail',
            method: 'POST',
            data: {
                id: id
            }
        }).success(function (data) {
            $scope.title = data['title'];
            $scope.author = data['author'];
            $scope.date = data['date'];
            $scope.content = data['content'];
        }).error(function (error) {
            console.log(error);
        })
    }

});
