"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
var generate_password_1 = __importDefault(require("generate-password"));
var database_1 = __importDefault(require("../database"));
dotenv_1.default.config();
exports.default = (function (req, res) {
    var email = req.body.email;
    database_1.default.query("select * from Users\n                                  where email = '" + email + "'", function (err, result) {
        if (err)
            console.error(err);
        if (result[0]) {
            var newPassword_1 = generate_password_1.default.generate({
                length: 8,
                numbers: true,
                uppercase: true
            });
            database_1.default.query("update Users\n                                              set password = '" + newPassword_1 + "'\n                                            where email = '" + email + "'", function (error, r) {
                if (error)
                    console.error(error);
                console.log(r);
                sendPassword(res, email, newPassword_1);
            });
        }
        else {
            res.redirect('/');
        }
    });
});
var sendPassword = function (res, email, newPassword) {
    var transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    var mailOptions = {
        from: 'Tweeter',
        to: email,
        subject: 'Reset password to your account in Tweeter',
        text: 'This is your new password for account ' + newPassword,
        html: html_text(newPassword)
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
            res.redirect('/');
        }
    });
};
var html_text = function (new_password) {
    return "<h1>HI</h1>\n<p>This is your new password: " + new_password + "</p>\n<p>To log in your account use your new password</p>";
};
//# sourceMappingURL=reset-password.js.map