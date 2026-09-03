// Scroll-Spy für die Startseiten-Navigation (aus dem Clot-Prototyp übernommen):
// Die Sektion, deren Oberkante <= 160px unter dem Viewport-Top liegt, gilt als
// aktiv; ihr Nav-Link bekommt .is-active. First-party, kein externes Skript
// (ADR 0007). Auf Unterseiten (keine Sektions-IDs vorhanden) tut das Skript nichts.
(function () {
  var ids = ["verein", "ausbildung", "termine", "berichte"];
  var sections = ids
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (sections.length === 0) return;

  var links = {};
  ids.forEach(function (id) {
    // Sektions-Links enden auf #<id>; Links auf eigene Seiten (Berichte)
    // tragen stattdessen data-section="<id>".
    var link = document.querySelector('.site-nav a[data-section="' + id + '"]') ||
      document.querySelector('.site-nav a[href$="#' + id + '"]');
    if (link) links[id] = link;
  });

  var current = "";
  function onScroll() {
    var active = "";
    sections.forEach(function (el) {
      if (el.getBoundingClientRect().top <= 160) active = el.id;
    });
    if (active === current) return;
    if (current && links[current]) links[current].classList.remove("is-active");
    if (active && links[active]) links[active].classList.add("is-active");
    current = active;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
