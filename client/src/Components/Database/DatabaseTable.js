"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("../../Style/DatabaseTable.css");
const react_1 = require("react");
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    let url = "http://localhost:5000/DatabaseQueryService/getData";
    return fetch(url)
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        return data;
    })
        .catch((err) => console.log("Error while fetching: " + err));
});
const DatabaseTable = (props) => {
    const [qaData, setQAData] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        let i = 0;
        let run = () => __awaiter(void 0, void 0, void 0, function* () {
            let data = yield fetchData();
            setQAData(data);
        });
        setTimeout(run, 3000);
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: "overflowContent", children: (0, jsx_runtime_1.jsxs)("table", { className: "fixedHeader", children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Title" }), (0, jsx_runtime_1.jsx)("th", { children: "Url" })] }), qaData.map((data) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: data.title }), (0, jsx_runtime_1.jsx)("td", { children: data.url })] })))] }) }) }));
};
exports.DatabaseTable = DatabaseTable;
