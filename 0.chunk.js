webpackJsonpac__name_([0],{

/***/ "./src/app/emailuser/email-user.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var UsersService_1 = __webpack_require__("./src/app/services/UsersService.ts");
var EmailUser = (function () {
    function EmailUser(activatedRoute, usersService, router) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.usersService = usersService;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.email = params['email'];
            _this.userCode = params['userCode'];
            console.log(_this.email + " " + _this.userCode);
            _this.router = router;
            _this.usersService.authenticateToken().subscribe(function (a) {
                _this.usersService.checkLinkValidity(_this.email, _this.userCode, a.token).subscribe(function (b) {
                    console.log('check');
                    if (b.code == 600) {
                        router.navigate(['/login']);
                    }
                    else {
                        sessionStorage.setItem('token', a.token);
                        sessionStorage.setItem('userId', b.data._id);
                        sessionStorage.setItem('role', b.data.role);
                        sessionStorage.setItem('userObject', JSON.stringify(b.data));
                    }
                });
            });
        });
    }
    EmailUser.prototype.sendAnother = function () {
        var _this = this;
        var flag = false;
        var password = this.newUserPassword;
        if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
            jQuery("#passwordComplexityError").css("display", "none");
        }
        else {
            flag = true;
            jQuery("#passwordComplexityError").css("display", "block");
            jQuery("#passwordComplexityError").text("The password should contain Minimum 8 characters, at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number");
        }
        if (this.newUserPassword !== this.newUserConfirmPassword) {
            flag = true;
            jQuery(".error-msg").text("Passwords do not match, check again");
        }
        if (this.newUserPassword !== "") {
            jQuery(".error-msg").text("Field Can't be Empty.");
        }
        if (flag == false) {
            this.usersService.changePassword(this.email, this.newUserPassword, sessionStorage.getItem('token')).subscribe(function (b) {
                if (b.code == 200) {
                    console.log('call');
                    _this.router.navigate(['/app/dashboard']);
                }
            });
        }
    };
    EmailUser = __decorate([
        core_1.Component({
            selector: '[email-user]',
            template: __webpack_require__("./src/app/emailuser/email-user.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [UsersService_1.UsersService],
            styles: [__webpack_require__("./src/app/emailuser/email-user.style.scss")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof UsersService_1.UsersService !== 'undefined' && UsersService_1.UsersService) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object])
    ], EmailUser);
    return EmailUser;
    var _a, _b, _c;
}());
exports.EmailUser = EmailUser;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/emailuser/email-user.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var email_user_component_1 = __webpack_require__("./src/app/emailuser/email-user.component.ts");
exports.routes = [
    { path: '', component: email_user_component_1.EmailUser, pathMatch: 'full' }
];
var EmailUserModule = (function () {
    function EmailUserModule() {
    }
    EmailUserModule.routes = exports.routes;
    EmailUserModule = __decorate([
        core_1.NgModule({
            declarations: [
                // Components / Directives/ Pipes
                email_user_component_1.EmailUser
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], EmailUserModule);
    return EmailUserModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailUserModule;


/***/ },

/***/ "./src/app/emailuser/email-user.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.important-text {\n  color: black;\n  font-weight: bold;\n  font-size: 9px;\n  text-align: center;\n  margin-top: 8px; }\n\n.login-page {\n  background-color: #DDDDDD; }\n\n.mr-n-lg {\n  text-decoration: underline;\n  margin-right: 25px;\n  color: #215497; }\n\n.sign-in-btn {\n  background-color: #009E0F;\n  color: white;\n  font-size: 16px;\n  padding: 8px 30px 8px 30px; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\nheader h3 {\n  font-weight: bold;\n  text-align: center;\n  font-size: 36px; }\n\n.widget-login {\n  padding: 30px;\n  border-radius: 0.8rem;\n  box-shadow: 2px 14px 18px grey; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 19px;\n  color: BLACK;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  border: none;\n  color: black;\n  background-color: transparent;\n  border: none;\n  border-radius: 0; }\n  .login-form .form-control:focus {\n    background-color: transparent; }\n\n#passwordComplexityError {\n  display: none; }\n"

/***/ },

/***/ "./src/app/emailuser/email-user.template.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <main id=\"content\" class=\"widget-login-container\" role=\"main\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\r\n        <section class=\"widget widget-login animated fadeInUp\">\r\n          <header style=\"text-align:center\">\r\n            <i class=\"fa fa-user-plus\" aria-hidden=\"true\" style=\"font-size:100px;color:#5ac063\"></i>\r\n          </header>\r\n          <div class=\"widget-body\">\r\n            <p class=\"widget-login-info\">\r\n              First time user? Change your password and lets get started\r\n            </p>\r\n            <form class=\"login-form mt-lg\">\r\n              <div class=\"form-group\">\r\n                <input type=\"password\" name=\"newUserPassword\" class=\"form-control custom-inputs\" [(ngModel)]=\"newUserPassword\" id=\"newUserPassword\" placeholder=\"Password\">\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <input type=\"password\" name=\"newUserConfirmPassword\" class=\"form-control custom-inputs\" [(ngModel)]=\"newUserConfirmPassword\" id=\"newUserConfirmPassword\" placeholder=\"Confirm Password\">\r\n              </div>\r\n              <button type=\"submit\" class=\"btn  send-invite-btn\" (click)=\"sendAnother()\">Log In</button>\r\n            </form>\r\n            <div class=\"alert alert-danger\" id=\"passwordComplexityError\">\r\n            </div>\r\n          </div>\r\n        </section>\r\n      </div>\r\n    </div>\r\n  </main>\r\n  <footer class=\"page-footer\">\r\n  <!--  2016 &copy; Sing. Admin Dashboard Template.-->\r\n  </footer>\r\n</div>\r\n\r\n\r\n"

/***/ }

});
//# sourceMappingURL=0.map