const module = require.context(".", true, /\.js$/);
const modules = {};

module.keys().forEach((fileName) => {
  if (fileName === "./index.js") return;

  const path = fileName.replace(/(\.\/|\.js)/g, "");
  const [moduleName, imported] = path.split("/");

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true,
    };
  }

  modules[moduleName][imported] = module(fileName).default;
});

export default modules;
