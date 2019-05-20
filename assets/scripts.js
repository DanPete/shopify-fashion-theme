// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"core/theme.js":[function(require,module,exports) {
$('.btn.edit-address').click(function () {
  $(this).hide();
  $(this).parents('td').siblings('.address-edit').show();
  $(this).siblings('.btn.edit-address-cancel').show();
  $(this).siblings('.btn.edit-address-submit').show();
  $(this).siblings('.btn.delete-address').hide();
  $(this).parents('td').siblings('.address-record').hide();
});
$('.btn.edit-address-submit').click(function () {
  $(this).hide();
  $(this).parents('td').siblings('.address-edit').hide();
  $(this).siblings('.btn.edit-address-cancel').hide();
  $(this).siblings('.btn.edit-address').show();
  $(this).siblings('.btn.delete-address').show();
  $(this).parents('td').siblings('.address-record').show();
});
$('.btn.edit-address-cancel').click(function () {
  $(this).hide();
  $(this).parents('td').siblings('.address-edit').hide();
  $(this).siblings('.btn.edit-address-submit').hide();
  $(this).siblings('.btn.edit-address').show();
  $(this).siblings('.btn.delete-address').show();
  $(this).parents('td').siblings('.address-record').show();
});
$('.carousel').carousel();
$('.single-product-images').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  customPaging: function customPaging(slider, i) {
    var thumb = $(slider.$slides[i]).data('thumb');
    return "<a><img class=\"img-fluid\" src=".concat(thumb, " /></a>");
  },
  responsive: [{
    breakpoint: 1024,
    settings: {
      // TODO maybe change this?? slidesToShow: 3, slidesToScroll: 3
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
});

function getVariantFromOptions() {
  var variantArr = [];
  $(".product-category select").map(function (i, el) {
    variant = {
      value: $(el).val(),
      index: $(el).data('index')
    };
    variantArr.push(variant);
  });
  return variantArr;
}

function updateHistoryState(variant) {
  if (!history.replaceState || !variant) {
    return;
  }

  var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
  window.history.replaceState({
    path: newurl
  }, '', newurl);
}

$('.product-category select').on('change', function () {
  var selectedValues = getVariantFromOptions();
  var variants = window.product.variants; // Search for product variants based on what was selected in the dropdowns

  var found = _.find(variants, function (variant) {
    return selectedValues.every(function (values) {
      return _.isEqual(variant[values.index], values.value);
    });
  });

  updateHistoryState(found);
  $('#variant-id').val(found.id);
});
$(window).scroll(function () {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});
$(window).scroll(function () {
  if ($(document).scrollTop() > 1) {
    $('.header').addClass('scroll');
  } else {
    $('.header').removeClass('scroll');
  }
});
/* Open and Close Drawers with Mobile Menus */

document.querySelector('[data-mobile-menu-open]').addEventListener("click", function () {
  document.getElementById('mobile-menu').style.transform = "translateX(0px)";
  document.body.classList.add("scroll-lock");
});
$('[data-mobile-menu-close]').click(function () {
  $('.mobile-menu').css('transform', 'translateX(-125%)');
  $('.mobile-menu__mega-menu').css('transform', 'translateX(-125%)');
  $('body').removeClass('scroll-lock');
}); // document.querySelectorAll('[data-mobile-menu-close]').addEventListener("click", function() {
//   console.log(document.getElementById('mobile-menu').style)
//   document.getElementById('mobile-menu').style.transform = "translateX(-125%)"
//   document.getElementById('mobile-menu__mega-menu').style.transform = "translateX(-125%)"
//   document.body.classList.remove("scroll-lock")
// });

document.querySelector('[data-submenu-link]').addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById('mobile-menu__mega-menu').style.transform = "translateX(0px)";
});
$('[data-mobile-menu-back]').click(function () {
  $('.mobile-menu__mega-menu').css('transform', 'translateX(-125%)');
});
},{}],"../node_modules/@shopify/theme-product-form/listeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Listeners;

function Listeners() {
  this.entries = [];
}

Listeners.prototype.add = function (element, event, fn) {
  this.entries.push({
    element: element,
    event: event,
    fn: fn
  });
  element.addEventListener(event, fn);
};

Listeners.prototype.removeAll = function () {
  this.entries = this.entries.filter(function (listener) {
    listener.element.removeEventListener(listener.event, listener.fn);
    return false;
  });
};
},{}],"../node_modules/@shopify/theme-product/theme-product.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductJson = getProductJson;
exports.getVariantFromId = getVariantFromId;
exports.getVariantFromSerializedArray = getVariantFromSerializedArray;
exports.getVariantFromOptionArray = getVariantFromOptionArray;

/**
 * Returns a product JSON object when passed a product URL
 * @param {*} url
 */
