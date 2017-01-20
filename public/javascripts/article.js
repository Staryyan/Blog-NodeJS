/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */

var app = angular.module('articleApp', ['ngSanitize']);

var cookie = new Cookies();

var user = cookie.readCookiesByName();

app.controller('articleContentCtrl', function ($scope, $http, $location, $sce) {

    loadArticle();

    loadComments();

    var nowUrl = $location.absUrl();

    function loadArticle() {
        $http({
            url: '../loadArticleDetail',
            method: 'POST',
            data: {
                id: getArticleId()
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
        $http({
            url: '../loadArticleComments',
            method: 'POST',
            data: {
                articleId: getArticleId()
            }
        }).success(function (data) {
            console.log(data);
            $scope.commentsList = data['commentsList'];
        }).error(function (error) {
            console.log(error);
        })
    }

    function getArticleId() {
        var url = $location.absUrl();
        return url.substr(url.indexOf('id=') + 3);
    }

    function getCommentId() {
        return new Date().getTime();
    }

    $scope.hasLogIn = function () {
        return user != null;
    };

    $scope.submitComment = function () {
        if (!$scope.hasLogIn()) {
            $scope.tips = 'Please Log in first.';
        } else {
            if ($scope.CommentContent) {
                postToDB();
                $scope.tips = ''
            } else {
                $scope.tips = 'Please comment somethings.'
            }
        }
    };

    function postToDB() {
        console.log(user);
        $http({
            url: '../comment',
            method: 'POST',
            data: {
                articleId: getArticleId(),
                commentId: getCommentId(),
                content: $scope.CommentContent,
                author: user,
                hide: false
            }
        }).success(function (data) {
            showInHtml();
        }).error(function (error) {
            console.log(error);
        })
    }

    function showInHtml() {
        $scope.commentsList.unshift({
            author: user,
            content: $scope.CommentContent,
            date: 'Just Now'
        });
        $scope.CommentContent = '';
    }

    $scope.commentCanEdit = function (author) {
        return (author == user) || (user == 'Administration');
    };

    $scope.commentCanDelete = function (author) {
        return (author == user) || (user == 'Administration');
    };

    $scope.commentCanHide = function () {
        return user == 'Administration';
    };

    $scope.deleteComment = function (id) {
        $scope.deleteCommentId = id;
        $('#deleteModal').modal();
    };

    $scope.commitDelete = function () {
        console.log('delete');
        console.log($scope.deleteCommentId);
        $http({
            url: '/deleteComment',
            data: { commentId: $scope.deleteCommentId },
            method: 'POST'
        }).success(function (data) {
            window.location.href = nowUrl;
        })
    };
    
    $scope.editComment = function (id) {
        $scope.editCommentId = id;
        $('#editModal').modal();
    };

    $scope.saveEditedComment = function () {
        if ($scope.message == '') {
            $scope.editFail = true;
            $scope.editMsg = 'Please fill in your new comment';
        } else {
            $http({
                url: '/editComment',
                method: 'POST',
                data: {
                    commentId: $scope.editCommentId,
                    newMsg: $scope.message
                }
            }).success(function (data) {
                window.location.href = nowUrl;
            })
        }
    };
    
    $scope.hideComment = function (id) {
        $http({
            url: '/hideComment',
            method: 'POST',
            data: { commentId: id }
        }).success(function (data) {
            window.location.href = nowUrl;
        })
    };
    
});
