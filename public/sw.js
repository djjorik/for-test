/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 542);
/******/ })
/************************************************************************/
/******/ ({

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (global) {
    importScripts('/sw-toolbox.js');

    // global.toolbox.options.debug = true;
    global.toolbox.router.default = global.toolbox.fastest;

    var filesToCache = ['/app', '/app.js', '/images/logo.svg'];

    // APP GETs
    global.toolbox.precache(filesToCache);
    global.toolbox.router.get('/images/*', global.toolbox.cacheFirst, {
        cache: {
            name: 'asset-cache-v2.2',
            maxEntries: 30
        }
    });
    global.toolbox.router.get('/User/getdata/', global.toolbox.fastest, {
        cache: {
            name: 'data-cache-v2.2',
            maxEntries: 1
        }
    });
    global.toolbox.router.get('/User/getchecks/', global.toolbox.networkOnly);
    global.toolbox.router.get('/User/confirm/', global.toolbox.networkOnly);
    global.toolbox.router.get('/Auth/*', global.toolbox.networkOnly);
    // END APP GETs


    // APP POSTs
    global.toolbox.router.post('/Check/*', global.toolbox.networkOnly);
    global.toolbox.router.post('/User/*', global.toolbox.networkOnly);
    global.toolbox.router.post('/Auth/*', global.toolbox.networkOnly);
    // END APP POSTs


    // VENDOR GET
    global.toolbox.router.get('/avatar/*', global.toolbox.fastest, {
        origin: /gravatar\.com/,
        cache: {
            name: 'static-vendor-cache-v2.2',
            maxEntries: 1
        }
    });
    global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
        origin: /fonts\.gstatic\.com/,
        cache: {
            name: 'static-vendor-cache-v2.2',
            maxEntries: 10
        }
    });
    global.toolbox.router.get('/css', global.toolbox.fastest, {
        origin: /fonts\.googleapis\.com/,
        cache: {
            name: 'dynamic-vendor-cache-v2.2',
            maxEntries: 5
        }
    });
    // END VENDOR GET

    // GCM PUSH
    global.addEventListener('push', function (event) {
        var title = 'Monitaure notification';
        var body = event.data.text();
        var icon = '/images/android-chrome-96x96.png';
        var tag = 'monitaure-alert-' + Date.now();

        event.waitUntil(global.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        }));
    });
    global.addEventListener('notificationclick', function (event) {
        // console.log('On notification click: ', event.notification.tag);
        // Android doesn’t close the notification when you click on it
        event.notification.close();

        // If the app is already open, we put focus on it
        // Otherwise, we open in
        event.waitUntil(clients.matchAll({
            type: 'window'
        }).then(function (clientList) {
            clientList.forEach(function (client) {
                if (client.url === '/app' && 'focus' in client) {
                    return client.focus();
                }
            });
            if (clients.openWindow) {
                return clients.openWindow('/app');
            }
        }));
    });
    // END GCM PUSH

    // Boilerplate to ensure our service worker takes control of the page ASAP
    global.addEventListener('install', function (event) {
        return event.waitUntil(global.skipWaiting());
    });
    global.addEventListener('activate', function (event) {
        return event.waitUntil(global.clients.claim());
    });
})(self);

/***/ })

/******/ });