function getProductJson(handle) {
  return fetch('/products/' + handle + '.js').then(function (response) {
    return response.json();
  });
}
/**
 * Find a match in the project JSON (using a ID number) and return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Number} value Accepts Number (e.g. 6908023078973)
 * @returns {Object} The variant object once a match has been successful. Otherwise null will be return
 */


function getVariantFromId(product, value) {
  _validateProductStructure(product);

  if (typeof value !== 'number') {
    throw new TypeError(value + ' is not a Number.');
  }

  var result = product.variants.filter(function (variant) {
    return variant.id === value;
  });
  return result[0] || null;
}
/**
 * Convert the Object (with 'name' and 'value' keys) into an Array of values, then find a match & return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Object} collection Object with 'name' and 'value' keys (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
 * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
 */


function getVariantFromSerializedArray(product, collection) {
  _validateProductStructure(product); // If value is an array of options


  var optionArray = _createOptionArrayFromOptionCollection(product, collection);

  return getVariantFromOptionArray(product, optionArray);
}
/**
 * Find a match in the project JSON (using Array with option values) and return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Array} options List of submitted values (e.g. ['36', 'Black'])
 * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
 */


function getVariantFromOptionArray(product, options) {
  _validateProductStructure(product);

  _validateOptionsArray(options);

  var result = product.variants.filter(function (variant) {
    return options.every(function (option, index) {
      return variant.options[index] === option;
    });
  });
  return result[0] || null;
}
/**
 * Creates an array of selected options from the object
 * Loops through the project.options and check if the "option name" exist (product.options.name) and matches the target
 * @param {Object} product Product JSON object
 * @param {Array} collection Array of object (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
 * @returns {Array} The result of the matched values. (e.g. ['36', 'Black'])
 */


function _createOptionArrayFromOptionCollection(product, collection) {
  _validateProductStructure(product);

  _validateSerializedArray(collection);

  var optionArray = [];
  collection.forEach(function (option) {
    for (var i = 0; i < product.options.length; i++) {
      if (product.options[i].name.toLowerCase() === option.name.toLowerCase()) {
        optionArray[i] = option.value;
        break;
      }
    }
  });
  return optionArray;
}
/**
 * Check if the product data is a valid JS object
 * Error will be thrown if type is invalid
 * @param {object} product Product JSON object
 */


function _validateProductStructure(product) {
  if (typeof product !== 'object') {
    throw new TypeError(product + ' is not an object.');
  }

  if (Object.keys(product).length === 0 && product.constructor === Object) {
    throw new Error(product + ' is empty.');
  }
}
/**
 * Validate the structure of the array
 * It must be formatted like jQuery's serializeArray()
 * @param {Array} collection Array of object [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }]
 */


function _validateSerializedArray(collection) {
  if (!Array.isArray(collection)) {
    throw new TypeError(collection + ' is not an array.');
  }

  if (collection.length === 0) {
    throw new Error(collection + ' is empty.');
  }

  if (collection[0].hasOwnProperty('name')) {
    if (typeof collection[0].name !== 'string') {
      throw new TypeError('Invalid value type passed for name of option ' + collection[0].name + '. Value should be string.');
    }
  } else {
    throw new Error(collection[0] + 'does not contain name key.');
  }
}
/**
 * Validate the structure of the array
 * It must be formatted as list of values
 * @param {Array} collection Array of object (e.g. ['36', 'Black'])
 */


function _validateOptionsArray(options) {
  if (Array.isArray(options) && typeof options[0] === 'object') {
    throw new Error(options + 'is not a valid array of options.');
  }
}
},{}],"../node_modules/@shopify/theme-product-form/theme-product-form.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlWithVariant = getUrlWithVariant;
exports.ProductForm = ProductForm;

var _listeners = _interopRequireDefault(require("./listeners"));

var _themeProduct = require("@shopify/theme-product");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectors = {
  idInput: '[name="id"]',
  optionInput: '[name^="options"]',
  quantityInput: '[name="quantity"]',
  propertyInput: '[name^="properties"]'
}; // Public Methods
// -----------------------------------------------------------------------------

/**
 * Returns a URL with a variant ID query parameter. Useful for updating window.history
 * with a new URL based on the currently select product variant.
 * @param {string} url - The URL you wish to append the variant ID to
 * @param {number} id  - The variant ID you wish to append to the URL
 * @returns {string} - The new url which includes the variant ID query parameter
 */

