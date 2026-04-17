import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

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
    }
    
    ::slotted(*) {
      display: block;
      align-items: center;
      justify-content: center;
    }
  `;

  // 父组件维护 focusedId 状态
  focusedId = null;

  handleChildClick(clickedId) {
    this.focusedId = clickedId;
    this.requestUpdate(); // 触发父组件及子组件重新渲染
  }

  render() {
    return html`
    ${this.items.map(
      (item) => html`
      <tb-class
        .extensionLogo=${item.logo}
        .color=${item.color}
        .isFocus=${item.id === this.focusedId} // 由父组件属性控制
        .extensionID=${item.id}
        @click=${() => this.handleChildClick(item.id)}
      ></tb-class>
    `,
    )}
  `;
  }
}
