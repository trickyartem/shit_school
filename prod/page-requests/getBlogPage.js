"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    if (req.session) {
        if (req.session.email) {
            var userId_1 = req.session.userId;
            database_1.default.query("select *\n                            from Posts", function (err, posts) {
                if (err)
                    console.error(err.message);
                database_1.default.query("select *\n                                    from Comments", (function (err1, comments) {
                    if (err1)
                        console.error(err1);
                    var commentsLength = 0;
                    if (comments.length >= 2) {
                        commentsLength = 2;
                    }
                    else if (comments.length === 1) {
                        commentsLength = 1;
                    }
                    for (var i = 0; i < posts.length; i++) {
                        posts[i].comments = [];
                        for (var j = 0; j < commentsLength; j++) {
                            if (posts[i].post_id === comments[j].post_id) {
                                posts[i].comments.push(comments[j]);
                            }
                        }
                    }
                    if (req.session) {
                        req.session.posts = posts;
                    }
                    res.render('blog.ejs', {
                        posts: posts, userId: userId_1
                    }, function (err, html) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(html);
                        res.end();
                    });
                }));
            });
        }
        else {
            res.redirect('/');
        }
    }
});
//# sourceMappingURL=getBlogPage.js.map