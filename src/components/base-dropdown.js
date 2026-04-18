import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

// 共享的 Dropdown 样式和逻辑
const dropdownStyles = css`
  :host {
    display: inline-block;
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .container {
    position: relative;
    display: inline-block;
  }

  .main-button {
    background-color: rgba(48, 54, 68, 1);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    position: relative;
    overflow: hidden;
  }

  .main-button:hover {
    background-color: rgba(65, 80, 170, 1);
    box-shadow: 0 4px 12px rgba(55, 70, 150, 0.3);
  }

  .main-button:active {
    transform: translateY(0);
  }

  .main-button.checked {
    background-color: rgba(62, 73, 99, 1);
    animation: pulse 0.3s ease-in-out;
  }

  .main-button.checked:hover {
    background-color: rgba(82, 93, 119, 1);
  }

  .menu-container {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background: #3e495b;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 12px;
    min-width: 200px;
    z-index: 100;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .menu-container.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 0;
    max-width: 100%;
    padding: 0;
    margin: 0;
  }

  ::slotted(*) {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: rgba(200, 200, 200, 1);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    text-align: center;
    min-height: 36px;
    margin: 0;
    padding: 0;
  }

  ::slotted(*:hover) {
    background: rgba(55, 70, 150, 0.2);
    border-color: rgba(55, 70, 150, 0.3);
  }

  ::slotted(*:active) {
    transform: scale(0.98);
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

export class BaseDropdown extends LitElement {
  static styles = dropdownStyles;

  @property({ type: Boolean })
  checked = false;

  @property({ type: String })
  buttonLabel = '选项';

  @state()
  private _isHovering = false;

  connectedCallback() {
    super.connectedCallback();
    // 点击外部时关闭菜单
    document.addEventListener('click', (e) => this._handleOutsideClick(e));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', (e) => this._handleOutsideClick(e));
  }

  private _handleOutsideClick(event: MouseEvent) {
    if (!this.contains(event.target as Node)) {
      this.checked = false;
    }
  }

  private _handleClick() {
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleMouseEnter() {
    this._isHovering = true;
  }

  private _handleMouseLeave() {
    this._isHovering = false;
  }

  private _createRipple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();

    circle.className = 'ripple';
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;

    button.appendChild(circle);
  }

  render() {
    return html`
      <div
        class="container"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        <button
          class="main-button ${this.checked ? 'checked' : ''}"
          @click=${(e: MouseEvent) => {
        this._handleClick();
        this._createRipple(e);
      }}
          aria-expanded=${this.checked}
          aria-controls="menu"
        >
          ${this.buttonLabel}
        </button>

        <div
          class="menu-container ${this.checked ? 'visible' : ''}"
          id="menu"
          role="menu"
          aria-hidden=${!this.checked}
        >
          <div class="menu-grid">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
