"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    if (req.session) {
        if (req.session.email) {
            var postId_1 = req.body.postId;
            var userId_1 = req.session.userId;
            database_1.default.query("select user_id from Posts\n                                      where post_id = " + postId_1, function (err, results) {
                if (err)
                    console.error(err.message);
                var postUserId = results[0].user_id;
                database_1.default.query("select * from LikedPosts\n                                            where user_id = " + userId_1 + " and post_id = " + postId_1, function (error, liked) {
                    if (error)
                        console.error(error.message);
                    if (liked.length > 0) {
                        database_1.default.query("delete from LikedPosts\n                                                            where user_id = " + userId_1 + " and post_id = " + postId_1, function (error1) {
                            if (error1)
                                console.error();
                            database_1.default.query("update Posts, Users\n                    inner join Posts P on Users.User_PK = P.user_id\n                                set P.likes = P.likes - 1,\n                                    Users.totalLikes = Users.totalLikes - 1\n                                where P.post_id = " + postId_1 + "\n                                  and Users.User_PK = " + postUserId + ";", function (err2) {
                                if (err2)
                                    console.error(err2.message);
                                database_1.default.query("select * from Posts\n                                            where user_id = " + postUserId, (function (err1, posts) {
                                    if (err1)
                                        console.error(err1.message);
                                    database_1.default.query("select * from Comments\n                                                                                where post_id = " + postId_1, function (shit, comments) {
                                        if (req.session) {
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
                                            req.session.posts = posts;
                                            res.json({
                                                result: false,
                                                totalLikes: req.session.totalLikes -= 1
                                            });
                                        }
                                    });
                                }));
                            });
                        });
                    }
                    else {
                        database_1.default.query("update Posts, Users\n                    inner join Posts P on Users.User_PK = P.user_id\n                                set P.likes = P.likes + 1,\n                                    Users.totalLikes = Users.totalLikes + 1\n                                where P.post_id = " + postId_1 + "\n                                  and Users.User_PK = " + postUserId + ";", function (err2) {
                            if (err2)
                                console.error(err2.message);
                            database_1.default.query("select * from Posts\n                                            where user_id = " + postUserId, (function (err1, posts) {
                                if (err1)
                                    console.error(err1.message);
                                database_1.default.query("insert into LikedPosts(user_id, post_id)\n                                                values (" + userId_1 + ", " + postId_1 + ")", function (err3) {
                                    if (err3)
                                        console.error(err3.message);
                                    database_1.default.query("select * from Comments\n                                                                                where post_id = " + postId_1, function (shit, comments) {
                                        if (req.session) {
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
                                            req.session.posts = posts;
                                            res.json({
                                                result: true,
                                                totalLikes: req.session.totalLikes += 1
                                            });
                                        }
                                    });
                                });
                            }));
                        });
                    }
                });
            });
        }
        else {
            res.redirect('/');
        }
    }
});
//# sourceMappingURL=like-post.js.map