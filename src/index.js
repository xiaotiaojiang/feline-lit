import './index.css';
import('./headbar.js').then((module) => {
  //由于我并不确定加载时机，所以使用了异步引入。
  if (!customElements.get('head-bar-container')) {
    customElements.define('head-bar-container', module.HeadBar);
  }
});
import('./filetab.js').then((module) => {
  if (!customElements.get('file-tab')) {
    customElements.define('file-tab', module.FileTab);
  }
});
import('./logo.js').then((module) => {
  if (!customElements.get('feline-logo')) {
    customElements.define('feline-logo', module.Logo);
  }
});
import('./langtab.js').then((module) => {
  if (!customElements.get('lang-tab')) {
    customElements.define('lang-tab', module.LangTab);
  }
});
import('./toolbox.js').then((module) => {
  if (!customElements.get('tool-box')) {
    customElements.define('tool-box', module.ToolBox);
  }
});
import('./tb-classes.js').then((module) => {
  if (!customElements.get('tb-classes')) {
    customElements.define('tb-classes', module.ToolBoxClasses);
  }
});
import('./tb-class.js').then((module) => {
  if (!customElements.get('tb-class')) {
    customElements.define('tb-class', module.ToolBoxClass);
  }
});
