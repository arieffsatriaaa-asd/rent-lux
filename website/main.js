document.addEventListener("DOMContentLoaded", () => {

  // 1. LOAD NAVBAR
  fetch("/components/navbar.html") // <-- UDAH GANTI JADI 2 TITIK
    .then((res) => {
      if (!res.ok) throw new Error("Navbar 404"); // biar tau kalo gagal
      return res.text();
    })
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      // ===== AUTO ACTIVE NAVBAR =====
      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = document.querySelectorAll("#navbar a");
      
      navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();
        link.classList.remove("active");
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
    .catch(err => console.error("Navbar gagal di load:", err));

  // 2. LOAD FOOTER
  fetch("/components/footer.html") // <-- UDAH GANTI JADI 2 TITIK
    .then((res) => {
      if (!res.ok) throw new Error("Footer 404");
      return res.text();
    })
    .then((data) => (document.getElementById("footer").innerHTML = data))
    .catch(err => console.error("Footer gagal di load:", err));

});