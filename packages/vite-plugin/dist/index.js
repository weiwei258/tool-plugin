var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { uploadMapFile } from '@tool-plugin/core';
import { resolve } from 'path';
export default function loadMapFilePlugin(params) {
    const { appKey, appId } = params;
    let outputDir;
    return {
        name: 'tool-plugin-vite',
        apply: 'build',
        configResolved: (config) => {
            outputDir = config.build.outDir;
        },
        writeBundle: function () {
            return __awaiter(this, void 0, void 0, function* () {
                if (outputDir) {
                    const absoluteOutputDir = resolve(process.cwd(), outputDir);
                    yield uploadMapFile({
                        directoryPath: absoluteOutputDir,
                        appKey,
                        appId,
                    });
                }
            });
        },
    };
}
