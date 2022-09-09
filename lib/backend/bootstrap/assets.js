const fs = require('fs');
const glob = require('glob');
const isEmpty = require('lodash/isEmpty');
const path = require('path');
const esbuild = require('esbuild');
const { isDebugMode } = require('../utils/debugMode');
const logger = require('../utils/logger');
const styledComponentsPlugin = require('../styled-components-esbuild-plugin');

function fileNameFromPath(filePath) {
  return path.basename(filePath);
}

function compileAndWriteMainFiles(dashboardGlob, jsAssetsDir) {
  const mainTemplateRaw = fs
      .readFileSync(path.resolve(__dirname, '..', '..', 'frontend', 'main.template.jsx'), 'utf-8');

  const files = glob
      .sync(dashboardGlob, { absolute: true })
      .map((filePath) => [fileNameFromPath(filePath), filePath]);
  const pathToRedux = path.resolve(__dirname, '..', '..', 'frontend', 'redux');
  const mainFiles = files.map(([fileName, pathToDashboard]) => [fileName,
    mainTemplateRaw
        .replace('<%PATH_TO_DASHBOARD%>', pathToDashboard)
        .replace('<%PATH_TO_REDUX%>', pathToRedux),
  ]);
  fs.mkdirSync(jsAssetsDir, { recursive: true });
  // eslint-disable-next-line max-len
  mainFiles.forEach(([fileName, content]) => fs.writeFileSync(path.resolve(jsAssetsDir, fileName), content));
  return files;
}
module.exports.compileAssets = (dashboardGlob, jsAssetsDir) => {
  const files = compileAndWriteMainFiles(dashboardGlob, jsAssetsDir);
  if (isEmpty(files)) {
    logger.error(`Glob ${dashboardGlob} does not match any files, exit.`);
    process.exit(1);
  }

  const startTime = new Date().getTime();
  logger.info(`Compiling assets to ${jsAssetsDir}: ${JSON.stringify(files)}`);

  return esbuild.build({
    entryPoints: files.map(([fileName]) => path.resolve(jsAssetsDir, fileName)),
    bundle: true,
    outdir: jsAssetsDir,
    loader: { '.js': 'jsx', '.css': 'text' },
    watch: isDebugMode(),
    plugins: [styledComponentsPlugin],
    allowOverwrite: true,
  }).then((data) => {
    logger.info(`Compiling assets finished! Took ${(new Date().getTime() - startTime) / 1000} seconds`);
    return data;
});
};
