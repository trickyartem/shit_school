"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    database_1.default.query("select * from Users\n                             where email = '" + email + "';", function (err, result) {
        if (err) {
            console.error(err.message);
        }
        if (result[0]) {
            database_1.default.query("select * from Posts\n                                       where user_id = " + result[0].User_PK, function (err, posts) {
                if (err)
                    throw err;
                database_1.default.query("select * from Comments\n                                                where user_id = " + result[0].User_PK, (function (err1, comments) {
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
                    if (result[0].password === password) {
                        if (req.session) {
                            req.session.email = result[0].email;
                            req.session.password = result[0].password;
                            req.session.nickname = result[0].name;
                            req.session.status = result[0].status;
                            req.session.gender = result[0].gender;
                            req.session.userId = result[0].User_PK;
                            req.session.profilePhoto = result[0].profilePhoto;
                            req.session.posts = posts;
                            req.session.totalLikes = posts.reduce(function (acc, curr) {
                                return acc + curr.likes;
                            }, 0);
                            res.redirect("/profile-page");
                        }
                    }
                    else {
                        console.log("did not logged in, wrong password");
                        res.redirect('/');
                    }
                }));
            });
        }
        else {
            res.redirect('/login-page');
        }
    });
});
//# sourceMappingURL=login.js.map