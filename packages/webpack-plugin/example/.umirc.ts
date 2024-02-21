import { defineConfig } from 'umi';
import UploadSourceMapPlugin from '@tool-plugin/webpack-plugin';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
  ],
  npmClient: 'pnpm',
  chainWebpack(config) {
    config.devtool('source-map');
    config.plugin('UploadSourceMapPlugin').use(
      new UploadSourceMapPlugin({
        appId: 'mGGeXsyR',
        appKey: 'd232ab18af1da3e70cd2934ccd01aa02',
      }),
    );
  },
});
