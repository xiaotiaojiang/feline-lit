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

  static styles = css`
    .tb-class {
      display: block;
      height: 5vh;
      width: 5vh;
      border: none;
      background-color: var(--tb-bg-color, #202020);
      border-radius: 45%;
      overflow: hidden;
      transition: border-radius 0.3s ease;
    }

    .tb-class.focused {
      border-radius: 20%;
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .logo-char {
      text-align: center;
      font-size: calc(5vh * 0.5);
      line-height: 0.8;
      color: white;
      user-select: none;
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  handleClick() {
    // 仅派发自定义事件，将焦点变更请求传递给父组件
    this.dispatchEvent(
      new CustomEvent('toolbox-click', {
        detail: { extensionID: this.extensionID },
        bubbles: true, // 允许事件冒泡
        composed: true,
      }),
    );
  }
  render() {
    const isImage = this.extensionLogo.startsWith('data:image/');
    const displayChar =
      !isImage && this.extensionLogo ? this.extensionLogo.charAt(0) : '';

    return html`
      <div
        class="tb-class ${this.isFocus ? 'focused' : ''}"
        style="--tb-bg-color: ${unsafeCSS(this.color)}"
      >
        <div class="logo-container">
          ${isImage
        ? html`<img class="logo-image" src="${this.extensionLogo}" alt="logo" />`
        : html`<span class="logo-char">${displayChar}</span>`
      }
        </div>
      </div>
    `;
  }
}
