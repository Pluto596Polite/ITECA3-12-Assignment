export class FormInputComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute("label") || "Input";
    const id = this.getAttribute("id") || "input-" + Math.random();
    const placeholder = this.getAttribute("placeholder") || "";
    const type = this.getAttribute("type") || "text";

    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .form-label {
          font-family: Roboto, sans-serif;
          font-weight: bold;
          margin-bottom: 0.5rem;
          font-size: clamp(0.875rem, 2vw, 1rem);
        }
        .form-control {
          width: 100%;
          font-size: clamp(0.875rem, 2vw, 1rem);
          padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 0.75rem);
        }
        @media (max-width: 575.98px) {
          .mb-3 {
            margin-bottom: 1rem !important;
          }
        }
      </style>
      <div class="mb-3 form-field-group">
        <label for="${id}" class="form-label">${label}</label>
        <input
          type="${type}"
          class="form-control"
          id="${id}"
          placeholder="${placeholder}"
        />
      </div>
    `;
  }
}
customElements.define("form-input", FormInputComponent);

