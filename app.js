/* ============================================================
   IMH Coliving — app.js
   ============================================================ */

/* ---- WhatsApp config ---- */
const WHATSAPP_NUMBER = "573153161875"; // +57 315 316 1875
const CAL_LINK = "https://cal.com/ikymotionhubmkt";

function waLink(message){
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}
function openWA(message){ window.open(waLink(message), "_blank", "noopener"); }

/* ============================================================
   GALERÍAS DE IMÁGENES (fotos reales de la casa)
   ============================================================ */
const GALLERIES = {
  herobg:    { label:"Fachada IMH Coliving", images:[
    "assets/facade/fachada.jpg","assets/facade/entrada.jpg","assets/facade/casa-frontal.jpg"] },
  hero:      { label:"Fachada colonial", images:[
    "assets/hero/fachada-1.jpg","assets/hero/fachada-2.jpg","assets/hero/fachada-4.jpg",
    "assets/hero/fachada-6.jpg","assets/hero/cali-tertulia-night.jpg"] },
  santarita: { label:"Habitación Santa Rita", images:[
    "assets/rooms/santarita-1.jpg","assets/rooms/santarita-2.jpg","assets/rooms/santarita-3.jpg",
    "assets/rooms/santarita-4.jpg","assets/rooms/santarita-5.jpg","assets/rooms/santarita-6.jpg"] },
  riocali:   { label:"Habitación Río Cali", images:[
    "assets/rooms/riocali-2.jpg","assets/rooms/riocali-1.jpg","assets/rooms/riocali-3.jpg",
    "assets/rooms/riocali-4.jpg","assets/rooms/riocali-5.jpg","assets/rooms/riocali-6.jpg"] },
  aguacatal: { label:"Habitación Aguacatal", images:[
    "assets/rooms/aguacatal-1.jpg","assets/rooms/aguacatal-2.jpg","assets/rooms/aguacatal-3.jpg",
    "assets/rooms/aguacatal-4.jpg","assets/rooms/aguacatal-5.jpg","assets/rooms/aguacatal-6.jpg"] },
  penon:     { label:"Habitación El Peñón", images:[
    "assets/rooms/penon-1.jpg","assets/rooms/penon-2.jpg","assets/rooms/penon-3.jpg",
    "assets/rooms/penon-4.jpg","assets/rooms/penon-5.jpg","assets/rooms/penon-6.jpg"] },
  farallones:{ label:"Habitación Farallones", images:[
    "assets/rooms/farallones-2.jpg","assets/rooms/farallones-1.jpg","assets/rooms/farallones-4.jpg",
    "assets/rooms/farallones-3.jpg","assets/rooms/farallones-5.jpg","assets/rooms/farallones-6.jpg",
    "assets/rooms/farallones-bath-1.jpg","assets/rooms/farallones-bath-2.jpg",
    "assets/rooms/farallones-bath-3.jpg","assets/rooms/farallones-bath-4.jpg"] },
  cocina:    { label:"Cocina compartida", images:[
    "assets/spaces/cocina-1.jpg","assets/spaces/cocina-2.jpg","assets/spaces/cocina-3.jpg","assets/spaces/cocina-4.jpg"] },
  sala:      { label:"Sala & zonas comunes", images:[
    "assets/spaces/sala-1.jpg","assets/spaces/sala-2.jpg","assets/spaces/sala-3.jpg"] },
  hamacas:   { label:"Zona de hamacas", images:[
    "assets/spaces/hamacas-1.jpg","assets/spaces/hamacas-2.jpg"] },
  bienestar: { label:"Salón de bienestar", images:[
    "assets/bienestar/somatica.jpg","assets/bienestar/yoga-1.webp"] },
  garage:    { label:"Patio & parqueadero", images:[
    "assets/spaces/garage-1.jpg","assets/spaces/garage-2.jpg","assets/spaces/garage-3.jpg"] },
  ctafinal:  { label:"Cali de noche", images:[
    "assets/cali/aerial.webp","assets/hero/cali-tertulia-night.jpg","assets/hero/fachada-2.jpg"] },
  cali:      { label:"Cali, Valle del Cauca", images:[
    "assets/cali/ermita.webp","assets/cali/gato-del-rio.webp","assets/cali/salsa-dancing.webp",
    "assets/cali/sanantonio-door.webp","assets/cali/herb-market.webp","assets/cali/cholados.jpg",
    "assets/cali/farallones-night.jpg","assets/hero/cali-tertulia-night.jpg",
    "assets/cali/plaza.jpg","assets/cali/skyline.jpg","assets/cali/aerial.webp"] },
};

/* Slider de fachada del hero (deslizamiento moderno y minimalista) */
const HERO_SLIDES = [
  "assets/facade/casa-frontal.jpg",
  "assets/hero/fachada-1.jpg",
  "assets/facade/casa-frontal2.jpg",
  "assets/hero/fachada-2.jpg",
  "assets/hero/fachada-4.jpg"
];

