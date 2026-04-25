// 组件配置：包含导入函数和自定义元素名称
const componentConfigs = [
  {
    importFn: () => import('./head-bar.ts'),
    tagName: 'head-bar-container', // 自定义元素名称
  },
  {
    importFn: () => import('./file-tab.ts'),
    tagName: 'file-tab',
  },
  {
    importFn: () => import('./lang-tab.ts'),
    tagName: 'lang-tab',
  },
  {
    importFn: () => import('./logo.ts'),
    tagName: 'feline-logo',
  },
  {
    importFn: () => import('./toolbox.ts'),
    tagName: 'tool-box',
  },
  {
    importFn: () => import('./tb-classes.ts'),
    tagName: 'tb-classes',
  },
  {
    importFn: () => import('./tb-class.ts'),
    tagName: 'tb-class',
  },
  {
    importFn: () => import('./block/block.ts'),
    tagName: 'fe-block',
  },
  {
    importFn: () => import('./block-container.ts'),
    tagName: 'block-container',
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
        import.meta.webpackHot.accept(`./${config.tagName}.ts`, () => {
          console.log(`HMR updated: ${config.tagName}`);
        });
      }
    }
  } catch (error) {
    console.error(`Failed to load component ${config.tagName}:`, error);
  }
});
