define(["require", "exports", "react", "./index.scss"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoadMore extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", { className: "text-load-more" }, "\u6B63\u5728\u52A0\u8F7D\u6570\u636E..."));
        }
    }
    exports.default = LoadMore;
});
