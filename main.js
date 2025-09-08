/* navbar menu icon click function */
const navMenuBtn = document.getElementById("navMenuBtn");
const navMenuDropdown = document.getElementById("navMenuDropdown");

// toggle menu on icon click
navMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenuDropdown.classList.toggle("hidden");
});

// close when clicking any menu item
navMenuDropdown.querySelectorAll("a").forEach((item) => {
  item.addEventListener("click", () => {
    navMenuDropdown.classList.add("hidden");
  });
});
