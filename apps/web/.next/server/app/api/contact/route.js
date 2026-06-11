/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/contact/route";
exports.ids = ["app/api/contact/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcontact%2Froute&page=%2Fapi%2Fcontact%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcontact%2Froute.ts&appDir=%2FUsers%2Ftheeradonsomsri%2Fthinkspacesite%2Fapps%2Fweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftheeradonsomsri%2Fthinkspacesite%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcontact%2Froute&page=%2Fapi%2Fcontact%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcontact%2Froute.ts&appDir=%2FUsers%2Ftheeradonsomsri%2Fthinkspacesite%2Fapps%2Fweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftheeradonsomsri%2Fthinkspacesite%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_theeradonsomsri_thinkspacesite_apps_web_app_api_contact_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/contact/route.ts */ \"(rsc)/./app/api/contact/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/contact/route\",\n        pathname: \"/api/contact\",\n        filename: \"route\",\n        bundlePath: \"app/api/contact/route\"\n    },\n    resolvedPagePath: \"/Users/theeradonsomsri/thinkspacesite/apps/web/app/api/contact/route.ts\",\n    nextConfigOutput,\n    userland: _Users_theeradonsomsri_thinkspacesite_apps_web_app_api_contact_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5idW4vbmV4dEAxNS4wLjcrMzhkNTU2YTI1OTRiNDE0Zi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjb250YWN0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjb250YWN0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY29udGFjdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnRoZWVyYWRvbnNvbXNyaSUyRnRoaW5rc3BhY2VzaXRlJTJGYXBwcyUyRndlYiUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZ0aGVlcmFkb25zb21zcmklMkZ0aGlua3NwYWNlc2l0ZSUyRmFwcHMlMkZ3ZWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3VCO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvdGhlZXJhZG9uc29tc3JpL3RoaW5rc3BhY2VzaXRlL2FwcHMvd2ViL2FwcC9hcGkvY29udGFjdC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY29udGFjdC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NvbnRhY3RcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NvbnRhY3Qvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvdGhlZXJhZG9uc29tc3JpL3RoaW5rc3BhY2VzaXRlL2FwcHMvd2ViL2FwcC9hcGkvY29udGFjdC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcontact%2Froute&page=%2Fapi%2Fcontact%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcontact%2Froute.ts&appDir=%2FUsers%2Ftheeradonsomsri%2Fthinkspacesite%2Fapps%2Fweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftheeradonsomsri%2Fthinkspacesite%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************!*\
  !*** ../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************!*\
  !*** ../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/contact/route.ts":
/*!**********************************!*\
  !*** ./app/api/contact/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ \"(rsc)/../../node_modules/.bun/zod@3.25.76/node_modules/zod/v3/types.js\");\n\n\nconst dynamic = 'force-dynamic';\nconst contactSchema = zod__WEBPACK_IMPORTED_MODULE_1__.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_1__.string().trim().min(1, 'Name is required'),\n    email: zod__WEBPACK_IMPORTED_MODULE_1__.string().trim().email('A valid email is required'),\n    message: zod__WEBPACK_IMPORTED_MODULE_1__.string().trim().min(1, 'Message is required'),\n    company: zod__WEBPACK_IMPORTED_MODULE_1__.string().trim().optional(),\n    phone: zod__WEBPACK_IMPORTED_MODULE_1__.string().trim().optional(),\n    subject: zod__WEBPACK_IMPORTED_MODULE_1__.string().trim().optional(),\n    locale: zod__WEBPACK_IMPORTED_MODULE_1__.string().trim().optional()\n});\nasync function POST(request) {\n    let body;\n    try {\n        body = await request.json();\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            errors: {\n                _form: [\n                    'Invalid JSON body'\n                ]\n            }\n        }, {\n            status: 400\n        });\n    }\n    const result = contactSchema.safeParse(body);\n    if (!result.success) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            errors: result.error.flatten().fieldErrors\n        }, {\n            status: 400\n        });\n    }\n    const { name, email, company, phone, subject, locale } = result.data;\n    // No email provider wired up yet — log the submission server-side.\n    // Swap this for the Elysia /contact endpoint or an email service later.\n    console.info('[contact] new submission', {\n        name,\n        email,\n        company: company || null,\n        phone: phone || null,\n        subject: subject || null,\n        locale: locale || null,\n        receivedAt: new Date().toISOString()\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        ok: true\n    }, {\n        status: 200\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvbnRhY3Qvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQztBQUNuQjtBQUVoQixNQUFNRSxVQUFVLGdCQUFlO0FBRXRDLE1BQU1DLGdCQUFnQkYsdUNBQVEsQ0FBQztJQUM3QkksTUFBTUosdUNBQVEsR0FBR00sSUFBSSxHQUFHQyxHQUFHLENBQUMsR0FBRztJQUMvQkMsT0FBT1IsdUNBQVEsR0FBR00sSUFBSSxHQUFHRSxLQUFLLENBQUM7SUFDL0JDLFNBQVNULHVDQUFRLEdBQUdNLElBQUksR0FBR0MsR0FBRyxDQUFDLEdBQUc7SUFDbENHLFNBQVNWLHVDQUFRLEdBQUdNLElBQUksR0FBR0ssUUFBUTtJQUNuQ0MsT0FBT1osdUNBQVEsR0FBR00sSUFBSSxHQUFHSyxRQUFRO0lBQ2pDRSxTQUFTYix1Q0FBUSxHQUFHTSxJQUFJLEdBQUdLLFFBQVE7SUFDbkNHLFFBQVFkLHVDQUFRLEdBQUdNLElBQUksR0FBR0ssUUFBUTtBQUNwQztBQUVPLGVBQWVJLEtBQUtDLE9BQWdCO0lBQ3pDLElBQUlDO0lBRUosSUFBSTtRQUNGQSxPQUFPLE1BQU1ELFFBQVFFLElBQUk7SUFDM0IsRUFBRSxPQUFNO1FBQ04sT0FBT25CLHFEQUFZQSxDQUFDbUIsSUFBSSxDQUN0QjtZQUFFQyxJQUFJO1lBQU9DLFFBQVE7Z0JBQUVDLE9BQU87b0JBQUM7aUJBQW9CO1lBQUM7UUFBRSxHQUN0RDtZQUFFQyxRQUFRO1FBQUk7SUFFbEI7SUFFQSxNQUFNQyxTQUFTckIsY0FBY3NCLFNBQVMsQ0FBQ1A7SUFFdkMsSUFBSSxDQUFDTSxPQUFPRSxPQUFPLEVBQUU7UUFDbkIsT0FBTzFCLHFEQUFZQSxDQUFDbUIsSUFBSSxDQUN0QjtZQUFFQyxJQUFJO1lBQU9DLFFBQVFHLE9BQU9HLEtBQUssQ0FBQ0MsT0FBTyxHQUFHQyxXQUFXO1FBQUMsR0FDeEQ7WUFBRU4sUUFBUTtRQUFJO0lBRWxCO0lBRUEsTUFBTSxFQUFFbEIsSUFBSSxFQUFFSSxLQUFLLEVBQUVFLE9BQU8sRUFBRUUsS0FBSyxFQUFFQyxPQUFPLEVBQUVDLE1BQU0sRUFBRSxHQUFHUyxPQUFPTSxJQUFJO0lBRXBFLG1FQUFtRTtJQUNuRSx3RUFBd0U7SUFDeEVDLFFBQVFDLElBQUksQ0FBQyw0QkFBNEI7UUFDdkMzQjtRQUNBSTtRQUNBRSxTQUFTQSxXQUFXO1FBQ3BCRSxPQUFPQSxTQUFTO1FBQ2hCQyxTQUFTQSxXQUFXO1FBQ3BCQyxRQUFRQSxVQUFVO1FBQ2xCa0IsWUFBWSxJQUFJQyxPQUFPQyxXQUFXO0lBQ3BDO0lBRUEsT0FBT25DLHFEQUFZQSxDQUFDbUIsSUFBSSxDQUFDO1FBQUVDLElBQUk7SUFBSyxHQUFHO1FBQUVHLFFBQVE7SUFBSTtBQUN2RCIsInNvdXJjZXMiOlsiL1VzZXJzL3RoZWVyYWRvbnNvbXNyaS90aGlua3NwYWNlc2l0ZS9hcHBzL3dlYi9hcHAvYXBpL2NvbnRhY3Qvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJ1xuXG5leHBvcnQgY29uc3QgZHluYW1pYyA9ICdmb3JjZS1keW5hbWljJ1xuXG5jb25zdCBjb250YWN0U2NoZW1hID0gei5vYmplY3Qoe1xuICBuYW1lOiB6LnN0cmluZygpLnRyaW0oKS5taW4oMSwgJ05hbWUgaXMgcmVxdWlyZWQnKSxcbiAgZW1haWw6IHouc3RyaW5nKCkudHJpbSgpLmVtYWlsKCdBIHZhbGlkIGVtYWlsIGlzIHJlcXVpcmVkJyksXG4gIG1lc3NhZ2U6IHouc3RyaW5nKCkudHJpbSgpLm1pbigxLCAnTWVzc2FnZSBpcyByZXF1aXJlZCcpLFxuICBjb21wYW55OiB6LnN0cmluZygpLnRyaW0oKS5vcHRpb25hbCgpLFxuICBwaG9uZTogei5zdHJpbmcoKS50cmltKCkub3B0aW9uYWwoKSxcbiAgc3ViamVjdDogei5zdHJpbmcoKS50cmltKCkub3B0aW9uYWwoKSxcbiAgbG9jYWxlOiB6LnN0cmluZygpLnRyaW0oKS5vcHRpb25hbCgpLFxufSlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICBsZXQgYm9keTogdW5rbm93blxuXG4gIHRyeSB7XG4gICAgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgb2s6IGZhbHNlLCBlcnJvcnM6IHsgX2Zvcm06IFsnSW52YWxpZCBKU09OIGJvZHknXSB9IH0sXG4gICAgICB7IHN0YXR1czogNDAwIH1cbiAgICApXG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBjb250YWN0U2NoZW1hLnNhZmVQYXJzZShib2R5KVxuXG4gIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IG9rOiBmYWxzZSwgZXJyb3JzOiByZXN1bHQuZXJyb3IuZmxhdHRlbigpLmZpZWxkRXJyb3JzIH0sXG4gICAgICB7IHN0YXR1czogNDAwIH1cbiAgICApXG4gIH1cblxuICBjb25zdCB7IG5hbWUsIGVtYWlsLCBjb21wYW55LCBwaG9uZSwgc3ViamVjdCwgbG9jYWxlIH0gPSByZXN1bHQuZGF0YVxuXG4gIC8vIE5vIGVtYWlsIHByb3ZpZGVyIHdpcmVkIHVwIHlldCDigJQgbG9nIHRoZSBzdWJtaXNzaW9uIHNlcnZlci1zaWRlLlxuICAvLyBTd2FwIHRoaXMgZm9yIHRoZSBFbHlzaWEgL2NvbnRhY3QgZW5kcG9pbnQgb3IgYW4gZW1haWwgc2VydmljZSBsYXRlci5cbiAgY29uc29sZS5pbmZvKCdbY29udGFjdF0gbmV3IHN1Ym1pc3Npb24nLCB7XG4gICAgbmFtZSxcbiAgICBlbWFpbCxcbiAgICBjb21wYW55OiBjb21wYW55IHx8IG51bGwsXG4gICAgcGhvbmU6IHBob25lIHx8IG51bGwsXG4gICAgc3ViamVjdDogc3ViamVjdCB8fCBudWxsLFxuICAgIGxvY2FsZTogbG9jYWxlIHx8IG51bGwsXG4gICAgcmVjZWl2ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICB9KVxuXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG9rOiB0cnVlIH0sIHsgc3RhdHVzOiAyMDAgfSlcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJ6IiwiZHluYW1pYyIsImNvbnRhY3RTY2hlbWEiLCJvYmplY3QiLCJuYW1lIiwic3RyaW5nIiwidHJpbSIsIm1pbiIsImVtYWlsIiwibWVzc2FnZSIsImNvbXBhbnkiLCJvcHRpb25hbCIsInBob25lIiwic3ViamVjdCIsImxvY2FsZSIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsImpzb24iLCJvayIsImVycm9ycyIsIl9mb3JtIiwic3RhdHVzIiwicmVzdWx0Iiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImVycm9yIiwiZmxhdHRlbiIsImZpZWxkRXJyb3JzIiwiZGF0YSIsImNvbnNvbGUiLCJpbmZvIiwicmVjZWl2ZWRBdCIsIkRhdGUiLCJ0b0lTT1N0cmluZyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/contact/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/bun"], () => (__webpack_exec__("(rsc)/../../node_modules/.bun/next@15.0.7+38d556a2594b414f/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcontact%2Froute&page=%2Fapi%2Fcontact%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcontact%2Froute.ts&appDir=%2FUsers%2Ftheeradonsomsri%2Fthinkspacesite%2Fapps%2Fweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftheeradonsomsri%2Fthinkspacesite%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();