"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    res.render('form-template.ejs', {
        _route: '/reset-password',
        fields: [
            ['Email', 'email', 'email']
        ]
    }, (function (err, html) {
        if (err)
            console.error(err.message);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }));
});
//# sourceMappingURL=getResetPasswordPage.js.map