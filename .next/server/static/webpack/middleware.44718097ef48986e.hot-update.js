"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(middleware)/./node_modules/next/dist/esm/server/web/exports/next-response.js\");\n/* harmony import */ var iron_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iron-session */ \"(middleware)/./node_modules/iron-session/dist/index.js\");\n/* harmony import */ var _utils_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/session */ \"(middleware)/./utils/session.ts\");\n/* harmony import */ var _utils_odoo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/odoo */ \"(middleware)/./utils/odoo.ts\");\n/* harmony import */ var _utils_odoo__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_odoo__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nasync function middleware(req, res) {\n    try {\n        /* On Every Route */ if (!req.nextUrl.pathname.includes(\"/auth\") && req.nextUrl.pathname.startsWith(\"/api\")) {\n            //return await fetchUserMiddleware(request)\n            const session = await (0,iron_session__WEBPACK_IMPORTED_MODULE_3__.getIronSession)(req, res, _utils_session__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n            console.log(\"IronSession\", session);\n            if (!session) return new next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"](JSON.stringify({\n                status: 403,\n                message: \"Forbidden\"\n            }));\n            const { username, password } = session.odoo;\n            const odoo = new (_utils_odoo__WEBPACK_IMPORTED_MODULE_2___default())({\n                url: process.env.ODOO_URL,\n                port: 443,\n                db: process.env.ODOO_DB,\n                username,\n                password\n            });\n            //await odoo.connect();\n            req.session = session;\n            req.session.odoo = odoo;\n            console.log(\"Tagging session to req\", {\n                username,\n                password\n            });\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].next();\n        }\n    /* Redirect example */ //   if (request.nextUrl.pathname.startsWith('/dashboard')) {\n    //     return NextResponse.rewrite(new URL('/dashboard/user', request.url))\n    //   }\n    } catch (e) {\n        console.error(e);\n        return new next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"](JSON.stringify({\n            status: 500,\n            text: \"Internal Server Error\",\n            error: e\n        }));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMkM7QUFHRztBQUNGO0FBR047QUFFL0IsZUFBZUksV0FBV0MsR0FBZ0IsRUFBRUMsR0FBZ0I7SUFFakUsSUFBSTtRQUNOLGtCQUFrQixHQUNkLElBQUksQ0FBQ0QsSUFBSUUsT0FBTyxDQUFDQyxRQUFRLENBQUNDLFFBQVEsQ0FBQyxZQUMvQkosSUFBSUUsT0FBTyxDQUFDQyxRQUFRLENBQUNFLFVBQVUsQ0FBQyxTQUFTO1lBRXpDLDJDQUEyQztZQUMzQyxNQUFNQyxVQUFnQyxNQUFNViw0REFBY0EsQ0FBQ0ksS0FBS0MsS0FBS0osc0RBQWFBO1lBQ2xGVSxRQUFRQyxHQUFHLENBQUMsZUFBZUY7WUFDM0IsSUFBRyxDQUFDQSxTQUFTLE9BQU8sSUFBSVgsa0ZBQVlBLENBQUVjLEtBQUtDLFNBQVMsQ0FBQztnQkFBRUMsUUFBUTtnQkFBS0MsU0FBUTtZQUFXO1lBQ3ZGLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxRQUFRLEVBQUUsR0FBR1IsUUFBUVMsSUFBSTtZQUUzQyxNQUFNQSxPQUFRLElBQUlqQixvREFBVUEsQ0FBQztnQkFDM0JrQixLQUFLQyxRQUFRQyxHQUFHLENBQUNDLFFBQVE7Z0JBQ3pCQyxNQUFNO2dCQUNOQyxJQUFJSixRQUFRQyxHQUFHLENBQUNJLE9BQU87Z0JBQ3ZCVDtnQkFDQUM7WUFDRjtZQUNBLHVCQUF1QjtZQUN2QmQsSUFBSU0sT0FBTyxHQUFHQTtZQUNkTixJQUFJTSxPQUFPLENBQUNTLElBQUksR0FBR0E7WUFDbkJSLFFBQVFDLEdBQUcsQ0FBQywwQkFBMEI7Z0JBQ3BDSztnQkFDQUM7WUFDRjtZQUVBLE9BQU9uQixrRkFBWUEsQ0FBQzRCLElBQUk7UUFDNUI7SUFFQSxvQkFBb0IsR0FDaEIsNkRBQTZEO0lBRTdELDJFQUEyRTtJQUMzRSxNQUFNO0lBQ1osRUFBRSxPQUFNQyxHQUFHO1FBQ1RqQixRQUFRa0IsS0FBSyxDQUFDRDtRQUNkLE9BQU8sSUFBSTdCLGtGQUFZQSxDQUFDYyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsUUFBUTtZQUFLZSxNQUFNO1lBQXlCRCxPQUFNRDtRQUFFO0lBQy9GO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbWlkZGxld2FyZS50cz80MjJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB0eXBlIHsgTmV4dFJlcXVlc3QgfSBmcm9tICduZXh0L3NlcnZlcic7XG5cbmltcG9ydCB7IGdldElyb25TZXNzaW9uIH0gZnJvbSAnaXJvbi1zZXNzaW9uJztcbmltcG9ydCBzZXNzaW9uQ29uZmlnIGZyb20gJy4vdXRpbHMvc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi9ub2RlX21vZHVsZXMvbmV4dC1pcm9uLXNlc3Npb24vbGliL2luZGV4LmpzJztcbmltcG9ydCB7IElyb25TZXNzaW9uV2l0aE9kb28gfSBmcm9tICcuL3R5cGVzLmpzJztcbmltcG9ydCBPZG9vQ2xpZW50IGZyb20gXCIuL3V0aWxzL29kb29cIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxOiBOZXh0UmVxdWVzdCwgcmVzOk5leHRSZXNwb25zZSkge1xuICBcbiAgdHJ5IHtcbi8qIE9uIEV2ZXJ5IFJvdXRlICovXG4gICAgaWYgKCFyZXEubmV4dFVybC5wYXRobmFtZS5pbmNsdWRlcygnL2F1dGgnKSAmJlxuICAgICAgICByZXEubmV4dFVybC5wYXRobmFtZS5zdGFydHNXaXRoKCcvYXBpJykpIHtcbiAgICAgICAgXG4gICAgICAgIC8vcmV0dXJuIGF3YWl0IGZldGNoVXNlck1pZGRsZXdhcmUocmVxdWVzdClcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA6IElyb25TZXNzaW9uV2l0aE9kb28gPSBhd2FpdCBnZXRJcm9uU2Vzc2lvbihyZXEsIHJlcywgc2Vzc2lvbkNvbmZpZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXJvblNlc3Npb25cIiwgc2Vzc2lvbilcbiAgICAgICAgaWYoIXNlc3Npb24pIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKCBKU09OLnN0cmluZ2lmeSh7IHN0YXR1czogNDAzLCBtZXNzYWdlOlwiRm9yYmlkZGVuXCJ9KSlcbiAgICAgICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHNlc3Npb24ub2RvbztcblxuICAgICAgICBjb25zdCBvZG9vICA9IG5ldyBPZG9vQ2xpZW50KHtcbiAgICAgICAgICB1cmw6IHByb2Nlc3MuZW52Lk9ET09fVVJMLFxuICAgICAgICAgIHBvcnQ6IDQ0MyxcbiAgICAgICAgICBkYjogcHJvY2Vzcy5lbnYuT0RPT19EQixcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZFxuICAgICAgICB9KTtcbiAgICAgICAgLy9hd2FpdCBvZG9vLmNvbm5lY3QoKTtcbiAgICAgICAgcmVxLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgICAgICByZXEuc2Vzc2lvbi5vZG9vID0gb2RvbztcbiAgICAgICAgY29uc29sZS5sb2coXCJUYWdnaW5nIHNlc3Npb24gdG8gcmVxXCIsIHtcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UubmV4dCgpO1xuICAgIH1cbiAgICBcbiAgICAvKiBSZWRpcmVjdCBleGFtcGxlICovXG4gICAgICAgIC8vICAgaWYgKHJlcXVlc3QubmV4dFVybC5wYXRobmFtZS5zdGFydHNXaXRoKCcvZGFzaGJvYXJkJykpIHtcblxuICAgICAgICAvLyAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZXdyaXRlKG5ldyBVUkwoJy9kYXNoYm9hcmQvdXNlcicsIHJlcXVlc3QudXJsKSlcbiAgICAgICAgLy8gICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBzdGF0dXM6IDUwMCwgdGV4dDogJ0ludGVybmFsIFNlcnZlciBFcnJvcicsIGVycm9yOmUgfSkpO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldElyb25TZXNzaW9uIiwic2Vzc2lvbkNvbmZpZyIsIk9kb29DbGllbnQiLCJtaWRkbGV3YXJlIiwicmVxIiwicmVzIiwibmV4dFVybCIsInBhdGhuYW1lIiwiaW5jbHVkZXMiLCJzdGFydHNXaXRoIiwic2Vzc2lvbiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Iiwic3RhdHVzIiwibWVzc2FnZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvZG9vIiwidXJsIiwicHJvY2VzcyIsImVudiIsIk9ET09fVVJMIiwicG9ydCIsImRiIiwiT0RPT19EQiIsIm5leHQiLCJlIiwiZXJyb3IiLCJ0ZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});