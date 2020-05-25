/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/@ngtools/webpack/src/index.js!./src/app/tracker/web-workers/tracker-calculate.worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@ngtools/webpack/src/index.js!./src/app/tracker/web-workers/tracker-calculate.worker.ts":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src!./src/app/tracker/web-workers/tracker-calculate.worker.ts ***!
  \*****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_helpers_load_area_data_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/helpers/load-area-data.helper */ "./src/app/helpers/load-area-data.helper.ts");
/// <reference lib="webworker" />


addEventListener('message', ({ data }) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    let loadAreaDataHelper = new src_app_helpers_load_area_data_helper__WEBPACK_IMPORTED_MODULE_1__["LoadAreaDataHelper"]();
    let maxWindspeed = data.maxWindspeed;
    let maxRainfall = data.maxRainfall;
    let maxTideHeight = data.maxTideHeight;
    let daylightOnly = data.daylightOnly;
    let areaData = data.data;
    let result = yield loadAreaDataHelper.calculateHours(maxWindspeed, maxRainfall, maxTideHeight, daylightOnly, areaData, postMessage);
    postMessage(result);
}));


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/app/helpers/load-area-data.helper.ts":
/*!**************************************************!*\
  !*** ./src/app/helpers/load-area-data.helper.ts ***!
  \**************************************************/
