import type * as webpack from 'webpack'
import { uploadMapFile } from '@tool-plugin/core'

interface UploadSourceMapPluginOptions {
  appKey: string
  appId: string
}

class UploadSourceMapPlugin {
  private readonly options: UploadSourceMapPluginOptions

  constructor (options: UploadSourceMapPluginOptions) {
    this.options = options
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  apply (compiler: webpack.Compiler) {
    compiler.hooks.afterEmit.tapAsync(
      'UploadSourceMapPlugin',
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async (compilation, callback) => {
        try {
          const outputPath = compilation.options.output?.path
          if (!outputPath) {
            return
          }
          const { appId, appKey } = this.options
          await uploadMapFile({ appId, appKey, directoryPath: outputPath })

          callback()
        } catch (error) {
          callback()
          console.error('Error uploading source map:', error)
        }
      }
    )
  }
}

export default UploadSourceMapPlugin
