webpackJsonpac__name_([1],{

/***/ "./node_modules/angular2-localstorage/LocalStorageEmitter.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var core_2 = __webpack_require__("./node_modules/@angular/core/index.js");
var LocalStorageEmitter = (function () {
    function LocalStorageEmitter() {
    }
    LocalStorageEmitter.register = function (ngZone) {
        var index = LocalStorageEmitter.ngZones.indexOf(ngZone);
        if (index === -1) {
            index = LocalStorageEmitter.ngZones.push(ngZone) - 1;
        }
        LocalStorageEmitter.subscribed[index] = ngZone.onMicrotaskEmpty.subscribe(function () {
            for (var _i = 0, _a = LocalStorageEmitter.subscribers; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback();
            }
        });
    };
    LocalStorageEmitter.subscribe = function (callback) {
        LocalStorageEmitter.subscribers.push(callback);
    };
    LocalStorageEmitter.unregister = function (ngZone) {
        var index = LocalStorageEmitter.ngZones.indexOf(ngZone);
        if (index >= 0) {
            LocalStorageEmitter.subscribed[index].unsubscribe();
        }
    };
    LocalStorageEmitter.subscribed = [];
    LocalStorageEmitter.ngZones = [];
    LocalStorageEmitter.subscribers = [];
    return LocalStorageEmitter;
}());
exports.LocalStorageEmitter = LocalStorageEmitter;
var LocalStorageService = (function () {
    function LocalStorageService(ngZone) {
        this.ngZone = ngZone;
        LocalStorageEmitter.register(this.ngZone);
    }
    LocalStorageService.prototype.ngOnDestroy = function () {
        LocalStorageEmitter.unregister(this.ngZone);
    };
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_2.NgZone !== 'undefined' && core_2.NgZone) === 'function' && _a) || Object])
    ], LocalStorageService);
    return LocalStorageService;
    var _a;
}());
exports.LocalStorageService = LocalStorageService;
function LocalStorageSubscriber(appPromise) {
    appPromise.then(function (bla) {
        bla.injector.get(LocalStorageService);
    });
}
exports.LocalStorageSubscriber = LocalStorageSubscriber;


/***/ },

/***/ "./node_modules/angular2-localstorage/WebStorage.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var LocalStorageEmitter_1 = __webpack_require__("./node_modules/angular2-localstorage/LocalStorageEmitter.ts");
function LocalStorage(storageKey) {
    return WebStorage(storageKey, localStorage);
}
exports.LocalStorage = LocalStorage;
function SessionStorage(storageKey) {
    return WebStorage(storageKey, sessionStorage);
}
exports.SessionStorage = SessionStorage;
function WebStorage(storageKey, webStorage) {
    return function (target, decoratedPropertyName) {
        if (!webStorage) {
            return;
        }
        if (!storageKey) {
            storageKey = "" + "/" + decoratedPropertyName;
        }
        Object.defineProperty(target, "_" + decoratedPropertyName + "_mapped", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: false
        });
        var instances = [];
        var values = {};
        var storageValue = webStorage.getItem(storageKey) || null;
        var storageValueJSON = storageValue;
        if ("string" === typeof storageValue) {
            try {
                storageValue = JSON.parse(storageValue);
            }
            catch (e) {
                storageValue = null;
                storageValueJSON = "null";
            }
        }
        var oldJSONValues = {};
        Object.defineProperty(target, decoratedPropertyName, {
            get: function () {
                if (false === this["_" + decoratedPropertyName + "_mapped"]) {
                    this["_" + decoratedPropertyName + "_mapped"] = instances.length;
                    // first registration triggers a setting to localStorage value
                    values[instances.length] = storageValue;
                    oldJSONValues[instances.length] = storageValueJSON;
                    instances.push(this);
                }
                return values[this["_" + decoratedPropertyName + "_mapped"]];
            },
            set: function (newValue) {
                if (false === this["_" + decoratedPropertyName + "_mapped"]) {
                    this["_" + decoratedPropertyName + "_mapped"] = instances.length;
                    // first registration triggers a setting to localStorage value
                    values[instances.length] = storageValue;
                    oldJSONValues[instances.length] = storageValueJSON;
                    instances.push(this);
                    // first "set" call is ignored if we have already a value from the localStorage
                    if (storageValue) {
                        return;
                    }
                }
                values[this["_" + decoratedPropertyName + "_mapped"]] = newValue;
            },
            enumerable: true,
            configurable: true
        });
        LocalStorageEmitter_1.LocalStorageEmitter.subscribe(function () {
            for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
                var instance = instances_1[_i];
                var currentValue = JSON.stringify(instance[decoratedPropertyName]);
                var oldJSONValue = oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]];
                if (currentValue !== oldJSONValue) {
                    oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]] = currentValue;
                    webStorage.setItem(storageKey, currentValue);
                }
            }
        });
    };
}


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


