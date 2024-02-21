import { type PluginOption } from 'vite';
interface LoadMapFilePluginParams {
    appKey: string;
    appId: string;
}
export default function loadMapFilePlugin(params: LoadMapFilePluginParams): PluginOption;
export {};
