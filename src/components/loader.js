// 组件配置：包含导入函数和自定义元素名称
const componentConfigs = [
  {
    importFn: () => import('./head-bar.js'),
    tagName: 'head-bar-container', // 自定义元素名称
  },
  {
    importFn: () => import('./file-tab.js'),
    tagName: 'file-tab',
  },
  {
    importFn: () => import('./lang-tab.js'),
    tagName: 'lang-tab',
  },
  {
    importFn: () => import('./logo.js'),
    tagName: 'feline-logo',
  },
  {
    importFn: () => import('./toolbox.js'),
    tagName: 'tool-box',
  },
  {
    importFn: () => import('./tb-classes.js'),
    tagName: 'tb-classes',
  },
  {
    importFn: () => import('./tb-class.js'),
    tagName: 'tb-class',
  },
];

// 动态注册所有组件
Promise.all(
  componentConfigs.map(async (config) => {
    const module = await config.importFn();
    const componentClass = module.default; // 获取默认导出的类

    if (componentClass && customElements.get(config.tagName) === undefined) {
      customElements.define(config.tagName, componentClass);
      console.log(`已注册自定义元素: <${config.tagName}>`);
    }
  }),
).catch((error) => {
  console.error('组件加载失败:', error);
});
