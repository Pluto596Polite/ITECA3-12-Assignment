export class FormTextareaComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute("label") || "Text Area";
    const id = this.getAttribute("id") || "textarea-" + Math.random();
    const placeholder = this.getAttribute("placeholder") || "";
    const rows = this.getAttribute("rows") || "3";

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
          min-height: clamp(6rem, 12vw, 8rem);
        }
        @media (max-width: 575.98px) {
          .mb-3 {
            margin-bottom: 1rem !important;
          }
        }
      </style>
      <div class="mb-3 form-field-group">
        <label for="${id}" class="form-label">${label}</label>
        <textarea
          class="form-control"
          id="${id}"
          rows="${rows}"
          placeholder="${placeholder}"
        ></textarea>
      </div>
    `;
  }
}
customElements.define("form-textarea", FormTextareaComponent);

