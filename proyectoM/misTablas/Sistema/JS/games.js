/* ========================================================
   PLATAFORMA EDUCATIVA "MIS TABLAS"
   LÓGICA DE JUEGOS Y DESAFÍOS (games.js)
   8 Actividades Variadas y Dinámicas para 4° Básico
   ======================================================== */

const INSTRUCCIONES_JUEGOS = {
  memoria: {
    titulo: 'Memoria Matemática',
    icono: '🧠',
    texto: '¡Encuentra las parejas volteando las tarjetas! Una tarjeta muestra la multiplicación y otra su resultado correspondiente. Recuerda dónde está cada una.',
    voz: '¡Bienvenido a Memoria Matemática! Voltea dos tarjetas para encontrar las parejas: una tarjeta muestra la multiplicación y la otra su resultado. ¡Encuentra todas las parejas para ganar tus estrellas!'
  },
  atrapa: {
    titulo: 'Atrapa el Resultado',
    icono: '🎈',
    texto: 'En la parte superior verás una multiplicación. En el cielo flotarán burbujas con números. ¡Toca rápido la burbuja con el resultado correcto antes de que escape!',
    voz: '¡Atrapa el Resultado! Arriba verás una multiplicación. En el cielo flotarán burbujas con diferentes números. Toca rápidamente la burbuja que tenga el resultado correcto antes de que se escape.'
  },
  construye: {
    titulo: 'Construye la Multiplicación',
    icono: '🍎',
    texto: 'Representa la multiplicación con grupos reales. Usa los botones para agregar canastas y colocar la cantidad exacta de manzanas en cada una.',
    voz: '¡Construye la Multiplicación! Tu misión es representar la operación con objetos. Agrega las canastas necesarias y coloca la cantidad exacta de manzanas en cada una para formar los grupos correctos.'
  },
  quien: {
    titulo: '¿Quién Tiene la Respuesta?',
    icono: '🎭',
    texto: 'Observa a los personajes amigables. Cada uno sostiene un cartel con un número. Resuelve la multiplicación y toca al personaje que tenga la respuesta correcta.',
    voz: '¡¿Quién tiene la respuesta?! Lee la multiplicación con mucha atención. Varios personajes divertidos sostienen carteles con números. Toca al personaje que tenga la respuesta correcta.'
  },
  tiempo: {
    titulo: 'Desafío Contra el Tiempo',
    icono: '⏱️',
    texto: '¡Corre contra el reloj! Tienes 60 segundos antes de que la mecha se consuma y la dinamita explote. Responde multiplicaciones rápido para lograr combos de puntos.',
    voz: '¡Desafío contra el tiempo! Tienes sesenta segundos antes de que la mecha de la dinamita se consuma por completo. Escucha el tic tac del reloj y responde tantas multiplicaciones como puedas. ¡Rápido, antes de que explote la dinamita!'
  },
  arrastra: {
    titulo: 'Arrastra y Completa',
    icono: '🧩',
    texto: 'En la pantalla hay multiplicaciones esperando su resultado. Arrastra las fichas azules o tócalas para colocarlas en el espacio que le corresponda.',
    voz: '¡Arrastra y completa! En la pantalla hay multiplicaciones esperando su resultado. Arrastra las fichas azules o tócalas para colocarlas en la casilla que le corresponde.'
  },
  detective: {
    titulo: 'Detective Matemático',
    icono: '🕵️‍♂️',
    texto: '¡Un número misterioso ha dejado pistas! Lee con atención las 3 pistas secretas y usa tu lógica matemática para identificar al número sospechoso culpable.',
    voz: '¡Caso de Detective Matemático! El número secreto ha dejado huellas. Lee las tres pistas misteriosas y usa tu deducción para descubrir cuál de los sospechosos es el número correcto.'
  },
  mision: {
    titulo: 'Misión Especial Combinada',
    icono: '🚀',
    texto: 'Esta gran aventura cósmica combina varias tablas de multiplicar. Responde 3 desafíos consecutivos para conquistar el planeta y ganar tus recompensas.',
    voz: '¡Misión Cósmica Especial! Esta gran aventura combina varias tablas de multiplicar. Responde tres desafíos consecutivos para conquistar el planeta matemático y ganar tus estrellas.'
  }
};

