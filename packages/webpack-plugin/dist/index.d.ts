import type * as webpack from 'webpack';
interface UploadSourceMapPluginOptions {
    appKey: string;
    appId: string;
}
declare class UploadSourceMapPlugin {
    private readonly options;
    constructor(options: UploadSourceMapPluginOptions);
    apply(compiler: webpack.Compiler): void;
}
export default UploadSourceMapPlugin;
