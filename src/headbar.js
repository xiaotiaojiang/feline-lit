import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('head-bar-container')
export class HeadBar extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: min-centent;
      gap: 12px;
      align-items: left;
      padding: 0.5vh;
      padding-top: 0;
      background-color: var(--top-bar-bg, rgba(21, 26, 40));
      border: 5px solid var(--top-bar-border, rgba(208, 208, 208, 0.8);
      border-radius: 5px;
      overflow: hidden;
    }
    
    ::slotted(*) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  `;

  render() {
    return html` <slot></slot> `;
  }
}
