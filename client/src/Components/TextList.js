"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
class TextList extends react_1.default.Component {
    constructor(props) {
        super(props);
        const words = props.words;
        console.log(`words: ${words}`);
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("ul", { style: { listStyleType: 'none' }, children: this.props.words.map((word, idx) => (0, jsx_runtime_1.jsx)("li", { children: word }, idx)) }) }) }));
    }
    ;
}
