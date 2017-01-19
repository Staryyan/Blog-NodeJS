/**
 * Created by yanzexin on 19/01/2017.
 * All right reserved @Stary 19/01/2017
 */
app.controller('navigatorCtrl', function ($scope) {
    loadNavigator();

    function loadNavigator() {
        var cookie = new Cookies();
        var user = cookie.readCookiesByName();
        if (user) {
            $scope.info = 'Log Out';
        } else {
            $scope.info = 'Log In';
        }
    }

    $scope.logInOrLogOut = function () {
        var cookie = new Cookies();
        cookie.deleteCookieByKey('name');
        window.location.href = './signIn.html';
    };
});
