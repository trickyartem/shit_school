"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    if (req.session.email) {
        var _a = req.session, email = _a.email, nickname = _a.nickname, status_1 = _a.status, gender = _a.gender, posts = _a.posts, totalLikes = _a.totalLikes, profilePhoto = _a.profilePhoto;
        res.render('profile.ejs', {
            email: email, gender: gender, status: status_1, name: nickname, posts: posts, likes: totalLikes, profilePhoto: profilePhoto
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
});
//# sourceMappingURL=getProfilePage.js.map