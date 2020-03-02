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
            var _a = req.body, postId_1 = _a.postId, comment_1 = _a.comment;
            database_1.default.query("select name from Users\n                                    where User_PK = " + userId_1, function (err, r) {
                if (err)
                    console.error(err);
                var name = r[0].name;
                database_1.default.query("insert into Comments(text, user_id, post_id, author)\n                                            values('" + comment_1 + "', " + userId_1 + ", " + postId_1 + ", '" + name + "')", function (error) {
                    if (error)
                        console.error(error);
                    database_1.default.query("select * from Comments", function (err1, comments) {
                        if (err1)
                            console.error(err1);
                        if (req.session) {
                            var posts = req.session.posts;
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
                                req.session.posts = posts;
                            }
                            var response = "<div class=\"border border-primary shadow p-3 mr-2 ml-2 mb-5 bg-white rounded\"><p>" + comment_1 + "</p><small>posted by " + name + "</small></div>";
                            res.json({
                                result: true,
                                comment: response
                            });
                        }
                    });
                });
            });
        }
        else {
            res.redirect('/');
        }
    }
});
//# sourceMappingURL=add-comment.js.map