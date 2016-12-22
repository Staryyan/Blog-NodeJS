var express = require('express');
var User = require('../bin/models/User');
var Article = require('../bin/models/Articles');
var momentJS = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  
});

router.post('/logIn', function (request, response) {
    console.log(request.body.username, request.body.password);
    User.logInValidate(request.body.username, request.body.password, function (data) {
        console.log(data);
        response.json(data);
    })
});

router.post('/writeArticle', function (request, response) {
   console.log(request.body.title);
    Article.saveArticle(new Article({
        title: request.body.title,
        content: request.body.content,
        catalog: request.body.catalog,
        author: 'Stary',
        date: momentJS().format()
    }), function (data) {
        console.log(data);
        response.json(data);
    });
});

router.post('/saveDraft', function (request, response) {
    console.log(request.body.content);
    response.cookie('draft', 
        {title: request.body.title, content: request.body.content, catalog: request.body.catalog}, 
        { httpOnly: true, maxAge: 7 * 3600 * 3600 });
    response.json({succeed: true});
});


router.get('/loadDraft', function (request, response) {
    var draft = request.cookies.draft;
    if (draft) {
        response.json({
            title: draft.title,
            content: draft.content,
            catalog: draft.catalog
        });
    } else {
        response.json({
            title: "",
            content: "",
            catalog: ""
        })
    }
});

router.get('/deleteDraft', function (request, response) {
    var draft = request.cookies.draft;
    console.log(draft);
    if (draft) {
        response.clearCookie('draft');
        response.json({ 'succeed': true });
    } else {
        response.json({ 'succeed': false });
    }
});

module.exports = router;
