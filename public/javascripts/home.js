/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var app = angular.module('homeApp', []);

app.controller('homeArticlesListCtrl', function ($scope, $http) {
   loadArticles();
    
    function loadArticles() {
        $http({
            url: '../loadArticles',
            method: 'GET'
        }).success(function (data) {
            $scope.articlesList = data['articlesList'];
        }).error(function (error) {
            console.log(error);
        })
    }
});