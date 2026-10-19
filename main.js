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
  document.getElementById("vendiHyrje").textContent = cfg.vendi;
  document.getElementById("oraRresht").textContent = cfg.oraTekst.toLocaleUpperCase("sq-AL");
  document.getElementById("oraHyrje").textContent = cfg.oraTekst.toLocaleUpperCase("sq-AL");

  if (dataOK) {
    const rresht = `${dite[data.getDay()]}, ${data.getDate()} ${muaj[data.getMonth()]} ${data.getFullYear()}`;
    const rreshtMadh = rresht.toLocaleUpperCase("sq-AL");
    document.getElementById("dataRresht").textContent = rreshtMadh;
    document.getElementById("dataHyrje").textContent = rreshtMadh;
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
    const w = kapak.clientWidth;
    const h = kapak.clientHeight;
    if (!w || !h) return;
    const len = Math.hypot(w / 2, h);
    const angle = (Math.atan2(h, w / 2) * 180) / Math.PI;
    const majtas = document.querySelector(".dantel-majte");
    const djathtas = document.querySelector(".dantel-djathte");
    majtas.style.width = `${len}px`;
    djathtas.style.width = `${len}px`;
    const brenda = Math.round(Math.min(56, Math.max(22, h * 0.09)));
    majtas.style.transform = `rotate(${angle}deg) translateY(${-brenda}px)`;
    djathtas.style.transform = `rotate(${-angle}deg) translateY(${-brenda}px)`;
    pershtatEmrat();
  }

  function pershtatEmrat() {
    const el = document.getElementById("emratLeter");
    if (!el || !el.offsetParent) return;
    const max = Math.min(window.innerWidth * 0.58, 520);
    el.style.whiteSpace = "nowrap";
    let size = Math.min(92, Math.max(30, window.innerWidth * 0.064));
    el.style.fontSize = `${size}px`;
    while (el.scrollWidth > max && size > 20) {
      size -= 1;
      el.style.fontSize = `${size}px`;
    }
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

  const hyrje = document.getElementById("hyrje");
  const festa = document.getElementById("festa");
  let nisur = false;

  function nisNgaPlay() {
    if (nisur) return;
    nisur = true;
    document.getElementById("play").disabled = true;
    festa.hidden = false;
    vendosDantellen();
    if (menjehere) {
      hyrje.hidden = true;
      document.body.classList.remove("is-intro");
      document.body.classList.add("is-envelope");
      hapZarfin();
      return;
    }
    window.requestAnimationFrame(() => document.body.classList.add("po-largohet"));
    window.setTimeout(() => {
      hyrje.hidden = true;
      document.body.classList.remove("is-intro", "po-largohet");
      document.body.classList.add("is-envelope");
      vendosDantellen();
      window.setTimeout(hapZarfin, 700);
    }, 700);
  }

  document.getElementById("play").addEventListener("click", nisNgaPlay);
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
