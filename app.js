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

    if (selectedCategories.length == 0) {
      alert("Please select at least one category to filter by.");
      return;
    } else if (selectedCategories.length > 0) {
      alert("Filters applied: " + selectedCategories.join(", "));
    }
  } catch (error) {
    alert("An error occurred while applying filters: " + error.message);
  }
}


//the following will be used to create an object for a listing
const listingObject = {
  id: "",
  image: "",
  title: "",
  description: "",
  tag: "",
  price: 0
}

//TO DO: read how the logic below is implemented
//the following function will be used on the create listing page to create a listing
function createListing() {
  try {
    // Get values from input fields using their IDs
    const title = document.getElementById("titleInput").value.trim();
    const description = document.getElementById("descriptionInput").value.trim();
    const price = document.getElementById("priceInput").value.trim();
    const fileInput = document.getElementById("formFile").files[0];

    // Validation
    if (!title) {
      alert("Please enter a title");
      return;
    }
    if (!description) {
      alert("Please enter a description");
      return;
    }
    if (!price) {
      alert("Please enter a price");
      return;
    }
    if (!fileInput) {
      alert("Please upload an image");
      return;
    }

    // Create listing object with the values
    const newListing = {
      id: Date.now().toString(), // Generate unique ID
      image: fileInput.name,
      title: title,
      description: description,
      price: parseFloat(price)
    };

    // Log the listing to console or send to server
    console.log("Listing created:", newListing);
    alert("Listing created successfully!");

    // Optional: Clear form after submission
    document.getElementById("titleInput").value = "";
    document.getElementById("descriptionInput").value = "";
    document.getElementById("priceInput").value = "";
    document.getElementById("formFile").value = "";

  } catch (error) {
    alert("An error occurred while creating the listing: " + error.message);
  }
}

