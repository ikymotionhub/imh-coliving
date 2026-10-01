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
  hero:      { label:"Fachada colonial", images:[
    "assets/hero/fachada-1.jpg","assets/hero/fachada-2.jpg","assets/hero/fachada-4.jpg",
    "assets/hero/fachada-5.jpg","assets/hero/fachada-6.jpg","assets/hero/fachada-3.jpg"] },
  santarita: { label:"Habitación Santa Rita", images:[
    "assets/rooms/santarita-1.jpg","assets/rooms/santarita-2.jpg","assets/rooms/santarita-3.jpg",
    "assets/rooms/santarita-4.jpg","assets/rooms/santarita-5.jpg","assets/rooms/santarita-6.jpg"] },
  riocali:   { label:"Habitación Río Cali", images:[
    "assets/rooms/riocali-1.jpg","assets/rooms/riocali-2.jpg","assets/rooms/riocali-3.jpg",
    "assets/rooms/riocali-4.jpg","assets/rooms/riocali-5.jpg","assets/rooms/riocali-6.jpg"] },
  aguacatal: { label:"Habitación Aguacatal", images:[
    "assets/rooms/aguacatal-1.jpg","assets/rooms/aguacatal-2.jpg","assets/rooms/aguacatal-3.jpg",
    "assets/rooms/aguacatal-4.jpg","assets/rooms/aguacatal-5.jpg","assets/rooms/aguacatal-6.jpg"] },
  penon:     { label:"Habitación El Peñón", images:[
    "assets/rooms/penon-1.jpg","assets/rooms/penon-2.jpg","assets/rooms/penon-3.jpg",
    "assets/rooms/penon-4.jpg","assets/rooms/penon-5.jpg","assets/rooms/penon-6.jpg"] },
  farallones:{ label:"Habitación Farallones", images:[
    "assets/rooms/farallones-1.jpg","assets/rooms/farallones-2.jpg","assets/rooms/farallones-3.jpg",
    "assets/rooms/farallones-4.jpg","assets/rooms/farallones-5.jpg","assets/rooms/farallones-6.jpg"] },
  cocina:    { label:"Cocina compartida", images:[
    "assets/spaces/cocina-1.jpg","assets/spaces/cocina-2.jpg","assets/spaces/cocina-3.jpg","assets/spaces/cocina-4.jpg"] },
  sala:      { label:"Sala & zonas comunes", images:[
    "assets/spaces/sala-1.jpg","assets/spaces/sala-2.jpg","assets/spaces/sala-3.jpg"] },
  hamacas:   { label:"Zona de hamacas", images:[
    "assets/spaces/hamacas-1.jpg","assets/spaces/hamacas-2.jpg"] },
  bienestar: { label:"Salón de bienestar", images:[
    "assets/bienestar/yoga-1.webp","assets/spaces/sala-1.jpg"] },
  garage:    { label:"Patio & parqueadero", images:[
    "assets/spaces/garage-1.jpg","assets/spaces/garage-2.jpg","assets/spaces/garage-3.jpg"] },
  ctafinal:  { label:"Patio · IMH Coliving", images:[
    "assets/hero/fachada-3.jpg","assets/spaces/garage-1.jpg"] },
  cali:      { label:"Cali, Valle del Cauca", images:[
    "assets/cali/ermita.webp","assets/cali/plaza.jpg","assets/cali/salsa-club.webp",
    "assets/cali/skyline.jpg","assets/cali/aerial.webp"] },
};

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
  {src:"assets/rooms/riocali-1.jpg", cap:"Habitación Río Cali", key:"riocali"},
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
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", ()=>{
  initTheme();
  hydrateSlots();
  buildTour();
  buildLightbox();
  initSwipeHints();
  initFaq();

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

  /* Booking widget → WhatsApp */
  const bkForm = document.getElementById("booking");
  if(bkForm){
    bkForm.addEventListener("submit", e=>{
      e.preventDefault();
      const ci = document.getElementById("bk-in").value;
      const co = document.getElementById("bk-out").value;
      const gp = document.getElementById("bk-guests").value;
      const fmt = d => d ? new Date(d+"T00:00").toLocaleDateString("es-CO",{day:"numeric",month:"long",year:"numeric"}) : "por definir";
      const msg = `¡Hola IMH Coliving! 👋 Quiero consultar disponibilidad.\n\n📅 Check-in: ${fmt(ci)}\n📅 Check-out: ${fmt(co)}\n👥 Huéspedes: ${gp}\n\n¿Tienen habitaciones disponibles?`;
      openWA(msg);
    });
    const today = new Date();
    const tmr = new Date(Date.now()+864e5);
    const iso = d=>d.toISOString().slice(0,10);
    document.getElementById("bk-in").min = iso(today);
    document.getElementById("bk-out").min = iso(tmr);
  }

  /* reveal on scroll */
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }});
  },{threshold:.12, rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  /* year */
  const y=document.getElementById("year"); if(y) y.textContent=new Date().getFullYear();
});
