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
componentConfigs.forEach(async (config) => {
  try {
    const module = await config.importFn();
    const componentClass = module.default;

    if (componentClass && !customElements.get(config.tagName)) {
      customElements.define(config.tagName, componentClass);

      // 添加 HMR 支持
      if (import.meta.webpackHot) {
        import.meta.webpackHot.accept(`./${config.tagName}.js`, () => {
          console.log(`HMR updated: ${config.tagName}`);
        });
      }
    }
  } catch (error) {
    console.error(`Failed to load component ${config.tagName}:`, error);
  }
});
