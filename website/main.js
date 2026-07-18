document.addEventListener("DOMContentLoaded", () => {

  // 1. LOAD NAVBAR
  fetch("../components/navbar.html") // <-- UDAH GANTI
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      // ===== AUTO ACTIVE NAVBAR =====
      const currentPage = window.location.pathname.split("/").pop(); // ambil "index.html" / "about.html"
      const navLinks = document.querySelectorAll("#navbar a");
      
      navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop(); // ambil nama file dari href
        
        // hapus active dulu
        link.classList.remove("active");
        
        // kalo sama dengan halaman sekarang, kasih active
        if (linkPage === currentPage) {
          link.classList.add("active");
        }
      });
      // ===== SELESAI ACTIVE =====

      // ===== HAMBURGER MENU =====
      const hamburgerBtn = document.getElementById("hamburgerBtn");
      const mobileNav = document.getElementById("mobileNav");

      if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener("click", () => {
          const isOpen = mobileNav.classList.toggle("open");
          hamburgerBtn.classList.toggle("active", isOpen);
          hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Tutup pas link diklik
        mobileNav.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            hamburgerBtn.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
          });
        });
      }
      // ===== SELESAI HAMBURGER =====
    })
    .catch(err => console.error("Navbar gagal di load:", err)); // gua tambahin ini biar gampang debug

  // 2. LOAD FOOTER
  fetch("../components/footer.html") // <-- UDAH GANTI
    .then((res) => res.text())
    .then((data) => (document.getElementById("footer").innerHTML = data))
    .catch(err => console.error("Footer gagal di load:", err));

});