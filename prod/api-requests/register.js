"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password, nickname = _a.nickname, status = _a.status, gender = _a.gender, age = _a.age;
    database_1.default.query("select * from Users\n                                     where email = '" + email + "' OR\n                                        name = \"" + nickname + "\";", function (err, result) {
        if (err)
            throw err;
        if (result[0] || age < 18) {
            res.redirect('/register-page');
        }
        else {
            database_1.default.query("insert into Users(email, name, password, status, gender, totalLikes, profilePhoto)\n                       values('" + email + "', \"" + nickname + "\", '" + password + "', '" + status + "', '" + gender + "', 0, '" + req.file.filename + "')", function (error, result) {
                if (error)
                    throw error;
                if (req.session) {
                    req.session.email = email;
                    req.session.password = password;
                    req.session.nickname = nickname;
                    req.session.status = status;
                    req.session.gender = gender;
                    req.session.userId = result.insertId;
                    req.session.posts = [];
                    req.session.totalLikes = 0;
                    req.session.comments = [];
                    req.session.profilePhoto = req.file.filename;
                }
                res.redirect('/profile-page');
            });
        }
    });
});
//# sourceMappingURL=register.js.map