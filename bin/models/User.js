/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Parser = require('../Parser');
var UserSchema = Schema({
    username: String,
    password: String
});

var parser = new Parser();

UserSchema.statics.logInValidate = function (username, password, callback) {
    this.findOne({username: username}).then(function (user) {
        var callbackJson = {'succeed': false, 'error': ''};
        if (user) {
            if (user.password != parser.parsePassword(password)) {
                callbackJson['error'] = 'Wrong Password.';
            } else {
                callbackJson['succeed'] = true;
            }
        } else {
            callbackJson['error'] = 'Wrong Id';
        }
        callback(callbackJson);
    }).catch(function (error) {
        console.log(error);
        callback('Error!');
    });
};

UserSchema.statics.register = function (username, password, callback) {
    this.findOne({username: username}).then(function (user) {
        var callbackJson = {'succeed': false, 'error': ''};
        if (user) {
            callbackJson['error'] = 'Username has been registered!';
            callback(callbackJson);
        } else {
            var savedUser = new User({
                username: username,
                password: parser.parsePassword(password)
            });
            savedUser.save().then(function () {
                callbackJson['succeed'] = true;
                callback(callbackJson);
            }).catch(function (error) {
                console.log(error);
                callbackJson['error'] = 'Error';
                callback(callbackJson);
            });
        }
    }).catch(function (error) {
        console.log(error);
        callback('Error!');
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
