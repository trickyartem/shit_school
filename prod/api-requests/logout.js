"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err)
                throw err;
            res.redirect('/');
        });
    }
});
//# sourceMappingURL=logout.js.map