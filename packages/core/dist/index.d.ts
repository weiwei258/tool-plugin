interface UploadMapFileParams {
    directoryPath: string;
    appId: string;
    appKey: string;
}
export declare const uploadMapFile: (params: UploadMapFileParams) => Promise<any>;
export {};
