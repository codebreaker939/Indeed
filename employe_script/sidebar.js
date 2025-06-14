document.getElementById("toggleSidebar").addEventListener("click", () => {
    document.body.classList.toggle("sidebar-open");
  });
  
  document.querySelectorAll("#sidebar .dropdown").forEach(item => {
    item.addEventListener("click", () => item.classList.toggle("open"));
  });
  