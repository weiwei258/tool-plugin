import { uploadMapFile } from '@tool-plugin/core';
import { resolve } from 'path';
import { type PluginOption } from 'vite';

interface LoadMapFilePluginParams {
  appKey: string;
  appId: string;
}
export default function loadMapFilePlugin(
  params: LoadMapFilePluginParams,
): PluginOption {
  const { appKey, appId } = params;
  let outputDir: string | undefined;
  return {
    name: 'tool-plugin-vite',
    apply: 'build',
    configResolved: (config) => {
      outputDir = config.build.outDir;
    },

    writeBundle: async function () {
      if (outputDir) {
        const absoluteOutputDir = resolve(process.cwd(), outputDir);
        await uploadMapFile({
          directoryPath: absoluteOutputDir,
          appKey,
          appId,
        });
      }
    },
  };
}
