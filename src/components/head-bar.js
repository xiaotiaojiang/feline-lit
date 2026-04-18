import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('head-bar-container')
export default class HeadBar extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: min-content;
      gap: 12px;
      align-items: left;
      padding: 0.5vh;
      padding-top: 0;
      background-color: rgba(21, 26, 40);
      1px solid rgba(30, 36, 50, 0.8);
      border-radius: 5px;
      overflow: hidden;
    }
    
    ::slotted(*) {
      display: inline;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  `;

  render() {
    return html` <slot></slot> `;
  }
}
