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
exports.uploadMapFile = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const request_1 = require("./request");
const form_data_1 = __importDefault(require("form-data"));
function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path_1.default.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList);
        }
        else {
            fileList.push({ fileName: file, filePath });
        }
    });
    return fileList;
}
const uploadMapFile = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { directoryPath, appId, appKey } = params;
    const files = getAllFiles(directoryPath);
    const mapFiles = files.filter(({ fileName }) => path_1.default.extname(fileName) === '.map');
    const form = new form_data_1.default();
    mapFiles.forEach(({ filePath, fileName }) => {
        form.append(fileName, fs.createReadStream(filePath));
    });
    yield (0, request_1.post)(`http://weiwei8848.com:7001/plugin/upload?appId=${appId}&appKey=${appKey}`, form);
    console.log('-------- 上传成功---------- 共' + mapFiles.length + '个文件');
});
exports.uploadMapFile = uploadMapFile;
