"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    if (req.session) {
        if (req.session.email) {
            var password_1 = req.body.password;
            var userId_1 = req.session.userId;
            database_1.default.query("select password from Users\n                                         where User_PK = " + userId_1, function (err, result) {
                if (err)
                    console.error(err);
                if (result[0]) {
                    if (result[0].password === password_1) {
                        database_1.default.query("delete\n                                            from LikedPosts\n                                            where user_id = " + userId_1 + ";", function (err) {
                            if (err)
                                console.error(err);
                        });
                        database_1.default.query("delete from Users where User_PK = " + userId_1, function (err) {
                            if (err)
                                console.error(err);
                        });
                        database_1.default.query("delete from Posts where user_id = " + userId_1, function (err) {
                            if (err)
                                console.error(err);
                        });
                        res.redirect('/');
                    }
                    else {
                        res.redirect('/profile-page');
                    }
                }
                else {
                    res.redirect('/profile-page');
                }
            });
        }
    }
});
//# sourceMappingURL=removeUser.js.map