/* "Ubicados en el mejor sector de Cali" — ventajas de la ubicación */
const SECTOR = [
 
  {src:"assets/sector/rio-arbol.webp",      tag:"Turismo",            title:"Río Cali & boulevard", desc:"Camina al borde del río y vive la vibra caleña."},
  {src:"assets/sector/gastroteca.jpg",      tag:"Gastronomía",        title:"El Peñón",          desc:"Zona gastronómica con los mejores restaurantes."},
  {src:"assets/sector/cali-sign.webp",      tag:"Centros comerciales",title:"Comercio & bancos",  desc:"Centros comerciales y sector bancario muy cerca."},
  {src:"assets/sector/gato-rio.webp",       tag:"Turismo",            title:"El Gato del Río",    desc:"Ícono caleño a orillas del río."},
  {src:"assets/sector/mercado.webp",        tag:"Negocios",           title:"Corazón del Oeste", desc:"En el mejor sector, tranquilo y conectado."},
];

/* "Cali, capital de la salsa" — atractivos a tu alrededor (slider) */
const CALI_PLACES = [
  {src:"assets/cali/salsa-dancing.webp",    tag:"Salsa",       title:"Calle de la Salsa",                desc:"El ritmo que hace latir a la Sucursal del Cielo."},
  {src:"assets/cali/salsa-club.webp",       tag:"Salsa",       title:"Bares emblemáticos de salsa",      desc:"Templos de la salsa brava caleña."},
  {src:"assets/cali/gato-del-rio.webp",     tag:"Arte",        title:"Parque Museo del Gato Tejada",     desc:"El icónico Gato del Río y sus gatas de Tejada."},
  {src:"assets/sector/museo-tertulia.webp", tag:"Cultura",     title:"Museo de Arte Moderno La Tertulia",desc:"Arte, cine y cultura a 2 minutos a pie."},
  {src:"assets/sector/rio-boulevard.webp",  tag:"Turismo",     title:"Boulevard del Río",                desc:"Paseo peatonal junto al Río Cali."},
  {src:"assets/cali/plaza.jpg",             tag:"Cultura",     title:"Plazoleta Jairo Varela",           desc:"Homenaje al maestro del Grupo Niche."},
  {src:"assets/cali/sanantonio-door.webp",  tag:"Patrimonio",  title:"Barrio San Antonio",               desc:"Colina colonial, capillas y bohemia."},
  {src:"assets/sector/gastroteca.jpg",      tag:"Gastronomía", title:"Zona gastronómica del Peñón",      desc:"Restaurantes, cafés y galerías de arte."},
  {src:"assets/cali/cholados.jpg",          tag:"Gastronomía", title:"Gastronomía de Granada",           desc:"El barrio gourmet y cultural de la ciudad."},
  {src:"assets/sector/mercado.webp",        tag:"Artesanías",  title:"Loma de la Cruz",                  desc:"Parque artesanal y cultura vallecaucana."},
  {src:"assets/sector/zoo-cali.webp",      tag:"Naturaleza",  title:"Zoológico de Cali",                desc:"Uno de los mejores zoológicos de Latinoamérica."},
  {src:"assets/sector/rio-raices.webp",     tag:"Naturaleza",  title:"Jardín Botánico",                  desc:"Senderos de selva tropical junto al río."},
  {src:"assets/cali/parque-noche.jpg",      tag:"Naturaleza",  title:"Parque del Acueducto",             desc:"Zona verde para caminar y trotar."},
  {src:"assets/sector/rio-arbol.webp",      tag:"Ecoturismo",  title:"Bird Watching por el Río Cali",    desc:"562 especies: la mayor diversidad de aves del mundo."},
  {src:"assets/cali/aerial.webp",           tag:"Mirador",     title:"Mirador de Sebastián de Belalcázar",desc:"Vista panorámica de toda la ciudad."},
  {src:"assets/cali/farallones-night.jpg",  tag:"Mirador",     title:"Corredor de Cristo Rey",           desc:"Ascenso hacia el Cristo y los Farallones."},
  {src:"assets/cali/skyline.jpg",           tag:"Negocios",    title:"Centro Financiero y Administrativo",desc:"El corazón económico, comercial y jurídico de Cali."},
];

/* Recorrido por la casa — slider de una sola fila */
const TOUR = [
  {src:"assets/hero/fachada-1.jpg", cap:"Fachada colonial", key:"hero"},
  {src:"assets/spaces/sala-1.jpg",  cap:"Sala común", key:"sala"},
  {src:"assets/rooms/santarita-1.jpg", cap:"Habitación Santa Rita", key:"santarita"},
  {src:"assets/spaces/hamacas-1.jpg", cap:"Zona de hamacas", key:"hamacas"},
  {src:"assets/bienestar/yoga-1.webp", cap:"Salón de bienestar", key:"bienestar"},
  {src:"assets/spaces/cocina-1.jpg", cap:"Cocina equipada", key:"cocina"},
  {src:"assets/rooms/penon-1.jpg", cap:"Habitación El Peñón", key:"penon"},
  {src:"assets/spaces/garage-1.jpg", cap:"Patio interior", key:"garage"},
  {src:"assets/rooms/aguacatal-1.jpg", cap:"Habitación Aguacatal", key:"aguacatal"},
  {src:"assets/rooms/farallones-1.jpg", cap:"Habitación Farallones", key:"farallones"},
  {src:"assets/hero/fachada-2.jpg", cap:"Entrada principal", key:"hero"},
];

