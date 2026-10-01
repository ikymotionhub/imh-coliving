/* ============================================================
   IMH Coliving — app.js
   ============================================================ */

/* ---- WhatsApp config (⚠️ REEMPLAZAR por el número real del cliente) ---- */
const WHATSAPP_NUMBER = "573000000000"; // formato: 57 + número (sin +, sin espacios)

function waLink(message){
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}
function openWA(message){ window.open(waLink(message), "_blank", "noopener"); }

/* ============================================================
   GALERÍAS DE IMÁGENES
   ------------------------------------------------------------
   Para MAPEAR las fotos reales más adelante, sólo rellena el
   array `images` de cada galería con las rutas optimizadas, p.ej:
     santarita.images = ["assets/img/santarita/01.jpg", "...02.jpg"]
   Mientras estén vacías, se muestran placeholders elegantes.
   ============================================================ */
const GALLERIES = {
  hero:      { label:"Fachada colonial", images:[] },
  santarita: { label:"Habitación Santa Rita", images:[] },
  riocali:   { label:"Habitación Río Cali", images:[] },
  aguacatal: { label:"Habitación Aguacatal", images:[] },
  penon:     { label:"Habitación El Peñón", images:[] },
  farallones:{ label:"Habitación Farallones", images:[] },
  cocina:    { label:"Cocina compartida", images:[] },
  sala:      { label:"Zona compartida", images:[] },
  hamacas:   { label:"Zona de hamacas", images:[] },
  bienestar: { label:"Salón de bienestar", images:[] },
  ctafinal:  { label:"Patio · IMH Coliving", images:[] },
  // Galería inmersiva final (mezcla de espacios)
  g1:{label:"Fachada",images:[]}, g2:{label:"Patio",images:[]}, g3:{label:"Habitación",images:[]},
  g4:{label:"Zona común",images:[]}, g5:{label:"Hamacas",images:[]}, g6:{label:"Salón yoga",images:[]},
  g7:{label:"Cocina",images:[]}, g8:{label:"Escaleras",images:[]}, g9:{label:"Detalle",images:[]},
  g10:{label:"Habitación",images:[]}, g11:{label:"Baño",images:[]}, g12:{label:"Entrada",images:[]},
};

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

/* ============================================================
   LIGHTBOX (galería estilo Airbnb)
   ============================================================ */
const lb = {
  el:null, stage:null, thumbs:null, titleEl:null, countEl:null,
  gallery:null, index:0
};

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
  // thumbs
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
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", ()=>{
  hydrateSlots();
  buildLightbox();

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
    b.addEventListener("click", e=>{
      e.preventDefault();
      openWA(b.dataset.wa);
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
    // sensible default dates (today + tomorrow)
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
