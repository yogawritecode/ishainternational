export function loadSectionByHash() {
  const hash = window.location.hash.substring(1) || "home";
  const content = document.getElementById("content");

  if (!content) {
    console.error("Content container not found.");
    return;
  }

  if (hash === "home") {
    content.innerHTML = `
      <section class="home">
        <div class="hero-banner">
          <h1>Welcome to <span class="highlight">Computer Store</span></h1>
          <p>Your one-stop destination for the latest in tech.</p>
          <a href="#product" class="btn">Shop Now</a> <!-- changed from #shop -->
        </div>
      </section>
    `;
    return;
  }

  // Optional: Handle `#shop` hash manually, even though `shop.html` is removed
  if (hash === "shop") {
    content.innerHTML = `
      <section class="shop">
        <h2>Shop Section</h2>
        <p>We've moved our products! Click below to view them:</p>
        <a href="#product" class="btn">Go to Products</a>
      </section>
    `;
    return;
  }

  fetch(`${hash}.html`)
    .then((res) => {
      if (!res.ok) throw new Error(`Section "${hash}" not found (HTTP ${res.status})`);
      return res.text();
    })
    .then((html) => {
      content.innerHTML = html;
    })
    .catch((err) => {
      content.innerHTML = `
        <section class="not-found">
          <h2>Page Not Found</h2>
          <p>The section <strong>${hash}</strong> could not be loaded.</p>
          <a href="#home" class="btn">Go to Home</a>
        </section>
      `;
      console.error(err);
    });
}

// Load reusable sections on page load
window.addEventListener("DOMContentLoaded", () => {
  const sections = [
    { id: "services-section", file: "services.html" },
    { id: "feature-section", file: "feature.html" },
    { id: "product-section", file: "product.html" },
  ];

  sections.forEach(({ id, file }) => {
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
      .then((data) => {
        const section = document.getElementById(id);
        if (section) section.innerHTML = data;
      })
      .catch((err) => {
        console.warn(`Could not load ${file}:`, err.message);
      });
  });
});
