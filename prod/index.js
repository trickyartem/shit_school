"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var utils_1 = require("./utils");
var login_1 = __importDefault(require("./api-requests/login"));
var register_1 = __importDefault(require("./api-requests/register"));
var getLoginPage_1 = __importDefault(require("./page-requests/getLoginPage"));
var getProfilePage_1 = __importDefault(require("./page-requests/getProfilePage"));
var getRegisterPage_1 = __importDefault(require("./page-requests/getRegisterPage"));
var getIndexPage_1 = __importDefault(require("./page-requests/getIndexPage"));
var create_post_1 = __importDefault(require("./api-requests/create-post"));
var post_post_1 = __importDefault(require("./api-requests/post-post"));
var express_session_1 = __importDefault(require("express-session"));
var logout_1 = __importDefault(require("./api-requests/logout"));
var like_post_1 = __importDefault(require("./api-requests/like-post"));
var database_1 = __importDefault(require("./database"));
var getBlogPage_1 = __importDefault(require("./page-requests/getBlogPage"));
var getEditPage_1 = __importDefault(require("./page-requests/getEditPage"));
var edit_1 = __importDefault(require("./api-requests/edit"));
var getResetPasswordPage_1 = __importDefault(require("./page-requests/getResetPasswordPage"));
var reset_password_1 = __importDefault(require("./api-requests/reset-password"));
var removeUser_1 = __importDefault(require("./api-requests/removeUser"));
var getRemoveUserPage_1 = __importDefault(require("./page-requests/getRemoveUserPage"));
var getAnotherProfilePage_1 = __importDefault(require("./page-requests/getAnotherProfilePage"));
var add_comment_1 = __importDefault(require("./api-requests/add-comment"));
var remove_post_1 = __importDefault(require("./api-requests/remove-post"));
var getFindUserPage_1 = __importDefault(require("./page-requests/getFindUserPage"));
var getAllCommentsPage_1 = __importDefault(require("./page-requests/getAllCommentsPage"));
var multer_1 = __importDefault(require("multer"));
database_1.default.connect();
var app = express_1.default();
var PORT = 3000;
app.use(express_1.default.static('public'));
app.use(express_1.default.static('uploads'));
app.set('view engine', 'ejs');
app.use('/images', express_1.default.static('uploads'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });
    next();
});
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: "test"
}));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png');
    }
});
var upload = multer_1.default({ storage: storage });
app.get('/get-news-feed', getBlogPage_1.default);
app.post('/like-post', like_post_1.default);
app.post('/edit', upload.none(), edit_1.default);
app.get('/logout', logout_1.default);
app.post('/post-post', upload.none(), post_post_1.default);
app.get('/create-post', create_post_1.default);
app.post('/register', utils_1.validateEmail, utils_1.validatePassword, upload.single('photo'), register_1.default);
app.post('/login', utils_1.validateEmail, utils_1.validatePassword, upload.none(), login_1.default);
app.get('/profile-page', getProfilePage_1.default);
app.get('/register-page', getRegisterPage_1.default);
app.get('/login-page', getLoginPage_1.default);
app.get('/', getIndexPage_1.default);
app.get('/edit-page', getEditPage_1.default);
app.get('/reset-password-page', getResetPasswordPage_1.default);
app.post('/reset-password', reset_password_1.default);
app.post('/remove-user', upload.none(), removeUser_1.default);
app.get('/remove-user-page', upload.none(), getRemoveUserPage_1.default);
app.get('/user-profile/:id', upload.none(), getAnotherProfilePage_1.default);
app.post('/add-comment', upload.none(), add_comment_1.default);
app.post('/remove-post', remove_post_1.default);
app.post('/find-user-page', upload.none(), getFindUserPage_1.default);
app.get('/all-comments/:id', upload.none(), getAllCommentsPage_1.default);
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
//# sourceMappingURL=index.js.map