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
const core_1 = require("@tool-plugin/core");
class UploadSourceMapPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync('UploadSourceMapPlugin', (compilation, callback) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const outputPath = (_a = compilation.options.output) === null || _a === void 0 ? void 0 : _a.path;
                if (!outputPath) {
                    return;
                }
                const { appId, appKey } = this.options;
                yield (0, core_1.uploadMapFile)({ appId, appKey, directoryPath: outputPath });
                callback();
            }
            catch (error) {
                callback();
                console.error('Error uploading source map:', error);
            }
        }));
    }
}
exports.default = UploadSourceMapPlugin;
