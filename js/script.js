const photos = [
  {src:"assets/images/bei-01.jpg",title:"Gedung Bursa Efek Indonesia",tag:"LOCATION"},
  {src:"assets/images/bei-02.jpg",title:"Indeks Saham Dunia",tag:"MARKET INSIGHT"},
  {src:"assets/images/bei-03.jpg",title:"Area Financial Forum",tag:"EVENT"},
  {src:"assets/images/bei-04.jpg",title:"Bursa Karbon Indonesia",tag:"DISCOVERY"},
  {src:"assets/images/bei-05.jpg",title:"Suasana Forum Keuangan",tag:"ATMOSPHERE"},
  {src:"assets/images/bei-06.jpg",title:"Ruang Utama BEI",tag:"INTERIOR"},
  {src:"assets/images/bei-07.jpg",title:"Ilustrasi Pertumbuhan Investasi",tag:"LEARNING"},
  {src:"assets/images/bei-08.jpg",title:"Panggung Financial Forum",tag:"DOCUMENTATION"},
  {src:"assets/images/bei-09.jpg",title:"Informasi dan Sejarah Bursa",tag:"HISTORY"},
  {src:"assets/images/bei-10.jpg",title:"Edukasi Investor Saham",tag:"INVESTOR EDUCATION"}
];
const grid = document.getElementById("galleryGrid");
photos.forEach((photo,index)=>{
  const card=document.createElement("button");
  card.className="gallery-card";
  card.type="button";
  card.setAttribute("aria-label",`Lihat foto ${photo.title}`);
  card.innerHTML=`<img src="${photo.src}" alt="${photo.title}" loading="lazy"><span class="gallery-caption"><span>${photo.tag}<strong>${photo.title}</strong></span><b>↗</b></span>`;
  card.addEventListener("click",()=>openLightbox(index));
  grid.appendChild(card);
});
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const lightboxCaption=document.getElementById("lightboxCaption");
let currentPhoto=0;
function openLightbox(index){currentPhoto=index;updateLightbox();lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function updateLightbox(){const p=photos[currentPhoto];lightboxImage.src=p.src;lightboxImage.alt=p.title;lightboxCaption.textContent=`${String(currentPhoto+1).padStart(2,"0")} / 10 — ${p.title}`;}
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow="";}
function movePhoto(step){currentPhoto=(currentPhoto+step+photos.length)%photos.length;updateLightbox();}
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click",()=>movePhoto(-1));
document.getElementById("lightboxNext").addEventListener("click",()=>movePhoto(1));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="Escape")closeLightbox();if(e.key==="ArrowLeft")movePhoto(-1);if(e.key==="ArrowRight")movePhoto(1);});
const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("nav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("themeToggle").addEventListener("click",()=>document.body.classList.toggle("dark"));
const toTop=document.getElementById("toTop"),progress=document.getElementById("progressBar");
window.addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+"%";toTop.classList.toggle("show",window.scrollY>500);});
toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const video=document.getElementById("visitVideo"),placeholder=document.getElementById("videoPlaceholder");
video.addEventListener("loadedmetadata",()=>placeholder.classList.add("hidden"));
video.addEventListener("play",()=>placeholder.classList.add("hidden"));
video.addEventListener("error",()=>placeholder.classList.remove("hidden"));