/***/ },

/***/ "./src/app/signup/signup.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var SignUpService_1 = __webpack_require__("./src/app/services/SignUpService.ts");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var WebStorage_1 = __webpack_require__("./node_modules/angular2-localstorage/WebStorage.ts");
var Signup = (function () {
    function Signup(signupService, http) {
        this.signupService = signupService;
        this.http = http;
        console.log(this.userId, this.role);
        jQuery(document).ready(function ($) {
            /*  $('.signUp').attr('disabled',true);
              var emailcheck = $("#SigninUserEmail").val();
       
              $('#SigningupUserName').keyup(function(){
               if(this.value.length < 8 || this.value.length > 20)
                   {
                       $('.signUp').attr('disabled', true);
       
                         }
               else
                     {
                 $('.signUp').attr('disabled',false);
       
                       }
               }) */
            $('.signUp').attr('disabled', true);
            $('.field').keyup(function () {
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
                    var namecheck = $("#SigningupUserName").val();
                    if (namecheck.match(/^[A-z]+$/)) {
                        $('.signUp').attr('disabled', false);
                    }
                    else {
                        $('.signUp').attr('disabled', true);
                    }
                    var emailcheck = $("#SigninUserEmail").val();
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
    Signup.prototype.SignUpNewUser = function () {
        var _this = this;
        this.userToBeCreatedRole = "2";
        this.createdByUserId = this.userId;
        console.log(this.name, this.username, this.userToBeCreatedRole, this.createdByUserId);
        this.signupService.addUser(this.name, this.username, this.userToBeCreatedRole, this.createdByUserId, this.token).subscribe(function (a) {
            if (a.code == 200) {
                _this.userId = a.data;
                _this.userId = a.data._id;
                console.log(_this.userId);
                jQuery("#successBox").text("Invitation Sent Successfully");
                jQuery(".field").val('');
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
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', String)
    ], Signup.prototype, "userId", void 0);
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', String)
    ], Signup.prototype, "role", void 0);
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', String)
    ], Signup.prototype, "token", void 0);
    Signup = __decorate([
        core_1.Component({
            selector: 'signup',
            styles: [__webpack_require__("./src/app/signup/signup.style.scss")],
            template: __webpack_require__("./src/app/signup/signup.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [SignUpService_1.SignupService],
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof SignUpService_1.SignupService !== 'undefined' && SignUpService_1.SignupService) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
    ], Signup);
    return Signup;
    var _a, _b;
}());
exports.Signup = Signup;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/signup/signup.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var signup_component_1 = __webpack_require__("./src/app/signup/signup.component.ts");
exports.routes = [
    { path: '', component: signup_component_1.Signup, pathMatch: 'full' }
];
var SignupModule = (function () {
    function SignupModule() {
    }
    SignupModule.routes = exports.routes;
    SignupModule = __decorate([
        core_1.NgModule({
            declarations: [
                signup_component_1.Signup
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SignupModule);
    return SignupModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupModule;


/***/ },

/***/ "./src/app/signup/signup.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.important-text {\n  color: black;\n  font-weight: bold;\n  font-size: 9px;\n  text-align: center;\n  margin-top: 8px; }\n\n.login-page {\n  background-color: #DDDDDD; }\n\n.mr-n-lg {\n  text-decoration: underline;\n  margin-right: 25px;\n  color: #215497; }\n\n.sign-in-btn {\n  background-color: #009E0F;\n  color: white;\n  font-size: 16px;\n  padding: 8px 30px 8px 30px; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\nheader h3 {\n  font-weight: bold;\n  text-align: center;\n  font-size: 36px; }\n\n.widget-login {\n  padding: 30px;\n  border-radius: 0.8rem;\n  box-shadow: 2px 14px 18px grey; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 19px;\n  color: BLACK;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  border: none;\n  color: black;\n  background-color: transparent;\n  border: none;\n  border-radius: 0; }\n  .login-form .form-control:focus {\n    background-color: transparent; }\n"

/***/ },

/***/ "./src/app/signup/signup.template.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <main id=\"content\" class=\"widget-login-container\" role=\"main\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\r\n       <!-- <h5 class=\"widget-login-logo animated fadeInUp\">\r\n          <i class=\"fa fa-circle text-gray\"></i>\r\n          sing\r\n          <i class=\"fa fa-circle text-warning\"></i>\r\n        </h5> -->\r\n        <section class=\"widget widget-login animated fadeInUp\">\r\n          <header style=\"text-align:center\">\r\n            <i class=\"fa fa-user-plus\" aria-hidden=\"true\" style=\"font-size:100px;color:#5ac063\"></i>\r\n          </header>\r\n          <div class=\"widget-body\">\r\n           <!-- <p class=\"widget-login-info\">\r\n              Kuwait Philanthropy Application.\r\n            </p> -->\r\n            <p class=\"widget-login-info\">\r\n              Advanced Admin Setup\r\n            </p>\r\n            <p class='important-text'>Name should be at least 8 alphabets long</p>\r\n            <form class=\"login-form mt-lg\" id=\"signupForm\">\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" name='name' class=\"form-control field\" id=\"SigningupUserName\" [(ngModel)]=\"name\" placeholder=\"Name\" required autocomplete=\"off\">\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <input class=\"form-control field\" name='username' id=\"SigninUserEmail\" type=\"email\" [(ngModel)]=\"username\" placeholder=\"Email\" required autocomplete=\"off\">\r\n              </div>\r\n              <div id=\"successBox\" style=\"display:none\" class=\"alert alert-success alert-sm\">\r\n                \r\n              </div>\r\n              <div id=\"errorBox\" style=\"display:none\" class=\"alert alert-danger alert-sm\">\r\n                \r\n              </div>\r\n              <div id=\"enterName\" style=\"display:none\" class=\"form-group\">\r\n                <div class=\"alert alert-warning alert-sm\">\r\n                  <span class=\"fw-semi-bold\">Warning:</span> Please Enter Name.\r\n                </div>\r\n              </div>\r\n              <div id=\"enterEmal\" style=\"display:none\" class=\"form-group\">\r\n                <div class=\"alert alert-warning alert-sm\">\r\n                  <span class=\"fw-semi-bold\">Warning:</span> Please Enter Email.\r\n                </div>\r\n              </div>\r\n              <div class=\"clearfix\">\r\n                <div class=\"btn-toolbar pull-xs-right m-t-1\">\r\n                 <a class=\"mr-n-lg\" [routerLink]=\"['/app', 'dashboard']\">Go Back</a>\r\n                 <!-- <button type=\"button\" class=\"btn btn-secondary btn-sm\">Create an Account</button>-->\r\n                  <a><button class=\"btn btn-sm sign-in-btn signUp\" (click)=\"SignUpNewUser()\">Send Invite</button></a>\r\n                </div>\r\n              </div>\r\n              <div class=\"row m-t-1\">\r\n                <div class=\"col-md-6 push-md-6\">\r\n                  <div class=\"clearfix\">\r\n                   <!-- <div class=\"abc-checkbox widget-login-info pull-xs-right\">\r\n                      <input type=\"checkbox\" id=\"checkbox1\" value=\"1\">\r\n                      <label for=\"checkbox1\">Keep me signed in </label>\r\n                    </div> -->\r\n                  </div>\r\n                </div>\r\n\r\n               <!-- <div class=\"col-md-6 pull-md-6\">\r\n                  <a class=\"mr-n-lg\" href=\"#\">Forgot Password</a>\r\n                </div> -->\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </section>\r\n      </div>\r\n    </div>\r\n  </main>\r\n  <footer class=\"page-footer\">\r\n  <!--  2016 &copy; Sing. Admin Dashboard Template.-->\r\n  </footer>\r\n</div>\r\n"

/***/ }

});
//# sourceMappingURL=1.map