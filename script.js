document.addEventListener("DOMContentLoaded", function () {
  // Мобільне меню
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Тінь шапки при прокрутці
  var header = document.querySelector(".site-header");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Плавна поява блоків при прокрутці
  var revealSelectors = [
    ".section-head",
    ".req-card",
    ".adv-card",
    ".tile",
    ".step",
    ".law-item",
    ".emergency-card",
    ".report-card",
    ".contact-item",
    ".strip-card",
    ".info-panel",
    ".form-card",
    ".download-card",
    ".fact",
    ".map-wrap"
  ];

  var revealItems = document.querySelectorAll(revealSelectors.join(","));

  if ("IntersectionObserver" in window && revealItems.length) {
    // Затримка по черзі для сусідніх карток в одному контейнері
    var groups = new Map();

    revealItems.forEach(function (el) {
      el.classList.add("reveal");
      var parent = el.parentElement;
      var index = groups.get(parent) || 0;
      el.style.setProperty("--reveal-delay", Math.min(index * 0.08, 0.4) + "s");
      groups.set(parent, index + 1);
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    revealItems.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Завантаження документів (сторінка «Нормативні документи»)
  document.querySelectorAll("[data-download]").forEach(function (button) {
    button.addEventListener("click", function () {
      var file = button.getAttribute("data-download");
      var link = document.createElement("a");
      link.href = file;
      link.download = file.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  // Форма зворотного зв'язку — надсилання листа на пошту компанії
  var form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      var subject = form.subject ? form.subject.value.trim() : "Звернення з сайту";
      var message = form.message.value.trim();

      var body =
        "Ім'я та прізвище: " + name + "\n" +
        "Телефон: " + phone + "\n" +
        "Ел. пошта: " + email + "\n\n" +
        message;

      window.location.href =
        "mailto:Vital@x1.energy" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
});
