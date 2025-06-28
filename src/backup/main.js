/*! For license information please see main.js.LICENSE.txt */
( () => {
    var e, r, t = {
        "./node_modules/ansi-html-community/index.js": e => {
            "use strict";
            e.exports = ansiHTML;
            var r = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/
              , t = {
                reset: ["fff", "000"],
                black: "000",
                red: "ff0000",
                green: "209805",
                yellow: "e8bf03",
                blue: "0000ff",
                magenta: "ff00ff",
                cyan: "00ffee",
                lightgrey: "f0f0f0",
                darkgrey: "888"
            }
              , o = {
                30: "black",
                31: "red",
                32: "green",
                33: "yellow",
                34: "blue",
                35: "magenta",
                36: "cyan",
                37: "lightgrey"
            }
              , n = {
                1: "font-weight:bold",
                2: "opacity:0.5",
                3: "<i>",
                4: "<u>",
                8: "display:none",
                9: "<del>"
            }
              , i = {
                23: "</i>",
                24: "</u>",
                29: "</del>"
            };
            function ansiHTML(e) {
                if (!r.test(e))
                    return e;
                var t = []
                  , o = e.replace(/\033\[(\d+)m/g, (function(e, r) {
                    var o = n[r];
                    if (o)
                        return ~t.indexOf(r) ? (t.pop(),
                        "</span>") : (t.push(r),
                        "<" === o[0] ? o : '<span style="' + o + ';">');
                    var a = i[r];
                    return a ? (t.pop(),
                    a) : ""
                }
                ))
                  , a = t.length;
                return a > 0 && (o += Array(a + 1).join("</span>")),
                o
            }
            function _setTags(e) {
                for (var r in n[0] = "font-weight:normal;opacity:1;color:#" + e.reset[0] + ";background:#" + e.reset[1],
                n[7] = "color:#" + e.reset[1] + ";background:#" + e.reset[0],
                n[90] = "color:#" + e.darkgrey,
                o) {
                    var t = e[o[r]] || "000";
                    n[r] = "color:#" + t,
                    r = parseInt(r),
                    n[(r + 10).toString()] = "background:#" + t
                }
            }
            [0, 21, 22, 27, 28, 39, 49].forEach((function(e) {
                i[e] = "</span>"
            }
            )),
            ansiHTML.setColors = function(e) {
                if ("object" != typeof e)
                    throw new Error("`colors` parameter must be an Object.");
                var r = {};
                for (var o in t) {
                    var n = e.hasOwnProperty(o) ? e[o] : null;
                    if (n) {
                        if ("reset" === o) {
                            if ("string" == typeof n && (n = [n]),
                            !Array.isArray(n) || 0 === n.length || n.some((function(e) {
                                return "string" != typeof e
                            }
                            )))
                                throw new Error("The value of `" + o + "` property must be an Array and each item could only be a hex string, e.g.: FF0000");
                            var i = t[o];
                            n[0] || (n[0] = i[0]),
                            1 !== n.length && n[1] || (n = [n[0]]).push(i[1]),
                            n = n.slice(0, 2)
                        } else if ("string" != typeof n)
                            throw new Error("The value of `" + o + "` property must be a hex string, e.g.: FF0000");
                        r[o] = n
                    } else
                        r[o] = t[o]
                }
                _setTags(r)
            }
            ,
            ansiHTML.reset = function() {
                _setTags(t)
            }
            ,
            ansiHTML.tags = {},
            Object.defineProperty ? (Object.defineProperty(ansiHTML.tags, "open", {
                get: function() {
                    return n
                }
            }),
            Object.defineProperty(ansiHTML.tags, "close", {
                get: function() {
                    return i
                }
            })) : (ansiHTML.tags.open = n,
            ansiHTML.tags.close = i),
            ansiHTML.reset()
        }
        ,
        "./src/components/base/ApiService.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            function _setPrototypeOf(e, r) {
                return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(e, r) {
                    return e.__proto__ = r,
                    e
                }
                ,
                _setPrototypeOf(e, r)
            }
            function _createSuper(e) {
                var r = function _isNativeReflectConstruct() {
                    if ("undefined" == typeof Reflect || !Reflect.construct)
                        return !1;
                    if (Reflect.construct.sham)
                        return !1;
                    if ("function" == typeof Proxy)
                        return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                        ))),
                        !0
                    } catch (e) {
                        return !1
                    }
                }();
                return function _createSuperInternal() {
                    var t, o = _getPrototypeOf(e);
                    if (r) {
                        var n = _getPrototypeOf(this).constructor;
                        t = Reflect.construct(o, arguments, n)
                    } else
                        t = o.apply(this, arguments);
                    return function _possibleConstructorReturn(e, r) {
                        if (r && ("object" === _typeof(r) || "function" == typeof r))
                            return r;
                        if (void 0 !== r)
                            throw new TypeError("Derived constructors may only return object or undefined");
                        return function _assertThisInitialized(e) {
                            if (void 0 === e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(this, t)
                }
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            t.r(r),
            t.d(r, {
                ApiService: () => o
            });
            var o = function(e) {
                !function _inherits(e, r) {
                    if ("function" != typeof r && null !== r)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(r && r.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    r && _setPrototypeOf(e, r)
                }(ApiService, e);
                var r = _createSuper(ApiService);
                function ApiService() {
                    return function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, ApiService),
                    r.apply(this, arguments)
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(ApiService, [{
                    key: "getProductList",
                    value: function getProductList() {
                        return this.get("/product/")
                    }
                }, {
                    key: "sendOrder",
                    value: function sendOrder(e) {
                        return this.post("/order", e)
                    }
                }]),
                ApiService
            }(t("./src/components/base/api.ts").Api)
        }
        ,
        "./src/components/base/api.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                Api: () => o
            });
            var o = function() {
                function Api(e) {
                    var r, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, Api),
                    this.baseUrl = e,
                    this.options = {
                        headers: Object.assign({
                            "Content-Type": "application/json"
                        }, null !== (r = t.headers) && void 0 !== r ? r : {})
                    }
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(Api, [{
                    key: "handleResponse",
                    value: function handleResponse(e) {
                        return e.ok ? e.json() : e.json().then((function(r) {
                            var t;
                            return Promise.reject(null !== (t = r.error) && void 0 !== t ? t : e.statusText)
                        }
                        ))
                    }
                }, {
                    key: "get",
                    value: function get(e) {
                        var r = this;
                        return fetch(this.baseUrl + e, Object.assign(Object.assign({}, this.options), {
                            method: "GET"
                        })).then((function(e) {
                            return r.handleResponse(e)
                        }
                        )).catch((function(e) {
                            return console.error("GET error:", e),
                            Promise.reject(e)
                        }
                        ))
                    }
                }, {
                    key: "post",
                    value: function post(e, r) {
                        var t = this
                          , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "POST";
                        return fetch(this.baseUrl + e, Object.assign(Object.assign({}, this.options), {
                            method: o,
                            body: JSON.stringify(r)
                        })).then((function(e) {
                            return t.handleResponse(e)
                        }
                        )).catch((function(e) {
                            return console.error("".concat(o, " error:"), e),
                            Promise.reject(e)
                        }
                        ))
                    }
                }]),
                Api
            }()
        }
        ,
        "./src/components/base/events.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                EventEmitter: () => o
            });
            var o = function() {
                function EventEmitter() {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, EventEmitter),
                    this._events = new Map
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(EventEmitter, [{
                    key: "on",
                    value: function on(e, r) {
                        var t;
                        this._events.has(e) || this._events.set(e, new Set),
                        null === (t = this._events.get(e)) || void 0 === t || t.add(r)
                    }
                }, {
                    key: "emit",
                    value: function emit(e, r) {
                        this._events.forEach((function(t, o) {
                            "*" === o && t.forEach((function(t) {
                                return t({
                                    eventName: e,
                                    data: r
                                })
                            }
                            )),
                            (o instanceof RegExp && o.test(e) || o === e) && t.forEach((function(e) {
                                return e(r)
                            }
                            ))
                        }
                        ))
                    }
                }, {
                    key: "trigger",
                    value: function trigger(e, r) {
                        var t = this;
                        return function() {
                            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            t.emit(e, Object.assign(Object.assign({}, o || {}), r || {}))
                        }
                    }
                }]),
                EventEmitter
            }()
        }
        ,
        "./src/components/common/Modal.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                Modal: () => o
            });
            var o = function() {
                function Modal() {
                    var e = this;
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, Modal),
                    this._handleEscape = function(r) {
                        "Escape" === r.key && e.close()
                    }
                    ,
                    this.container = document.querySelector(".modal"),
                    this.content = this.container.querySelector(".modal__content"),
                    this.closeButton = this.container.querySelector(".modal__close"),
                    this.closeButton.addEventListener("click", (function() {
                        return e.close()
                    }
                    )),
                    this.container.addEventListener("click", (function(r) {
                        r.target === e.container && e.close()
                    }
                    ))
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(Modal, [{
                    key: "_toggleModal",
                    value: function _toggleModal() {
                        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                        this.container.classList.toggle("modal_active", e)
                    }
                }, {
                    key: "open",
                    value: function open(e) {
                        this.content.replaceChildren(e),
                        this._toggleModal(),
                        document.addEventListener("keydown", this._handleEscape)
                    }
                }, {
                    key: "close",
                    value: function close() {
                        this._toggleModal(!1),
                        this.content.replaceChildren(),
                        document.removeEventListener("keydown", this._handleEscape)
                    }
                }]),
                Modal
            }()
        }
        ,
        "./src/index.ts": (e, r, t) => {
            "use strict";
            t.r(r);
            var o = t("./src/presenters/AppPresenter.ts")
              , n = t("./src/components/base/events.ts")
              , i = (t("./src/scss/styles.scss"),
            new n.EventEmitter);
            new o.AppPresenter(i).init()
        }
        ,
        "./src/models/OrderService.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                OrderService: () => o
            });
            var o = function() {
                function OrderService() {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, OrderService)
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(OrderService, [{
                    key: "setPayment",
                    value: function setPayment(e) {
                        this.payment = e
                    }
                }, {
                    key: "getPayment",
                    value: function getPayment() {
                        return this.payment
                    }
                }, {
                    key: "setAddress",
                    value: function setAddress(e) {
                        this.address = e
                    }
                }, {
                    key: "getAddress",
                    value: function getAddress() {
                        return this.address
                    }
                }, {
                    key: "setEmail",
                    value: function setEmail(e) {
                        this.email = e
                    }
                }, {
                    key: "getEmail",
                    value: function getEmail() {
                        return this.email
                    }
                }, {
                    key: "setPhone",
                    value: function setPhone(e) {
                        this.phone = e
                    }
                }, {
                    key: "getPhone",
                    value: function getPhone() {
                        return this.phone
                    }
                }, {
                    key: "reset",
                    value: function reset() {
                        this.payment = void 0,
                        this.address = void 0,
                        this.email = void 0,
                        this.phone = void 0
                    }
                }]),
                OrderService
            }()
        }
        ,
        "./src/presenters/AppPresenter.ts": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                AppPresenter: () => v
            });
            var o = t("./src/views/CatalogView.ts")
              , n = t("./src/presenters/CatalogPresenter.ts")
              , i = t("./src/presenters/BasketService.ts")
              , a = t("./src/presenters/OrderHandler.ts")
              , s = t("./src/components/base/ApiService.ts")
              , c = t("./src/views/PreviewView.ts")
              , l = t("./src/presenters/PreviewPresenter.ts")
              , u = t("./src/views/BasketView.ts")
              , p = t("./src/components/common/Modal.ts")
              , d = t("./src/views/OrderView.ts")
              , f = t("./src/models/OrderService.ts")
              , m = t("./src/presenters/FormFlowPresenter.ts")
              , g = t("./src/presenters/ModalManager.ts");
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            var v = function() {
                function AppPresenter(e) {
                    var r = this;
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, AppPresenter),
                    this.events = e,
                    this.orderService = new f.OrderService,
                    this.lastTotal = 0,
                    this.api = new s.ApiService("https://larek-api.nomoreparties.co/api/weblarek");
                    var t = new o.CatalogView(".gallery",this.events)
                      , v = new c.PreviewView("#card-preview",".modal__content")
                      , y = new p.Modal;
                    this.basketView = new u.BasketView,
                    this.orderView = new d.OrderView(document.querySelector(".modal__content")),
                    this.modal = new g.ModalManager(y),
                    this.catalog = new n.CatalogPresenter({
                        api: this.api,
                        events: this.events,
                        view: t
                    }),
                    this.basket = new i.BasketService(this.events),
                    this.preview = new l.PreviewPresenter(this.events,v),
                    this.order = new a.OrderHandler({
                        api: this.api,
                        events: this.events
                    }),
                    this.formFlow = new m.FormFlowPresenter({
                        orderService: this.orderService,
                        orderView: this.orderView,
                        basketItems: function basketItems() {
                            return r.basket.getItems()
                        },
                        getTotal: function getTotal() {
                            return r.lastTotal
                        },
                        clearBasket: function clearBasket() {
                            return r.basket.clear()
                        },
                        events: this.events,
                        modal: this.modal
                    })
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(AppPresenter, [{
                    key: "init",
                    value: function init() {
                        var e, r = this;
                        this.catalog.init(),
                        this.basket.init(),
                        this.order.init(),
                        this.preview.init(),
                        this.events.on("basket:changed", (function(e) {
                            var t = e.items;
                            r.basketView.updateCounter(t.length)
                        }
                        )),
                        this.events.on("order:open", (function() {
                            r.formFlow.start()
                        }
                        )),
                        this.events.on("basket:open", (function() {
                            var e = r.basket.getItems();
                            r.lastTotal = e.reduce((function(e, r) {
                                var t;
                                return e + (null !== (t = r.price) && void 0 !== t ? t : 0)
                            }
                            ), 0);
                            var t = r.basketView.render(e);
                            r.basketView.setOnRemove((function(e) {
                                r.basket.remove(e),
                                r.events.emit("basket:open")
                            }
                            )),
                            r.basketView.setOnSubmit((function() {
                                r.events.emit("order:open")
                            }
                            )),
                            r.modal.open(t)
                        }
                        )),
                        null === (e = document.querySelector(".header__basket")) || void 0 === e || e.addEventListener("click", (function() {
                            r.events.emit("basket:open")
                        }
                        )),
                        this.modal.bindCloseButton("modal__close")
                    }
                }]),
                AppPresenter
            }()
        }
        ,
        "./src/presenters/BasketService.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                BasketService: () => o
            });
            var o = function() {
                function BasketService(e) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, BasketService),
                    this.events = e,
                    this.basket = [],
                    this.catalog = []
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(BasketService, [{
                    key: "init",
                    value: function init() {
                        var e = this;
                        this.loadFromStorage(),
                        this.events.on("basket:add", (function(r) {
                            var t = r.id;
                            return e.add(t)
                        }
                        )),
                        this.events.on("basket:remove", (function(r) {
                            var t = r.id;
                            return e.remove(t)
                        }
                        )),
                        this.events.on("items:changed", (function(r) {
                            e.catalog = r,
                            e.emitBasketChanged()
                        }
                        )),
                        this.events.on("basket:get", (function(r) {
                            var t = r.id
                              , o = e.basket.includes(t);
                            e.events.emit("basket:status", {
                                id: t,
                                inBasket: o
                            })
                        }
                        ))
                    }
                }, {
                    key: "loadFromStorage",
                    value: function loadFromStorage() {
                        var e = localStorage.getItem("basket");
                        if (e)
                            try {
                                var r = JSON.parse(e);
                                Array.isArray(r) && (this.basket = r)
                            } catch (e) {
                                console.warn("Failed to parse basket from storage", e)
                            }
                    }
                }, {
                    key: "saveToStorage",
                    value: function saveToStorage() {
                        localStorage.setItem("basket", JSON.stringify(this.basket))
                    }
                }, {
                    key: "emitBasketChanged",
                    value: function emitBasketChanged() {
                        var e = this.getItems()
                          , r = e.reduce((function(e, r) {
                            var t;
                            return e + (null !== (t = r.price) && void 0 !== t ? t : 0)
                        }
                        ), 0)
                          , t = {
                            items: e,
                            total: r
                        };
                        this.events.emit("basket:changed", t)
                    }
                }, {
                    key: "add",
                    value: function add(e) {
                        this.basket.includes(e) || (this.basket.push(e),
                        this.saveToStorage(),
                        this.emitBasketChanged())
                    }
                }, {
                    key: "remove",
                    value: function remove(e) {
                        this.basket = this.basket.filter((function(r) {
                            return r !== e
                        }
                        )),
                        this.saveToStorage(),
                        this.emitBasketChanged()
                    }
                }, {
                    key: "getItems",
                    value: function getItems() {
                        var e = this;
                        return this.catalog.filter((function(r) {
                            return e.basket.includes(r.id)
                        }
                        ))
                    }
                }, {
                    key: "clear",
                    value: function clear() {
                        this.basket = [],
                        this.saveToStorage(),
                        this.emitBasketChanged()
                    }
                }]),
                BasketService
            }()
        }
        ,
        "./src/presenters/CatalogPresenter.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                CatalogPresenter: () => o
            });
            var o = function() {
                function CatalogPresenter(e) {
                    var r = e.api
                      , t = e.events
                      , o = e.view;
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, CatalogPresenter),
                    this.api = r,
                    this.events = t,
                    this.view = o
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(CatalogPresenter, [{
                    key: "init",
                    value: function init() {
                        var e = this;
                        this.api.getProductList().then((function(r) {
                            e.view.render(r.items),
                            e.events.emit("items:changed", r.items)
                        }
                        )).catch((function(e) {
                            console.error("Произошла ошибка при загрузке списка:", e)
                        }
                        ))
                    }
                }]),
                CatalogPresenter
            }()
        }
        ,
        "./src/presenters/FormFlowPresenter.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                FormFlowPresenter: () => o
            });
            var o = function() {
                function FormFlowPresenter(e) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, FormFlowPresenter),
                    this.options = e
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(FormFlowPresenter, [{
                    key: "start",
                    value: function start() {
                        var e = this
                          , r = this.options
                          , t = r.orderView
                          , o = r.modal
                          , n = r.orderService
                          , i = t.render();
                        o.open(i),
                        setTimeout((function() {
                            t.setOnSubmit((function() {
                                var r = {
                                    address: n.getAddress(),
                                    email: n.getEmail(),
                                    phone: n.getPhone(),
                                    payment: n.getPayment(),
                                    items: e.options.basketItems(),
                                    total: e.options.getTotal()
                                };
                                e.options.events.emit("order:submit", r)
                            }
                            )),
                            e.setupFirstStep()
                        }
                        ), 0)
                    }
                }, {
                    key: "setupFirstStep",
                    value: function setupFirstStep() {
                        var e = this
                          , r = document.querySelector(".modal__content");
                        if (r) {
                            var t = r.querySelectorAll(".order__buttons .button")
                              , o = r.querySelector('input[name="address"]')
                              , n = r.querySelector(".order__button")
                              , i = r.querySelector(".form__errors_payment")
                              , a = r.querySelector(".form__errors_address")
                              , s = function validate() {
                                var r = !0
                                  , t = e.options.orderService.getPayment()
                                  , s = (null == o ? void 0 : o.value.trim()) || "";
                                i.textContent = "",
                                a.textContent = "",
                                t || (i.textContent = "Выберите способ оплаты",
                                r = !1),
                                s.length < 20 || /\s{2,}/.test(s) ? (a.textContent = "Адрес должен содержать минимум 20 символов",
                                r = !1) : e.options.orderService.setAddress(s),
                                n.disabled = !r
                            };
                            t.forEach((function(r) {
                                r.addEventListener("click", (function() {
                                    t.forEach((function(e) {
                                        return e.classList.remove("button_alt-active")
                                    }
                                    )),
                                    r.classList.add("button_alt-active"),
                                    e.options.orderService.setPayment(r.name),
                                    s()
                                }
                                ))
                            }
                            )),
                            null == o || o.addEventListener("input", s),
                            null == n || n.addEventListener("click", (function(r) {
                                r.preventDefault(),
                                s(),
                                (null == n ? void 0 : n.disabled) || e.setupContactsStep()
                            }
                            ))
                        }
                    }
                }, {
                    key: "setupContactsStep",
                    value: function setupContactsStep() {
                        var e = this;
                        this.options.modal.openTemplate("contacts"),
                        setTimeout((function() {
                            var r = document.querySelector(".modal__content");
                            if (r) {
                                var t = r.querySelector('input[name="email"]')
                                  , o = r.querySelector('input[name="phone"]')
                                  , n = r.querySelector('button[type="submit"]')
                                  , i = r.querySelector(".form__errors_email")
                                  , a = r.querySelector(".form__errors_phone")
                                  , s = function updatePayButton() {
                                    var r, s = (null == t ? void 0 : t.value.trim()) || "", c = (null == o ? void 0 : o.value.trim()) || "", l = s.includes("@") && s.length >= 15 && (null === (r = s.split("@")[1]) || void 0 === r ? void 0 : r.length) >= 7, u = /^\+?\d{10,}$/.test(c);
                                    i.textContent = "",
                                    a.textContent = "",
                                    l || (i.textContent = "Введите email в правильном формате"),
                                    u || (a.textContent = "Длина телефона должна быть 10 символов. Используйте только цифры");
                                    var p = l && u;
                                    n && (n.disabled = !p),
                                    p && (e.options.orderService.setEmail(s),
                                    e.options.orderService.setPhone(c))
                                };
                                null == t || t.addEventListener("input", s),
                                null == o || o.addEventListener("input", s);
                                var c = r.querySelector("form");
                                null == c || c.addEventListener("submit", (function(r) {
                                    r.preventDefault();
                                    var t = e.options.getTotal();
                                    e.options.clearBasket(),
                                    e.options.orderService.reset(),
                                    e.options.events.emit("basket:changed", {
                                        items: [],
                                        total: t
                                    }),
                                    e.options.modal.openTemplate("success"),
                                    setTimeout((function() {
                                        var r = document.querySelector(".modal__content")
                                          , o = null == r ? void 0 : r.querySelector(".order-success__description")
                                          , n = null == r ? void 0 : r.querySelector(".order-success__close");
                                        o && (o.textContent = "Списано ".concat(t, " синапсов")),
                                        null == n || n.addEventListener("click", (function() {
                                            e.options.modal.close(),
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth"
                                            })
                                        }
                                        ))
                                    }
                                    ), 0)
                                }
                                ))
                            }
                        }
                        ), 0)
                    }
                }]),
                FormFlowPresenter
            }()
        }
        ,
        "./src/presenters/ModalManager.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                ModalManager: () => o
            });
            var o = function() {
                function ModalManager(e) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, ModalManager),
                    this.modal = e
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(ModalManager, [{
                    key: "open",
                    value: function open(e) {
                        this.modal.open(e)
                    }
                }, {
                    key: "openTemplate",
                    value: function openTemplate(e) {
                        var r = document.getElementById(e);
                        if (!r)
                            throw new Error("Template '".concat(e, "' not found"));
                        var t = r.content.cloneNode(!0);
                        this.open(t)
                    }
                }, {
                    key: "close",
                    value: function close() {
                        this.modal.close()
                    }
                }, {
                    key: "bindCloseButton",
                    value: function bindCloseButton(e) {
                        var r = this;
                        document.addEventListener("click", (function(t) {
                            t.target.classList.contains(e) && r.close()
                        }
                        ))
                    }
                }]),
                ModalManager
            }()
        }
        ,
        "./src/presenters/OrderHandler.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                OrderHandler: () => o
            });
            var o = function() {
                function OrderHandler(e) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, OrderHandler),
                    this.api = e.api,
                    this.events = e.events
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(OrderHandler, [{
                    key: "init",
                    value: function init() {
                        var e = this;
                        this.events.on("order:submit", (function(r) {
                            e.api.post("/order", r).then((function() {
                                console.log("Заказ успешно отправлен")
                            }
                            )).catch((function(r) {
                                console.error("Ошибка при отправке заказа:", r),
                                e.events.emit("order:error", {
                                    message: "Не удалось оформить заказ. Попробуйте позже."
                                })
                            }
                            ))
                        }
                        ))
                    }
                }]),
                OrderHandler
            }()
        }
        ,
        "./src/presenters/PreviewPresenter.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                PreviewPresenter: () => o
            });
            var o = function() {
                function PreviewPresenter(e, r) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PreviewPresenter),
                    this.events = e,
                    this.view = r
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(PreviewPresenter, [{
                    key: "init",
                    value: function init() {
                        var e, r, t = this;
                        this.events.on("preview:changed", (function(e) {
                            t.view.render(e),
                            t.events.emit("basket:get", {
                                id: e.id
                            })
                        }
                        )),
                        this.view.bindAddToCart((function(e) {
                            t.events.emit("basket:add", {
                                id: e
                            }),
                            t.view.updateButtonState(e, !0)
                        }
                        ), (function() {
                            t.events.emit("basket:open")
                        }
                        ));
                        var o = null === (r = (e = this.view).getContainer) || void 0 === r ? void 0 : r.call(e);
                        o && o.addEventListener("click", (function(e) {
                            e.target.classList.contains("modal__close") && t.view.close()
                        }
                        )),
                        this.events.on("basket:changed", (function(e) {
                            var r = t.view.getCurrentId();
                            if (r) {
                                var o = e.items.includes(r);
                                t.view.updateButtonState(r, o)
                            }
                        }
                        )),
                        this.events.on("basket:status", (function(e) {
                            var r = e.id
                              , o = e.inBasket;
                            t.view.getCurrentId() === r && t.view.updateButtonState(r, o)
                        }
                        ))
                    }
                }]),
                PreviewPresenter
            }()
        }
        ,
        "./src/types/index.ts": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                categoryMapping: () => o
            });
            var o = {
                "софт-скил": "soft",
                другое: "other",
                дополнительное: "additional",
                кнопка: "button",
                "хард-скил": "hard"
            }
        }
        ,
        "./src/utils/constants.ts": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                API_URL: () => o,
                CDN_URL: () => n,
                DEFAULT_IMAGE: () => i
            });
            var o = "".concat("https://larek-api.nomoreparties.co", "/api/weblarek")
              , n = "".concat("https://larek-api.nomoreparties.co", "/content/weblarek/")
              , i = "".concat("src/images/trash-2.svg")
        }
        ,
        "./src/utils/utils.ts": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                ensureAllElements: () => ensureAllElements,
                ensureElement: () => ensureElement,
                getImageUrl: () => getImageUrl,
                isSelector: () => isSelector,
                setImage: () => setImage
            });
            var o = t("./src/utils/constants.ts");
            function isSelector(e) {
                return "string" == typeof e
            }
            function ensureElement(e) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
                if (isSelector(e)) {
                    var t = r.querySelector(e);
                    if (!t)
                        throw new Error('Element with selector "'.concat(e, '" not found'));
                    if (!(t instanceof HTMLElement))
                        throw new Error('Element "'.concat(e, '" is not an HTMLElement'));
                    return t
                }
                if (!(e instanceof HTMLElement))
                    throw new Error("Provided element is not an instance of HTMLElement");
                return e
            }
            function ensureAllElements(e) {
                var r = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document).querySelectorAll(e);
                return Array.from(r).filter((function(e) {
                    return e instanceof HTMLElement
                }
                ))
            }
            function getImageUrl(e) {
                return e && e.startsWith("/") ? (e = e.replace(/^\/+/, ""),
                new URL(e,o.CDN_URL).toString()) : o.DEFAULT_IMAGE
            }
            function setImage(e, r) {
                var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                e && (e.src = getImageUrl(r),
                e.alt = t || "Изображение")
            }
        }
        ,
        "./src/views/BasketView.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                BasketView: () => o
            });
            var o = function() {
                function BasketView() {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, BasketView);
                    var e = document.getElementById("basket");
                    if (!e)
                        throw new Error("Basket template not found");
                    this.root = e.content.firstElementChild.cloneNode(!0),
                    this.list = this.root.querySelector(".basket__list"),
                    this.priceEl = this.root.querySelector(".basket__price"),
                    this.submitButton = this.root.querySelector(".basket__button"),
                    this.submitButton.disabled = !0
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(BasketView, [{
                    key: "updateCounter",
                    value: function updateCounter(e) {
                        var r = document.querySelector(".header__basket-counter");
                        r && (r.textContent = String(e))
                    }
                }, {
                    key: "render",
                    value: function render(e) {
                        var r = this;
                        this.list.replaceChildren();
                        var t = 0;
                        return e.forEach((function(e, o) {
                            var n, i = document.createElement("li");
                            i.classList.add("basket__item");
                            var a = document.createElement("span");
                            a.classList.add("basket__item-index"),
                            a.textContent = (o + 1).toString(),
                            i.appendChild(a);
                            var s = document.createElement("span");
                            s.textContent = e.title + " ";
                            var c = document.createElement("span");
                            c.textContent = "".concat(e.price, " синапсов");
                            var l = document.createElement("button");
                            l.classList.add("basket__item-delete"),
                            l.dataset.id = e.id,
                            l.setAttribute("aria-label", "Удалить товар"),
                            s.classList.add("basket__item-title"),
                            i.appendChild(s),
                            i.appendChild(c),
                            i.appendChild(l),
                            r.list.appendChild(i),
                            t += null !== (n = e.price) && void 0 !== n ? n : 0
                        }
                        )),
                        this.priceEl.textContent = "".concat(t, " синапсов"),
                        this.submitButton.disabled = 0 === e.length,
                        this.root
                    }
                }, {
                    key: "setOnRemove",
                    value: function setOnRemove(e) {
                        this.list.addEventListener("click", (function(r) {
                            var t = r.target.closest(".basket__item-delete");
                            (null == t ? void 0 : t.dataset.id) && e(t.dataset.id)
                        }
                        ))
                    }
                }, {
                    key: "setOnSubmit",
                    value: function setOnSubmit(e) {
                        var r = this;
                        this.submitButton.addEventListener("click", (function() {
                            r.submitButton.disabled || e()
                        }
                        ))
                    }
                }]),
                BasketView
            }()
        }
        ,
        "./src/views/CatalogView.ts": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                CatalogView: () => n
            });
            var o = t("./src/views/ProductCard.ts");
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            var n = function() {
                function CatalogView(e, r) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, CatalogView),
                    this.events = r;
                    var t = document.querySelector(e);
                    if (!t)
                        throw new Error("Element '".concat(e, "' not found"));
                    this.container = t
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(CatalogView, [{
                    key: "render",
                    value: function render(e) {
                        var r = this
                          , t = document.createDocumentFragment();
                        e.forEach((function(e) {
                            var n = new o.ProductCard(e).render();
                            n.addEventListener("click", (function() {
                                r.events.emit("preview:changed", e)
                            }
                            )),
                            t.appendChild(n)
                        }
                        )),
                        this.container.replaceChildren(t)
                    }
                }]),
                CatalogView
            }()
        }
        ,
        "./src/views/OrderView.ts": (e, r, t) => {
            "use strict";
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            t.r(r),
            t.d(r, {
                OrderView: () => o
            });
            var o = function() {
                function OrderView(e) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, OrderView),
                    this.container = e,
                    this.formSelector = "form";
                    var r = document.getElementById("order");
                    if (!r)
                        throw new Error("Order template not found");
                    this.template = r
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(OrderView, [{
                    key: "render",
                    value: function render() {
                        return this.template.content.cloneNode(!0)
                    }
                }, {
                    key: "setOnSubmit",
                    value: function setOnSubmit(e) {
                        var r = this;
                        setTimeout((function() {
                            var t = document.querySelector(".modal__content");
                            if (t) {
                                var o = t.querySelector(r.formSelector);
                                o ? o.addEventListener("submit", (function(r) {
                                    r.preventDefault(),
                                    e()
                                }
                                )) : console.warn("Form not found inside modal content")
                            } else
                                console.warn("Modal content not found")
                        }
                        ), 0)
                    }
                }]),
                OrderView
            }()
        }
        ,
        "./src/views/PreviewView.ts": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                PreviewView: () => n
            });
            var o = t("./src/utils/utils.ts");
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            var n = function() {
                function PreviewView(e, r) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PreviewView),
                    this.currentId = null;
                    var t = document.querySelector(e)
                      , o = document.querySelector(r)
                      , n = null == o ? void 0 : o.closest(".modal");
                    if (!(t instanceof HTMLTemplateElement))
                        throw new Error("Template '".concat(e, "' not found or not a <template>"));
                    if (!(o instanceof HTMLElement))
                        throw new Error("Container '".concat(r, "' not found"));
                    if (!(n instanceof HTMLElement))
                        throw new Error("Modal not found for container '".concat(r, "'"));
                    this.template = t,
                    this.container = o,
                    this.modal = n
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(PreviewView, [{
                    key: "render",
                    value: function render(e) {
                        this.currentId = e.id;
                        var r = this.template.content.cloneNode(!0);
                        r.querySelector(".card__title").textContent = e.title,
                        r.querySelector(".card__text").textContent = e.description,
                        r.querySelector(".card__category").textContent = e.category,
                        r.querySelector(".card__price").textContent = e.price ? "".concat(e.price, " синапсов") : "Бесценно";
                        var t = r.querySelector(".card__image");
                        (0,
                        o.setImage)(t, e.image, e.title);
                        var n = r.querySelector(".button");
                        n.classList.add("card__button"),
                        n.dataset.id = e.id,
                        n.textContent = "В корзину",
                        this.container.replaceChildren(r),
                        this.modal.classList.add("modal_active")
                    }
                }, {
                    key: "close",
                    value: function close() {
                        this.modal.classList.remove("modal_active")
                    }
                }, {
                    key: "bindAddToCart",
                    value: function bindAddToCart(e, r) {
                        this.container.addEventListener("click", (function(t) {
                            var o = t.target;
                            if (o.classList.contains("card__button")) {
                                var n = o.dataset.id;
                                n && ("Купить" === o.textContent ? r() : e(n))
                            }
                        }
                        ))
                    }
                }, {
                    key: "updateButtonState",
                    value: function updateButtonState(e, r) {
                        var t = this.container.querySelector(".card__button");
                        t && t.dataset.id === e && setTimeout((function() {
                            t.textContent = r ? "Купить" : "В корзину"
                        }
                        ), 0)
                    }
                }, {
                    key: "getCurrentId",
                    value: function getCurrentId() {
                        return this.currentId
                    }
                }, {
                    key: "getContainer",
                    value: function getContainer() {
                        return this.container
                    }
                }]),
                PreviewView
            }()
        }
        ,
        "./src/views/ProductCard.ts": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                ProductCard: () => i
            });
            var o = t("./src/types/index.ts")
              , n = t("./src/utils/utils.ts");
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    i = function _toPrimitive(e, r) {
                        if ("object" !== _typeof(e) || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" !== _typeof(o))
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string"),
                    "symbol" === _typeof(i) ? i : String(i)), o)
                }
                var n, i
            }
            var i = function() {
                function ProductCard(e) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, ProductCard),
                    this.item = e
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(ProductCard, [{
                    key: "render",
                    value: function render() {
                        var e = document.getElementById("card-catalog");
                        if (!e)
                            throw new Error("Card template not found");
                        var r = e.content.firstElementChild.cloneNode(!0)
                          , t = r.querySelector(".card__category")
                          , o = r.querySelector(".card__title")
                          , i = r.querySelector(".card__price")
                          , a = r.querySelector(".card__image");
                        return t.textContent = this.item.category,
                        this.updateCategoryClass(t, this.item.category),
                        o.textContent = this.item.title,
                        i.textContent = this.item.price ? "".concat(this.item.price, " синапсов") : "Бесценно",
                        (0,
                        n.setImage)(a, this.item.image, this.item.title),
                        r.setAttribute("data-id", this.item.id),
                        r
                    }
                }, {
                    key: "updateCategoryClass",
                    value: function updateCategoryClass(e, r) {
                        if (Array.from(e.classList).forEach((function(r) {
                            r.startsWith("card__category_") && e.classList.remove(r)
                        }
                        )),
                        r in o.categoryMapping) {
                            var t = o.categoryMapping[r];
                            e.classList.add("card__category_".concat(t))
                        } else
                            console.warn('Неизвестная категория: "'.concat(r, '"'))
                    }
                }]),
                ProductCard
            }()
        }
        ,
        "./node_modules/events/events.js": e => {
            "use strict";
            var r, t = "object" == typeof Reflect ? Reflect : null, o = t && "function" == typeof t.apply ? t.apply : function ReflectApply(e, r, t) {
                return Function.prototype.apply.call(e, r, t)
            }
            ;
            r = t && "function" == typeof t.ownKeys ? t.ownKeys : Object.getOwnPropertySymbols ? function ReflectOwnKeys(e) {
                return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
            }
            : function ReflectOwnKeys(e) {
                return Object.getOwnPropertyNames(e)
            }
            ;
            var n = Number.isNaN || function NumberIsNaN(e) {
                return e != e
            }
            ;
            function EventEmitter() {
                EventEmitter.init.call(this)
            }
            e.exports = EventEmitter,
            e.exports.once = function once(e, r) {
                return new Promise((function(t, o) {
                    function errorListener(t) {
                        e.removeListener(r, resolver),
                        o(t)
                    }
                    function resolver() {
                        "function" == typeof e.removeListener && e.removeListener("error", errorListener),
                        t([].slice.call(arguments))
                    }
                    eventTargetAgnosticAddListener(e, r, resolver, {
                        once: !0
                    }),
                    "error" !== r && function addErrorHandlerIfEventEmitter(e, r, t) {
                        "function" == typeof e.on && eventTargetAgnosticAddListener(e, "error", r, t)
                    }(e, errorListener, {
                        once: !0
                    })
                }
                ))
            }
            ,
            EventEmitter.EventEmitter = EventEmitter,
            EventEmitter.prototype._events = void 0,
            EventEmitter.prototype._eventsCount = 0,
            EventEmitter.prototype._maxListeners = void 0;
            var i = 10;
            function checkListener(e) {
                if ("function" != typeof e)
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
            }
            function _getMaxListeners(e) {
                return void 0 === e._maxListeners ? EventEmitter.defaultMaxListeners : e._maxListeners
            }
            function _addListener(e, r, t, o) {
                var n, i, a;
                if (checkListener(t),
                void 0 === (i = e._events) ? (i = e._events = Object.create(null),
                e._eventsCount = 0) : (void 0 !== i.newListener && (e.emit("newListener", r, t.listener ? t.listener : t),
                i = e._events),
                a = i[r]),
                void 0 === a)
                    a = i[r] = t,
                    ++e._eventsCount;
                else if ("function" == typeof a ? a = i[r] = o ? [t, a] : [a, t] : o ? a.unshift(t) : a.push(t),
                (n = _getMaxListeners(e)) > 0 && a.length > n && !a.warned) {
                    a.warned = !0;
                    var s = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(r) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    s.name = "MaxListenersExceededWarning",
                    s.emitter = e,
                    s.type = r,
                    s.count = a.length,
                    function ProcessEmitWarning(e) {
                        console && console.warn && console.warn(e)
                    }(s)
                }
                return e
            }
            function onceWrapper() {
                if (!this.fired)
                    return this.target.removeListener(this.type, this.wrapFn),
                    this.fired = !0,
                    0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }
            function _onceWrap(e, r, t) {
                var o = {
                    fired: !1,
                    wrapFn: void 0,
                    target: e,
                    type: r,
                    listener: t
                }
                  , n = onceWrapper.bind(o);
                return n.listener = t,
                o.wrapFn = n,
                n
            }
            function _listeners(e, r, t) {
                var o = e._events;
                if (void 0 === o)
                    return [];
                var n = o[r];
                return void 0 === n ? [] : "function" == typeof n ? t ? [n.listener || n] : [n] : t ? function unwrapListeners(e) {
                    for (var r = new Array(e.length), t = 0; t < r.length; ++t)
                        r[t] = e[t].listener || e[t];
                    return r
                }(n) : arrayClone(n, n.length)
            }
            function listenerCount(e) {
                var r = this._events;
                if (void 0 !== r) {
                    var t = r[e];
                    if ("function" == typeof t)
                        return 1;
                    if (void 0 !== t)
                        return t.length
                }
                return 0
            }
            function arrayClone(e, r) {
                for (var t = new Array(r), o = 0; o < r; ++o)
                    t[o] = e[o];
                return t
            }
            function eventTargetAgnosticAddListener(e, r, t, o) {
                if ("function" == typeof e.on)
                    o.once ? e.once(r, t) : e.on(r, t);
                else {
                    if ("function" != typeof e.addEventListener)
                        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
                    e.addEventListener(r, (function wrapListener(n) {
                        o.once && e.removeEventListener(r, wrapListener),
                        t(n)
                    }
                    ))
                }
            }
            Object.defineProperty(EventEmitter, "defaultMaxListeners", {
                enumerable: !0,
                get: function() {
                    return i
                },
                set: function(e) {
                    if ("number" != typeof e || e < 0 || n(e))
                        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                    i = e
                }
            }),
            EventEmitter.init = function() {
                void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null),
                this._eventsCount = 0),
                this._maxListeners = this._maxListeners || void 0
            }
            ,
            EventEmitter.prototype.setMaxListeners = function setMaxListeners(e) {
                if ("number" != typeof e || e < 0 || n(e))
                    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
                return this._maxListeners = e,
                this
            }
            ,
            EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
                return _getMaxListeners(this)
            }
            ,
            EventEmitter.prototype.emit = function emit(e) {
                for (var r = [], t = 1; t < arguments.length; t++)
                    r.push(arguments[t]);
                var n = "error" === e
                  , i = this._events;
                if (void 0 !== i)
                    n = n && void 0 === i.error;
                else if (!n)
                    return !1;
                if (n) {
                    var a;
                    if (r.length > 0 && (a = r[0]),
                    a instanceof Error)
                        throw a;
                    var s = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
                    throw s.context = a,
                    s
                }
                var c = i[e];
                if (void 0 === c)
                    return !1;
                if ("function" == typeof c)
                    o(c, this, r);
                else {
                    var l = c.length
                      , u = arrayClone(c, l);
                    for (t = 0; t < l; ++t)
                        o(u[t], this, r)
                }
                return !0
            }
            ,
            EventEmitter.prototype.addListener = function addListener(e, r) {
                return _addListener(this, e, r, !1)
            }
            ,
            EventEmitter.prototype.on = EventEmitter.prototype.addListener,
            EventEmitter.prototype.prependListener = function prependListener(e, r) {
                return _addListener(this, e, r, !0)
            }
            ,
            EventEmitter.prototype.once = function once(e, r) {
                return checkListener(r),
                this.on(e, _onceWrap(this, e, r)),
                this
            }
            ,
            EventEmitter.prototype.prependOnceListener = function prependOnceListener(e, r) {
                return checkListener(r),
                this.prependListener(e, _onceWrap(this, e, r)),
                this
            }
            ,
            EventEmitter.prototype.removeListener = function removeListener(e, r) {
                var t, o, n, i, a;
                if (checkListener(r),
                void 0 === (o = this._events))
                    return this;
                if (void 0 === (t = o[e]))
                    return this;
                if (t === r || t.listener === r)
                    0 == --this._eventsCount ? this._events = Object.create(null) : (delete o[e],
                    o.removeListener && this.emit("removeListener", e, t.listener || r));
                else if ("function" != typeof t) {
                    for (n = -1,
                    i = t.length - 1; i >= 0; i--)
                        if (t[i] === r || t[i].listener === r) {
                            a = t[i].listener,
                            n = i;
                            break
                        }
                    if (n < 0)
                        return this;
                    0 === n ? t.shift() : function spliceOne(e, r) {
                        for (; r + 1 < e.length; r++)
                            e[r] = e[r + 1];
                        e.pop()
                    }(t, n),
                    1 === t.length && (o[e] = t[0]),
                    void 0 !== o.removeListener && this.emit("removeListener", e, a || r)
                }
                return this
            }
            ,
            EventEmitter.prototype.off = EventEmitter.prototype.removeListener,
            EventEmitter.prototype.removeAllListeners = function removeAllListeners(e) {
                var r, t, o;
                if (void 0 === (t = this._events))
                    return this;
                if (void 0 === t.removeListener)
                    return 0 === arguments.length ? (this._events = Object.create(null),
                    this._eventsCount = 0) : void 0 !== t[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete t[e]),
                    this;
                if (0 === arguments.length) {
                    var n, i = Object.keys(t);
                    for (o = 0; o < i.length; ++o)
                        "removeListener" !== (n = i[o]) && this.removeAllListeners(n);
                    return this.removeAllListeners("removeListener"),
                    this._events = Object.create(null),
                    this._eventsCount = 0,
                    this
                }
                if ("function" == typeof (r = t[e]))
                    this.removeListener(e, r);
                else if (void 0 !== r)
                    for (o = r.length - 1; o >= 0; o--)
                        this.removeListener(e, r[o]);
                return this
            }
            ,
            EventEmitter.prototype.listeners = function listeners(e) {
                return _listeners(this, e, !0)
            }
            ,
            EventEmitter.prototype.rawListeners = function rawListeners(e) {
                return _listeners(this, e, !1)
            }
            ,
            EventEmitter.listenerCount = function(e, r) {
                return "function" == typeof e.listenerCount ? e.listenerCount(r) : listenerCount.call(e, r)
            }
            ,
            EventEmitter.prototype.listenerCount = listenerCount,
            EventEmitter.prototype.eventNames = function eventNames() {
                return this._eventsCount > 0 ? r(this._events) : []
            }
        }
        ,
        "./node_modules/html-entities/lib/index.js": function(e, r, t) {
            "use strict";
            var o = this && this.__assign || function() {
                return o = Object.assign || function(e) {
                    for (var r, t = 1, o = arguments.length; t < o; t++)
                        for (var n in r = arguments[t])
                            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                    return e
                }
                ,
                o.apply(this, arguments)
            }
            ;
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("./node_modules/html-entities/lib/named-references.js")
              , i = t("./node_modules/html-entities/lib/numeric-unicode-map.js")
              , a = t("./node_modules/html-entities/lib/surrogate-pairs.js")
              , s = o(o({}, n.namedReferences), {
                all: n.namedReferences.html5
            })
              , c = {
                specialChars: /[<>'"&]/g,
                nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
                nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
                extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
            }
              , l = {
                mode: "specialChars",
                level: "all",
                numeric: "decimal"
            };
            r.encode = function encode(e, r) {
                var t = void 0 === (u = (i = void 0 === r ? l : r).mode) ? "specialChars" : u
                  , o = void 0 === (m = i.numeric) ? "decimal" : m
                  , n = i.level;
                if (!e)
                    return "";
                var i, u, p = c[t], d = s[void 0 === n ? "all" : n].characters, f = "hexadecimal" === o;
                if (p.lastIndex = 0,
                i = p.exec(e)) {
                    u = "";
                    var m = 0;
                    do {
                        m !== i.index && (u += e.substring(m, i.index));
                        var g = d[n = i[0]];
                        if (!g) {
                            var v = n.length > 1 ? a.getCodePoint(n, 0) : n.charCodeAt(0);
                            g = (f ? "&#x" + v.toString(16) : "&#" + v) + ";"
                        }
                        u += g,
                        m = i.index + n.length
                    } while (i = p.exec(e));
                    m !== e.length && (u += e.substring(m))
                } else
                    u = e;
                return u
            }
            ;
            var u = {
                scope: "body",
                level: "all"
            }
              , p = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g
              , d = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g
              , f = {
                xml: {
                    strict: p,
                    attribute: d,
                    body: n.bodyRegExps.xml
                },
                html4: {
                    strict: p,
                    attribute: d,
                    body: n.bodyRegExps.html4
                },
                html5: {
                    strict: p,
                    attribute: d,
                    body: n.bodyRegExps.html5
                }
            }
              , m = o(o({}, f), {
                all: f.html5
            })
              , g = String.fromCharCode
              , v = g(65533)
              , y = {
                level: "all"
            };
            r.decodeEntity = function decodeEntity(e, r) {
                var t = void 0 === (o = (void 0 === r ? y : r).level) ? "all" : o;
                if (!e)
                    return "";
                var o = e
                  , n = (e[e.length - 1],
                s[t].entities[e]);
                if (n)
                    o = n;
                else if ("&" === e[0] && "#" === e[1]) {
                    var c = e[2]
                      , l = "x" == c || "X" == c ? parseInt(e.substr(3), 16) : parseInt(e.substr(2));
                    o = l >= 1114111 ? v : l > 65535 ? a.fromCodePoint(l) : g(i.numericUnicodeMap[l] || l)
                }
                return o
            }
            ,
            r.decode = function decode(e, r) {
                var t = void 0 === r ? u : r
                  , o = t.level
                  , n = void 0 === o ? "all" : o
                  , c = t.scope
                  , l = void 0 === c ? "xml" === n ? "strict" : "body" : c;
                if (!e)
                    return "";
                var p = m[n][l]
                  , d = s[n].entities
                  , f = "attribute" === l
                  , y = "strict" === l;
                p.lastIndex = 0;
                var h, b = p.exec(e);
                if (b) {
                    h = "";
                    var _ = 0;
                    do {
                        _ !== b.index && (h += e.substring(_, b.index));
                        var w = b[0]
                          , k = w
                          , E = w[w.length - 1];
                        if (f && "=" === E)
                            k = w;
                        else if (y && ";" !== E)
                            k = w;
                        else {
                            var S = d[w];
                            if (S)
                                k = S;
                            else if ("&" === w[0] && "#" === w[1]) {
                                var q = w[2]
                                  , C = "x" == q || "X" == q ? parseInt(w.substr(3), 16) : parseInt(w.substr(2));
                                k = C >= 1114111 ? v : C > 65535 ? a.fromCodePoint(C) : g(i.numericUnicodeMap[C] || C)
                            }
                        }
                        h += k,
                        _ = b.index + w.length
                    } while (b = p.exec(e));
                    _ !== e.length && (h += e.substring(_))
                } else
                    h = e;
                return h
            }
        },
        "./node_modules/html-entities/lib/named-references.js": (e, r) => {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.bodyRegExps = {
                xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
                html4: /&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
                html5: /&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
            },
            r.namedReferences = {
                xml: {
                    entities: {
                        "&lt;": "<",
                        "&gt;": ">",
                        "&quot;": '"',
                        "&apos;": "'",
                        "&amp;": "&"
                    },
                    characters: {
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&apos;",
                        "&": "&amp;"
                    }
                },
                html4: {
                    entities: {
                        "&apos;": "'",
                        "&nbsp": " ",
                        "&nbsp;": " ",
                        "&iexcl": "¡",
                        "&iexcl;": "¡",
                        "&cent": "¢",
                        "&cent;": "¢",
                        "&pound": "£",
                        "&pound;": "£",
                        "&curren": "¤",
                        "&curren;": "¤",
                        "&yen": "¥",
                        "&yen;": "¥",
                        "&brvbar": "¦",
                        "&brvbar;": "¦",
                        "&sect": "§",
                        "&sect;": "§",
                        "&uml": "¨",
                        "&uml;": "¨",
                        "&copy": "©",
                        "&copy;": "©",
                        "&ordf": "ª",
                        "&ordf;": "ª",
                        "&laquo": "«",
                        "&laquo;": "«",
                        "&not": "¬",
                        "&not;": "¬",
                        "&shy": "­",
                        "&shy;": "­",
                        "&reg": "®",
                        "&reg;": "®",
                        "&macr": "¯",
                        "&macr;": "¯",
                        "&deg": "°",
                        "&deg;": "°",
                        "&plusmn": "±",
                        "&plusmn;": "±",
                        "&sup2": "²",
                        "&sup2;": "²",
                        "&sup3": "³",
                        "&sup3;": "³",
                        "&acute": "´",
                        "&acute;": "´",
                        "&micro": "µ",
                        "&micro;": "µ",
                        "&para": "¶",
                        "&para;": "¶",
                        "&middot": "·",
                        "&middot;": "·",
                        "&cedil": "¸",
                        "&cedil;": "¸",
                        "&sup1": "¹",
                        "&sup1;": "¹",
                        "&ordm": "º",
                        "&ordm;": "º",
                        "&raquo": "»",
                        "&raquo;": "»",
                        "&frac14": "¼",
                        "&frac14;": "¼",
                        "&frac12": "½",
                        "&frac12;": "½",
                        "&frac34": "¾",
                        "&frac34;": "¾",
                        "&iquest": "¿",
                        "&iquest;": "¿",
                        "&Agrave": "À",
                        "&Agrave;": "À",
                        "&Aacute": "Á",
                        "&Aacute;": "Á",
                        "&Acirc": "Â",
                        "&Acirc;": "Â",
                        "&Atilde": "Ã",
                        "&Atilde;": "Ã",
                        "&Auml": "Ä",
                        "&Auml;": "Ä",
                        "&Aring": "Å",
                        "&Aring;": "Å",
                        "&AElig": "Æ",
                        "&AElig;": "Æ",
                        "&Ccedil": "Ç",
                        "&Ccedil;": "Ç",
                        "&Egrave": "È",
                        "&Egrave;": "È",
                        "&Eacute": "É",
                        "&Eacute;": "É",
                        "&Ecirc": "Ê",
                        "&Ecirc;": "Ê",
                        "&Euml": "Ë",
                        "&Euml;": "Ë",
                        "&Igrave": "Ì",
                        "&Igrave;": "Ì",
                        "&Iacute": "Í",
                        "&Iacute;": "Í",
                        "&Icirc": "Î",
                        "&Icirc;": "Î",
                        "&Iuml": "Ï",
                        "&Iuml;": "Ï",
                        "&ETH": "Ð",
                        "&ETH;": "Ð",
                        "&Ntilde": "Ñ",
                        "&Ntilde;": "Ñ",
                        "&Ograve": "Ò",
                        "&Ograve;": "Ò",
                        "&Oacute": "Ó",
                        "&Oacute;": "Ó",
                        "&Ocirc": "Ô",
                        "&Ocirc;": "Ô",
                        "&Otilde": "Õ",
                        "&Otilde;": "Õ",
                        "&Ouml": "Ö",
                        "&Ouml;": "Ö",
                        "&times": "×",
                        "&times;": "×",
                        "&Oslash": "Ø",
                        "&Oslash;": "Ø",
                        "&Ugrave": "Ù",
                        "&Ugrave;": "Ù",
                        "&Uacute": "Ú",
                        "&Uacute;": "Ú",
                        "&Ucirc": "Û",
                        "&Ucirc;": "Û",
                        "&Uuml": "Ü",
                        "&Uuml;": "Ü",
                        "&Yacute": "Ý",
                        "&Yacute;": "Ý",
                        "&THORN": "Þ",
                        "&THORN;": "Þ",
                        "&szlig": "ß",
                        "&szlig;": "ß",
                        "&agrave": "à",
                        "&agrave;": "à",
                        "&aacute": "á",
                        "&aacute;": "á",
                        "&acirc": "â",
                        "&acirc;": "â",
                        "&atilde": "ã",
                        "&atilde;": "ã",
                        "&auml": "ä",
                        "&auml;": "ä",
                        "&aring": "å",
                        "&aring;": "å",
                        "&aelig": "æ",
                        "&aelig;": "æ",
                        "&ccedil": "ç",
                        "&ccedil;": "ç",
                        "&egrave": "è",
                        "&egrave;": "è",
                        "&eacute": "é",
                        "&eacute;": "é",
                        "&ecirc": "ê",
                        "&ecirc;": "ê",
                        "&euml": "ë",
                        "&euml;": "ë",
                        "&igrave": "ì",
                        "&igrave;": "ì",
                        "&iacute": "í",
                        "&iacute;": "í",
                        "&icirc": "î",
                        "&icirc;": "î",
                        "&iuml": "ï",
                        "&iuml;": "ï",
                        "&eth": "ð",
                        "&eth;": "ð",
                        "&ntilde": "ñ",
                        "&ntilde;": "ñ",
                        "&ograve": "ò",
                        "&ograve;": "ò",
                        "&oacute": "ó",
                        "&oacute;": "ó",
                        "&ocirc": "ô",
                        "&ocirc;": "ô",
                        "&otilde": "õ",
                        "&otilde;": "õ",
                        "&ouml": "ö",
                        "&ouml;": "ö",
                        "&divide": "÷",
                        "&divide;": "÷",
                        "&oslash": "ø",
                        "&oslash;": "ø",
                        "&ugrave": "ù",
                        "&ugrave;": "ù",
                        "&uacute": "ú",
                        "&uacute;": "ú",
                        "&ucirc": "û",
                        "&ucirc;": "û",
                        "&uuml": "ü",
                        "&uuml;": "ü",
                        "&yacute": "ý",
                        "&yacute;": "ý",
                        "&thorn": "þ",
                        "&thorn;": "þ",
                        "&yuml": "ÿ",
                        "&yuml;": "ÿ",
                        "&quot": '"',
                        "&quot;": '"',
                        "&amp": "&",
                        "&amp;": "&",
                        "&lt": "<",
                        "&lt;": "<",
                        "&gt": ">",
                        "&gt;": ">",
                        "&OElig;": "Œ",
                        "&oelig;": "œ",
                        "&Scaron;": "Š",
                        "&scaron;": "š",
                        "&Yuml;": "Ÿ",
                        "&circ;": "ˆ",
                        "&tilde;": "˜",
                        "&ensp;": " ",
                        "&emsp;": " ",
                        "&thinsp;": " ",
                        "&zwnj;": "‌",
                        "&zwj;": "‍",
                        "&lrm;": "‎",
                        "&rlm;": "‏",
                        "&ndash;": "–",
                        "&mdash;": "—",
                        "&lsquo;": "‘",
                        "&rsquo;": "’",
                        "&sbquo;": "‚",
                        "&ldquo;": "“",
                        "&rdquo;": "”",
                        "&bdquo;": "„",
                        "&dagger;": "†",
                        "&Dagger;": "‡",
                        "&permil;": "‰",
                        "&lsaquo;": "‹",
                        "&rsaquo;": "›",
                        "&euro;": "€",
                        "&fnof;": "ƒ",
                        "&Alpha;": "Α",
                        "&Beta;": "Β",
                        "&Gamma;": "Γ",
                        "&Delta;": "Δ",
                        "&Epsilon;": "Ε",
                        "&Zeta;": "Ζ",
                        "&Eta;": "Η",
                        "&Theta;": "Θ",
                        "&Iota;": "Ι",
                        "&Kappa;": "Κ",
                        "&Lambda;": "Λ",
                        "&Mu;": "Μ",
                        "&Nu;": "Ν",
                        "&Xi;": "Ξ",
                        "&Omicron;": "Ο",
                        "&Pi;": "Π",
                        "&Rho;": "Ρ",
                        "&Sigma;": "Σ",
                        "&Tau;": "Τ",
                        "&Upsilon;": "Υ",
                        "&Phi;": "Φ",
                        "&Chi;": "Χ",
                        "&Psi;": "Ψ",
                        "&Omega;": "Ω",
                        "&alpha;": "α",
                        "&beta;": "β",
                        "&gamma;": "γ",
                        "&delta;": "δ",
                        "&epsilon;": "ε",
                        "&zeta;": "ζ",
                        "&eta;": "η",
                        "&theta;": "θ",
                        "&iota;": "ι",
                        "&kappa;": "κ",
                        "&lambda;": "λ",
                        "&mu;": "μ",
                        "&nu;": "ν",
                        "&xi;": "ξ",
                        "&omicron;": "ο",
                        "&pi;": "π",
                        "&rho;": "ρ",
                        "&sigmaf;": "ς",
                        "&sigma;": "σ",
                        "&tau;": "τ",
                        "&upsilon;": "υ",
                        "&phi;": "φ",
                        "&chi;": "χ",
                        "&psi;": "ψ",
                        "&omega;": "ω",
                        "&thetasym;": "ϑ",
                        "&upsih;": "ϒ",
                        "&piv;": "ϖ",
                        "&bull;": "•",
                        "&hellip;": "…",
                        "&prime;": "′",
                        "&Prime;": "″",
                        "&oline;": "‾",
                        "&frasl;": "⁄",
                        "&weierp;": "℘",
                        "&image;": "ℑ",
                        "&real;": "ℜ",
                        "&trade;": "™",
                        "&alefsym;": "ℵ",
                        "&larr;": "←",
                        "&uarr;": "↑",
                        "&rarr;": "→",
                        "&darr;": "↓",
                        "&harr;": "↔",
                        "&crarr;": "↵",
                        "&lArr;": "⇐",
                        "&uArr;": "⇑",
                        "&rArr;": "⇒",
                        "&dArr;": "⇓",
                        "&hArr;": "⇔",
                        "&forall;": "∀",
                        "&part;": "∂",
                        "&exist;": "∃",
                        "&empty;": "∅",
                        "&nabla;": "∇",
                        "&isin;": "∈",
                        "&notin;": "∉",
                        "&ni;": "∋",
                        "&prod;": "∏",
                        "&sum;": "∑",
                        "&minus;": "−",
                        "&lowast;": "∗",
                        "&radic;": "√",
                        "&prop;": "∝",
                        "&infin;": "∞",
                        "&ang;": "∠",
                        "&and;": "∧",
                        "&or;": "∨",
                        "&cap;": "∩",
                        "&cup;": "∪",
                        "&int;": "∫",
                        "&there4;": "∴",
                        "&sim;": "∼",
                        "&cong;": "≅",
                        "&asymp;": "≈",
                        "&ne;": "≠",
                        "&equiv;": "≡",
                        "&le;": "≤",
                        "&ge;": "≥",
                        "&sub;": "⊂",
                        "&sup;": "⊃",
                        "&nsub;": "⊄",
                        "&sube;": "⊆",
                        "&supe;": "⊇",
                        "&oplus;": "⊕",
                        "&otimes;": "⊗",
                        "&perp;": "⊥",
                        "&sdot;": "⋅",
                        "&lceil;": "⌈",
                        "&rceil;": "⌉",
                        "&lfloor;": "⌊",
                        "&rfloor;": "⌋",
                        "&lang;": "〈",
                        "&rang;": "〉",
                        "&loz;": "◊",
                        "&spades;": "♠",
                        "&clubs;": "♣",
                        "&hearts;": "♥",
                        "&diams;": "♦"
                    },
                    characters: {
                        "'": "&apos;",
                        " ": "&nbsp;",
                        "¡": "&iexcl;",
                        "¢": "&cent;",
                        "£": "&pound;",
                        "¤": "&curren;",
                        "¥": "&yen;",
                        "¦": "&brvbar;",
                        "§": "&sect;",
                        "¨": "&uml;",
                        "©": "&copy;",
                        ª: "&ordf;",
                        "«": "&laquo;",
                        "¬": "&not;",
                        "­": "&shy;",
                        "®": "&reg;",
                        "¯": "&macr;",
                        "°": "&deg;",
                        "±": "&plusmn;",
                        "²": "&sup2;",
                        "³": "&sup3;",
                        "´": "&acute;",
                        µ: "&micro;",
                        "¶": "&para;",
                        "·": "&middot;",
                        "¸": "&cedil;",
                        "¹": "&sup1;",
                        º: "&ordm;",
                        "»": "&raquo;",
                        "¼": "&frac14;",
                        "½": "&frac12;",
                        "¾": "&frac34;",
                        "¿": "&iquest;",
                        À: "&Agrave;",
                        Á: "&Aacute;",
                        Â: "&Acirc;",
                        Ã: "&Atilde;",
                        Ä: "&Auml;",
                        Å: "&Aring;",
                        Æ: "&AElig;",
                        Ç: "&Ccedil;",
                        È: "&Egrave;",
                        É: "&Eacute;",
                        Ê: "&Ecirc;",
                        Ë: "&Euml;",
                        Ì: "&Igrave;",
                        Í: "&Iacute;",
                        Î: "&Icirc;",
                        Ï: "&Iuml;",
                        Ð: "&ETH;",
                        Ñ: "&Ntilde;",
                        Ò: "&Ograve;",
                        Ó: "&Oacute;",
                        Ô: "&Ocirc;",
                        Õ: "&Otilde;",
                        Ö: "&Ouml;",
                        "×": "&times;",
                        Ø: "&Oslash;",
                        Ù: "&Ugrave;",
                        Ú: "&Uacute;",
                        Û: "&Ucirc;",
                        Ü: "&Uuml;",
                        Ý: "&Yacute;",
                        Þ: "&THORN;",
                        ß: "&szlig;",
                        à: "&agrave;",
                        á: "&aacute;",
                        â: "&acirc;",
                        ã: "&atilde;",
                        ä: "&auml;",
                        å: "&aring;",
                        æ: "&aelig;",
                        ç: "&ccedil;",
                        è: "&egrave;",
                        é: "&eacute;",
                        ê: "&ecirc;",
                        ë: "&euml;",
                        ì: "&igrave;",
                        í: "&iacute;",
                        î: "&icirc;",
                        ï: "&iuml;",
                        ð: "&eth;",
                        ñ: "&ntilde;",
                        ò: "&ograve;",
                        ó: "&oacute;",
                        ô: "&ocirc;",
                        õ: "&otilde;",
                        ö: "&ouml;",
                        "÷": "&divide;",
                        ø: "&oslash;",
                        ù: "&ugrave;",
                        ú: "&uacute;",
                        û: "&ucirc;",
                        ü: "&uuml;",
                        ý: "&yacute;",
                        þ: "&thorn;",
                        ÿ: "&yuml;",
                        '"': "&quot;",
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        Œ: "&OElig;",
                        œ: "&oelig;",
                        Š: "&Scaron;",
                        š: "&scaron;",
                        Ÿ: "&Yuml;",
                        ˆ: "&circ;",
                        "˜": "&tilde;",
                        " ": "&ensp;",
                        " ": "&emsp;",
                        " ": "&thinsp;",
                        "‌": "&zwnj;",
                        "‍": "&zwj;",
                        "‎": "&lrm;",
                        "‏": "&rlm;",
                        "–": "&ndash;",
                        "—": "&mdash;",
                        "‘": "&lsquo;",
                        "’": "&rsquo;",
                        "‚": "&sbquo;",
                        "“": "&ldquo;",
                        "”": "&rdquo;",
                        "„": "&bdquo;",
                        "†": "&dagger;",
                        "‡": "&Dagger;",
                        "‰": "&permil;",
                        "‹": "&lsaquo;",
                        "›": "&rsaquo;",
                        "€": "&euro;",
                        ƒ: "&fnof;",
                        Α: "&Alpha;",
                        Β: "&Beta;",
                        Γ: "&Gamma;",
                        Δ: "&Delta;",
                        Ε: "&Epsilon;",
                        Ζ: "&Zeta;",
                        Η: "&Eta;",
                        Θ: "&Theta;",
                        Ι: "&Iota;",
                        Κ: "&Kappa;",
                        Λ: "&Lambda;",
                        Μ: "&Mu;",
                        Ν: "&Nu;",
                        Ξ: "&Xi;",
                        Ο: "&Omicron;",
                        Π: "&Pi;",
                        Ρ: "&Rho;",
                        Σ: "&Sigma;",
                        Τ: "&Tau;",
                        Υ: "&Upsilon;",
                        Φ: "&Phi;",
                        Χ: "&Chi;",
                        Ψ: "&Psi;",
                        Ω: "&Omega;",
                        α: "&alpha;",
                        β: "&beta;",
                        γ: "&gamma;",
                        δ: "&delta;",
                        ε: "&epsilon;",
                        ζ: "&zeta;",
                        η: "&eta;",
                        θ: "&theta;",
                        ι: "&iota;",
                        κ: "&kappa;",
                        λ: "&lambda;",
                        μ: "&mu;",
                        ν: "&nu;",
                        ξ: "&xi;",
                        ο: "&omicron;",
                        π: "&pi;",
                        ρ: "&rho;",
                        ς: "&sigmaf;",
                        σ: "&sigma;",
                        τ: "&tau;",
                        υ: "&upsilon;",
                        φ: "&phi;",
                        χ: "&chi;",
                        ψ: "&psi;",
                        ω: "&omega;",
                        ϑ: "&thetasym;",
                        ϒ: "&upsih;",
                        ϖ: "&piv;",
                        "•": "&bull;",
                        "…": "&hellip;",
                        "′": "&prime;",
                        "″": "&Prime;",
                        "‾": "&oline;",
                        "⁄": "&frasl;",
                        ℘: "&weierp;",
                        ℑ: "&image;",
                        ℜ: "&real;",
                        "™": "&trade;",
                        ℵ: "&alefsym;",
                        "←": "&larr;",
                        "↑": "&uarr;",
                        "→": "&rarr;",
                        "↓": "&darr;",
                        "↔": "&harr;",
                        "↵": "&crarr;",
                        "⇐": "&lArr;",
                        "⇑": "&uArr;",
                        "⇒": "&rArr;",
                        "⇓": "&dArr;",
                        "⇔": "&hArr;",
                        "∀": "&forall;",
                        "∂": "&part;",
                        "∃": "&exist;",
                        "∅": "&empty;",
                        "∇": "&nabla;",
                        "∈": "&isin;",
                        "∉": "&notin;",
                        "∋": "&ni;",
                        "∏": "&prod;",
                        "∑": "&sum;",
                        "−": "&minus;",
                        "∗": "&lowast;",
                        "√": "&radic;",
                        "∝": "&prop;",
                        "∞": "&infin;",
                        "∠": "&ang;",
                        "∧": "&and;",
                        "∨": "&or;",
                        "∩": "&cap;",
                        "∪": "&cup;",
                        "∫": "&int;",
                        "∴": "&there4;",
                        "∼": "&sim;",
                        "≅": "&cong;",
                        "≈": "&asymp;",
                        "≠": "&ne;",
                        "≡": "&equiv;",
                        "≤": "&le;",
                        "≥": "&ge;",
                        "⊂": "&sub;",
                        "⊃": "&sup;",
                        "⊄": "&nsub;",
                        "⊆": "&sube;",
                        "⊇": "&supe;",
                        "⊕": "&oplus;",
                        "⊗": "&otimes;",
                        "⊥": "&perp;",
                        "⋅": "&sdot;",
                        "⌈": "&lceil;",
                        "⌉": "&rceil;",
                        "⌊": "&lfloor;",
                        "⌋": "&rfloor;",
                        "〈": "&lang;",
                        "〉": "&rang;",
                        "◊": "&loz;",
                        "♠": "&spades;",
                        "♣": "&clubs;",
                        "♥": "&hearts;",
                        "♦": "&diams;"
                    }
                },
                html5: {
                    entities: {
                        "&AElig": "Æ",
                        "&AElig;": "Æ",
                        "&AMP": "&",
                        "&AMP;": "&",
                        "&Aacute": "Á",
                        "&Aacute;": "Á",
                        "&Abreve;": "Ă",
                        "&Acirc": "Â",
                        "&Acirc;": "Â",
                        "&Acy;": "А",
                        "&Afr;": "𝔄",
                        "&Agrave": "À",
                        "&Agrave;": "À",
                        "&Alpha;": "Α",
                        "&Amacr;": "Ā",
                        "&And;": "⩓",
                        "&Aogon;": "Ą",
                        "&Aopf;": "𝔸",
                        "&ApplyFunction;": "⁡",
                        "&Aring": "Å",
                        "&Aring;": "Å",
                        "&Ascr;": "𝒜",
                        "&Assign;": "≔",
                        "&Atilde": "Ã",
                        "&Atilde;": "Ã",
                        "&Auml": "Ä",
                        "&Auml;": "Ä",
                        "&Backslash;": "∖",
                        "&Barv;": "⫧",
                        "&Barwed;": "⌆",
                        "&Bcy;": "Б",
                        "&Because;": "∵",
                        "&Bernoullis;": "ℬ",
                        "&Beta;": "Β",
                        "&Bfr;": "𝔅",
                        "&Bopf;": "𝔹",
                        "&Breve;": "˘",
                        "&Bscr;": "ℬ",
                        "&Bumpeq;": "≎",
                        "&CHcy;": "Ч",
                        "&COPY": "©",
                        "&COPY;": "©",
                        "&Cacute;": "Ć",
                        "&Cap;": "⋒",
                        "&CapitalDifferentialD;": "ⅅ",
                        "&Cayleys;": "ℭ",
                        "&Ccaron;": "Č",
                        "&Ccedil": "Ç",
                        "&Ccedil;": "Ç",
                        "&Ccirc;": "Ĉ",
                        "&Cconint;": "∰",
                        "&Cdot;": "Ċ",
                        "&Cedilla;": "¸",
                        "&CenterDot;": "·",
                        "&Cfr;": "ℭ",
                        "&Chi;": "Χ",
                        "&CircleDot;": "⊙",
                        "&CircleMinus;": "⊖",
                        "&CirclePlus;": "⊕",
                        "&CircleTimes;": "⊗",
                        "&ClockwiseContourIntegral;": "∲",
                        "&CloseCurlyDoubleQuote;": "”",
                        "&CloseCurlyQuote;": "’",
                        "&Colon;": "∷",
                        "&Colone;": "⩴",
                        "&Congruent;": "≡",
                        "&Conint;": "∯",
                        "&ContourIntegral;": "∮",
                        "&Copf;": "ℂ",
                        "&Coproduct;": "∐",
                        "&CounterClockwiseContourIntegral;": "∳",
                        "&Cross;": "⨯",
                        "&Cscr;": "𝒞",
                        "&Cup;": "⋓",
                        "&CupCap;": "≍",
                        "&DD;": "ⅅ",
                        "&DDotrahd;": "⤑",
                        "&DJcy;": "Ђ",
                        "&DScy;": "Ѕ",
                        "&DZcy;": "Џ",
                        "&Dagger;": "‡",
                        "&Darr;": "↡",
                        "&Dashv;": "⫤",
                        "&Dcaron;": "Ď",
                        "&Dcy;": "Д",
                        "&Del;": "∇",
                        "&Delta;": "Δ",
                        "&Dfr;": "𝔇",
                        "&DiacriticalAcute;": "´",
                        "&DiacriticalDot;": "˙",
                        "&DiacriticalDoubleAcute;": "˝",
                        "&DiacriticalGrave;": "`",
                        "&DiacriticalTilde;": "˜",
                        "&Diamond;": "⋄",
                        "&DifferentialD;": "ⅆ",
                        "&Dopf;": "𝔻",
                        "&Dot;": "¨",
                        "&DotDot;": "⃜",
                        "&DotEqual;": "≐",
                        "&DoubleContourIntegral;": "∯",
                        "&DoubleDot;": "¨",
                        "&DoubleDownArrow;": "⇓",
                        "&DoubleLeftArrow;": "⇐",
                        "&DoubleLeftRightArrow;": "⇔",
                        "&DoubleLeftTee;": "⫤",
                        "&DoubleLongLeftArrow;": "⟸",
                        "&DoubleLongLeftRightArrow;": "⟺",
                        "&DoubleLongRightArrow;": "⟹",
                        "&DoubleRightArrow;": "⇒",
                        "&DoubleRightTee;": "⊨",
                        "&DoubleUpArrow;": "⇑",
                        "&DoubleUpDownArrow;": "⇕",
                        "&DoubleVerticalBar;": "∥",
                        "&DownArrow;": "↓",
                        "&DownArrowBar;": "⤓",
                        "&DownArrowUpArrow;": "⇵",
                        "&DownBreve;": "̑",
                        "&DownLeftRightVector;": "⥐",
                        "&DownLeftTeeVector;": "⥞",
                        "&DownLeftVector;": "↽",
                        "&DownLeftVectorBar;": "⥖",
                        "&DownRightTeeVector;": "⥟",
                        "&DownRightVector;": "⇁",
                        "&DownRightVectorBar;": "⥗",
                        "&DownTee;": "⊤",
                        "&DownTeeArrow;": "↧",
                        "&Downarrow;": "⇓",
                        "&Dscr;": "𝒟",
                        "&Dstrok;": "Đ",
                        "&ENG;": "Ŋ",
                        "&ETH": "Ð",
                        "&ETH;": "Ð",
                        "&Eacute": "É",
                        "&Eacute;": "É",
                        "&Ecaron;": "Ě",
                        "&Ecirc": "Ê",
                        "&Ecirc;": "Ê",
                        "&Ecy;": "Э",
                        "&Edot;": "Ė",
                        "&Efr;": "𝔈",
                        "&Egrave": "È",
                        "&Egrave;": "È",
                        "&Element;": "∈",
                        "&Emacr;": "Ē",
                        "&EmptySmallSquare;": "◻",
                        "&EmptyVerySmallSquare;": "▫",
                        "&Eogon;": "Ę",
                        "&Eopf;": "𝔼",
                        "&Epsilon;": "Ε",
                        "&Equal;": "⩵",
                        "&EqualTilde;": "≂",
                        "&Equilibrium;": "⇌",
                        "&Escr;": "ℰ",
                        "&Esim;": "⩳",
                        "&Eta;": "Η",
                        "&Euml": "Ë",
                        "&Euml;": "Ë",
                        "&Exists;": "∃",
                        "&ExponentialE;": "ⅇ",
                        "&Fcy;": "Ф",
                        "&Ffr;": "𝔉",
                        "&FilledSmallSquare;": "◼",
                        "&FilledVerySmallSquare;": "▪",
                        "&Fopf;": "𝔽",
                        "&ForAll;": "∀",
                        "&Fouriertrf;": "ℱ",
                        "&Fscr;": "ℱ",
                        "&GJcy;": "Ѓ",
                        "&GT": ">",
                        "&GT;": ">",
                        "&Gamma;": "Γ",
                        "&Gammad;": "Ϝ",
                        "&Gbreve;": "Ğ",
                        "&Gcedil;": "Ģ",
                        "&Gcirc;": "Ĝ",
                        "&Gcy;": "Г",
                        "&Gdot;": "Ġ",
                        "&Gfr;": "𝔊",
                        "&Gg;": "⋙",
                        "&Gopf;": "𝔾",
                        "&GreaterEqual;": "≥",
                        "&GreaterEqualLess;": "⋛",
                        "&GreaterFullEqual;": "≧",
                        "&GreaterGreater;": "⪢",
                        "&GreaterLess;": "≷",
                        "&GreaterSlantEqual;": "⩾",
                        "&GreaterTilde;": "≳",
                        "&Gscr;": "𝒢",
                        "&Gt;": "≫",
                        "&HARDcy;": "Ъ",
                        "&Hacek;": "ˇ",
                        "&Hat;": "^",
                        "&Hcirc;": "Ĥ",
                        "&Hfr;": "ℌ",
                        "&HilbertSpace;": "ℋ",
                        "&Hopf;": "ℍ",
                        "&HorizontalLine;": "─",
                        "&Hscr;": "ℋ",
                        "&Hstrok;": "Ħ",
                        "&HumpDownHump;": "≎",
                        "&HumpEqual;": "≏",
                        "&IEcy;": "Е",
                        "&IJlig;": "Ĳ",
                        "&IOcy;": "Ё",
                        "&Iacute": "Í",
                        "&Iacute;": "Í",
                        "&Icirc": "Î",
                        "&Icirc;": "Î",
                        "&Icy;": "И",
                        "&Idot;": "İ",
                        "&Ifr;": "ℑ",
                        "&Igrave": "Ì",
                        "&Igrave;": "Ì",
                        "&Im;": "ℑ",
                        "&Imacr;": "Ī",
                        "&ImaginaryI;": "ⅈ",
                        "&Implies;": "⇒",
                        "&Int;": "∬",
                        "&Integral;": "∫",
                        "&Intersection;": "⋂",
                        "&InvisibleComma;": "⁣",
                        "&InvisibleTimes;": "⁢",
                        "&Iogon;": "Į",
                        "&Iopf;": "𝕀",
                        "&Iota;": "Ι",
                        "&Iscr;": "ℐ",
                        "&Itilde;": "Ĩ",
                        "&Iukcy;": "І",
                        "&Iuml": "Ï",
                        "&Iuml;": "Ï",
                        "&Jcirc;": "Ĵ",
                        "&Jcy;": "Й",
                        "&Jfr;": "𝔍",
                        "&Jopf;": "𝕁",
                        "&Jscr;": "𝒥",
                        "&Jsercy;": "Ј",
                        "&Jukcy;": "Є",
                        "&KHcy;": "Х",
                        "&KJcy;": "Ќ",
                        "&Kappa;": "Κ",
                        "&Kcedil;": "Ķ",
                        "&Kcy;": "К",
                        "&Kfr;": "𝔎",
                        "&Kopf;": "𝕂",
                        "&Kscr;": "𝒦",
                        "&LJcy;": "Љ",
                        "&LT": "<",
                        "&LT;": "<",
                        "&Lacute;": "Ĺ",
                        "&Lambda;": "Λ",
                        "&Lang;": "⟪",
                        "&Laplacetrf;": "ℒ",
                        "&Larr;": "↞",
                        "&Lcaron;": "Ľ",
                        "&Lcedil;": "Ļ",
                        "&Lcy;": "Л",
                        "&LeftAngleBracket;": "⟨",
                        "&LeftArrow;": "←",
                        "&LeftArrowBar;": "⇤",
                        "&LeftArrowRightArrow;": "⇆",
                        "&LeftCeiling;": "⌈",
                        "&LeftDoubleBracket;": "⟦",
                        "&LeftDownTeeVector;": "⥡",
                        "&LeftDownVector;": "⇃",
                        "&LeftDownVectorBar;": "⥙",
                        "&LeftFloor;": "⌊",
                        "&LeftRightArrow;": "↔",
                        "&LeftRightVector;": "⥎",
                        "&LeftTee;": "⊣",
                        "&LeftTeeArrow;": "↤",
                        "&LeftTeeVector;": "⥚",
                        "&LeftTriangle;": "⊲",
                        "&LeftTriangleBar;": "⧏",
                        "&LeftTriangleEqual;": "⊴",
                        "&LeftUpDownVector;": "⥑",
                        "&LeftUpTeeVector;": "⥠",
                        "&LeftUpVector;": "↿",
                        "&LeftUpVectorBar;": "⥘",
                        "&LeftVector;": "↼",
                        "&LeftVectorBar;": "⥒",
                        "&Leftarrow;": "⇐",
                        "&Leftrightarrow;": "⇔",
                        "&LessEqualGreater;": "⋚",
                        "&LessFullEqual;": "≦",
                        "&LessGreater;": "≶",
                        "&LessLess;": "⪡",
                        "&LessSlantEqual;": "⩽",
                        "&LessTilde;": "≲",
                        "&Lfr;": "𝔏",
                        "&Ll;": "⋘",
                        "&Lleftarrow;": "⇚",
                        "&Lmidot;": "Ŀ",
                        "&LongLeftArrow;": "⟵",
                        "&LongLeftRightArrow;": "⟷",
                        "&LongRightArrow;": "⟶",
                        "&Longleftarrow;": "⟸",
                        "&Longleftrightarrow;": "⟺",
                        "&Longrightarrow;": "⟹",
                        "&Lopf;": "𝕃",
                        "&LowerLeftArrow;": "↙",
                        "&LowerRightArrow;": "↘",
                        "&Lscr;": "ℒ",
                        "&Lsh;": "↰",
                        "&Lstrok;": "Ł",
                        "&Lt;": "≪",
                        "&Map;": "⤅",
                        "&Mcy;": "М",
                        "&MediumSpace;": " ",
                        "&Mellintrf;": "ℳ",
                        "&Mfr;": "𝔐",
                        "&MinusPlus;": "∓",
                        "&Mopf;": "𝕄",
                        "&Mscr;": "ℳ",
                        "&Mu;": "Μ",
                        "&NJcy;": "Њ",
                        "&Nacute;": "Ń",
                        "&Ncaron;": "Ň",
                        "&Ncedil;": "Ņ",
                        "&Ncy;": "Н",
                        "&NegativeMediumSpace;": "​",
                        "&NegativeThickSpace;": "​",
                        "&NegativeThinSpace;": "​",
                        "&NegativeVeryThinSpace;": "​",
                        "&NestedGreaterGreater;": "≫",
                        "&NestedLessLess;": "≪",
                        "&NewLine;": "\n",
                        "&Nfr;": "𝔑",
                        "&NoBreak;": "⁠",
                        "&NonBreakingSpace;": " ",
                        "&Nopf;": "ℕ",
                        "&Not;": "⫬",
                        "&NotCongruent;": "≢",
                        "&NotCupCap;": "≭",
                        "&NotDoubleVerticalBar;": "∦",
                        "&NotElement;": "∉",
                        "&NotEqual;": "≠",
                        "&NotEqualTilde;": "≂̸",
                        "&NotExists;": "∄",
                        "&NotGreater;": "≯",
                        "&NotGreaterEqual;": "≱",
                        "&NotGreaterFullEqual;": "≧̸",
                        "&NotGreaterGreater;": "≫̸",
                        "&NotGreaterLess;": "≹",
                        "&NotGreaterSlantEqual;": "⩾̸",
                        "&NotGreaterTilde;": "≵",
                        "&NotHumpDownHump;": "≎̸",
                        "&NotHumpEqual;": "≏̸",
                        "&NotLeftTriangle;": "⋪",
                        "&NotLeftTriangleBar;": "⧏̸",
                        "&NotLeftTriangleEqual;": "⋬",
                        "&NotLess;": "≮",
                        "&NotLessEqual;": "≰",
                        "&NotLessGreater;": "≸",
                        "&NotLessLess;": "≪̸",
                        "&NotLessSlantEqual;": "⩽̸",
                        "&NotLessTilde;": "≴",
                        "&NotNestedGreaterGreater;": "⪢̸",
                        "&NotNestedLessLess;": "⪡̸",
                        "&NotPrecedes;": "⊀",
                        "&NotPrecedesEqual;": "⪯̸",
                        "&NotPrecedesSlantEqual;": "⋠",
                        "&NotReverseElement;": "∌",
                        "&NotRightTriangle;": "⋫",
                        "&NotRightTriangleBar;": "⧐̸",
                        "&NotRightTriangleEqual;": "⋭",
                        "&NotSquareSubset;": "⊏̸",
                        "&NotSquareSubsetEqual;": "⋢",
                        "&NotSquareSuperset;": "⊐̸",
                        "&NotSquareSupersetEqual;": "⋣",
                        "&NotSubset;": "⊂⃒",
                        "&NotSubsetEqual;": "⊈",
                        "&NotSucceeds;": "⊁",
                        "&NotSucceedsEqual;": "⪰̸",
                        "&NotSucceedsSlantEqual;": "⋡",
                        "&NotSucceedsTilde;": "≿̸",
                        "&NotSuperset;": "⊃⃒",
                        "&NotSupersetEqual;": "⊉",
                        "&NotTilde;": "≁",
                        "&NotTildeEqual;": "≄",
                        "&NotTildeFullEqual;": "≇",
                        "&NotTildeTilde;": "≉",
                        "&NotVerticalBar;": "∤",
                        "&Nscr;": "𝒩",
                        "&Ntilde": "Ñ",
                        "&Ntilde;": "Ñ",
                        "&Nu;": "Ν",
                        "&OElig;": "Œ",
                        "&Oacute": "Ó",
                        "&Oacute;": "Ó",
                        "&Ocirc": "Ô",
                        "&Ocirc;": "Ô",
                        "&Ocy;": "О",
                        "&Odblac;": "Ő",
                        "&Ofr;": "𝔒",
                        "&Ograve": "Ò",
                        "&Ograve;": "Ò",
                        "&Omacr;": "Ō",
                        "&Omega;": "Ω",
                        "&Omicron;": "Ο",
                        "&Oopf;": "𝕆",
                        "&OpenCurlyDoubleQuote;": "“",
                        "&OpenCurlyQuote;": "‘",
                        "&Or;": "⩔",
                        "&Oscr;": "𝒪",
                        "&Oslash": "Ø",
                        "&Oslash;": "Ø",
                        "&Otilde": "Õ",
                        "&Otilde;": "Õ",
                        "&Otimes;": "⨷",
                        "&Ouml": "Ö",
                        "&Ouml;": "Ö",
                        "&OverBar;": "‾",
                        "&OverBrace;": "⏞",
                        "&OverBracket;": "⎴",
                        "&OverParenthesis;": "⏜",
                        "&PartialD;": "∂",
                        "&Pcy;": "П",
                        "&Pfr;": "𝔓",
                        "&Phi;": "Φ",
                        "&Pi;": "Π",
                        "&PlusMinus;": "±",
                        "&Poincareplane;": "ℌ",
                        "&Popf;": "ℙ",
                        "&Pr;": "⪻",
                        "&Precedes;": "≺",
                        "&PrecedesEqual;": "⪯",
                        "&PrecedesSlantEqual;": "≼",
                        "&PrecedesTilde;": "≾",
                        "&Prime;": "″",
                        "&Product;": "∏",
                        "&Proportion;": "∷",
                        "&Proportional;": "∝",
                        "&Pscr;": "𝒫",
                        "&Psi;": "Ψ",
                        "&QUOT": '"',
                        "&QUOT;": '"',
                        "&Qfr;": "𝔔",
                        "&Qopf;": "ℚ",
                        "&Qscr;": "𝒬",
                        "&RBarr;": "⤐",
                        "&REG": "®",
                        "&REG;": "®",
                        "&Racute;": "Ŕ",
                        "&Rang;": "⟫",
                        "&Rarr;": "↠",
                        "&Rarrtl;": "⤖",
                        "&Rcaron;": "Ř",
                        "&Rcedil;": "Ŗ",
                        "&Rcy;": "Р",
                        "&Re;": "ℜ",
                        "&ReverseElement;": "∋",
                        "&ReverseEquilibrium;": "⇋",
                        "&ReverseUpEquilibrium;": "⥯",
                        "&Rfr;": "ℜ",
                        "&Rho;": "Ρ",
                        "&RightAngleBracket;": "⟩",
                        "&RightArrow;": "→",
                        "&RightArrowBar;": "⇥",
                        "&RightArrowLeftArrow;": "⇄",
                        "&RightCeiling;": "⌉",
                        "&RightDoubleBracket;": "⟧",
                        "&RightDownTeeVector;": "⥝",
                        "&RightDownVector;": "⇂",
                        "&RightDownVectorBar;": "⥕",
                        "&RightFloor;": "⌋",
                        "&RightTee;": "⊢",
                        "&RightTeeArrow;": "↦",
                        "&RightTeeVector;": "⥛",
                        "&RightTriangle;": "⊳",
                        "&RightTriangleBar;": "⧐",
                        "&RightTriangleEqual;": "⊵",
                        "&RightUpDownVector;": "⥏",
                        "&RightUpTeeVector;": "⥜",
                        "&RightUpVector;": "↾",
                        "&RightUpVectorBar;": "⥔",
                        "&RightVector;": "⇀",
                        "&RightVectorBar;": "⥓",
                        "&Rightarrow;": "⇒",
                        "&Ropf;": "ℝ",
                        "&RoundImplies;": "⥰",
                        "&Rrightarrow;": "⇛",
                        "&Rscr;": "ℛ",
                        "&Rsh;": "↱",
                        "&RuleDelayed;": "⧴",
                        "&SHCHcy;": "Щ",
                        "&SHcy;": "Ш",
                        "&SOFTcy;": "Ь",
                        "&Sacute;": "Ś",
                        "&Sc;": "⪼",
                        "&Scaron;": "Š",
                        "&Scedil;": "Ş",
                        "&Scirc;": "Ŝ",
                        "&Scy;": "С",
                        "&Sfr;": "𝔖",
                        "&ShortDownArrow;": "↓",
                        "&ShortLeftArrow;": "←",
                        "&ShortRightArrow;": "→",
                        "&ShortUpArrow;": "↑",
                        "&Sigma;": "Σ",
                        "&SmallCircle;": "∘",
                        "&Sopf;": "𝕊",
                        "&Sqrt;": "√",
                        "&Square;": "□",
                        "&SquareIntersection;": "⊓",
                        "&SquareSubset;": "⊏",
                        "&SquareSubsetEqual;": "⊑",
                        "&SquareSuperset;": "⊐",
                        "&SquareSupersetEqual;": "⊒",
                        "&SquareUnion;": "⊔",
                        "&Sscr;": "𝒮",
                        "&Star;": "⋆",
                        "&Sub;": "⋐",
                        "&Subset;": "⋐",
                        "&SubsetEqual;": "⊆",
                        "&Succeeds;": "≻",
                        "&SucceedsEqual;": "⪰",
                        "&SucceedsSlantEqual;": "≽",
                        "&SucceedsTilde;": "≿",
                        "&SuchThat;": "∋",
                        "&Sum;": "∑",
                        "&Sup;": "⋑",
                        "&Superset;": "⊃",
                        "&SupersetEqual;": "⊇",
                        "&Supset;": "⋑",
                        "&THORN": "Þ",
                        "&THORN;": "Þ",
                        "&TRADE;": "™",
                        "&TSHcy;": "Ћ",
                        "&TScy;": "Ц",
                        "&Tab;": "\t",
                        "&Tau;": "Τ",
                        "&Tcaron;": "Ť",
                        "&Tcedil;": "Ţ",
                        "&Tcy;": "Т",
                        "&Tfr;": "𝔗",
                        "&Therefore;": "∴",
                        "&Theta;": "Θ",
                        "&ThickSpace;": "  ",
                        "&ThinSpace;": " ",
                        "&Tilde;": "∼",
                        "&TildeEqual;": "≃",
                        "&TildeFullEqual;": "≅",
                        "&TildeTilde;": "≈",
                        "&Topf;": "𝕋",
                        "&TripleDot;": "⃛",
                        "&Tscr;": "𝒯",
                        "&Tstrok;": "Ŧ",
                        "&Uacute": "Ú",
                        "&Uacute;": "Ú",
                        "&Uarr;": "↟",
                        "&Uarrocir;": "⥉",
                        "&Ubrcy;": "Ў",
                        "&Ubreve;": "Ŭ",
                        "&Ucirc": "Û",
                        "&Ucirc;": "Û",
                        "&Ucy;": "У",
                        "&Udblac;": "Ű",
                        "&Ufr;": "𝔘",
                        "&Ugrave": "Ù",
                        "&Ugrave;": "Ù",
                        "&Umacr;": "Ū",
                        "&UnderBar;": "_",
                        "&UnderBrace;": "⏟",
                        "&UnderBracket;": "⎵",
                        "&UnderParenthesis;": "⏝",
                        "&Union;": "⋃",
                        "&UnionPlus;": "⊎",
                        "&Uogon;": "Ų",
                        "&Uopf;": "𝕌",
                        "&UpArrow;": "↑",
                        "&UpArrowBar;": "⤒",
                        "&UpArrowDownArrow;": "⇅",
                        "&UpDownArrow;": "↕",
                        "&UpEquilibrium;": "⥮",
                        "&UpTee;": "⊥",
                        "&UpTeeArrow;": "↥",
                        "&Uparrow;": "⇑",
                        "&Updownarrow;": "⇕",
                        "&UpperLeftArrow;": "↖",
                        "&UpperRightArrow;": "↗",
                        "&Upsi;": "ϒ",
                        "&Upsilon;": "Υ",
                        "&Uring;": "Ů",
                        "&Uscr;": "𝒰",
                        "&Utilde;": "Ũ",
                        "&Uuml": "Ü",
                        "&Uuml;": "Ü",
                        "&VDash;": "⊫",
                        "&Vbar;": "⫫",
                        "&Vcy;": "В",
                        "&Vdash;": "⊩",
                        "&Vdashl;": "⫦",
                        "&Vee;": "⋁",
                        "&Verbar;": "‖",
                        "&Vert;": "‖",
                        "&VerticalBar;": "∣",
                        "&VerticalLine;": "|",
                        "&VerticalSeparator;": "❘",
                        "&VerticalTilde;": "≀",
                        "&VeryThinSpace;": " ",
                        "&Vfr;": "𝔙",
                        "&Vopf;": "𝕍",
                        "&Vscr;": "𝒱",
                        "&Vvdash;": "⊪",
                        "&Wcirc;": "Ŵ",
                        "&Wedge;": "⋀",
                        "&Wfr;": "𝔚",
                        "&Wopf;": "𝕎",
                        "&Wscr;": "𝒲",
                        "&Xfr;": "𝔛",
                        "&Xi;": "Ξ",
                        "&Xopf;": "𝕏",
                        "&Xscr;": "𝒳",
                        "&YAcy;": "Я",
                        "&YIcy;": "Ї",
                        "&YUcy;": "Ю",
                        "&Yacute": "Ý",
                        "&Yacute;": "Ý",
                        "&Ycirc;": "Ŷ",
                        "&Ycy;": "Ы",
                        "&Yfr;": "𝔜",
                        "&Yopf;": "𝕐",
                        "&Yscr;": "𝒴",
                        "&Yuml;": "Ÿ",
                        "&ZHcy;": "Ж",
                        "&Zacute;": "Ź",
                        "&Zcaron;": "Ž",
                        "&Zcy;": "З",
                        "&Zdot;": "Ż",
                        "&ZeroWidthSpace;": "​",
                        "&Zeta;": "Ζ",
                        "&Zfr;": "ℨ",
                        "&Zopf;": "ℤ",
                        "&Zscr;": "𝒵",
                        "&aacute": "á",
                        "&aacute;": "á",
                        "&abreve;": "ă",
                        "&ac;": "∾",
                        "&acE;": "∾̳",
                        "&acd;": "∿",
                        "&acirc": "â",
                        "&acirc;": "â",
                        "&acute": "´",
                        "&acute;": "´",
                        "&acy;": "а",
                        "&aelig": "æ",
                        "&aelig;": "æ",
                        "&af;": "⁡",
                        "&afr;": "𝔞",
                        "&agrave": "à",
                        "&agrave;": "à",
                        "&alefsym;": "ℵ",
                        "&aleph;": "ℵ",
                        "&alpha;": "α",
                        "&amacr;": "ā",
                        "&amalg;": "⨿",
                        "&amp": "&",
                        "&amp;": "&",
                        "&and;": "∧",
                        "&andand;": "⩕",
                        "&andd;": "⩜",
                        "&andslope;": "⩘",
                        "&andv;": "⩚",
                        "&ang;": "∠",
                        "&ange;": "⦤",
                        "&angle;": "∠",
                        "&angmsd;": "∡",
                        "&angmsdaa;": "⦨",
                        "&angmsdab;": "⦩",
                        "&angmsdac;": "⦪",
                        "&angmsdad;": "⦫",
                        "&angmsdae;": "⦬",
                        "&angmsdaf;": "⦭",
                        "&angmsdag;": "⦮",
                        "&angmsdah;": "⦯",
                        "&angrt;": "∟",
                        "&angrtvb;": "⊾",
                        "&angrtvbd;": "⦝",
                        "&angsph;": "∢",
                        "&angst;": "Å",
                        "&angzarr;": "⍼",
                        "&aogon;": "ą",
                        "&aopf;": "𝕒",
                        "&ap;": "≈",
                        "&apE;": "⩰",
                        "&apacir;": "⩯",
                        "&ape;": "≊",
                        "&apid;": "≋",
                        "&apos;": "'",
                        "&approx;": "≈",
                        "&approxeq;": "≊",
                        "&aring": "å",
                        "&aring;": "å",
                        "&ascr;": "𝒶",
                        "&ast;": "*",
                        "&asymp;": "≈",
                        "&asympeq;": "≍",
                        "&atilde": "ã",
                        "&atilde;": "ã",
                        "&auml": "ä",
                        "&auml;": "ä",
                        "&awconint;": "∳",
                        "&awint;": "⨑",
                        "&bNot;": "⫭",
                        "&backcong;": "≌",
                        "&backepsilon;": "϶",
                        "&backprime;": "‵",
                        "&backsim;": "∽",
                        "&backsimeq;": "⋍",
                        "&barvee;": "⊽",
                        "&barwed;": "⌅",
                        "&barwedge;": "⌅",
                        "&bbrk;": "⎵",
                        "&bbrktbrk;": "⎶",
                        "&bcong;": "≌",
                        "&bcy;": "б",
                        "&bdquo;": "„",
                        "&becaus;": "∵",
                        "&because;": "∵",
                        "&bemptyv;": "⦰",
                        "&bepsi;": "϶",
                        "&bernou;": "ℬ",
                        "&beta;": "β",
                        "&beth;": "ℶ",
                        "&between;": "≬",
                        "&bfr;": "𝔟",
                        "&bigcap;": "⋂",
                        "&bigcirc;": "◯",
                        "&bigcup;": "⋃",
                        "&bigodot;": "⨀",
                        "&bigoplus;": "⨁",
                        "&bigotimes;": "⨂",
                        "&bigsqcup;": "⨆",
                        "&bigstar;": "★",
                        "&bigtriangledown;": "▽",
                        "&bigtriangleup;": "△",
                        "&biguplus;": "⨄",
                        "&bigvee;": "⋁",
                        "&bigwedge;": "⋀",
                        "&bkarow;": "⤍",
                        "&blacklozenge;": "⧫",
                        "&blacksquare;": "▪",
                        "&blacktriangle;": "▴",
                        "&blacktriangledown;": "▾",
                        "&blacktriangleleft;": "◂",
                        "&blacktriangleright;": "▸",
                        "&blank;": "␣",
                        "&blk12;": "▒",
                        "&blk14;": "░",
                        "&blk34;": "▓",
                        "&block;": "█",
                        "&bne;": "=⃥",
                        "&bnequiv;": "≡⃥",
                        "&bnot;": "⌐",
                        "&bopf;": "𝕓",
                        "&bot;": "⊥",
                        "&bottom;": "⊥",
                        "&bowtie;": "⋈",
                        "&boxDL;": "╗",
                        "&boxDR;": "╔",
                        "&boxDl;": "╖",
                        "&boxDr;": "╓",
                        "&boxH;": "═",
                        "&boxHD;": "╦",
                        "&boxHU;": "╩",
                        "&boxHd;": "╤",
                        "&boxHu;": "╧",
                        "&boxUL;": "╝",
                        "&boxUR;": "╚",
                        "&boxUl;": "╜",
                        "&boxUr;": "╙",
                        "&boxV;": "║",
                        "&boxVH;": "╬",
                        "&boxVL;": "╣",
                        "&boxVR;": "╠",
                        "&boxVh;": "╫",
                        "&boxVl;": "╢",
                        "&boxVr;": "╟",
                        "&boxbox;": "⧉",
                        "&boxdL;": "╕",
                        "&boxdR;": "╒",
                        "&boxdl;": "┐",
                        "&boxdr;": "┌",
                        "&boxh;": "─",
                        "&boxhD;": "╥",
                        "&boxhU;": "╨",
                        "&boxhd;": "┬",
                        "&boxhu;": "┴",
                        "&boxminus;": "⊟",
                        "&boxplus;": "⊞",
                        "&boxtimes;": "⊠",
                        "&boxuL;": "╛",
                        "&boxuR;": "╘",
                        "&boxul;": "┘",
                        "&boxur;": "└",
                        "&boxv;": "│",
                        "&boxvH;": "╪",
                        "&boxvL;": "╡",
                        "&boxvR;": "╞",
                        "&boxvh;": "┼",
                        "&boxvl;": "┤",
                        "&boxvr;": "├",
                        "&bprime;": "‵",
                        "&breve;": "˘",
                        "&brvbar": "¦",
                        "&brvbar;": "¦",
                        "&bscr;": "𝒷",
                        "&bsemi;": "⁏",
                        "&bsim;": "∽",
                        "&bsime;": "⋍",
                        "&bsol;": "\\",
                        "&bsolb;": "⧅",
                        "&bsolhsub;": "⟈",
                        "&bull;": "•",
                        "&bullet;": "•",
                        "&bump;": "≎",
                        "&bumpE;": "⪮",
                        "&bumpe;": "≏",
                        "&bumpeq;": "≏",
                        "&cacute;": "ć",
                        "&cap;": "∩",
                        "&capand;": "⩄",
                        "&capbrcup;": "⩉",
                        "&capcap;": "⩋",
                        "&capcup;": "⩇",
                        "&capdot;": "⩀",
                        "&caps;": "∩︀",
                        "&caret;": "⁁",
                        "&caron;": "ˇ",
                        "&ccaps;": "⩍",
                        "&ccaron;": "č",
                        "&ccedil": "ç",
                        "&ccedil;": "ç",
                        "&ccirc;": "ĉ",
                        "&ccups;": "⩌",
                        "&ccupssm;": "⩐",
                        "&cdot;": "ċ",
                        "&cedil": "¸",
                        "&cedil;": "¸",
                        "&cemptyv;": "⦲",
                        "&cent": "¢",
                        "&cent;": "¢",
                        "&centerdot;": "·",
                        "&cfr;": "𝔠",
                        "&chcy;": "ч",
                        "&check;": "✓",
                        "&checkmark;": "✓",
                        "&chi;": "χ",
                        "&cir;": "○",
                        "&cirE;": "⧃",
                        "&circ;": "ˆ",
                        "&circeq;": "≗",
                        "&circlearrowleft;": "↺",
                        "&circlearrowright;": "↻",
                        "&circledR;": "®",
                        "&circledS;": "Ⓢ",
                        "&circledast;": "⊛",
                        "&circledcirc;": "⊚",
                        "&circleddash;": "⊝",
                        "&cire;": "≗",
                        "&cirfnint;": "⨐",
                        "&cirmid;": "⫯",
                        "&cirscir;": "⧂",
                        "&clubs;": "♣",
                        "&clubsuit;": "♣",
                        "&colon;": ":",
                        "&colone;": "≔",
                        "&coloneq;": "≔",
                        "&comma;": ",",
                        "&commat;": "@",
                        "&comp;": "∁",
                        "&compfn;": "∘",
                        "&complement;": "∁",
                        "&complexes;": "ℂ",
                        "&cong;": "≅",
                        "&congdot;": "⩭",
                        "&conint;": "∮",
                        "&copf;": "𝕔",
                        "&coprod;": "∐",
                        "&copy": "©",
                        "&copy;": "©",
                        "&copysr;": "℗",
                        "&crarr;": "↵",
                        "&cross;": "✗",
                        "&cscr;": "𝒸",
                        "&csub;": "⫏",
                        "&csube;": "⫑",
                        "&csup;": "⫐",
                        "&csupe;": "⫒",
                        "&ctdot;": "⋯",
                        "&cudarrl;": "⤸",
                        "&cudarrr;": "⤵",
                        "&cuepr;": "⋞",
                        "&cuesc;": "⋟",
                        "&cularr;": "↶",
                        "&cularrp;": "⤽",
                        "&cup;": "∪",
                        "&cupbrcap;": "⩈",
                        "&cupcap;": "⩆",
                        "&cupcup;": "⩊",
                        "&cupdot;": "⊍",
                        "&cupor;": "⩅",
                        "&cups;": "∪︀",
                        "&curarr;": "↷",
                        "&curarrm;": "⤼",
                        "&curlyeqprec;": "⋞",
                        "&curlyeqsucc;": "⋟",
                        "&curlyvee;": "⋎",
                        "&curlywedge;": "⋏",
                        "&curren": "¤",
                        "&curren;": "¤",
                        "&curvearrowleft;": "↶",
                        "&curvearrowright;": "↷",
                        "&cuvee;": "⋎",
                        "&cuwed;": "⋏",
                        "&cwconint;": "∲",
                        "&cwint;": "∱",
                        "&cylcty;": "⌭",
                        "&dArr;": "⇓",
                        "&dHar;": "⥥",
                        "&dagger;": "†",
                        "&daleth;": "ℸ",
                        "&darr;": "↓",
                        "&dash;": "‐",
                        "&dashv;": "⊣",
                        "&dbkarow;": "⤏",
                        "&dblac;": "˝",
                        "&dcaron;": "ď",
                        "&dcy;": "д",
                        "&dd;": "ⅆ",
                        "&ddagger;": "‡",
                        "&ddarr;": "⇊",
                        "&ddotseq;": "⩷",
                        "&deg": "°",
                        "&deg;": "°",
                        "&delta;": "δ",
                        "&demptyv;": "⦱",
                        "&dfisht;": "⥿",
                        "&dfr;": "𝔡",
                        "&dharl;": "⇃",
                        "&dharr;": "⇂",
                        "&diam;": "⋄",
                        "&diamond;": "⋄",
                        "&diamondsuit;": "♦",
                        "&diams;": "♦",
                        "&die;": "¨",
                        "&digamma;": "ϝ",
                        "&disin;": "⋲",
                        "&div;": "÷",
                        "&divide": "÷",
                        "&divide;": "÷",
                        "&divideontimes;": "⋇",
                        "&divonx;": "⋇",
                        "&djcy;": "ђ",
                        "&dlcorn;": "⌞",
                        "&dlcrop;": "⌍",
                        "&dollar;": "$",
                        "&dopf;": "𝕕",
                        "&dot;": "˙",
                        "&doteq;": "≐",
                        "&doteqdot;": "≑",
                        "&dotminus;": "∸",
                        "&dotplus;": "∔",
                        "&dotsquare;": "⊡",
                        "&doublebarwedge;": "⌆",
                        "&downarrow;": "↓",
                        "&downdownarrows;": "⇊",
                        "&downharpoonleft;": "⇃",
                        "&downharpoonright;": "⇂",
                        "&drbkarow;": "⤐",
                        "&drcorn;": "⌟",
                        "&drcrop;": "⌌",
                        "&dscr;": "𝒹",
                        "&dscy;": "ѕ",
                        "&dsol;": "⧶",
                        "&dstrok;": "đ",
                        "&dtdot;": "⋱",
                        "&dtri;": "▿",
                        "&dtrif;": "▾",
                        "&duarr;": "⇵",
                        "&duhar;": "⥯",
                        "&dwangle;": "⦦",
                        "&dzcy;": "џ",
                        "&dzigrarr;": "⟿",
                        "&eDDot;": "⩷",
                        "&eDot;": "≑",
                        "&eacute": "é",
                        "&eacute;": "é",
                        "&easter;": "⩮",
                        "&ecaron;": "ě",
                        "&ecir;": "≖",
                        "&ecirc": "ê",
                        "&ecirc;": "ê",
                        "&ecolon;": "≕",
                        "&ecy;": "э",
                        "&edot;": "ė",
                        "&ee;": "ⅇ",
                        "&efDot;": "≒",
                        "&efr;": "𝔢",
                        "&eg;": "⪚",
                        "&egrave": "è",
                        "&egrave;": "è",
                        "&egs;": "⪖",
                        "&egsdot;": "⪘",
                        "&el;": "⪙",
                        "&elinters;": "⏧",
                        "&ell;": "ℓ",
                        "&els;": "⪕",
                        "&elsdot;": "⪗",
                        "&emacr;": "ē",
                        "&empty;": "∅",
                        "&emptyset;": "∅",
                        "&emptyv;": "∅",
                        "&emsp13;": " ",
                        "&emsp14;": " ",
                        "&emsp;": " ",
                        "&eng;": "ŋ",
                        "&ensp;": " ",
                        "&eogon;": "ę",
                        "&eopf;": "𝕖",
                        "&epar;": "⋕",
                        "&eparsl;": "⧣",
                        "&eplus;": "⩱",
                        "&epsi;": "ε",
                        "&epsilon;": "ε",
                        "&epsiv;": "ϵ",
                        "&eqcirc;": "≖",
                        "&eqcolon;": "≕",
                        "&eqsim;": "≂",
                        "&eqslantgtr;": "⪖",
                        "&eqslantless;": "⪕",
                        "&equals;": "=",
                        "&equest;": "≟",
                        "&equiv;": "≡",
                        "&equivDD;": "⩸",
                        "&eqvparsl;": "⧥",
                        "&erDot;": "≓",
                        "&erarr;": "⥱",
                        "&escr;": "ℯ",
                        "&esdot;": "≐",
                        "&esim;": "≂",
                        "&eta;": "η",
                        "&eth": "ð",
                        "&eth;": "ð",
                        "&euml": "ë",
                        "&euml;": "ë",
                        "&euro;": "€",
                        "&excl;": "!",
                        "&exist;": "∃",
                        "&expectation;": "ℰ",
                        "&exponentiale;": "ⅇ",
                        "&fallingdotseq;": "≒",
                        "&fcy;": "ф",
                        "&female;": "♀",
                        "&ffilig;": "ﬃ",
                        "&fflig;": "ﬀ",
                        "&ffllig;": "ﬄ",
                        "&ffr;": "𝔣",
                        "&filig;": "ﬁ",
                        "&fjlig;": "fj",
                        "&flat;": "♭",
                        "&fllig;": "ﬂ",
                        "&fltns;": "▱",
                        "&fnof;": "ƒ",
                        "&fopf;": "𝕗",
                        "&forall;": "∀",
                        "&fork;": "⋔",
                        "&forkv;": "⫙",
                        "&fpartint;": "⨍",
                        "&frac12": "½",
                        "&frac12;": "½",
                        "&frac13;": "⅓",
                        "&frac14": "¼",
                        "&frac14;": "¼",
                        "&frac15;": "⅕",
                        "&frac16;": "⅙",
                        "&frac18;": "⅛",
                        "&frac23;": "⅔",
                        "&frac25;": "⅖",
                        "&frac34": "¾",
                        "&frac34;": "¾",
                        "&frac35;": "⅗",
                        "&frac38;": "⅜",
                        "&frac45;": "⅘",
                        "&frac56;": "⅚",
                        "&frac58;": "⅝",
                        "&frac78;": "⅞",
                        "&frasl;": "⁄",
                        "&frown;": "⌢",
                        "&fscr;": "𝒻",
                        "&gE;": "≧",
                        "&gEl;": "⪌",
                        "&gacute;": "ǵ",
                        "&gamma;": "γ",
                        "&gammad;": "ϝ",
                        "&gap;": "⪆",
                        "&gbreve;": "ğ",
                        "&gcirc;": "ĝ",
                        "&gcy;": "г",
                        "&gdot;": "ġ",
                        "&ge;": "≥",
                        "&gel;": "⋛",
                        "&geq;": "≥",
                        "&geqq;": "≧",
                        "&geqslant;": "⩾",
                        "&ges;": "⩾",
                        "&gescc;": "⪩",
                        "&gesdot;": "⪀",
                        "&gesdoto;": "⪂",
                        "&gesdotol;": "⪄",
                        "&gesl;": "⋛︀",
                        "&gesles;": "⪔",
                        "&gfr;": "𝔤",
                        "&gg;": "≫",
                        "&ggg;": "⋙",
                        "&gimel;": "ℷ",
                        "&gjcy;": "ѓ",
                        "&gl;": "≷",
                        "&glE;": "⪒",
                        "&gla;": "⪥",
                        "&glj;": "⪤",
                        "&gnE;": "≩",
                        "&gnap;": "⪊",
                        "&gnapprox;": "⪊",
                        "&gne;": "⪈",
                        "&gneq;": "⪈",
                        "&gneqq;": "≩",
                        "&gnsim;": "⋧",
                        "&gopf;": "𝕘",
                        "&grave;": "`",
                        "&gscr;": "ℊ",
                        "&gsim;": "≳",
                        "&gsime;": "⪎",
                        "&gsiml;": "⪐",
                        "&gt": ">",
                        "&gt;": ">",
                        "&gtcc;": "⪧",
                        "&gtcir;": "⩺",
                        "&gtdot;": "⋗",
                        "&gtlPar;": "⦕",
                        "&gtquest;": "⩼",
                        "&gtrapprox;": "⪆",
                        "&gtrarr;": "⥸",
                        "&gtrdot;": "⋗",
                        "&gtreqless;": "⋛",
                        "&gtreqqless;": "⪌",
                        "&gtrless;": "≷",
                        "&gtrsim;": "≳",
                        "&gvertneqq;": "≩︀",
                        "&gvnE;": "≩︀",
                        "&hArr;": "⇔",
                        "&hairsp;": " ",
                        "&half;": "½",
                        "&hamilt;": "ℋ",
                        "&hardcy;": "ъ",
                        "&harr;": "↔",
                        "&harrcir;": "⥈",
                        "&harrw;": "↭",
                        "&hbar;": "ℏ",
                        "&hcirc;": "ĥ",
                        "&hearts;": "♥",
                        "&heartsuit;": "♥",
                        "&hellip;": "…",
                        "&hercon;": "⊹",
                        "&hfr;": "𝔥",
                        "&hksearow;": "⤥",
                        "&hkswarow;": "⤦",
                        "&hoarr;": "⇿",
                        "&homtht;": "∻",
                        "&hookleftarrow;": "↩",
                        "&hookrightarrow;": "↪",
                        "&hopf;": "𝕙",
                        "&horbar;": "―",
                        "&hscr;": "𝒽",
                        "&hslash;": "ℏ",
                        "&hstrok;": "ħ",
                        "&hybull;": "⁃",
                        "&hyphen;": "‐",
                        "&iacute": "í",
                        "&iacute;": "í",
                        "&ic;": "⁣",
                        "&icirc": "î",
                        "&icirc;": "î",
                        "&icy;": "и",
                        "&iecy;": "е",
                        "&iexcl": "¡",
                        "&iexcl;": "¡",
                        "&iff;": "⇔",
                        "&ifr;": "𝔦",
                        "&igrave": "ì",
                        "&igrave;": "ì",
                        "&ii;": "ⅈ",
                        "&iiiint;": "⨌",
                        "&iiint;": "∭",
                        "&iinfin;": "⧜",
                        "&iiota;": "℩",
                        "&ijlig;": "ĳ",
                        "&imacr;": "ī",
                        "&image;": "ℑ",
                        "&imagline;": "ℐ",
                        "&imagpart;": "ℑ",
                        "&imath;": "ı",
                        "&imof;": "⊷",
                        "&imped;": "Ƶ",
                        "&in;": "∈",
                        "&incare;": "℅",
                        "&infin;": "∞",
                        "&infintie;": "⧝",
                        "&inodot;": "ı",
                        "&int;": "∫",
                        "&intcal;": "⊺",
                        "&integers;": "ℤ",
                        "&intercal;": "⊺",
                        "&intlarhk;": "⨗",
                        "&intprod;": "⨼",
                        "&iocy;": "ё",
                        "&iogon;": "į",
                        "&iopf;": "𝕚",
                        "&iota;": "ι",
                        "&iprod;": "⨼",
                        "&iquest": "¿",
                        "&iquest;": "¿",
                        "&iscr;": "𝒾",
                        "&isin;": "∈",
                        "&isinE;": "⋹",
                        "&isindot;": "⋵",
                        "&isins;": "⋴",
                        "&isinsv;": "⋳",
                        "&isinv;": "∈",
                        "&it;": "⁢",
                        "&itilde;": "ĩ",
                        "&iukcy;": "і",
                        "&iuml": "ï",
                        "&iuml;": "ï",
                        "&jcirc;": "ĵ",
                        "&jcy;": "й",
                        "&jfr;": "𝔧",
                        "&jmath;": "ȷ",
                        "&jopf;": "𝕛",
                        "&jscr;": "𝒿",
                        "&jsercy;": "ј",
                        "&jukcy;": "є",
                        "&kappa;": "κ",
                        "&kappav;": "ϰ",
                        "&kcedil;": "ķ",
                        "&kcy;": "к",
                        "&kfr;": "𝔨",
                        "&kgreen;": "ĸ",
                        "&khcy;": "х",
                        "&kjcy;": "ќ",
                        "&kopf;": "𝕜",
                        "&kscr;": "𝓀",
                        "&lAarr;": "⇚",
                        "&lArr;": "⇐",
                        "&lAtail;": "⤛",
                        "&lBarr;": "⤎",
                        "&lE;": "≦",
                        "&lEg;": "⪋",
                        "&lHar;": "⥢",
                        "&lacute;": "ĺ",
                        "&laemptyv;": "⦴",
                        "&lagran;": "ℒ",
                        "&lambda;": "λ",
                        "&lang;": "⟨",
                        "&langd;": "⦑",
                        "&langle;": "⟨",
                        "&lap;": "⪅",
                        "&laquo": "«",
                        "&laquo;": "«",
                        "&larr;": "←",
                        "&larrb;": "⇤",
                        "&larrbfs;": "⤟",
                        "&larrfs;": "⤝",
                        "&larrhk;": "↩",
                        "&larrlp;": "↫",
                        "&larrpl;": "⤹",
                        "&larrsim;": "⥳",
                        "&larrtl;": "↢",
                        "&lat;": "⪫",
                        "&latail;": "⤙",
                        "&late;": "⪭",
                        "&lates;": "⪭︀",
                        "&lbarr;": "⤌",
                        "&lbbrk;": "❲",
                        "&lbrace;": "{",
                        "&lbrack;": "[",
                        "&lbrke;": "⦋",
                        "&lbrksld;": "⦏",
                        "&lbrkslu;": "⦍",
                        "&lcaron;": "ľ",
                        "&lcedil;": "ļ",
                        "&lceil;": "⌈",
                        "&lcub;": "{",
                        "&lcy;": "л",
                        "&ldca;": "⤶",
                        "&ldquo;": "“",
                        "&ldquor;": "„",
                        "&ldrdhar;": "⥧",
                        "&ldrushar;": "⥋",
                        "&ldsh;": "↲",
                        "&le;": "≤",
                        "&leftarrow;": "←",
                        "&leftarrowtail;": "↢",
                        "&leftharpoondown;": "↽",
                        "&leftharpoonup;": "↼",
                        "&leftleftarrows;": "⇇",
                        "&leftrightarrow;": "↔",
                        "&leftrightarrows;": "⇆",
                        "&leftrightharpoons;": "⇋",
                        "&leftrightsquigarrow;": "↭",
                        "&leftthreetimes;": "⋋",
                        "&leg;": "⋚",
                        "&leq;": "≤",
                        "&leqq;": "≦",
                        "&leqslant;": "⩽",
                        "&les;": "⩽",
                        "&lescc;": "⪨",
                        "&lesdot;": "⩿",
                        "&lesdoto;": "⪁",
                        "&lesdotor;": "⪃",
                        "&lesg;": "⋚︀",
                        "&lesges;": "⪓",
                        "&lessapprox;": "⪅",
                        "&lessdot;": "⋖",
                        "&lesseqgtr;": "⋚",
                        "&lesseqqgtr;": "⪋",
                        "&lessgtr;": "≶",
                        "&lesssim;": "≲",
                        "&lfisht;": "⥼",
                        "&lfloor;": "⌊",
                        "&lfr;": "𝔩",
                        "&lg;": "≶",
                        "&lgE;": "⪑",
                        "&lhard;": "↽",
                        "&lharu;": "↼",
                        "&lharul;": "⥪",
                        "&lhblk;": "▄",
                        "&ljcy;": "љ",
                        "&ll;": "≪",
                        "&llarr;": "⇇",
                        "&llcorner;": "⌞",
                        "&llhard;": "⥫",
                        "&lltri;": "◺",
                        "&lmidot;": "ŀ",
                        "&lmoust;": "⎰",
                        "&lmoustache;": "⎰",
                        "&lnE;": "≨",
                        "&lnap;": "⪉",
                        "&lnapprox;": "⪉",
                        "&lne;": "⪇",
                        "&lneq;": "⪇",
                        "&lneqq;": "≨",
                        "&lnsim;": "⋦",
                        "&loang;": "⟬",
                        "&loarr;": "⇽",
                        "&lobrk;": "⟦",
                        "&longleftarrow;": "⟵",
                        "&longleftrightarrow;": "⟷",
                        "&longmapsto;": "⟼",
                        "&longrightarrow;": "⟶",
                        "&looparrowleft;": "↫",
                        "&looparrowright;": "↬",
                        "&lopar;": "⦅",
                        "&lopf;": "𝕝",
                        "&loplus;": "⨭",
                        "&lotimes;": "⨴",
                        "&lowast;": "∗",
                        "&lowbar;": "_",
                        "&loz;": "◊",
                        "&lozenge;": "◊",
                        "&lozf;": "⧫",
                        "&lpar;": "(",
                        "&lparlt;": "⦓",
                        "&lrarr;": "⇆",
                        "&lrcorner;": "⌟",
                        "&lrhar;": "⇋",
                        "&lrhard;": "⥭",
                        "&lrm;": "‎",
                        "&lrtri;": "⊿",
                        "&lsaquo;": "‹",
                        "&lscr;": "𝓁",
                        "&lsh;": "↰",
                        "&lsim;": "≲",
                        "&lsime;": "⪍",
                        "&lsimg;": "⪏",
                        "&lsqb;": "[",
                        "&lsquo;": "‘",
                        "&lsquor;": "‚",
                        "&lstrok;": "ł",
                        "&lt": "<",
                        "&lt;": "<",
                        "&ltcc;": "⪦",
                        "&ltcir;": "⩹",
                        "&ltdot;": "⋖",
                        "&lthree;": "⋋",
                        "&ltimes;": "⋉",
                        "&ltlarr;": "⥶",
                        "&ltquest;": "⩻",
                        "&ltrPar;": "⦖",
                        "&ltri;": "◃",
                        "&ltrie;": "⊴",
                        "&ltrif;": "◂",
                        "&lurdshar;": "⥊",
                        "&luruhar;": "⥦",
                        "&lvertneqq;": "≨︀",
                        "&lvnE;": "≨︀",
                        "&mDDot;": "∺",
                        "&macr": "¯",
                        "&macr;": "¯",
                        "&male;": "♂",
                        "&malt;": "✠",
                        "&maltese;": "✠",
                        "&map;": "↦",
                        "&mapsto;": "↦",
                        "&mapstodown;": "↧",
                        "&mapstoleft;": "↤",
                        "&mapstoup;": "↥",
                        "&marker;": "▮",
                        "&mcomma;": "⨩",
                        "&mcy;": "м",
                        "&mdash;": "—",
                        "&measuredangle;": "∡",
                        "&mfr;": "𝔪",
                        "&mho;": "℧",
                        "&micro": "µ",
                        "&micro;": "µ",
                        "&mid;": "∣",
                        "&midast;": "*",
                        "&midcir;": "⫰",
                        "&middot": "·",
                        "&middot;": "·",
                        "&minus;": "−",
                        "&minusb;": "⊟",
                        "&minusd;": "∸",
                        "&minusdu;": "⨪",
                        "&mlcp;": "⫛",
                        "&mldr;": "…",
                        "&mnplus;": "∓",
                        "&models;": "⊧",
                        "&mopf;": "𝕞",
                        "&mp;": "∓",
                        "&mscr;": "𝓂",
                        "&mstpos;": "∾",
                        "&mu;": "μ",
                        "&multimap;": "⊸",
                        "&mumap;": "⊸",
                        "&nGg;": "⋙̸",
                        "&nGt;": "≫⃒",
                        "&nGtv;": "≫̸",
                        "&nLeftarrow;": "⇍",
                        "&nLeftrightarrow;": "⇎",
                        "&nLl;": "⋘̸",
                        "&nLt;": "≪⃒",
                        "&nLtv;": "≪̸",
                        "&nRightarrow;": "⇏",
                        "&nVDash;": "⊯",
                        "&nVdash;": "⊮",
                        "&nabla;": "∇",
                        "&nacute;": "ń",
                        "&nang;": "∠⃒",
                        "&nap;": "≉",
                        "&napE;": "⩰̸",
                        "&napid;": "≋̸",
                        "&napos;": "ŉ",
                        "&napprox;": "≉",
                        "&natur;": "♮",
                        "&natural;": "♮",
                        "&naturals;": "ℕ",
                        "&nbsp": " ",
                        "&nbsp;": " ",
                        "&nbump;": "≎̸",
                        "&nbumpe;": "≏̸",
                        "&ncap;": "⩃",
                        "&ncaron;": "ň",
                        "&ncedil;": "ņ",
                        "&ncong;": "≇",
                        "&ncongdot;": "⩭̸",
                        "&ncup;": "⩂",
                        "&ncy;": "н",
                        "&ndash;": "–",
                        "&ne;": "≠",
                        "&neArr;": "⇗",
                        "&nearhk;": "⤤",
                        "&nearr;": "↗",
                        "&nearrow;": "↗",
                        "&nedot;": "≐̸",
                        "&nequiv;": "≢",
                        "&nesear;": "⤨",
                        "&nesim;": "≂̸",
                        "&nexist;": "∄",
                        "&nexists;": "∄",
                        "&nfr;": "𝔫",
                        "&ngE;": "≧̸",
                        "&nge;": "≱",
                        "&ngeq;": "≱",
                        "&ngeqq;": "≧̸",
                        "&ngeqslant;": "⩾̸",
                        "&nges;": "⩾̸",
                        "&ngsim;": "≵",
                        "&ngt;": "≯",
                        "&ngtr;": "≯",
                        "&nhArr;": "⇎",
                        "&nharr;": "↮",
                        "&nhpar;": "⫲",
                        "&ni;": "∋",
                        "&nis;": "⋼",
                        "&nisd;": "⋺",
                        "&niv;": "∋",
                        "&njcy;": "њ",
                        "&nlArr;": "⇍",
                        "&nlE;": "≦̸",
                        "&nlarr;": "↚",
                        "&nldr;": "‥",
                        "&nle;": "≰",
                        "&nleftarrow;": "↚",
                        "&nleftrightarrow;": "↮",
                        "&nleq;": "≰",
                        "&nleqq;": "≦̸",
                        "&nleqslant;": "⩽̸",
                        "&nles;": "⩽̸",
                        "&nless;": "≮",
                        "&nlsim;": "≴",
                        "&nlt;": "≮",
                        "&nltri;": "⋪",
                        "&nltrie;": "⋬",
                        "&nmid;": "∤",
                        "&nopf;": "𝕟",
                        "&not": "¬",
                        "&not;": "¬",
                        "&notin;": "∉",
                        "&notinE;": "⋹̸",
                        "&notindot;": "⋵̸",
                        "&notinva;": "∉",
                        "&notinvb;": "⋷",
                        "&notinvc;": "⋶",
                        "&notni;": "∌",
                        "&notniva;": "∌",
                        "&notnivb;": "⋾",
                        "&notnivc;": "⋽",
                        "&npar;": "∦",
                        "&nparallel;": "∦",
                        "&nparsl;": "⫽⃥",
                        "&npart;": "∂̸",
                        "&npolint;": "⨔",
                        "&npr;": "⊀",
                        "&nprcue;": "⋠",
                        "&npre;": "⪯̸",
                        "&nprec;": "⊀",
                        "&npreceq;": "⪯̸",
                        "&nrArr;": "⇏",
                        "&nrarr;": "↛",
                        "&nrarrc;": "⤳̸",
                        "&nrarrw;": "↝̸",
                        "&nrightarrow;": "↛",
                        "&nrtri;": "⋫",
                        "&nrtrie;": "⋭",
                        "&nsc;": "⊁",
                        "&nsccue;": "⋡",
                        "&nsce;": "⪰̸",
                        "&nscr;": "𝓃",
                        "&nshortmid;": "∤",
                        "&nshortparallel;": "∦",
                        "&nsim;": "≁",
                        "&nsime;": "≄",
                        "&nsimeq;": "≄",
                        "&nsmid;": "∤",
                        "&nspar;": "∦",
                        "&nsqsube;": "⋢",
                        "&nsqsupe;": "⋣",
                        "&nsub;": "⊄",
                        "&nsubE;": "⫅̸",
                        "&nsube;": "⊈",
                        "&nsubset;": "⊂⃒",
                        "&nsubseteq;": "⊈",
                        "&nsubseteqq;": "⫅̸",
                        "&nsucc;": "⊁",
                        "&nsucceq;": "⪰̸",
                        "&nsup;": "⊅",
                        "&nsupE;": "⫆̸",
                        "&nsupe;": "⊉",
                        "&nsupset;": "⊃⃒",
                        "&nsupseteq;": "⊉",
                        "&nsupseteqq;": "⫆̸",
                        "&ntgl;": "≹",
                        "&ntilde": "ñ",
                        "&ntilde;": "ñ",
                        "&ntlg;": "≸",
                        "&ntriangleleft;": "⋪",
                        "&ntrianglelefteq;": "⋬",
                        "&ntriangleright;": "⋫",
                        "&ntrianglerighteq;": "⋭",
                        "&nu;": "ν",
                        "&num;": "#",
                        "&numero;": "№",
                        "&numsp;": " ",
                        "&nvDash;": "⊭",
                        "&nvHarr;": "⤄",
                        "&nvap;": "≍⃒",
                        "&nvdash;": "⊬",
                        "&nvge;": "≥⃒",
                        "&nvgt;": ">⃒",
                        "&nvinfin;": "⧞",
                        "&nvlArr;": "⤂",
                        "&nvle;": "≤⃒",
                        "&nvlt;": "<⃒",
                        "&nvltrie;": "⊴⃒",
                        "&nvrArr;": "⤃",
                        "&nvrtrie;": "⊵⃒",
                        "&nvsim;": "∼⃒",
                        "&nwArr;": "⇖",
                        "&nwarhk;": "⤣",
                        "&nwarr;": "↖",
                        "&nwarrow;": "↖",
                        "&nwnear;": "⤧",
                        "&oS;": "Ⓢ",
                        "&oacute": "ó",
                        "&oacute;": "ó",
                        "&oast;": "⊛",
                        "&ocir;": "⊚",
                        "&ocirc": "ô",
                        "&ocirc;": "ô",
                        "&ocy;": "о",
                        "&odash;": "⊝",
                        "&odblac;": "ő",
                        "&odiv;": "⨸",
                        "&odot;": "⊙",
                        "&odsold;": "⦼",
                        "&oelig;": "œ",
                        "&ofcir;": "⦿",
                        "&ofr;": "𝔬",
                        "&ogon;": "˛",
                        "&ograve": "ò",
                        "&ograve;": "ò",
                        "&ogt;": "⧁",
                        "&ohbar;": "⦵",
                        "&ohm;": "Ω",
                        "&oint;": "∮",
                        "&olarr;": "↺",
                        "&olcir;": "⦾",
                        "&olcross;": "⦻",
                        "&oline;": "‾",
                        "&olt;": "⧀",
                        "&omacr;": "ō",
                        "&omega;": "ω",
                        "&omicron;": "ο",
                        "&omid;": "⦶",
                        "&ominus;": "⊖",
                        "&oopf;": "𝕠",
                        "&opar;": "⦷",
                        "&operp;": "⦹",
                        "&oplus;": "⊕",
                        "&or;": "∨",
                        "&orarr;": "↻",
                        "&ord;": "⩝",
                        "&order;": "ℴ",
                        "&orderof;": "ℴ",
                        "&ordf": "ª",
                        "&ordf;": "ª",
                        "&ordm": "º",
                        "&ordm;": "º",
                        "&origof;": "⊶",
                        "&oror;": "⩖",
                        "&orslope;": "⩗",
                        "&orv;": "⩛",
                        "&oscr;": "ℴ",
                        "&oslash": "ø",
                        "&oslash;": "ø",
                        "&osol;": "⊘",
                        "&otilde": "õ",
                        "&otilde;": "õ",
                        "&otimes;": "⊗",
                        "&otimesas;": "⨶",
                        "&ouml": "ö",
                        "&ouml;": "ö",
                        "&ovbar;": "⌽",
                        "&par;": "∥",
                        "&para": "¶",
                        "&para;": "¶",
                        "&parallel;": "∥",
                        "&parsim;": "⫳",
                        "&parsl;": "⫽",
                        "&part;": "∂",
                        "&pcy;": "п",
                        "&percnt;": "%",
                        "&period;": ".",
                        "&permil;": "‰",
                        "&perp;": "⊥",
                        "&pertenk;": "‱",
                        "&pfr;": "𝔭",
                        "&phi;": "φ",
                        "&phiv;": "ϕ",
                        "&phmmat;": "ℳ",
                        "&phone;": "☎",
                        "&pi;": "π",
                        "&pitchfork;": "⋔",
                        "&piv;": "ϖ",
                        "&planck;": "ℏ",
                        "&planckh;": "ℎ",
                        "&plankv;": "ℏ",
                        "&plus;": "+",
                        "&plusacir;": "⨣",
                        "&plusb;": "⊞",
                        "&pluscir;": "⨢",
                        "&plusdo;": "∔",
                        "&plusdu;": "⨥",
                        "&pluse;": "⩲",
                        "&plusmn": "±",
                        "&plusmn;": "±",
                        "&plussim;": "⨦",
                        "&plustwo;": "⨧",
                        "&pm;": "±",
                        "&pointint;": "⨕",
                        "&popf;": "𝕡",
                        "&pound": "£",
                        "&pound;": "£",
                        "&pr;": "≺",
                        "&prE;": "⪳",
                        "&prap;": "⪷",
                        "&prcue;": "≼",
                        "&pre;": "⪯",
                        "&prec;": "≺",
                        "&precapprox;": "⪷",
                        "&preccurlyeq;": "≼",
                        "&preceq;": "⪯",
                        "&precnapprox;": "⪹",
                        "&precneqq;": "⪵",
                        "&precnsim;": "⋨",
                        "&precsim;": "≾",
                        "&prime;": "′",
                        "&primes;": "ℙ",
                        "&prnE;": "⪵",
                        "&prnap;": "⪹",
                        "&prnsim;": "⋨",
                        "&prod;": "∏",
                        "&profalar;": "⌮",
                        "&profline;": "⌒",
                        "&profsurf;": "⌓",
                        "&prop;": "∝",
                        "&propto;": "∝",
                        "&prsim;": "≾",
                        "&prurel;": "⊰",
                        "&pscr;": "𝓅",
                        "&psi;": "ψ",
                        "&puncsp;": " ",
                        "&qfr;": "𝔮",
                        "&qint;": "⨌",
                        "&qopf;": "𝕢",
                        "&qprime;": "⁗",
                        "&qscr;": "𝓆",
                        "&quaternions;": "ℍ",
                        "&quatint;": "⨖",
                        "&quest;": "?",
                        "&questeq;": "≟",
                        "&quot": '"',
                        "&quot;": '"',
                        "&rAarr;": "⇛",
                        "&rArr;": "⇒",
                        "&rAtail;": "⤜",
                        "&rBarr;": "⤏",
                        "&rHar;": "⥤",
                        "&race;": "∽̱",
                        "&racute;": "ŕ",
                        "&radic;": "√",
                        "&raemptyv;": "⦳",
                        "&rang;": "⟩",
                        "&rangd;": "⦒",
                        "&range;": "⦥",
                        "&rangle;": "⟩",
                        "&raquo": "»",
                        "&raquo;": "»",
                        "&rarr;": "→",
                        "&rarrap;": "⥵",
                        "&rarrb;": "⇥",
                        "&rarrbfs;": "⤠",
                        "&rarrc;": "⤳",
                        "&rarrfs;": "⤞",
                        "&rarrhk;": "↪",
                        "&rarrlp;": "↬",
                        "&rarrpl;": "⥅",
                        "&rarrsim;": "⥴",
                        "&rarrtl;": "↣",
                        "&rarrw;": "↝",
                        "&ratail;": "⤚",
                        "&ratio;": "∶",
                        "&rationals;": "ℚ",
                        "&rbarr;": "⤍",
                        "&rbbrk;": "❳",
                        "&rbrace;": "}",
                        "&rbrack;": "]",
                        "&rbrke;": "⦌",
                        "&rbrksld;": "⦎",
                        "&rbrkslu;": "⦐",
                        "&rcaron;": "ř",
                        "&rcedil;": "ŗ",
                        "&rceil;": "⌉",
                        "&rcub;": "}",
                        "&rcy;": "р",
                        "&rdca;": "⤷",
                        "&rdldhar;": "⥩",
                        "&rdquo;": "”",
                        "&rdquor;": "”",
                        "&rdsh;": "↳",
                        "&real;": "ℜ",
                        "&realine;": "ℛ",
                        "&realpart;": "ℜ",
                        "&reals;": "ℝ",
                        "&rect;": "▭",
                        "&reg": "®",
                        "&reg;": "®",
                        "&rfisht;": "⥽",
                        "&rfloor;": "⌋",
                        "&rfr;": "𝔯",
                        "&rhard;": "⇁",
                        "&rharu;": "⇀",
                        "&rharul;": "⥬",
                        "&rho;": "ρ",
                        "&rhov;": "ϱ",
                        "&rightarrow;": "→",
                        "&rightarrowtail;": "↣",
                        "&rightharpoondown;": "⇁",
                        "&rightharpoonup;": "⇀",
                        "&rightleftarrows;": "⇄",
                        "&rightleftharpoons;": "⇌",
                        "&rightrightarrows;": "⇉",
                        "&rightsquigarrow;": "↝",
                        "&rightthreetimes;": "⋌",
                        "&ring;": "˚",
                        "&risingdotseq;": "≓",
                        "&rlarr;": "⇄",
                        "&rlhar;": "⇌",
                        "&rlm;": "‏",
                        "&rmoust;": "⎱",
                        "&rmoustache;": "⎱",
                        "&rnmid;": "⫮",
                        "&roang;": "⟭",
                        "&roarr;": "⇾",
                        "&robrk;": "⟧",
                        "&ropar;": "⦆",
                        "&ropf;": "𝕣",
                        "&roplus;": "⨮",
                        "&rotimes;": "⨵",
                        "&rpar;": ")",
                        "&rpargt;": "⦔",
                        "&rppolint;": "⨒",
                        "&rrarr;": "⇉",
                        "&rsaquo;": "›",
                        "&rscr;": "𝓇",
                        "&rsh;": "↱",
                        "&rsqb;": "]",
                        "&rsquo;": "’",
                        "&rsquor;": "’",
                        "&rthree;": "⋌",
                        "&rtimes;": "⋊",
                        "&rtri;": "▹",
                        "&rtrie;": "⊵",
                        "&rtrif;": "▸",
                        "&rtriltri;": "⧎",
                        "&ruluhar;": "⥨",
                        "&rx;": "℞",
                        "&sacute;": "ś",
                        "&sbquo;": "‚",
                        "&sc;": "≻",
                        "&scE;": "⪴",
                        "&scap;": "⪸",
                        "&scaron;": "š",
                        "&sccue;": "≽",
                        "&sce;": "⪰",
                        "&scedil;": "ş",
                        "&scirc;": "ŝ",
                        "&scnE;": "⪶",
                        "&scnap;": "⪺",
                        "&scnsim;": "⋩",
                        "&scpolint;": "⨓",
                        "&scsim;": "≿",
                        "&scy;": "с",
                        "&sdot;": "⋅",
                        "&sdotb;": "⊡",
                        "&sdote;": "⩦",
                        "&seArr;": "⇘",
                        "&searhk;": "⤥",
                        "&searr;": "↘",
                        "&searrow;": "↘",
                        "&sect": "§",
                        "&sect;": "§",
                        "&semi;": ";",
                        "&seswar;": "⤩",
                        "&setminus;": "∖",
                        "&setmn;": "∖",
                        "&sext;": "✶",
                        "&sfr;": "𝔰",
                        "&sfrown;": "⌢",
                        "&sharp;": "♯",
                        "&shchcy;": "щ",
                        "&shcy;": "ш",
                        "&shortmid;": "∣",
                        "&shortparallel;": "∥",
                        "&shy": "­",
                        "&shy;": "­",
                        "&sigma;": "σ",
                        "&sigmaf;": "ς",
                        "&sigmav;": "ς",
                        "&sim;": "∼",
                        "&simdot;": "⩪",
                        "&sime;": "≃",
                        "&simeq;": "≃",
                        "&simg;": "⪞",
                        "&simgE;": "⪠",
                        "&siml;": "⪝",
                        "&simlE;": "⪟",
                        "&simne;": "≆",
                        "&simplus;": "⨤",
                        "&simrarr;": "⥲",
                        "&slarr;": "←",
                        "&smallsetminus;": "∖",
                        "&smashp;": "⨳",
                        "&smeparsl;": "⧤",
                        "&smid;": "∣",
                        "&smile;": "⌣",
                        "&smt;": "⪪",
                        "&smte;": "⪬",
                        "&smtes;": "⪬︀",
                        "&softcy;": "ь",
                        "&sol;": "/",
                        "&solb;": "⧄",
                        "&solbar;": "⌿",
                        "&sopf;": "𝕤",
                        "&spades;": "♠",
                        "&spadesuit;": "♠",
                        "&spar;": "∥",
                        "&sqcap;": "⊓",
                        "&sqcaps;": "⊓︀",
                        "&sqcup;": "⊔",
                        "&sqcups;": "⊔︀",
                        "&sqsub;": "⊏",
                        "&sqsube;": "⊑",
                        "&sqsubset;": "⊏",
                        "&sqsubseteq;": "⊑",
                        "&sqsup;": "⊐",
                        "&sqsupe;": "⊒",
                        "&sqsupset;": "⊐",
                        "&sqsupseteq;": "⊒",
                        "&squ;": "□",
                        "&square;": "□",
                        "&squarf;": "▪",
                        "&squf;": "▪",
                        "&srarr;": "→",
                        "&sscr;": "𝓈",
                        "&ssetmn;": "∖",
                        "&ssmile;": "⌣",
                        "&sstarf;": "⋆",
                        "&star;": "☆",
                        "&starf;": "★",
                        "&straightepsilon;": "ϵ",
                        "&straightphi;": "ϕ",
                        "&strns;": "¯",
                        "&sub;": "⊂",
                        "&subE;": "⫅",
                        "&subdot;": "⪽",
                        "&sube;": "⊆",
                        "&subedot;": "⫃",
                        "&submult;": "⫁",
                        "&subnE;": "⫋",
                        "&subne;": "⊊",
                        "&subplus;": "⪿",
                        "&subrarr;": "⥹",
                        "&subset;": "⊂",
                        "&subseteq;": "⊆",
                        "&subseteqq;": "⫅",
                        "&subsetneq;": "⊊",
                        "&subsetneqq;": "⫋",
                        "&subsim;": "⫇",
                        "&subsub;": "⫕",
                        "&subsup;": "⫓",
                        "&succ;": "≻",
                        "&succapprox;": "⪸",
                        "&succcurlyeq;": "≽",
                        "&succeq;": "⪰",
                        "&succnapprox;": "⪺",
                        "&succneqq;": "⪶",
                        "&succnsim;": "⋩",
                        "&succsim;": "≿",
                        "&sum;": "∑",
                        "&sung;": "♪",
                        "&sup1": "¹",
                        "&sup1;": "¹",
                        "&sup2": "²",
                        "&sup2;": "²",
                        "&sup3": "³",
                        "&sup3;": "³",
                        "&sup;": "⊃",
                        "&supE;": "⫆",
                        "&supdot;": "⪾",
                        "&supdsub;": "⫘",
                        "&supe;": "⊇",
                        "&supedot;": "⫄",
                        "&suphsol;": "⟉",
                        "&suphsub;": "⫗",
                        "&suplarr;": "⥻",
                        "&supmult;": "⫂",
                        "&supnE;": "⫌",
                        "&supne;": "⊋",
                        "&supplus;": "⫀",
                        "&supset;": "⊃",
                        "&supseteq;": "⊇",
                        "&supseteqq;": "⫆",
                        "&supsetneq;": "⊋",
                        "&supsetneqq;": "⫌",
                        "&supsim;": "⫈",
                        "&supsub;": "⫔",
                        "&supsup;": "⫖",
                        "&swArr;": "⇙",
                        "&swarhk;": "⤦",
                        "&swarr;": "↙",
                        "&swarrow;": "↙",
                        "&swnwar;": "⤪",
                        "&szlig": "ß",
                        "&szlig;": "ß",
                        "&target;": "⌖",
                        "&tau;": "τ",
                        "&tbrk;": "⎴",
                        "&tcaron;": "ť",
                        "&tcedil;": "ţ",
                        "&tcy;": "т",
                        "&tdot;": "⃛",
                        "&telrec;": "⌕",
                        "&tfr;": "𝔱",
                        "&there4;": "∴",
                        "&therefore;": "∴",
                        "&theta;": "θ",
                        "&thetasym;": "ϑ",
                        "&thetav;": "ϑ",
                        "&thickapprox;": "≈",
                        "&thicksim;": "∼",
                        "&thinsp;": " ",
                        "&thkap;": "≈",
                        "&thksim;": "∼",
                        "&thorn": "þ",
                        "&thorn;": "þ",
                        "&tilde;": "˜",
                        "&times": "×",
                        "&times;": "×",
                        "&timesb;": "⊠",
                        "&timesbar;": "⨱",
                        "&timesd;": "⨰",
                        "&tint;": "∭",
                        "&toea;": "⤨",
                        "&top;": "⊤",
                        "&topbot;": "⌶",
                        "&topcir;": "⫱",
                        "&topf;": "𝕥",
                        "&topfork;": "⫚",
                        "&tosa;": "⤩",
                        "&tprime;": "‴",
                        "&trade;": "™",
                        "&triangle;": "▵",
                        "&triangledown;": "▿",
                        "&triangleleft;": "◃",
                        "&trianglelefteq;": "⊴",
                        "&triangleq;": "≜",
                        "&triangleright;": "▹",
                        "&trianglerighteq;": "⊵",
                        "&tridot;": "◬",
                        "&trie;": "≜",
                        "&triminus;": "⨺",
                        "&triplus;": "⨹",
                        "&trisb;": "⧍",
                        "&tritime;": "⨻",
                        "&trpezium;": "⏢",
                        "&tscr;": "𝓉",
                        "&tscy;": "ц",
                        "&tshcy;": "ћ",
                        "&tstrok;": "ŧ",
                        "&twixt;": "≬",
                        "&twoheadleftarrow;": "↞",
                        "&twoheadrightarrow;": "↠",
                        "&uArr;": "⇑",
                        "&uHar;": "⥣",
                        "&uacute": "ú",
                        "&uacute;": "ú",
                        "&uarr;": "↑",
                        "&ubrcy;": "ў",
                        "&ubreve;": "ŭ",
                        "&ucirc": "û",
                        "&ucirc;": "û",
                        "&ucy;": "у",
                        "&udarr;": "⇅",
                        "&udblac;": "ű",
                        "&udhar;": "⥮",
                        "&ufisht;": "⥾",
                        "&ufr;": "𝔲",
                        "&ugrave": "ù",
                        "&ugrave;": "ù",
                        "&uharl;": "↿",
                        "&uharr;": "↾",
                        "&uhblk;": "▀",
                        "&ulcorn;": "⌜",
                        "&ulcorner;": "⌜",
                        "&ulcrop;": "⌏",
                        "&ultri;": "◸",
                        "&umacr;": "ū",
                        "&uml": "¨",
                        "&uml;": "¨",
                        "&uogon;": "ų",
                        "&uopf;": "𝕦",
                        "&uparrow;": "↑",
                        "&updownarrow;": "↕",
                        "&upharpoonleft;": "↿",
                        "&upharpoonright;": "↾",
                        "&uplus;": "⊎",
                        "&upsi;": "υ",
                        "&upsih;": "ϒ",
                        "&upsilon;": "υ",
                        "&upuparrows;": "⇈",
                        "&urcorn;": "⌝",
                        "&urcorner;": "⌝",
                        "&urcrop;": "⌎",
                        "&uring;": "ů",
                        "&urtri;": "◹",
                        "&uscr;": "𝓊",
                        "&utdot;": "⋰",
                        "&utilde;": "ũ",
                        "&utri;": "▵",
                        "&utrif;": "▴",
                        "&uuarr;": "⇈",
                        "&uuml": "ü",
                        "&uuml;": "ü",
                        "&uwangle;": "⦧",
                        "&vArr;": "⇕",
                        "&vBar;": "⫨",
                        "&vBarv;": "⫩",
                        "&vDash;": "⊨",
                        "&vangrt;": "⦜",
                        "&varepsilon;": "ϵ",
                        "&varkappa;": "ϰ",
                        "&varnothing;": "∅",
                        "&varphi;": "ϕ",
                        "&varpi;": "ϖ",
                        "&varpropto;": "∝",
                        "&varr;": "↕",
                        "&varrho;": "ϱ",
                        "&varsigma;": "ς",
                        "&varsubsetneq;": "⊊︀",
                        "&varsubsetneqq;": "⫋︀",
                        "&varsupsetneq;": "⊋︀",
                        "&varsupsetneqq;": "⫌︀",
                        "&vartheta;": "ϑ",
                        "&vartriangleleft;": "⊲",
                        "&vartriangleright;": "⊳",
                        "&vcy;": "в",
                        "&vdash;": "⊢",
                        "&vee;": "∨",
                        "&veebar;": "⊻",
                        "&veeeq;": "≚",
                        "&vellip;": "⋮",
                        "&verbar;": "|",
                        "&vert;": "|",
                        "&vfr;": "𝔳",
                        "&vltri;": "⊲",
                        "&vnsub;": "⊂⃒",
                        "&vnsup;": "⊃⃒",
                        "&vopf;": "𝕧",
                        "&vprop;": "∝",
                        "&vrtri;": "⊳",
                        "&vscr;": "𝓋",
                        "&vsubnE;": "⫋︀",
                        "&vsubne;": "⊊︀",
                        "&vsupnE;": "⫌︀",
                        "&vsupne;": "⊋︀",
                        "&vzigzag;": "⦚",
                        "&wcirc;": "ŵ",
                        "&wedbar;": "⩟",
                        "&wedge;": "∧",
                        "&wedgeq;": "≙",
                        "&weierp;": "℘",
                        "&wfr;": "𝔴",
                        "&wopf;": "𝕨",
                        "&wp;": "℘",
                        "&wr;": "≀",
                        "&wreath;": "≀",
                        "&wscr;": "𝓌",
                        "&xcap;": "⋂",
                        "&xcirc;": "◯",
                        "&xcup;": "⋃",
                        "&xdtri;": "▽",
                        "&xfr;": "𝔵",
                        "&xhArr;": "⟺",
                        "&xharr;": "⟷",
                        "&xi;": "ξ",
                        "&xlArr;": "⟸",
                        "&xlarr;": "⟵",
                        "&xmap;": "⟼",
                        "&xnis;": "⋻",
                        "&xodot;": "⨀",
                        "&xopf;": "𝕩",
                        "&xoplus;": "⨁",
                        "&xotime;": "⨂",
                        "&xrArr;": "⟹",
                        "&xrarr;": "⟶",
                        "&xscr;": "𝓍",
                        "&xsqcup;": "⨆",
                        "&xuplus;": "⨄",
                        "&xutri;": "△",
                        "&xvee;": "⋁",
                        "&xwedge;": "⋀",
                        "&yacute": "ý",
                        "&yacute;": "ý",
                        "&yacy;": "я",
                        "&ycirc;": "ŷ",
                        "&ycy;": "ы",
                        "&yen": "¥",
                        "&yen;": "¥",
                        "&yfr;": "𝔶",
                        "&yicy;": "ї",
                        "&yopf;": "𝕪",
                        "&yscr;": "𝓎",
                        "&yucy;": "ю",
                        "&yuml": "ÿ",
                        "&yuml;": "ÿ",
                        "&zacute;": "ź",
                        "&zcaron;": "ž",
                        "&zcy;": "з",
                        "&zdot;": "ż",
                        "&zeetrf;": "ℨ",
                        "&zeta;": "ζ",
                        "&zfr;": "𝔷",
                        "&zhcy;": "ж",
                        "&zigrarr;": "⇝",
                        "&zopf;": "𝕫",
                        "&zscr;": "𝓏",
                        "&zwj;": "‍",
                        "&zwnj;": "‌"
                    },
                    characters: {
                        Æ: "&AElig;",
                        "&": "&amp;",
                        Á: "&Aacute;",
                        Ă: "&Abreve;",
                        Â: "&Acirc;",
                        А: "&Acy;",
                        𝔄: "&Afr;",
                        À: "&Agrave;",
                        Α: "&Alpha;",
                        Ā: "&Amacr;",
                        "⩓": "&And;",
                        Ą: "&Aogon;",
                        𝔸: "&Aopf;",
                        "⁡": "&af;",
                        Å: "&angst;",
                        𝒜: "&Ascr;",
                        "≔": "&coloneq;",
                        Ã: "&Atilde;",
                        Ä: "&Auml;",
                        "∖": "&ssetmn;",
                        "⫧": "&Barv;",
                        "⌆": "&doublebarwedge;",
                        Б: "&Bcy;",
                        "∵": "&because;",
                        ℬ: "&bernou;",
                        Β: "&Beta;",
                        𝔅: "&Bfr;",
                        𝔹: "&Bopf;",
                        "˘": "&breve;",
                        "≎": "&bump;",
                        Ч: "&CHcy;",
                        "©": "&copy;",
                        Ć: "&Cacute;",
                        "⋒": "&Cap;",
                        ⅅ: "&DD;",
                        ℭ: "&Cfr;",
                        Č: "&Ccaron;",
                        Ç: "&Ccedil;",
                        Ĉ: "&Ccirc;",
                        "∰": "&Cconint;",
                        Ċ: "&Cdot;",
                        "¸": "&cedil;",
                        "·": "&middot;",
                        Χ: "&Chi;",
                        "⊙": "&odot;",
                        "⊖": "&ominus;",
                        "⊕": "&oplus;",
                        "⊗": "&otimes;",
                        "∲": "&cwconint;",
                        "”": "&rdquor;",
                        "’": "&rsquor;",
                        "∷": "&Proportion;",
                        "⩴": "&Colone;",
                        "≡": "&equiv;",
                        "∯": "&DoubleContourIntegral;",
                        "∮": "&oint;",
                        ℂ: "&complexes;",
                        "∐": "&coprod;",
                        "∳": "&awconint;",
                        "⨯": "&Cross;",
                        𝒞: "&Cscr;",
                        "⋓": "&Cup;",
                        "≍": "&asympeq;",
                        "⤑": "&DDotrahd;",
                        Ђ: "&DJcy;",
                        Ѕ: "&DScy;",
                        Џ: "&DZcy;",
                        "‡": "&ddagger;",
                        "↡": "&Darr;",
                        "⫤": "&DoubleLeftTee;",
                        Ď: "&Dcaron;",
                        Д: "&Dcy;",
                        "∇": "&nabla;",
                        Δ: "&Delta;",
                        𝔇: "&Dfr;",
                        "´": "&acute;",
                        "˙": "&dot;",
                        "˝": "&dblac;",
                        "`": "&grave;",
                        "˜": "&tilde;",
                        "⋄": "&diamond;",
                        ⅆ: "&dd;",
                        𝔻: "&Dopf;",
                        "¨": "&uml;",
                        "⃜": "&DotDot;",
                        "≐": "&esdot;",
                        "⇓": "&dArr;",
                        "⇐": "&lArr;",
                        "⇔": "&iff;",
                        "⟸": "&xlArr;",
                        "⟺": "&xhArr;",
                        "⟹": "&xrArr;",
                        "⇒": "&rArr;",
                        "⊨": "&vDash;",
                        "⇑": "&uArr;",
                        "⇕": "&vArr;",
                        "∥": "&spar;",
                        "↓": "&downarrow;",
                        "⤓": "&DownArrowBar;",
                        "⇵": "&duarr;",
                        "̑": "&DownBreve;",
                        "⥐": "&DownLeftRightVector;",
                        "⥞": "&DownLeftTeeVector;",
                        "↽": "&lhard;",
                        "⥖": "&DownLeftVectorBar;",
                        "⥟": "&DownRightTeeVector;",
                        "⇁": "&rightharpoondown;",
                        "⥗": "&DownRightVectorBar;",
                        "⊤": "&top;",
                        "↧": "&mapstodown;",
                        𝒟: "&Dscr;",
                        Đ: "&Dstrok;",
                        Ŋ: "&ENG;",
                        Ð: "&ETH;",
                        É: "&Eacute;",
                        Ě: "&Ecaron;",
                        Ê: "&Ecirc;",
                        Э: "&Ecy;",
                        Ė: "&Edot;",
                        𝔈: "&Efr;",
                        È: "&Egrave;",
                        "∈": "&isinv;",
                        Ē: "&Emacr;",
                        "◻": "&EmptySmallSquare;",
                        "▫": "&EmptyVerySmallSquare;",
                        Ę: "&Eogon;",
                        𝔼: "&Eopf;",
                        Ε: "&Epsilon;",
                        "⩵": "&Equal;",
                        "≂": "&esim;",
                        "⇌": "&rlhar;",
                        ℰ: "&expectation;",
                        "⩳": "&Esim;",
                        Η: "&Eta;",
                        Ë: "&Euml;",
                        "∃": "&exist;",
                        ⅇ: "&exponentiale;",
                        Ф: "&Fcy;",
                        𝔉: "&Ffr;",
                        "◼": "&FilledSmallSquare;",
                        "▪": "&squf;",
                        𝔽: "&Fopf;",
                        "∀": "&forall;",
                        ℱ: "&Fscr;",
                        Ѓ: "&GJcy;",
                        ">": "&gt;",
                        Γ: "&Gamma;",
                        Ϝ: "&Gammad;",
                        Ğ: "&Gbreve;",
                        Ģ: "&Gcedil;",
                        Ĝ: "&Gcirc;",
                        Г: "&Gcy;",
                        Ġ: "&Gdot;",
                        𝔊: "&Gfr;",
                        "⋙": "&ggg;",
                        𝔾: "&Gopf;",
                        "≥": "&geq;",
                        "⋛": "&gtreqless;",
                        "≧": "&geqq;",
                        "⪢": "&GreaterGreater;",
                        "≷": "&gtrless;",
                        "⩾": "&ges;",
                        "≳": "&gtrsim;",
                        𝒢: "&Gscr;",
                        "≫": "&gg;",
                        Ъ: "&HARDcy;",
                        ˇ: "&caron;",
                        "^": "&Hat;",
                        Ĥ: "&Hcirc;",
                        ℌ: "&Poincareplane;",
                        ℋ: "&hamilt;",
                        ℍ: "&quaternions;",
                        "─": "&boxh;",
                        Ħ: "&Hstrok;",
                        "≏": "&bumpeq;",
                        Е: "&IEcy;",
                        Ĳ: "&IJlig;",
                        Ё: "&IOcy;",
                        Í: "&Iacute;",
                        Î: "&Icirc;",
                        И: "&Icy;",
                        İ: "&Idot;",
                        ℑ: "&imagpart;",
                        Ì: "&Igrave;",
                        Ī: "&Imacr;",
                        ⅈ: "&ii;",
                        "∬": "&Int;",
                        "∫": "&int;",
                        "⋂": "&xcap;",
                        "⁣": "&ic;",
                        "⁢": "&it;",
                        Į: "&Iogon;",
                        𝕀: "&Iopf;",
                        Ι: "&Iota;",
                        ℐ: "&imagline;",
                        Ĩ: "&Itilde;",
                        І: "&Iukcy;",
                        Ï: "&Iuml;",
                        Ĵ: "&Jcirc;",
                        Й: "&Jcy;",
                        𝔍: "&Jfr;",
                        𝕁: "&Jopf;",
                        𝒥: "&Jscr;",
                        Ј: "&Jsercy;",
                        Є: "&Jukcy;",
                        Х: "&KHcy;",
                        Ќ: "&KJcy;",
                        Κ: "&Kappa;",
                        Ķ: "&Kcedil;",
                        К: "&Kcy;",
                        𝔎: "&Kfr;",
                        𝕂: "&Kopf;",
                        𝒦: "&Kscr;",
                        Љ: "&LJcy;",
                        "<": "&lt;",
                        Ĺ: "&Lacute;",
                        Λ: "&Lambda;",
                        "⟪": "&Lang;",
                        ℒ: "&lagran;",
                        "↞": "&twoheadleftarrow;",
                        Ľ: "&Lcaron;",
                        Ļ: "&Lcedil;",
                        Л: "&Lcy;",
                        "⟨": "&langle;",
                        "←": "&slarr;",
                        "⇤": "&larrb;",
                        "⇆": "&lrarr;",
                        "⌈": "&lceil;",
                        "⟦": "&lobrk;",
                        "⥡": "&LeftDownTeeVector;",
                        "⇃": "&downharpoonleft;",
                        "⥙": "&LeftDownVectorBar;",
                        "⌊": "&lfloor;",
                        "↔": "&leftrightarrow;",
                        "⥎": "&LeftRightVector;",
                        "⊣": "&dashv;",
                        "↤": "&mapstoleft;",
                        "⥚": "&LeftTeeVector;",
                        "⊲": "&vltri;",
                        "⧏": "&LeftTriangleBar;",
                        "⊴": "&trianglelefteq;",
                        "⥑": "&LeftUpDownVector;",
                        "⥠": "&LeftUpTeeVector;",
                        "↿": "&upharpoonleft;",
                        "⥘": "&LeftUpVectorBar;",
                        "↼": "&lharu;",
                        "⥒": "&LeftVectorBar;",
                        "⋚": "&lesseqgtr;",
                        "≦": "&leqq;",
                        "≶": "&lg;",
                        "⪡": "&LessLess;",
                        "⩽": "&les;",
                        "≲": "&lsim;",
                        𝔏: "&Lfr;",
                        "⋘": "&Ll;",
                        "⇚": "&lAarr;",
                        Ŀ: "&Lmidot;",
                        "⟵": "&xlarr;",
                        "⟷": "&xharr;",
                        "⟶": "&xrarr;",
                        𝕃: "&Lopf;",
                        "↙": "&swarrow;",
                        "↘": "&searrow;",
                        "↰": "&lsh;",
                        Ł: "&Lstrok;",
                        "≪": "&ll;",
                        "⤅": "&Map;",
                        М: "&Mcy;",
                        " ": "&MediumSpace;",
                        ℳ: "&phmmat;",
                        𝔐: "&Mfr;",
                        "∓": "&mp;",
                        𝕄: "&Mopf;",
                        Μ: "&Mu;",
                        Њ: "&NJcy;",
                        Ń: "&Nacute;",
                        Ň: "&Ncaron;",
                        Ņ: "&Ncedil;",
                        Н: "&Ncy;",
                        "​": "&ZeroWidthSpace;",
                        "\n": "&NewLine;",
                        𝔑: "&Nfr;",
                        "⁠": "&NoBreak;",
                        " ": "&nbsp;",
                        ℕ: "&naturals;",
                        "⫬": "&Not;",
                        "≢": "&nequiv;",
                        "≭": "&NotCupCap;",
                        "∦": "&nspar;",
                        "∉": "&notinva;",
                        "≠": "&ne;",
                        "≂̸": "&nesim;",
                        "∄": "&nexists;",
                        "≯": "&ngtr;",
                        "≱": "&ngeq;",
                        "≧̸": "&ngeqq;",
                        "≫̸": "&nGtv;",
                        "≹": "&ntgl;",
                        "⩾̸": "&nges;",
                        "≵": "&ngsim;",
                        "≎̸": "&nbump;",
                        "≏̸": "&nbumpe;",
                        "⋪": "&ntriangleleft;",
                        "⧏̸": "&NotLeftTriangleBar;",
                        "⋬": "&ntrianglelefteq;",
                        "≮": "&nlt;",
                        "≰": "&nleq;",
                        "≸": "&ntlg;",
                        "≪̸": "&nLtv;",
                        "⩽̸": "&nles;",
                        "≴": "&nlsim;",
                        "⪢̸": "&NotNestedGreaterGreater;",
                        "⪡̸": "&NotNestedLessLess;",
                        "⊀": "&nprec;",
                        "⪯̸": "&npreceq;",
                        "⋠": "&nprcue;",
                        "∌": "&notniva;",
                        "⋫": "&ntriangleright;",
                        "⧐̸": "&NotRightTriangleBar;",
                        "⋭": "&ntrianglerighteq;",
                        "⊏̸": "&NotSquareSubset;",
                        "⋢": "&nsqsube;",
                        "⊐̸": "&NotSquareSuperset;",
                        "⋣": "&nsqsupe;",
                        "⊂⃒": "&vnsub;",
                        "⊈": "&nsubseteq;",
                        "⊁": "&nsucc;",
                        "⪰̸": "&nsucceq;",
                        "⋡": "&nsccue;",
                        "≿̸": "&NotSucceedsTilde;",
                        "⊃⃒": "&vnsup;",
                        "⊉": "&nsupseteq;",
                        "≁": "&nsim;",
                        "≄": "&nsimeq;",
                        "≇": "&ncong;",
                        "≉": "&napprox;",
                        "∤": "&nsmid;",
                        𝒩: "&Nscr;",
                        Ñ: "&Ntilde;",
                        Ν: "&Nu;",
                        Œ: "&OElig;",
                        Ó: "&Oacute;",
                        Ô: "&Ocirc;",
                        О: "&Ocy;",
                        Ő: "&Odblac;",
                        𝔒: "&Ofr;",
                        Ò: "&Ograve;",
                        Ō: "&Omacr;",
                        Ω: "&ohm;",
                        Ο: "&Omicron;",
                        𝕆: "&Oopf;",
                        "“": "&ldquo;",
                        "‘": "&lsquo;",
                        "⩔": "&Or;",
                        𝒪: "&Oscr;",
                        Ø: "&Oslash;",
                        Õ: "&Otilde;",
                        "⨷": "&Otimes;",
                        Ö: "&Ouml;",
                        "‾": "&oline;",
                        "⏞": "&OverBrace;",
                        "⎴": "&tbrk;",
                        "⏜": "&OverParenthesis;",
                        "∂": "&part;",
                        П: "&Pcy;",
                        𝔓: "&Pfr;",
                        Φ: "&Phi;",
                        Π: "&Pi;",
                        "±": "&pm;",
                        ℙ: "&primes;",
                        "⪻": "&Pr;",
                        "≺": "&prec;",
                        "⪯": "&preceq;",
                        "≼": "&preccurlyeq;",
                        "≾": "&prsim;",
                        "″": "&Prime;",
                        "∏": "&prod;",
                        "∝": "&vprop;",
                        𝒫: "&Pscr;",
                        Ψ: "&Psi;",
                        '"': "&quot;",
                        𝔔: "&Qfr;",
                        ℚ: "&rationals;",
                        𝒬: "&Qscr;",
                        "⤐": "&drbkarow;",
                        "®": "&reg;",
                        Ŕ: "&Racute;",
                        "⟫": "&Rang;",
                        "↠": "&twoheadrightarrow;",
                        "⤖": "&Rarrtl;",
                        Ř: "&Rcaron;",
                        Ŗ: "&Rcedil;",
                        Р: "&Rcy;",
                        ℜ: "&realpart;",
                        "∋": "&niv;",
                        "⇋": "&lrhar;",
                        "⥯": "&duhar;",
                        Ρ: "&Rho;",
                        "⟩": "&rangle;",
                        "→": "&srarr;",
                        "⇥": "&rarrb;",
                        "⇄": "&rlarr;",
                        "⌉": "&rceil;",
                        "⟧": "&robrk;",
                        "⥝": "&RightDownTeeVector;",
                        "⇂": "&downharpoonright;",
                        "⥕": "&RightDownVectorBar;",
                        "⌋": "&rfloor;",
                        "⊢": "&vdash;",
                        "↦": "&mapsto;",
                        "⥛": "&RightTeeVector;",
                        "⊳": "&vrtri;",
                        "⧐": "&RightTriangleBar;",
                        "⊵": "&trianglerighteq;",
                        "⥏": "&RightUpDownVector;",
                        "⥜": "&RightUpTeeVector;",
                        "↾": "&upharpoonright;",
                        "⥔": "&RightUpVectorBar;",
                        "⇀": "&rightharpoonup;",
                        "⥓": "&RightVectorBar;",
                        ℝ: "&reals;",
                        "⥰": "&RoundImplies;",
                        "⇛": "&rAarr;",
                        ℛ: "&realine;",
                        "↱": "&rsh;",
                        "⧴": "&RuleDelayed;",
                        Щ: "&SHCHcy;",
                        Ш: "&SHcy;",
                        Ь: "&SOFTcy;",
                        Ś: "&Sacute;",
                        "⪼": "&Sc;",
                        Š: "&Scaron;",
                        Ş: "&Scedil;",
                        Ŝ: "&Scirc;",
                        С: "&Scy;",
                        𝔖: "&Sfr;",
                        "↑": "&uparrow;",
                        Σ: "&Sigma;",
                        "∘": "&compfn;",
                        𝕊: "&Sopf;",
                        "√": "&radic;",
                        "□": "&square;",
                        "⊓": "&sqcap;",
                        "⊏": "&sqsubset;",
                        "⊑": "&sqsubseteq;",
                        "⊐": "&sqsupset;",
                        "⊒": "&sqsupseteq;",
                        "⊔": "&sqcup;",
                        𝒮: "&Sscr;",
                        "⋆": "&sstarf;",
                        "⋐": "&Subset;",
                        "⊆": "&subseteq;",
                        "≻": "&succ;",
                        "⪰": "&succeq;",
                        "≽": "&succcurlyeq;",
                        "≿": "&succsim;",
                        "∑": "&sum;",
                        "⋑": "&Supset;",
                        "⊃": "&supset;",
                        "⊇": "&supseteq;",
                        Þ: "&THORN;",
                        "™": "&trade;",
                        Ћ: "&TSHcy;",
                        Ц: "&TScy;",
                        "\t": "&Tab;",
                        Τ: "&Tau;",
                        Ť: "&Tcaron;",
                        Ţ: "&Tcedil;",
                        Т: "&Tcy;",
                        𝔗: "&Tfr;",
                        "∴": "&therefore;",
                        Θ: "&Theta;",
                        "  ": "&ThickSpace;",
                        " ": "&thinsp;",
                        "∼": "&thksim;",
                        "≃": "&simeq;",
                        "≅": "&cong;",
                        "≈": "&thkap;",
                        𝕋: "&Topf;",
                        "⃛": "&tdot;",
                        𝒯: "&Tscr;",
                        Ŧ: "&Tstrok;",
                        Ú: "&Uacute;",
                        "↟": "&Uarr;",
                        "⥉": "&Uarrocir;",
                        Ў: "&Ubrcy;",
                        Ŭ: "&Ubreve;",
                        Û: "&Ucirc;",
                        У: "&Ucy;",
                        Ű: "&Udblac;",
                        𝔘: "&Ufr;",
                        Ù: "&Ugrave;",
                        Ū: "&Umacr;",
                        _: "&lowbar;",
                        "⏟": "&UnderBrace;",
                        "⎵": "&bbrk;",
                        "⏝": "&UnderParenthesis;",
                        "⋃": "&xcup;",
                        "⊎": "&uplus;",
                        Ų: "&Uogon;",
                        𝕌: "&Uopf;",
                        "⤒": "&UpArrowBar;",
                        "⇅": "&udarr;",
                        "↕": "&varr;",
                        "⥮": "&udhar;",
                        "⊥": "&perp;",
                        "↥": "&mapstoup;",
                        "↖": "&nwarrow;",
                        "↗": "&nearrow;",
                        ϒ: "&upsih;",
                        Υ: "&Upsilon;",
                        Ů: "&Uring;",
                        𝒰: "&Uscr;",
                        Ũ: "&Utilde;",
                        Ü: "&Uuml;",
                        "⊫": "&VDash;",
                        "⫫": "&Vbar;",
                        В: "&Vcy;",
                        "⊩": "&Vdash;",
                        "⫦": "&Vdashl;",
                        "⋁": "&xvee;",
                        "‖": "&Vert;",
                        "∣": "&smid;",
                        "|": "&vert;",
                        "❘": "&VerticalSeparator;",
                        "≀": "&wreath;",
                        " ": "&hairsp;",
                        𝔙: "&Vfr;",
                        𝕍: "&Vopf;",
                        𝒱: "&Vscr;",
                        "⊪": "&Vvdash;",
                        Ŵ: "&Wcirc;",
                        "⋀": "&xwedge;",
                        𝔚: "&Wfr;",
                        𝕎: "&Wopf;",
                        𝒲: "&Wscr;",
                        𝔛: "&Xfr;",
                        Ξ: "&Xi;",
                        𝕏: "&Xopf;",
                        𝒳: "&Xscr;",
                        Я: "&YAcy;",
                        Ї: "&YIcy;",
                        Ю: "&YUcy;",
                        Ý: "&Yacute;",
                        Ŷ: "&Ycirc;",
                        Ы: "&Ycy;",
                        𝔜: "&Yfr;",
                        𝕐: "&Yopf;",
                        𝒴: "&Yscr;",
                        Ÿ: "&Yuml;",
                        Ж: "&ZHcy;",
                        Ź: "&Zacute;",
                        Ž: "&Zcaron;",
                        З: "&Zcy;",
                        Ż: "&Zdot;",
                        Ζ: "&Zeta;",
                        ℨ: "&zeetrf;",
                        ℤ: "&integers;",
                        𝒵: "&Zscr;",
                        á: "&aacute;",
                        ă: "&abreve;",
                        "∾": "&mstpos;",
                        "∾̳": "&acE;",
                        "∿": "&acd;",
                        â: "&acirc;",
                        а: "&acy;",
                        æ: "&aelig;",
                        𝔞: "&afr;",
                        à: "&agrave;",
                        ℵ: "&aleph;",
                        α: "&alpha;",
                        ā: "&amacr;",
                        "⨿": "&amalg;",
                        "∧": "&wedge;",
                        "⩕": "&andand;",
                        "⩜": "&andd;",
                        "⩘": "&andslope;",
                        "⩚": "&andv;",
                        "∠": "&angle;",
                        "⦤": "&ange;",
                        "∡": "&measuredangle;",
                        "⦨": "&angmsdaa;",
                        "⦩": "&angmsdab;",
                        "⦪": "&angmsdac;",
                        "⦫": "&angmsdad;",
                        "⦬": "&angmsdae;",
                        "⦭": "&angmsdaf;",
                        "⦮": "&angmsdag;",
                        "⦯": "&angmsdah;",
                        "∟": "&angrt;",
                        "⊾": "&angrtvb;",
                        "⦝": "&angrtvbd;",
                        "∢": "&angsph;",
                        "⍼": "&angzarr;",
                        ą: "&aogon;",
                        𝕒: "&aopf;",
                        "⩰": "&apE;",
                        "⩯": "&apacir;",
                        "≊": "&approxeq;",
                        "≋": "&apid;",
                        "'": "&apos;",
                        å: "&aring;",
                        𝒶: "&ascr;",
                        "*": "&midast;",
                        ã: "&atilde;",
                        ä: "&auml;",
                        "⨑": "&awint;",
                        "⫭": "&bNot;",
                        "≌": "&bcong;",
                        "϶": "&bepsi;",
                        "‵": "&bprime;",
                        "∽": "&bsim;",
                        "⋍": "&bsime;",
                        "⊽": "&barvee;",
                        "⌅": "&barwedge;",
                        "⎶": "&bbrktbrk;",
                        б: "&bcy;",
                        "„": "&ldquor;",
                        "⦰": "&bemptyv;",
                        β: "&beta;",
                        ℶ: "&beth;",
                        "≬": "&twixt;",
                        𝔟: "&bfr;",
                        "◯": "&xcirc;",
                        "⨀": "&xodot;",
                        "⨁": "&xoplus;",
                        "⨂": "&xotime;",
                        "⨆": "&xsqcup;",
                        "★": "&starf;",
                        "▽": "&xdtri;",
                        "△": "&xutri;",
                        "⨄": "&xuplus;",
                        "⤍": "&rbarr;",
                        "⧫": "&lozf;",
                        "▴": "&utrif;",
                        "▾": "&dtrif;",
                        "◂": "&ltrif;",
                        "▸": "&rtrif;",
                        "␣": "&blank;",
                        "▒": "&blk12;",
                        "░": "&blk14;",
                        "▓": "&blk34;",
                        "█": "&block;",
                        "=⃥": "&bne;",
                        "≡⃥": "&bnequiv;",
                        "⌐": "&bnot;",
                        𝕓: "&bopf;",
                        "⋈": "&bowtie;",
                        "╗": "&boxDL;",
                        "╔": "&boxDR;",
                        "╖": "&boxDl;",
                        "╓": "&boxDr;",
                        "═": "&boxH;",
                        "╦": "&boxHD;",
                        "╩": "&boxHU;",
                        "╤": "&boxHd;",
                        "╧": "&boxHu;",
                        "╝": "&boxUL;",
                        "╚": "&boxUR;",
                        "╜": "&boxUl;",
                        "╙": "&boxUr;",
                        "║": "&boxV;",
                        "╬": "&boxVH;",
                        "╣": "&boxVL;",
                        "╠": "&boxVR;",
                        "╫": "&boxVh;",
                        "╢": "&boxVl;",
                        "╟": "&boxVr;",
                        "⧉": "&boxbox;",
                        "╕": "&boxdL;",
                        "╒": "&boxdR;",
                        "┐": "&boxdl;",
                        "┌": "&boxdr;",
                        "╥": "&boxhD;",
                        "╨": "&boxhU;",
                        "┬": "&boxhd;",
                        "┴": "&boxhu;",
                        "⊟": "&minusb;",
                        "⊞": "&plusb;",
                        "⊠": "&timesb;",
                        "╛": "&boxuL;",
                        "╘": "&boxuR;",
                        "┘": "&boxul;",
                        "└": "&boxur;",
                        "│": "&boxv;",
                        "╪": "&boxvH;",
                        "╡": "&boxvL;",
                        "╞": "&boxvR;",
                        "┼": "&boxvh;",
                        "┤": "&boxvl;",
                        "├": "&boxvr;",
                        "¦": "&brvbar;",
                        𝒷: "&bscr;",
                        "⁏": "&bsemi;",
                        "\\": "&bsol;",
                        "⧅": "&bsolb;",
                        "⟈": "&bsolhsub;",
                        "•": "&bullet;",
                        "⪮": "&bumpE;",
                        ć: "&cacute;",
                        "∩": "&cap;",
                        "⩄": "&capand;",
                        "⩉": "&capbrcup;",
                        "⩋": "&capcap;",
                        "⩇": "&capcup;",
                        "⩀": "&capdot;",
                        "∩︀": "&caps;",
                        "⁁": "&caret;",
                        "⩍": "&ccaps;",
                        č: "&ccaron;",
                        ç: "&ccedil;",
                        ĉ: "&ccirc;",
                        "⩌": "&ccups;",
                        "⩐": "&ccupssm;",
                        ċ: "&cdot;",
                        "⦲": "&cemptyv;",
                        "¢": "&cent;",
                        𝔠: "&cfr;",
                        ч: "&chcy;",
                        "✓": "&checkmark;",
                        χ: "&chi;",
                        "○": "&cir;",
                        "⧃": "&cirE;",
                        ˆ: "&circ;",
                        "≗": "&cire;",
                        "↺": "&olarr;",
                        "↻": "&orarr;",
                        "Ⓢ": "&oS;",
                        "⊛": "&oast;",
                        "⊚": "&ocir;",
                        "⊝": "&odash;",
                        "⨐": "&cirfnint;",
                        "⫯": "&cirmid;",
                        "⧂": "&cirscir;",
                        "♣": "&clubsuit;",
                        ":": "&colon;",
                        ",": "&comma;",
                        "@": "&commat;",
                        "∁": "&complement;",
                        "⩭": "&congdot;",
                        𝕔: "&copf;",
                        "℗": "&copysr;",
                        "↵": "&crarr;",
                        "✗": "&cross;",
                        𝒸: "&cscr;",
                        "⫏": "&csub;",
                        "⫑": "&csube;",
                        "⫐": "&csup;",
                        "⫒": "&csupe;",
                        "⋯": "&ctdot;",
                        "⤸": "&cudarrl;",
                        "⤵": "&cudarrr;",
                        "⋞": "&curlyeqprec;",
                        "⋟": "&curlyeqsucc;",
                        "↶": "&curvearrowleft;",
                        "⤽": "&cularrp;",
                        "∪": "&cup;",
                        "⩈": "&cupbrcap;",
                        "⩆": "&cupcap;",
                        "⩊": "&cupcup;",
                        "⊍": "&cupdot;",
                        "⩅": "&cupor;",
                        "∪︀": "&cups;",
                        "↷": "&curvearrowright;",
                        "⤼": "&curarrm;",
                        "⋎": "&cuvee;",
                        "⋏": "&cuwed;",
                        "¤": "&curren;",
                        "∱": "&cwint;",
                        "⌭": "&cylcty;",
                        "⥥": "&dHar;",
                        "†": "&dagger;",
                        ℸ: "&daleth;",
                        "‐": "&hyphen;",
                        "⤏": "&rBarr;",
                        ď: "&dcaron;",
                        д: "&dcy;",
                        "⇊": "&downdownarrows;",
                        "⩷": "&eDDot;",
                        "°": "&deg;",
                        δ: "&delta;",
                        "⦱": "&demptyv;",
                        "⥿": "&dfisht;",
                        𝔡: "&dfr;",
                        "♦": "&diams;",
                        ϝ: "&gammad;",
                        "⋲": "&disin;",
                        "÷": "&divide;",
                        "⋇": "&divonx;",
                        ђ: "&djcy;",
                        "⌞": "&llcorner;",
                        "⌍": "&dlcrop;",
                        $: "&dollar;",
                        𝕕: "&dopf;",
                        "≑": "&eDot;",
                        "∸": "&minusd;",
                        "∔": "&plusdo;",
                        "⊡": "&sdotb;",
                        "⌟": "&lrcorner;",
                        "⌌": "&drcrop;",
                        𝒹: "&dscr;",
                        ѕ: "&dscy;",
                        "⧶": "&dsol;",
                        đ: "&dstrok;",
                        "⋱": "&dtdot;",
                        "▿": "&triangledown;",
                        "⦦": "&dwangle;",
                        џ: "&dzcy;",
                        "⟿": "&dzigrarr;",
                        é: "&eacute;",
                        "⩮": "&easter;",
                        ě: "&ecaron;",
                        "≖": "&eqcirc;",
                        ê: "&ecirc;",
                        "≕": "&eqcolon;",
                        э: "&ecy;",
                        ė: "&edot;",
                        "≒": "&fallingdotseq;",
                        𝔢: "&efr;",
                        "⪚": "&eg;",
                        è: "&egrave;",
                        "⪖": "&eqslantgtr;",
                        "⪘": "&egsdot;",
                        "⪙": "&el;",
                        "⏧": "&elinters;",
                        ℓ: "&ell;",
                        "⪕": "&eqslantless;",
                        "⪗": "&elsdot;",
                        ē: "&emacr;",
                        "∅": "&varnothing;",
                        " ": "&emsp13;",
                        " ": "&emsp14;",
                        " ": "&emsp;",
                        ŋ: "&eng;",
                        " ": "&ensp;",
                        ę: "&eogon;",
                        𝕖: "&eopf;",
                        "⋕": "&epar;",
                        "⧣": "&eparsl;",
                        "⩱": "&eplus;",
                        ε: "&epsilon;",
                        ϵ: "&varepsilon;",
                        "=": "&equals;",
                        "≟": "&questeq;",
                        "⩸": "&equivDD;",
                        "⧥": "&eqvparsl;",
                        "≓": "&risingdotseq;",
                        "⥱": "&erarr;",
                        ℯ: "&escr;",
                        η: "&eta;",
                        ð: "&eth;",
                        ë: "&euml;",
                        "€": "&euro;",
                        "!": "&excl;",
                        ф: "&fcy;",
                        "♀": "&female;",
                        ﬃ: "&ffilig;",
                        ﬀ: "&fflig;",
                        ﬄ: "&ffllig;",
                        𝔣: "&ffr;",
                        ﬁ: "&filig;",
                        fj: "&fjlig;",
                        "♭": "&flat;",
                        ﬂ: "&fllig;",
                        "▱": "&fltns;",
                        ƒ: "&fnof;",
                        𝕗: "&fopf;",
                        "⋔": "&pitchfork;",
                        "⫙": "&forkv;",
                        "⨍": "&fpartint;",
                        "½": "&half;",
                        "⅓": "&frac13;",
                        "¼": "&frac14;",
                        "⅕": "&frac15;",
                        "⅙": "&frac16;",
                        "⅛": "&frac18;",
                        "⅔": "&frac23;",
                        "⅖": "&frac25;",
                        "¾": "&frac34;",
                        "⅗": "&frac35;",
                        "⅜": "&frac38;",
                        "⅘": "&frac45;",
                        "⅚": "&frac56;",
                        "⅝": "&frac58;",
                        "⅞": "&frac78;",
                        "⁄": "&frasl;",
                        "⌢": "&sfrown;",
                        𝒻: "&fscr;",
                        "⪌": "&gtreqqless;",
                        ǵ: "&gacute;",
                        γ: "&gamma;",
                        "⪆": "&gtrapprox;",
                        ğ: "&gbreve;",
                        ĝ: "&gcirc;",
                        г: "&gcy;",
                        ġ: "&gdot;",
                        "⪩": "&gescc;",
                        "⪀": "&gesdot;",
                        "⪂": "&gesdoto;",
                        "⪄": "&gesdotol;",
                        "⋛︀": "&gesl;",
                        "⪔": "&gesles;",
                        𝔤: "&gfr;",
                        ℷ: "&gimel;",
                        ѓ: "&gjcy;",
                        "⪒": "&glE;",
                        "⪥": "&gla;",
                        "⪤": "&glj;",
                        "≩": "&gneqq;",
                        "⪊": "&gnapprox;",
                        "⪈": "&gneq;",
                        "⋧": "&gnsim;",
                        𝕘: "&gopf;",
                        ℊ: "&gscr;",
                        "⪎": "&gsime;",
                        "⪐": "&gsiml;",
                        "⪧": "&gtcc;",
                        "⩺": "&gtcir;",
                        "⋗": "&gtrdot;",
                        "⦕": "&gtlPar;",
                        "⩼": "&gtquest;",
                        "⥸": "&gtrarr;",
                        "≩︀": "&gvnE;",
                        ъ: "&hardcy;",
                        "⥈": "&harrcir;",
                        "↭": "&leftrightsquigarrow;",
                        ℏ: "&plankv;",
                        ĥ: "&hcirc;",
                        "♥": "&heartsuit;",
                        "…": "&mldr;",
                        "⊹": "&hercon;",
                        𝔥: "&hfr;",
                        "⤥": "&searhk;",
                        "⤦": "&swarhk;",
                        "⇿": "&hoarr;",
                        "∻": "&homtht;",
                        "↩": "&larrhk;",
                        "↪": "&rarrhk;",
                        𝕙: "&hopf;",
                        "―": "&horbar;",
                        𝒽: "&hscr;",
                        ħ: "&hstrok;",
                        "⁃": "&hybull;",
                        í: "&iacute;",
                        î: "&icirc;",
                        и: "&icy;",
                        е: "&iecy;",
                        "¡": "&iexcl;",
                        𝔦: "&ifr;",
                        ì: "&igrave;",
                        "⨌": "&qint;",
                        "∭": "&tint;",
                        "⧜": "&iinfin;",
                        "℩": "&iiota;",
                        ĳ: "&ijlig;",
                        ī: "&imacr;",
                        ı: "&inodot;",
                        "⊷": "&imof;",
                        Ƶ: "&imped;",
                        "℅": "&incare;",
                        "∞": "&infin;",
                        "⧝": "&infintie;",
                        "⊺": "&intercal;",
                        "⨗": "&intlarhk;",
                        "⨼": "&iprod;",
                        ё: "&iocy;",
                        į: "&iogon;",
                        𝕚: "&iopf;",
                        ι: "&iota;",
                        "¿": "&iquest;",
                        𝒾: "&iscr;",
                        "⋹": "&isinE;",
                        "⋵": "&isindot;",
                        "⋴": "&isins;",
                        "⋳": "&isinsv;",
                        ĩ: "&itilde;",
                        і: "&iukcy;",
                        ï: "&iuml;",
                        ĵ: "&jcirc;",
                        й: "&jcy;",
                        𝔧: "&jfr;",
                        ȷ: "&jmath;",
                        𝕛: "&jopf;",
                        𝒿: "&jscr;",
                        ј: "&jsercy;",
                        є: "&jukcy;",
                        κ: "&kappa;",
                        ϰ: "&varkappa;",
                        ķ: "&kcedil;",
                        к: "&kcy;",
                        𝔨: "&kfr;",
                        ĸ: "&kgreen;",
                        х: "&khcy;",
                        ќ: "&kjcy;",
                        𝕜: "&kopf;",
                        𝓀: "&kscr;",
                        "⤛": "&lAtail;",
                        "⤎": "&lBarr;",
                        "⪋": "&lesseqqgtr;",
                        "⥢": "&lHar;",
                        ĺ: "&lacute;",
                        "⦴": "&laemptyv;",
                        λ: "&lambda;",
                        "⦑": "&langd;",
                        "⪅": "&lessapprox;",
                        "«": "&laquo;",
                        "⤟": "&larrbfs;",
                        "⤝": "&larrfs;",
                        "↫": "&looparrowleft;",
                        "⤹": "&larrpl;",
                        "⥳": "&larrsim;",
                        "↢": "&leftarrowtail;",
                        "⪫": "&lat;",
                        "⤙": "&latail;",
                        "⪭": "&late;",
                        "⪭︀": "&lates;",
                        "⤌": "&lbarr;",
                        "❲": "&lbbrk;",
                        "{": "&lcub;",
                        "[": "&lsqb;",
                        "⦋": "&lbrke;",
                        "⦏": "&lbrksld;",
                        "⦍": "&lbrkslu;",
                        ľ: "&lcaron;",
                        ļ: "&lcedil;",
                        л: "&lcy;",
                        "⤶": "&ldca;",
                        "⥧": "&ldrdhar;",
                        "⥋": "&ldrushar;",
                        "↲": "&ldsh;",
                        "≤": "&leq;",
                        "⇇": "&llarr;",
                        "⋋": "&lthree;",
                        "⪨": "&lescc;",
                        "⩿": "&lesdot;",
                        "⪁": "&lesdoto;",
                        "⪃": "&lesdotor;",
                        "⋚︀": "&lesg;",
                        "⪓": "&lesges;",
                        "⋖": "&ltdot;",
                        "⥼": "&lfisht;",
                        𝔩: "&lfr;",
                        "⪑": "&lgE;",
                        "⥪": "&lharul;",
                        "▄": "&lhblk;",
                        љ: "&ljcy;",
                        "⥫": "&llhard;",
                        "◺": "&lltri;",
                        ŀ: "&lmidot;",
                        "⎰": "&lmoustache;",
                        "≨": "&lneqq;",
                        "⪉": "&lnapprox;",
                        "⪇": "&lneq;",
                        "⋦": "&lnsim;",
                        "⟬": "&loang;",
                        "⇽": "&loarr;",
                        "⟼": "&xmap;",
                        "↬": "&rarrlp;",
                        "⦅": "&lopar;",
                        𝕝: "&lopf;",
                        "⨭": "&loplus;",
                        "⨴": "&lotimes;",
                        "∗": "&lowast;",
                        "◊": "&lozenge;",
                        "(": "&lpar;",
                        "⦓": "&lparlt;",
                        "⥭": "&lrhard;",
                        "‎": "&lrm;",
                        "⊿": "&lrtri;",
                        "‹": "&lsaquo;",
                        𝓁: "&lscr;",
                        "⪍": "&lsime;",
                        "⪏": "&lsimg;",
                        "‚": "&sbquo;",
                        ł: "&lstrok;",
                        "⪦": "&ltcc;",
                        "⩹": "&ltcir;",
                        "⋉": "&ltimes;",
                        "⥶": "&ltlarr;",
                        "⩻": "&ltquest;",
                        "⦖": "&ltrPar;",
                        "◃": "&triangleleft;",
                        "⥊": "&lurdshar;",
                        "⥦": "&luruhar;",
                        "≨︀": "&lvnE;",
                        "∺": "&mDDot;",
                        "¯": "&strns;",
                        "♂": "&male;",
                        "✠": "&maltese;",
                        "▮": "&marker;",
                        "⨩": "&mcomma;",
                        м: "&mcy;",
                        "—": "&mdash;",
                        𝔪: "&mfr;",
                        "℧": "&mho;",
                        µ: "&micro;",
                        "⫰": "&midcir;",
                        "−": "&minus;",
                        "⨪": "&minusdu;",
                        "⫛": "&mlcp;",
                        "⊧": "&models;",
                        𝕞: "&mopf;",
                        𝓂: "&mscr;",
                        μ: "&mu;",
                        "⊸": "&mumap;",
                        "⋙̸": "&nGg;",
                        "≫⃒": "&nGt;",
                        "⇍": "&nlArr;",
                        "⇎": "&nhArr;",
                        "⋘̸": "&nLl;",
                        "≪⃒": "&nLt;",
                        "⇏": "&nrArr;",
                        "⊯": "&nVDash;",
                        "⊮": "&nVdash;",
                        ń: "&nacute;",
                        "∠⃒": "&nang;",
                        "⩰̸": "&napE;",
                        "≋̸": "&napid;",
                        ŉ: "&napos;",
                        "♮": "&natural;",
                        "⩃": "&ncap;",
                        ň: "&ncaron;",
                        ņ: "&ncedil;",
                        "⩭̸": "&ncongdot;",
                        "⩂": "&ncup;",
                        н: "&ncy;",
                        "–": "&ndash;",
                        "⇗": "&neArr;",
                        "⤤": "&nearhk;",
                        "≐̸": "&nedot;",
                        "⤨": "&toea;",
                        𝔫: "&nfr;",
                        "↮": "&nleftrightarrow;",
                        "⫲": "&nhpar;",
                        "⋼": "&nis;",
                        "⋺": "&nisd;",
                        њ: "&njcy;",
                        "≦̸": "&nleqq;",
                        "↚": "&nleftarrow;",
                        "‥": "&nldr;",
                        𝕟: "&nopf;",
                        "¬": "&not;",
                        "⋹̸": "&notinE;",
                        "⋵̸": "&notindot;",
                        "⋷": "&notinvb;",
                        "⋶": "&notinvc;",
                        "⋾": "&notnivb;",
                        "⋽": "&notnivc;",
                        "⫽⃥": "&nparsl;",
                        "∂̸": "&npart;",
                        "⨔": "&npolint;",
                        "↛": "&nrightarrow;",
                        "⤳̸": "&nrarrc;",
                        "↝̸": "&nrarrw;",
                        𝓃: "&nscr;",
                        "⊄": "&nsub;",
                        "⫅̸": "&nsubseteqq;",
                        "⊅": "&nsup;",
                        "⫆̸": "&nsupseteqq;",
                        ñ: "&ntilde;",
                        ν: "&nu;",
                        "#": "&num;",
                        "№": "&numero;",
                        " ": "&numsp;",
                        "⊭": "&nvDash;",
                        "⤄": "&nvHarr;",
                        "≍⃒": "&nvap;",
                        "⊬": "&nvdash;",
                        "≥⃒": "&nvge;",
                        ">⃒": "&nvgt;",
                        "⧞": "&nvinfin;",
                        "⤂": "&nvlArr;",
                        "≤⃒": "&nvle;",
                        "<⃒": "&nvlt;",
                        "⊴⃒": "&nvltrie;",
                        "⤃": "&nvrArr;",
                        "⊵⃒": "&nvrtrie;",
                        "∼⃒": "&nvsim;",
                        "⇖": "&nwArr;",
                        "⤣": "&nwarhk;",
                        "⤧": "&nwnear;",
                        ó: "&oacute;",
                        ô: "&ocirc;",
                        о: "&ocy;",
                        ő: "&odblac;",
                        "⨸": "&odiv;",
                        "⦼": "&odsold;",
                        œ: "&oelig;",
                        "⦿": "&ofcir;",
                        𝔬: "&ofr;",
                        "˛": "&ogon;",
                        ò: "&ograve;",
                        "⧁": "&ogt;",
                        "⦵": "&ohbar;",
                        "⦾": "&olcir;",
                        "⦻": "&olcross;",
                        "⧀": "&olt;",
                        ō: "&omacr;",
                        ω: "&omega;",
                        ο: "&omicron;",
                        "⦶": "&omid;",
                        𝕠: "&oopf;",
                        "⦷": "&opar;",
                        "⦹": "&operp;",
                        "∨": "&vee;",
                        "⩝": "&ord;",
                        ℴ: "&oscr;",
                        ª: "&ordf;",
                        º: "&ordm;",
                        "⊶": "&origof;",
                        "⩖": "&oror;",
                        "⩗": "&orslope;",
                        "⩛": "&orv;",
                        ø: "&oslash;",
                        "⊘": "&osol;",
                        õ: "&otilde;",
                        "⨶": "&otimesas;",
                        ö: "&ouml;",
                        "⌽": "&ovbar;",
                        "¶": "&para;",
                        "⫳": "&parsim;",
                        "⫽": "&parsl;",
                        п: "&pcy;",
                        "%": "&percnt;",
                        ".": "&period;",
                        "‰": "&permil;",
                        "‱": "&pertenk;",
                        𝔭: "&pfr;",
                        φ: "&phi;",
                        ϕ: "&varphi;",
                        "☎": "&phone;",
                        π: "&pi;",
                        ϖ: "&varpi;",
                        ℎ: "&planckh;",
                        "+": "&plus;",
                        "⨣": "&plusacir;",
                        "⨢": "&pluscir;",
                        "⨥": "&plusdu;",
                        "⩲": "&pluse;",
                        "⨦": "&plussim;",
                        "⨧": "&plustwo;",
                        "⨕": "&pointint;",
                        𝕡: "&popf;",
                        "£": "&pound;",
                        "⪳": "&prE;",
                        "⪷": "&precapprox;",
                        "⪹": "&prnap;",
                        "⪵": "&prnE;",
                        "⋨": "&prnsim;",
                        "′": "&prime;",
                        "⌮": "&profalar;",
                        "⌒": "&profline;",
                        "⌓": "&profsurf;",
                        "⊰": "&prurel;",
                        𝓅: "&pscr;",
                        ψ: "&psi;",
                        " ": "&puncsp;",
                        𝔮: "&qfr;",
                        𝕢: "&qopf;",
                        "⁗": "&qprime;",
                        𝓆: "&qscr;",
                        "⨖": "&quatint;",
                        "?": "&quest;",
                        "⤜": "&rAtail;",
                        "⥤": "&rHar;",
                        "∽̱": "&race;",
                        ŕ: "&racute;",
                        "⦳": "&raemptyv;",
                        "⦒": "&rangd;",
                        "⦥": "&range;",
                        "»": "&raquo;",
                        "⥵": "&rarrap;",
                        "⤠": "&rarrbfs;",
                        "⤳": "&rarrc;",
                        "⤞": "&rarrfs;",
                        "⥅": "&rarrpl;",
                        "⥴": "&rarrsim;",
                        "↣": "&rightarrowtail;",
                        "↝": "&rightsquigarrow;",
                        "⤚": "&ratail;",
                        "∶": "&ratio;",
                        "❳": "&rbbrk;",
                        "}": "&rcub;",
                        "]": "&rsqb;",
                        "⦌": "&rbrke;",
                        "⦎": "&rbrksld;",
                        "⦐": "&rbrkslu;",
                        ř: "&rcaron;",
                        ŗ: "&rcedil;",
                        р: "&rcy;",
                        "⤷": "&rdca;",
                        "⥩": "&rdldhar;",
                        "↳": "&rdsh;",
                        "▭": "&rect;",
                        "⥽": "&rfisht;",
                        𝔯: "&rfr;",
                        "⥬": "&rharul;",
                        ρ: "&rho;",
                        ϱ: "&varrho;",
                        "⇉": "&rrarr;",
                        "⋌": "&rthree;",
                        "˚": "&ring;",
                        "‏": "&rlm;",
                        "⎱": "&rmoustache;",
                        "⫮": "&rnmid;",
                        "⟭": "&roang;",
                        "⇾": "&roarr;",
                        "⦆": "&ropar;",
                        𝕣: "&ropf;",
                        "⨮": "&roplus;",
                        "⨵": "&rotimes;",
                        ")": "&rpar;",
                        "⦔": "&rpargt;",
                        "⨒": "&rppolint;",
                        "›": "&rsaquo;",
                        𝓇: "&rscr;",
                        "⋊": "&rtimes;",
                        "▹": "&triangleright;",
                        "⧎": "&rtriltri;",
                        "⥨": "&ruluhar;",
                        "℞": "&rx;",
                        ś: "&sacute;",
                        "⪴": "&scE;",
                        "⪸": "&succapprox;",
                        š: "&scaron;",
                        ş: "&scedil;",
                        ŝ: "&scirc;",
                        "⪶": "&succneqq;",
                        "⪺": "&succnapprox;",
                        "⋩": "&succnsim;",
                        "⨓": "&scpolint;",
                        с: "&scy;",
                        "⋅": "&sdot;",
                        "⩦": "&sdote;",
                        "⇘": "&seArr;",
                        "§": "&sect;",
                        ";": "&semi;",
                        "⤩": "&tosa;",
                        "✶": "&sext;",
                        𝔰: "&sfr;",
                        "♯": "&sharp;",
                        щ: "&shchcy;",
                        ш: "&shcy;",
                        "­": "&shy;",
                        σ: "&sigma;",
                        ς: "&varsigma;",
                        "⩪": "&simdot;",
                        "⪞": "&simg;",
                        "⪠": "&simgE;",
                        "⪝": "&siml;",
                        "⪟": "&simlE;",
                        "≆": "&simne;",
                        "⨤": "&simplus;",
                        "⥲": "&simrarr;",
                        "⨳": "&smashp;",
                        "⧤": "&smeparsl;",
                        "⌣": "&ssmile;",
                        "⪪": "&smt;",
                        "⪬": "&smte;",
                        "⪬︀": "&smtes;",
                        ь: "&softcy;",
                        "/": "&sol;",
                        "⧄": "&solb;",
                        "⌿": "&solbar;",
                        𝕤: "&sopf;",
                        "♠": "&spadesuit;",
                        "⊓︀": "&sqcaps;",
                        "⊔︀": "&sqcups;",
                        𝓈: "&sscr;",
                        "☆": "&star;",
                        "⊂": "&subset;",
                        "⫅": "&subseteqq;",
                        "⪽": "&subdot;",
                        "⫃": "&subedot;",
                        "⫁": "&submult;",
                        "⫋": "&subsetneqq;",
                        "⊊": "&subsetneq;",
                        "⪿": "&subplus;",
                        "⥹": "&subrarr;",
                        "⫇": "&subsim;",
                        "⫕": "&subsub;",
                        "⫓": "&subsup;",
                        "♪": "&sung;",
                        "¹": "&sup1;",
                        "²": "&sup2;",
                        "³": "&sup3;",
                        "⫆": "&supseteqq;",
                        "⪾": "&supdot;",
                        "⫘": "&supdsub;",
                        "⫄": "&supedot;",
                        "⟉": "&suphsol;",
                        "⫗": "&suphsub;",
                        "⥻": "&suplarr;",
                        "⫂": "&supmult;",
                        "⫌": "&supsetneqq;",
                        "⊋": "&supsetneq;",
                        "⫀": "&supplus;",
                        "⫈": "&supsim;",
                        "⫔": "&supsub;",
                        "⫖": "&supsup;",
                        "⇙": "&swArr;",
                        "⤪": "&swnwar;",
                        ß: "&szlig;",
                        "⌖": "&target;",
                        τ: "&tau;",
                        ť: "&tcaron;",
                        ţ: "&tcedil;",
                        т: "&tcy;",
                        "⌕": "&telrec;",
                        𝔱: "&tfr;",
                        θ: "&theta;",
                        ϑ: "&vartheta;",
                        þ: "&thorn;",
                        "×": "&times;",
                        "⨱": "&timesbar;",
                        "⨰": "&timesd;",
                        "⌶": "&topbot;",
                        "⫱": "&topcir;",
                        𝕥: "&topf;",
                        "⫚": "&topfork;",
                        "‴": "&tprime;",
                        "▵": "&utri;",
                        "≜": "&trie;",
                        "◬": "&tridot;",
                        "⨺": "&triminus;",
                        "⨹": "&triplus;",
                        "⧍": "&trisb;",
                        "⨻": "&tritime;",
                        "⏢": "&trpezium;",
                        𝓉: "&tscr;",
                        ц: "&tscy;",
                        ћ: "&tshcy;",
                        ŧ: "&tstrok;",
                        "⥣": "&uHar;",
                        ú: "&uacute;",
                        ў: "&ubrcy;",
                        ŭ: "&ubreve;",
                        û: "&ucirc;",
                        у: "&ucy;",
                        ű: "&udblac;",
                        "⥾": "&ufisht;",
                        𝔲: "&ufr;",
                        ù: "&ugrave;",
                        "▀": "&uhblk;",
                        "⌜": "&ulcorner;",
                        "⌏": "&ulcrop;",
                        "◸": "&ultri;",
                        ū: "&umacr;",
                        ų: "&uogon;",
                        𝕦: "&uopf;",
                        υ: "&upsilon;",
                        "⇈": "&uuarr;",
                        "⌝": "&urcorner;",
                        "⌎": "&urcrop;",
                        ů: "&uring;",
                        "◹": "&urtri;",
                        𝓊: "&uscr;",
                        "⋰": "&utdot;",
                        ũ: "&utilde;",
                        ü: "&uuml;",
                        "⦧": "&uwangle;",
                        "⫨": "&vBar;",
                        "⫩": "&vBarv;",
                        "⦜": "&vangrt;",
                        "⊊︀": "&vsubne;",
                        "⫋︀": "&vsubnE;",
                        "⊋︀": "&vsupne;",
                        "⫌︀": "&vsupnE;",
                        в: "&vcy;",
                        "⊻": "&veebar;",
                        "≚": "&veeeq;",
                        "⋮": "&vellip;",
                        𝔳: "&vfr;",
                        𝕧: "&vopf;",
                        𝓋: "&vscr;",
                        "⦚": "&vzigzag;",
                        ŵ: "&wcirc;",
                        "⩟": "&wedbar;",
                        "≙": "&wedgeq;",
                        ℘: "&wp;",
                        𝔴: "&wfr;",
                        𝕨: "&wopf;",
                        𝓌: "&wscr;",
                        𝔵: "&xfr;",
                        ξ: "&xi;",
                        "⋻": "&xnis;",
                        𝕩: "&xopf;",
                        𝓍: "&xscr;",
                        ý: "&yacute;",
                        я: "&yacy;",
                        ŷ: "&ycirc;",
                        ы: "&ycy;",
                        "¥": "&yen;",
                        𝔶: "&yfr;",
                        ї: "&yicy;",
                        𝕪: "&yopf;",
                        𝓎: "&yscr;",
                        ю: "&yucy;",
                        ÿ: "&yuml;",
                        ź: "&zacute;",
                        ž: "&zcaron;",
                        з: "&zcy;",
                        ż: "&zdot;",
                        ζ: "&zeta;",
                        𝔷: "&zfr;",
                        ж: "&zhcy;",
                        "⇝": "&zigrarr;",
                        𝕫: "&zopf;",
                        𝓏: "&zscr;",
                        "‍": "&zwj;",
                        "‌": "&zwnj;"
                    }
                }
            }
        }
        ,
        "./node_modules/html-entities/lib/numeric-unicode-map.js": (e, r) => {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.numericUnicodeMap = {
                0: 65533,
                128: 8364,
                130: 8218,
                131: 402,
                132: 8222,
                133: 8230,
                134: 8224,
                135: 8225,
                136: 710,
                137: 8240,
                138: 352,
                139: 8249,
                140: 338,
                142: 381,
                145: 8216,
                146: 8217,
                147: 8220,
                148: 8221,
                149: 8226,
                150: 8211,
                151: 8212,
                152: 732,
                153: 8482,
                154: 353,
                155: 8250,
                156: 339,
                158: 382,
                159: 376
            }
        }
        ,
        "./node_modules/html-entities/lib/surrogate-pairs.js": (e, r) => {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.fromCodePoint = String.fromCodePoint || function(e) {
                return String.fromCharCode(Math.floor((e - 65536) / 1024) + 55296, (e - 65536) % 1024 + 56320)
            }
            ,
            r.getCodePoint = String.prototype.codePointAt ? function(e, r) {
                return e.codePointAt(r)
            }
            : function(e, r) {
                return 1024 * (e.charCodeAt(r) - 55296) + e.charCodeAt(r + 1) - 56320 + 65536
            }
            ,
            r.highSurrogateFrom = 55296,
            r.highSurrogateTo = 56319
        }
        ,
        "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js": (e, r, t) => {
            "use strict";
            var o = t("./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js")
              , n = Object.create(null)
              , i = "undefined" == typeof document
              , a = Array.prototype.forEach;
            function noop() {}
            function updateCss(e, r) {
                if (!r) {
                    if (!e.href)
                        return;
                    r = e.href.split("?")[0]
                }
                if (isUrlRequest(r) && !1 !== e.isLoaded && r && r.indexOf(".css") > -1) {
                    e.visited = !0;
                    var t = e.cloneNode();
                    t.isLoaded = !1,
                    t.addEventListener("load", (function() {
                        t.isLoaded || (t.isLoaded = !0,
                        e.parentNode.removeChild(e))
                    }
                    )),
                    t.addEventListener("error", (function() {
                        t.isLoaded || (t.isLoaded = !0,
                        e.parentNode.removeChild(e))
                    }
                    )),
                    t.href = "".concat(r, "?").concat(Date.now()),
                    e.nextSibling ? e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode.appendChild(t)
                }
            }
            function reloadStyle(e) {
                if (!e)
                    return !1;
                var r = document.querySelectorAll("link")
                  , t = !1;
                return a.call(r, (function(r) {
                    if (r.href) {
                        var n = function getReloadUrl(e, r) {
                            var t;
                            return e = o(e),
                            r.some((function(o) {
                                e.indexOf(r) > -1 && (t = o)
                            }
                            )),
                            t
                        }(r.href, e);
                        isUrlRequest(n) && !0 !== r.visited && n && (updateCss(r, n),
                        t = !0)
                    }
                }
                )),
                t
            }
            function reloadAll() {
                var e = document.querySelectorAll("link");
                a.call(e, (function(e) {
                    !0 !== e.visited && updateCss(e)
                }
                ))
            }
            function isUrlRequest(e) {
                return !!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e)
            }
            e.exports = function(e, r) {
                if (i)
                    return console.log("no window.document found, will not HMR CSS"),
                    noop;
                var t = function getCurrentScriptUrl(e) {
                    var r = n[e];
                    if (!r) {
                        if (document.currentScript)
                            r = document.currentScript.src;
                        else {
                            var t = document.getElementsByTagName("script")
                              , i = t[t.length - 1];
                            i && (r = i.src)
                        }
                        n[e] = r
                    }
                    return function(e) {
                        if (!r)
                            return null;
                        var t = r.split(/([^\\/]+)\.js$/)
                          , n = t && t[1];
                        return n && e ? e.split(",").map((function(e) {
                            var t = new RegExp("".concat(n, "\\.js$"),"g");
                            return o(r.replace(t, "".concat(e.replace(/{fileName}/g, n), ".css")))
                        }
                        )) : [r.replace(".js", ".css")]
                    }
                }(e);
                return function debounce(e, r) {
                    var t = 0;
                    return function() {
                        var o = this
                          , n = arguments;
                        clearTimeout(t),
                        t = setTimeout((function functionCall() {
                            return e.apply(o, n)
                        }
                        ), r)
                    }
                }((function update() {
                    var e = t(r.filename)
                      , o = reloadStyle(e);
                    if (r.locals)
                        return console.log("[HMR] Detected local css modules. Reload all css"),
                        void reloadAll();
                    o ? console.log("[HMR] css reload %s", e.join(" ")) : (console.log("[HMR] Reload all css"),
                    reloadAll())
                }
                ), 50)
            }
        }
        ,
        "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js": e => {
            "use strict";
            e.exports = function(e) {
                if (e = e.trim(),
                /^data:/i.test(e))
                    return e;
                var r = -1 !== e.indexOf("//") ? e.split("//")[0] + "//" : ""
                  , t = e.replace(new RegExp(r,"i"), "").split("/")
                  , o = t[0].toLowerCase().replace(/\.$/, "");
                return t[0] = "",
                r + o + function normalizeUrl(e) {
                    return e.reduce((function(e, r) {
                        switch (r) {
                        case "..":
                            e.pop();
                            break;
                        case ".":
                            break;
                        default:
                            e.push(r)
                        }
                        return e
                    }
                    ), []).join("/")
                }(t)
            }
        }
        ,
        "./src/scss/styles.scss": (e, r, t) => {
            "use strict";
            t.r(r);
            var o = t("./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(e.id, {
                locals: !1
            });
            e.hot.dispose(o),
            e.hot.accept(void 0, o)
        }
        ,
        "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                default: () => n
            });
            var o = t("./node_modules/webpack-dev-server/client/utils/log.js");
            function _defineProperties(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, (n = o.key,
                    i = void 0,
                    "symbol" == typeof (i = function _toPrimitive(e, r) {
                        if ("object" != typeof e || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" != typeof o)
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(n, "string")) ? i : String(i)), o)
                }
                var n, i
            }
            var n = function() {
                function WebSocketClient(e) {
                    !function _classCallCheck(e, r) {
                        if (!(e instanceof r))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, WebSocketClient),
                    this.client = new WebSocket(e),
                    this.client.onerror = function(e) {
                        o.log.error(e)
                    }
                }
                return function _createClass(e, r, t) {
                    return r && _defineProperties(e.prototype, r),
                    t && _defineProperties(e, t),
                    Object.defineProperty(e, "prototype", {
                        writable: !1
                    }),
                    e
                }(WebSocketClient, [{
                    key: "onOpen",
                    value: function onOpen(e) {
                        this.client.onopen = e
                    }
                }, {
                    key: "onClose",
                    value: function onClose(e) {
                        this.client.onclose = e
                    }
                }, {
                    key: "onMessage",
                    value: function onMessage(e) {
                        this.client.onmessage = function(r) {
                            e(r.data)
                        }
                    }
                }]),
                WebSocketClient
            }()
        }
        ,
        "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=localhost&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true": (e, r, t) => {
            "use strict";
            t.r(r);
            var o = t("./node_modules/webpack/hot/log.js")
              , n = t.n(o)
              , i = t("./node_modules/webpack-dev-server/client/utils/stripAnsi.js")
              , a = t("./node_modules/webpack-dev-server/client/utils/parseURL.js")
              , s = t("./node_modules/webpack-dev-server/client/socket.js")
              , c = t("./node_modules/webpack-dev-server/client/overlay.js")
              , l = t("./node_modules/webpack-dev-server/client/utils/log.js")
              , u = t("./node_modules/webpack-dev-server/client/utils/sendMessage.js")
              , p = t("./node_modules/webpack-dev-server/client/utils/reloadApp.js")
              , d = t("./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
            function ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }
                    ))),
                    t.push.apply(t, o)
                }
                return t
            }
            function _defineProperty(e, r, t) {
                return (r = function _toPropertyKey(e) {
                    var r = function _toPrimitive(e, r) {
                        if ("object" != typeof e || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" != typeof o)
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == typeof r ? r : String(r)
                }(r))in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t,
                e
            }
            var f = {
                isUnloading: !1,
                currentHash: t.h()
            }
              , m = {
                hot: !1,
                liveReload: !1,
                progress: !1,
                overlay: !1
            }
              , g = (0,
            a.default)("?protocol=ws%3A&hostname=localhost&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true")
              , v = {
                "Hot Module Replacement": !1,
                "Live Reloading": !1,
                Progress: !1,
                Overlay: !1
            };
            if ("true" === g.hot && (m.hot = !0,
            v["Hot Module Replacement"] = !0),
            "true" === g["live-reload"] && (m.liveReload = !0,
            v["Live Reloading"] = !0),
            "true" === g.progress && (m.progress = !0,
            v.Progress = !0),
            g.overlay) {
                try {
                    m.overlay = JSON.parse(g.overlay)
                } catch (e) {
                    l.log.error("Error parsing overlay options from resource query:", e)
                }
                "object" == typeof m.overlay && (m.overlay = function _objectSpread(e) {
                    for (var r = 1; r < arguments.length; r++) {
                        var t = null != arguments[r] ? arguments[r] : {};
                        r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                            _defineProperty(e, r, t[r])
                        }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                        }
                        ))
                    }
                    return e
                }({
                    errors: !0,
                    warnings: !0,
                    runtimeErrors: !0
                }, m.overlay)),
                v.Overlay = !0
            }
            function setAllLogLevel(e) {
                n().setLogLevel("verbose" === e || "log" === e ? "info" : e),
                (0,
                l.setLogLevel)(e)
            }
            g.logging && (m.logging = g.logging),
            void 0 !== g.reconnect && (m.reconnect = Number(g.reconnect)),
            m.logging && setAllLogLevel(m.logging),
            (0,
            l.logEnabledFeatures)(v),
            self.addEventListener("beforeunload", (function() {
                f.isUnloading = !0
            }
            ));
            var y = "undefined" != typeof window ? (0,
            c.createOverlay)("object" == typeof m.overlay ? {
                trustedTypesPolicyName: m.overlay.trustedTypesPolicyName,
                catchRuntimeError: m.overlay.runtimeErrors
            } : {
                trustedTypesPolicyName: !1,
                catchRuntimeError: m.overlay
            }) : {
                send: function send() {}
            }
              , h = {
                hot: function hot() {
                    "false" !== g.hot && (m.hot = !0)
                },
                liveReload: function liveReload() {
                    "false" !== g["live-reload"] && (m.liveReload = !0)
                },
                invalid: function invalid() {
                    l.log.info("App updated. Recompiling..."),
                    m.overlay && y.send({
                        type: "DISMISS"
                    }),
                    (0,
                    u.default)("Invalid")
                },
                hash: function hash(e) {
                    f.previousHash = f.currentHash,
                    f.currentHash = e
                },
                logging: setAllLogLevel,
                overlay: function overlay(e) {
                    "undefined" != typeof document && (m.overlay = e)
                },
                reconnect: function reconnect(e) {
                    "false" !== g.reconnect && (m.reconnect = e)
                },
                progress: function progress(e) {
                    m.progress = e
                },
                "progress-update": function progressUpdate(e) {
                    m.progress && l.log.info("".concat(e.pluginName ? "[".concat(e.pluginName, "] ") : "").concat(e.percent, "% - ").concat(e.msg, ".")),
                    (0,
                    u.default)("Progress", e)
                },
                "still-ok": function stillOk() {
                    l.log.info("Nothing changed."),
                    m.overlay && y.send({
                        type: "DISMISS"
                    }),
                    (0,
                    u.default)("StillOk")
                },
                ok: function ok() {
                    (0,
                    u.default)("Ok"),
                    m.overlay && y.send({
                        type: "DISMISS"
                    }),
                    (0,
                    p.default)(m, f)
                },
                "content-changed": function contentChanged(e) {
                    l.log.info("".concat(e ? '"'.concat(e, '"') : "Content", " from static directory was changed. Reloading...")),
                    self.location.reload()
                },
                "static-changed": function staticChanged(e) {
                    l.log.info("".concat(e ? '"'.concat(e, '"') : "Content", " from static directory was changed. Reloading...")),
                    self.location.reload()
                },
                warnings: function warnings(e, r) {
                    l.log.warn("Warnings while compiling.");
                    var t = e.map((function(e) {
                        var r = (0,
                        c.formatProblem)("warning", e)
                          , t = r.header
                          , o = r.body;
                        return "".concat(t, "\n").concat((0,
                        i.default)(o))
                    }
                    ));
                    (0,
                    u.default)("Warnings", t);
                    for (var o = 0; o < t.length; o++)
                        l.log.warn(t[o]);
                    ("boolean" == typeof m.overlay ? m.overlay : m.overlay && m.overlay.warnings) && y.send({
                        type: "BUILD_ERROR",
                        level: "warning",
                        messages: e
                    }),
                    r && r.preventReloading || (0,
                    p.default)(m, f)
                },
                errors: function errors(e) {
                    l.log.error("Errors while compiling. Reload prevented.");
                    var r = e.map((function(e) {
                        var r = (0,
                        c.formatProblem)("error", e)
                          , t = r.header
                          , o = r.body;
                        return "".concat(t, "\n").concat((0,
                        i.default)(o))
                    }
                    ));
                    (0,
                    u.default)("Errors", r);
                    for (var t = 0; t < r.length; t++)
                        l.log.error(r[t]);
                    ("boolean" == typeof m.overlay ? m.overlay : m.overlay && m.overlay.errors) && y.send({
                        type: "BUILD_ERROR",
                        level: "error",
                        messages: e
                    })
                },
                error: function error(e) {
                    l.log.error(e)
                },
                close: function close() {
                    l.log.info("Disconnected!"),
                    m.overlay && y.send({
                        type: "DISMISS"
                    }),
                    (0,
                    u.default)("Close")
                }
            }
              , b = (0,
            d.default)(g);
            (0,
            s.default)(b, h, m.reconnect)
        }
        ,
        "./node_modules/webpack-dev-server/client/modules/logger/index.js": (e, r) => {
            !function() {
                "use strict";
                var e = {
                    "./client-src/modules/logger/SyncBailHookFake.js": function(e) {
                        e.exports = function clientTapableSyncBailHook() {
                            return {
                                call: function call() {}
                            }
                        }
                    },
                    "./node_modules/webpack/lib/logging/Logger.js": function(e, r) {
                        function _toConsumableArray(e) {
                            return function _arrayWithoutHoles(e) {
                                if (Array.isArray(e))
                                    return _arrayLikeToArray(e)
                            }(e) || function _iterableToArray(e) {
                                if (void 0 !== ("undefined" != typeof Symbol ? Symbol : function(e) {
                                    return e
                                }
                                ) && null != e[("undefined" != typeof Symbol ? Symbol : function(e) {
                                    return e
                                }
                                ).iterator] || null != e["@@iterator"])
                                    return Array.from(e)
                            }(e) || function _unsupportedIterableToArray(e, r) {
                                if (!e)
                                    return;
                                if ("string" == typeof e)
                                    return _arrayLikeToArray(e, r);
                                var t = Object.prototype.toString.call(e).slice(8, -1);
                                "Object" === t && e.constructor && (t = e.constructor.name);
                                if ("Map" === t || "Set" === t)
                                    return Array.from(e);
                                if ("Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
                                    return _arrayLikeToArray(e, r)
                            }(e) || function _nonIterableSpread() {
                                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }()
                        }
                        function _arrayLikeToArray(e, r) {
                            (null == r || r > e.length) && (r = e.length);
                            for (var t = 0, o = new Array(r); t < r; t++)
                                o[t] = e[t];
                            return o
                        }
                        function _defineProperties(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var o = r[t];
                                o.enumerable = o.enumerable || !1,
                                o.configurable = !0,
                                "value"in o && (o.writable = !0),
                                Object.defineProperty(e, (n = o.key,
                                i = void 0,
                                i = function _toPrimitive(e, r) {
                                    if ("object" != typeof e || null === e)
                                        return e;
                                    var t = e[("undefined" != typeof Symbol ? Symbol : function(e) {
                                        return e
                                    }
                                    ).toPrimitive];
                                    if (void 0 !== t) {
                                        var o = t.call(e, r || "default");
                                        if ("object" != typeof o)
                                            return o;
                                        throw new TypeError("@@toPrimitive must return a primitive value.")
                                    }
                                    return ("string" === r ? String : Number)(e)
                                }(n, "string"),
                                "symbol" == typeof i ? i : String(i)), o)
                            }
                            var n, i
                        }
                        var t = Object.freeze({
                            error: "error",
                            warn: "warn",
                            info: "info",
                            log: "log",
                            debug: "debug",
                            trace: "trace",
                            group: "group",
                            groupCollapsed: "groupCollapsed",
                            groupEnd: "groupEnd",
                            profile: "profile",
                            profileEnd: "profileEnd",
                            time: "time",
                            clear: "clear",
                            status: "status"
                        });
                        r.LogType = t;
                        var o = ("undefined" != typeof Symbol ? Symbol : function(e) {
                            return e
                        }
                        )("webpack logger raw log method")
                          , n = ("undefined" != typeof Symbol ? Symbol : function(e) {
                            return e
                        }
                        )("webpack logger times")
                          , i = ("undefined" != typeof Symbol ? Symbol : function(e) {
                            return e
                        }
                        )("webpack logger aggregated times")
                          , a = function() {
                            function WebpackLogger(e, r) {
                                !function _classCallCheck(e, r) {
                                    if (!(e instanceof r))
                                        throw new TypeError("Cannot call a class as a function")
                                }(this, WebpackLogger),
                                this[o] = e,
                                this.getChildLogger = r
                            }
                            return function _createClass(e, r, t) {
                                return r && _defineProperties(e.prototype, r),
                                t && _defineProperties(e, t),
                                Object.defineProperty(e, "prototype", {
                                    writable: !1
                                }),
                                e
                            }(WebpackLogger, [{
                                key: "error",
                                value: function error() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.error, r)
                                }
                            }, {
                                key: "warn",
                                value: function warn() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.warn, r)
                                }
                            }, {
                                key: "info",
                                value: function info() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.info, r)
                                }
                            }, {
                                key: "log",
                                value: function log() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.log, r)
                                }
                            }, {
                                key: "debug",
                                value: function debug() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.debug, r)
                                }
                            }, {
                                key: "assert",
                                value: function assert(e) {
                                    if (!e) {
                                        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
                                            n[i - 1] = arguments[i];
                                        this[o](t.error, n)
                                    }
                                }
                            }, {
                                key: "trace",
                                value: function trace() {
                                    this[o](t.trace, ["Trace"])
                                }
                            }, {
                                key: "clear",
                                value: function clear() {
                                    this[o](t.clear)
                                }
                            }, {
                                key: "status",
                                value: function status() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.status, r)
                                }
                            }, {
                                key: "group",
                                value: function group() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.group, r)
                                }
                            }, {
                                key: "groupCollapsed",
                                value: function groupCollapsed() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.groupCollapsed, r)
                                }
                            }, {
                                key: "groupEnd",
                                value: function groupEnd() {
                                    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                                        r[n] = arguments[n];
                                    this[o](t.groupEnd, r)
                                }
                            }, {
                                key: "profile",
                                value: function profile(e) {
                                    this[o](t.profile, [e])
                                }
                            }, {
                                key: "profileEnd",
                                value: function profileEnd(e) {
                                    this[o](t.profileEnd, [e])
                                }
                            }, {
                                key: "time",
                                value: function time(e) {
                                    this[n] = this[n] || new Map,
                                    this[n].set(e, process.hrtime())
                                }
                            }, {
                                key: "timeLog",
                                value: function timeLog(e) {
                                    var r = this[n] && this[n].get(e);
                                    if (!r)
                                        throw new Error("No such label '".concat(e, "' for WebpackLogger.timeLog()"));
                                    var i = process.hrtime(r);
                                    this[o](t.time, [e].concat(_toConsumableArray(i)))
                                }
                            }, {
                                key: "timeEnd",
                                value: function timeEnd(e) {
                                    var r = this[n] && this[n].get(e);
                                    if (!r)
                                        throw new Error("No such label '".concat(e, "' for WebpackLogger.timeEnd()"));
                                    var i = process.hrtime(r);
                                    this[n].delete(e),
                                    this[o](t.time, [e].concat(_toConsumableArray(i)))
                                }
                            }, {
                                key: "timeAggregate",
                                value: function timeAggregate(e) {
                                    var r = this[n] && this[n].get(e);
                                    if (!r)
                                        throw new Error("No such label '".concat(e, "' for WebpackLogger.timeAggregate()"));
                                    var t = process.hrtime(r);
                                    this[n].delete(e),
                                    this[i] = this[i] || new Map;
                                    var o = this[i].get(e);
                                    void 0 !== o && (t[1] + o[1] > 1e9 ? (t[0] += o[0] + 1,
                                    t[1] = t[1] - 1e9 + o[1]) : (t[0] += o[0],
                                    t[1] += o[1])),
                                    this[i].set(e, t)
                                }
                            }, {
                                key: "timeAggregateEnd",
                                value: function timeAggregateEnd(e) {
                                    if (void 0 !== this[i]) {
                                        var r = this[i].get(e);
                                        void 0 !== r && (this[i].delete(e),
                                        this[o](t.time, [e].concat(_toConsumableArray(r))))
                                    }
                                }
                            }]),
                            WebpackLogger
                        }();
                        r.Logger = a
                    },
                    "./node_modules/webpack/lib/logging/createConsoleLogger.js": function(e, r, t) {
                        function _toConsumableArray(e) {
                            return function _arrayWithoutHoles(e) {
                                if (Array.isArray(e))
                                    return _arrayLikeToArray(e)
                            }(e) || function _iterableToArray(e) {
                                if (void 0 !== ("undefined" != typeof Symbol ? Symbol : function(e) {
                                    return e
                                }
                                ) && null != e[("undefined" != typeof Symbol ? Symbol : function(e) {
                                    return e
                                }
                                ).iterator] || null != e["@@iterator"])
                                    return Array.from(e)
                            }(e) || function _unsupportedIterableToArray(e, r) {
                                if (!e)
                                    return;
                                if ("string" == typeof e)
                                    return _arrayLikeToArray(e, r);
                                var t = Object.prototype.toString.call(e).slice(8, -1);
                                "Object" === t && e.constructor && (t = e.constructor.name);
                                if ("Map" === t || "Set" === t)
                                    return Array.from(e);
                                if ("Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
                                    return _arrayLikeToArray(e, r)
                            }(e) || function _nonIterableSpread() {
                                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }()
                        }
                        function _arrayLikeToArray(e, r) {
                            (null == r || r > e.length) && (r = e.length);
                            for (var t = 0, o = new Array(r); t < r; t++)
                                o[t] = e[t];
                            return o
                        }
                        var o = t("./node_modules/webpack/lib/logging/Logger.js").LogType
                          , n = function filterToFunction(e) {
                            if ("string" == typeof e) {
                                var r = new RegExp("[\\\\/]".concat(e.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
                                return function(e) {
                                    return r.test(e)
                                }
                            }
                            return e && "object" == typeof e && "function" == typeof e.test ? function(r) {
                                return e.test(r)
                            }
                            : "function" == typeof e ? e : "boolean" == typeof e ? function() {
                                return e
                            }
                            : void 0
                        }
                          , i = {
                            none: 6,
                            false: 6,
                            error: 5,
                            warn: 4,
                            info: 3,
                            log: 2,
                            true: 2,
                            verbose: 1
                        };
                        e.exports = function(e) {
                            var r = e.level
                              , t = void 0 === r ? "info" : r
                              , a = e.debug
                              , s = void 0 !== a && a
                              , c = e.console
                              , l = "boolean" == typeof s ? [function() {
                                return s
                            }
                            ] : [].concat(s).map(n)
                              , u = i["".concat(t)] || 0;
                            return function logger(e, r, t) {
                                var n = function labeledArgs() {
                                    return Array.isArray(t) ? t.length > 0 && "string" == typeof t[0] ? ["[".concat(e, "] ").concat(t[0])].concat(_toConsumableArray(t.slice(1))) : ["[".concat(e, "]")].concat(_toConsumableArray(t)) : []
                                }
                                  , a = l.some((function(r) {
                                    return r(e)
                                }
                                ));
                                switch (r) {
                                case o.debug:
                                    if (!a)
                                        return;
                                    "function" == typeof c.debug ? c.debug.apply(c, _toConsumableArray(n())) : c.log.apply(c, _toConsumableArray(n()));
                                    break;
                                case o.log:
                                    if (!a && u > i.log)
                                        return;
                                    c.log.apply(c, _toConsumableArray(n()));
                                    break;
                                case o.info:
                                    if (!a && u > i.info)
                                        return;
                                    c.info.apply(c, _toConsumableArray(n()));
                                    break;
                                case o.warn:
                                    if (!a && u > i.warn)
                                        return;
                                    c.warn.apply(c, _toConsumableArray(n()));
                                    break;
                                case o.error:
                                    if (!a && u > i.error)
                                        return;
                                    c.error.apply(c, _toConsumableArray(n()));
                                    break;
                                case o.trace:
                                    if (!a)
                                        return;
                                    c.trace();
                                    break;
                                case o.groupCollapsed:
                                    if (!a && u > i.log)
                                        return;
                                    if (!a && u > i.verbose) {
                                        "function" == typeof c.groupCollapsed ? c.groupCollapsed.apply(c, _toConsumableArray(n())) : c.log.apply(c, _toConsumableArray(n()));
                                        break
                                    }
                                case o.group:
                                    if (!a && u > i.log)
                                        return;
                                    "function" == typeof c.group ? c.group.apply(c, _toConsumableArray(n())) : c.log.apply(c, _toConsumableArray(n()));
                                    break;
                                case o.groupEnd:
                                    if (!a && u > i.log)
                                        return;
                                    "function" == typeof c.groupEnd && c.groupEnd();
                                    break;
                                case o.time:
                                    if (!a && u > i.log)
                                        return;
                                    var s = 1e3 * t[1] + t[2] / 1e6
                                      , p = "[".concat(e, "] ").concat(t[0], ": ").concat(s, " ms");
                                    "function" == typeof c.logTime ? c.logTime(p) : c.log(p);
                                    break;
                                case o.profile:
                                    "function" == typeof c.profile && c.profile.apply(c, _toConsumableArray(n()));
                                    break;
                                case o.profileEnd:
                                    "function" == typeof c.profileEnd && c.profileEnd.apply(c, _toConsumableArray(n()));
                                    break;
                                case o.clear:
                                    if (!a && u > i.log)
                                        return;
                                    "function" == typeof c.clear && c.clear();
                                    break;
                                case o.status:
                                    if (!a && u > i.info)
                                        return;
                                    "function" == typeof c.status ? 0 === t.length ? c.status() : c.status.apply(c, _toConsumableArray(n())) : 0 !== t.length && c.info.apply(c, _toConsumableArray(n()));
                                    break;
                                default:
                                    throw new Error("Unexpected LogType ".concat(r))
                                }
                            }
                        }
                    },
                    "./node_modules/webpack/lib/logging/runtime.js": function(e, r, t) {
                        function _extends() {
                            return _extends = Object.assign ? Object.assign.bind() : function(e) {
                                for (var r = 1; r < arguments.length; r++) {
                                    var t = arguments[r];
                                    for (var o in t)
                                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                                }
                                return e
                            }
                            ,
                            _extends.apply(this, arguments)
                        }
                        var o = t("./client-src/modules/logger/SyncBailHookFake.js")
                          , n = t("./node_modules/webpack/lib/logging/Logger.js").Logger
                          , i = t("./node_modules/webpack/lib/logging/createConsoleLogger.js")
                          , a = {
                            level: "info",
                            debug: !1,
                            console
                        }
                          , s = i(a);
                        r.getLogger = function(e) {
                            return new n((function(t, o) {
                                void 0 === r.hooks.log.call(e, t, o) && s(e, t, o)
                            }
                            ),(function(t) {
                                return r.getLogger("".concat(e, "/").concat(t))
                            }
                            ))
                        }
                        ,
                        r.configureDefaultLogger = function(e) {
                            _extends(a, e),
                            s = i(a)
                        }
                        ,
                        r.hooks = {
                            log: new o(["origin", "type", "args"])
                        }
                    }
                }
                  , t = {};
                function __nested_webpack_require_23461__(r) {
                    var o = t[r];
                    if (void 0 !== o)
                        return o.exports;
                    var n = t[r] = {
                        exports: {}
                    };
                    return e[r](n, n.exports, __nested_webpack_require_23461__),
                    n.exports
                }
                __nested_webpack_require_23461__.d = function(e, r) {
                    for (var t in r)
                        __nested_webpack_require_23461__.o(r, t) && !__nested_webpack_require_23461__.o(e, t) && Object.defineProperty(e, t, {
                            enumerable: !0,
                            get: r[t]
                        })
                }
                ,
                __nested_webpack_require_23461__.o = function(e, r) {
                    return Object.prototype.hasOwnProperty.call(e, r)
                }
                ,
                __nested_webpack_require_23461__.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }),
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }
                ;
                var o = {};
                !function() {
                    __nested_webpack_require_23461__.r(o),
                    __nested_webpack_require_23461__.d(o, {
                        default: function() {
                            return e
                        }
                    });
                    var e = __nested_webpack_require_23461__("./node_modules/webpack/lib/logging/runtime.js")
                }();
                var n = r;
                for (var i in o)
                    n[i] = o[i];
                o.__esModule && Object.defineProperty(n, "__esModule", {
                    value: !0
                })
            }()
        }
        ,
        "./node_modules/webpack-dev-server/client/overlay.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                createOverlay: () => l,
                formatProblem: () => formatProblem
            });
            var o = t("./node_modules/ansi-html-community/index.js")
              , n = t.n(o)
              , i = t("./node_modules/html-entities/lib/index.js")
              , a = t("./node_modules/webpack-dev-server/client/overlay/runtime-error.js")
              , s = t("./node_modules/webpack-dev-server/client/overlay/state-machine.js")
              , c = t("./node_modules/webpack-dev-server/client/overlay/styles.js");
            function ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }
                    ))),
                    t.push.apply(t, o)
                }
                return t
            }
            function _objectSpread(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                        _defineProperty(e, r, t[r])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                    }
                    ))
                }
                return e
            }
            function _defineProperty(e, r, t) {
                return (r = function _toPropertyKey(e) {
                    var r = function _toPrimitive(e, r) {
                        if ("object" != typeof e || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" != typeof o)
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == typeof r ? r : String(r)
                }(r))in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t,
                e
            }
            function formatProblem(e, r) {
                var t = "warning" === e ? "WARNING" : "ERROR"
                  , o = "";
                if ("string" == typeof r)
                    o += r;
                else {
                    var n = r.file || ""
                      , i = r.moduleName ? -1 !== r.moduleName.indexOf("!") ? "".concat(r.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(r.moduleName, ")") : "".concat(r.moduleName) : ""
                      , a = r.loc;
                    t += "".concat(i || n ? " in ".concat(i ? "".concat(i).concat(n ? " (".concat(n, ")") : "") : n).concat(a ? " ".concat(a) : "") : ""),
                    o += r.message || ""
                }
                return Array.isArray(r.stack) && r.stack.forEach((function(e) {
                    "string" == typeof e && (o += "\r\n".concat(e))
                }
                )),
                {
                    header: t,
                    body: o
                }
            }
            n().setColors({
                reset: ["transparent", "transparent"],
                black: "181818",
                red: "E36049",
                green: "B3CB74",
                yellow: "FFD080",
                blue: "7CAFC2",
                magenta: "7FACCA",
                cyan: "C3C2EF",
                lightgrey: "EBE7E3",
                darkgrey: "6D7891"
            });
            var l = function createOverlay(e) {
                var r, t, o, l = [];
                function applyStyle(e, r) {
                    Object.keys(r).forEach((function(t) {
                        e.style[t] = r[t]
                    }
                    ))
                }
                function ensureOverlayExists(e, n) {
                    if (t)
                        return t.innerHTML = "",
                        void e(t);
                    l.push(e),
                    r || function createContainer(e) {
                        window.trustedTypes && (o = window.trustedTypes.createPolicy(e || "webpack-dev-server#overlay", {
                            createHTML: function createHTML(e) {
                                return e
                            }
                        })),
                        (r = document.createElement("iframe")).id = "webpack-dev-server-client-overlay",
                        r.src = "about:blank",
                        applyStyle(r, c.iframeStyle),
                        r.onload = function() {
                            var e = r.contentDocument.createElement("div");
                            t = r.contentDocument.createElement("div"),
                            e.id = "webpack-dev-server-client-overlay-div",
                            applyStyle(e, c.containerStyle);
                            var o = document.createElement("div");
                            o.innerText = "Compiled with problems:",
                            applyStyle(o, c.headerStyle);
                            var n = document.createElement("button");
                            applyStyle(n, c.dismissButtonStyle),
                            n.innerText = "×",
                            n.ariaLabel = "Dismiss",
                            n.addEventListener("click", (function() {
                                u.send({
                                    type: "DISMISS"
                                })
                            }
                            )),
                            e.appendChild(o),
                            e.appendChild(n),
                            e.appendChild(t),
                            r.contentDocument.body.appendChild(e),
                            l.forEach((function(r) {
                                r(e)
                            }
                            )),
                            l = [],
                            r.onload = null
                        }
                        ,
                        document.body.appendChild(r)
                    }(n)
                }
                var u = (0,
                s.default)({
                    showOverlay: function showOverlay(r) {
                        var a = r.level;
                        return function show(e, r, a) {
                            ensureOverlayExists((function() {
                                r.forEach((function(r) {
                                    var a = document.createElement("div");
                                    applyStyle(a, _objectSpread(_objectSpread({}, "warning" === e ? c.msgStyles.warning : c.msgStyles.error), {}, {
                                        padding: "1rem 1rem 1.5rem 1rem"
                                    }));
                                    var s = document.createElement("div")
                                      , l = formatProblem(e, r)
                                      , u = l.header
                                      , p = l.body;
                                    s.innerText = u,
                                    applyStyle(s, c.msgTypeStyle),
                                    r.moduleIdentifier && (applyStyle(s, {
                                        cursor: "pointer"
                                    }),
                                    s.setAttribute("data-can-open", !0),
                                    s.addEventListener("click", (function() {
                                        fetch("/webpack-dev-server/open-editor?fileName=".concat(r.moduleIdentifier))
                                    }
                                    )));
                                    var d = n()((0,
                                    i.encode)(p))
                                      , f = document.createElement("div");
                                    applyStyle(f, c.msgTextStyle),
                                    f.innerHTML = o ? o.createHTML(d) : d,
                                    a.appendChild(s),
                                    a.appendChild(f),
                                    t.appendChild(a)
                                }
                                ))
                            }
                            ), a)
                        }(void 0 === a ? "error" : a, r.messages, e.trustedTypesPolicyName)
                    },
                    hideOverlay: function hide() {
                        r && (document.body.removeChild(r),
                        r = null,
                        t = null)
                    }
                });
                return e.catchRuntimeError && (0,
                a.listenToRuntimeError)((function(e) {
                    var r = e.error
                      , t = e.message;
                    if (r || t) {
                        var o = r instanceof Error ? r : new Error(r || t);
                        u.send({
                            type: "RUNTIME_ERROR",
                            messages: [{
                                message: o.message,
                                stack: (0,
                                a.parseErrorToStacks)(o)
                            }]
                        })
                    }
                }
                )),
                u
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/overlay/fsm.js": (e, r, t) => {
            "use strict";
            function ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }
                    ))),
                    t.push.apply(t, o)
                }
                return t
            }
            function _objectSpread(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                        _defineProperty(e, r, t[r])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                    }
                    ))
                }
                return e
            }
            function _defineProperty(e, r, t) {
                return (r = function _toPropertyKey(e) {
                    var r = function _toPrimitive(e, r) {
                        if ("object" != typeof e || null === e)
                            return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var o = t.call(e, r || "default");
                            if ("object" != typeof o)
                                return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === r ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == typeof r ? r : String(r)
                }(r))in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t,
                e
            }
            t.r(r),
            t.d(r, {
                default: () => o
            });
            const o = function createMachine(e, r) {
                var t = e.states
                  , o = e.context
                  , n = e.initial
                  , i = r.actions
                  , a = n
                  , s = o;
                return {
                    send: function send(e) {
                        var r = t[a].on
                          , o = r && r[e.type];
                        o && (a = o.target,
                        o.actions && o.actions.forEach((function(r) {
                            var t = i[r]
                              , o = t && t(s, e);
                            o && (s = _objectSpread(_objectSpread({}, s), o))
                        }
                        )))
                    }
                }
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/overlay/runtime-error.js": (e, r, t) => {
            "use strict";
            function parseErrorToStacks(e) {
                if (!(e && e instanceof Error))
                    throw new Error("parseErrorToStacks expects Error object");
                if ("string" == typeof e.stack)
                    return e.stack.split("\n").filter((function(r) {
                        return r !== "Error: ".concat(e.message)
                    }
                    ))
            }
            function listenToRuntimeError(e) {
                return window.addEventListener("error", e),
                function cleanup() {
                    window.removeEventListener("error", e)
                }
            }
            t.r(r),
            t.d(r, {
                listenToRuntimeError: () => listenToRuntimeError,
                parseErrorToStacks: () => parseErrorToStacks
            })
        }
        ,
        "./node_modules/webpack-dev-server/client/overlay/state-machine.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                default: () => n
            });
            var o = t("./node_modules/webpack-dev-server/client/overlay/fsm.js");
            const n = function createOverlayMachine(e) {
                var r = e.hideOverlay
                  , t = e.showOverlay;
                return (0,
                o.default)({
                    initial: "hidden",
                    context: {
                        level: "error",
                        messages: []
                    },
                    states: {
                        hidden: {
                            on: {
                                BUILD_ERROR: {
                                    target: "displayBuildError",
                                    actions: ["setMessages", "showOverlay"]
                                },
                                RUNTIME_ERROR: {
                                    target: "displayRuntimeError",
                                    actions: ["setMessages", "showOverlay"]
                                }
                            }
                        },
                        displayBuildError: {
                            on: {
                                DISMISS: {
                                    target: "hidden",
                                    actions: ["dismissMessages", "hideOverlay"]
                                },
                                BUILD_ERROR: {
                                    target: "displayBuildError",
                                    actions: ["appendMessages", "showOverlay"]
                                }
                            }
                        },
                        displayRuntimeError: {
                            on: {
                                DISMISS: {
                                    target: "hidden",
                                    actions: ["dismissMessages", "hideOverlay"]
                                },
                                RUNTIME_ERROR: {
                                    target: "displayRuntimeError",
                                    actions: ["appendMessages", "showOverlay"]
                                },
                                BUILD_ERROR: {
                                    target: "displayBuildError",
                                    actions: ["setMessages", "showOverlay"]
                                }
                            }
                        }
                    }
                }, {
                    actions: {
                        dismissMessages: function dismissMessages() {
                            return {
                                messages: [],
                                level: "error"
                            }
                        },
                        appendMessages: function appendMessages(e, r) {
                            return {
                                messages: e.messages.concat(r.messages),
                                level: r.level || e.level
                            }
                        },
                        setMessages: function setMessages(e, r) {
                            return {
                                messages: r.messages,
                                level: r.level || e.level
                            }
                        },
                        hideOverlay: r,
                        showOverlay: t
                    }
                })
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/overlay/styles.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                containerStyle: () => i,
                dismissButtonStyle: () => s,
                headerStyle: () => a,
                iframeStyle: () => n,
                msgStyles: () => o,
                msgTextStyle: () => l,
                msgTypeStyle: () => c
            });
            var o = {
                error: {
                    backgroundColor: "rgba(206, 17, 38, 0.1)",
                    color: "#fccfcf"
                },
                warning: {
                    backgroundColor: "rgba(251, 245, 180, 0.1)",
                    color: "#fbf5b4"
                }
            }
              , n = {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                border: "none",
                "z-index": 9999999999
            }
              , i = {
                position: "fixed",
                boxSizing: "border-box",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                fontSize: "large",
                padding: "2rem 2rem 4rem 2rem",
                lineHeight: "1.2",
                whiteSpace: "pre-wrap",
                overflow: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                color: "white"
            }
              , a = {
                color: "#e83b46",
                fontSize: "2em",
                whiteSpace: "pre-wrap",
                fontFamily: "sans-serif",
                margin: "0 2rem 2rem 0",
                flex: "0 0 auto",
                maxHeight: "50%",
                overflow: "auto"
            }
              , s = {
                color: "#ffffff",
                lineHeight: "1rem",
                fontSize: "1.5rem",
                padding: "1rem",
                cursor: "pointer",
                position: "absolute",
                right: 0,
                top: 0,
                backgroundColor: "transparent",
                border: "none"
            }
              , c = {
                color: "#e83b46",
                fontSize: "1.2em",
                marginBottom: "1rem",
                fontFamily: "sans-serif"
            }
              , l = {
                lineHeight: "1.5",
                fontSize: "1rem",
                fontFamily: "Menlo, Consolas, monospace"
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/socket.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                client: () => l,
                default: () => p
            });
            var o = t("./node_modules/webpack-dev-server/client/clients/WebSocketClient.js")
              , n = t("./node_modules/webpack-dev-server/client/utils/log.js")
              , i = t("./node_modules/webpack-dev-server/client/clients/WebSocketClient.js")
              , a = void 0 !== i ? void 0 !== i.default ? i.default : i : o.default
              , s = 0
              , c = 10
              , l = null
              , u = function initSocket(e, r, t) {
                (l = new a(e)).onOpen((function() {
                    s = 0,
                    void 0 !== t && (c = t)
                }
                )),
                l.onClose((function() {
                    if (0 === s && r.close(),
                    l = null,
                    s < c) {
                        var o = 1e3 * Math.pow(2, s) + 100 * Math.random();
                        s += 1,
                        n.log.info("Trying to reconnect..."),
                        setTimeout((function() {
                            u(e, r, t)
                        }
                        ), o)
                    }
                }
                )),
                l.onMessage((function(e) {
                    var t = JSON.parse(e);
                    r[t.type] && r[t.type](t.data, t.params)
                }
                ))
            };
            const p = u
        }
        ,
        "./node_modules/webpack-dev-server/client/utils/createSocketURL.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                default: () => o
            });
            const o = function createSocketURL(e) {
                var r = e.hostname
                  , t = "0.0.0.0" === r || "::" === r || "[::]" === r;
                t && self.location.hostname && 0 === self.location.protocol.indexOf("http") && (r = self.location.hostname);
                var o = e.protocol || self.location.protocol;
                ("auto:" === o || r && t && "https:" === self.location.protocol) && (o = self.location.protocol),
                o = o.replace(/^(?:http|.+-extension|file)/i, "ws");
                var n = "";
                e.username && (n = e.username,
                e.password && (n = n.concat(":", e.password)));
                var i = (r || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1")
                  , a = e.port;
                a && "0" !== a || (a = self.location.port);
                var s = "/ws";
                return e.pathname && !e.fromCurrentScript && (s = e.pathname),
                function format(e) {
                    var r = e.protocol || "";
                    r && ":" !== r.substr(-1) && (r += ":");
                    var t = e.auth || "";
                    t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"),
                    t += "@");
                    var o = "";
                    e.hostname && (o = t + (-1 === e.hostname.indexOf(":") ? e.hostname : "[".concat(e.hostname, "]")),
                    e.port && (o += ":".concat(e.port)));
                    var n = e.pathname || "";
                    e.slashes ? (o = "//".concat(o || ""),
                    n && "/" !== n.charAt(0) && (n = "/".concat(n))) : o || (o = "");
                    var i = e.search || "";
                    i && "?" !== i.charAt(0) && (i = "?".concat(i));
                    var a = e.hash || "";
                    return a && "#" !== a.charAt(0) && (a = "#".concat(a)),
                    n = n.replace(/[?#]/g, (function(e) {
                        return encodeURIComponent(e)
                    }
                    )),
                    i = i.replace("#", "%23"),
                    "".concat(r).concat(o).concat(n).concat(i).concat(a)
                }({
                    protocol: o,
                    auth: n,
                    hostname: i,
                    port: a,
                    pathname: s,
                    slashes: !0
                })
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                default: () => o
            });
            const o = function getCurrentScriptSource() {
                if (document.currentScript)
                    return document.currentScript.getAttribute("src");
                var e = document.scripts || []
                  , r = Array.prototype.filter.call(e, (function(e) {
                    return e.getAttribute("src")
                }
                ));
                if (r.length > 0)
                    return r[r.length - 1].getAttribute("src");
                throw new Error("[webpack-dev-server] Failed to get current script source.")
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/utils/log.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                log: () => i,
                logEnabledFeatures: () => a,
                setLogLevel: () => setLogLevel
            });
            var o = t("./node_modules/webpack-dev-server/client/modules/logger/index.js")
              , n = t.n(o);
            function setLogLevel(e) {
                n().configureDefaultLogger({
                    level: e
                })
            }
            setLogLevel("info");
            var i = n().getLogger("webpack-dev-server")
              , a = function logEnabledFeatures(e) {
                var r = Object.keys(e);
                if (e && 0 !== r.length) {
                    for (var t = "Server started:", o = 0; o < r.length; o++) {
                        var n = r[o];
                        t += " ".concat(n, " ").concat(e[n] ? "enabled" : "disabled", ",")
                    }
                    t = t.slice(0, -1).concat("."),
                    i.info(t)
                }
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/utils/parseURL.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                default: () => n
            });
            var o = t("./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");
            const n = function parseURL(e) {
                var r = {};
                if ("string" == typeof e && "" !== e)
                    for (var t = e.slice(1).split("&"), n = 0; n < t.length; n++) {
                        var i = t[n].split("=");
                        r[i[0]] = decodeURIComponent(i[1])
                    }
                else {
                    var a, s = (0,
                    o.default)();
                    try {
                        a = new URL(s,self.location.href)
                    } catch (e) {}
                    a && ((r = a).fromCurrentScript = !0)
                }
                return r
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/utils/reloadApp.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                default: () => a
            });
            var o = t("./node_modules/webpack/hot/emitter.js")
              , n = t.n(o)
              , i = t("./node_modules/webpack-dev-server/client/utils/log.js");
            const a = function reloadApp(e, r) {
                var t = e.hot
                  , o = e.liveReload;
                if (!r.isUnloading) {
                    var a = r.currentHash
                      , s = r.previousHash;
                    if (!(a.indexOf(s) >= 0)) {
                        var c = self.location.search.toLowerCase()
                          , l = -1 === c.indexOf("webpack-dev-server-hot=false")
                          , u = -1 === c.indexOf("webpack-dev-server-live-reload=false");
                        if (t && l)
                            i.log.info("App hot update..."),
                            n().emit("webpackHotUpdate", r.currentHash),
                            "undefined" != typeof self && self.window && self.postMessage("webpackHotUpdate".concat(r.currentHash), "*");
                        else if (o && u)
                            var p = self
                              , d = self.setInterval((function() {
                                ("about:" !== p.location.protocol || (p = p.parent).parent === p) && applyReload(p, d)
                            }
                            ))
                    }
                }
                function applyReload(e, r) {
                    clearInterval(r),
                    i.log.info("App updated. Reloading..."),
                    e.location.reload()
                }
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/utils/sendMessage.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                default: () => o
            });
            const o = function sendMsg(e, r) {
                "undefined" == typeof self || "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope || self.postMessage({
                    type: "webpack".concat(e),
                    data: r
                }, "*")
            }
        }
        ,
        "./node_modules/webpack-dev-server/client/utils/stripAnsi.js": (e, r, t) => {
            "use strict";
            t.r(r),
            t.d(r, {
                default: () => n
            });
            var o = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"),"g");
            const n = function stripAnsi(e) {
                if ("string" != typeof e)
                    throw new TypeError("Expected a `string`, got `".concat(typeof e, "`"));
                return e.replace(o, "")
            }
        }
        ,
        "./node_modules/webpack/hot/dev-server.js": (e, r, t) => {
            var o, n = function upToDate() {
                return o.indexOf(t.h()) >= 0
            }, i = t("./node_modules/webpack/hot/log.js"), a = function check() {
                e.hot.check(!0).then((function(e) {
                    if (!e)
                        return i("warning", "[HMR] Cannot find update. " + ("undefined" != typeof window ? "Need to do a full reload!" : "Please reload manually!")),
                        i("warning", "[HMR] (Probably because of restarting the webpack-dev-server)"),
                        void ("undefined" != typeof window && window.location.reload());
                    n() || check(),
                    t("./node_modules/webpack/hot/log-apply-result.js")(e, e),
                    n() && i("info", "[HMR] App is up to date.")
                }
                )).catch((function(r) {
                    var t = e.hot.status();
                    ["abort", "fail"].indexOf(t) >= 0 ? (i("warning", "[HMR] Cannot apply update. " + ("undefined" != typeof window ? "Need to do a full reload!" : "Please reload manually!")),
                    i("warning", "[HMR] " + i.formatError(r)),
                    "undefined" != typeof window && window.location.reload()) : i("warning", "[HMR] Update failed: " + i.formatError(r))
                }
                ))
            };
            t("./node_modules/webpack/hot/emitter.js").on("webpackHotUpdate", (function(r) {
                o = r,
                n() || "idle" !== e.hot.status() || (i("info", "[HMR] Checking for updates on the server..."),
                a())
            }
            )),
            i("info", "[HMR] Waiting for update signal from WDS...")
        }
        ,
        "./node_modules/webpack/hot/emitter.js": (e, r, t) => {
            var o = t("./node_modules/events/events.js");
            e.exports = new o
        }
        ,
        "./node_modules/webpack/hot/log-apply-result.js": (e, r, t) => {
            e.exports = function(e, r) {
                var o = e.filter((function(e) {
                    return r && r.indexOf(e) < 0
                }
                ))
                  , n = t("./node_modules/webpack/hot/log.js");
                (o.length > 0 && (n("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"),
                o.forEach((function(e) {
                    n("warning", "[HMR]  - " + e)
                }
                ))),
                r && 0 !== r.length) ? (n("info", "[HMR] Updated modules:"),
                r.forEach((function(e) {
                    if ("string" == typeof e && -1 !== e.indexOf("!")) {
                        var r = e.split("!");
                        n.groupCollapsed("info", "[HMR]  - " + r.pop()),
                        n("info", "[HMR]  - " + e),
                        n.groupEnd("info")
                    } else
                        n("info", "[HMR]  - " + e)
                }
                )),
                r.every((function(e) {
                    return "number" == typeof e
                }
                )) && n("info", '[HMR] Consider using the optimization.moduleIds: "named" for module names.')) : n("info", "[HMR] Nothing hot updated.")
            }
        }
        ,
        "./node_modules/webpack/hot/log.js": e => {
            var r = "info";
            function dummy() {}
            function shouldLog(e) {
                return "info" === r && "info" === e || ["info", "warning"].indexOf(r) >= 0 && "warning" === e || ["info", "warning", "error"].indexOf(r) >= 0 && "error" === e
            }
            function logGroup(e) {
                return function(r, t) {
                    shouldLog(r) && e(t)
                }
            }
            e.exports = function(e, r) {
                shouldLog(e) && ("info" === e ? console.log(r) : "warning" === e ? console.warn(r) : "error" === e && console.error(r))
            }
            ;
            var t = console.group || dummy
              , o = console.groupCollapsed || dummy
              , n = console.groupEnd || dummy;
            e.exports.group = logGroup(t),
            e.exports.groupCollapsed = logGroup(o),
            e.exports.groupEnd = logGroup(n),
            e.exports.setLogLevel = function(e) {
                r = e
            }
            ,
            e.exports.formatError = function(e) {
                var r = e.message
                  , t = e.stack;
                return t ? t.indexOf(r) < 0 ? r + "\n" + t : t : r
            }
        }
    }, o = {};
    function __webpack_require__(e) {
        var r = o[e];
        if (void 0 !== r) {
            if (void 0 !== r.error)
                throw r.error;
            return r.exports
        }
        var n = o[e] = {
            id: e,
            exports: {}
        };
        try {
            var i = {
                id: e,
                module: n,
                factory: t[e],
                require: __webpack_require__
            };
            __webpack_require__.i.forEach((function(e) {
                e(i)
            }
            )),
            n = i.module,
            i.factory.call(n.exports, n, n.exports, i.require)
        } catch (e) {
            throw n.error = e,
            e
        }
        return n.exports
    }
    __webpack_require__.m = t,
    __webpack_require__.c = o,
    __webpack_require__.i = [],
    __webpack_require__.n = e => {
        var r = e && e.__esModule ? () => e.default : () => e;
        return __webpack_require__.d(r, {
            a: r
        }),
        r
    }
    ,
    __webpack_require__.d = (e, r) => {
        for (var t in r)
            __webpack_require__.o(r, t) && !__webpack_require__.o(e, t) && Object.defineProperty(e, t, {
                enumerable: !0,
                get: r[t]
            })
    }
    ,
    __webpack_require__.hu = e => e + "." + __webpack_require__.h() + ".hot-update.js",
    __webpack_require__.miniCssF = e => {}
    ,
    __webpack_require__.hmrF = () => "main." + __webpack_require__.h() + ".hot-update.json",
    __webpack_require__.h = () => "9fc0f55e246bbef67b2d",
    __webpack_require__.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    __webpack_require__.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r),
    e = {},
    r = "my-webpack-project:",
    __webpack_require__.l = (t, o, n, i) => {
        if (e[t])
            e[t].push(o);
        else {
            var a, s;
            if (void 0 !== n)
                for (var c = document.getElementsByTagName("script"), l = 0; l < c.length; l++) {
                    var u = c[l];
                    if (u.getAttribute("src") == t || u.getAttribute("data-webpack") == r + n) {
                        a = u;
                        break
                    }
                }
            a || (s = !0,
            (a = document.createElement("script")).charset = "utf-8",
            a.timeout = 120,
            __webpack_require__.nc && a.setAttribute("nonce", __webpack_require__.nc),
            a.setAttribute("data-webpack", r + n),
            a.src = t),
            e[t] = [o];
            var onScriptComplete = (r, o) => {
                a.onerror = a.onload = null,
                clearTimeout(p);
                var n = e[t];
                if (delete e[t],
                a.parentNode && a.parentNode.removeChild(a),
                n && n.forEach((e => e(o))),
                r)
                    return r(o)
            }
              , p = setTimeout(onScriptComplete.bind(null, void 0, {
                type: "timeout",
                target: a
            }), 12e4);
            a.onerror = onScriptComplete.bind(null, a.onerror),
            a.onload = onScriptComplete.bind(null, a.onload),
            s && document.head.appendChild(a)
        }
    }
    ,
    __webpack_require__.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    ( () => {
        var e, r, t, o = {}, n = __webpack_require__.c, i = [], a = [], s = "idle", c = 0, l = [];
        function setStatus(e) {
            s = e;
            for (var r = [], t = 0; t < a.length; t++)
                r[t] = a[t].call(null, e);
            return Promise.all(r)
        }
        function unblock() {
            0 == --c && setStatus("ready").then((function() {
                if (0 === c) {
                    var e = l;
                    l = [];
                    for (var r = 0; r < e.length; r++)
                        e[r]()
                }
            }
            ))
        }
        function hotCheck(e) {
            if ("idle" !== s)
                throw new Error("check() is only allowed in idle status");
            return setStatus("check").then(__webpack_require__.hmrM).then((function(t) {
                return t ? setStatus("prepare").then((function() {
                    var o = [];
                    return r = [],
                    Promise.all(Object.keys(__webpack_require__.hmrC).reduce((function(e, n) {
                        return __webpack_require__.hmrC[n](t.c, t.r, t.m, e, r, o),
                        e
                    }
                    ), [])).then((function() {
                        return function waitForBlockingPromises(e) {
                            return 0 === c ? e() : new Promise((function(r) {
                                l.push((function() {
                                    r(e())
                                }
                                ))
                            }
                            ))
                        }((function() {
                            return e ? internalApply(e) : setStatus("ready").then((function() {
                                return o
                            }
                            ))
                        }
                        ))
                    }
                    ))
                }
                )) : setStatus(applyInvalidatedModules() ? "ready" : "idle").then((function() {
                    return null
                }
                ))
            }
            ))
        }
        function hotApply(e) {
            return "ready" !== s ? Promise.resolve().then((function() {
                throw new Error("apply() is only allowed in ready status (state: " + s + ")")
            }
            )) : internalApply(e)
        }
        function internalApply(e) {
            e = e || {},
            applyInvalidatedModules();
            var o = r.map((function(r) {
                return r(e)
            }
            ));
            r = void 0;
            var n = o.map((function(e) {
                return e.error
            }
            )).filter(Boolean);
            if (n.length > 0)
                return setStatus("abort").then((function() {
                    throw n[0]
                }
                ));
            var i = setStatus("dispose");
            o.forEach((function(e) {
                e.dispose && e.dispose()
            }
            ));
            var a, s = setStatus("apply"), reportError = function(e) {
                a || (a = e)
            }, c = [];
            return o.forEach((function(e) {
                if (e.apply) {
                    var r = e.apply(reportError);
                    if (r)
                        for (var t = 0; t < r.length; t++)
                            c.push(r[t])
                }
            }
            )),
            Promise.all([i, s]).then((function() {
                return a ? setStatus("fail").then((function() {
                    throw a
                }
                )) : t ? internalApply(e).then((function(e) {
                    return c.forEach((function(r) {
                        e.indexOf(r) < 0 && e.push(r)
                    }
                    )),
                    e
                }
                )) : setStatus("idle").then((function() {
                    return c
                }
                ))
            }
            ))
        }
        function applyInvalidatedModules() {
            if (t)
                return r || (r = []),
                Object.keys(__webpack_require__.hmrI).forEach((function(e) {
                    t.forEach((function(t) {
                        __webpack_require__.hmrI[e](t, r)
                    }
                    ))
                }
                )),
                t = void 0,
                !0
        }
        __webpack_require__.hmrD = o,
        __webpack_require__.i.push((function(l) {
            var u = l.module
              , p = function createRequire(r, t) {
                var o = n[t];
                if (!o)
                    return r;
                var fn = function(a) {
                    if (o.hot.active) {
                        if (n[a]) {
                            var s = n[a].parents;
                            -1 === s.indexOf(t) && s.push(t)
                        } else
                            i = [t],
                            e = a;
                        -1 === o.children.indexOf(a) && o.children.push(a)
                    } else
                        console.warn("[HMR] unexpected require(" + a + ") from disposed module " + t),
                        i = [];
                    return r(a)
                }
                  , createPropertyDescriptor = function(e) {
                    return {
                        configurable: !0,
                        enumerable: !0,
                        get: function() {
                            return r[e]
                        },
                        set: function(t) {
                            r[e] = t
                        }
                    }
                };
                for (var a in r)
                    Object.prototype.hasOwnProperty.call(r, a) && "e" !== a && Object.defineProperty(fn, a, createPropertyDescriptor(a));
                return fn.e = function(e) {
                    return function trackBlockingPromise(e) {
                        switch (s) {
                        case "ready":
                            setStatus("prepare");
                        case "prepare":
                            return c++,
                            e.then(unblock, unblock),
                            e;
                        default:
                            return e
                        }
                    }(r.e(e))
                }
                ,
                fn
            }(l.require, l.id);
            u.hot = function createModuleHotObject(n, c) {
                var l = e !== n
                  , u = {
                    _acceptedDependencies: {},
                    _acceptedErrorHandlers: {},
                    _declinedDependencies: {},
                    _selfAccepted: !1,
                    _selfDeclined: !1,
                    _selfInvalidated: !1,
                    _disposeHandlers: [],
                    _main: l,
                    _requireSelf: function() {
                        i = c.parents.slice(),
                        e = l ? void 0 : n,
                        __webpack_require__(n)
                    },
                    active: !0,
                    accept: function(e, r, t) {
                        if (void 0 === e)
                            u._selfAccepted = !0;
                        else if ("function" == typeof e)
                            u._selfAccepted = e;
                        else if ("object" == typeof e && null !== e)
                            for (var o = 0; o < e.length; o++)
                                u._acceptedDependencies[e[o]] = r || function() {}
                                ,
                                u._acceptedErrorHandlers[e[o]] = t;
                        else
                            u._acceptedDependencies[e] = r || function() {}
                            ,
                            u._acceptedErrorHandlers[e] = t
                    },
                    decline: function(e) {
                        if (void 0 === e)
                            u._selfDeclined = !0;
                        else if ("object" == typeof e && null !== e)
                            for (var r = 0; r < e.length; r++)
                                u._declinedDependencies[e[r]] = !0;
                        else
                            u._declinedDependencies[e] = !0
                    },
                    dispose: function(e) {
                        u._disposeHandlers.push(e)
                    },
                    addDisposeHandler: function(e) {
                        u._disposeHandlers.push(e)
                    },
                    removeDisposeHandler: function(e) {
                        var r = u._disposeHandlers.indexOf(e);
                        r >= 0 && u._disposeHandlers.splice(r, 1)
                    },
                    invalidate: function() {
                        switch (this._selfInvalidated = !0,
                        s) {
                        case "idle":
                            r = [],
                            Object.keys(__webpack_require__.hmrI).forEach((function(e) {
                                __webpack_require__.hmrI[e](n, r)
                            }
                            )),
                            setStatus("ready");
                            break;
                        case "ready":
                            Object.keys(__webpack_require__.hmrI).forEach((function(e) {
                                __webpack_require__.hmrI[e](n, r)
                            }
                            ));
                            break;
                        case "prepare":
                        case "check":
                        case "dispose":
                        case "apply":
                            (t = t || []).push(n)
                        }
                    },
                    check: hotCheck,
                    apply: hotApply,
                    status: function(e) {
                        if (!e)
                            return s;
                        a.push(e)
                    },
                    addStatusHandler: function(e) {
                        a.push(e)
                    },
                    removeStatusHandler: function(e) {
                        var r = a.indexOf(e);
                        r >= 0 && a.splice(r, 1)
                    },
                    data: o[n]
                };
                return e = void 0,
                u
            }(l.id, u),
            u.parents = i,
            u.children = [],
            i = [],
            l.require = p
        }
        )),
        __webpack_require__.hmrC = {},
        __webpack_require__.hmrI = {}
    }
    )(),
    ( () => {
        var e;
        __webpack_require__.g.importScripts && (e = __webpack_require__.g.location + "");
        var r = __webpack_require__.g.document;
        if (!e && r && (r.currentScript && (e = r.currentScript.src),
        !e)) {
            var t = r.getElementsByTagName("script");
            if (t.length)
                for (var o = t.length - 1; o > -1 && !e; )
                    e = t[o--].src
        }
        if (!e)
            throw new Error("Automatic publicPath is not supported in this browser");
        e = e.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"),
        __webpack_require__.p = e
    }
    )(),
    ( () => {
        if ("undefined" != typeof document) {
            var createStylesheet = (e, r, t, o, n) => {
                var i = document.createElement("link");
                i.rel = "stylesheet",
                i.type = "text/css";
                return i.onerror = i.onload = t => {
                    if (i.onerror = i.onload = null,
                    "load" === t.type)
                        o();
                    else {
                        var a = t && ("load" === t.type ? "missing" : t.type)
                          , s = t && t.target && t.target.href || r
                          , c = new Error("Loading CSS chunk " + e + " failed.\n(" + s + ")");
                        c.code = "CSS_CHUNK_LOAD_FAILED",
                        c.type = a,
                        c.request = s,
                        i.parentNode && i.parentNode.removeChild(i),
                        n(c)
                    }
                }
                ,
                i.href = r,
                t ? t.parentNode.insertBefore(i, t.nextSibling) : document.head.appendChild(i),
                i
            }
              , findStylesheet = (e, r) => {
                for (var t = document.getElementsByTagName("link"), o = 0; o < t.length; o++) {
                    var n = (a = t[o]).getAttribute("data-href") || a.getAttribute("href");
                    if ("stylesheet" === a.rel && (n === e || n === r))
                        return a
                }
                var i = document.getElementsByTagName("style");
                for (o = 0; o < i.length; o++) {
                    var a;
                    if ((n = (a = i[o]).getAttribute("data-href")) === e || n === r)
                        return a
                }
            }
              , e = []
              , r = []
              , applyHandler = t => ({
                dispose: () => {
                    for (var r = 0; r < e.length; r++) {
                        var t = e[r];
                        t.parentNode && t.parentNode.removeChild(t)
                    }
                    e.length = 0
                }
                ,
                apply: () => {
                    for (var e = 0; e < r.length; e++)
                        r[e].rel = "stylesheet";
                    r.length = 0
                }
            });
            __webpack_require__.hmrC.miniCss = (t, o, n, i, a, s) => {
                a.push(applyHandler),
                t.forEach((t => {
                    var o = __webpack_require__.miniCssF(t)
                      , n = __webpack_require__.p + o
                      , a = findStylesheet(o, n);
                    a && i.push(new Promise(( (o, i) => {
                        var s = createStylesheet(t, n, a, ( () => {
                            s.as = "style",
                            s.rel = "preload",
                            o()
                        }
                        ), i);
                        e.push(a),
                        r.push(s)
                    }
                    )))
                }
                ))
            }
        }
    }
    )(),
    ( () => {
        var e, r, t, o, n, i = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
            main: 0
        }, a = {};
        function loadUpdateChunk(r, t) {
            return e = t,
            new Promise(( (e, t) => {
                a[r] = e;
                var o = __webpack_require__.p + __webpack_require__.hu(r)
                  , n = new Error;
                __webpack_require__.l(o, (e => {
                    if (a[r]) {
                        a[r] = void 0;
                        var o = e && ("load" === e.type ? "missing" : e.type)
                          , i = e && e.target && e.target.src;
                        n.message = "Loading hot update chunk " + r + " failed.\n(" + o + ": " + i + ")",
                        n.name = "ChunkLoadError",
                        n.type = o,
                        n.request = i,
                        t(n)
                    }
                }
                ))
            }
            ))
        }
        function applyHandler(e) {
            function getAffectedModuleEffects(e) {
                for (var r = [e], t = {}, o = r.map((function(e) {
                    return {
                        chain: [e],
                        id: e
                    }
                }
                )); o.length > 0; ) {
                    var n = o.pop()
                      , i = n.id
                      , a = n.chain
                      , s = __webpack_require__.c[i];
                    if (s && (!s.hot._selfAccepted || s.hot._selfInvalidated)) {
                        if (s.hot._selfDeclined)
                            return {
                                type: "self-declined",
                                chain: a,
                                moduleId: i
                            };
                        if (s.hot._main)
                            return {
                                type: "unaccepted",
                                chain: a,
                                moduleId: i
                            };
                        for (var c = 0; c < s.parents.length; c++) {
                            var l = s.parents[c]
                              , u = __webpack_require__.c[l];
                            if (u) {
                                if (u.hot._declinedDependencies[i])
                                    return {
                                        type: "declined",
                                        chain: a.concat([l]),
                                        moduleId: i,
                                        parentId: l
                                    };
                                -1 === r.indexOf(l) && (u.hot._acceptedDependencies[i] ? (t[l] || (t[l] = []),
                                addAllToSet(t[l], [i])) : (delete t[l],
                                r.push(l),
                                o.push({
                                    chain: a.concat([l]),
                                    id: l
                                })))
                            }
                        }
                    }
                }
                return {
                    type: "accepted",
                    moduleId: e,
                    outdatedModules: r,
                    outdatedDependencies: t
                }
            }
            function addAllToSet(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    -1 === e.indexOf(o) && e.push(o)
                }
            }
            __webpack_require__.f && delete __webpack_require__.f.jsonpHmr,
            r = void 0;
            var a = {}
              , s = []
              , c = {}
              , l = function warnUnexpectedRequire(e) {
                console.warn("[HMR] unexpected require(" + e.id + ") to disposed module")
            };
            for (var u in t)
                if (__webpack_require__.o(t, u)) {
                    var p, d = t[u], f = !1, m = !1, g = !1, v = "";
                    switch ((p = d ? getAffectedModuleEffects(u) : {
                        type: "disposed",
                        moduleId: u
                    }).chain && (v = "\nUpdate propagation: " + p.chain.join(" -> ")),
                    p.type) {
                    case "self-declined":
                        e.onDeclined && e.onDeclined(p),
                        e.ignoreDeclined || (f = new Error("Aborted because of self decline: " + p.moduleId + v));
                        break;
                    case "declined":
                        e.onDeclined && e.onDeclined(p),
                        e.ignoreDeclined || (f = new Error("Aborted because of declined dependency: " + p.moduleId + " in " + p.parentId + v));
                        break;
                    case "unaccepted":
                        e.onUnaccepted && e.onUnaccepted(p),
                        e.ignoreUnaccepted || (f = new Error("Aborted because " + u + " is not accepted" + v));
                        break;
                    case "accepted":
                        e.onAccepted && e.onAccepted(p),
                        m = !0;
                        break;
                    case "disposed":
                        e.onDisposed && e.onDisposed(p),
                        g = !0;
                        break;
                    default:
                        throw new Error("Unexception type " + p.type)
                    }
                    if (f)
                        return {
                            error: f
                        };
                    if (m)
                        for (u in c[u] = d,
                        addAllToSet(s, p.outdatedModules),
                        p.outdatedDependencies)
                            __webpack_require__.o(p.outdatedDependencies, u) && (a[u] || (a[u] = []),
                            addAllToSet(a[u], p.outdatedDependencies[u]));
                    g && (addAllToSet(s, [p.moduleId]),
                    c[u] = l)
                }
            t = void 0;
            for (var y, h = [], b = 0; b < s.length; b++) {
                var _ = s[b]
                  , w = __webpack_require__.c[_];
                w && (w.hot._selfAccepted || w.hot._main) && c[_] !== l && !w.hot._selfInvalidated && h.push({
                    module: _,
                    require: w.hot._requireSelf,
                    errorHandler: w.hot._selfAccepted
                })
            }
            return {
                dispose: function() {
                    var e;
                    o.forEach((function(e) {
                        delete i[e]
                    }
                    )),
                    o = void 0;
                    for (var r, t = s.slice(); t.length > 0; ) {
                        var n = t.pop()
                          , c = __webpack_require__.c[n];
                        if (c) {
                            var l = {}
                              , u = c.hot._disposeHandlers;
                            for (b = 0; b < u.length; b++)
                                u[b].call(null, l);
                            for (__webpack_require__.hmrD[n] = l,
                            c.hot.active = !1,
                            delete __webpack_require__.c[n],
                            delete a[n],
                            b = 0; b < c.children.length; b++) {
                                var p = __webpack_require__.c[c.children[b]];
                                p && ((e = p.parents.indexOf(n)) >= 0 && p.parents.splice(e, 1))
                            }
                        }
                    }
                    for (var d in a)
                        if (__webpack_require__.o(a, d) && (c = __webpack_require__.c[d]))
                            for (y = a[d],
                            b = 0; b < y.length; b++)
                                r = y[b],
                                (e = c.children.indexOf(r)) >= 0 && c.children.splice(e, 1)
                },
                apply: function(r) {
                    for (var t in c)
                        __webpack_require__.o(c, t) && (__webpack_require__.m[t] = c[t]);
                    for (var o = 0; o < n.length; o++)
                        n[o](__webpack_require__);
                    for (var i in a)
                        if (__webpack_require__.o(a, i)) {
                            var l = __webpack_require__.c[i];
                            if (l) {
                                y = a[i];
                                for (var u = [], p = [], d = [], f = 0; f < y.length; f++) {
                                    var m = y[f]
                                      , g = l.hot._acceptedDependencies[m]
                                      , v = l.hot._acceptedErrorHandlers[m];
                                    if (g) {
                                        if (-1 !== u.indexOf(g))
                                            continue;
                                        u.push(g),
                                        p.push(v),
                                        d.push(m)
                                    }
                                }
                                for (var b = 0; b < u.length; b++)
                                    try {
                                        u[b].call(null, y)
                                    } catch (t) {
                                        if ("function" == typeof p[b])
                                            try {
                                                p[b](t, {
                                                    moduleId: i,
                                                    dependencyId: d[b]
                                                })
                                            } catch (o) {
                                                e.onErrored && e.onErrored({
                                                    type: "accept-error-handler-errored",
                                                    moduleId: i,
                                                    dependencyId: d[b],
                                                    error: o,
                                                    originalError: t
                                                }),
                                                e.ignoreErrored || (r(o),
                                                r(t))
                                            }
                                        else
                                            e.onErrored && e.onErrored({
                                                type: "accept-errored",
                                                moduleId: i,
                                                dependencyId: d[b],
                                                error: t
                                            }),
                                            e.ignoreErrored || r(t)
                                    }
                            }
                        }
                    for (var _ = 0; _ < h.length; _++) {
                        var w = h[_]
                          , k = w.module;
                        try {
                            w.require(k)
                        } catch (t) {
                            if ("function" == typeof w.errorHandler)
                                try {
                                    w.errorHandler(t, {
                                        moduleId: k,
                                        module: __webpack_require__.c[k]
                                    })
                                } catch (o) {
                                    e.onErrored && e.onErrored({
                                        type: "self-accept-error-handler-errored",
                                        moduleId: k,
                                        error: o,
                                        originalError: t
                                    }),
                                    e.ignoreErrored || (r(o),
                                    r(t))
                                }
                            else
                                e.onErrored && e.onErrored({
                                    type: "self-accept-errored",
                                    moduleId: k,
                                    error: t
                                }),
                                e.ignoreErrored || r(t)
                        }
                    }
                    return s
                }
            }
        }
        self.webpackHotUpdatemy_webpack_project = (r, o, i) => {
            for (var s in o)
                __webpack_require__.o(o, s) && (t[s] = o[s],
                e && e.push(s));
            i && n.push(i),
            a[r] && (a[r](),
            a[r] = void 0)
        }
        ,
        __webpack_require__.hmrI.jsonp = function(e, r) {
            t || (t = {},
            n = [],
            o = [],
            r.push(applyHandler)),
            __webpack_require__.o(t, e) || (t[e] = __webpack_require__.m[e])
        }
        ,
        __webpack_require__.hmrC.jsonp = function(e, a, s, c, l, u) {
            l.push(applyHandler),
            r = {},
            o = a,
            t = s.reduce((function(e, r) {
                return e[r] = !1,
                e
            }
            ), {}),
            n = [],
            e.forEach((function(e) {
                __webpack_require__.o(i, e) && void 0 !== i[e] ? (c.push(loadUpdateChunk(e, u)),
                r[e] = !0) : r[e] = !1
            }
            )),
            __webpack_require__.f && (__webpack_require__.f.jsonpHmr = function(e, t) {
                r && __webpack_require__.o(r, e) && !r[e] && (t.push(loadUpdateChunk(e)),
                r[e] = !0)
            }
            )
        }
        ,
        __webpack_require__.hmrM = () => {
            if ("undefined" == typeof fetch)
                throw new Error("No browser support: need fetch API");
            return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((e => {
                if (404 !== e.status) {
                    if (!e.ok)
                        throw new Error("Failed to fetch update manifest " + e.statusText);
                    return e.json()
                }
            }
            ))
        }
    }
    )(),
    __webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=localhost&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true"),
    __webpack_require__("./node_modules/webpack/hot/dev-server.js");
    __webpack_require__("./src/index.ts")
}
)();
//# sourceMappingURL=main.js.map
