define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (before, next) => function (...args) {
        if (before.apply(this, args)) {
            next.apply(this, args);
        }
    };
});
