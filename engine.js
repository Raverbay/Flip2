
(async function(){
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const cfg=await fetch('content.json').then(r=>r.json());
  const root=document.documentElement;
  const site=cfg.site;

  root.style.setProperty('--accent',site.accent||'#b8ff38');
  root.style.setProperty('--bg',site.background||'#f4f2ec');
  root.style.setProperty('--paper',site.background||'#f4f2ec');
  root.style.setProperty('--ink',site.ink||'#11120f');
  document.title=`${site.brandName} — ${site.tagline}`;

  const set=(id,v)=>{const e=$(id);if(e)e.textContent=v||''};
  const setHTML=(id,v)=>{const e=$(id);if(e)e.innerHTML=v||''};
  const asset=n=>n?`assets/${n}`:'';

  $('#navLogo').src=asset(cfg.hero.logo);
  $('#heroLogo').src=asset(cfg.hero.logo);
  $('#footerLogo').src=asset(cfg.hero.logo);
  $('#heroImage').src=asset(cfg.hero.image);
  $('#heroImage').alt=site.brandName;
  set('#heroKicker',cfg.hero.kicker);
  set('#heroMeta',cfg.hero.meta);
  setHTML('#heroHeadline',cfg.hero.headline.map(x=>`<span>${x}</span>`).join(''));
  set('#introTitle',site.introTitle);
  set('#introLead',site.introLead);
  set('#introBody',site.introBody);

  set('#editorialKicker',cfg.editorial.kicker);
  setHTML('#editorialTitle',cfg.editorial.title.map(x=>`${x}<br>`).join(''));
  $('#editorialLarge').src=asset(cfg.editorial.large);
  $('#editorialSmall').src=asset(cfg.editorial.small);

  const cg=$('#collectionGrid');
  cfg.collections.forEach((c,i)=>{
    const a=document.createElement('a');
    a.className='collection-card reveal';
    a.style.setProperty('--i',i);
    a.href='#store';
    a.innerHTML=`<img src="${asset(c.image)}" alt="${c.name}"><div class="collection-info"><div><span class="micro">${c.label}</span><h3>${c.name}</h3></div><span class="micro">DISCOVER ↗</span></div>`;
    cg.appendChild(a);
  });

  const bg=$('#brandGrid');
  cfg.brands.forEach((b,i)=>{
    const d=document.createElement('div');
    d.className='brand-item';
    d.style.setProperty('--i',i%16);
    d.textContent=b;
    bg.appendChild(d);
  });

  set('#storyKicker',cfg.story.kicker);
  setHTML('#storyTitle',cfg.story.title.map(x=>`${x}<br>`).join(''));
  set('#storyBody',cfg.story.body);
  $('#storyImage').src=asset(cfg.story.image);

  set('#storeKicker',cfg.store.kicker);
  setHTML('#storeTitle',cfg.store.title.map(x=>`${x}<br>`).join(''));
  $('#storeImage').src=asset(cfg.store.image);
  set('#storeAddress',cfg.store.address);
  set('#storeHours',cfg.store.hours);
  set('#storePhone',cfg.store.phone);
  $('#mapLink').href=cfg.store.maps;
  $('#waLink').href=`https://wa.me/${cfg.store.whatsapp}`;
  $('#menuLocation').textContent=cfg.store.address;
  $('#menuWhatsapp').href=`https://wa.me/${cfg.store.whatsapp}`;

  set('#rating',cfg.reviews.rating);
  set('#reviewCount',cfg.reviews.count);
  set('#reviewTitle',cfg.reviews.title);
  set('#reviewBody',cfg.reviews.body);

  setHTML('#contactTitle',cfg.contact.title.map(x=>`${x}<br>`).join(''));
  set('#contactMeta',`${site.brandName} · ${cfg.store.address}`);
  $('#instagramLink').href=cfg.contact.instagram;
  $('#contactWa').href=`https://wa.me/${cfg.contact.whatsapp}`;

  const navItems=[['EDITORIAL','#editorial'],['COLLECTIONS','#collections'],['BRANDS','#brands'],['STORY','#story'],['STORE','#store'],['CONTACT','#contact']];
  ['desktopNav','mobileNav'].forEach(id=>{
    const n=$('#'+id);
    navItems.forEach(([label,href])=>{const a=document.createElement('a');a.href=href;a.textContent=label;n.appendChild(a)});
  });

  // language UI: the theme supports alternate strings in data attributes where supplied.
  $$('.language button').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.language button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const lang=btn.textContent.trim().toLowerCase();
    $$('[data-it][data-en]').forEach(el=>el.innerHTML=el.getAttribute('data-'+lang).replace(/\n/g,'<br>'));
  }));

  const menuButton=$('#menuButton'), panel=$('#menuPanel');
  menuButton.addEventListener('click',()=>{panel.classList.toggle('open');document.body.classList.toggle('lock');panel.setAttribute('aria-hidden',String(!panel.classList.contains('open')))});
  $$('#menuPanel a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');document.body.classList.remove('lock')}));

  // Intersection reveals.
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}})
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  $$('.reveal,.heading-reveal,.stagger').forEach(e=>observer.observe(e));
  $$('.collection-card').forEach(e=>observer.observe(e));

  // Scroll progress + subtle image movement.
  let ticking=false;
  const update=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    $('.progress span').style.width=(max>0?(scrollY/max)*100:0)+'%';
    $$('.parallax img').forEach(img=>{
      const r=img.parentElement.getBoundingClientRect(), delta=(innerHeight/2-(r.top+r.height/2))*0.035;
      img.style.setProperty('--py',Math.max(-18,Math.min(18,delta))+'px');
    });
    ticking=false;
  };
  const onScroll=()=>{if(!ticking){requestAnimationFrame(update);ticking=true}};
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
  update();

  setTimeout(()=>document.body.classList.add('loaded'),1050);
})();
