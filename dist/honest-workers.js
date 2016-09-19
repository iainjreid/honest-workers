(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["honestWorkers"] = factory();
	else
		root["honestWorkers"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Dependencies
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(/*! ./utils */ 1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _workers = new WeakMap();
	
	/**
	 * @description A module allowing developers to benefit from the wonderful Promise interface whilst enjoying the
	 *              multi-threaded goodness provided by WebWorkers.
	 */
	
	var HonestWorkers = function () {
	  function HonestWorkers() {
	    _classCallCheck(this, HonestWorkers);
	
	    _workers.set(this, {});
	  }
	
	  /**
	   * @description This method will register a new function or task using the supplied UID, provided that that UID has
	   *              not previously been used. For convenience, a reference to the newly registered item will be returned.
	   *
	   *              The function or task must adhere to the formatting in the example provided, and the UID must be a
	   *              unique string (in the context of the HonestWorker instance).
	   *
	   * @example
	   * honestWorkers.register('myTask', function (done) {
	   *   // ... do something snazzy
	   *
	   *   done()
	   * })
	   *
	   * @param {String}   uid - A unique name or identifier
	   * @param {Function} fn  - A function with no lexical dependance
	   *
	   * @return {Function} A reference to the new congifuration object
	   */
	
	
	  _createClass(HonestWorkers, [{
	    key: 'register',
	    value: function register(uid, fn) {
	      var workers = _workers.get(this);
	
	      // Ensure that the UID provided has not previously been used
	      if (workers[uid]) {
	        throw Error('The UID must be unique');
	      }
	
	      workers[uid] = (0, _utils.createWorkerScript)(fn);
	      _workers.set(this, workers);
	
	      return workers[uid];
	    }
	
	    /**
	     * @param {String} uid  - A unique name or identifier
	     * @param {...Any} args - A list of arguements to be passed
	     *
	     * @return {Promise} A Promise dependant on the success of the task
	     */
	
	  }, {
	    key: 'execute',
	    value: function execute(uid) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      var worker = void 0;
	
	      // Ensure that the UID has been registered
	      if (!(worker = _workers.get(this)[uid])) {
	        throw Error('The UID has not been defined');
	      }
	
	      worker = new Worker(worker);
	
	      return new Promise(function (resolve, reject) {
	        worker.onmessage = function (e) {
	          resolve(e.data);
	        };
	
	        worker.postMessage(args);
	      });
	    }
	
	    /**
	     * @return {Function} - A reference to the HonestWorkers class
	     */
	
	  }, {
	    key: 'Class',
	    get: function get() {
	      return HonestWorkers;
	    }
	  }]);
	
	  return HonestWorkers;
	}();
	
	module.exports = new HonestWorkers();

/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function createWorkerScript(fn) {
	  // Ensure that "fn" is a function
	  if (typeof fn !== 'function') {
	    throw Error('Worker script must be a function');
	  }
	
	  var blob = new Blob(['self.onmessage = function (e) {\n      e.data[e.data.length] = function () {\n        if (!arguments.length) {\n          arguments = [null]\n        }\n        postMessage.apply(this, arguments)\n      }\n      return (' + fn.toString() + ').apply(this, e.data)\n    }'], { type: 'application/javascript' });
	
	  return URL.createObjectURL(blob);
	}
	
	exports.createWorkerScript = createWorkerScript;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=honest-workers.js.map