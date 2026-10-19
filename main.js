(function () {
  const cfg = Object.assign(
    {
      nusja: "Samir",
      dhendri: "Barbara",
      nusjaPlote: "Samir",
      dhendriPlote: "Barbara",
      vendi: "Prishtinë",
      salla: "",
      data: "2027-05-22T12:30:00",
      oraTekst: "Dymbëdhjetë e tridhjetë pasdite",
      email: "",
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
  const cifti = `${cfg.nusja} & ${cfg.dhendri}`;

  document.title = `${cifti} · Ftesë dasme`;
  document.getElementById("emratLeter").textContent = cifti;
  document.getElementById("emratFund").textContent = cifti;
  document.getElementById("emratPoshte").textContent = cifti;
  document.getElementById("emriNusja").textContent = cfg.nusjaPlote;
  document.getElementById("emriDhendri").textContent = cfg.dhendriPlote;
  document.getElementById("vulaTekst").textContent = `${inicN} & ${inicD}`;
  document.getElementById("inicFoto1").textContent = inicN;
  document.getElementById("inicFoto2").textContent = inicD;
  document.getElementById("inic1").textContent = inicN;
  document.getElementById("inic2").textContent = inicD;
  document.getElementById("vendi").textContent = cfg.vendi;
  document.getElementById("oraRresht").textContent = cfg.oraTekst.toLocaleUpperCase("sq-AL");

  if (dataOK) {
    const rresht = `${dite[data.getDay()]}, ${data.getDate()} ${muaj[data.getMonth()]} ${data.getFullYear()}`;
    const rreshtMadh = rresht.toLocaleUpperCase("sq-AL");
    document.getElementById("dataRresht").textContent = rreshtMadh;
    const dd = String(data.getDate()).padStart(2, "0");
    const mm = String(data.getMonth() + 1).padStart(2, "0");
    document.getElementById("dataZemer").textContent = `${dd}.${mm}.${data.getFullYear()}`;
    document.getElementById("dataPoshte").textContent = `${rreshtMadh} · ${cfg.vendi.toLocaleUpperCase("sq-AL")}`;
  }

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

  const skena = document.getElementById("skena");
  const kompozim = document.getElementById("kompozim");
  const vula = document.getElementById("vula");
  const menjehere = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let uHap = false;

  function hapZarfin() {
    if (uHap) return;
    uHap = true;
    vula.classList.add("po-shtyp");
    window.setTimeout(() => {
      skena.dataset.state = "open";
      kompozim.setAttribute("aria-hidden", "false");
      window.setTimeout(() => document.body.classList.add("is-open"), menjehere ? 0 : 1280);
    }, menjehere ? 0 : 140);
  }

  vula.addEventListener("click", (event) => {
    event.stopPropagation();
    hapZarfin();
  });
  document.getElementById("kapak").addEventListener("click", hapZarfin);
  document.querySelector(".xhep").addEventListener("click", hapZarfin);
  window.addEventListener("resize", vendosDantellen);
  window.addEventListener("load", vendosDantellen);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(vendosDantellen);
  }

  document.getElementById("kthehu").addEventListener("click", () => {
    document.getElementById("skena").scrollIntoView({ behavior: menjehere ? "auto" : "smooth" });
  });
})();
