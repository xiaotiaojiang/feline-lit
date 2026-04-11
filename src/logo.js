import { html, css, LitElement } from 'lit';

export class Logo extends LitElement {
  static styles = css`
    .logo {
      display: inline;
}
    #feline {
      font-size: 3rem;
      font-weight: 700;
      display: inline;
}
  `;

  render() {
    return html`
      <div class="logo"><span id="feline">Feline</span><span id="ide">IDE</span></div>
    `;
  }
}
