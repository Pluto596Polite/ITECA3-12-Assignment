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
    const price = this.getAttribute("price") || "0.00";

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
        .price-text {
            color: #0d6efd;
            font-weight: bold;
            font-size: 1.1rem;
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
          <p class="card-text price-text">R ${price}</p>
          <button class="btn btn-primary view-details-btn">View Details</button>
        </div>
      </div>
    `;

    this.querySelector('.view-details-btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('view-details', {
        bubbles: true,
        composed: true,
        detail: {
          title,
          image,
          description,
          link,
          price
        }
      }));
    });
  }
}
customElements.define("product-card", ProductCardComponent);
