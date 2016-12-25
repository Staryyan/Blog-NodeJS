/**
 * Created by yanzexin on 25/12/2016.
 * All right reserved @Stary 25/12/2016
 */
console.log(app);
app.controller('widgetTemplateCtrl', function ($scope, $http) {
    loadInformation();

    loadArticles();

    function loadInformation() {
        $http({
            url: '../readPublishInformation',
            method: 'POST'
        }).success(function (data) {
            console.log(data);
            $scope.publishMessage = data['message'];
        }).error(function (error) {
            console.log(error);
        })
    }

    function loadArticles() {
        $http({
            url: '../loadArticles',
            method: 'GET'
        }).success(function (data) {
            $scope.articlesGlobalList = data['articlesList'];
            autocompleteSearch($scope.articlesGlobalList);
        }).error(function (error) {
            console.log(error);
        })
    }

    $scope.saveInformation = function () {
        $http({
            url: '../savePublishInformation',
            method: 'POST',
            data: {
                message: $scope.message
            }
        }).success(function (data) {
            console.log(data);
            window.location.href = './home.html';
        }).error(function (error) {
            console.log(error);
        })
    };

    $scope.submitSearch = function () {
        var title = $("#search").val();
        if (title != '' && searchByTitle(title)) {
            window.location.href = './article.html?id=' + searchByTitle(title);
        }
    };


    function searchByTitle(title) {
        for (var each of $scope.articlesGlobalList) {
            if (each['title'] == title) {
                return each['id'];
            }
        }
    }

    function autocompleteSearch(articlesList) {
        var availableTags = [];
        for (var each of articlesList) {
            availableTags.push(each['title']);
        }
        $( "#search" ).autocomplete({
            source: availableTags
        });
    }

});