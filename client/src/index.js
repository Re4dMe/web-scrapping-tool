"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
require("./Style/TaskSection.css");
const TaskBoard_1 = require("./Components/TaskBoard");
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const index_1 = require("./Components/Database/index");
const root = client_1.default.createRoot(document.getElementById('root'));
//const socket = socketIO.connect("http://localhost:5001")
const createStringPairClick = (var_string, chinese_string, english_string) => {
    const url = "http://localhost:5000/createStringPair?var_string=" + var_string + "&chinese_string=" + chinese_string + "&english_string=" + english_string;
    return fetch(url);
};
const getStringPair = () => {
    const url = "http://localhost:5000/getStringPair";
    console.log(url);
    return fetch(url).then((r) => {
        console.log(r);
        return r.json();
    });
};
const deleteStringPairRequest = (id) => {
    const url = "http://localhost:5000/deleteStringPair?id=" + id;
    return fetch(url);
};
const deleteStringPair = () => {
    const url = "http://localhost:5000/deleteStringPair";
    console.log(url);
    return fetch(url).then((r) => {
        console.log(r);
        return r.json();
    });
};
const collectPage = (collect_url) => {
    const url = "http://localhost:5000/collectPage";
    console.log(url);
    return fetch(url).then((r) => {
        console.log(r);
        return r.json();
    });
};
const addTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = "http://localhost:5000/WebCollectTaskManagementService/addTask";
        let jsonData = JSON.stringify(task);
        const response = yield fetch(url, {
            method: 'POST',
            body: jsonData,
            headers: { 'Content-Type': 'application/json ; charset=UTF-8' }
        });
        // let res = await fetch(url)
        // fetch(url).then(()=>{})
        // return res.data.data;
    }
    catch (err) {
        console.log("Error while fetching: " + err);
    }
});
let words = ['sky', 'blue', 'falcon', 'falcon', 'wood', 'cloud'];
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
const dictionaryToPlainText = (data) => {
    let str = "";
    Object.keys(data).map((k) => { str += k.toString() + ": " + data[k].toString() + ' '; });
    return str;
};
const Test = (props) => {
    /*useEffect(() => {
      //axios.get("http://localhost:5000/createStringPair")
      
    });*/
    const [stringState, setStringState] = (0, react_1.useState)({ db_data: [], var_string: '', chinese_string: '', english_string: '', id: '' });
    /*
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGetStringPairClick = this.handleGetStringPairClick.bind(this);
    this.handleDeleteStringPairClick = this.handleDeleteStringPairClick.bind(this);
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setStringState((stringState) => (Object.assign(Object.assign({}, stringState), { [name]: value })));
    };
    const handleCreateClick = () => {
        console.log("handleClick");
        console.log(stringState);
        createStringPairClick(stringState.var_string, stringState.chinese_string, stringState.english_string);
        getStringPair().then((r) => {
            console.log(r);
            let dblist = [];
            r['data'].map((data) => { dblist.push(JSON.stringify(data)); });
            setStringState((stringState) => (Object.assign(Object.assign({}, stringState), { db_data: dblist })));
            console.log(stringState.db_data);
        });
    };
    const handleDeleteStringPairClick = () => {
        deleteStringPairRequest(stringState.id)
            .then(() => {
            getStringPair()
                .then((r) => {
                let dblist = [];
                r['data'].map((data) => { dblist.push(JSON.stringify(data)); });
                setStringState((stringState) => (Object.assign(Object.assign({}, stringState), { db_data: dblist })));
                console.log(stringState.db_data);
            });
        });
    };
    const handleGetStringPairClick = () => {
        getStringPair().then((r) => {
            let dblist = [];
            r['data'].map((data) => { dblist.push(dictionaryToPlainText(data)); });
            setStringState((stringState) => (Object.assign(Object.assign({}, stringState), { db_data: dblist })));
            console.log(stringState.db_data);
        });
        console.log("dbdata: " + stringState.db_data);
        words.shift();
        words.push("a");
    };
    const handleCollectPage = () => {
        collectPage('abc')
            .then(() => {
            console.log("done");
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "dataPanel", children: [(0, jsx_runtime_1.jsxs)("div", { className: 'stringTextSection', children: [(0, jsx_runtime_1.jsx)("span", { children: "a: " }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: 'var', name: "var_string", onChange: handleChange })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'stringTextSection', children: [(0, jsx_runtime_1.jsx)("span", { children: "a: " }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: 'chinese', name: "chinese_string", onChange: handleChange })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'stringTextSection', children: [(0, jsx_runtime_1.jsx)("span", { children: "a: " }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: 'english', name: "english_string", onChange: handleChange })] })] }), (0, jsx_runtime_1.jsx)("div", { children: stringState.var_string }), (0, jsx_runtime_1.jsx)("button", { onClick: handleCreateClick, children: "create" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleGetStringPairClick, children: "get" }), (0, jsx_runtime_1.jsx)("div", { className: "dataPanel", children: (0, jsx_runtime_1.jsxs)("div", { className: 'stringTextSection', children: [(0, jsx_runtime_1.jsx)("span", { children: "a: " }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: 'id', name: "id", onChange: handleChange })] }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleDeleteStringPairClick, children: "delete" }), (0, jsx_runtime_1.jsx)(TextList, { words: stringState.db_data }), (0, jsx_runtime_1.jsx)("button", { onClick: handleCollectPage, children: "collect" })] }));
};
function ChangeTitle() {
    (0, react_1.useEffect)(() => {
        document.title = 'Title';
    }, []);
    return (0, jsx_runtime_1.jsx)("link", { rel: "icon", href: "" });
}
//<App />
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ChangeTitle, {}), (0, jsx_runtime_1.jsxs)("div", { className: "app-container", children: [(0, jsx_runtime_1.jsx)(index_1.DatabaseTable, {}), (0, jsx_runtime_1.jsxs)("div", { className: 'task-section', children: [(0, jsx_runtime_1.jsx)(TaskBoard_1.TaskControl, { addTaskFunc: addTask }), (0, jsx_runtime_1.jsx)(TaskBoard_1.TaskBoard, {})] })] })] }) }));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
