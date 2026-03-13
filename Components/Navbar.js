

export class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        app-navbar {
          display: block;
        }
        nav {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          padding: 0.5rem 0;
        }
        .navbar-brand {
          margin-right: auto;
        }
      </style>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container-sm px-2 px-sm-3">
          <img
            src="Assets/NextDoorSALogo.png"
            alt="NextDoorSA logo"
            class="brand-logo"
            loading="lazy"
          />
          <a class="navbar-brand brand-name" href="home.html">NextDoorSA</a>
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
                <a class="nav-link" href="registerPage.html">Register</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="login.html">Log In</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="home.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="explore.html">Explore</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="createListing.html">Create a Listing</a>
              </li>
              <li class="nav-item">
                <profile-icon-component></profile-icon-component>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define("app-navbar", NavbarComponent);

