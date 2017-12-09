var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "react", "./index.scss"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoadMore = (function (_super) {
        __extends(LoadMore, _super);
        function LoadMore(props) {
            return _super.call(this, props) || this;
        }
        LoadMore.prototype.render = function () {
            return (React.createElement("div", { className: "text-load-more" }, "\u6B63\u5728\u52A0\u8F7D\u6570\u636E..."));
        };
        return LoadMore;
    }(React.Component));
    exports.default = LoadMore;
});
