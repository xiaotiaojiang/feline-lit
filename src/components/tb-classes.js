import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('tb-classes')
export class ToolBoxClasses extends LitElement {
  static styles = css`
    :host {
      display: flex;
      background-color: var(--top-bar-bg, rgba(21, 26, 40));
      border: 1px solid rgba(30, 36, 50, 0.8);
      justify-content: flex-start;
      flex-wrap: nowrap;
      align-items: center;
      flex-direction: column;
      gap: 5px;
      padding: 8px 0;
    }

    ::slotted(tb-class) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  @state()
  private focusedId: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    // 监听子组件的 toolbox-click 事件
    this.addEventListener('toolbox-click', this._handleChildClick.bind(this));
  }

  private _handleChildClick(event: CustomEvent) {
    const { extensionID } = event.detail;
    this.focusedId = extensionID;

    // 更新所有子组件的 isFocus 属性
    this.querySelectorAll('tb-class').forEach((child) => {
      child.isFocus = child.extensionID === extensionID;
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
