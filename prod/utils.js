"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs-extra"));
function inputValidate(input, type) {
    switch (type) {
        case "email":
            return /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,10}$/g.test(input);
        case "password":
            return /\w{6,24}/g.test(input);
    }
    return false;
}
function validateEmail(req, res, next, path) {
    var email = req.body.email;
    if (!inputValidate(email, "email")) {
        res.redirect(path || '/');
    }
    else {
        next();
    }
}
exports.validateEmail = validateEmail;
function validatePassword(req, res, next) {
    var password = req.body.password;
    if (!inputValidate(password, "password")) {
        res.redirect('/');
    }
    else {
        next();
    }
}
exports.validatePassword = validatePassword;
exports.readFile = function (res, path) {
    fs.readFile(path, function (error, response) {
        if (error) {
            res.writeHead(404);
            res.write("Contents you are looking are Not Found " + error);
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(response);
        }
        res.end();
    });
};
//# sourceMappingURL=utils.js.map