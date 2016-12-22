/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var crypto = require('crypto');

var Parser = function () {
};

Parser.prototype.parsePassword = function(password) {
    return crypto.createHash('md5').update(password).digest('hex').toLowerCase();
};

Parser.prototype.parseArticleIdByDate = function (date) {
    return crypto.createHash('md5').update(date).digest('hex').toLowerCase();
};

module.exports = Parser;
