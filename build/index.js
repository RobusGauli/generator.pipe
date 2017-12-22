'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenPipe = function () {
    function GenPipe(_values) {
        _classCallCheck(this, GenPipe);

        this._valuesOrGen = _values;
        this.__functions = [];
    }

    _createClass(GenPipe, [{
        key: 'map',
        value: function map(func) {
            this.__functions.push(func);
            return this;
        }
    }, {
        key: '_apply',
        value: function _apply() {
            if (type(this._valuesOrGen) === 'array') {
                return (/*#__PURE__*/regeneratorRuntime.mark(function gen() {
                        var i;
                        return regeneratorRuntime.wrap(function gen$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        i = 0;

                                    case 1:
                                        if (!(i < this._valuesOrGen.length)) {
                                            _context.next = 7;
                                            break;
                                        }

                                        _context.next = 4;
                                        return this.__functions.reduce(function (acc, func) {
                                            return func(acc);
                                        }, this._valuesOrGen[i]);

                                    case 4:
                                        i++;
                                        _context.next = 1;
                                        break;

                                    case 7:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, gen, this);
                    }).bind(this)
                );
            } else if (type(this._valuesOrGen) === 'generatorfunction') {
                return (/*#__PURE__*/regeneratorRuntime.mark(function gen() {
                        var g, genObj;
                        return regeneratorRuntime.wrap(function gen$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        g = this._valuesOrGen();

                                    case 1:
                                        if (!true) {
                                            _context2.next = 9;
                                            break;
                                        }

                                        genObj = g.next();

                                        if (!(genObj.value === undefined && genObj.done === true)) {
                                            _context2.next = 5;
                                            break;
                                        }

                                        return _context2.abrupt('return');

                                    case 5:
                                        _context2.next = 7;
                                        return this.__functions.reduce(function (acc, func) {
                                            return func(acc);
                                        }, genObj.value);

                                    case 7:
                                        _context2.next = 1;
                                        break;

                                    case 9:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, gen, this);
                    }).bind(this)
                );
            }
        }
    }, {
        key: 'apply',
        value: function apply() {
            return GenPipe._generatorController(this._apply()());
        }
    }]);

    return GenPipe;
}();

GenPipe._generatorController = function (_gen) {
    var Controller = function () {
        function Controller(_gen) {
            _classCallCheck(this, Controller);

            this._gen = _gen;
        }

        _createClass(Controller, [{
            key: 'all',
            value: function all() {
                var _results = [];
                while (true) {
                    var genObj = this._gen.next();
                    if (genObj.value === undefined && genObj.done === true) {
                        break;
                    }
                    _results.push(genObj.value);
                }
                return _results;
            }
        }, {
            key: 'get',
            value: function get(chunkSize) {
                var _chunks = [];
                for (var i = 0; i < chunkSize; i++) {
                    var genObj = this._gen.next();
                    if (genObj.value && !genObj.done) {
                        _chunks.push(genObj.value);
                    }
                }
                return _chunks;
            }
        }]);

        return Controller;
    }();

    return new Controller(_gen);
};

var type = function type(obj) {
    return obj && obj.constructor.name.toLowerCase();
};

var GP = function GP(arg) {
    return new GenPipe(arg);
};

module.exports = { type: type, GP: GP };