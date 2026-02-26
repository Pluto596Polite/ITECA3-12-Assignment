export class SearchBarComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const placeholder = this.getAttribute("placeholder") || "Search...";

    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .search-group {
          width: 100%;
        }
        .input-group {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .form-control {
          border-radius: 8px 0 0 8px;
        }
        .btn {
          border-radius: 0 8px 8px 0;
        }
      </style>
      <div class="input-group search-group mb-4">
        <input
          type="text"
          class="form-control border-start-0 ps-4 shadow-sm"
          placeholder="${placeholder}"
          aria-label="Search"
        />
        <button class="btn btn-primary" type="button" id="search-button">
          <i class="bi bi-search"></i>
        </button>
      </div>
    `;
  }
}
customElements.define("search-bar", SearchBarComponent);

