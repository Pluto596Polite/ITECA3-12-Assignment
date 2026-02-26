export class ProductCardComponent extends HTMLElement {
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

