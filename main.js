(function () {
  const cfg = Object.assign(
    {
      nusja: "Era",
      dhendri: "Arben",
      nusjaPlote: "Era Krasniqi",
      dhendriPlote: "Arben Hoxha",
      vendi: "Prishtinë",
      salla: "",
      data: "2027-05-22T12:30:00",
      oraTekst: "Dymbëdhjetë e tridhjetë pasdite",
      email: "dasma@example.com",
      foto: "",
    },
    window.FTESA || {}
  );

  const dite = ["E diel", "E hënë", "E martë", "E mërkurë", "E enjte", "E premte", "E shtunë"];
  const muaj = [
    "janar",
    "shkurt",
    "mars",
    "prill",
    "maj",
    "qershor",
    "korrik",
    "gusht",
    "shtator",
    "tetor",
    "nëntor",
    "dhjetor",
  ];

  const data = new Date(cfg.data);
  const dataOK = !Number.isNaN(data.getTime());
  const iniciale = (emri) => (emri ? [...emri.trim()][0].toLocaleUpperCase("sq-AL") : "");
  const inicN = iniciale(cfg.nusja);
  const inicD = iniciale(cfg.dhendri);

  document.title = `${cfg.nusja} & ${cfg.dhendri} · Ftesë dasme`;
  document.getElementById("vendi").textContent = cfg.vendi;
  document.getElementById("emratLeter").textContent = `${cfg.nusja} & ${cfg.dhendri}`;
  document.getElementById("emriNusja").textContent = cfg.nusjaPlote;
  document.getElementById("emriDhendri").textContent = cfg.dhendriPlote;
  document.getElementById("vulaTekst").textContent = `${inicN} & ${inicD}`;
  document.getElementById("inicFoto1").textContent = inicN;
  document.getElementById("inicFoto2").textContent = inicD;
  document.getElementById("inic1").textContent = inicN;
  document.getElementById("inic2").textContent = inicD;

  const emailLink = document.getElementById("emailLink");
  emailLink.textContent = cfg.email;
  emailLink.href = `mailto:${cfg.email}`;

  if (dataOK) {
    const rresht = `${dite[data.getDay()]}, ${data.getDate()} ${muaj[data.getMonth()]} ${data.getFullYear()}`;
    document.getElementById("dataRresht").textContent = rresht.toLocaleUpperCase("sq-AL");
    const dd = String(data.getDate()).padStart(2, "0");
    const mm = String(data.getMonth() + 1).padStart(2, "0");
    document.getElementById("dataZemer").textContent = `${dd}.${mm}.${data.getFullYear()}`;
  }
  document.getElementById("oraRresht").textContent = cfg.oraTekst.toLocaleUpperCase("sq-AL");

  if (cfg.salla) {
    const salla = document.getElementById("sallaHyrje");
    salla.hidden = false;
    salla.textContent = cfg.salla.toLocaleUpperCase("sq-AL");
  }

  if (cfg.foto) {
    const foto = document.getElementById("foto");
    foto.src = cfg.foto;
    foto.alt = `${cfg.nusjaPlote} dhe ${cfg.dhendriPlote}`;
    foto.hidden = false;
    document.getElementById("monogramFoto").hidden = true;
  }

  function shkruajKohen() {
    if (!dataOK) return;
    const diff = Math.max(0, data.getTime() - Date.now());
    const gjithsej = Math.floor(diff / 1000);
    const vlerat = {
      d: String(Math.floor(gjithsej / 86400)),
      h: String(Math.floor((gjithsej % 86400) / 3600)).padStart(2, "0"),
      m: String(Math.floor((gjithsej % 3600) / 60)).padStart(2, "0"),
      s: String(gjithsej % 60).padStart(2, "0"),
    };
    document.querySelectorAll("[data-njesi]").forEach((el) => {
      el.textContent = vlerat[el.dataset.njesi];
    });
  }

  shkruajKohen();
  window.setInterval(shkruajKohen, 1000);

  function vendosDantellen() {
    const kapak = document.getElementById("kapak");
    const svg = document.getElementById("dantelSvg");
    const w = kapak.clientWidth;
    const h = kapak.clientHeight;
    if (!w || !h || !svg) return;
    const cx = w / 2;
    const cy = h * 0.36;
    const anet = [
      [8, 6, w / 2, h - 4],
      [w - 8, 6, w / 2, h - 4],
    ];
    const pjeset = [];
    anet.forEach(([x1, y1, x2, y2]) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      let nx = -dy / len;
      let ny = dx / len;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      if ((cx - mx) * nx + (cy - my) * ny < 0) {
        nx = -nx;
        ny = -ny;
      }
      const futje = 16;
      const sx1 = x1 + nx * futje;
      const sy1 = y1 + ny * futje;
      const sx2 = x2 + nx * futje;
      const sy2 = y2 + ny * futje;
      pjeset.push(
        `<line x1="${sx1.toFixed(1)}" y1="${sy1.toFixed(1)}" x2="${sx2.toFixed(1)}" y2="${sy2.toFixed(1)}" stroke="#3a3f28" stroke-width="8" stroke-linecap="round" opacity="0.45"/>`
      );
      pjeset.push(
        `<line x1="${(sx1 + nx * 9).toFixed(1)}" y1="${(sy1 + ny * 9).toFixed(1)}" x2="${(sx2 + nx * 9).toFixed(1)}" y2="${(sy2 + ny * 9).toFixed(1)}" stroke="#2e331f" stroke-width="1.15" opacity="0.75"/>`
      );
      for (let d = 20; d < len - 28; d += 16) {
        const t = d / len;
        const px = sx1 + (sx2 - sx1) * t;
        const py = sy1 + (sy2 - sy1) * t;
        pjeset.push(
          `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.4" fill="none" stroke="#2c311e" stroke-width="1.15"/>`
        );
        pjeset.push(
          `<circle cx="${(px + nx * 8).toFixed(1)}" cy="${(py + ny * 8).toFixed(1)}" r="1.35" fill="#2c311e" opacity="0.8"/>`
        );
      }
    });
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.innerHTML = pjeset.join("");
  }

  const hyrje = document.getElementById("hyrje");
  const festa = document.getElementById("festa");
  const skena = document.getElementById("skena");
  const kompozim = document.getElementById("kompozim");
  const play = document.getElementById("play");
  const vula = document.getElementById("vula");
  const menjehere = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let nisur = false;
  let uHap = false;

  function hapZarfin() {
    if (uHap) return;
    uHap = true;
    skena.dataset.state = "open";
    kompozim.setAttribute("aria-hidden", "false");
    const vonesa = menjehere ? 0 : 1500;
    window.setTimeout(() => document.body.classList.add("is-open"), vonesa);
  }

  function nisHapjen() {
    if (nisur) return;
    nisur = true;
    play.disabled = true;
    festa.hidden = false;

    if (menjehere) {
      hyrje.hidden = true;
      document.body.classList.remove("is-intro");
      document.body.classList.add("is-envelope", "is-open");
      vendosDantellen();
      hapZarfin();
      return;
    }

    window.requestAnimationFrame(() => {
      vendosDantellen();
      document.body.classList.add("po-largohet");
    });
    window.setTimeout(() => {
      hyrje.hidden = true;
      document.body.classList.remove("is-intro", "po-largohet");
      document.body.classList.add("is-envelope");
      vendosDantellen();
      window.setTimeout(hapZarfin, 1050);
    }, 820);
  }

  play.addEventListener("click", nisHapjen);
  vula.addEventListener("click", hapZarfin);
  document.getElementById("kapak").addEventListener("click", hapZarfin);
  window.addEventListener("resize", vendosDantellen);

  const dialogu = document.getElementById("dialogu");
  const forma = document.getElementById("forma");
  const faleminderit = document.getElementById("faleminderit");

  function hapDialogun() {
    forma.hidden = false;
    faleminderit.hidden = true;
    if (typeof dialogu.showModal === "function") dialogu.showModal();
  }

  function mbyllDialogun() {
    dialogu.close();
  }

  document.getElementById("hapAdresen").addEventListener("click", hapDialogun);
  document.getElementById("mbyll").addEventListener("click", mbyllDialogun);
  document.getElementById("mbyllPas").addEventListener("click", mbyllDialogun);
  dialogu.addEventListener("click", (event) => {
    if (event.target === dialogu) mbyllDialogun();
  });

  forma.addEventListener("submit", (event) => {
    event.preventDefault();
    const teDhenat = Object.fromEntries(new FormData(forma).entries());
    try {
      const ruajtura = JSON.parse(localStorage.getItem("ftesa-dasme-adresat") || "[]");
      ruajtura.push(Object.assign({}, teDhenat, { koha: new Date().toISOString() }));
      localStorage.setItem("ftesa-dasme-adresat", JSON.stringify(ruajtura));
    } catch (err) {
      /* shfletuesi mund të mos lejojë ruajtjen lokale */
    }

    if (cfg.email && cfg.email.includes("@")) {
      const trupi = [
        `Emri: ${teDhenat.emri || ""}`,
        `Adresa: ${teDhenat.adresa || ""}`,
        `Qyteti: ${teDhenat.qyteti || ""}`,
        `Telefoni: ${teDhenat.telefoni || ""}`,
        `Persona: ${teDhenat.persona || ""}`,
        `Mesazh: ${teDhenat.mesazh || ""}`,
      ].join("\n");
      const subjekti = encodeURIComponent(`Adresa për dasmën e ${cfg.nusja} dhe ${cfg.dhendri}`);
      window.location.href = `mailto:${cfg.email}?subject=${subjekti}&body=${encodeURIComponent(trupi)}`;
    }

    forma.hidden = true;
    faleminderit.hidden = false;
    forma.reset();
  });

  document.getElementById("kthehu").addEventListener("click", () => {
    document.getElementById("skena").scrollIntoView({ behavior: menjehere ? "auto" : "smooth" });
  });
})();
