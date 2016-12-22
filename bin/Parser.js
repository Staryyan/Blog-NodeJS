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
    var hash = 1315423911;
    for (var eachCh in date) {
        hash ^= ((hash << 5) + eachCh + (hash >> 2));
    }
    return (hash & 0x7FFFFFFF);
};


module.exports = Parser;
