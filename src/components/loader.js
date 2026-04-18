// 统一的组件导出和注册
const components = [
  () => import('./head-bar.js'),
  () => import('./file-tab.js'),
  () => import('./lang-tab.js'),
  () => import('./logo.js'),
  () => import('./toolbox.js'),
  () => import('./tb-classes.js'),
  () => import('./tb-class.js'),
];

Promise.all(components.map((imp) => imp()));
