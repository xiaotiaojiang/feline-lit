import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tool-box')
export class ToolBox extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--top-bar-bg, rgba(21, 26, 40));
      border: 1px solid rgba(30, 36, 50, 0.8); 
    }
    .container {
    display: inline-flex;
    
    }
  `;

  render() {
    return html`<div class="container"><slot></slot></div> `;
  }
}
