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
exports.fetchTaskStatus = void 0;
const fetchTaskStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    let url = "http://localhost:5000/WebCollectTaskManagementService/getTasks";
    return fetch(url)
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        return data;
    })
        .catch((err) => console.log("Error while fetching: " + err));
});
exports.fetchTaskStatus = fetchTaskStatus;
