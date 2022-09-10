const fs = jest.createMockFromModule('fs');

const files = {};
function __setMockFiles(filePath, file) {
  files[filePath] = file;
}
function readFileSync(filePath) {
  return files[filePath];
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;

module.exports = fs;
