// ============================================
// NAVBAR COMPONENT
// ============================================
class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
        }
        nav {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      </style>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container-fluid">
          <img
            src="Assets/NextDoorSALogo.png"
            alt="NextDoorSA logo"
            class="brand-logo"
          />
          <a class="navbar-brand brand-name" href="Home.html">NextDoorSA</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="Home.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="Explore.html">Explore</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="CreateListing.html">Create a Listing</a>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define("navbar-component", NavbarComponent);

// ============================================
// CATEGORY BUTTON COMPONENT
// ============================================
class CategoryButtonComponent extends HTMLElement {
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
          border-radius: 10px;
          padding: 10px;
          transition: transform 120ms ease, box-shadow 120ms ease;
        }
        button:active {
          transform: translateY(2px) scale(0.98);
          box-shadow: none;
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

// ============================================
// PRODUCT CARD COMPONENT
// ============================================
class ProductCardComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Product";
    const image = this.getAttribute("image") || "";
    const description =
      this.getAttribute("description") || "Brief description of the item.";
    const link = this.getAttribute("link") || "#";

    this.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .card {
          box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.2);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 12px 12px 20px rgba(0, 0, 0, 0.25);
        }
      </style>
      <div class="card card-offset-shadow h-100 border-0">
        <img
          src="${image}"
          class="card-img-top"
          alt="${title}"
          loading="lazy"
        />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <a href="${link}" class="btn btn-primary">View Details</a>
        </div>
      </div>
    `;
  }
}
customElements.define("product-card", ProductCardComponent);

// ============================================
// CATEGORY CHECKBOX COMPONENT
// ============================================
class CategoryCheckboxComponent extends HTMLElement {
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

// ============================================
// FORM INPUT COMPONENT
// ============================================
class FormInputComponent extends HTMLElement {
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

// ============================================
// FORM TEXTAREA COMPONENT
// ============================================
class FormTextareaComponent extends HTMLElement {
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

// ============================================
// FORM FILE INPUT COMPONENT
// ============================================
class FormFileInputComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute("label") || "Upload File";
    const id = this.getAttribute("id") || "file-input-" + Math.random();
    const accept = this.getAttribute("accept") || "";

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
        <input class="form-control" type="file" id="${id}" ${accept ? `accept="${accept}"` : ""} />
      </div>
    `;
  }
}
customElements.define("form-file-input", FormFileInputComponent);

// ============================================
// SEARCH BAR COMPONENT
// ============================================
class SearchBarComponent extends HTMLElement {
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

class profileIconComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .profile-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: transform 150ms ease, box-shadow 150ms ease;
            }
            .profile-icon:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }
        </style>
        <img src="Assets/profile-placeholder.png" alt="Profile Icon" class="profile-icon">
        `;  

    }
}
