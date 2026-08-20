import { SCRAPBOOK } from './scrapbook-content.js';

const $ = (id) => document.getElementById(id);
const book = $('book');
const prevBtn = $('prevBtn');
const nextBtn = $('nextBtn');
const homeBtn = $('homeBtn');
const helpBtn = $('helpBtn');
const helpModal = $('helpModal');
const photoModal = $('photoModal');
const photoModalImage = $('photoModalImage');
const photoModalTitle = $('photoModalTitle');
const photoModalCaption = $('photoModalCaption');
const photoModalKicker = $('photoModalKicker');
const pageKicker = $('pageKicker');
const pageTitle = $('pageTitle');
const dots = $('progressDots');

let current = Number(localStorage.getItem('yannieScrapbookPage') || 0);
if (!Number.isFinite(current) || current < 0 || current >= SCRAPBOOK.pages.length) current = 0;
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;

function esc(value='') {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function photoRow(photos=[]) {
  if (!photos.length) return '';
  return `<div class="polaroid-row">${photos.map((p,i)=>`
    <button class="polaroid" data-photo-src="${esc(p.src)}" data-photo-title="${esc(p.title)}" data-photo-caption="${esc(p.caption)}" aria-label="Open ${esc(p.title)}">
      <img src="${esc(p.src)}" alt="${esc(p.title)}" />
      <b>${esc(p.title)}</b>
    </button>`).join('')}</div>`;
}

function sharedHead(page) {
  return `
    <span class="tape a"></span><span class="doodle one">♡</span><span class="doodle two">✿</span>
    <p class="page-kicker">${esc(page.kicker)}</p>
    <p class="page-date">${esc(page.date)}</p>
    <h1>${esc(page.title)}</h1>
    ${page.heading ? `<h2>${esc(page.heading)}</h2>` : ''}
    ${page.body ? `<p class="lead">${esc(page.body)}</p>` : ''}
  `;
}

function renderPage(page) {
  const wrap = document.createElement('article');
  wrap.className = `page page-${page.type}`;
  wrap.dataset.pageId = page.id;
  let html = '<div class="page-content">';

  if (page.type === 'cover') {
    html += `
      <div class="cover-page">
        <div class="cover-book">
          <div class="cover-heart">♥</div>
          <p class="page-kicker" style="color:#f2cfcb">${esc(page.date)}</p>
          <h1>${esc(SCRAPBOOK.title)}</h1>
          <p>${esc(SCRAPBOOK.subtitle)}</p>
          <button class="cover-open" data-open-book>Open the scrapbook</button>
          <p class="cover-note hand">${esc(SCRAPBOOK.coverNote)}</p>
        </div>
      </div>`;
  }

  if (page.type === 'receipt') {
    html += sharedHead(page);
    html += `
      <div class="receipt-scene">
        <div class="receipt-envelope"></div>
        <div class="receipt-paper" data-receipt>
          <div class="receipt-head"><b>${esc(page.receipt.shop)}</b><small>01.03.2026</small></div>
          ${page.receipt.items.map(([a,b])=>`<div class="receipt-line"><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join('')}
          <div class="receipt-line receipt-total"><span>TOTAL</span><span>${esc(page.receipt.total)}</span></div>
          <p class="receipt-footer">${esc(page.receipt.footer)}</p>
        </div>
      </div>
      <p class="receipt-tap">tap the receipt ↑</p>
      ${photoRow(page.photos)}`;
  }

  if (page.type === 'stack') {
    html += sharedHead(page);
    html += `<div class="card-stack" data-stack>${page.cards.map((c,i)=>`
      <div class="stack-card" data-stack-card="${i}"><span class="stack-stamp">${esc(c.stamp)}</span><p>${esc(c.text)}</p></div>`).join('')}</div>
      <p class="stack-instruction">tap the top card to shuffle the memories</p>${photoRow(page.photos)}`;
  }

  if (page.type === 'flaps') {
    html += sharedHead(page);
    html += `<div class="flap-grid">${page.flaps.map(f=>`
      <div class="flap" data-flap><div class="flap-inner"><div class="flap-face flap-front">${esc(f.label)}</div><div class="flap-face flap-back">${esc(f.reveal)}</div></div></div>`).join('')}</div>${photoRow(page.photos)}`;
  }

  if (page.type === 'sticker') {
    html += sharedHead(page);
    html += `<div class="sticker-scene"><button class="big-sticker" data-sticker>${esc(page.stickerText)}</button><div class="secret-note hand">${esc(page.secret)}</div></div>${photoRow(page.photos)}`;
  }

  if (page.type === 'letter') {
    html += sharedHead(page);
    html += `<div class="letter-scene"><div class="letter-envelope"></div><div class="letter-paper" data-letter><span class="letter-stamp">♥<br>YM</span><div class="front"><p class="mini-kicker">TO: YANNIE</p><h2 class="hand">${esc(page.letter.front)}</h2><p>tap to pull the letter out</p></div><div class="inside"><p class="mini-kicker">DEAR YANNIE</p><p>${esc(page.letter.inside)}</p><p class="hand">— one of many little messages</p></div></div></div>${photoRow(page.photos)}`;
  }

  if (page.type === 'phone') {
    html += sharedHead(page);
    const [d,t,dur] = page.calls[0];
    html += `<div class="phone-wrap"><div class="phone" data-phone data-call-index="0"><div class="phone-screen"><div class="phone-notch"></div><div class="call-icon">☎</div><div class="call-name">Yannie ♥</div><div class="call-type" data-call-type>${esc(t)}</div><div class="call-date" data-call-date>${esc(d)}</div><div class="call-duration" data-call-duration>${esc(dur)}</div></div></div><p class="phone-tap">tap the phone to cycle actual call durations</p></div><div class="call-quote hand">${esc(page.quote)}</div>${photoRow(page.photos)}`;
  }

  if (page.type === 'torn') {
    html += sharedHead(page);
    html += `<div class="torn-zone" data-torn-zone><div class="torn-piece left" data-torn-piece="left"><p>${esc(page.left)}</p></div><div class="torn-piece right" data-torn-piece="right"><p>${esc(page.right)}</p></div><div class="join-message">${esc(page.joined)}</div></div><p class="stack-instruction">drag the two torn pieces toward the middle</p>`;
  }

  if (page.type === 'split') {
    html += sharedHead(page);
    html += `<div class="split-world" data-split>
      <div class="desk left"><h3>${esc(page.leftDesk.label)}</h3><ul>${page.leftDesk.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="connect-column"><div class="connect-line"></div><button class="connect-phone" data-connect aria-label="Connect the two sides">☎</button></div>
      <div class="desk right"><h3>${esc(page.rightDesk.label)}</h3><ul>${page.rightDesk.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
    </div><p class="connected-note">${esc(page.connected)}</p>`;
  }

  if (page.type === 'present') {
    html += sharedHead(page);
    html += `<div class="badge-cloud">${page.badges.map(x=>`<button type="button">${esc(x)}</button>`).join('')}</div>${photoRow(page.photos)}`;
  }

  if (page.type === 'future') {
    html += sharedHead(page);
    html += `<div class="future-slots">${page.emptySlots.map(x=>`<div class="future-slot">+ ${esc(x)} +</div>`).join('')}</div><div class="future-closing hand">${esc(page.closing)}</div>`;
  }

  html += '</div>';
  wrap.innerHTML = html;
  return wrap;
}

function buildBook() {
  SCRAPBOOK.pages.forEach((page,index)=>{
    const el = renderPage(page);
    book.appendChild(el);
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to page ${index+1}`);
    dot.addEventListener('click', ()=>goTo(index));
    dots.appendChild(dot);
  });
  bindInteractions();
  update();
}

