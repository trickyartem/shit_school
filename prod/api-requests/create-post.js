"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    if (req.session.email) {
        res.render('form-template.ejs', {
            _route: '/post-post',
            fields: [
                ['Title', 'text', 'title'],
                ['Text of the post', 'text', 'text']
            ]
        }, (function (err, html) {
            if (err)
                throw new Error(err.message);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        }));
    }
    else {
        res.redirect('/');
    }
});
//# sourceMappingURL=create-post.js.map