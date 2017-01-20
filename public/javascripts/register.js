/**
 * Created by yanzexin on 12/01/2017.
 * All right reserved @Stary 12/01/2017
 */

$('#username').tooltip();
$('#password').tooltip();

$(document).ready(function () {
    hideError();

    $('#submitRegisterBtn').bind('click', submitRegister);

    $('#cancelBtn').bind('click', cancel);
});

function submitRegister() {
    if (validateInput()) {
        $.ajax({
            url: '../register',
            type: 'POST',
            data: {
                username: $('#username').val(),
                password: parsePassword()
            },
            success: function (data) {
                console.log(data);
                if (data['succeed']) {
                    window.location.href = './signIn.html?register=true'
                } else {
                    showError(data['error'])
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}

function parsePassword() {
    return hex_md5($('#password').val())
}


function validateInput() {
    if (hasFilled()) {
        if (!checkUsername()) {
            return showError('Please check your username format!');
        }

        if (!checkPassword()) {
            return showError('Please check your password format!');
        }

        if (!checkRepeatPassword()) {
           return showError('Please repeat your password!');
        }
        return true;
    } else {
       return showError('Please fill in all information');
    }
}

function hasFilled() {
    return $('#username').val() != '' && $('#password').val() != '' && $('#repeatPassword').val() != ''
}

function showError(error) {
    $('#signInWrong').show();
    $('#wrongInfo').html(error);
    console.log($('#wrongInfo').html());
    return false;
}

function hideError() {
    $('#signInWrong').hide();
}

function checkUsername() {
    var format = /^[a-zA-Z]([a-zA-Z0-9_]){5,17}/;
    return $('#username').val().match(format);
}

function checkPassword() {
    var format = /[a-zA-Z0-9_\-]{6,12}/;
    return $('#password').val().match(format);
}

function checkRepeatPassword() {
    return $('#password').val() == $('#repeatPassword').val();
}

function cancel() {
    window.location.href = './signIn.html';
}
