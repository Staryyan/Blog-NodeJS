/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var app = angular.module('homeApp', []);

app.controller('homeArticlesListCtrl', function ($scope, $http) {
    loadArticles();

    $scope.submitSearch = function () {
        var title = $("#search").val();
        if (title != '' && searchByTitle(title)) {
            window.location.href = './article.html?id=' + searchByTitle(title);
        }
    };

    function searchByTitle(title) {
        for (var each of $scope.articlesList) {
            if (each['title'] == title) {
                return each['id'];
            }
        }
    }

    function loadArticles() {
        $http({
            url: '../loadArticles',
            method: 'GET'
        }).success(function (data) {
            $scope.articlesList = data['articlesList'];
            console.log($('#content').html());
            $('#content').html(data['articlesList'][0]['content']);
            autocompleteSearch(data['articlesList']);
        }).error(function (error) {
            console.log(error);
        })
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
