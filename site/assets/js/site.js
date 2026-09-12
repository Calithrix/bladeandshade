(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("mobile-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      nav.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Single footer for every page — edit site/partials/footer.html only.
  var footerMount = document.getElementById("site-footer");
  if (footerMount) {
    fetch("partials/footer.html")
      .then(function (r) {
        if (!r.ok) throw new Error("footer " + r.status);
        return r.text();
      })
      .then(function (html) {
        footerMount.outerHTML = html.trim();
      })
      .catch(function () {
        footerMount.outerHTML =
          '<footer class="site-footer"><div class="wrap legal">Blade and Shade Customized Brows.</div></footer>';
      });
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.name.value || "").trim();
      var email = (form.email.value || "").trim();
      var phone = (form.phone.value || "").trim();
      var message = (form.message.value || "").trim();
      var body = [
        "Name: " + name,
        "Email: " + email,
        phone ? "Phone: " + phone : "",
        "",
        message
      ].filter(Boolean).join("\n");
      var url =
        "mailto:brekonopka01@gmail.com" +
        "?subject=" + encodeURIComponent("Blade and Shade inquiry from " + name) +
        "&body=" + encodeURIComponent(body);
      window.location.href = url;
    });
  }
})();
