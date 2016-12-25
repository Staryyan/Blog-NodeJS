var app = angular.module('writeArticlesApp', []);


app.controller('writeArticleCtrl', function ($scope, $http) {

    loadDraft();

    function loadDraft() {
        $http({
            url: '../loadDraft',
            method: 'GET'
        }).success(function (data) {
            $scope.title = data['title'];
            $scope.catalog = data['catalog'];
            $scope.contents = data['content'];
        }).error(function (error) {
            console.log(error);
        })
    }

    function getForm() {
        var html = $('#content').val().replace(/&lt;/g, '<');
        html = html.replace(/&gt;/g, '>');
        console.log(html);
        return {
            title: $scope.title,
            catalog: $scope.catalog,
            content: html
        }
    }

    $scope.submit = function () {
        $http({
            url: '../writeArticle',
            method: 'POST',
            data: getForm()
        }).success(function (data) {
            console.log(data);
            $scope.delete();
            window.location.href = './home.html';
        }).error(function (error) {
            console.log(error);
        });
    };

    $scope.save = function () {
        $http({
            url: '../saveDraft',
            method: 'POST',
            data: getForm()
        }).success(function (data) {
            console.log(data);
            $scope.savedDraftResult = "Saved Draft! It will be saved for one week!";
            $scope.savedDraft = true;
        }).error(function (error) {
            console.log(error);
        });
    };
    
    $scope.delete = function () {
        $http({
            url: '../deleteDraft',
            method: 'GET'
        }).success(function (data) {
            console.log(data);
            if (data['succeed']) {
                $scope.deletedDraft = true;
                $scope.deletedDraftResult = "Deleted Draft Successfully!";
            } else {
                $scope.deletedDraft = true;
                $scope.deletedDraftResult = "It hasn't draft here!";
            }
        }).error(function (error) {
            console.log(error);
        })
    }

});
