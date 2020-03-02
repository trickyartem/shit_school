"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    if (req.session) {
        if (req.session.email) {
            var _a = req.body, postId_1 = _a.postId, likes_1 = _a.likes;
            var userId_1 = req.session.userId;
            var postLikes_1 = likes_1;
            database_1.default.query("delete from Comments\n                                            where post_id = " + postId_1, function (err) {
                if (err)
                    console.error(err);
                database_1.default.query("delete from LikedPosts\n                                                where post_id = " + postId_1, function (error) {
                    if (error)
                        console.error(error);
                    database_1.default.query("delete from Posts\n                                                    where post_id = " + postId_1, function (err1) {
                        if (err1)
                            console.error(err1);
                        database_1.default.query("update Users\n                                                                  set totalLikes = totalLikes - " + postLikes_1 + "\n                                                                where User_PK = " + userId_1, function (error1) {
                            if (error1)
                                console.error(error1);
                            if (req.session) {
                                var a = req.session.posts.findIndex(function (el) { return el.post_id = postId_1; });
                                req.session.posts.splice(a, 1);
                                req.session.totalLikes -= likes_1;
                                res.json({ result: true, totalLikes: req.session.totalLikes });
                            }
                        });
                    });
                });
            });
        }
        else {
            res.redirect('/');
        }
    }
});
//# sourceMappingURL=remove-post.js.map