/* ---- Hydrate every [data-gallery] image slot ---- */
function hydrateSlots(){
  document.querySelectorAll(".imgslot[data-gallery]").forEach(slot=>{
    const g = GALLERIES[slot.dataset.gallery];
    if(!g) return;
    if(g.images && g.images.length){
      const img = document.createElement("img");
      img.src = g.images[0];
      img.alt = g.label;
      img.loading = "lazy";
      slot.appendChild(img);
      slot.classList.add("filled");
    }else if(g.label && !slot.dataset.label){
      slot.dataset.label = g.label;
    }
  });
}

/* ---- Hero facade slider (crossfade, auto-advance) ---- */
function buildHeroSlider(){
  const wrap = document.querySelector(".hero-slider");
  if(!wrap) return;
  wrap.innerHTML = HERO_SLIDES.map((src,i)=>
    `<div class="hs-slide${i===0?' on':''}" style="background-image:url('${src}')"></div>`).join("")
    + (HERO_SLIDES.length>1 ? `<div class="hs-dots">${HERO_SLIDES.map((_,i)=>`<button class="hs-dot${i===0?' on':''}" data-i="${i}" aria-label="Foto ${i+1}"></button>`).join("")}</div>` : "");
  const slides = [...wrap.querySelectorAll(".hs-slide")];
  const dots = [...wrap.querySelectorAll(".hs-dot")];
  if(slides.length<2) return;
  let i = 0, timer;
  const go = n=>{
    i = (n + slides.length) % slides.length;
    slides.forEach((s,k)=>s.classList.toggle("on", k===i));
    dots.forEach((d,k)=>d.classList.toggle("on", k===i));
  };
  const start = ()=>{ timer = setInterval(()=>go(i+1), 5000); };
  const stop = ()=>clearInterval(timer);
  dots.forEach(d=>d.addEventListener("click",()=>{ stop(); go(+d.dataset.i); start(); }));
  /* swipe en móvil */
  let sx=null;
  wrap.addEventListener("touchstart",e=>{ sx=e.touches[0].clientX; },{passive:true});
  wrap.addEventListener("touchend",e=>{
    if(sx===null) return;
    const dx=e.changedTouches[0].clientX-sx; sx=null;
    if(Math.abs(dx)>40){ stop(); go(dx<0?i+1:i-1); start(); }
  },{passive:true});
  start();
}

/* ---- Sector slider ("Ubicados en el mejor sector") ---- */
function buildSector(){
  const track = document.getElementById("sector-track");
  if(!track) return;
  track.innerHTML = SECTOR.map(s=>`
    <figure class="sector-card" data-open-gallery="cali">
      <img src="${s.src}" alt="${s.title}" loading="lazy">
      <span class="sector-tag">${s.tag}</span>
      <figcaption><b>${s.title}</b><small>${s.desc}</small></figcaption>
    </figure>`).join("");
}

/* ---- Build tour slider ---- */
function buildCaliPlaces(){
  const track = document.getElementById("cali-track");
  if(!track) return;
  track.innerHTML = CALI_PLACES.map((p,i)=>`
    <figure class="place-card" data-open-gallery="cali">
      <span class="place-num">${String(i+1).padStart(2,"0")}</span>
      <span class="place-tag">${p.tag}</span>
      <img src="${p.src}" alt="${p.title}, Cali" loading="lazy">
      <figcaption><b>${p.title}</b><small>${p.desc}</small></figcaption>
    </figure>`).join("");
}

/* ---- Build tour slider ---- */
function buildTour(){
  const track = document.getElementById("tour-track");
  if(!track) return;
  track.innerHTML = TOUR.map(t=>`
    <figure class="tour-card" data-open-gallery="${t.key}">
      <img src="${t.src}" alt="${t.cap}" loading="lazy">
      <figcaption>${t.cap}</figcaption>
    </figure>`).join("");
}

/* ============================================================
   LIGHTBOX (galería estilo Airbnb)
   ============================================================ */
const lb = { el:null, stage:null, thumbs:null, titleEl:null, countEl:null, gallery:null, index:0 };

