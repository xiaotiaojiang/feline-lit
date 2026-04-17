import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tb-block_table')
export class ToolBoxClasses extends LitElement {
  static styles = css`
    :host {
      display: flex;
      background-color: rgba(0,0,0,0.0);
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

  render() {
    return html`<slot></slot> `;
  }
}
