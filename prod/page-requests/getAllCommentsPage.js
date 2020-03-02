"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
exports.default = (function (req, res) {
    if (req.session && req.session.email) {
        var id = req.params.id;
        database_1.default.query("select * from Comments\n                                where post_id = " + id, function (err, comments) {
            if (err)
                console.error(err);
            res.render('all-comments.ejs', {
                comments: comments
            }, function (error, html) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(html);
                res.end();
            });
        });
    }
});
//# sourceMappingURL=getAllCommentsPage.js.map