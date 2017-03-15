webpackJsonpac__name_([4],{

/***/ "./src/app/agencyadvancedadmin/agency-advanced-admin-signup.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery, $) {"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var SignUpService_1 = __webpack_require__("./src/app/services/SignUpService.ts");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var AgencyAdvancedAdminSignup = (function () {
    function AgencyAdvancedAdminSignup(signupService, http) {
        this.signupService = signupService;
        this.http = http;
        jQuery(document).ready(function ($) {
            $('.signUp').attr('disabled', true);
            $('#AgencyAdvancedAdmin .field').keyup(function () {
                var empty = false;
                $('.field').each(function () {
                    if (($(this).val().length == 0) || this.value.length > 30 || this.value.length < 8) {
                        empty = true;
                    }
                });
                if (empty) {
                    $('.signUp').attr('disabled', true);
                }
                else {
                    var emailcheck = $("#AgencyAdvancedAdminUsername").val();
                    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (emailcheck.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
                        $('.signUp').attr('disabled', false);
                    }
                    else {
                        $('.signUp').attr('disabled', true);
                    }
                }
            });
        });
    }
    AgencyAdvancedAdminSignup.prototype.SignUpNewAgencyAdvancedAdmin = function () {
        var counter = 1;
        this.userToBeCreatedRole = "5";
        this.createdByUserId = sessionStorage.getItem('userId');
        if (counter > 0) {
            jQuery('p.add-another').text("Add another one?");
            jQuery(".field").val("");
        }
        console.log(this.AgencyAdvancedAdminName, this.AgencyAdvancedAdminUsername, this.userToBeCreatedRole, this.createdByUserId);
        this.signupService.addUser(this.AgencyAdvancedAdminName, this.AgencyAdvancedAdminUsername, this.userToBeCreatedRole, this.createdByUserId, sessionStorage.getItem('token')).subscribe(function (a) {
            if (a.code == 200) {
                jQuery("#successBox").text("Invitation Sent Successfully");
                $(".field").val('');
                jQuery("#successBox").css("display", "block");
                jQuery("#errorBox").css("display", "none");
                //this.router.navigate(['/app/dashboard']);
                jQuery('#btns').show();
                jQuery('#loader').hide();
            }
            else if (a.code == 400) {
                jQuery("#successBox").css("display", "none");
                jQuery("#errorBox").text("The proces failed");
                jQuery("#errorBox").css("display", "block");
            }
            else if (300) {
                jQuery("#successBox").css("display", "none");
                jQuery("#errorBox").text("A user with this email already exists");
                jQuery("#errorBox").css("display", "block");
            }
            else if (a.code == 500) {
                jQuery("#successBox").css("display", "none");
                jQuery("#errorBox").text("Your are an unauthorized user");
                jQuery("#errorBox").css("display", "block");
            }
            else {
                jQuery('#btns').show();
                jQuery('#loader').hide();
                jQuery('#wrongLogin').show();
                console.log(a.message);
            }
        });
    };
    AgencyAdvancedAdminSignup = __decorate([
        core_1.Component({
            selector: 'agency-advanced-admin-signup',
            styles: [__webpack_require__("./src/app/agencyadvancedadmin/agency-advanced-admin-signup.style.scss")],
            template: __webpack_require__("./src/app/agencyadvancedadmin/agency-advanced-admin-signup.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [SignUpService_1.SignupService],
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof SignUpService_1.SignupService !== 'undefined' && SignUpService_1.SignupService) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
    ], AgencyAdvancedAdminSignup);
    return AgencyAdvancedAdminSignup;
    var _a, _b;
}());
exports.AgencyAdvancedAdminSignup = AgencyAdvancedAdminSignup;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js"), __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/agencyadvancedadmin/agency-advanced-admin-signup.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var agency_advanced_admin_signup_component_1 = __webpack_require__("./src/app/agencyadvancedadmin/agency-advanced-admin-signup.component.ts");
exports.routes = [
    { path: '', component: agency_advanced_admin_signup_component_1.AgencyAdvancedAdminSignup, pathMatch: 'full' }
];
var AgencyAdvancedAdminSignupModule = (function () {
    function AgencyAdvancedAdminSignupModule() {
    }
    AgencyAdvancedAdminSignupModule.routes = exports.routes;
    AgencyAdvancedAdminSignupModule = __decorate([
        core_1.NgModule({
            declarations: [
                agency_advanced_admin_signup_component_1.AgencyAdvancedAdminSignup
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AgencyAdvancedAdminSignupModule);
    return AgencyAdvancedAdminSignupModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgencyAdvancedAdminSignupModule;


/***/ },

/***/ "./src/app/agencyadvancedadmin/agency-advanced-admin-signup.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.important-text {\n  color: black;\n  font-weight: bold;\n  font-size: 9px;\n  text-align: center;\n  margin-top: 8px; }\n\n.login-page {\n  background-color: #DDDDDD; }\n\n.mr-n-lg {\n  text-decoration: underline;\n  margin-right: 25px;\n  color: #215497; }\n\n.sign-in-btn {\n  background-color: #009E0F;\n  color: white;\n  font-size: 16px;\n  padding: 8px 30px 8px 30px; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\nheader h3 {\n  font-weight: bold;\n  text-align: center;\n  font-size: 36px; }\n\n.widget-login {\n  padding: 30px;\n  border-radius: 0.8rem;\n  box-shadow: 2px 14px 18px grey; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 19px;\n  color: BLACK;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  border: none;\n  color: black;\n  background-color: transparent;\n  border: none;\n  border-radius: 0; }\n  .login-form .form-control:focus {\n    background-color: transparent; }\n"

/***/ },

/***/ "./src/app/agencyadvancedadmin/agency-advanced-admin-signup.template.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <main id=\"content\" class=\"widget-login-container\" role=\"main\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\r\n       <!-- <h5 class=\"widget-login-logo animated fadeInUp\">\r\n          <i class=\"fa fa-circle text-gray\"></i>\r\n          sing\r\n          <i class=\"fa fa-circle text-warning\"></i>\r\n        </h5> -->\r\n        <section class=\"widget widget-login animated fadeInUp\">\r\n          <header style=\"text-align:center\">\r\n            <i class=\"fa fa-user-plus\" aria-hidden=\"true\" style=\"font-size:100px;color:#5ac063\"></i>\r\n          </header>\r\n          <div class=\"widget-body\">\r\n          <!--  <p class=\"widget-login-info\">\r\n              Kuwait Philanthropy Application.\r\n            </p>-->\r\n            <p class=\"widget-login-info add-another\">\r\n              Agency Advanced Admin Setup\r\n            </p>\r\n            <p class='important-text'>Name should be at least 8 alphabets long</p>\r\n            <form class=\"login-form mt-lg\" id=\"AgencyAdvancedAdmin\">\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" name='AgencyAdvancedAdminName'  class=\"form-control field\" id=\"AgencyAdvancedAdminName\" [(ngModel)]=\"AgencyAdvancedAdminName\" placeholder=\"Name\"  autocomplete=\"off\">\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <input class=\"form-control field\" name='AgencyAdvancedAdminUsername' id=\"AgencyAdvancedAdminUsername\" type=\"email\" [(ngModel)]=\"AgencyAdvancedAdminUsername\" placeholder=\"Email\"  autocomplete=\"off\">\r\n              </div>\r\n              <div id=\"successBox\" style=\"display:none\" class=\"alert alert-success alert-sm\">\r\n                \r\n              </div>\r\n              <div id=\"errorBox\" style=\"display:none\" class=\"alert alert-danger alert-sm\">\r\n                \r\n              </div>\r\n              <div class=\"clearfix\">\r\n                <div class=\"btn-toolbar pull-xs-right m-t-1\">\r\n                 <a class=\"mr-n-lg\" [routerLink]=\"['/app', 'dashboard']\">Go Back</a>\r\n                 <!-- <button type=\"button\" class=\"btn btn-secondary btn-sm\">Create an Account</button>-->\r\n                  <button class=\"btn btn-sm sign-in-btn signUp\" (click)=\"SignUpNewAgencyAdvancedAdmin()\">Send Invite</button>\r\n                </div>\r\n              </div>\r\n              <div class=\"row m-t-1\">\r\n                <div class=\"col-md-6 push-md-6\">\r\n                  <div class=\"clearfix\">\r\n                   <!-- <div class=\"abc-checkbox widget-login-info pull-xs-right\">\r\n                      <input type=\"checkbox\" id=\"checkbox1\" value=\"1\">\r\n                      <label for=\"checkbox1\">Keep me signed in </label>\r\n                    </div> -->\r\n                  </div>\r\n                </div>\r\n\r\n               <!-- <div class=\"col-md-6 pull-md-6\">\r\n                  <a class=\"mr-n-lg\" href=\"#\">Forgot Password</a>\r\n                </div> -->\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </section>\r\n      </div>\r\n    </div>\r\n  </main>\r\n  <footer class=\"page-footer\">\r\n  <!--  2016 &copy; Sing. Admin Dashboard Template.-->\r\n  </footer>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/services/ServiceUrl.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var ServiceUrl = (function () {
    function ServiceUrl() {
        this.baseUrl = "https://kpa.herokuapp.com/";
    }
    return ServiceUrl;
}());
exports.ServiceUrl = ServiceUrl;


/***/ },

/***/ "./src/app/services/SignUpService.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var ServiceUrl_1 = __webpack_require__("./src/app/services/ServiceUrl.ts");
var SignupService = (function () {
    function SignupService(http) {
        this.http = http;
        this.serviceUrl = new ServiceUrl_1.ServiceUrl();
        console.log("Sign Up initialized");
    }
    SignupService.prototype.addUser = function (name, email, userToBeCreatedRole, createdByUserId, token) {
        var body = JSON.stringify({ "userDisplayName": name, "email": email, "userToBeCreatedRole": userToBeCreatedRole, "createdByUserId": createdByUserId, "token": token });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
        var options = new http_1.RequestOptions({ method: 'post', headers: headers });
        console.log(body);
        return this.http.post(this.serviceUrl.baseUrl + "users/addAdminsRoute", body, options)
            .map(function (res) { return res.json(); });
    };
    SignupService.prototype.addAgency = function (agencyName, name, email, userToBeCreatedRole, createdByUserId, token) {
        var body = JSON.stringify({ "agencyName": agencyName, "userDisplayName": name, "email": email, "userToBeCreatedRole": userToBeCreatedRole, "createdByUserId": createdByUserId, "token": token });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
        var options = new http_1.RequestOptions({ method: 'post', headers: headers });
        console.log(body);
        return this.http.post(this.serviceUrl.baseUrl + "users/addAdminsRoute", body, options)
            .map(function (res) { return res.json(); });
    };
    SignupService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], SignupService);
    return SignupService;
    var _a;
}());
exports.SignupService = SignupService;


/***/ }

});
//# sourceMappingURL=4.map