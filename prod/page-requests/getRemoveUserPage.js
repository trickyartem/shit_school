"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    if (req.session) {
        if (req.session.email) {
            res.render('form-template.ejs', {
                _route: '/remove-user',
                fields: [
                    ['Password', 'password', 'password']
                ]
            }, function (err, html) {
                if (err)
                    throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(html);
                res.end();
            });
        }
    }
});
//# sourceMappingURL=getRemoveUserPage.js.map