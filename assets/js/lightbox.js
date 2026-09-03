// Lightbox für die Bericht-Galerie (first-party, kein externes Skript,
// ADR 0007). Progressive Enhancement: ohne JavaScript bleibt die Galerie
// eine einfache Bildliste. Nutzt das native <dialog>-Element (ESC und
// Fokus-Handling kommen vom Browser); Vor/Zurück per Button und Pfeiltasten,
// Klick auf den Hintergrund schließt.
(function () {
  var bilder = Array.prototype.slice.call(
    document.querySelectorAll(".bericht-gallery__item img")
  );
  if (bilder.length === 0 || typeof HTMLDialogElement === "undefined") return;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Bildansicht");
  dialog.innerHTML =
    '<button class="lightbox__nav lightbox__prev" aria-label="Vorheriges Bild">&#8249;</button>' +
    '<figure class="lightbox__figure">' +
    '  <img alt="">' +
    '  <figcaption></figcaption>' +
    "</figure>" +
    '<button class="lightbox__nav lightbox__next" aria-label="Nächstes Bild">&#8250;</button>' +
    '<button class="lightbox__close" aria-label="Schließen">&#215;</button>';
  document.body.appendChild(dialog);

  var gross = dialog.querySelector("img");
  var beschriftung = dialog.querySelector("figcaption");
  var index = 0;

  if (bilder.length < 2) dialog.classList.add("lightbox--einzelbild");

  function zeige(i) {
    index = (i + bilder.length) % bilder.length;
    gross.src = bilder[index].src;
    gross.alt = bilder[index].alt;
    beschriftung.textContent = bilder[index].alt;
  }

  bilder.forEach(function (el, i) {
    el.classList.add("lightbox-klickbar");
    el.addEventListener("click", function () {
      zeige(i);
      dialog.showModal();
    });
  });

  dialog.querySelector(".lightbox__close").addEventListener("click", function () {
    dialog.close();
  });
  dialog.querySelector(".lightbox__prev").addEventListener("click", function () {
    zeige(index - 1);
  });
  dialog.querySelector(".lightbox__next").addEventListener("click", function () {
    zeige(index + 1);
  });
  // Klick auf den Backdrop (= das dialog-Element selbst, nicht seine Kinder)
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });
  document.addEventListener("keydown", function (e) {
    if (!dialog.open) return;
    if (e.key === "ArrowLeft") zeige(index - 1);
    if (e.key === "ArrowRight") zeige(index + 1);
  });
})();
