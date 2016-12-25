/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var app = angular.module('homeApp', []);

app.controller('homeArticlesListCtrl', function ($scope, $http) {
    loadArticles();
    
    $scope.deleteArticle = function (id) {
        $scope.deleteId = id;
        $('#deleteModal').modal();
    };

    $scope.commitDelete = function () {
        $http({
            url: '../deleteArticle',
            method: 'POST',
            data: {
                id: $scope.deleteId
            }
        }).success(function (data) {
            window.location.href = './home.html'
        }).error(function (error) {
            console.log(error);
        })
    };


    function loadArticles() {
        $http({
            url: '../loadArticles',
            method: 'GET'
        }).success(function (data) {
            $scope.articlesGlobalList = data['articlesList'];
            showPerPage();
        }).error(function (error) {
            console.log(error);
        })
    }

    function showPerPage() {
        $scope.totalPages = Math.ceil($scope.articlesGlobalList.length / 5);
        $scope.nowPages = 1;
        $scope.page = [];
        $scope.articlesList = [];
        computeNav();
        computeArticles();
    }

    function computeNav() {
        var isActive = '';
        for (var index = 1; index <= $scope.totalPages; index++) {
            if (index == $scope.nowPages) {
                isActive = 'active';
            } else {
                isActive = '';
            }
            $scope.page.push({
                index: index,
                class: isActive
            })
        }
    }

    function computeArticles() {
        $scope.articlesList = [];
        $scope.articlesList = $scope.articlesGlobalList.slice(($scope.nowPages - 1) * 5, $scope.nowPages * 5);
        console.log($scope.articlesList);
    }

    $scope.turnTo = function (index) {
        NavchangeToPage($scope.nowPages, index);
        $scope.nowPages = index;
        computeArticles();
        console.log($scope.articlesList);
    };

    function NavchangeToPage(org, des) {
        $scope.page[org - 1]['class'] = '';
        $scope.page[des - 1]['class'] = 'active';
    }
    


});

