"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    if (req.session && req.session.email) {
        var name_1 = req.body.name;
        database_1.default.query("select * from Users\n                                    where name like '%" + name_1 + "%'", function (error, users) {
            res.render('find-page.ejs', {
                users: users
            }, function (err, html) {
                if (err)
                    console.error(err);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(html);
                res.end();
            });
        });
    }
    else {
        res.redirect('/');
    }
});
//# sourceMappingURL=getFindUserPage.js.map