/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ \"./src/scss/styles.scss\");\n\nconst searchInput = document.querySelector('.main__search-input');\nconst autoCompleteList = document.querySelector('.main__autocomplete-list');\nconst repositoryList = document.querySelector('.main__repos-list');\nconst autoCompleteWrapper = document.querySelector('.main__autocomplete-wrapper');\nfunction debounce(callback, ms) {\n  let timeout;\n  return (...args) => {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => {\n      callback(...args);\n    }, ms);\n  };\n}\nasync function getResponseJSON(url) {\n  try {\n    const fetchUrl = await fetch(url);\n    if (fetchUrl.ok) {\n      return fetchUrl.json();\n    }\n  } catch (error) {\n    throw new Error(error);\n  }\n}\nfunction addRepository(title, href, user, stars) {\n  const itemTemplate = document.getElementById('repositoryItem').content.cloneNode(true);\n  const repositoryItem = itemTemplate.querySelector('.main__repos-item');\n  repositoryItem.querySelector('.repository__name--link').textContent = title;\n  repositoryItem.querySelector('.repository__name--link').href = href;\n  repositoryItem.querySelector('.repository__owner--name').textContent = user;\n  repositoryItem.querySelector('.repository__stars--number').textContent = stars;\n  repositoryList.appendChild(repositoryItem);\n}\nconst renderAutocomplete = debounce(async query => {\n  const url = `https://api.github.com/search/repositories?q=${query}&per_page=5`;\n  try {\n    const data = await getResponseJSON(url);\n    if (data.items.length === 0) {\n      return;\n    }\n    const autoCompleteListFragment = document.createDocumentFragment();\n    for (const item of data.items) {\n      const listItem = document.createElement('li');\n      listItem.classList.add('main__autocomplete-item');\n      listItem.textContent = item.name;\n      listItem.id = item.id;\n      autoCompleteListFragment.appendChild(listItem);\n    }\n    localStorage.setItem(\"repoBatch\", JSON.stringify(data.items));\n    autoCompleteList.replaceChildren(autoCompleteListFragment);\n    autoCompleteWrapper.classList.add('main__autocomplete-wrapper--active');\n  } catch (error) {\n    throw new Error(error);\n  }\n}, 600);\nsearchInput.addEventListener('input', () => {\n  const searchValue = searchInput.value.trim();\n  if (searchValue.length > 0) {\n    try {\n      renderAutocomplete(searchValue);\n    } catch (error) {\n      throw new Error(error);\n    }\n  } else {\n    autoCompleteWrapper.classList.remove('main__autocomplete-wrapper--active');\n  }\n});\ndocument.addEventListener('click', e => {\n  if (!e.target.classList.contains('.main__search-wrapper')) {\n    autoCompleteWrapper.classList.remove('main__autocomplete-wrapper--active');\n  }\n});\nautoCompleteList.addEventListener('click', e => {\n  searchInput.value = \"\";\n  autoCompleteWrapper.classList.remove('main__autocomplete-wrapper--active');\n  const id = Number(e.target.id);\n  const data = JSON.parse(localStorage.getItem(\"repoBatch\"));\n  const [item] = data.filter(dataItem => dataItem.id === id);\n  addRepository(item.name, item.svn_url, item.owner.login, item.stargazers_count);\n});\nrepositoryList.addEventListener('click', e => {\n  if (!e.target.classList.contains(\"repository__remove-button\")) {\n    return;\n  }\n  repositoryList.removeChild(e.target.closest('li'));\n});\n\n//# sourceURL=webpack://github-searcher/./src/js/index.js?");

/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://github-searcher/./src/scss/styles.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;