function buildLightbox(){
  const el = document.createElement("div");
  el.className = "lb";
  el.innerHTML = `
    <div class="lb-top">
      <div><span class="lb-title"></span><span class="lb-count"></span></div>
      <button class="lb-close" aria-label="Cerrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div class="lb-stage">
      <button class="lb-nav lb-prev" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div class="lb-img-wrap"></div>
      <button class="lb-nav lb-next" aria-label="Siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
    </div>
    <div class="lb-thumbs"></div>`;
  document.body.appendChild(el);
  lb.el = el;
  lb.stage = el.querySelector(".lb-img-wrap");
  lb.thumbs = el.querySelector(".lb-thumbs");
  lb.titleEl = el.querySelector(".lb-title");
  lb.countEl = el.querySelector(".lb-count");
  el.querySelector(".lb-close").onclick = closeLightbox;
  el.querySelector(".lb-prev").onclick = ()=>stepLightbox(-1);
  el.querySelector(".lb-next").onclick = ()=>stepLightbox(1);
  el.addEventListener("click",e=>{ if(e.target===el) closeLightbox(); });

  // swipe on stage (mobile)
  let sx=0;
  lb.stage.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
  lb.stage.addEventListener("touchend",e=>{
    const dx=e.changedTouches[0].clientX-sx;
    if(Math.abs(dx)>40) stepLightbox(dx<0?1:-1);
  },{passive:true});
}

function slideMarkup(g, i){
  if(g.images && g.images.length){
    return `<img src="${g.images[i]}" alt="${g.label}">`;
  }
  return `<div class="imgslot" data-label="${g.label} · próximamente"></div>`;
}

function openLightbox(key){
  const g = GALLERIES[key];
  if(!g) return;
  lb.gallery = g; lb.index = 0;
  lb.titleEl.textContent = g.label;
  renderLightbox();
  lb.el.classList.add("open");
  document.body.style.overflow = "hidden";
}
function renderLightbox(){
  const g = lb.gallery;
  const total = (g.images && g.images.length) ? g.images.length : 1;
  lb.stage.innerHTML = slideMarkup(g, lb.index);
  lb.countEl.textContent = (g.images && g.images.length) ? `${lb.index+1} / ${total}` : "";
  if(g.images && g.images.length>1){
    lb.thumbs.style.display = "flex";
    lb.thumbs.innerHTML = g.images.map((src,i)=>
      `<div class="t ${i===lb.index?'active':''}" data-i="${i}"><img src="${src}" alt=""></div>`).join("");
    lb.thumbs.querySelectorAll(".t").forEach(t=>t.onclick=()=>{lb.index=+t.dataset.i;renderLightbox();});
  }else{
    lb.thumbs.style.display = "none";
  }
  const multi = g.images && g.images.length>1;
  lb.el.querySelector(".lb-prev").style.visibility = multi?"visible":"hidden";
  lb.el.querySelector(".lb-next").style.visibility = multi?"visible":"hidden";
}
function stepLightbox(dir){
  const g = lb.gallery;
  if(!g.images || !g.images.length) return;
  lb.index = (lb.index + dir + g.images.length) % g.images.length;
  renderLightbox();
}
function closeLightbox(){
  lb.el.classList.remove("open");
  document.body.style.overflow = "";
}

/* ============================================================
   THEME (claro / oscuro)
   ============================================================ */
function applyTheme(t){
  document.documentElement.setAttribute("data-theme", t);
  document.querySelectorAll("[data-theme-toggle]").forEach(b=>{
    b.setAttribute("aria-pressed", t==="dark");
    const lbl = b.querySelector(".theme-label");
    if(lbl) lbl.textContent = t==="dark" ? "Claro" : "Oscuro";
  });
}
function initTheme(){
  let saved = null;
  try{ saved = localStorage.getItem("imh-theme"); }catch(e){}
  applyTheme(saved === "dark" ? "dark" : "light");
  document.querySelectorAll("[data-theme-toggle]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const cur = document.documentElement.getAttribute("data-theme")==="dark" ? "dark":"light";
      const next = cur==="dark" ? "light":"dark";
      applyTheme(next);
      try{ localStorage.setItem("imh-theme", next); }catch(e){}
    });
  });
}

/* ============================================================
   SWIPE HINTS — ocultar tras el primer scroll
   ============================================================ */
function initSwipeHints(){
  document.querySelectorAll(".hscroll").forEach(scroller=>{
    const hint = scroller.parentElement.querySelector(".swipe-hint");
    if(!hint) return;
    const hide = ()=>{ hint.classList.add("gone"); scroller.removeEventListener("scroll", hide); };
    scroller.addEventListener("scroll", hide, {passive:true});
  });
}

/* ============================================================
   FAQ accordion
   ============================================================ */
function initFaq(){
  document.querySelectorAll(".faq-item").forEach(item=>{
    const q = item.querySelector(".faq-q");
    q.addEventListener("click", ()=>{
      const open = item.classList.contains("open");
      item.classList.toggle("open", !open);
    });
  });
}

/* ============================================================
   COOKIES + LEGAL
   ============================================================ */
function initCookies(){
  const el = document.getElementById("cookie");
  if(!el) return;
  let consent = null;
  try{ consent = localStorage.getItem("imh-cookies"); }catch(e){}
  if(!consent){
    setTimeout(()=>el.classList.add("show"), 1400);
  }
  el.querySelectorAll("[data-cookie]").forEach(b=>{
    b.addEventListener("click", ()=>{
      try{ localStorage.setItem("imh-cookies", b.dataset.cookie); }catch(e){}
      el.classList.remove("show");
    });
  });
}

