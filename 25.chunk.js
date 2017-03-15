webpackJsonpac__name_([25],{

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

/***/ "./src/app/projectdashboard/normalize.css":
/***/ function(module, exports) {

module.exports = "article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block;}audio,canvas,video{display:inline-block;}audio:not([controls]){display:none;height:0;}[hidden]{display:none;}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}body{margin:0;}a:focus{outline:thin dotted;}a:active,a:hover{outline:0;}h1{font-size:2em;margin:0.67em 0;}abbr[title]{border-bottom:1px dotted;}b,strong{font-weight:bold;}dfn{font-style:italic;}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0;}mark{background:#ff0;color:#000;}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em;}pre{white-space:pre-wrap;}q{quotes:\"\\201C\" \"\\201D\" \"\\2018\" \"\\2019\";}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sup{top:-0.5em;}sub{bottom:-0.25em;}img{border:0;}svg:not(:root){overflow:hidden;}figure{margin:0;}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em;}legend{border:0;padding:0;}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;}button,input{line-height:normal;}button,select{text-transform:none;}button,html input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"]{-webkit-appearance:button;cursor:pointer;}button[disabled],html input[disabled]{cursor:default;}input[type=\"checkbox\"],input[type=\"radio\"]{box-sizing:border-box;padding:0;}input[type=\"search\"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}input[type=\"search\"]::-webkit-search-cancel-button,input[type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none;}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}textarea{overflow:auto;vertical-align:top;}table{border-collapse:collapse;border-spacing:0;}"

/***/ },

/***/ "./src/app/projectdashboard/set1.css":
/***/ function(module, exports) {

module.exports = "\n.grid {\n\tposition: relative;\n\tmargin: 0 auto;\n\tpadding: 1em 0 4em;\n\tmax-width: 1000px;\n\tlist-style: none;\n\ttext-align: center;\n}\n\n/* Common style */\n.grid figure {\n\tposition: relative;\n\tfloat: left;\n\toverflow: hidden;\n\tmargin: 10px 1%;\n\tmin-width: 320px;\n\tmax-width: 480px;\n\tmax-height: 360px;\n\twidth: 48%;\n\tbackground: #3085a3;\n\ttext-align: center;\n\tcursor: pointer;\n}\n\n.grid figure img {\n\tposition: relative;\n\tdisplay: block;\n\tmin-height: 100%;\n\tmax-width: 100%;\n\topacity: 0.8;\n}\n\n.grid figure figcaption {\n\tpadding: 2em;\n\tcolor: #fff;\n\ttext-transform: uppercase;\n\tfont-size: 1.25em;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\n.grid figure figcaption::before,\n.grid figure figcaption::after {\n\tpointer-events: none;\n}\n\n.grid figure figcaption,\n.grid figure figcaption > a {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n}\n\n/* Anchor will cover the whole item by default */\n/* For some effects it will show as a button */\n.grid figure figcaption > a {\n\tz-index: 1000;\n\ttext-indent: 200%;\n\twhite-space: nowrap;\n\tfont-size: 0;\n\topacity: 0;\n}\n\n.grid figure h2 {\n\tword-spacing: -0.15em;\n\tfont-weight: 300;\n}\n\n.grid figure h2 span {\n\tfont-weight: 800;\n}\n\n.grid figure h2,\n.grid figure p {\n\tmargin: 0;\n}\n\n.grid figure p {\n\tletter-spacing: 1px;\n\tfont-size: 68.5%;\n}\n\n/* Individual effects */\n\n/*---------------*/\n/***** Lily *****/\n/*---------------*/\n\nfigure.effect-lily img {\n\tmax-width: none;\n\twidth: -webkit-calc(100% + 50px);\n\twidth: calc(100% + 50px);\n\topacity: 0.7;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-40px,0, 0);\n\ttransform: translate3d(-40px,0,0);\n}\n\nfigure.effect-lily figcaption {\n\ttext-align: left;\n}\n\nfigure.effect-lily figcaption > div {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tpadding: 2em;\n\twidth: 100%;\n\theight: 50%;\n}\n\nfigure.effect-lily h2,\nfigure.effect-lily p {\n\t-webkit-transform: translate3d(0,40px,0);\n\ttransform: translate3d(0,40px,0);\n}\n\nfigure.effect-lily h2 {\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n}\n\nfigure.effect-lily p {\n\tcolor: rgba(255,255,255,0.8);\n\topacity: 0;\n\t-webkit-transition: opacity 0.2s, -webkit-transform 0.35s;\n\ttransition: opacity 0.2s, transform 0.35s;\n}\n\nfigure.effect-lily:hover img,\nfigure.effect-lily:hover p {\n\topacity: 1;\n}\n\nfigure.effect-lily:hover img,\nfigure.effect-lily:hover h2,\nfigure.effect-lily:hover p {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-lily:hover p {\n\t-webkit-transition-delay: 0.05s;\n\ttransition-delay: 0.05s;\n\t-webkit-transition-duration: 0.35s;\n\ttransition-duration: 0.35s;\n}\n\n/*---------------*/\n/***** Sadie *****/\n/*---------------*/\n\nfigure.effect-sadie figcaption::before {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: -webkit-linear-gradient(top, rgba(72,76,97,0) 0%, rgba(72,76,97,0.8) 75%);\n\tbackground: linear-gradient(to bottom, rgba(72,76,97,0) 0%, rgba(72,76,97,0.8) 75%);\n\tcontent: '';\n\topacity: 0;\n\t-webkit-transform: translate3d(0,50%,0);\n\ttransform: translate3d(0,50%,0);\n}\n\nfigure.effect-sadie h2 {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\twidth: 100%;\n\tcolor: #484c61;\n\t-webkit-transition: -webkit-transform 0.35s, color 0.35s;\n\ttransition: transform 0.35s, color 0.35s;\n\t-webkit-transform: translate3d(0,-50%,0);\n\ttransform: translate3d(0,-50%,0);\n}\n\nfigure.effect-sadie figcaption::before,\nfigure.effect-sadie p {\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-sadie p {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tpadding: 2em;\n\twidth: 100%;\n\topacity: 0;\n\t-webkit-transform: translate3d(0,10px,0);\n\ttransform: translate3d(0,10px,0);\n}\n\nfigure.effect-sadie:hover h2 {\n\tcolor: #fff;\n\t-webkit-transform: translate3d(0,-50%,0) translate3d(0,-40px,0);\n\ttransform: translate3d(0,-50%,0) translate3d(0,-40px,0);\n}\n\nfigure.effect-sadie:hover figcaption::before ,\nfigure.effect-sadie:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Roxy *****/\n/*---------------*/\n\nfigure.effect-roxy {\n\tbackground: -webkit-linear-gradient(45deg, #ff89e9 0%, #05abe0 100%);\n\tbackground: linear-gradient(45deg, #ff89e9 0%,#05abe0 100%);\n}\n\nfigure.effect-roxy img {\n\tmax-width: none;\n\twidth: -webkit-calc(100% + 60px);\n\twidth: calc(100% + 60px);\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-50px,0,0);\n\ttransform: translate3d(-50px,0,0);\n}\n\nfigure.effect-roxy figcaption::before {\n\tposition: absolute;\n\ttop: 30px;\n\tright: 30px;\n\tbottom: 30px;\n\tleft: 30px;\n\tborder: 1px solid #fff;\n\tcontent: '';\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-20px,0,0);\n\ttransform: translate3d(-20px,0,0);\n}\n\nfigure.effect-roxy figcaption {\n\tpadding: 3em;\n\ttext-align: left;\n}\n\nfigure.effect-roxy h2 {\n\tpadding: 30% 0 10px 0;\n}\n\nfigure.effect-roxy p {\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-10px,0,0);\n\ttransform: translate3d(-10px,0,0);\n}\n\nfigure.effect-roxy:hover img {\n\topacity: 0.7;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-roxy:hover figcaption::before,\nfigure.effect-roxy:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Bubba *****/\n/*---------------*/\n\nfigure.effect-bubba {\n\tbackground: #9e5406;\n}\n\nfigure.effect-bubba img {\n\topacity: 0.7;\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-bubba:hover img {\n\topacity: 0.4;\n}\n\nfigure.effect-bubba figcaption::before,\nfigure.effect-bubba figcaption::after {\n\tposition: absolute;\n\ttop: 30px;\n\tright: 30px;\n\tbottom: 30px;\n\tleft: 30px;\n\tcontent: '';\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-bubba figcaption::before {\n\tborder-top: 1px solid #fff;\n\tborder-bottom: 1px solid #fff;\n\t-webkit-transform: scale(0,1);\n\ttransform: scale(0,1);\n}\n\nfigure.effect-bubba figcaption::after {\n\tborder-right: 1px solid #fff;\n\tborder-left: 1px solid #fff;\n\t-webkit-transform: scale(1,0);\n\ttransform: scale(1,0);\n}\n\nfigure.effect-bubba h2 {\n\tpadding-top: 30%;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,-20px,0);\n\ttransform: translate3d(0,-20px,0);\n}\n\nfigure.effect-bubba p {\n\tpadding: 20px 2.5em;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,20px,0);\n\ttransform: translate3d(0,20px,0);\n}\n\nfigure.effect-bubba:hover figcaption::before,\nfigure.effect-bubba:hover figcaption::after {\n\topacity: 1;\n\t-webkit-transform: scale(1);\n\ttransform: scale(1);\n}\n\nfigure.effect-bubba:hover h2,\nfigure.effect-bubba:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Romeo *****/\n/*---------------*/\n\nfigure.effect-romeo {\n\t-webkit-perspective: 1000px;\n\tperspective: 1000px;\n}\n\nfigure.effect-romeo img {\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,0,300px);\n\ttransform: translate3d(0,0,300px);\n}\n\nfigure.effect-romeo:hover img {\n\topacity: 0.6;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-romeo figcaption::before,\nfigure.effect-romeo figcaption::after {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\twidth: 80%;\n\theight: 1px;\n\tbackground: #fff;\n\tcontent: '';\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-50%,-50%,0);\n\ttransform: translate3d(-50%,-50%,0);\n}\n\nfigure.effect-romeo:hover figcaption::before {\n\topacity: 0.5;\n\t-webkit-transform: translate3d(-50%,-50%,0) rotate(45deg);\n\ttransform: translate3d(-50%,-50%,0) rotate(45deg);\n}\n\nfigure.effect-romeo:hover figcaption::after {\n\topacity: 0.5;\n\t-webkit-transform: translate3d(-50%,-50%,0) rotate(-45deg);\n\ttransform: translate3d(-50%,-50%,0) rotate(-45deg);\n}\n\nfigure.effect-romeo h2,\nfigure.effect-romeo p {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\twidth: 100%;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n}\n\nfigure.effect-romeo h2 {\n\t-webkit-transform: translate3d(0,-50%,0) translate3d(0,-150%,0);\n\ttransform: translate3d(0,-50%,0) translate3d(0,-150%,0);\n}\n\nfigure.effect-romeo p {\n\tpadding: 0.25em 2em;\n\t-webkit-transform: translate3d(0,-50%,0) translate3d(0,150%,0);\n\ttransform: translate3d(0,-50%,0) translate3d(0,150%,0);\n}\n\nfigure.effect-romeo:hover h2 {\n\t-webkit-transform: translate3d(0,-50%,0) translate3d(0,-100%,0);\n\ttransform: translate3d(0,-50%,0) translate3d(0,-100%,0);\n}\n\nfigure.effect-romeo:hover p {\n\t-webkit-transform: translate3d(0,-50%,0) translate3d(0,100%,0);\n\ttransform: translate3d(0,-50%,0) translate3d(0,100%,0);\n}\n\n/*---------------*/\n/***** Layla *****/\n/*---------------*/\n\nfigure.effect-layla {\n\tbackground: #18a367;\n}\n\nfigure.effect-layla img {\n\theight: 390px;\n}\n\nfigure.effect-layla figcaption {\n\tpadding: 3em;\n}\n\nfigure.effect-layla figcaption::before,\nfigure.effect-layla figcaption::after {\n\tposition: absolute;\n\tcontent: '';\n\topacity: 0;\n}\n\nfigure.effect-layla figcaption::before {\n\ttop: 50px;\n\tright: 30px;\n\tbottom: 50px;\n\tleft: 30px;\n\tborder-top: 1px solid #fff;\n\tborder-bottom: 1px solid #fff;\n\t-webkit-transform: scale(0,1);\n\ttransform: scale(0,1);\n\t-webkit-transform-origin: 0 0;\n\ttransform-origin: 0 0;\n}\n\nfigure.effect-layla figcaption::after {\n\ttop: 30px;\n\tright: 50px;\n\tbottom: 30px;\n\tleft: 50px;\n\tborder-right: 1px solid #fff;\n\tborder-left: 1px solid #fff;\n\t-webkit-transform: scale(1,0);\n\ttransform: scale(1,0);\n\t-webkit-transform-origin: 100% 0;\n\ttransform-origin: 100% 0;\n}\n\nfigure.effect-layla h2 {\n\tpadding-top: 26%;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n}\n\nfigure.effect-layla p {\n\tpadding: 0.5em 2em;\n\ttext-transform: none;\n\topacity: 0;\n\t-webkit-transform: translate3d(0,-10px,0);\n\ttransform: translate3d(0,-10px,0);\n}\n\nfigure.effect-layla img,\nfigure.effect-layla h2 {\n\t-webkit-transform: translate3d(0,-30px,0);\n\ttransform: translate3d(0,-30px,0);\n}\n\nfigure.effect-layla img,\nfigure.effect-layla figcaption::before,\nfigure.effect-layla figcaption::after,\nfigure.effect-layla p {\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-layla:hover img {\n\topacity: 0.7;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-layla:hover figcaption::before,\nfigure.effect-layla:hover figcaption::after {\n\topacity: 1;\n\t-webkit-transform: scale(1);\n\ttransform: scale(1);\n}\n\nfigure.effect-layla:hover h2,\nfigure.effect-layla:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-layla:hover figcaption::after,\nfigure.effect-layla:hover h2,\nfigure.effect-layla:hover p,\nfigure.effect-layla:hover img {\n\t-webkit-transition-delay: 0.15s;\n\ttransition-delay: 0.15s;\n}\n\n/*---------------*/\n/***** Honey *****/\n/*---------------*/\n\nfigure.effect-honey {\n\tbackground: #4a3753;\n}\n\nfigure.effect-honey img {\n\topacity: 0.9;\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-honey:hover img {\n\topacity: 0.5;\n}\n\nfigure.effect-honey figcaption::before {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 10px;\n\tbackground: #fff;\n\tcontent: '';\n\t-webkit-transform: translate3d(0,10px,0);\n\ttransform: translate3d(0,10px,0);\n}\n\nfigure.effect-honey h2 {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tpadding: 1em 1.5em;\n\twidth: 100%;\n\ttext-align: left;\n\t-webkit-transform: translate3d(0,-30px,0);\n\ttransform: translate3d(0,-30px,0);\n}\n\nfigure.effect-honey h2 i {\n\tfont-style: normal;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,-30px,0);\n\ttransform: translate3d(0,-30px,0);\n}\n\nfigure.effect-honey figcaption::before,\nfigure.effect-honey h2 {\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n}\n\nfigure.effect-honey:hover figcaption::before,\nfigure.effect-honey:hover h2,\nfigure.effect-honey:hover h2 i {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Oscar *****/\n/*---------------*/\n\nfigure.effect-oscar {\n\tbackground: -webkit-linear-gradient(45deg, #22682a 0%, #9b4a1b 40%, #3a342a 100%);\n\tbackground: linear-gradient(45deg, #22682a 0%,#9b4a1b 40%,#3a342a 100%);\n}\n\nfigure.effect-oscar img {\n\topacity: 0.9;\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-oscar figcaption {\n\tpadding: 3em;\n\tbackground-color: rgba(58,52,42,0.7);\n\t-webkit-transition: background-color 0.35s;\n\ttransition: background-color 0.35s;\n}\n\nfigure.effect-oscar figcaption::before {\n\tposition: absolute;\n\ttop: 30px;\n\tright: 30px;\n\tbottom: 30px;\n\tleft: 30px;\n\tborder: 1px solid #fff;\n\tcontent: '';\n}\n\nfigure.effect-oscar h2 {\n\tmargin: 20% 0 10px 0;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,100%,0);\n\ttransform: translate3d(0,100%,0);\n}\n\nfigure.effect-oscar figcaption::before,\nfigure.effect-oscar p {\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: scale(0);\n\ttransform: scale(0);\n}\n\nfigure.effect-oscar:hover h2 {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-oscar:hover figcaption::before,\nfigure.effect-oscar:hover p {\n\topacity: 1;\n\t-webkit-transform: scale(1);\n\ttransform: scale(1);\n}\n\nfigure.effect-oscar:hover figcaption {\n\tbackground-color: rgba(58,52,42,0);\n}\n\nfigure.effect-oscar:hover img {\n\topacity: 0.4;\n}\n\n/*---------------*/\n/***** Marley *****/\n/*---------------*/\n\nfigure.effect-marley figcaption {\n\ttext-align: right;\n}\n\nfigure.effect-marley h2,\nfigure.effect-marley p {\n\tposition: absolute;\n\tright: 30px;\n\tleft: 30px;\n\tpadding: 10px 0;\n}\n\n\nfigure.effect-marley p {\n\tbottom: 30px;\n\tline-height: 1.5;\n\t-webkit-transform: translate3d(0,100%,0);\n\ttransform: translate3d(0,100%,0);\n}\n\nfigure.effect-marley h2 {\n\ttop: 30px;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,20px,0);\n\ttransform: translate3d(0,20px,0);\n}\n\nfigure.effect-marley:hover h2 {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-marley h2::after {\n\tposition: absolute;\n\ttop: 100%;\n\tleft: 0;\n\twidth: 100%;\n\theight: 4px;\n\tbackground: #fff;\n\tcontent: '';\n\t-webkit-transform: translate3d(0,40px,0);\n\ttransform: translate3d(0,40px,0);\n}\n\nfigure.effect-marley h2::after,\nfigure.effect-marley p {\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-marley:hover h2::after,\nfigure.effect-marley:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Ruby *****/\n/*---------------*/\n\nfigure.effect-ruby {\n\tbackground-color: #17819c;\n}\n\nfigure.effect-ruby img {\n\topacity: 0.7;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: scale(1.15);\n\ttransform: scale(1.15);\n}\n\nfigure.effect-ruby:hover img {\n\topacity: 0.5;\n\t-webkit-transform: scale(1);\n\ttransform: scale(1);\n}\n\nfigure.effect-ruby h2 {\n\tmargin-top: 20%;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,20px,0);\n\ttransform: translate3d(0,20px,0);\n}\n\nfigure.effect-ruby p {\n\tmargin: 1em 0 0;\n\tpadding: 3em;\n\tborder: 1px solid #fff;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,20px,0) scale(1.1);\n\ttransform: translate3d(0,20px,0) scale(1.1);\n} \n\nfigure.effect-ruby:hover h2 {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-ruby:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0) scale(1);\n\ttransform: translate3d(0,0,0) scale(1);\n}\n\n/*---------------*/\n/***** Milo *****/\n/*---------------*/\n\nfigure.effect-milo {\n\tbackground: #2e5d5a;\n}\n\nfigure.effect-milo img {\n\tmax-width: none;\n\twidth: -webkit-calc(100% + 60px);\n\twidth: calc(100% + 60px);\n\topacity: 1;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-30px,0,0) scale(1.12);\n\ttransform: translate3d(-30px,0,0) scale(1.12);\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\nfigure.effect-milo:hover img {\n\topacity: 0.5;\n\t-webkit-transform: translate3d(0,0,0) scale(1);\n\ttransform: translate3d(0,0,0) scale(1);\n}\n\nfigure.effect-milo h2 {\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tpadding: 1em 1.2em;\n}\n\nfigure.effect-milo p {\n\tpadding: 0 10px 0 0;\n\twidth: 50%;\n\tborder-right: 1px solid #fff;\n\ttext-align: right;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-40px,0,0);\n\ttransform: translate3d(-40px,0,0);\n}\n\nfigure.effect-milo:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Dexter *****/\n/*---------------*/\n\nfigure.effect-dexter {\n\tbackground: -webkit-linear-gradient(top, rgba(37,141,200,1) 0%, rgba(104,60,19,1) 100%);\n\tbackground: linear-gradient(to bottom, rgba(37,141,200,1) 0%,rgba(104,60,19,1) 100%); \n}\n\nfigure.effect-dexter img {\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-dexter:hover img {\n\topacity: 0.4;\n}\n\nfigure.effect-dexter figcaption::after {\n\tposition: absolute;\n\tright: 30px;\n\tbottom: 30px;\n\tleft: 30px;\n\theight: -webkit-calc(50% - 30px);\n\theight: calc(50% - 30px);\n\tborder: 7px solid #fff;\n\tcontent: '';\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,-100%,0);\n\ttransform: translate3d(0,-100%,0);\n}\n\nfigure.effect-dexter:hover figcaption::after {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-dexter figcaption {\n\tpadding: 3em;\n\ttext-align: left;\n}\n\nfigure.effect-dexter p {\n\tposition: absolute;\n\tright: 60px;\n\tbottom: 60px;\n\tleft: 60px;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,-100px,0);\n\ttransform: translate3d(0,-100px,0);\n}\n\nfigure.effect-dexter:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Sarah *****/\n/*---------------*/\n\nfigure.effect-sarah {\n\tbackground: #42b078;\n}\n\nfigure.effect-sarah img {\n\tmax-width: none;\n\twidth: -webkit-calc(100% + 20px);\n\twidth: calc(100% + 20px);\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-10px,0,0);\n\ttransform: translate3d(-10px,0,0);\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\nfigure.effect-sarah:hover img {\n\topacity: 0.4;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-sarah figcaption {\n\ttext-align: left;\n}\n\nfigure.effect-sarah h2 {\n\tposition: relative;\n\toverflow: hidden;\n\tpadding: 0.5em 0;\n}\n\nfigure.effect-sarah h2::after {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 3px;\n\tbackground: #fff;\n\tcontent: '';\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(-100%,0,0);\n\ttransform: translate3d(-100%,0,0);\n}\n\nfigure.effect-sarah:hover h2::after {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-sarah p {\n\tpadding: 1em 0;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(100%,0,0);\n\ttransform: translate3d(100%,0,0);\n}\n\nfigure.effect-sarah:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Zoe *****/\n/*---------------*/\n\nfigure.effect-zoe figcaption {\n\ttop: auto;\n\tbottom: 0;\n\tpadding: 1em;\n\theight: 3.75em;\n\tbackground: #fff;\n\tcolor: #3c4a50;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,100%,0);\n\ttransform: translate3d(0,100%,0);\n}\n\nfigure.effect-zoe h2 {\n\tfloat: left;\n}\n\nfigure.effect-zoe p.icon-links a {\n\tfloat: right;\n\tcolor: #3c4a50;\n\tfont-size: 1.4em;\n}\n\nfigure.effect-zoe:hover p.icon-links a:hover,\nfigure.effect-zoe:hover p.icon-links a:focus {\n\tcolor: #252d31;\n}\n\nfigure.effect-zoe p.description {\n\tposition: absolute;\n\tbottom: 8em;\n\tpadding: 2em;\n\tcolor: #fff;\n\ttext-transform: none;\n\tfont-size: 90%;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n\t-webkit-backface-visibility: hidden; /* Fix for Chrome 37.0.2062.120 (Mac) */\n}\n\nfigure.effect-zoe h2,\nfigure.effect-zoe p.icon-links a {\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,200%,0);\n\ttransform: translate3d(0,200%,0);\n}\n\nfigure.effect-zoe p.icon-links a span::before {\n\tdisplay: inline-block;\n\tpadding: 8px 10px;\n\tfont-family: 'feathericons';\n\tspeak: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.icon-eye::before {\n\tcontent: '\\E000';\n}\n\n.icon-paper-clip::before {\n\tcontent: '\\E001';\n}\n\n.icon-heart::before {\n\tcontent: '\\E024';\n}\n\nfigure.effect-zoe h2 {\n\tdisplay: inline-block;\n}\n\nfigure.effect-zoe:hover p.description {\n\topacity: 1;\n}\n\nfigure.effect-zoe:hover figcaption,\nfigure.effect-zoe:hover h2,\nfigure.effect-zoe:hover p.icon-links a {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-zoe:hover h2 {\n\t-webkit-transition-delay: 0.05s;\n\ttransition-delay: 0.05s;\n}\n\nfigure.effect-zoe:hover p.icon-links a:nth-child(3) {\n\t-webkit-transition-delay: 0.1s;\n\ttransition-delay: 0.1s;\n}\n\nfigure.effect-zoe:hover p.icon-links a:nth-child(2) {\n\t-webkit-transition-delay: 0.15s;\n\ttransition-delay: 0.15s;\n}\n\nfigure.effect-zoe:hover p.icon-links a:first-child {\n\t-webkit-transition-delay: 0.2s;\n\ttransition-delay: 0.2s;\n}\n\n/*---------------*/\n/***** Chico *****/\n/*---------------*/\n\nfigure.effect-chico img {\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: scale(1.12);\n\ttransform: scale(1.12);\n}\n\nfigure.effect-chico:hover img {\n\topacity: 0.5;\n\t-webkit-transform: scale(1);\n\ttransform: scale(1);\n}\n\nfigure.effect-chico figcaption {\n\tpadding: 3em;\n}\n\nfigure.effect-chico figcaption::before {\n\tposition: absolute;\n\ttop: 30px;\n\tright: 30px;\n\tbottom: 30px;\n\tleft: 30px;\n\tborder: 1px solid #fff;\n\tcontent: '';\n\t-webkit-transform: scale(1.1);\n\ttransform: scale(1.1);\n}\n\nfigure.effect-chico figcaption::before,\nfigure.effect-chico p {\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-chico h2 {\n\tpadding: 20% 0 20px 0;\n}\n\nfigure.effect-chico p {\n\tmargin: 0 auto;\n\tmax-width: 200px;\n\t-webkit-transform: scale(1.5);\n\ttransform: scale(1.5);\n}\n\nfigure.effect-chico:hover figcaption::before,\nfigure.effect-chico:hover p {\n\topacity: 1;\n\t-webkit-transform: scale(1);\n\ttransform: scale(1);\n}\n\n@media screen and (max-width: 50em) {\n\t.content {\n\t\tpadding: 0 10px;\n\t\ttext-align: center;\n\t}\n\t.grid figure {\n\t\tdisplay: inline-block;\n\t\tfloat: none;\n\t\tmargin: 10px auto;\n\t\twidth: 100%;\n\t}\n}"

/***/ },

/***/ "./src/app/projectdashboard/set2.css":
/***/ function(module, exports) {

module.exports = ".grid {\n\tposition: relative;\n\tclear: both;\n\tmargin: 0 auto;\n\tpadding: 1em 0 4em;\n\tmax-width: 1000px;\n\tlist-style: none;\n\ttext-align: center;\n}\n\n/* Common style */\n.grid figure {\n\tposition: relative;\n\tfloat: left;\n\toverflow: hidden;\n\tmargin: 10px 1%;\n\tmin-width: 320px;\n\tmax-width: 480px;\n\tmax-height: 360px;\n\twidth: 48%;\n\theight: auto;\n\tbackground: #3085a3;\n\ttext-align: center;\n\tcursor: pointer;\n}\n\n.grid figure img {\n\tposition: relative;\n\tdisplay: block;\n\tmin-height: 100%;\n\tmax-width: 100%;\n\topacity: 0.8;\n}\n\n.grid figure figcaption {\n\tpadding: 2em;\n\tcolor: #fff;\n\ttext-transform: uppercase;\n\tfont-size: 1.25em;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\n.grid figure figcaption::before,\n.grid figure figcaption::after {\n\tpointer-events: none;\n}\n\n.grid figure figcaption,\n.grid figure figcaption > a {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n}\n\n/* Anchor will cover the whole item by default */\n/* For some effects it will show as a button */\n.grid figure figcaption > a {\n\tz-index: 1000;\n\ttext-indent: 200%;\n\twhite-space: nowrap;\n\tfont-size: 0;\n\topacity: 0;\n}\n\n.grid figure h2 {\n\tword-spacing: -0.15em;\n\tfont-weight: 300;\n}\n\n.grid figure h2 span {\n\tfont-weight: 800;\n}\n\n.grid figure h2,\n.grid figure p {\n\tmargin: 0;\n}\n\n.grid figure p {\n\tletter-spacing: 1px;\n\tfont-size: 68.5%;\n}\n\n/* Individual effects */\n\n/*---------------*/\n/***** Julia *****/\n/*---------------*/\n\nfigure.effect-julia {\n\tbackground: #2f3238;\n}\n\nfigure.effect-julia img {\n\tmax-width: none;\n\theight: 400px;\n\t-webkit-transition: opacity 1s, -webkit-transform 1s;\n\ttransition: opacity 1s, transform 1s;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\nfigure.effect-julia figcaption {\n\ttext-align: left;\n}\n\nfigure.effect-julia h2 {\n\tposition: relative;\n\tpadding: 0.5em 0;\n}\n\nfigure.effect-julia p {\n\tdisplay: inline-block;\n\tmargin: 0 0 0.25em;\n\tpadding: 0.4em 1em;\n\tbackground: rgba(255,255,255,0.9);\n\tcolor: #2f3238;\n\ttext-transform: none;\n\tfont-weight: 500;\n\tfont-size: 75%;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-360px,0,0);\n\ttransform: translate3d(-360px,0,0);\n}\n\nfigure.effect-julia p:first-child {\n\t-webkit-transition-delay: 0.15s;\n\ttransition-delay: 0.15s;\n}\n\nfigure.effect-julia p:nth-of-type(2) {\n\t-webkit-transition-delay: 0.1s;\n\ttransition-delay: 0.1s;\n}\n\nfigure.effect-julia p:nth-of-type(3) {\n\t-webkit-transition-delay: 0.05s;\n\ttransition-delay: 0.05s;\n}\n\nfigure.effect-julia:hover p:first-child {\n\t-webkit-transition-delay: 0s;\n\ttransition-delay: 0s;\n}\n\nfigure.effect-julia:hover p:nth-of-type(2) {\n\t-webkit-transition-delay: 0.05s;\n\ttransition-delay: 0.05s;\n}\n\nfigure.effect-julia:hover p:nth-of-type(3) {\n\t-webkit-transition-delay: 0.1s;\n\ttransition-delay: 0.1s;\n}\n\nfigure.effect-julia:hover img {\n\topacity: 0.4;\n\t-webkit-transform: scale3d(1.1,1.1,1);\n\ttransform: scale3d(1.1,1.1,1);\n}\n\nfigure.effect-julia:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*-----------------*/\n/***** Goliath *****/\n/*-----------------*/\n\nfigure.effect-goliath {\n\tbackground: #df4e4e;\n}\n\nfigure.effect-goliath img,\nfigure.effect-goliath h2 {\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n}\n\nfigure.effect-goliath img {\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\nfigure.effect-goliath h2,\nfigure.effect-goliath p {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tpadding: 30px;\n}\n\nfigure.effect-goliath p {\n\ttext-transform: none;\n\tfont-size: 90%;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,50px,0);\n\ttransform: translate3d(0,50px,0);\n}\n\nfigure.effect-goliath:hover img {\n\t-webkit-transform: translate3d(0,-80px,0);\n\ttransform: translate3d(0,-80px,0);\n}\n\nfigure.effect-goliath:hover h2 {\n\t-webkit-transform: translate3d(0,-100px,0);\n\ttransform: translate3d(0,-100px,0);\n}\n\nfigure.effect-goliath:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*-----------------*/\n/***** Hera *****/\n/*-----------------*/\n\nfigure.effect-hera {\n\tbackground: #303fa9;\n}\n\nfigure.effect-hera h2 {\n\tfont-size: 158.75%;\n}\n\nfigure.effect-hera h2,\nfigure.effect-hera p {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-50%,-50%,0);\n\ttransform: translate3d(-50%,-50%,0);\n\t-webkit-transform-origin: 50%;\n\ttransform-origin: 50%;\n}\n\nfigure.effect-hera figcaption::before {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\twidth: 200px;\n\theight: 200px;\n\tborder: 2px solid #fff;\n\tcontent: '';\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-50%,-50%,0) rotate3d(0,0,1,-45deg) scale3d(0,0,1);\n\ttransform: translate3d(-50%,-50%,0) rotate3d(0,0,1,-45deg) scale3d(0,0,1);\n\t-webkit-transform-origin: 50%;\n\ttransform-origin: 50%;\n}\n\nfigure.effect-hera p {\n\twidth: 100px;\n\ttext-transform: none;\n\tfont-size: 121%;\n\tline-height: 2;\n}\n\nfigure.effect-hera p a {\n\tcolor: #fff;\n}\n\nfigure.effect-hera p a:hover,\nfigure.effect-hera p a:focus {\n\topacity: 0.6;\n}\n\nfigure.effect-hera p a i {\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-hera p a:first-child i {\n\t-webkit-transform: translate3d(-60px,-60px,0);\n\ttransform: translate3d(-60px,-60px,0);\n}\n\nfigure.effect-hera p a:nth-child(2) i {\n\t-webkit-transform: translate3d(60px,-60px,0);\n\ttransform: translate3d(60px,-60px,0);\n}\n\nfigure.effect-hera p a:nth-child(3) i {\n\t-webkit-transform: translate3d(-60px,60px,0);\n\ttransform: translate3d(-60px,60px,0);\n}\n\nfigure.effect-hera p a:nth-child(4) i {\n\t-webkit-transform: translate3d(60px,60px,0);\n\ttransform: translate3d(60px,60px,0);\n}\n\nfigure.effect-hera:hover figcaption::before {\n\topacity: 1;\n\t-webkit-transform: translate3d(-50%,-50%,0) rotate3d(0,0,1,-45deg) scale3d(1,1,1);\n\ttransform: translate3d(-50%,-50%,0) rotate3d(0,0,1,-45deg) scale3d(1,1,1);\n}\n\nfigure.effect-hera:hover h2 {\n\topacity: 0;\n\t-webkit-transform: translate3d(-50%,-50%,0) scale3d(0.8,0.8,1);\n\ttransform: translate3d(-50%,-50%,0) scale3d(0.8,0.8,1);\n}\n\nfigure.effect-hera:hover p i:empty {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0); /* just because it's stronger than nth-child */\n\topacity: 1;\n}\n\n/*-----------------*/\n/***** Winston *****/\n/*-----------------*/\n\nfigure.effect-winston {\n\tbackground: #162633;\n\ttext-align: left;\n}\n\nfigure.effect-winston img {\n\t-webkit-transition: opacity 0.45s;\n\ttransition: opacity 0.45s;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\nfigure.effect-winston figcaption::before {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\n\tbackground-size: 100% 100%;\n\tcontent: '';\n\t-webkit-transition: opacity 0.45s, -webkit-transform 0.45s;\n\ttransition: opacity 0.45s, transform 0.45s;\n\t-webkit-transform: rotate3d(0,0,1,45deg);\n\ttransform: rotate3d(0,0,1,45deg);\n\t-webkit-transform-origin: 0 100%;\n\ttransform-origin: 0 100%;\n}\n\nfigure.effect-winston h2 {\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,20px,0);\n\ttransform: translate3d(0,20px,0);\n}\n\nfigure.effect-winston p {\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tpadding: 0 1.5em 7% 0;\n}\n\nfigure.effect-winston a {\n\tmargin: 0 10px;\n\tcolor: #5d504f;\n\tfont-size: 170%;\n}\n\nfigure.effect-winston a:hover,\nfigure.effect-winston a:focus {\n\tcolor: #cc6055;\n}\n\nfigure.effect-winston p a i {\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,50px,0);\n\ttransform: translate3d(0,50px,0);\n}\n\nfigure.effect-winston:hover img {\n\topacity: 0.6;\n}\n\nfigure.effect-winston:hover h2 {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-winston:hover figcaption::before {\n\topacity: 0.7;\n\t-webkit-transform: rotate3d(0,0,1,20deg);\n\ttransform: rotate3d(0,0,1,20deg);\n}\n\nfigure.effect-winston:hover p i {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-winston:hover p a:nth-child(3) i {\n\t-webkit-transition-delay: 0.05s;\n\ttransition-delay: 0.05s;\n}\n\nfigure.effect-winston:hover p a:nth-child(2) i {\n\t-webkit-transition-delay: 0.1s;\n\ttransition-delay: 0.1s;\n}\n\nfigure.effect-winston:hover p a:first-child i {\n\t-webkit-transition-delay: 0.15s;\n\ttransition-delay: 0.15s;\n}\n\n/*-----------------*/\n/***** Selena *****/\n/*-----------------*/\n\nfigure.effect-selena {\n\tbackground: #fff;\n}\n\nfigure.effect-selena img {\n\topacity: 0.95;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform-origin: 50% 50%;\n\ttransform-origin: 50% 50%;\n}\n\nfigure.effect-selena:hover img {\n\t-webkit-transform: scale3d(0.95,0.95,1);\n\ttransform: scale3d(0.95,0.95,1);\n}\n\nfigure.effect-selena h2 {\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,20px,0);\n\ttransform: translate3d(0,20px,0);\n}\n\nfigure.effect-selena p {\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: perspective(1000px) rotate3d(1,0,0,90deg);\n\ttransform: perspective(1000px) rotate3d(1,0,0,90deg);\n\t-webkit-transform-origin: 50% 0%;\n\ttransform-origin: 50% 0%;\n}\n\nfigure.effect-selena:hover h2 {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-selena:hover p {\n\topacity: 1;\n\t-webkit-transform: perspective(1000px) rotate3d(1,0,0,0);\n\ttransform: perspective(1000px) rotate3d(1,0,0,0);\n}\n\n/*-----------------*/\n/***** Terry *****/\n/*-----------------*/\n\nfigure.effect-terry {\n\tbackground: #34495e;\n}\n\nfigure.effect-terry figcaption {\n\tpadding: 1em;\n}\n\nfigure.effect-terry figcaption::before,\nfigure.effect-terry figcaption::after {\n\tposition: absolute;\n\twidth: 200%;\n\theight: 200%;\n\tborder-style: solid;\n\tborder-color: #101010;\n\tcontent: '';\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n}\n\nfigure.effect-terry figcaption::before {\n\tright: 0;\n\tbottom: 0;\n\tborder-width: 0 70px 60px 0;\n\t-webkit-transform: translate3d(70px,60px,0);\n\ttransform: translate3d(70px,60px,0);\n}\n\nfigure.effect-terry figcaption::after {\n\ttop: 0;\n\tleft: 0;\n\tborder-width: 15px 0 0 15px;\n\t-webkit-transform: translate3d(-15px,-15px,0);\n\ttransform: translate3d(-15px,-15px,0);\n}\n\nfigure.effect-terry img,\nfigure.effect-terry p a {\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-terry img {\n\topacity: 0.85;\n}\n\nfigure.effect-terry h2 {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tpadding: 0.4em 10px;\n\twidth: 50%;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(100%,0,0);\n\ttransform: translate3d(100%,0,0);\n}\n\n@media screen and (max-width: 920px) {\n\tfigure.effect-terry h2 {\n\t\tpadding: 0.75em 10px;\n\t\tfont-size: 120%;\n\t}\n}\n\nfigure.effect-terry p {\n\tfloat: right;\n\tclear: both;\n\ttext-align: left;\n\ttext-transform: none;\n\tfont-size: 111%;\n}\n\nfigure.effect-terry p a {\n\tdisplay: block;\n\tmargin-bottom: 1em;\n\tcolor: #fff;\n\topacity: 0;\n\t-webkit-transform: translate3d(90px,0,0);\n\ttransform: translate3d(90px,0,0);\n}\n\nfigure.effect-terry p a:hover,\nfigure.effect-terry p a:focus {\n\tcolor: #f3cf3f;\n}\n\nfigure.effect-terry:hover figcaption::before,\nfigure.effect-terry:hover figcaption::after {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-terry:hover img {\n\topacity: 0.6;\n\n}\n\nfigure.effect-terry:hover h2,\nfigure.effect-terry:hover p a {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-terry:hover p a {\n\topacity: 1;\n}\n\nfigure.effect-terry:hover p a:first-child {\n\t-webkit-transition-delay: 0.025s;\n\ttransition-delay: 0.025s;\n}\n\nfigure.effect-terry:hover p a:nth-child(2) {\n\t-webkit-transition-delay: 0.05s;\n\ttransition-delay: 0.05s;\n}\n\nfigure.effect-terry:hover p a:nth-child(3) {\n\t-webkit-transition-delay: 0.075s;\n\ttransition-delay: 0.075s;\n}\n\nfigure.effect-terry:hover p a:nth-child(4) {\n\t-webkit-transition-delay: 0.1s;\n\ttransition-delay: 0.1s;\n}\n\n/*-----------------*/\n/***** Phoebe *****/\n/*-----------------*/\n\nfigure.effect-phoebe {\n\tbackground: #675983;\n}\n\nfigure.effect-phoebe img {\n\topacity: 0.85;\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-phoebe:hover img {\n\topacity: 0.6;\n}\n\nfigure.effect-phoebe figcaption::before {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\n\tbackground-size: 100% 100%;\n\tcontent: '';\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: scale3d(5,2.5,1);\n\ttransform: scale3d(5,2.5,1);\n\t-webkit-transform-origin: 50% 50%;\n\ttransform-origin: 50% 50%;\n}\n\nfigure.effect-phoebe:hover figcaption::before {\n\topacity: 0.6;\n\t-webkit-transform: scale3d(1,1,1);\n\ttransform: scale3d(1,1,1);\n}\n\nfigure.effect-phoebe h2 {\n\tmargin-top: 1em;\n\t-webkit-transition: transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(0,40px,0);\n\ttransform: translate3d(0,40px,0);\n}\n\nfigure.effect-phoebe:hover h2 {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-phoebe p a {\n\tcolor: #fff;\n\tfont-size: 140%;\n\topacity: 0;\n\tposition: relative;\n\tdisplay: inline-block;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-phoebe p a:first-child {\n\t-webkit-transform: translate3d(-60px,-60px,0);\n\ttransform: translate3d(-60px,-60px,0);\n}\n\nfigure.effect-phoebe p a:nth-child(2) {\n\t-webkit-transform: translate3d(0,60px,0);\n\ttransform: translate3d(0,60px,0);\n}\n\nfigure.effect-phoebe p a:nth-child(3) {\n\t-webkit-transform: translate3d(60px,-60px,0);\n\ttransform: translate3d(60px,-60px,0);\n}\n\nfigure.effect-phoebe:hover p a {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*-----------------*/\n/***** Apollo *****/\n/*-----------------*/\n\nfigure.effect-apollo {\n\tbackground: #3498db;\n}\n\nfigure.effect-apollo img {\n\topacity: 0.95;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: scale3d(1.05,1.05,1);\n\ttransform: scale3d(1.05,1.05,1);\n}\n\nfigure.effect-apollo figcaption::before {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: rgba(255,255,255,0.5);\n\tcontent: '';\n\t-webkit-transition: -webkit-transform 0.6s;\n\ttransition: transform 0.6s;\n\t-webkit-transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,-100%,0);\n\ttransform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,-100%,0);\n}\n\nfigure.effect-apollo p {\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tmargin: 3em;\n\tpadding: 0 1em;\n\tmax-width: 150px;\n\tborder-right: 4px solid #fff;\n\ttext-align: right;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-apollo h2 {\n\ttext-align: left;\n}\n\nfigure.effect-apollo:hover img {\n\topacity: 0.6;\n\t-webkit-transform: scale3d(1,1,1);\n\ttransform: scale3d(1,1,1);\n}\n\nfigure.effect-apollo:hover figcaption::before {\n\t-webkit-transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,100%,0);\n\ttransform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,100%,0);\n}\n\nfigure.effect-apollo:hover p {\n\topacity: 1;\n\t-webkit-transition-delay: 0.1s;\n\ttransition-delay: 0.1s;\n}\n\n/*-----------------*/\n/***** Kira *****/\n/*-----------------*/\n\nfigure.effect-kira {\n\tbackground: #fff;\n\ttext-align: left;\n}\n\nfigure.effect-kira img {\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-kira figcaption {\n\tz-index: 1;\n}\n\nfigure.effect-kira p {\n\tpadding: 2.25em 0.5em;\n\tfont-weight: 600;\t\n\tfont-size: 100%;\n\tline-height: 1.5;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,-10px,0);\n\ttransform: translate3d(0,-10px,0);\n}\n\nfigure.effect-kira p a {\n\tmargin: 0 0.5em;\n\tcolor: #101010;\n}\n\nfigure.effect-kira p a:hover,\nfigure.effect-kira p a:focus {\n\topacity: 0.6;\n}\n\nfigure.effect-kira figcaption::before {\n\tposition: absolute;\n\ttop: 0;\n\tright: 2em;\n\tleft: 2em;\n\tz-index: -1;\n\theight: 3.5em;\n\tbackground: #fff;\n\tcontent: '';\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(0,4em,0) scale3d(1,0.023,1) ;\n\ttransform: translate3d(0,4em,0) scale3d(1,0.023,1);\n\t-webkit-transform-origin: 50% 0;\n\ttransform-origin: 50% 0;\n}\n\nfigure.effect-kira:hover img {\n\topacity: 0.5;\n}\n\nfigure.effect-kira:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-kira:hover figcaption::before {\n\topacity: 0.7;\n\t-webkit-transform: translate3d(0,5em,0) scale3d(1,1,1) ;\n\ttransform: translate3d(0,5em,0) scale3d(1,1,1);\n}\n\n/*-----------------*/\n/***** Steve *****/\n/*-----------------*/\n\nfigure.effect-steve {\n\tz-index: auto;\n\toverflow: visible;\n\tbackground: #000;\n}\n\nfigure.effect-steve:before,\nfigure.effect-steve h2:before {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tz-index: -1;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: #000;\n\tcontent: '';\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-steve:before {\n\tbox-shadow: 0 3px 30px rgba(0,0,0,0.8);\n\topacity: 0;\n}\n\nfigure.effect-steve figcaption {\n\tz-index: 1;\n}\n\nfigure.effect-steve img {\n\topacity: 1;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: perspective(1000px) translate3d(0,0,0);\n\ttransform: perspective(1000px) translate3d(0,0,0);\n}\n\nfigure.effect-steve h2,\nfigure.effect-steve p {\n\tbackground: #fff;\n\tcolor: #2d434e;\n}\n\nfigure.effect-steve h2 {\n\tposition: relative;\n\tmargin-top: 2em;\n\tpadding: 0.25em;\n}\n\nfigure.effect-steve h2:before {\n\tbox-shadow: 0 1px 10px rgba(0,0,0,0.5);\n}\n\nfigure.effect-steve p {\n\tmargin-top: 1em;\n\tpadding: 0.5em;\n\tfont-weight: 800;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: scale3d(0.9,0.9,1);\n\ttransform: scale3d(0.9,0.9,1);\n}\n\nfigure.effect-steve:hover:before {\n\topacity: 1;\n}\n\nfigure.effect-steve:hover img {\n\t-webkit-transform: perspective(1000px) translate3d(0,0,21px);\n\ttransform: perspective(1000px) translate3d(0,0,21px);\n}\n\nfigure.effect-steve:hover h2:before {\n\topacity: 0;\n}\n\nfigure.effect-steve:hover p {\n\topacity: 1;\n\t-webkit-transform: scale3d(1,1,1);\n\ttransform: scale3d(1,1,1);\n}\n\n/*-----------------*/\n/***** Moses *****/\n/*-----------------*/\n\nfigure.effect-moses {\n\tbackground: -webkit-linear-gradient(-45deg, #EC65B7 0%,#05E0D8 100%);\n\tbackground: linear-gradient(-45deg, #EC65B7 0%,#05E0D8 100%);\n}\n\nfigure.effect-moses img {\n\topacity: 0.85;\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-moses h2,\nfigure.effect-moses p {\n\tpadding: 20px;\n\twidth: 50%;\n\theight: 50%;\n\tborder: 2px solid #fff;\n}\n\nfigure.effect-moses h2 {\n\tpadding: 20px;\n\twidth: 50%;\n\theight: 50%;\n\ttext-align: left;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(10px,10px,0);\n\ttransform: translate3d(10px,10px,0);\n}\n\nfigure.effect-moses p {\n\tfloat: right;\n\tpadding: 20px;\n\ttext-align: right;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(-50%,-50%,0);\n\ttransform: translate3d(-50%,-50%,0);\n}\n\nfigure.effect-moses:hover h2 {\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-moses:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-moses:hover img {\n\topacity: 0.6;\n}\n\n/*---------------*/\n/***** Jazz *****/\n/*---------------*/\n\nfigure.effect-jazz {\n\tbackground: -webkit-linear-gradient(-45deg, #f3cf3f 0%,#f33f58 100%);\n\tbackground: linear-gradient(-45deg, #f3cf3f 0%,#f33f58 100%);\n}\n\nfigure.effect-jazz img {\n\topacity: 0.9;\n}\n\nfigure.effect-jazz figcaption::after,\nfigure.effect-jazz img,\nfigure.effect-jazz p {\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-jazz figcaption::after {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tborder-top: 1px solid #fff;\n\tborder-bottom: 1px solid #fff;\n\tcontent: '';\n\topacity: 0;\n\t-webkit-transform: rotate3d(0,0,1,45deg) scale3d(1,0,1);\n\ttransform: rotate3d(0,0,1,45deg) scale3d(1,0,1);\n\t-webkit-transform-origin: 50% 50%;\n\ttransform-origin: 50% 50%;\n}\n\nfigure.effect-jazz h2,\nfigure.effect-jazz p {\n\topacity: 1;\n\t-webkit-transform: scale3d(0.8,0.8,1);\n\ttransform: scale3d(0.8,0.8,1);\n}\n\nfigure.effect-jazz h2 {\n\tpadding-top: 26%;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n}\n\nfigure.effect-jazz p {\n\tpadding: 0.5em 2em;\n\ttext-transform: none;\n\tfont-size: 0.85em;\n\topacity: 0;\n}\n\nfigure.effect-jazz:hover img {\n\topacity: 0.7;\n\t-webkit-transform: scale3d(1.05,1.05,1);\n\ttransform: scale3d(1.05,1.05,1);\n}\n\nfigure.effect-jazz:hover figcaption::after {\n\topacity: 1;\n\t-webkit-transform: rotate3d(0,0,1,45deg) scale3d(1,1,1);\n\ttransform: rotate3d(0,0,1,45deg) scale3d(1,1,1);\n}\n\nfigure.effect-jazz:hover h2,\nfigure.effect-jazz:hover p {\n\topacity: 1;\n\t-webkit-transform: scale3d(1,1,1);\n\ttransform: scale3d(1,1,1);\n}\n\n/*---------------*/\n/***** Ming *****/\n/*---------------*/\n\nfigure.effect-ming {\n\tbackground: #030c17;\n}\n\nfigure.effect-ming img {\n\topacity: 0.9;\n\t-webkit-transition: opacity 0.35s;\n\ttransition: opacity 0.35s;\n}\n\nfigure.effect-ming figcaption::before {\n\tposition: absolute;\n\ttop: 30px;\n\tright: 30px;\n\tbottom: 30px;\n\tleft: 30px;\n\tborder: 2px solid #fff;\n\tbox-shadow: 0 0 0 30px rgba(255,255,255,0.2);\n\tcontent: '';\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: scale3d(1.4,1.4,1);\n\ttransform: scale3d(1.4,1.4,1);\n}\n\nfigure.effect-ming h2 {\n\tmargin: 20% 0 10px 0;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n}\n\nfigure.effect-ming p {\n\tpadding: 1em;\n\topacity: 0;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: scale(1.5);\n\ttransform: scale(1.5);\n}\n\nfigure.effect-ming:hover h2 {\n\t-webkit-transform: scale(0.9);\n\ttransform: scale(0.9);\n}\n\nfigure.effect-ming:hover figcaption::before,\nfigure.effect-ming:hover p {\n\topacity: 1;\n\t-webkit-transform: scale3d(1,1,1);\n\ttransform: scale3d(1,1,1);\n}\n\nfigure.effect-ming:hover figcaption {\n\tbackground-color: rgba(58,52,42,0);\n}\n\nfigure.effect-ming:hover img {\n\topacity: 0.4;\n}\n\n/*---------------*/\n/***** Lexi *****/\n/*---------------*/\n\nfigure.effect-lexi {\n\tbackground: -webkit-linear-gradient(-45deg, #000 0%,#fff 100%);\n\tbackground: linear-gradient(-45deg, #000 0%,#fff 100%);\n}\n\nfigure.effect-lexi img {\n\tmargin: -10px 0 0 -10px;\n\tmax-width: none;\n\twidth: -webkit-calc(100% + 10px);\n\twidth: calc(100% + 10px);\n\topacity: 0.9;\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n\t-webkit-transform: translate3d(10px,10px,0);\n\ttransform: translate3d(10px,10px,0);\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\nfigure.effect-lexi figcaption::before,\nfigure.effect-lexi p {\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-lexi figcaption::before {\n\tposition: absolute;\n\tright: -100px;\n\tbottom: -100px;\n\twidth: 300px;\n\theight: 300px;\n\tborder: 2px solid #fff;\n\tborder-radius: 50%;\n\tbox-shadow: 0 0 0 900px rgba(255,255,255,0.2);\n\tcontent: '';\n\topacity: 0;\n\t-webkit-transform: scale3d(0.5,0.5,1);\n\ttransform: scale3d(0.5,0.5,1);\n\t-webkit-transform-origin: 50% 50%;\n\ttransform-origin: 50% 50%;\n}\n\nfigure.effect-lexi:hover img {\n\topacity: 0.6;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\nfigure.effect-lexi h2 {\n\ttext-align: left;\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: translate3d(5px,5px,0);\n\ttransform: translate3d(5px,5px,0);\n}\n\nfigure.effect-lexi p {\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tpadding: 0 1.5em 1.5em 0;\n\twidth: 140px;\n\ttext-align: right;\n\topacity: 0;\n\t-webkit-transform: translate3d(20px,20px,0);\n\ttransform: translate3d(20px,20px,0);\n}\n\nfigure.effect-lexi:hover figcaption::before {\n\topacity: 1;\n\t-webkit-transform: scale3d(1,1,1);\n\ttransform: scale3d(1,1,1);\n}\n\nfigure.effect-lexi:hover h2,\nfigure.effect-lexi:hover p {\n\topacity: 1;\n\t-webkit-transform: translate3d(0,0,0);\n\ttransform: translate3d(0,0,0);\n}\n\n/*---------------*/\n/***** Duke *****/\n/*---------------*/\n\nfigure.effect-duke {\n\tbackground: -webkit-linear-gradient(-45deg, #34495e 0%,#cc6055 100%);\n\tbackground: linear-gradient(-45deg, #34495e 0%,#cc6055 100%);\n}\n\nfigure.effect-duke img,\nfigure.effect-duke p {\n\t-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;\n\ttransition: opacity 0.35s, transform 0.35s;\n}\n\nfigure.effect-duke:hover img {\n\topacity: 0.1;\n\t-webkit-transform: scale3d(2,2,1);\n\ttransform: scale3d(2,2,1);\n}\n\nfigure.effect-duke h2 {\n\t-webkit-transition: -webkit-transform 0.35s;\n\ttransition: transform 0.35s;\n\t-webkit-transform: scale3d(0.8,0.8,1);\n\ttransform: scale3d(0.8,0.8,1);\n\t-webkit-transform-origin: 50% 100%;\n\ttransform-origin: 50% 100%;\n}\n\nfigure.effect-duke p {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tmargin: 20px;\n\tpadding: 30px;\n\tborder: 2px solid #fff;\n\ttext-transform: none;\n\tfont-size: 90%;\n\topacity: 0;\n\t-webkit-transform: scale3d(0.8,0.8,1);\n\ttransform: scale3d(0.8,0.8,1);\n\t-webkit-transform-origin: 50% -100%;\n\ttransform-origin: 50% -100%;\n}\n\nfigure.effect-duke:hover h2,\nfigure.effect-duke:hover p {\n\topacity: 1;\n\t-webkit-transform: scale3d(1,1,1);\n\ttransform: scale3d(1,1,1);\n}\n\n/* Media queries */\n@media screen and (max-width: 50em) {\n\t.content {\n\t\tpadding: 0 10px;\n\t\ttext-align: center;\n\t}\n\t.grid figure {\n\t\tdisplay: inline-block;\n\t\tfloat: none;\n\t\tmargin: 10px auto;\n\t\twidth: 100%;\n\t}\n}"

/***/ },

/***/ "./src/app/services/ChallengeService.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var ServiceUrl_1 = __webpack_require__("./src/app/services/ServiceUrl.ts");
var ChallengeService = (function () {
    function ChallengeService(http) {
        this.http = http;
        this.serviceUrl = new ServiceUrl_1.ServiceUrl();
    }
    ChallengeService.prototype.addProjectCategoryTitle = function (agencyName, categoryName, project_color_palette, token) {
        var body = JSON.stringify({ "agencyName": agencyName, "categoryName": categoryName, "color": project_color_palette, "token": token });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
        var options = new http_1.RequestOptions({ method: 'post', headers: headers });
        console.log(body);
        return this.http.post(this.serviceUrl.baseUrl + "projectCategories/addProjectCategory", body, options)
            .map(function (res) { return res.json(); });
    };
    ChallengeService.prototype.getProjectCategories = function (agencyName, token) {
        var body = JSON.stringify({ "agencyName": agencyName, "token": token });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
        var options = new http_1.RequestOptions({ method: 'post', headers: headers });
        console.log(agencyName);
        return this.http.get(this.serviceUrl.baseUrl + "projects/getProjectCategoriesForAgency?agencyName=" + agencyName + "&token=" + token)
            .map(function (res) { return res.json(); });
    };
    ChallengeService.prototype.getAdvanceAdmins = function (agencyName, token) {
        var body = JSON.stringify({ "agencyName": agencyName, "token": token });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
        var options = new http_1.RequestOptions({ method: 'post', headers: headers });
        console.log(agencyName);
        return this.http.get(this.serviceUrl.baseUrl + "users/getListOfAgencyAdvancedAdmins?agencyName=" + agencyName + "&token=" + token)
            .map(function (res) { return res.json(); });
    };
    ChallengeService.prototype.getAllProjects = function (agencyName, token) {
        return this.http.get(this.serviceUrl.baseUrl + "projects/getListOfProjectsForAgency?agencyName=" + agencyName + "&token=" + token)
            .map(function (res) { return res.json(); });
    };
    ChallengeService.prototype.getAllChallenges = function (project_Id, token) {
        return this.http.get(this.serviceUrl.baseUrl + "challenges/getChallengesByProjectIdRoute?projectId=" + project_Id + "&token=" + token)
            .map(function (res) { return res.json(); });
    };
    ChallengeService.prototype.addNewChallenge = function (file, createdByUserId, challengeShortName, challengeLongName, challengeDescription, projectId, targetMinAge, targetMaxAge, targetGender, targetRank, targetPoints, rewardGiftsId, rewardPaypalPayoutId, rewardRafflesId, rewardsVoucherId, rewardsBadgesId, locationArea, locationGeoFencingRadius, locationLatititude, locationLongitude, token) {
        var formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("challengeShortName", challengeShortName);
        formData.append("challengeLongName", challengeLongName);
        formData.append("challengeDescription", challengeDescription);
        formData.append("createdByUserId", createdByUserId);
        formData.append("projectId", projectId);
        formData.append("targetMinAge", targetMinAge);
        formData.append("targetMaxAge", targetMaxAge);
        formData.append("targetGender", targetGender);
        formData.append("targetRank", targetRank);
        formData.append("targetPoints", targetPoints);
        formData.append("rewardGiftsId", rewardGiftsId);
        formData.append("rewardPaypalPayoutId", rewardPaypalPayoutId);
        formData.append("rewardsVoucherId", rewardsVoucherId);
        formData.append("rewardRafflesId", rewardRafflesId);
        formData.append("rewardsBadgesId", rewardsBadgesId);
        formData.append("locationArea", locationArea);
        formData.append("locationLatititude", locationLatititude);
        formData.append("locationLongitude", locationLongitude);
        formData.append("token", token);
        var options = new http_1.RequestOptions({ method: 'post' });
        return this.http.post(this.serviceUrl.baseUrl + "challenges/addChallenge", formData, options)
            .map(function (res) { return res.json(); });
    };
    ChallengeService.prototype.createAgencyProject = function (file, projectTitle, agencyName, projectDescription, cat_id, advancedAdmin_id, token) {
        var formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("projectName", projectTitle);
        formData.append("agencyName", agencyName);
        formData.append("projectDescription", projectDescription);
        formData.append("categoryId", cat_id);
        formData.append("assignedToUserId", advancedAdmin_id);
        formData.append("token", token);
        var options = new http_1.RequestOptions({ method: 'post' });
        return this.http.post(this.serviceUrl.baseUrl + "projects/addProject", formData, options)
            .map(function (res) { return res.json(); });
    };
    ChallengeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ChallengeService);
    return ChallengeService;
    var _a;
}());
exports.ChallengeService = ChallengeService;


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

/***/ "./src/app/tasksByChallenges/challenges-tasks.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ChallengeService_1 = __webpack_require__("./src/app/services/ChallengeService.ts");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var WebStorage_1 = __webpack_require__("./node_modules/angular2-localstorage/WebStorage.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var ChallengesTasks = (function () {
    function ChallengesTasks(challengeservice, http, activatedRoute) {
        var _this = this;
        this.challengeservice = challengeservice;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.taskslist = [];
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.challengeId = params['challengeId'];
        });
        /* this.challengeservice.getAllChallenges(this.challengeId,this.token).subscribe(
                   a=> {
                     this.taskslist = a.data;
                     this.noOfTasks = this.taskslist.length;
                   }
               );  */
    }
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', Object)
    ], ChallengesTasks.prototype, "userObject", void 0);
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', String)
    ], ChallengesTasks.prototype, "token", void 0);
    ChallengesTasks = __decorate([
        core_1.Component({
            selector: '[challenges-tasks]',
            template: __webpack_require__("./src/app/tasksByChallenges/challenges-tasks.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [ChallengeService_1.ChallengeService],
            styles: [__webpack_require__("./src/app/tasksByChallenges/challenges-tasks.style.scss"), __webpack_require__("./src/app/projectdashboard/set1.css"), __webpack_require__("./src/app/projectdashboard/set2.css"), __webpack_require__("./src/app/projectdashboard/normalize.css")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ChallengeService_1.ChallengeService !== 'undefined' && ChallengeService_1.ChallengeService) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object, (typeof (_c = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _c) || Object])
    ], ChallengesTasks);
    return ChallengesTasks;
    var _a, _b, _c;
}());
exports.ChallengesTasks = ChallengesTasks;