function getUrlWithVariant(url, id) {
  if (/variant=/.test(url)) {
    return url.replace(/(variant=)[^&]+/, '$1' + id);
  } else if (/\?/.test(url)) {
    return url.concat('&variant=').concat(id);
  }

  return url.concat('?variant=').concat(id);
}
/**
 * Constructor class that creates a new instance of a product form controller.
 *
 * @param {Element} element - DOM element which is equal to the <form> node wrapping product form inputs
 * @param {Object} product - A product object
 * @param {Object} options - Optional options object
 * @param {Function} options.onOptionChange - Callback for whenever an option input changes
 * @param {Function} options.onQuantityChange - Callback for whenever an quantity input changes
 * @param {Function} options.onPropertyChange - Callback for whenever a property input changes
 * @param {Function} options.onFormSubmit - Callback for whenever the product form is submitted
 */


function ProductForm(element, product, options) {
  this.element = element;
  this.product = _validateProductObject(product);
  options = options || {};
  this._listeners = new _listeners.default();

  this._listeners.add(this.element, 'submit', this._onSubmit.bind(this, options));

  this.optionInputs = this._initInputs(selectors.optionInput, options.onOptionChange);
  this.quantityInputs = this._initInputs(selectors.quantityInput, options.onQuantityChange);
  this.propertyInputs = this._initInputs(selectors.propertyInput, options.onPropertyChange);
}
/**
 * Cleans up all event handlers that were assigned when the Product Form was constructed.
 * Useful for use when a section needs to be reloaded in the theme editor.
 */


ProductForm.prototype.destroy = function () {
  this._listeners.removeAll();
};
/**
 * Getter method which returns the array of currently selected option values
 *
 * @returns {Array} An array of option values
 */


ProductForm.prototype.options = function () {
  return _serializeInputValues(this.optionInputs, function (item) {
    var regex = /(?:^(options\[))(.*?)(?:\])/;
    item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'

    return item;
  });
};
/**
 * Getter method which returns the currently selected variant, or `null` if variant
 * doesn't exist.
 *
 * @returns {Object|null} Variant object
 */


ProductForm.prototype.variant = function () {
  return (0, _themeProduct.getVariantFromSerializedArray)(this.product, this.options());
};
/**
 * Getter method which returns a collection of objects containing name and values
 * of property inputs
 *
 * @returns {Array} Collection of objects with name and value keys
 */


ProductForm.prototype.properties = function () {
  return _serializeInputValues(this.propertyInputs, function (item) {
    var regex = /(?:^(properties\[))(.*?)(?:\])/;
    item.name = regex.exec(item.name)[2]; // Use just the value between 'properties[' and ']'

    return item;
  });
};
/**
 * Getter method which returns the current quantity or 1 if no quantity input is
 * included in the form
 *
 * @returns {Array} Collection of objects with name and value keys
 */


ProductForm.prototype.quantity = function () {
  return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1;
}; // Private Methods
// -----------------------------------------------------------------------------


ProductForm.prototype._setIdInputValue = function (value) {
  var idInputElement = this.element.querySelector(selectors.idInput);

  if (!idInputElement) {
    idInputElement = document.createElement('input');
    idInputElement.type = 'hidden';
    idInputElement.name = 'id';
    this.element.appendChild(idInputElement);
  }

  idInputElement.value = value.toString();
};

ProductForm.prototype._onSubmit = function (options, event) {
  event.dataset = this._getProductFormEventData();

  this._setIdInputValue(event.dataset.variant.id);

  if (options.onFormSubmit) {
    options.onFormSubmit(event);
  }
};

ProductForm.prototype._onFormEvent = function (cb) {
  if (typeof cb === 'undefined') {
    return Function.prototype;
  }

  return function (event) {
    event.dataset = this._getProductFormEventData();
    cb(event);
  }.bind(this);
};

ProductForm.prototype._initInputs = function (selector, cb) {
  var elements = Array.prototype.slice.call(this.element.querySelectorAll(selector));
  return elements.map(function (element) {
    this._listeners.add(element, 'change', this._onFormEvent(cb));

    return element;
  }.bind(this));
};

ProductForm.prototype._getProductFormEventData = function () {
  return {
    options: this.options(),
    variant: this.variant(),
    properties: this.properties(),
    quantity: this.quantity()
  };
};

function _serializeInputValues(inputs, transform) {
  return inputs.reduce(function (options, input) {
    if (input.checked || // If input is a checked (means type radio or checkbox)
    input.type !== 'radio' && input.type !== 'checkbox' // Or if its any other type of input
    ) {
        options.push(transform({
          name: input.name,
          value: input.value
        }));
      }

    return options;
  }, []);
}

