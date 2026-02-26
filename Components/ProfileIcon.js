export class ProfileIconComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
      <style>
        /* Container positioning */
        .profile-container {
          position: relative;
          display: inline-block;
        }

        /* The Icon Button Styling */
        .profile-icon-btn {
          background: #f0f0f0; /* Light gray background */
          border: none;
          border-radius: 50%; /* Makes it a perfect circle */
          width: 45px;
          height: 45px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555; /* Icon color */
          transition: background 0.3s ease;
        }

        .profile-icon-btn:hover {
          background: #e0e0e0;
        }

        .profile-icon-btn svg {
          width: 24px;
          height: 24px;
        }

        /* Dropdown Menu styling */
        .dropdown-menu {
          display: none;
          position: absolute;
          right: 0;
          top: 55px; /* Spacing below the icon */
          background: white;
          min-width: 150px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-radius: 8px;
          z-index: 100;
        }

        .dropdown-menu.show {
          display: block;
        }

        /* Link styling inside menu */
        .dropdown-menu a {
          display: block;
          padding: 12px 16px;
          text-decoration: none;
          color: #333;
          font-family: sans-serif;
          font-size: 14px;
        }

        .dropdown-menu a:hover {
          background: #f8f8f8;
        }

        hr {
          border: 0;
          border-top: 1px solid #eee;
          margin: 0;
        }
      </style>
      <div class="profile-container">
        <button id="profileBtn" class="profile-icon-btn" aria-label="Profile Menu">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
            <path d="M20 21C20 17.134 16.866 14 13 14H11C7.13401 14 4 17.134 4 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <div id="dropdownMenu" class="dropdown-menu">
           <a href="registerPage.html">Register</a>
            <a href="login.html">Log In</a>
          <hr>
           <a href="NextDoorSAAdmin.html">Admin</a>
           <a href="">Log Out</a>
        </div>
      </div>
    `;

        // Add event listener for dropdown functionality after rendering
        this.initDropdown();
    }

    initDropdown() {
        const btn = this.querySelector('#profileBtn');
        const menu = this.querySelector('#dropdownMenu');
        const logoutLink = this.querySelector('a[href=""]');

        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent clicking the button from closing immediately
            menu.classList.toggle('show');
        });


        //the following will be used to handle the log out click
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault(); //this is used to prevent the program from simply going to the hyperlink and instead perfrom a function
            this.handleLogout();
        })

        // Close if clicking outside
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                menu.classList.remove('show');
            }
        });


    }

    handleLogout() {
        alert("The user has been logged out.");
        window.location.href="registerPage.html";
    }
}

customElements.define("profile-icon-component", ProfileIconComponent);

