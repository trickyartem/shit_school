"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    if (req.session) {
        if (req.session.email) {
            var id_1 = req.params.id;
            console.log(req.params);
            if (!id_1.includes('.png')) {
                database_1.default.query("select * from Users\n                                    where Users.User_PK = " + id_1, function (err, user) {
                    if (err)
                        console.error(err);
                    database_1.default.query("select * from Posts\n                                                    where Posts.user_id = " + id_1, function (err1, posts) {
                        if (err1)
                            console.error(err1);
                        database_1.default.query("select *\n                                                from Comments", (function (err2, comments) {
                            if (err2)
                                console.error(err2);
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
                            if (!user[0] && !posts[0]) {
                                res.redirect('/get-news-feed');
                            }
                            else {
                                var _a = user[0], name_1 = _a.name, status_1 = _a.status, gender = _a.gender, totalLikes = _a.totalLikes, profilePhoto = _a.profilePhoto;
                                console.log(profilePhoto);
                                res.render('another-profile.ejs', {
                                    name: name_1, status: status_1, gender: gender, posts: posts, likes: totalLikes, profilePhoto: profilePhoto
                                }, function (error, html) {
                                    if (error)
                                        console.error(error);
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.write(html);
                                    res.end();
                                });
                            }
                        }));
                    });
                });
            }
            else {
                res.redirect('/');
            }
        }
    }
});
//# sourceMappingURL=getAnotherProfilePage.js.map