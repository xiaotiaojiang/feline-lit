import { css, html, LitElement } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
@customElement('block-container')
export default class BlockContainer extends LitElement {
  styles = css`
  div {
    display: inline-grid;
    gap: 10px;
  }
  slotted::(*) {
    display: inline-flex;
justify-self: stretch;
  }
`;
  render() {
    return html`<div><slot></slot></div>`;
  }
}
