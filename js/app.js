(function () {
  const { videos, handle } = window.SITE_DATA;
  const CATEGORIES = [
    { key: "skincare", label: "Skincare" },
    { key: "fashion", label: "Fashion" },
    { key: "beauty", label: "Beauty" },
    { key: "fitness", label: "Fitness & Health" },
    { key: "lifestyle", label: "Lifestyle" }
  ];
  const videoUrl = id => `https://www.tiktok.com/@${handle}/video/${id}`;

  // ---- render sections ----
  const root = document.getElementById("sections");
  CATEGORIES.forEach(cat => {
    const list = videos
      .filter(v => v.category === cat.key)
      .sort((a, b) => (b.views || 0) - (a.views || 0) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (!list.length) return;
    const section = document.createElement("section");
    section.className = "section";
    section.dataset.category = cat.key;
    section.innerHTML = `<h2>${cat.label}</h2><div class="grid"></div>`;
    const grid = section.querySelector(".grid");
    list.forEach(v => grid.appendChild(card(v, cat.label)));
    root.appendChild(section);
  });

  function card(v, label) {
    const el = document.createElement("button");
    el.className = "card";
    el.type = "button";
    el.dataset.id = v.id;
    el.setAttribute("aria-label", `Play: ${v.title}`);
    el.innerHTML = `
      <img src="assets/thumbs/${v.id}.jpg" alt="" loading="lazy" decoding="async"
           onerror="this.remove()" />
      <span class="play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </span>
      <span class="meta"><strong>${v.title}</strong><span>${label}</span></span>`;
    el.addEventListener("click", () => openModal(v));
    return el;
  }

  // ---- modal player (loads the official TikTok embed on demand) ----
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="modal__backdrop"></div>
    <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Video">
      <div class="modal__frame"></div>
      <div class="modal__bar">
        <strong class="modal__title"></strong>
        <button class="modal__retry" type="button" title="Reload the player if TikTok fails to load">Retry</button>
        <a class="modal__link" target="_blank" rel="noopener">Open on TikTok ↗</a>
        <button class="modal__close" type="button" aria-label="Close">✕</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const frame = modal.querySelector(".modal__frame");

  function fitModal() {
    const panel = modal.querySelector(".modal__panel");
    const s = Math.min(1, (window.innerHeight * 0.9 - 56) / 738, (window.innerWidth * 0.94) / 325);
    panel.style.setProperty("--s", s.toFixed(3));
  }
  window.addEventListener("resize", () => { if (!modal.hidden) fitModal(); });

  let current = null;
  function loadFrame(id, title) {
    frame.innerHTML = `<iframe src="https://www.tiktok.com/embed/v2/${id}" title="${title}"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
  }
  modal.querySelector(".modal__retry").addEventListener("click", () => { if (current) loadFrame(current.id, current.title); });

  function openModal(v) {
    current = v;
    fitModal();
    modal.querySelector(".modal__title").textContent = v.title;
    modal.querySelector(".modal__link").href = videoUrl(v.id);
    loadFrame(v.id, v.title);
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal__close").focus();
  }
  function closeModal() {
    modal.hidden = true;
    frame.innerHTML = "";
    document.body.classList.remove("no-scroll");
  }
  modal.querySelector(".modal__close").addEventListener("click", closeModal);
  modal.querySelector(".modal__backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // ---- filters ----
  const pills = document.querySelectorAll(".pill");
  pills.forEach(p => p.addEventListener("click", () => {
    pills.forEach(x => x.classList.toggle("is-active", x === p));
    const f = p.dataset.filter;
    document.querySelectorAll(".section").forEach(s => {
      s.hidden = !(f === "all" || s.dataset.category === f);
    });
  }));
})();
