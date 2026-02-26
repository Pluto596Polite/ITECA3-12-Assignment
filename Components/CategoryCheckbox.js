export class CategoryCheckboxComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute("label") || "Category";
    const value = this.getAttribute("value") || label;

    this.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .list-group {
          border: none;
        }
        label {
          cursor: pointer;
          padding: 0.5rem 0;
          display: flex;
          gap: 0.75rem;
          align-items: center;
          border: none;
          transition: background-color 150ms ease;
        }
        label:hover {
          background-color: #f0f0f0;
          border-radius: 4px;
          padding-left: 0.25rem;
        }
      </style>
      <div class="list-group list-group-flush">
        <label class="list-group-item d-flex gap-3 align-items-center border-0 py-2 current-pointer">
          <input class="form-check-input flex-shrink-0" type="checkbox" value="${value}" style="font-size: 1.25rem;">
          ${label}
        </label>
      </div>
    `;
  }
}
customElements.define("category-checkbox", CategoryCheckboxComponent);

