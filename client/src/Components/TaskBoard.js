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
exports.TaskControl = exports.TaskBoard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const TaskBoardRequest_1 = require("./TaskBoardRequest");
require("../Style/TaskBox.css");
require("../Style/TaskControl.css");
const SubTaskBoard = (props) => {
    const [tasks, setTasks] = (0, react_1.useState)({});
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: "task-box-container card container", children: props.tasks !== undefined ?
                props.tasks.map((task) => ((0, jsx_runtime_1.jsxs)("div", { className: "task-box card", children: [(0, jsx_runtime_1.jsx)("div", { className: 'button-panel' }), (0, jsx_runtime_1.jsx)("div", { className: 'delete-button' }), (0, jsx_runtime_1.jsx)("span", { children: `${task.taskName} ${task.taskID}` }), (0, jsx_runtime_1.jsx)("div", { className: 'dropdown-button' })] }))) : (0, jsx_runtime_1.jsx)("div", {}) }) }));
};
const TaskBoard = (props) => {
    const [tasks, setTasks] = (0, react_1.useState)({});
    /*
    useEffect(() => {
        fetch("http://localhost:5000/WebCollectTaskManagementService/getTasks")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => console.log("Error while fetching: " + err));
    }, [])
    */
    (0, react_1.useEffect)(() => {
        let i = 0;
        console.log("create board");
        let run = () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`count ${i}`);
            i++;
            let data = yield (0, TaskBoardRequest_1.fetchTaskStatus)();
            yield setTasks(data);
            setTimeout(run, 2000);
        });
        setTimeout(run, 1000);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column" }, children: [(0, jsx_runtime_1.jsx)(SubTaskBoard, { tasks: tasks["active"] }), (0, jsx_runtime_1.jsx)(SubTaskBoard, { tasks: tasks["pending"] }), (0, jsx_runtime_1.jsx)(SubTaskBoard, { tasks: tasks["inactive"] })] }));
};
exports.TaskBoard = TaskBoard;
const gridContainer = {
/*
display: "grid",
width: "300px",
height: "30px",
gridTemplateColumns: "repeat(3, 1fr)",
gridTemplateRows: "repeat(1, 1fr)",
*/
};
const gridItem = {
    display: "flex",
    height: "100%",
    width: "50%",
};
/*
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
*/
const TaskControl = (props) => {
    const [taskInfo, setTaskInfo] = (0, react_1.useState)({ taskID: "", taskName: "", content: "" });
    const addTaskClick = (taskInfo) => {
        props.addTaskFunc(taskInfo)
            .then(() => { });
    };
    // const classes = useStyles();
    return ((0, jsx_runtime_1.jsx)("div", { className: 'task-control-container', children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { sx: gridContainer, container: true, spacing: 1, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, sx: gridItem, xs: 4, children: (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "TaskNameField", value: taskInfo.taskName, label: "Task Name", variant: "standard", size: "small", onChange: e => setTaskInfo(Object.assign(Object.assign({}, taskInfo), { taskName: e.target.value })) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, sx: gridItem, xs: 4, children: (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "TaskContentField", value: taskInfo.content, label: "Task Content", variant: "standard", size: "small", onChange: e => setTaskInfo(Object.assign(Object.assign({}, taskInfo), { content: e.target.value })) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, sx: gridItem, xs: 4, alignItems: "stretch", style: { "marginTop": 0 }, children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", onClick: () => addTaskClick(taskInfo), children: "Add" }) })] }) }));
};
exports.TaskControl = TaskControl;
