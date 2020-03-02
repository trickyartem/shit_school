"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    var _a = req.body, title = _a.title, text = _a.text;
    var likes = 0;
    if (req.session) {
        if (req.session.email) {
            var _b = req.session, nickname = _b.nickname, userId_1 = _b.userId;
            database_1.default.query("insert into Posts(title, text, author, time, likes, user_id)\n                                  values (\"" + title + "\", \"" + text + "\", \"" + nickname + "\", current_date(), " + likes + ", " + userId_1 + ")", function (err) {
                if (err)
                    console.error(err);
                database_1.default.query("select * from Posts\n                                          where user_id = " + userId_1, function (err, posts) {
                    if (err)
                        console.error(err);
                    for (var _i = 0, posts_1 = posts; _i < posts_1.length; _i++) {
                        var post = posts_1[_i];
                        post.comments = [];
                    }
                    if (req.session) {
                        req.session.posts = posts;
                    }
                    res.redirect('/profile-page');
                });
            });
        }
        else {
            res.redirect('/');
        }
    }
});
//# sourceMappingURL=post-post.js.map