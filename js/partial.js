// partial.js
function includeHTML(targetSelector, file, callback) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error("Network error");
      return res.text();
    })
    .then((html) => {
      target.innerHTML = html;
      if (callback) callback(); // Re-initialize JS if needed
    })
    .catch((err) => console.error("Include error:", err));
}