function goTo(index) {
  const next = Math.max(0, Math.min(SCRAPBOOK.pages.length-1, index));
  if (next === current) return;
  current = next;
  localStorage.setItem('yannieScrapbookPage', String(current));
  update();
}

function update() {
  [...book.children].forEach((page,i)=>{
    page.classList.toggle('active', i===current);
    page.classList.toggle('prev', i<current);
    page.classList.toggle('next', i>current);
    if (i===current) page.scrollTop = 0;
  });
  [...dots.children].forEach((d,i)=>d.classList.toggle('active', i===current));
  const meta = SCRAPBOOK.pages[current];
  pageKicker.textContent = meta.kicker;
  pageTitle.textContent = meta.title;
  prevBtn.disabled = current===0;
  nextBtn.disabled = current===SCRAPBOOK.pages.length-1;
  const activeDot = dots.children[current];
  activeDot?.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
}

function openPhoto(btn) {
  photoModalImage.src = btn.dataset.photoSrc;
  photoModalTitle.textContent = btn.dataset.photoTitle || 'Memory';
  photoModalCaption.textContent = btn.dataset.photoCaption || '';
  photoModalKicker.textContent = 'FROM THE SCRAPBOOK';
  photoModal.classList.remove('hidden');
}

function bindInteractions() {
  book.querySelectorAll('[data-open-book]').forEach(btn=>btn.addEventListener('click',()=>goTo(1)));
  book.querySelectorAll('[data-photo-src]').forEach(btn=>btn.addEventListener('click',()=>openPhoto(btn)));
  book.querySelectorAll('[data-receipt]').forEach(el=>el.addEventListener('click',()=>el.classList.toggle('open')));
  book.querySelectorAll('[data-flap]').forEach(el=>el.addEventListener('click',()=>el.classList.toggle('open')));
  book.querySelectorAll('[data-sticker]').forEach(el=>el.addEventListener('click',()=>el.classList.toggle('revealed')));
  book.querySelectorAll('[data-letter]').forEach(el=>el.addEventListener('click',()=>el.classList.toggle('open')));

  book.querySelectorAll('[data-stack]').forEach(stack=>{
    const cards=[...stack.querySelectorAll('[data-stack-card]')];
    let top=cards.length-1;
    const reset=()=>cards.forEach(c=>c.classList.remove('hidden-card'));
    stack.addEventListener('click',()=>{
      cards[top]?.classList.add('hidden-card');
      top--;
      if(top<0){ setTimeout(reset,180); top=cards.length-1; }
    });
  });

  book.querySelectorAll('[data-phone]').forEach(phone=>{
    const pageId=phone.closest('.page').dataset.pageId;
    const data=SCRAPBOOK.pages.find(p=>p.id===pageId);
    phone.addEventListener('click',()=>{
      let idx=(Number(phone.dataset.callIndex)||0)+1;
      if(idx>=data.calls.length) idx=0;
      phone.dataset.callIndex=idx;
      const [date,type,duration]=data.calls[idx];
      phone.querySelector('[data-call-date]').textContent=date;
      phone.querySelector('[data-call-type]').textContent=type;
      phone.querySelector('[data-call-duration]').textContent=duration;
      phone.animate([{transform:'scale(1)'},{transform:'scale(.97)'},{transform:'scale(1)'}],{duration:260});
    });
  });

  book.querySelectorAll('[data-connect]').forEach(btn=>btn.addEventListener('click',()=>btn.closest('[data-split]').classList.toggle('connected')));
  book.querySelectorAll('.badge-cloud button').forEach(btn=>btn.addEventListener('click',()=>{ btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }));
  book.querySelectorAll('[data-torn-zone]').forEach(setupTornPuzzle);
}