function _validateProductObject(product) {
  if (typeof product !== 'object') {
    throw new TypeError(product + ' is not an object.');
  }

  if (typeof product.variants[0].options === 'undefined') {
    throw new TypeError('Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route');
  }

  return product;
}
},{"./listeners":"../node_modules/@shopify/theme-product-form/listeners.js","@shopify/theme-product":"../node_modules/@shopify/theme-product/theme-product.js"}],"components/product.js":[function(require,module,exports) {
"use strict";

var _themeProductForm = require("@shopify/theme-product-form");

var selectors = {
  productAddToCart: '[data-product-atc-button]',
  productForm: '[data-product-form]'
};
$(selectors.productAddToCart).click(function (e) {
  console.log('add to cart');
  e.preventDefault();

  if (!$(this).hasClass('out-of-stock')) {
    var variantId = $(selectors.productForm).serialize(); // const variantId = selectors.productForm.variant()['id'];

    ajaxAddItemToCart(variantId);
  }
});
console.log("It all works");
},{"@shopify/theme-product-form":"../node_modules/@shopify/theme-product-form/theme-product-form.js"}],"components/cart-drawer.js":[function(require,module,exports) {
var selectors = {
  cartLink: '[data-cart-link]',
  cartDrawer: '.cart-drawer',
  cartDrawerInner: '.cart-drawer__inner',
  cartDrawerClose: '[data-cart-close]',
  cartItemRemove: '[data-remove-cart-item]',
  cartDrawerItems: '.cart-drawer__items',
  cartCount: '.cart-count' //cart drawer open

};
$('[data-cart-link]').click(function (e) {
  e.preventDefault();
  openCart();
}); //cart drawer close

$('[data-cart-close]').click(function () {
  console.log("clicked");
  closeCart();
});
$('.cart-drawer').click(function (e) {
  // console.log($(e.target).data("cart-drawer-outer"))
  if ($(e.target).data("cart-drawer-outer")) {
    e.preventDefault();
    closeCart();
  }
});

function refreshCartButtons() {
  $(selectors.cartDrawerClose).click(function (e) {
    e.preventDefault();
    closeCart();
  });
  $(selectors.cartItemRemove).click(function (e) {
    // e.preventDefault();
    console.log("clicked");
    var lineItemNumber = $(e.currentTarget).data('line-number');
    var quantity = 0;
    $.ajax({
      url: "/cart/change.js",
      type: 'POST',
      dataType: 'JSON',
      data: {
        quantity: quantity,
        line: lineItemNumber
      },
      success: function success() {
        refreshCart();
      }
    });
  });
}

function addItem(form_id) {
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    dataType: 'json',
    data: $('#' + form_id).serialized(),
    success: console.log(form_id)
  });
}

window.ajaxAddItemToCart = function (id) {
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var text = $.ajax({
    url: "/cart/add.js",
    type: 'POST',
    dataType: 'JSON',
    data: id,
    success: function success(data) {
      console.log("Ajax worked");
      refreshCart();
    }
  });
}; // window.ajaxAddItemToCart = function(id, properties = null) {
//   var text = $.ajax({
//     url: "/cart/add.js",
//     type: 'POST',
//     dataType: 'JSON',
//     data: {
//       quantity: 1,
//       id: id,
//       properties: properties
//     },
//     success: function(data) {
//       console.log("Ajax worked")
//       refreshCart();
//     }
//   })
// }


window.openCart = function () {
  // $('.cart-drawer').css('transform', 'translateX(0px)');
  $('.cart-drawer').css('z-index', '1000');
  $('.cart-drawer').css('background-color', 'rgba(0, 0, 0, 0.7)');
  $('.cart-drawer__inner').css('transform', 'translateX(0px)');
  $('body').addClass('scroll-lock');
  $('.cart-drawer__inner').css('z-index', '1200');
};

window.closeCart = function () {
  $('.cart-drawer__inner').css('transform', 'translateX(100%)');
  $('.cart-drawer').css('z-index', '-1');
  $('.cart-drawer__inner').css('z-index', '-1');
  $('body').removeClass('scroll-lock');
  $('.cart-drawer').css('background-color', 'transparent');
};

window.refreshCart = function () {
  $.ajax({
    url: "/account/login",
    type: 'GET',
    success: function success(data) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = data;
      console.log(wrapper);
      var cartInnerHtml = wrapper.querySelector('.cart-drawer__inner').innerHTML;
      var cartItemCount = wrapper.querySelector('.cart-count');

      if (cartItemCount != undefined) {
        var cartCount = "";
      } else {
        var cartCount = cartItemCount.innerHTML;
      }

      $(selectors.cartCount).html(cartItemCount);
      $(selectors.cartDrawerInner).html(cartInnerHtml);
      openCart();
      refreshCartButtons();
    }
  });
}; // window.openCart()
},{}],"scripts.js":[function(require,module,exports) {
"use strict";

require("./core/theme.js");

require("./components/product.js");

require("./components/cart-drawer.js");

console.log('Parcel!');
},{"./core/theme.js":"core/theme.js","./components/product.js":"components/product.js","./components/cart-drawer.js":"components/cart-drawer.js"}]},{},["scripts.js"], null)
//# sourceMappingURL=/scripts.js.map