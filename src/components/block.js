import { css, html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('fe-block')
export class Block extends LitElement {
  @property({ type: String })
  color = 'rgba(200, 200, 200, 1.0)';

  static get styles() {
    return css`
      .content {
        border: solid 1px rgba(255, 255, 255, 1);
        border-radius: 10px;
        display: inline-flex;
        background-color: rgba(200, 200, 200, 1.0);
        height: 30px;
        align-items: center;
      }
      .gap {
        width: 10px;
        height: 100%;
      }
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('color')) {
      const contentElement = this.shadowRoot?.querySelector('.content');
      if (contentElement) {
        contentElement.style.backgroundColor = this.color;
      }
    }
  }

  render() {
    return html`
      <div class="container">
         <div class="content">
          <div class='gap'></div>
          <slot></slot>
          <div class="gap"></div>
        </div>
      </div>
    `;
  }
}
