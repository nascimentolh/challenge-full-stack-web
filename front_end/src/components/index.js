import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const component = require.context("@/components", true, /\.vue$/);

component.keys().forEach((fileName) => {
  const componentConfig = component(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
