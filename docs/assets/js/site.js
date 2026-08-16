
(() => {
 const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];
 const header=q('[data-header]'); let lastY=0;
 addEventListener('scroll',()=>{ if(header) header.classList.toggle('compact',scrollY>40); lastY=scrollY; },{passive:true});
 const toggle=q('[data-menu-toggle]'), menu=q('[data-menu]'); if(toggle&&menu){toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',open)})}
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12}):null; qa('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));
 qa('[data-magnify]').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}));
 qa('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{qa('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;qa('[data-cat]').forEach(card=>card.hidden=f!=='all'&&card.dataset.cat!==f)}));
 qa('[data-work-filter]').forEach(btn=>btn.addEventListener('click',()=>{qa('[data-work-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.workFilter;qa('[data-work]').forEach(card=>card.hidden=f!=='all'&&card.dataset.work!==f)}));
 const search=q('[data-knowledge-search]'); if(search) search.addEventListener('input',()=>{const v=search.value.toLowerCase().trim();qa('[data-search]').forEach(card=>card.hidden=v&&!card.dataset.search.toLowerCase().includes(v)&&!card.innerText.toLowerCase().includes(v))});
 qa('[data-tab]').forEach(tab=>tab.addEventListener('click',()=>{qa('[data-tab]').forEach(t=>t.classList.remove('active'));tab.classList.add('active');qa('[data-panel]').forEach(p=>p.hidden=p.dataset.panel!==tab.dataset.tab)}));
 qa('[data-login-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const note=q('.form-note',f);if(note)note.textContent='Client access is currently being provisioned. Use Contact to request access during this development phase.'}));
 const cookie=q('[data-cookie]'); if(cookie&&!localStorage.getItem('za-cookie-note')){cookie.hidden=false} const cd=q('[data-cookie-dismiss]'); if(cd)cd.addEventListener('click',()=>{localStorage.setItem('za-cookie-note','1');cookie.hidden=true});
})();

// Iteration 2: presentation-only micro-interactions.
(() => {
 const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];
 const lookCopy={
  marks:'A few stamped characters can reveal maker, material, place and date. The interesting part is often not the whole object. It is the clue hiding on it.',
  wear:'Wear is a record of contact. High points, protected recesses and repeated handling can tell you how an object lived long before it reached you.',
  edge:'On coins, the edge can preserve manufacturing clues that the faces do not. Milling, lettering, seams and damage all deserve attention.',
  context:'The same object can mean something entirely different once its documents, owner, location or historical setting are understood.'
 };
 qa('[data-look]').forEach(btn=>btn.addEventListener('click',()=>{
   qa('[data-look]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
   const target=q('[data-look-copy]'); if(!target)return;
   target.animate([{opacity:.25,transform:'translateY(3px)'},{opacity:1,transform:'none'}],{duration:240,easing:'ease-out'});
   target.textContent=lookCopy[btn.dataset.look]||lookCopy.marks;
 }));
 qa('[data-knowledge-topic]').forEach(btn=>btn.addEventListener('click',()=>{
   qa('[data-knowledge-topic]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
   const topic=btn.dataset.knowledgeTopic;
   qa('[data-topic]').forEach(card=>card.hidden=topic!=='all'&&card.dataset.topic!==topic);
 }));
})();

// Iteration 3: pointer-driven material lighting and page depth. Presentation only.
(() => {
  const heroes=[...document.querySelectorAll('.page-hero')];
  heroes.forEach(hero=>{
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect();
      hero.style.setProperty('--hero-x',(((e.clientX-r.left)/r.width)*100).toFixed(1)+'%');
      hero.style.setProperty('--hero-y',(((e.clientY-r.top)/r.height)*100).toFixed(1)+'%');
    },{passive:true});
  });
  const material=[...document.querySelectorAll('.magnify img,.discipline img,.field-feature img,.editorial-card img')];
  material.forEach(img=>{img.loading=img.loading||'lazy';img.decoding='async';});
})();

// Iteration 4: non-AI visual curiosity challenge.
(() => {
  const result=document.querySelector('[data-challenge-result]');
  document.querySelectorAll('[data-challenge]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!result)return;
    document.querySelectorAll('[data-challenge]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    result.classList.add('show');
    result.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:220,easing:'ease-out'});
  }));
})();
