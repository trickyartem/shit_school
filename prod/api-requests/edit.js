"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    if (req.session) {
        if (req.session.email) {
            var _a = req.body, email = _a.email, nickname = _a.nickname, status_1 = _a.status, gender = _a.gender;
            var userId = req.session.userId;
            var _email = email;
            var _nickname = nickname;
            var _status = status_1;
            var _gender = gender;
            if (!email || email.length <= 3) {
                _email = req.session.email;
            }
            if (!nickname || nickname.length <= 3) {
                _nickname = req.session.nickname;
            }
            if (!gender || gender.length <= 3) {
                _gender = req.session.gender;
            }
            database_1.default.query("update Posts, Users\n                    inner join Posts P on Users.User_PK = P.user_id\n                                          set P.author = '" + _nickname + "',\n                                                Users.email = '" + _email + "',\n                                               Users.name = '" + _nickname + "',\n                                               Users.status = '" + _status + "',\n                                               Users.gender = '" + _gender + "'\n                                          where Users.User_PK = " + userId + " and \n                                                P.user_id = " + userId, function (err) {
                if (err)
                    console.error(err);
                res.redirect('/profile-page');
            });
        }
        else {
            res.redirect('/');
        }
    }
});
//# sourceMappingURL=edit.js.map