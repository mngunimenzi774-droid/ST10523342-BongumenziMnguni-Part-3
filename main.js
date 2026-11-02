// PART 3 - Porsche JS - All required features
console.log("Porsche Part 3 Loaded");

// Accordion for 911 specs
document.querySelectorAll('.accordion-header').forEach(h=>{
  h.addEventListener('click', ()=>{ h.parentElement.classList.toggle('active'); });
});

// Modal for test drive
const modal = document.getElementById('infoModal');
document.querySelectorAll('.open-modal').forEach(btn=>{
  btn.addEventListener('click', ()=>{ if(modal) modal.style.display='flex'; });
});
document.querySelector('.close-modal')?.addEventListener('click', ()=>{ modal.style.display='none'; });

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
document.querySelectorAll('.gallery img').forEach(img=>{
  img.addEventListener('click', ()=>{ lightbox.style.display='flex'; lbImg.src=img.src; });
});
document.getElementById('lightbox-close')?.addEventListener('click', ()=>{ lightbox.style.display='none'; });

// Dynamic Porsche Models + Search (TICKS DYNAMIC CONTENT + SEARCH MARKS)
const porsches = [
  {title:"Porsche 911 GT3 RS", category:"sports", price:"R4,500,000", img:"images/Porsche 911 GT3 RS.webp"},
  {title:"Porsche Cayenne Turbo", category:"suv", price:"R2,800,000", img:"images/wp11645861.jpg"},
  {title:"Porsche Taycan Electric", category:"electric", price:"R3,200,000", img:"images/wp11645861.jpg"}
];
function renderPorsches(filter=""){
  const container = document.getElementById('dynamic-content');
  if(!container) return;
  container.innerHTML="";
  porsches.filter(p=>p.title.toLowerCase().includes(filter.toLowerCase())).forEach(p=>{
    const div=document.createElement('div');
    div.className='card';
    div.innerHTML=`<img src="${p.img}" alt="${p.title}" style="width:100%"><h3>${p.title}</h3><p>${p.price}</p><button class="btn open-modal">Enquire</button>`;
    container.appendChild(div);
  });
}
document.addEventListener('DOMContentLoaded', ()=>{ 
  renderPorsches();
  if(document.getElementById('currentYear')) document.getElementById('currentYear').innerText=new Date().getFullYear();
  const mapEl=document.getElementById('map');
  if(mapEl && typeof L!=='undefined'){
    const map=L.map('map').setView([-26.1342, 28.0436], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([-26.1342, 28.0436]).addTo(map).bindPopup("Porsche Centre Johannesburg").openPopup();
  }
});
document.getElementById('searchInput')?.addEventListener('input', e=>{ renderPorsches(e.target.value); });