function setupTornPuzzle(zone) {
  const pieces=[...zone.querySelectorAll('[data-torn-piece]')];
  const state={left:0,right:0};
  pieces.forEach(piece=>{
    let startX=0, base=0, active=false;
    const side=piece.dataset.tornPiece;
    const onDown=e=>{ active=true; startX=e.clientX; base=state[side]; piece.setPointerCapture?.(e.pointerId); };
    const onMove=e=>{
      if(!active || zone.classList.contains('joined')) return;
      const dx=e.clientX-startX;
      let v=base+dx;
      if(side==='left') v=Math.max(0,Math.min(80,v));
      else v=Math.min(0,Math.max(-80,v));
      state[side]=v;
      piece.style.translate=`${v}px 0`;
      if(state.left>48 && state.right<-48) {
        zone.classList.add('joined');
        pieces.forEach(p=>p.style.translate='0 0');
      }
    };
    const onUp=()=>{ active=false; };
    piece.addEventListener('pointerdown',onDown);
    piece.addEventListener('pointermove',onMove);
    piece.addEventListener('pointerup',onUp);
    piece.addEventListener('pointercancel',onUp);
  });
}

prevBtn.addEventListener('click',()=>goTo(current-1));
nextBtn.addEventListener('click',()=>goTo(current+1));
homeBtn.addEventListener('click',()=>goTo(0));
helpBtn.addEventListener('click',()=>helpModal.classList.remove('hidden'));
document.querySelectorAll('[data-close-modal]').forEach(x=>x.addEventListener('click',()=>helpModal.classList.add('hidden')));
document.querySelectorAll('[data-close-photo]').forEach(x=>x.addEventListener('click',()=>photoModal.classList.add('hidden')));

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft') goTo(current-1);
  if(e.key==='ArrowRight') goTo(current+1);
  if(e.key==='Escape'){ helpModal.classList.add('hidden'); photoModal.classList.add('hidden'); }
});

const stage=$('bookStage');
stage.addEventListener('touchstart',e=>{
  if(e.touches.length!==1) return;
  touchStartX=e.touches[0].clientX; touchStartY=e.touches[0].clientY; touchMoved=false;
},{passive:true});
stage.addEventListener('touchmove',e=>{
  if(e.touches.length!==1) return;
  const dx=Math.abs(e.touches[0].clientX-touchStartX);
  const dy=Math.abs(e.touches[0].clientY-touchStartY);
  if(dx>18 || dy>18) touchMoved=true;
},{passive:true});
stage.addEventListener('touchend',e=>{
  if(!touchMoved || !e.changedTouches.length) return;
  const dx=e.changedTouches[0].clientX-touchStartX;
  const dy=e.changedTouches[0].clientY-touchStartY;
  if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)*1.2) goTo(current+(dx<0?1:-1));
},{passive:true});

buildBook();
