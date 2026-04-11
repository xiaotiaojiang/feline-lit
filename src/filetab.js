import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('file-tab')
export class FileTab extends LitElement {
  static styles = css`
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

    .checkbox {
      display: none;
    }

    .menu-container {
      position: absolute;
      top: 100%;
      left: 0;
      margin: 8px;
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
      overflow: hidden;
    }

    .menu-container.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(min(4, max-content), minmax(80px, 1fr));
      gap: 0px;
      max-width: 100%;
      padding: 0px;
      margin: 0px
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
      margin: 0px;
      padding: 0px;
    }

    ::slotted(*:hover) {
      background: rgba(55, 70, 150, 0.2);
      border-color: rgba(55, 70, 150, 0.3);
    }

    ::slotted(*:active) {
      transform: scale(0.98);
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;

  @property({ type: Boolean })
  checked = false;

  @state()
  private _isHovering = false;

  private _handleClick() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true
    }));
  }

  private _handleMouseEnter() {
    this._isHovering = true;
  }

  private _handleMouseLeave() {
    this._isHovering = false;
  }

  private _createRipple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  render() {
    return html`
      <div class="container" 
           @mouseenter=${this._handleMouseEnter}
           @mouseleave=${this._handleMouseLeave}>
        
        <input 
          type="checkbox" 
          class="checkbox" 
          id="filebtn" 
          .checked=${this.checked}
          @change=${() => this.checked = !this.checked}>
        
        <button 
          class="main-button ${this.checked ? 'checked' : ''} ${this._isHovering ? 'hovering' : ''}"
          @click=${(e: MouseEvent) => {
            this._handleClick();
            this._createRipple(e);
          }}
          aria-expanded=${this.checked}
          aria-controls="menu">
          世界选项
        </button>

        <div 
          class="menu-container ${this.checked ? 'visible' : ''}"
          id="menu"
          role="menu"
          aria-hidden=${!this.checked}>
          <div class="menu-grid">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
