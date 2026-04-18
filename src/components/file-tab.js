import { customElement, property } from 'lit/decorators.js';
import { BaseDropdown } from './base-dropdown.js';

@customElement('file-tab')
export class FileTab extends BaseDropdown {
  buttonLabel = '世界选项';
}
