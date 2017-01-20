/**
 * Created by yanzexin on 19/01/2017.
 * All right reserved @Stary 19/01/2017
 */
var Cookies = function () {
};

var pro = Cookies.prototype;

pro.setCookiesAsSession = function (key, value) {
    document.cookie = key + '=' + value;
};

pro.setCookiesWithDates = function (key, value, date) {
    var exp = new Date();
    exp.setTime(exp.getTime() + date*24*60*60*1000);
    document.cookie = key + "="+ value + ";expires=" + exp.toGMTString();
};

pro.readCookiesByName = function () {
    var arr;
    if(arr=document.cookie.match(/name=([a-zA-Z0-9_]*);/)) {
        return arr[1];
    } else
        return null;
};

pro.readCookiesByEditArticleDraft = function () {
    var arr;
    if(arr=document.cookie.match(/editArticleDraft=(.*);/)) {
        return arr[1];
    } else
        return null;
};

pro.deleteCookieByKey = function (key) {
    var exp = new Date();
    exp.setTime(exp.getTime() + (-10 * 24 * 60 * 60 * 1000));
    var cval = this.readCookiesByName();
    console.log(cval);
    if (cval != null) {
        console.log(key + '=' + cval + ";expires=" + exp.toGMTString());
        document.cookie = key + '=' + cval + ";expires=" + exp.toGMTString();
    }
};
