const _ = require('lodash');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');

describe('assets server', () => {
  const ANY_DASHBOARD_GLOB = 'any glob';
  const ANY_ASSETS_SERVER_PORT = 9876;
  const ANY_FILE_SUFFIX1 = 'filename1';
  const ANY_FILE_SUFFIX2 = 'filename2';
  const ANY_FILE_NAME_1 = `folder/${ANY_FILE_SUFFIX1}`;
  const ANY_FILE_NAME_2 = `folder/${ANY_FILE_SUFFIX2}`;
  const ANY_FRONTEND_TEMPLATE = 'path: <%PATH_TO_DASHBOARD%>';
  let fsMock;
  let globMock;
  let serveMock;
  let cut;

  beforeEach(() => {
    mockFs();
    mockGlob();
    mockWebpackServe();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when calling compileAssets', () => {
    let webpackConfig;
    beforeEach(() => {
      cut = require('./assets');
      cut.compileAssets(ANY_DASHBOARD_GLOB, ANY_ASSETS_SERVER_PORT);
      webpackConfig = serveMock.mock.calls[0][0];
    });
    it('calls glob.sync with absolute option', () => {
      expect(globMock.sync).toHaveBeenCalledWith(ANY_DASHBOARD_GLOB, { absolute: true });
    });
    it('sets the entries', () => {
      expect(webpackConfig.entry).toEqual({
        [ANY_FILE_SUFFIX1]: `./${ANY_FILE_SUFFIX1}`,
        [ANY_FILE_SUFFIX2]: `./${ANY_FILE_SUFFIX2}`,
      });
    });
    it('creates VirtualModule for every dashboard file', () => {
      expect(webpackConfig.plugins).toEqual([
        new VirtualModulePlugin({
          contents: `path: ${ANY_FILE_NAME_1}`,
          moduleName: `./${ANY_FILE_SUFFIX1}`,
        }),
        new VirtualModulePlugin({
          contents: `path: ${ANY_FILE_NAME_2}`,
          moduleName: `./${ANY_FILE_SUFFIX2}`,
        }),
      ]);
    });
  });

  function mockFs() {
    jest.mock('fs');
    fsMock = require('fs');
    fsMock.__setMockFiles(`${__dirname}/../../frontend/main.template.jsx`, ANY_FRONTEND_TEMPLATE);
  }

  function mockGlob() {
    jest.mock('glob');
    globMock = require('glob');
    globMock.sync.mockImplementation(pattern => pattern === ANY_DASHBOARD_GLOB && [ANY_FILE_NAME_1, ANY_FILE_NAME_2]);
  }

  function mockWebpackServe() {
    jest.mock('webpack');
    serveMock = require('webpack');
  }
});
