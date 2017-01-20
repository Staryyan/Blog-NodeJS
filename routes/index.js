var express = require('express');
var User = require('../bin/models/User');
var Article = require('../bin/models/Articles');
var Comments = require('../bin/models/Comments');
var momentJS = require('moment');
var fs = require('fs');
var Parser = require('../bin/Parser');
var router = express.Router();

router.post('/logIn', function (request, response) {
    console.log('login');
    User.logInValidate(request.body.username, request.body.password, function (data) {
        console.log(data);
        if (data['succeed']) {
            response.cookie('user', {name: request.body.name}, {httpOnly: true});
        }
        response.json(data);
    })
});

router.post('/register', function (request, response) {
    console.log('register');
    User.register(request.body.username, request.body.password, function (data) {
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

router.get('/loadArticles', function (request, response) {
    Article.getArticlesGroup(function (data) {
        for (ch in data) {
            data[ch]['date'] = momentJS(data[ch]['date']).fromNow();
        }
        response.json({
            articlesList: data
        });
    });
});

router.post('/loadArticleDetail', function (request, response) {
    Article.getArticle(request.body.id, function (data) {
        data['date'] = momentJS(data['date']).fromNow();
        response.json(data);
    })
});


router.post('/loadArticleComments', function (request, response) {
    console.log('loadArticleComments');
    Article.getCommentsById(request.body.articleId, function (data) {
        for (each of data) {
            each['date'] = momentJS(each['date']).fromNow();
        }
        response.json({commentsList: data});
    })
});

router.post('/comment', function (request, response) {
    console.log('comment');
    Article.commentForArticleById(new Comments({
        articleId: request.body.articleId,
        commentId: request.body.commentId,
        content: request.body.content,
        author: request.body.author,
        date: momentJS().format()
    }), function (data) {
        response.json(data);
    })
});

router.post('/deleteArticle', function (request, response) {
    console.log('deleteArticle');
    Article.deleteArticle(request.body.id, function (data) {
        // console.log(data);
        response.json({})
    })
});

router.post('/savePublishInformation', function (request, response) {
    var data = {'message': request.body.message};
    fs.writeFile('../log/log.txt', JSON.stringify(data), function (error) {
        if (error) {
            console.log(error);
            response.json({'succeed': false});
        } else {
            response.json({'succeed': true});
        }
    });
});

router.post('/readPublishInformation', function (request, response) {
    console.log('readPublishInformation');
    fs.readFile('../log/log.txt', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            data = JSON.parse(data);
            response.json(data);
        }
    });
});

router.post('/deleteComment', function (request, response) {
    console.log('deleteComment');
    Comments.deleteCommentByCommentId(request.body.commentId, function () {
        response.json({succeed: 'true'});
    });
});

router.post('/editComment', function (request, response) {
    console.log('editComment');
    Comments.editCommentByCommentId(request.body.commentId, request.body.newMsg, function (data) {
        response.json({succeed: 'true'});
    });
});

router.post('/hideComment', function (request, response) {
   console.log('hideComment');
    Comments.hideCommentByCommentId(request.body.commentId, function (data) {
        response.json({succeed: 'true'});
    });
});

module.exports = router;
