import './Components/Navbar.js';
import './Components/CategoryButton.js';
import {ProductCardComponent} from './Components/ProductCard.js';
import './Components/CategoryCheckbox.js';
import './Components/FormInput.js';
import './Components/FormTextarea.js';
import './Components/FormFileInput.js';
import './Components/SearchBar.js';
import './Components/ProfileIcon.js';
const normalizePathSegment = (value) => {
  if (!value) {
    return "";
  }
  return value.replace(/\/+$/, "").toLowerCase();
};

const setActiveNavLink = () => {
  let currentFile = normalizePathSegment(
    window.location.pathname.split("/").pop(),
  );

  if (currentFile === "" || currentFile === "index.html") {
    currentFile = "home.html";
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href") || "";

    if (href.startsWith("#") || href === "") {
      return;
    }

    const url = new URL(href, window.location.href);
    const linkFile = normalizePathSegment(url.pathname.split("/").pop());
    const isActive = currentFile === linkFile;

    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document
        .querySelectorAll(".nav-link")
        .forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

//the following function will be used on the explore page to apply filters
function applyFilters() {
  try {
    const checkedCategories = document.querySelectorAll(
      "#category-filter input[type='checkbox']:checked",
    );
    const selectedCategories = Array.from(checkedCategories).map(
      (cb) => cb.value,
    );

    if (selectedCategories.length === 0) {
      alert("Please select at least one category to filter by.");

    } else if (selectedCategories.length > 0) {
      alert("Filters applied: " + selectedCategories.join(", "));
    }
  } catch (error) {
    alert("An error occurred while applying filters: " + error.message);
  }
}






// The profile dropdown logic has been moved to Components/ProfileIcon.js


// Make functions identifying as global available to window
window.applyFilters = applyFilters;
window.createListing = listingObject;

