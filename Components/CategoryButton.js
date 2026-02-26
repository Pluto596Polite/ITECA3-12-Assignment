export class CategoryButtonComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute("label") || "Button";
    const icon = this.getAttribute("icon") || "";
    const variant = this.getAttribute("variant") || "btn-primary";

    this.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        button {
          border-radius: 8px;
          padding: 8px 12px;
          transition: transform 100ms ease, box-shadow 100ms ease;
          font-size: 12px;
        }
        button:active {
          transform: translateY(1px) scale(0.98);
        }
      </style>
      <button type="button" class="btn ${variant} round-button">
        ${icon}
        ${label}
      </button>
    `;
  }
}
customElements.define("category-button", CategoryButtonComponent);
