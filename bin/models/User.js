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
        if (user) {
            if (user.password != parser.parsePassword(password)) {
                callback('Wrong Password.');
            } else {
                callback('Succeed!');
            }
        } else {
            callback('Wrong Id');
        }
    }).catch(function (error) {
        console.log(error);
        callback('Error!');
    });
};

UserSchema.statics.register = function (username, password, callback) {
    this.findOne({username: username}).then(function (user) {
        if (user) {
            callback('Username has been registered!');
        } else {
            var savedUser = new User({
                username: username,
                password: parser.parsePassword(password)
            });
            savedUser.save().then(callback('succeed')).catch(function (error) {
                console.log(error);
                callback('Error!');
            });
        }
    }).catch(function (error) {
        console.log(error);
        callback('Error!');
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
