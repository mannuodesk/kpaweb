webpackJsonpac__name_([5],{

/***/ "./src/app/login/login.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var core_2 = __webpack_require__("./node_modules/@angular/core/index.js");
var UsersService_1 = __webpack_require__("./src/app/services/UsersService.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var Login = (function () {
    function Login(_userService, router) {
        this._userService = _userService;
        this.Email = "";
        this.router = router;
        this._userService.authenticateToken().subscribe(function (a) {
            sessionStorage.setItem('token', a.token);
        });
    }
    Login.prototype.onKey = function (event) {
        var _this = this;
        if (event.keyCode == 13) {
            jQuery('#wrongLogin').hide();
            jQuery('#enterEmail').hide();
            jQuery('#enterPassword').hide();
            if (this.Email == "") {
                jQuery('#enterEmail').show();
            }
            if (this.Password == "" || this.Password === undefined) {
                jQuery('#enterPassword').show();
            }
            if (this.Email != "" && this.Password != "") {
                jQuery('#loader').show();
                jQuery('#btns').hide();
                this._userService.authenticateAdminUser(this.Email, this.Password, sessionStorage.getItem('token')).subscribe(function (a) {
                    if (a.code == 200) {
                        sessionStorage.setItem('userId', a.data._id);
                        sessionStorage.setItem('role', a.data.role);
                        sessionStorage.setItem('userObject', JSON.stringify(a.data));
                        _this.router.navigate(['/app/dashboard']);
                        jQuery('#btns').show();
                        jQuery('#loader').hide();
                    }
                    else {
                        jQuery('#btns').show();
                        jQuery('#loader').hide();
                        jQuery('#wrongLogin').show();
                    }
                });
            }
        }
    };
    Login.prototype.onSubmit = function () {
        var _this = this;
        jQuery('#wrongLogin').hide();
        jQuery('#enterEmail').hide();
        jQuery('#enterPassword').hide();
        if (this.Email == "") {
            jQuery('#enterEmail').show();
        }
        if (this.Password == "" || this.Password === undefined) {
            jQuery('#enterPassword').show();
        }
        if (this.Email != "" && this.Password != "") {
            jQuery('#loader').show();
            jQuery('#btns').hide();
            this._userService.authenticateAdminUser(this.Email, this.Password, sessionStorage.getItem('token')).subscribe(function (a) {
                if (a.code == 200) {
                    sessionStorage.setItem('userId', a.data._id);
                    sessionStorage.setItem('role', a.data.role);
                    sessionStorage.setItem('userObject', JSON.stringify(a.data));
                    _this.router.navigate(['/app/dashboard']);
                    jQuery('#btns').show();
                    jQuery('#loader').hide();
                }
                else {
                    jQuery('#btns').show();
                    jQuery('#loader').hide();
                    jQuery('#wrongLogin').show();
                }
            });
        }
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', String)
    ], Login.prototype, "Email", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', String)
    ], Login.prototype, "Password", void 0);
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            styles: [__webpack_require__("./src/app/login/login.style.scss")],
            template: __webpack_require__("./src/app/login/login.template.html"),
            providers: [UsersService_1.UsersService],
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof UsersService_1.UsersService !== 'undefined' && UsersService_1.UsersService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], Login);
    return Login;
    var _a, _b;
}());
exports.Login = Login;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/login/login.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
exports.routes = [
    { path: '', component: login_component_1.Login, pathMatch: 'full' }
];
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule.routes = exports.routes;
    LoginModule = __decorate([
        core_1.NgModule({
            declarations: [
                login_component_1.Login
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginModule);
    return LoginModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModule;


/***/ },

/***/ "./src/app/login/login.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.login-page {\n  background-color: #DDDDDD; }\n\n.mr-n-lg {\n  text-decoration: underline;\n  margin-right: 25px;\n  color: #215497; }\n\n.sign-in-btn {\n  background-color: #009E0F;\n  color: white;\n  font-size: 16px;\n  padding: 8px 30px 8px 30px; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\nheader h3 {\n  font-weight: bold;\n  text-align: center;\n  font-size: 36px; }\n\n.widget-login {\n  padding: 30px;\n  border-radius: 0.8rem; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 19px;\n  color: BLACK;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  border: none;\n  color: black;\n  background-color: transparent;\n  border: 2px solid black;\n  border-radius: 0; }\n  .login-form .form-control:focus {\n    background-color: transparent; }\n"

/***/ },

/***/ "./src/app/login/login.template.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <main id=\"content\" class=\"widget-login-container\" role=\"main\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\r\n<!--        <h5 class=\"widget-login-logo animated fadeInUp\">\r\n          <i class=\"fa fa-circle text-gray\"></i>\r\n          april\r\n          <i class=\"fa fa-circle text-warning\"></i>\r\n        </h5> -->\r\n        <section class=\"widget widget-login animated fadeInUp\">\r\n          <header>\r\n            <h3>KPA</h3>\r\n          </header>\r\n          <div class=\"widget-body\">\r\n            <p class=\"widget-login-info\" style=\"font-weight:bold\">\r\n              Kuwait Philanthropy App\r\n            </p>\r\n            <p class=\"widget-login-info\" style=\"font-weight:bold\">\r\n              Administrator Login\r\n            </p>\r\n            <form class=\"login-form mt-lg\">\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" [(ngModel)]=\"Email\" maxlength=\"30\" name=\"Email\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"Username\">\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <input [(ngModel)]=\"Password\" name=\"Password\" maxlength=\"20\" (keyup)=\"onKey($event)\" class=\"form-control\" id=\"pswd\" type=\"password\" placeholder=\"Password\">\r\n              </div>\r\n              <div id=\"wrongLogin\" style=\"display:none\" class=\"form-group\">\r\n                <div class=\"alert alert-danger alert-sm\">\r\n                  <span class=\"fw-semi-bold\">Danger:</span> Invalid User Name or Password.\r\n                </div>\r\n              </div>\r\n              <div id=\"enterEmail\" style=\"display:none\" class=\"form-group\">\r\n                <div class=\"alert alert-warning alert-sm\">\r\n                  <span class=\"fw-semi-bold\">Warning:</span> Please Enter Email.\r\n                </div>\r\n              </div>\r\n              <div id=\"enterPassword\" style=\"display:none\" class=\"form-group\">\r\n                <div class=\"alert alert-warning alert-sm\">\r\n                  <span class=\"fw-semi-bold\">Warning:</span> Please Enter Password.\r\n                </div>\r\n              </div>\r\n              <div id=\"btns\" class=\"clearfix\">\r\n                <div class=\"btn-toolbar pull-xs-right m-t-1\">\r\n                   <a class=\"mr-n-lg\" href=\"#\">Forgot Password</a>\r\n                <!--  <button type=\"button\" class=\"btn btn-secondary btn-sm\">Create an Account</button> -->\r\n                  <a (click)=\"onSubmit()\" class=\"btn sign-in-btn btn-sm\" style=\"color:white;\">Sign In</a>\r\n                </div>\r\n              </div>\r\n              <div id=\"loader\" class=\"clearfix\" style=\"text-align: center;display: none\">\r\n                <i class=\"fa fa-spinner fa-spin\" style=\"font-size:24px\"></i>\r\n              </div>\r\n              <div class=\"row m-t-1\">\r\n                <div class=\"col-md-6 push-md-6\">\r\n                  <div class=\"clearfix\">\r\n                    <!--<div class=\"abc-checkbox widget-login-info pull-xs-right\">\r\n                      <input type=\"checkbox\" id=\"checkbox1\" value=\"1\">\r\n                      <label for=\"checkbox1\">Keep me signed in </label>\r\n                    </div> -->\r\n                  </div>\r\n                </div>\r\n\r\n              <!--  <div class=\"col-md-6 pull-md-6\">\r\n                  <a class=\"mr-n-lg\" href=\"#\">Trouble with account?</a>\r\n                </div> -->\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </section>\r\n      </div>\r\n    </div>\r\n  </main>\r\n <!-- <footer class=\"page-footer\">\r\n    2016 &copy; Sing. Admin Dashboard Template.\r\n  </footer> -->\r\n</div>\r\n"

/***/ }

});
//# sourceMappingURL=5.map