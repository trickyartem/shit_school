"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    if (req.session) {
        if (req.session.email) {
            res.render('form-template.ejs', {
                _route: '/edit',
                fields: [
                    ['Email', 'email', 'email'],
                    ['Nickname', 'text', 'nickname'],
                    ['Status', 'text', 'status'],
                    ['Gender', 'text', 'gender']
                ]
            }, (function (err, html) {
                if (err)
                    console.error(err.message);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(html);
                res.end();
            }));
        }
        else {
            res.redirect('/');
        }
    }
});
//# sourceMappingURL=getEditPage.js.map