const MisTablasGames = {
  juegoActivo: null,
  timerInterval: null,

  init() {
    this.renderCatalog();
  },

  renderCatalog() {
    const catalog = document.getElementById('gamesCatalogGrid');
    const arena = document.getElementById('activeGameArena');
    const banner = document.getElementById('gameInstructionBanner');
    if (!catalog || !arena) return;

    catalog.style.display = 'grid';
    arena.style.display = 'none';
    if (banner) banner.style.display = 'none';
  },

  abrirJuego(id) {
    this.juegoActivo = id;
    const catalog = document.getElementById('gamesCatalogGrid');
    const arena = document.getElementById('activeGameArena');
    const container = document.getElementById('gamePlaygroundContainer');
    const title = document.getElementById('activeGameTitle');
    const banner = document.getElementById('gameInstructionBanner');

    if (catalog) catalog.style.display = 'none';
    if (arena) arena.style.display = 'block';

    if (this.timerInterval) clearInterval(this.timerInterval);
    MisTablasAudio.stopSpeech();

    // Mostrar y configurar el banner con la voz y texto de instrucciones
    const info = INSTRUCCIONES_JUEGOS[id];
    if (banner && info) {
      banner.style.display = 'flex';
      banner.innerHTML = `
        <div class="instruction-text-content">
          <span class="instruction-icon-mascot">${info.icono}</span>
          <div class="instruction-text-box">
            <h4>Instrucciones: ${info.titulo}</h4>
            <p>${info.texto}</p>
          </div>
        </div>
        <button class="btn-speak-instruction" id="btnSpeakInstruction" title="Volver a escuchar las instrucciones">
          <span>🔊</span> <span>Escuchar Instrucciones</span>
        </button>
      `;

      const btnSpeak = document.getElementById('btnSpeakInstruction');
      if (btnSpeak) {
        btnSpeak.onclick = () => {
          btnSpeak.classList.add('speaking');
          MisTablasAudio.speakText(info.voz, () => {
            btnSpeak.classList.remove('speaking');
          });
        };
      }

      // Reproducir automáticamente la locución de instrucciones al entrar
      if (btnSpeak) btnSpeak.classList.add('speaking');
      MisTablasAudio.speakText(info.voz, () => {
        const b = document.getElementById('btnSpeakInstruction');
        if (b) b.classList.remove('speaking');
      });
    }

    switch(id) {
      case 'memoria':
        if (title) title.textContent = '🧠 Memoria Matemática';
        this.iniciarMemoria(container);
        break;
      case 'atrapa':
        if (title) title.textContent = '🎈 Atrapa el Resultado';
        this.iniciarAtrapa(container);
        break;
      case 'construye':
        if (title) title.textContent = '🍎 Construye la Multiplicación';
        this.iniciarConstruye(container);
        break;
      case 'quien':
        if (title) title.textContent = '🎭 ¿Quién Tiene la Respuesta?';
        this.iniciarQuien(container);
        break;
      case 'tiempo':
        if (title) title.textContent = '⏱️ Desafío Contra el Tiempo (60s)';
        this.iniciarTiempo(container);
        break;
      case 'arrastra':
        if (title) title.textContent = '🧩 Arrastra y Completa';
        this.iniciarArrastra(container);
        break;
      case 'detective':
        if (title) title.textContent = '🕵️‍♂️ Detective Matemático';
        this.iniciarDetective(container);
        break;
      case 'mision':
        if (title) title.textContent = '🚀 Misión Especial Combinada';
        this.iniciarMision(container);
        break;
    }
  },

  volverAlCatalogo() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    MisTablasAudio.stopSpeech();
    const catalog = document.getElementById('gamesCatalogGrid');
    const arena = document.getElementById('activeGameArena');
    const banner = document.getElementById('gameInstructionBanner');
    if (catalog) catalog.style.display = 'grid';
    if (arena) arena.style.display = 'none';
    if (banner) banner.style.display = 'none';
  },

  // ========================================================
  // 1. MEMORIA MATEMÁTICA (Memo-Test)
  // ========================================================
  iniciarMemoria(container) {
    const pares = [
      { id: 1, texto: '6 × 7', parId: 'res1' },
      { id: 2, texto: '42', parId: 'res1' },
      { id: 3, texto: '8 × 4', parId: 'res2' },
      { id: 4, texto: '32', parId: 'res2' },
      { id: 5, texto: '9 × 5', parId: 'res3' },
      { id: 6, texto: '45', parId: 'res3' },
      { id: 7, texto: '7 × 3', parId: 'res4' },
      { id: 8, texto: '21', parId: 'res4' },
      { id: 9, texto: '5 × 6', parId: 'res5' },
      { id: 10, texto: '30', parId: 'res5' },
      { id: 11, texto: '8 × 8', parId: 'res6' },
      { id: 12, texto: '64', parId: 'res6' }
    ];

    // Mezclar
    pares.sort(() => Math.random() - 0.5);

    let primeraCarta = null;
    let bloqueo = false;
    let aciertos = 0;

    container.innerHTML = `
      <div style="text-align:center; margin-bottom: 16px;">
        <p style="font-size:1.05rem; color:var(--text-muted); font-weight:700;">Encuentra las parejas volteando cada multiplicación con su resultado correcto.</p>
      </div>
      <div class="memory-grid" id="memoryCardsGrid"></div>
    `;

    const grid = document.getElementById('memoryCardsGrid');
    pares.forEach(item => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.innerHTML = `
        <div class="memory-inner">
          <div class="memory-back">❓</div>
          <div class="memory-front">${item.texto}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (bloqueo || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.classList.add('flipped');
        MisTablasAudio.playCardFlip();

        if (!primeraCarta) {
          primeraCarta = { el: card, data: item };
        } else {
          bloqueo = true;
          if (primeraCarta.data.parId === item.parId) {
            // Acierto
            setTimeout(() => {
              card.classList.add('matched');
              primeraCarta.el.classList.add('matched');
              MisTablasAudio.playSuccess();
              primeraCarta = null;
              bloqueo = false;
              aciertos++;

              if (aciertos === 6) {
                MisTablasAudio.playFanfare();
                MisTablasApp.triggerConfetti();
                MisTablasStorage.addRewards(5, 50);
                MisTablasApp.mostrarModalVictoria('¡Memoria Imparable!', '¡Encontraste todas las parejas matemáticas! Has ganado +5 Estrellas y +50 XP.');
              }
            }, 400);
          } else {
            // Fallo
            setTimeout(() => {
              card.classList.remove('flipped');
              primeraCarta.el.classList.remove('flipped');
              MisTablasAudio.playError();
              primeraCarta = null;
              bloqueo = false;
            }, 900);
          }
        }
      });

      grid.appendChild(card);
    });
  },

  // ========================================================
  // 2. ATRAPA EL RESULTADO (Burbujas en movimiento)
  // ========================================================
  iniciarAtrapa(container) {
    const preguntas = [
      { op: '9 × 4 = ?', correcta: 36, falsos: [32, 45, 27, 40] },
      { op: '7 × 8 = ?', correcta: 56, falsos: [54, 48, 64, 49] },
      { op: '6 × 6 = ?', correcta: 36, falsos: [30, 42, 38, 24] },
      { op: '8 × 3 = ?', correcta: 24, falsos: [21, 28, 18, 32] },
      { op: '5 × 9 = ?', correcta: 45, falsos: [40, 50, 35, 55] }
    ];

    let indice = 0;
    let puntajeLocal = 0;

    const renderPreguntaAtrapa = () => {
      if (indice >= preguntas.length) {
        MisTablasAudio.playFanfare();
        MisTablasApp.triggerConfetti();
        MisTablasStorage.addRewards(5, 40);
        MisTablasApp.mostrarModalVictoria('¡Atrapador Estrella!', `¡Terminaste la ronda atrapando las respuestas correctas! Sumas +5 Estrellas.`);
        return;
      }

      const q = preguntas[indice];
      const valores = [q.correcta, ...q.falsos].sort(() => Math.random() - 0.5);

      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 12px;">
          <div class="catch-target-prompt">${q.op}</div>
          <p style="font-weight: 700; color: var(--text-muted);">¡Toca rápido la burbuja con el resultado correcto!</p>
        </div>
        <div class="catch-sky-arena" id="skyArena"></div>
      `;

      const arena = document.getElementById('skyArena');
      valores.forEach((val, i) => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble-target';
        bubble.textContent = val;
        
        // Posiciones aleatorias en el cielo
        const leftPos = 10 + (i * 18);
        const topPos = 20 + Math.random() * 50;
        bubble.style.left = `${leftPos}%`;
        bubble.style.top = `${topPos}%`;
        bubble.style.animationDelay = `${i * 0.4}s`;

        bubble.addEventListener('click', () => {
          if (val === q.correcta) {
            MisTablasAudio.playPop();
            MisTablasAudio.playSuccess();
            bubble.style.transform = 'scale(1.5)';
            bubble.style.opacity = '0';
            puntajeLocal++;
            setTimeout(() => {
              indice++;
              renderPreguntaAtrapa();
            }, 300);
          } else {
            MisTablasAudio.playError();
            bubble.style.background = '#ef4444';
          }
        });

        arena.appendChild(bubble);
      });
    };

    renderPreguntaAtrapa();
  },

  // ========================================================
  // 3. CONSTRUYE LA MULTIPLICACIÓN (Agrupar objetos)
  // ========================================================
  iniciarConstruye(container) {
    const meta = { a: 4, b: 3, total: 12, itemIcon: '🍎', itemNombre: 'manzanas' };
    let grupos = 1;
    let itemsPorGrupo = 1;

    const actualizarVista = () => {
      const plateArea = document.getElementById('builderPlateArea');
      const feedback = document.getElementById('builderFeedback');
      if (!plateArea) return;

      plateArea.innerHTML = '';
      for (let g = 1; g <= grupos; g++) {
        const crate = document.createElement('div');
        crate.className = 'builder-crate';
        let itemsHtml = '';
        for (let i = 0; i < itemsPorGrupo; i++) {
          itemsHtml += `<span style="font-size:1.4rem;">${meta.itemIcon}</span>`;
        }
        crate.innerHTML = `
          <strong style="color:var(--orange); font-size:0.85rem; margin-bottom:6px;">Canasta ${g}</strong>
          <div class="builder-items-grid">${itemsHtml}</div>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-top:6px;">${itemsPorGrupo} objetos</span>
        `;
        plateArea.appendChild(crate);
      }

      const totalActual = grupos * itemsPorGrupo;
      document.getElementById('builderTotalText').textContent = `${grupos} canastas × ${itemsPorGrupo} ${meta.itemNombre} = ${totalActual} en total`;

      if (grupos === meta.a && itemsPorGrupo === meta.b) {
        feedback.innerHTML = `<span style="color:#15803d; font-weight:900;">🎉 ¡Exacto! Construiste perfectamente ${meta.a} grupos de ${meta.b} = ${meta.total} ${meta.itemNombre}!</span>`;
        MisTablasAudio.playSuccess();
        MisTablasApp.triggerConfetti();
        MisTablasStorage.addRewards(4, 30);
      } else {
        feedback.innerHTML = `<span style="color:var(--text-muted); font-weight:700;">Ajusta las canastas y manzanas para que sean <strong>${meta.a} canastas</strong> con <strong>${meta.b} manzanas</strong> cada una.</span>`;
      }
    };

    container.innerHTML = `
      <div class="builder-workshop">
        <p style="font-size:1.1rem; color:var(--text-main); font-weight:800;">
          Misión: Representa con tus manos la multiplicación:
        </p>
        <div class="builder-equation">${meta.a} × ${meta.b} = ?</div>
        
        <div class="builder-controls">
          <button class="btn-builder-action" id="btnAddGroup">➕ Agregar Canasta</button>
          <button class="btn-builder-action" id="btnRemoveGroup">➖ Quitar Canasta</button>
          <button class="btn-builder-action" id="btnAddItem">🍎 Poner Manzanas</button>
          <button class="btn-builder-action" id="btnRemoveItem">🍏 Quitar Manzanas</button>
        </div>

        <div class="builder-plate-area" id="builderPlateArea"></div>
        <div id="builderTotalText" style="font-size:1.25rem; font-weight:900; color:var(--primary);"></div>
        <div id="builderFeedback" style="font-size:1.05rem; min-height:30px;"></div>
      </div>
    `;

    document.getElementById('btnAddGroup').onclick = () => { if (grupos < 6) { grupos++; MisTablasAudio.playClick(); actualizarVista(); } };
    document.getElementById('btnRemoveGroup').onclick = () => { if (grupos > 1) { grupos--; MisTablasAudio.playClick(); actualizarVista(); } };
    document.getElementById('btnAddItem').onclick = () => { if (itemsPorGrupo < 6) { itemsPorGrupo++; MisTablasAudio.playClick(); actualizarVista(); } };
    document.getElementById('btnRemoveItem').onclick = () => { if (itemsPorGrupo > 1) { itemsPorGrupo--; MisTablasAudio.playClick(); actualizarVista(); } };

    actualizarVista();
  },

  // ========================================================
  // 4. ¿QUIÉN TIENE LA RESPUESTA?
  // ========================================================
  iniciarQuien(container) {
    const rondas = [
      {
        pregunta: '¿Cuánto es 8 × 6?',
        correcta: 48,
        personajes: [
          { nombre: 'Zorro Fox', icono: '🦊', valor: 42 },
          { nombre: 'Pingüino Pipo', icono: '🐧', valor: 48 },
          { nombre: 'Oso Barny', icono: '🐻', valor: 54 },
          { nombre: 'Robot Bip', icono: '🤖', valor: 46 }
        ]
      },
      {
        pregunta: '¿Cuánto es 7 × 7?',
        correcta: 49,
        personajes: [
          { nombre: 'Búho Sabio', icono: '🦉', valor: 49 },
          { nombre: 'Gatito Miau', icono: '🐱', valor: 42 },
          { nombre: 'León Leo', icono: '🦁', valor: 56 },
          { nombre: 'Dino Rex', icono: '🦖', valor: 47 }
        ]
      }
    ];

    let rIdx = 0;

    const renderRonda = () => {
      if (rIdx >= rondas.length) {
        MisTablasAudio.playFanfare();
        MisTablasApp.triggerConfetti();
        MisTablasStorage.addRewards(4, 35);
        MisTablasApp.mostrarModalVictoria('¡Gran Ojo!', '¡Identificaste al personaje con la respuesta correcta en cada ronda! Sumas +4 Estrellas.');
        return;
      }

      const r = rondas[rIdx];
      container.innerHTML = `
        <div class="who-stage">
          <p style="font-weight:700; color:var(--text-muted); margin-bottom:8px;">Observa a los personajes y selecciona a quien sostiene el cartel correcto:</p>
          <div class="who-question-box">${r.pregunta}</div>
          <div class="characters-lineup" id="charsLineup"></div>
          <div id="whoFeedback" style="margin-top:20px; font-weight:800; font-size:1.1rem; min-height:30px;"></div>
        </div>
      `;

      const lineup = document.getElementById('charsLineup');
      const feedback = document.getElementById('whoFeedback');

      r.personajes.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
          <div class="char-avatar-big">${ch.icono}</div>
          <div class="char-sign-board">${ch.valor}</div>
          <div class="char-name-label">${ch.nombre}</div>
        `;

        card.addEventListener('click', () => {
          if (ch.valor === r.correcta) {
            MisTablasAudio.playSuccess();
            card.style.borderColor = '#22c55e';
            card.style.background = '#dcfce7';
            feedback.innerHTML = `<span style="color:#15803d;">🎉 ¡Correcto! ${ch.nombre} tenía la respuesta exacta.</span>`;
            setTimeout(() => {
              rIdx++;
              renderRonda();
            }, 900);
          } else {
            MisTablasAudio.playError();
            card.style.borderColor = '#ef4444';
            feedback.innerHTML = `<span style="color:#dc2626;">¡Oh no! ${ch.nombre} tiene el número ${ch.valor}. ¡Busca el resultado correcto!</span>`;
          }
        });

        lineup.appendChild(card);
      });
    };

    renderRonda();
  },

  // ========================================================
  // 5. DESAFÍO CONTRA EL TIEMPO (Sprint 60s con Dinamita y Tic-Tac)
  // ========================================================
  iniciarTiempo(container) {
    let timeLeft = 60;
    let score = 0;
    let streak = 0;
    let isExploded = false;

    container.innerHTML = `
      <div class="speed-run-arena" id="speedRunArena">
        <!-- Barra de Dinamita con Mecha en Llamas -->
        <div class="dynamite-fuse-wrapper">
          <div class="dynamite-status-row">
            <div class="dynamite-title-badge">
              <span style="font-size:22px;">🧨</span>
              <span>MECHA DE DINAMITA EN LLAMAS</span>
            </div>
            <div class="clock-digital-box" id="clockDigitalBox">
              <span>⏱️</span> <span id="timerSecondsText">${timeLeft}s</span>
            </div>
          </div>
          <div class="dynamite-track-line">
            <div class="fuse-rope-track">
              <div class="fuse-rope-fill" id="fuseRopeFill" style="width: 100%;">
                <span class="fuse-spark" id="fuseSpark">🔥</span>
              </div>
            </div>
            <div class="dynamite-bundle" id="dynamiteBundle">
              <span>🧨</span> <span>TNT</span>
            </div>
          </div>
        </div>

        <div style="font-weight:800; color:var(--text-muted); margin-bottom:14px; font-size:1.05rem;">
          Puntaje: <span id="speedScore" style="color:var(--primary); font-size:1.4rem; font-weight:900;">0</span> | 
          Racha Combo: <span id="speedStreak" style="color:var(--secondary); font-size:1.4rem; font-weight:900;">x1</span>
        </div>

        <div class="speed-question" id="speedQuestionBox">? × ?</div>
        <div class="speed-options-grid" id="speedOptionsGrid"></div>
      </div>
    `;

    const arenaEl = document.getElementById('speedRunArena');
    const timerTextEl = document.getElementById('timerSecondsText');
    const clockBoxEl = document.getElementById('clockDigitalBox');
    const fuseFillEl = document.getElementById('fuseRopeFill');
    const dynamiteEl = document.getElementById('dynamiteBundle');
    const questionEl = document.getElementById('speedQuestionBox');
    const optionsGrid = document.getElementById('speedOptionsGrid');
    const scoreEl = document.getElementById('speedScore');
    const streakEl = document.getElementById('speedStreak');

    const nextProblem = () => {
      if (isExploded) return;
      const a = Math.floor(Math.random() * 9) + 2; // 2 al 10
      const b = Math.floor(Math.random() * 9) + 2;
      const ans = a * b;

      questionEl.textContent = `${a} × ${b}`;

      const options = [
        ans,
        ans + a,
        ans - b > 0 ? ans - b : ans + 4,
        ans + 10
      ].sort(() => Math.random() - 0.5);

      optionsGrid.innerHTML = '';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-speed-opt';
        btn.textContent = opt;
        btn.onclick = () => {
          if (isExploded) return;
          if (opt === ans) {
            MisTablasAudio.playSuccess();
            streak++;
            const multi = Math.min(4, Math.floor(streak / 2) + 1);
            score += 10 * multi;
            scoreEl.textContent = score;
            streakEl.textContent = `x${multi}`;
            nextProblem();
          } else {
            MisTablasAudio.playError();
            streak = 0;
            streakEl.textContent = 'x1';
            nextProblem();
          }
        };
        optionsGrid.appendChild(btn);
      });
    };

    nextProblem();

    // Bucle del temporizador de 60s con sonido Tic-Tac y explosión al llegar a 0
    this.timerInterval = setInterval(() => {
      timeLeft--;

      // Sonido de reloj Tic-Tac cada segundo (alternando tono)
      const isTac = (timeLeft % 2 === 0);
      MisTablasAudio.playTick(isTac);

      // Actualizar texto del reloj y porcentaje de la mecha
      if (timerTextEl) timerTextEl.textContent = `${timeLeft}s`;
      if (fuseFillEl) {
        const pct = Math.max(0, (timeLeft / 60) * 100);
        fuseFillEl.style.width = `${pct}%`;
      }

      // Alerta de peligro cuando quedan 10 segundos o menos
      if (timeLeft <= 10 && dynamiteEl) {
        dynamiteEl.classList.add('danger-panic');
        if (clockBoxEl) clockBoxEl.style.borderColor = '#dc2626';
      }

      // ¡Tiempo cumplido! La dinamita explota
      if (timeLeft <= 0) {
        clearInterval(this.timerInterval);
        isExploded = true;

        // Sonido de explosión BOOM
        MisTablasAudio.playExplosion();

        // Efecto visual de sacudida de pantalla
        if (arenaEl) {
          arenaEl.classList.add('screen-shake');
        }

        // Crear y mostrar overlay de explosión gigante
        if (arenaEl) {
          const blastOverlay = document.createElement('div');
          blastOverlay.className = 'dynamite-explosion-overlay';
          blastOverlay.id = 'dynamiteBlastOverlay';
          blastOverlay.innerHTML = `
            <div class="blast-emoji-giant">💥</div>
            <h2 class="blast-title">¡¡BOOOOM!!</h2>
            <p class="blast-subtitle">¡La dinamita explotó! Se acabó el tiempo de 60 segundos.</p>
            <div style="font-size: 2.5rem; margin-top: 12px;">🧨💨🔥</div>
          `;
          arenaEl.appendChild(blastOverlay);
        }

        // Después de la explosión, celebrar el puntaje obtenido
        setTimeout(() => {
          MisTablasAudio.playFanfare();
          MisTablasApp.triggerConfetti();
          const estrellasGanadas = Math.max(3, Math.floor(score / 50));
          MisTablasStorage.addRewards(estrellasGanadas, score);
          MisTablasApp.mostrarModalVictoria(
            '¡Desafío Explosivo Completado!',
            `¡Gran velocidad mental! Lograste ${score} puntos antes de que detonara la dinamita. Has ganado +${estrellasGanadas} Estrellas y +${score} XP.`
          );
        }, 1300);
      }
    }, 1000);
  },

  // ========================================================
  // 6. ARRASTRA Y COMPLETA (Drag and Drop táctil y ratón)
  // ========================================================
  iniciarArrastra(container) {
    const items = [
      { id: 'q1', op: '7 × 6 = ', ans: '42' },
      { id: 'q2', op: '8 × 5 = ', ans: '40' },
      { id: 'q3', op: '9 × 9 = ', ans: '81' },
      { id: 'q4', op: '6 × 4 = ', ans: '24' }
    ];

    container.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <p style="font-weight:700; color:var(--text-muted);">Arrastra o haz clic en las fichas azules para colocarlas en la operación que le corresponda:</p>
      </div>
      <div class="drag-drop-arena">
        <div class="drag-slots-column" id="dragSlotsCol"></div>
        <div class="drag-tiles-column" id="dragTilesCol"></div>
      </div>
      <div id="dragFeedback" style="text-align:center; margin-top:20px; font-weight:800; font-size:1.1rem;"></div>
    `;

    const slotsCol = document.getElementById('dragSlotsCol');
    const tilesCol = document.getElementById('dragTilesCol');
    let fichaSeleccionada = null;
    let completados = 0;

    // Slots
    items.forEach(item => {
      const slotRow = document.createElement('div');
      slotRow.className = 'drop-slot-row';
      slotRow.innerHTML = `
        <span>${item.op}</span>
        <div class="drop-target-box" data-id="${item.id}" data-ans="${item.ans}">❓</div>
      `;
      slotsCol.appendChild(slotRow);
    });

    // Tiles mezcladas
    const tilesShuffled = [...items].sort(() => Math.random() - 0.5);
    tilesShuffled.forEach(item => {
      const tile = document.createElement('div');
      tile.className = 'drag-tile';
      tile.textContent = item.ans;
      tile.draggable = true;

      // Soporte Drag and Drop HTML5
      tile.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.ans);
        fichaSeleccionada = item.ans;
      });

      // Soporte Click para pantallas táctiles y accesibilidad
      tile.addEventListener('click', () => {
        document.querySelectorAll('.drag-tile').forEach(t => t.style.borderColor = 'var(--primary)');
        tile.style.borderColor = 'var(--secondary)';
        fichaSeleccionada = item.ans;
        MisTablasAudio.playClick();
      });

      tilesCol.appendChild(tile);
    });

    // Configurar zonas de suelta (Dropzones)
    document.querySelectorAll('.drop-target-box').forEach(box => {
      box.addEventListener('dragover', (e) => {
        e.preventDefault();
        box.classList.add('drag-over');
      });

      box.addEventListener('dragleave', () => {
        box.classList.remove('drag-over');
      });

      const validarColocacion = (val) => {
        const esperado = box.getAttribute('data-ans');
        if (val === esperado) {
          box.textContent = val;
          box.style.background = '#dcfce7';
          box.style.borderColor = '#22c55e';
          box.style.color = '#15803d';
          MisTablasAudio.playSuccess();
          completados++;

          // Ocultar la ficha usada
          const usedTile = Array.from(document.querySelectorAll('.drag-tile')).find(t => t.textContent === val && t.style.display !== 'none');
          if (usedTile) usedTile.style.display = 'none';

          if (completados === items.length) {
            MisTablasAudio.playFanfare();
            MisTablasApp.triggerConfetti();
            MisTablasStorage.addRewards(4, 40);
            document.getElementById('dragFeedback').innerHTML = `<span style="color:#15803d;">🎉 ¡Brillante! Completaste todas las multiplicaciones correctamente.</span>`;
          }
        } else {
          MisTablasAudio.playError();
          box.classList.add('wrong');
          setTimeout(() => box.classList.remove('wrong'), 500);
        }
      };

      box.addEventListener('drop', (e) => {
        e.preventDefault();
        box.classList.remove('drag-over');
        const val = e.dataTransfer.getData('text/plain') || fichaSeleccionada;
        validarColocacion(val);
      });

      box.addEventListener('click', () => {
        if (fichaSeleccionada) {
          validarColocacion(fichaSeleccionada);
          fichaSeleccionada = null;
        }
      });
    });
  },

  // ========================================================
  // 7. DETECTIVE MATEMÁTICO (Pistas y deducción)
  // ========================================================
  iniciarDetective(container) {
    const casos = [
      {
        titulo: 'El Caso del Número Enigmático',
        pistas: [
          'Pertenezco a la tabla del 7.',
          'Soy mayor que 30 y menor que 50.',
          'La suma de mis dos dígitos es igual a 6 (Ejemplo: 4 + 2 = 6).'
        ],
        sospechosos: [35, 42, 49, 28],
        culpable: 42,
        explicacion: '¡7 × 6 = 42! Está entre 30 y 50, y 4 + 2 = 6.'
      },
      {
        titulo: 'El Caso del Pulpo Oculto',
        pistas: [
          'Pertenezco a la tabla del 8.',
          'Soy mayor que 50 y menor que 70.',
          'Termino en el dígito 4.'
        ],
        sospechosos: [56, 64, 48, 72],
        culpable: 64,
        explicacion: '¡8 × 8 = 64! Es mayor que 50, menor que 70 y termina en 4.'
      }
    ];

    let cIdx = 0;

    const renderCaso = () => {
      if (cIdx >= casos.length) {
        MisTablasAudio.playFanfare();
        MisTablasApp.triggerConfetti();
        MisTablasStorage.addRewards(5, 50);
        MisTablasStorage.unlockAchievement('detective');
        MisTablasApp.mostrarModalVictoria('¡Detective de Élite!', '¡Resolviste todos los acertijos matemáticos con éxito! Has ganado la medalla de Detective y +5 Estrellas.');
        return;
      }

      const caso = casos[cIdx];
      container.innerHTML = `
        <div class="detective-case-box">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:32px;">🕵️‍♂️</span>
            <h3 style="font-size:1.4rem;">${caso.titulo}</h3>
          </div>
          <div class="detective-clues-list">
            ${caso.pistas.map((p, i) => `<div class="clue-item">🔍 <span>Pista ${i + 1}: ${p}</span></div>`).join('')}
          </div>
          <p style="text-align:center; font-weight:800; font-size:1.1rem; color:#fde047;">
            ¿Quién es el número culpable?
          </p>
          <div class="detective-suspects-grid" id="suspectsGrid"></div>
          <div id="detectiveFeedback" style="margin-top:16px; text-align:center; font-weight:800; min-height:28px;"></div>
        </div>
      `;

      const grid = document.getElementById('suspectsGrid');
      const feedback = document.getElementById('detectiveFeedback');

      caso.sospechosos.forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'btn-suspect';
        btn.textContent = num;

        btn.onclick = () => {
          if (num === caso.culpable) {
            MisTablasAudio.playSuccess();
            feedback.innerHTML = `<span style="color:#4ade80;">🎉 ¡Caso cerrado! ${caso.explicacion}</span>`;
            setTimeout(() => {
              cIdx++;
              renderCaso();
            }, 1200);
          } else {
            MisTablasAudio.playError();
            feedback.innerHTML = `<span style="color:#f87171;">El número ${num} no cumple todas las pistas. ¡Vuelve a leerlas con atención!</span>`;
          }
        };

        grid.appendChild(btn);
      });
    };

    renderCaso();
  },

  // ========================================================
  // 8. MISIÓN ESPECIAL COMBINADA (Niveles desbloqueables)
  // ========================================================
  iniciarMision(container) {
    container.innerHTML = `
      <div style="text-align:center; max-width:650px; margin:0 auto;">
        <div style="font-size:55px; margin-bottom:10px;">🚀</div>
        <h3 style="font-size:1.6rem; font-weight:900; margin-bottom:10px; color:var(--text-main);">Gran Misión Cósmica de las Tablas</h3>
        <p style="color:var(--text-muted); font-size:1rem; line-height:1.5; margin-bottom:24px;">
          Esta misión especial combina multiplicaciones de las tablas del 2, 3, 4 y 5. Responde 3 preguntas consecutivas para conquistar el planeta matemático.
        </p>
        <div id="missionQuizArea" style="background:#f8fafc; border:2px solid #e2e8f0; border-radius:16px; padding:24px;"></div>
      </div>
    `;

    const quizArea = document.getElementById('missionQuizArea');
    const preguntasMision = [
      { q: '3 naves espaciales con 8 astronautas cada una. ¿Cuántos astronautas hay?', correcta: 24, opts: [21, 24, 28] },
      { q: '5 cohetes que viajan a 6 años luz cada uno. ¿Cuántos años luz recorren en total?', correcta: 30, opts: [25, 30, 35] },
      { q: '4 constelaciones de 7 estrellas cada una. ¿Cuántas estrellas suman?', correcta: 28, opts: [28, 32, 24] }
    ];

    let pIdx = 0;

    const renderPreguntaMision = () => {
      if (pIdx >= preguntasMision.length) {
        MisTablasAudio.playFanfare();
        MisTablasApp.triggerConfetti();
        MisTablasStorage.addRewards(6, 60);
        MisTablasStorage.unlockAchievement('mision_cosmica');
        MisTablasApp.mostrarModalVictoria('¡Planeta Conquistado!', '¡Completaste con éxito la Misión Combinada! Ganaste +6 Estrellas y +60 XP.');
        return;
      }

      const p = preguntasMision[pIdx];
      quizArea.innerHTML = `
        <div style="font-size:0.9rem; font-weight:800; color:var(--primary); margin-bottom:8px;">Desafío ${pIdx + 1} de 3</div>
        <div style="font-size:1.2rem; font-weight:800; color:var(--text-main); margin-bottom:18px;">${p.q}</div>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
          ${p.opts.map(opt => `<button class="btn-primary btn-mision-opt" style="font-size:1.2rem; padding:10px 24px;">${opt}</button>`).join('')}
        </div>
      `;

      quizArea.querySelectorAll('.btn-mision-opt').forEach(b => {
        b.onclick = () => {
          const val = parseInt(b.textContent);
          if (val === p.correcta) {
            MisTablasAudio.playSuccess();
            pIdx++;
            renderPreguntaMision();
          } else {
            MisTablasAudio.playError();
            b.style.background = '#ef4444';
          }
        };
      });
    };

    renderPreguntaMision();
  }
};
