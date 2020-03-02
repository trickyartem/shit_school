"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    res.render('form-template.ejs', {
        _route: '/login',
        fields: [
            ['Email', 'email', 'email'],
            ['Password', 'password', 'password']
        ]
    }, function (err, result) {
        if (err)
            throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(result);
        res.end();
    });
});
//# sourceMappingURL=getLoginPage.js.map