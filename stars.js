const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
function initStars() {
  stars = [];
  for (let i = 0; i < 180; i++) {
    stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*1.2+0.2, o: Math.random()*0.7+0.1 });
  }
}
function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = 'rgba(201,168,76,'+s.o+')';
    ctx.fill();
    s.o += (Math.random()-0.5)*0.02;
    s.o = Math.max(0.05, Math.min(0.9, s.o));
  }
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize', function(){ resize(); initStars(); });
resize(); initStars(); drawStars();
function spawnParticle() {
  const el = document.createElement('div');
  el.className = 'particle';
  const size = Math.random()*4+2;
  const hue = Math.random()>0.5 ? '201,168,76' : '107,53,160';
  el.style.cssText = 'position:fixed;border-radius:50%;pointer-events:none;z-index:0;animation:floatUp linear forwards;width:'+size+'px;height:'+size+'px;left:'+(Math.random()*100)+'vw;bottom:0;background:rgba('+hue+',.8);animation-duration:'+(Math.random()*8+6)+'s;animation-delay:'+(Math.random()*4)+'s;';
  document.body.appendChild(el);
  setTimeout(function(){ el.remove(); }, 14000);
}
setInterval(spawnParticle, 600);
document.addEventListener('mousemove', function(e) {
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('div');
    const size = Math.random()*3+1;
    const hue = Math.random()>0.5 ? '201,168,76' : '180,120,255';
    const dx = (Math.random()-0.5)*40;
    const dy = (Math.random()-0.5)*40;
    el.style.cssText = 'position:fixed;border-radius:50%;pointer-events:none;z-index:999;width:'+size+'px;height:'+size+'px;left:'+(e.clientX+dx)+'px;top:'+(e.clientY+dy)+'px;background:rgba('+hue+',.9);transition:all 0.8s ease;opacity:1;';
    document.body.appendChild(el);
    setTimeout(function(){ el.style.opacity='0'; el.style.transform='scale(0)'; }, 50);
    setTimeout(function(){ el.remove(); }, 900);
  }
});
