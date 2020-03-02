"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    res.render('form-template.ejs', {
        _route: '/register',
        fields: [
            ['Email', 'email', 'email'],
            ['Password', 'password', 'password'],
            ['Nickname', 'text', 'nickname'],
            ['Status', 'text', 'status'],
            ['Gender', 'text', 'gender'],
            ['Age', 'number', 'age'],
            ['Profile photo', 'file', "photo"]
        ]
    }, function (err, result) {
        if (err)
            throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(result);
        res.end();
    });
});
//# sourceMappingURL=getRegisterPage.js.map