/***/ },

/***/ "./src/app/tasksByChallenges/challenges-tasks.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var challenges_tasks_component_1 = __webpack_require__("./src/app/tasksByChallenges/challenges-tasks.component.ts");
exports.routes = [
    { path: '', component: challenges_tasks_component_1.ChallengesTasks, pathMatch: 'full' }
];
var ChallengesTasksModule = (function () {
    function ChallengesTasksModule() {
    }
    ChallengesTasksModule.routes = exports.routes;
    ChallengesTasksModule = __decorate([
        core_1.NgModule({
            declarations: [
                // Components / Directives/ Pipes
                challenges_tasks_component_1.ChallengesTasks
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ChallengesTasksModule);
    return ChallengesTasksModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChallengesTasksModule;


/***/ },

/***/ "./src/app/tasksByChallenges/challenges-tasks.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**          Post Links           **/\n/***********************************/\n.post-links {\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-links::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-links > li {\n    float: left;\n    list-style: none; }\n    .post-links > li + li:before {\n      color: #999;\n      content: \"\\25cf\";\n      padding: 0 8px; }\n    .post-links > li > a {\n      text-decoration: none;\n      color: #999999; }\n      .post-links > li > a:hover {\n        color: #999999; }\n  .post-links.no-separator > li + li {\n    margin-left: 12px; }\n    .post-links.no-separator > li + li:before {\n      content: normal; }\n\n/***********************************/\n/**          Post Comments           **/\n/***********************************/\n.post-comments {\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-comments::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-links + .post-comments {\n    margin-top: 0.5rem; }\n  .post-comments > li {\n    padding: 10px;\n    border-top: 1px solid #e7e7e7;\n    list-style: none; }\n    .post-comments > li::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .post-comments > li:last-child {\n      padding-bottom: 0; }\n  .post-comments p:last-child {\n    margin-bottom: 0; }\n  .post-comments .avatar {\n    margin-top: 1px; }\n  .post-comments .author {\n    margin-top: 0;\n    margin-bottom: 2px;\n    color: #7ca9dd; }\n  .post-comments .comment-body {\n    overflow: auto; }\n  .post-comments h6.author > small {\n    font-size: 11px; }\n  .widget > footer .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n\n/***********************************/\n/**           Post User           **/\n/***********************************/\n.post-user {\n  position: relative; }\n  .post-user::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-user img {\n    border: 3px solid white; }\n\n/***********************************/\n/**           Profile             **/\n/***********************************/\n.user-profile .label {\n  padding: 5px; }\n\n.post-user-profile {\n  margin-top: -75px; }\n  .post-user-profile .contacts {\n    display: block;\n    margin-top: 25px;\n    margin-left: -10px;\n    margin-right: -10px;\n    padding-left: 0;\n    text-align: center; }\n    .post-user-profile .contacts > li {\n      display: inline-block;\n      line-height: 2.2;\n      list-style: none;\n      text-align: left;\n      margin: 0 10px; }\n      @media (min-width: 992px) {\n        .post-user-profile .contacts > li {\n          width: 150px;\n          white-space: nowrap; } }\n      .post-user-profile .contacts > li > a {\n        color: #a2a2a2;\n        text-decoration: none; }\n        .post-user-profile .contacts > li > a:hover, .post-user-profile .contacts > li > a:focus {\n          color: #555555; }\n    .post-user-profile .contacts .fa {\n      font-size: 1.25rem;\n      vertical-align: middle; }\n\n.stats-row-profile .stat-item {\n  border-left: 0;\n  padding-left: 15px;\n  text-align: center; }\n  @media (min-width: 992px) {\n    .stats-row-profile .stat-item {\n      padding-right: 0; } }\n  .stats-row-profile .stat-item .value {\n    font-size: 28px;\n    font-weight: 300; }\n\n.activities h3 {\n  margin-left: 20px; }\n\n.activities .event {\n  margin-top: 1rem;\n  width: 100%; }\n\n.event {\n  background: #fff;\n  border-radius: 0.25rem;\n  padding: 20px 20px 0;\n  position: relative; }\n  .event .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n  .event > footer {\n    margin: 20px -20px 0;\n    padding: 10px 20px;\n    border-bottom-left-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    background-color: #f3f3f3; }\n    .event > footer::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .event > footer .thumb {\n      margin-left: 10px; }\n\n.event-heading {\n  margin: 0 0 2px;\n  font-weight: 600; }\n  .event-heading > a {\n    text-decoration: none;\n    color: #7ca9dd; }\n  .event-heading > small {\n    font-weight: 600; }\n    .event-heading > small > a {\n      text-decoration: none;\n      color: #999999; }\n\n.event-map {\n  display: block;\n  height: 200px;\n  margin: 0 -20px -20px;\n  overflow: visible !important; }\n\n.event-image {\n  margin: 0 -20px -20px;\n  max-height: 260px;\n  overflow: hidden; }\n  .event-image > img {\n    max-width: 100%; }\n"

/***/ },

/***/ "./src/app/tasksByChallenges/challenges-tasks.template.html":
/***/ function(module, exports) {

module.exports = "<!--<ol class=\"breadcrumb\">\r\n  <li class=\"breadcrumb-item\">YOU ARE HERE</li>\r\n  <li class=\"active breadcrumb-item\">Challenges By Project</li>\r\n</ol> -->\r\n<h1 class=\"page-title\">Tasks</h1>\r\n\r\n<div class=\"row\">\r\n\r\n<div  *ngFor=\"let challenges of challengelist\" class=\"col-md-4\">\r\n\r\n\r\n<div class=\"grid\">\r\n\t\t\t\t\t<figure class=\"effect-ming\">\r\n\t\t\t\t\t\t<img src=\"assets/img/people/10.jpg\" alt=\"img19\"/>\r\n\t\t\t\t\t\t<figcaption>\r\n\t\t\t\t\t\t\t<h2>{{challenges.challengeShortName}}</h2>\r\n\t\t\t\t\t\t\t<p style=\"text-transform:lowercase\">{{challenges.targetPoints}}.</p>\r\n\t\t\t\t\t\t\t<a href=\"#\">View more</a>\r\n\t\t\t\t\t\t</figcaption>\t\t\t\r\n\t\t\t\t\t</figure>\r\n</div>\r\n\r\n\r\n</div>\r\n\r\n\r\n</div>"

/***/ }

});
//# sourceMappingURL=25.map