const LEGAL = {
  terminos: {
    title:"Términos y condiciones",
    body:"<p>Este es un resumen de los términos de uso de IMH Coliving. La reserva de habitaciones implica la aceptación de nuestras políticas de check‑in, convivencia y cancelación.</p><p><b>Pronto cargaremos aquí el documento completo.</b> Mientras tanto, escríbenos por WhatsApp para cualquier consulta sobre tu estadía.</p>"
  },
  privacidad: {
    title:"Política de privacidad",
    body:"<p>En IMH Coliving cuidamos tus datos. La información que compartes con nosotros se usa únicamente para gestionar tu reserva y mejorar tu experiencia, y nunca se comparte con terceros sin tu consentimiento.</p><p><b>Pronto cargaremos aquí el documento completo.</b></p>"
  },
  cookies: {
    title:"Política de cookies",
    body:"<p>Usamos cookies propias y de terceros para recordar tus preferencias (como el tema claro/oscuro) y analizar el tráfico del sitio de forma anónima.</p><p>Puedes aceptar o rechazar las cookies no esenciales desde el aviso inferior. <b>Pronto cargaremos aquí el documento completo.</b></p>"
  },
  incluye: {
    title:"Antes de reservar",
    body:`<p><b>Es como estar en tu casa.</b> No hay recepción 24 horas: si necesitas algo, avísanos con tiempo para poder gestionarlo.</p>
      <ul class="legal-list">
        <li>Si tu estadía es mayor a 7 días, se incluye aseo una vez por semana.</li>
        <li>Cambio de sábanas y toallas antes de los 7 días: costo adicional de $10.000 COP por cambio.</li>
        <li>El aire acondicionado no está incluido: $30.000 COP por noche (la habitación Aguacatal no tiene aire).</li>
        <li>Todas las habitaciones tienen ventana y ventilación natural.</li>
      </ul>
      <p class="legal-sub">Políticas de reserva</p>
      <ul class="legal-list">
        <li>Reservas desde 3 noches en adelante.</li>
        <li>Check‑in: desde las 3:00 p.m. · Check‑out: hasta las 12:00 m.</li>
        <li>Ingreso autónomo: te enviamos un código de seguridad personalizado para la cerradura electrónica. Entrada libre a cualquier hora.</li>
      </ul>`
  },
  reglamento: {
    title:"Reglamento de convivencia",
    body:`<ol class="legal-ol">
        <li>No está permitido el consumo de sustancias psicotrópicas o psicoactivas.</li>
        <li>No está permitido el ingreso de mascotas.</li>
        <li>No está permitido fumar tabaco ni cigarrillo dentro de la habitación ni en ningún espacio de la casa.</li>
        <li>No se permite el ingreso de menores de edad sin la compañía de su padre, madre o tutor responsable, previa presentación del documento legal de filiación.</li>
        <li>No está permitido pernoctar a personas distintas a las que aparecen en la reserva</li>
        <li>No se permiten fiestas, algarabía, hablar fuerte ni música a alto volumen.</li>
        <li>En la cocina, usar solo los implementos de los cajones marcados con el sticker correspondiente.</li>
        <li>Al usar la cocina, dejar todo limpio, secar los utensilios y guardarlos en su lugar.</li>
        <li>Dejar el lavaplatos sin residuos de comida.</li>
        <li>No llevar la vajilla a las habitaciones; dejarla siempre en la cocina para que todos puedan usarla.</li>
        <li>Check‑in desde las 3:00 p.m. y check‑out máximo a las 12:00 del mediodía.</li>
        <li>Algunas habitaciones tienen aire acondicionado; es un servicio adicional de $30.000 por noche, no incluido en el alojamiento.</li>
      </ol>
      <p>Por favor ten presente las normas de convivencia y el descanso de los demás huéspedes. ¡Gracias y bienvenido a nuestro alojamiento!</p>`
  }
};

function initLegal(){
  let modal = document.createElement("div");
  modal.className = "legal-modal";
  modal.innerHTML = `<div class="legal-card">
    <button class="legal-close" aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <h3 class="legal-title"></h3>
    <div class="legal-body"></div>
  </div>`;
  document.body.appendChild(modal);
  const titleEl = modal.querySelector(".legal-title");
  const bodyEl = modal.querySelector(".legal-body");
  const open = key=>{
    const data = LEGAL[key]; if(!data) return;
    titleEl.textContent = data.title;
    bodyEl.innerHTML = data.body;
    modal.classList.add("open");
    document.body.style.overflow="hidden";
  };
  const close = ()=>{ modal.classList.remove("open"); document.body.style.overflow=""; };
  modal.querySelector(".legal-close").onclick = close;
  modal.addEventListener("click", e=>{ if(e.target===modal) close(); });
  document.body.addEventListener("click", e=>{
    const t = e.target.closest("[data-legal]");
    if(t){ e.preventDefault(); open(t.dataset.legal); }
  });
}

