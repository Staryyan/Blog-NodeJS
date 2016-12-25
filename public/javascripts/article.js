/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */

var app = angular.module('articleApp', ['ngSanitize']);

app.controller('articleContentCtrl', function ($scope, $http, $location, $sce) {

    loadArticle();

    loadComments();

    function loadArticle() {
        var id = getId();

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
            $scope.trustHtml = $sce.trustAsHtml(data['content']);
        }).error(function (error) {
            console.log(error);
        })
    }

    function loadComments() {
        var id = getId();

        $http({
            url: '../loadArticleComments',
            method: 'POST',
            data: {
                id: id
            }
        }).success(function (data) {
            console.log(data);
            $scope.commentsList = data['commentsList'];
        }).error(function (error) {
            console.log(error);
        })
    }

    function getId() {
        var url = $location.absUrl();
        return url.substr(url.indexOf('id=') + 3);
    }

    $scope.submitComment = function () {
        if ($scope.CommentContent) {
            if (!$scope.CommentAuthor) {
                $scope.CommentAuthor = 'anonymity';
            }
            postToDB();
        }
    };

    function postToDB() {
        $http({
            url: '../comment',
            method: 'POST',
            data: {
                id: getId(),
                content: $scope.CommentContent,
                author: $scope.CommentAuthor
            }
        }).success(function (data) {
            showInHtml();
        }).error(function (error) {
            console.log(error);
        })
    }

    function showInHtml() {
        $scope.commentsList.unshift({
            author: $scope.CommentAuthor,
            content: $scope.CommentContent,
            date: 'Just Now'
        });
        $scope.CommentAuthor = '';
        $scope.CommentContent = '';
    }
});