/*! exports provided: LoadAreaDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadAreaDataHelper", function() { return LoadAreaDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

class LoadAreaDataHelper {
    // loadDayLightData(baseUrl: string, areaName: string): Promise<DayLightRecordModel[]> {
    //     return new Promise((resolutionFunc, rejectionFunc) => {
    //       let data: DayLightRecordModel[] = [];
    //       let count = 0;
    //       try {
    //         Papa.parse(`${baseUrl}assets/data/clean_data/${areaName.toLowerCase()}/daylight.csv`, {
    //           worker: true,
    //           delimiter: ',',
    //           download: true,
    //           step: function (results) {
    //             count++;
    //             if (count === 1) return;
    //             if (!results.data[0]) return;
    //             let d = new DayLightRecordModel();
    //             d.date = moment(results.data[0], "DD/MM/YYYY HH:mm:ss").toDate();
    //             d.sunrise = results.data[1];
    //             d.sunset = results.data[2];
    //             data.push(d);
    //           },
    //           complete: function (results) {
    //             let sortedData = data.sort(x => x.date.getTime());
    //             resolutionFunc(sortedData);
    //           }
    //         });
    //       }
    //       catch (e) {
    //         rejectionFunc(e);
    //       }
    //     });
    //   }
    //   loadTideData(baseUrl: string, areaName: string): Promise<TideRecordModel[]> {
    //     return new Promise((resolutionFunc, rejectionFunc) => {
    //       let data: TideRecordModel[] = [];
    //       let count = 0;
    //       try {
    //         Papa.parse(`${baseUrl}assets/data/clean_data/${areaName.toLowerCase()}/tide.csv`, {
    //           worker: true,
    //           delimiter: ',',
    //           download: true,
    //           step: function (results) {
    //             count++;
    //             if (count === 1) return;
    //             if (!results.data[0]) return;
    //             let d = new TideRecordModel();
    //             d.tideHeight = parseFloat(results.data[1]);
    //             d.timestamp = moment(results.data[0], "DD/MM/YYYY HH:mm:ss").toDate();
    //             data.push(d);
    //           },
    //           complete: function (results) {
    //             let sortedData = data.sort(x => x.timestamp.getTime());
    //             resolutionFunc(sortedData);
    //           }
    //         });
    //       }
    //       catch (e) {
    //         rejectionFunc(e);
    //       }
    //     });
    //   }
    //   loadRainfallData(baseUrl: string, areaName: string): Promise<RainfallRecordModel[]> {
    //     return new Promise((resolutionFunc, rejectionFunc) => {
    //       let data: RainfallRecordModel[] = [];
    //       let count = 0;
    //       try {
    //         Papa.parse(`${baseUrl}assets/data/clean_data/${areaName.toLowerCase()}/rainfall.csv`, {
    //           worker: true,
    //           delimiter: ',',
    //           download: true,
    //           step: function (results) {
    //             count++;
    //             if (count === 1) return;
    //             if (!results.data[0]) return;
    //             let d = new RainfallRecordModel();
    //             d.timestamp = moment(results.data[0], "DD/MM/YYYY HH:mm:ss").toDate();
    //             d.rainfall = parseFloat(results.data[1]);
    //             data.push(d);
    //           },
    //           complete: function (results) {
    //             let sortedData = data.sort(x => x.timestamp.getTime());
    //             resolutionFunc(sortedData);
    //           }
    //         });
    //       }
    //       catch (e) {
    //         rejectionFunc(e);
    //       }
    //     });
    //   }
    //   loadWindData(baseUrl: string, areaName: string): Promise<WeatherRecordModel[]> {
    //     return new Promise((resolutionFunc, rejectionFunc) => {
    //       let data: WeatherRecordModel[] = [];
    //       let count = 0;
    //       try {
    //         Papa.parse(`${baseUrl}assets/data/clean_data/${areaName.toLowerCase()}/wind.csv`, {
    //           worker: true,
    //           delimiter: ',',
    //           download: true,
    //           step: function (results) {
    //             count++;
    //             if (count === 1) return;
    //             if (!results.data[0]) return;
    //             let d = new WeatherRecordModel();
    //             d.timestamp = moment(results.data[0], "DD/MM/YYYY HH:mm:ss").toDate();
    //             d.windDirection = parseFloat(results.data[1]);
    //             d.windSpeed = parseFloat(results.data[2]);
    //             d.pressure = parseFloat(results.data[3]);
    //             data.push(d);
    //           },
    //           complete: function (results) {
    //             let sortedData = data.sort(x => x.timestamp.getTime());
    //             resolutionFunc(sortedData);
    //           }
    //         });
    //       }
    //       catch (e) {
    //         rejectionFunc(e);
    //       }
    //     });
    //   }
    calculateHours(maxWindspeed, maxRainfall, maxTideHeight, daylightOnly, data, postMessage) {
        // fromDate.setHours(0, 0, 0);
        // toDate.setHours(23, 59, 59);
        // // filter results by to and from date
        // let rainfall = data.rainfall.filter(x => x.Timestamp >= fromDate && x.Timestamp <= toDate && x.Rainfall <= maxRainfall);
        // let daylight = data.dayLight.filter(x => x.Date >= fromDate && x.Date <= toDate);
        // let tide = data.tide.filter(x => x.Timestamp >= fromDate && x.Timestamp <= toDate && x.TideHeight <= maxTideHeight && !isNaN(x.TideHeight));
        // let wind = data.weather.filter(x => x.Timestamp >= fromDate && x.Timestamp <= toDate && x.WindSpeed <= maxWindspeed && !isNaN(x.WindSpeed));
        let hourCount = 0;
        for (let day of data) {
            // postMessage(`Progress: day ${day.date}`);
            this.calculateDay(maxWindspeed, maxRainfall, maxTideHeight, daylightOnly, day, postMessage);
            // let sunrise = day.Sunrise;
            // let sunset = day.Sunset;
            // let sunriseDateTimeString = `${day.Date.getDate()}/${day.Date.getMonth() + 1}/${day.Date.getFullYear()} ${sunrise}`;
            // let sunsetDateTimeString = `${day.Date.getDate()}/${day.Date.getMonth() + 1}/${day.Date.getFullYear()} ${sunset}`;
            // let sunriseDate = moment(sunriseDateTimeString, 'DD/MM/YYYY HH:mm:ss').toDate();
            // let sunsetDate = moment(sunsetDateTimeString, 'DD/MM/YYYY HH:mm:ss').toDate();
            // let sunriseDate = new Date(day.Date.getFullYear(), day.Date.getMonth(), day.Date.getDate(), day.Sunrise.getHours(), day.Sunrise.getMinutes(), day.Sunrise.getMinutes(), day.Sunrise.getMilliseconds())
            // let sunsetDate = new Date(day.Date.getFullYear(), day.Date.getMonth(), day.Date.getDate(), day.Sunset.getHours(), day.Sunset.getMinutes(), day.Sunset.getMinutes(), day.Sunset.getMilliseconds())
            // wind between these times
            // let dayWind = wind.filter(x => x.Timestamp >= sunriseDate && x.Timestamp <= sunsetDate);
            // let dayTide = tide.filter(x => x.Timestamp >= sunriseDate && x.Timestamp <= sunsetDate);
            // let dayRainfall = rainfall.filter(x => x.Timestamp >= sunriseDate && x.Timestamp <= sunsetDate);
            // // for each hour in the day
            // for (let hour = sunriseDate.getHours(); hour <= sunsetDate.getHours(); hour++) {
            //   let hourWind = dayWind.filter(x => x.Timestamp.getHours() === hour);
            //   let hourTide = dayTide.filter(x => x.Timestamp.getHours() === hour);
            //   let hourRainfall = dayRainfall.filter(x => x.Timestamp.getHours() === hour);
            //   if (hourWind.length > 0 && hourTide.length > 0 && hourRainfall.length > 0) {
            //     hourCount++;
            //   }
            // }
        }
        return hourCount;
    }
    calculateDay(maxWindspeed, maxRainfall, maxTideHeight, daylightOnly, 
    // fromDate: Date,
    // toDate: Date,
    day, postMessage) {
        postMessage(`Progress: day ${day.date}`);
        // filter results by to and from date
        let rainfall = day.rainfall.filter(x => x.Rainfall <= maxRainfall);
        let tide = day.tide.filter(x => x.TideHeight <= maxTideHeight && !isNaN(x.TideHeight));
        let wind = day.weather.filter(x => x.WindSpeed <= maxWindspeed && !isNaN(x.WindSpeed));
        // wind between these times
        if (daylightOnly) {
            wind = day.weather.filter(x => x.Timestamp >= day.dayLight.Sunrise && x.Timestamp <= day.dayLight.Sunset);
            tide = day.tide.filter(x => x.Timestamp >= day.dayLight.Sunrise && x.Timestamp <= day.dayLight.Sunset);
            rainfall = day.rainfall.filter(x => x.Timestamp >= day.dayLight.Sunrise && x.Timestamp <= day.dayLight.Sunset);
        }
        // for each hour in the day
        let hourCount = 0;
        for (let hour = day.dayLight.Sunrise.getHours(); hour <= day.dayLight.Sunset.getHours(); hour++) {
            let hourWind = wind.filter(x => x.Timestamp.getHours() === hour);
            let hourTide = tide.filter(x => x.Timestamp.getHours() === hour);
            let hourRainfall = rainfall.filter(x => x.Timestamp.getHours() === hour);
            if (hourWind.length > 0 && hourTide.length > 0 && hourRainfall.length > 0) {
                hourCount++;
            }
        }
        return hourCount;
    }
}


/***/ })

/******/ });
//# sourceMappingURL=0-es2015.worker.js.map