/* ============================================================
   GOOGLE MAPS REVIEWS (Sincronización & Caché cada 2-3 días)
   ============================================================ */
const REVIEWS_SYNC_INTERVAL = 3 * 24 * 60 * 60 * 1000; // 3 días

function initGoogleReviews(){
  const grid = document.getElementById("reviews-grid");
  if(!grid) return;

  const defaultReviews = [
    { author:"María F.", avatar:"M", rating:5, date:"Hace 2 días", platform:"Google Maps", text:"Excelente ubicación en Santa Rita, muy tranquilo y cerca de todo. La atención de la casa es espectacular y el ambiente súper acogedor. ¡Volvería sin pensarlo!" },
    { author:"Daniel R.", avatar:"D", rating:5, date:"Hace 4 días", platform:"Google Maps", text:"El ambiente para trabajar remoto es increíble. Wi-Fi súper estable en todos los rincones y espacios tranquilos para concentrarse. Perfecto para nómadas." },
    { author:"Sophie L.", avatar:"S", rating:5, date:"Hace 1 semana", platform:"Google Maps", text:"La casa neocolonial es hermosa y muy fresca. Las clases de yoga y bienestar en la mañana fueron un plus inesperado. Una experiencia súper completa en Cali." }
  ];

  const render = (list)=>{
    grid.innerHTML = list.slice(0,3).map((r,i)=>`
      <article class="rev-card">
        <div class="rev-stars">★★★★★</div>
        <p class="rev-text">"${r.text}"</p>
        <div class="rev-who">
          <span class="rev-av">${r.avatar || r.author.charAt(0)}</span>
          <div>
            <b>${r.author}</b>
            <small>${r.date} · <span style="color:#4285F4;font-weight:700">${r.platform || 'Google Maps'}</span></small>
          </div>
        </div>
      </article>`).join("");
  };

  render(defaultReviews);

  const lastSync = parseInt(localStorage.getItem("imh_reviews_last_sync") || "0", 10);
  const now = Date.now();
  const cachedData = localStorage.getItem("imh_reviews_data");

  if(cachedData && (now - lastSync < REVIEWS_SYNC_INTERVAL)){
    try {
      const parsed = JSON.parse(cachedData);
      if(parsed.reviews && parsed.reviews.length) render(parsed.reviews);
    } catch(e){}
  } else {
    fetch("reviews.json?t=" + now)
      .then(res => res.json())
      .then(data => {
        if(data && data.reviews && data.reviews.length){
          localStorage.setItem("imh_reviews_data", JSON.stringify(data));
          localStorage.setItem("imh_reviews_last_sync", now.toString());
          render(data.reviews);
        }
      })
      .catch(() => {});
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", ()=>{
  initTheme();
  hydrateSlots();
  buildHeroSlider();
  buildSector();
  buildCaliPlaces();
  buildTour();
  buildLightbox();
  initSwipeHints();
  initFaq();
  initGoogleReviews();
  initCookies();
  initLegal();

  /* open lightbox from any [data-open-gallery] */
  document.body.addEventListener("click", e=>{
    const trigger = e.target.closest("[data-open-gallery]");
    if(trigger){ e.preventDefault(); openLightbox(trigger.dataset.openGallery); }
  });

  /* keyboard nav */
  document.addEventListener("keydown", e=>{
    if(!lb.el.classList.contains("open")) return;
    if(e.key==="Escape") closeLightbox();
    if(e.key==="ArrowLeft") stepLightbox(-1);
    if(e.key==="ArrowRight") stepLightbox(1);
  });

  /* nav scroll state */
  const nav = document.querySelector(".nav");
  const onScroll = ()=> nav.classList.toggle("scrolled", window.scrollY>40);
  onScroll(); window.addEventListener("scroll", onScroll, {passive:true});

  /* mobile drawer */
  const drawer = document.querySelector(".drawer");
  document.querySelectorAll("[data-drawer-open]").forEach(b=>b.onclick=()=>{drawer.classList.add("open");document.body.style.overflow="hidden";});
  const closeDrawer=()=>{drawer.classList.remove("open");document.body.style.overflow="";};
  document.querySelectorAll("[data-drawer-close]").forEach(b=>b.onclick=closeDrawer);
  drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeDrawer));

  /* WhatsApp buttons */
  document.querySelectorAll("[data-wa]").forEach(b=>{
    b.addEventListener("click", e=>{ e.preventDefault(); openWA(b.dataset.wa); });
  });

  /* tour slider arrows */
  document.querySelectorAll("[data-scroll]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const target = document.querySelector(btn.dataset.scroll);
      if(!target) return;
      const amount = Math.round(target.clientWidth*0.82) * (btn.dataset.dir==="next"?1:-1);
      target.scrollBy({left:amount, behavior:"smooth"});
    });
  });

  /* reveal on scroll */
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }});
  },{threshold:.12, rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  /* year */
  const y=document.getElementById("year"); if(y) y.textContent=new Date().getFullYear();
});
/* ===== ONBOARDING / RESERVA — captura de datos → N8N + WhatsApp ===== */
(function(){
  var ob=document.getElementById('ob');
  if(!ob) return;
  function isEn(){return document.documentElement.lang==='en';}
  function t(es,en){return isEn()?en:es;}

  var PRACTICE_KEYS={
    'Pilates':'Pilates',
    'Método Feldenkrais':'Método Feldenkrais',
    'Ishka Kankueb Yoga':'Ishka Kankueb Yoga',
    'IKY Breathwork':'IKY Breathwork',
    'Programa Movefulness':'Programa Movefulness'
  };
  var state={practice:'',goal:'',exp:'Algo de experiencia',horario:'',frecuencia:''};

  // foto por servicio en el aside (interactivo)
  var oaPhoto=document.getElementById('oaPhoto');
  var OA_PHOTO={
    'Pilates':'assets/pilates-brand.jpg',
    'Método Feldenkrais':'assets/feldenkrais-brand.jpg',
    'Ishka Kankueb Yoga':'assets/yoga-brand.jpg',
    'IKY Breathwork':'assets/breathwork-brand.jpg',
    'Programa Movefulness':'assets/amb-bowls.jpg'
  };
  var OA_ROTATE=['assets/pilates-brand.jpg','assets/yoga-brand.jpg','assets/breathwork-brand.jpg','assets/feldenkrais-brand.jpg','assets/amb-bowls.jpg'];
  var rotTimer=null,rotIdx=0;
  function setPhoto(src){
    if(!oaPhoto||!src||oaPhoto.getAttribute('src')===src) return;
    oaPhoto.style.opacity=0;
    setTimeout(function(){oaPhoto.src=src;oaPhoto.style.opacity='';},260);
  }
  function stopRotate(){ if(rotTimer){clearInterval(rotTimer);rotTimer=null;} }
  function startRotate(){
    stopRotate();
    if(state.practice) return;
    rotIdx=0;
    rotTimer=setInterval(function(){ if(state.practice||current!==1){stopRotate();return;} rotIdx=(rotIdx+1)%OA_ROTATE.length; setPhoto(OA_ROTATE[rotIdx]); },3200);
  }

  var stepsEl=ob.querySelectorAll('.ob-step');
  var railEl=ob.querySelectorAll('#oaSteps .oa-step');
  var current=1;
  function goStep(n){
    current=n;
    var bar=document.getElementById('obBar'); if(bar) bar.style.width=Math.min(100,n*(100/3))+'%';
    if(n!==1) stopRotate();
    stepsEl.forEach(function(s){s.classList.toggle('show',+s.dataset.step===n);});
    railEl.forEach(function(r){
      var d=+r.dataset.s; r.classList.remove('active','done');
      var eff=(n===4)?4:n;
      if(d<eff) r.classList.add('done'); else if(d===eff) r.classList.add('active');
    });
    var main=ob.querySelector('.ob-main'); if(main) main.scrollTop=0;
  }

  function selectIn(sel,val){
    ob.querySelectorAll(sel+' .ob-choice').forEach(function(b){b.classList.toggle('sel',b.dataset.val===val);});
  }
  function open(opts){
    opts=opts||{};
    if(opts.practice && PRACTICE_KEYS[opts.practice]){
      state.practice=PRACTICE_KEYS[opts.practice];
      selectIn('#obPractice',state.practice);
    } else {
      state.practice='';
      ob.querySelectorAll('#obPractice .ob-choice').forEach(function(p){p.classList.remove('sel');});
    }
    goStep(1);
    ob.classList.add('open');
    document.body.style.overflow='hidden';
    ob.setAttribute('aria-hidden','false');
    if(state.practice) setPhoto(OA_PHOTO[state.practice]); else startRotate();
  }
  function close(){
    ob.classList.remove('open');
    document.body.style.overflow='';
    ob.setAttribute('aria-hidden','true');
    stopRotate();
  }
  window.__ikyBook=open;

  ob.querySelectorAll('#obPractice .ob-choice').forEach(function(b){
    b.addEventListener('click',function(){state.practice=b.dataset.val;selectIn('#obPractice',state.practice);stopRotate();setPhoto(OA_PHOTO[state.practice]);});
  });
  ob.querySelectorAll('#obGoal .ob-choice').forEach(function(b){
    b.addEventListener('click',function(){state.goal=b.dataset.val;selectIn('#obGoal',state.goal);});
  });
  ob.querySelectorAll('#obExp .ob-pill').forEach(function(b){
    b.addEventListener('click',function(){
      state.exp=b.dataset.val;
      ob.querySelectorAll('#obExp .ob-pill').forEach(function(x){x.classList.toggle('sel',x===b);});
    });
  });
  ob.querySelectorAll('#obHorario .ob-pill').forEach(function(b){
    b.addEventListener('click',function(){state.horario=b.dataset.val;ob.querySelectorAll('#obHorario .ob-pill').forEach(function(x){x.classList.toggle('sel',x===b);});});
  });
  ob.querySelectorAll('#obFrecuencia .ob-pill').forEach(function(b){
    b.addEventListener('click',function(){state.frecuencia=b.dataset.val;ob.querySelectorAll('#obFrecuencia .ob-pill').forEach(function(x){x.classList.toggle('sel',x===b);});});
  });

  function markErr(el,bad){el.classList.toggle('err',bad);return !bad;}
  function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}

  document.getElementById('obNext1').addEventListener('click',function(){goStep(2);});
  document.getElementById('obNext2').addEventListener('click',function(){goStep(3);});

  ob.querySelectorAll('[data-back]').forEach(function(b){
    b.addEventListener('click',function(){ if(current>1) goStep(current-1); });
  });
  ob.querySelectorAll('[data-ob-close]').forEach(function(b){b.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ob.classList.contains('open'))close();});

  function buildWaMessage(d){
    var nom=(d.nombre+' '+d.apellido).trim()||'—';
    var lines=[
      t('✨ *Nueva solicitud · IKY Motion Hub*','✨ *New request · IKY Motion Hub*'),
      '──────────────',
      '👤 '+t('Nombre','Name')+': '+nom,
      '🎯 '+t('Me interesa','Interested in')+': '+(d.practica||'—'),
      '💪 '+t('Objetivo','Goal')+': '+(d.objetivo||'—'),
      '📊 '+t('Experiencia','Experience')+': '+(d.experiencia||'—'),
      '🕒 '+t('Horario','Preferred time')+': '+(d.horario||'—'),
      '📆 '+t('Frecuencia','Frequency')+': '+(d.frecuencia||'—')
    ];
    if(d.telefono) lines.push('📱 WhatsApp: '+d.telefono);
    if(d.email) lines.push('📧 '+t('Correo','Email')+': '+d.email);
    if(d.mensaje) lines.push('📝 '+t('Nota','Note')+': '+d.mensaje);
    lines.push('──────────────');
    lines.push(t('🙌 ¡Quiero reservar mi lugar en el Hub!','🙌 I want to book my place at the Hub!'));
    return lines.join('\n');
  }
  function sendToN8N(d){
    if(typeof IKY_N8N_WEBHOOK==='undefined' || !IKY_N8N_WEBHOOK) return;
    try{
      var body=JSON.stringify(d);
      if(navigator.sendBeacon){navigator.sendBeacon(IKY_N8N_WEBHOOK,new Blob([body],{type:'application/json'}));}
      else{fetch(IKY_N8N_WEBHOOK,{method:'POST',headers:{'Content-Type':'application/json'},body:body,keepalive:true,mode:'cors'}).catch(function(){});}
    }catch(e){}
  }
  function renderReceipt(d){
    var rows='';
    rows+='<div class="pay-row"><span>'+t('Me interesa','Interested in')+'</span><span class="v">'+(d.practica||'—')+'</span></div>';
    rows+='<div class="pay-row"><span>'+t('Objetivo','Goal')+'</span><span class="v">'+(d.objetivo||'—')+'</span></div>';
    var nom=(d.nombre+' '+d.apellido).trim();
    if(nom)rows+='<div class="pay-row"><span>'+t('Nombre','Name')+'</span><span class="v">'+nom+'</span></div>';
    document.getElementById('obReceipt').innerHTML=rows;
  }

  document.getElementById('obSend').addEventListener('click',function(){
    var n=document.getElementById('fNombre'),tel=document.getElementById('fTel'),em=document.getElementById('fEmail');
    var ccEl=document.getElementById('fCc'); var cc=ccEl?ccEl.value:''; var telNum=tel.value.trim();
    var d={
      nombre:n.value.trim(),
      apellido:'',
      telefono:telNum?((cc?cc+' ':'')+telNum):'',
      indicativo:cc,
      email:em.value.trim(),
      practica:state.practice||t('Aún no lo sé','Not sure yet'),
      objetivo:state.goal||'',
      experiencia:state.exp||'',
      horario:state.horario||'',
      frecuencia:state.frecuencia||'',
      mensaje:'',
      idioma:document.documentElement.lang||'es',
      origen:'ikymotionhub.com',
      fecha:new Date().toISOString()
    };
    sendToN8N(d);
    var num=(typeof IKY_WA_NUMBER!=='undefined'&&IKY_WA_NUMBER)?IKY_WA_NUMBER:'573153161875';
    var wa='https://wa.me/'+num+'?text='+encodeURIComponent(buildWaMessage(d));
    document.getElementById('obWa').href=wa;
    renderReceipt(d);
    goStep(4);
    window.open(wa,'_blank');
  });

  document.querySelectorAll('.js-book').forEach(function(b){
    b.addEventListener('click',function(e){
      e.preventDefault();
      open({practice:b.dataset.practice});
    });
  });
})();
