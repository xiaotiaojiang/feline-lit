import { css, html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('tb-class')
export class ToolBoxClass extends LitElement {
  @property({ type: String, reflect: true })
  extensionLogo = 'X';

  @property({ type: String, reflect: true })
  color = '#202020';

  @property({ type: Boolean, reflect: true })
  isFocus = false;

  @property({ type: String, reflect: true })
  extensionID = '';

  static styles = css`
    :host {
      cursor: pointer;
    }

    .tb-class {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 5vh;
      width: 5vh;
      min-height: 40px;
      min-width: 40px;
      border: none;
      background-color: var(--tb-bg-color, #202020);
      border-radius: 45%;
      overflow: hidden;
      transition: border-radius 0.3s ease, transform 0.2s ease;
    }

    .tb-class:hover {
      transform: scale(1.05);
    }

    .tb-class.focused {
      border-radius: 20%;
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 4px;
    }

    .logo-char {
      font-size: calc(5vh * 0.5);
      font-weight: bold;
      color: white;
      user-select: none;
    }
  `;

  handleClick() {
    this.dispatchEvent(
      new CustomEvent('toolbox-click', {
        detail: { extensionID: this.extensionID },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const isImage = this.extensionLogo?.startsWith('data:image/');
    const displayChar =
      !isImage && this.extensionLogo ? this.extensionLogo.charAt(0) : '';

    return html`
      <div
        class="tb-class ${this.isFocus ? 'focused' : ''}"
        style="--tb-bg-color: ${unsafeCSS(this.color)}"
        @click=${this.handleClick}
        role="button"
        tabindex="0"
        aria-pressed=${this.isFocus}
      >
        ${isImage
        ? html`<img
              class="logo-image"
              src="${this.extensionLogo}"
              alt="extension logo"
            />`
        : html`<span class="logo-char">${displayChar}</span>`
      }
      </div>
    `;
  }
}
