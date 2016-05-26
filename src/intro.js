(function (root, factory) {

    'use strict';

    /* Use AMD */
    if (typeof define === 'function' && define.amd) {
        define(["jQuery"], factory);
    }
    /* Use CommonJS */
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require("jQuery"));
    }
    /* Use Browser */
    else {
        root.ballista = factory(root.jQuery);
    }

  }(this, function ($) {
