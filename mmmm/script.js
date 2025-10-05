// Crear pétalos
(function buildPetals(){
  const petalsContainer = document.getElementById('petals');
  const base = document.getElementById('petal-shape');
  const pathD = base.getAttribute('d');
  base.remove();

  const PETAL_COUNT = 10;
  for(let i=0;i<PETAL_COUNT;i++){
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    const angle = i * (360 / PETAL_COUNT);
    const flip = (i % 2 === 0) ? 1 : -1;
    g.setAttribute('transform', `rotate(${angle}) scale(${flip},1)`);

    const p = document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('d', pathD);
    p.setAttribute('class', 'petal');
    const delay = (Math.random()*1.2 - 0.6).toFixed(2);
    p.style.animationDelay = `${delay}s`;
    const dur = (3.2 + Math.random()*1.6).toFixed(2);
    p.style.animationDuration = `${dur}s`;
    g.appendChild(p);
    petalsContainer.appendChild(g);
  }
})();

// Efecto de escritura del mensaje
(function typingEffect(){
  const typedBubble = document.getElementById('typedBubble');
  const replayBtn = document.getElementById('replayBtn');
  const stopBtn = document.getElementById('stopBtn');
  const colorBtn = document.getElementById('colorBtn');

  let typingTimer = null;
  const message = "🌹 Te amo 🌹";
  let index = 0;
  let isTyping = false;

  function startTyping(){
    if(isTyping) return;
    isTyping = true;
    typedBubble.textContent = '';
    index = 0;

    const caret = document.createElement('span');
    caret.className = 'caret';
    typedBubble.appendChild(caret);

    typingTimer = setInterval(()=>{
      const caret = typedBubble.querySelector('.caret');
      if(caret) caret.remove();

      const nextChar = message.charAt(index);
      typedBubble.textContent += nextChar;
      typedBubble.appendChild(createCaret());
      index++;
      if(index >= message.length){
        clearInterval(typingTimer);
        isTyping = false;
        setTimeout(()=>{ const c = typedBubble.querySelector('.caret'); if(c) c.remove(); }, 900);
      }
    }, 140);
  }

  function createCaret(){
    const caret = document.createElement('span');
    caret.className = 'caret';
    return caret;
  }

  replayBtn.addEventListener('click', startTyping);
  window.addEventListener('load', ()=>{ setTimeout(startTyping, 650); });

  // Pausar/reanudar animación
  let paused = false;
  stopBtn.addEventListener('click', ()=>{
    const petals = document.querySelectorAll('.petal, .center, .stem');
    paused = !paused;
    petals.forEach(el => el.style.animationPlayState = paused ? 'paused' : 'running');
    stopBtn.textContent = paused ? 'Reanudar movimiento' : 'Pausar movimiento';
  });

  // Cambiar color de tema
  const themes = [
    { accent:'#ff2b4a', accentDark:'#c31f3b' },
    { accent:'#ff7fbf', accentDark:'#ff4f99' },
    { accent:'#ffb347', accentDark:'#ff8c1a' },
    { accent:'#8f5cff', accentDark:'#5e2ef0' }
  ];
  let themeIndex = 0;
  colorBtn.addEventListener('click', ()=>{
    themeIndex = (themeIndex + 1) % themes.length;
    const t = themes[themeIndex];
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--accent-dark', t.accentDark);
  });
})();
