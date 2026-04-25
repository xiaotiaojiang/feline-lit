import { css, html, LitElement } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
@customElement('block-container')
export default class BlockContainer extends LitElement {
  styles = css`
  div {
    display: inline-grid;
  }
  slotted::(block-group){
    display: inline-flex;
  }
`;
  render() {
    return html`<div><slot></slot></div>`;
  }
}
