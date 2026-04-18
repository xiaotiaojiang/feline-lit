import { customElement, property } from 'lit/decorators.js';
import { BaseDropdown } from './base-dropdown.js';

@customElement('lang-tab')
export class LangTab extends BaseDropdown {
  buttonLabel = '语言选项';
}
