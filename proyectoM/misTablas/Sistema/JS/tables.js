/* ========================================================
   PLATAFORMA EDUCATIVA "MIS TABLAS"
   MÓDULO DE APRENDIZAJE INTERACTIVO DE TABLAS (tables.js)
   Tablas del 2 al 10 con Grupos, Matriz, Recta Numérica y Patrones
   ======================================================== */

const TABLAS_INFO = {
  2: {
    nombre: 'Tabla del 2',
    color: '#0284c7',
    icono: '🍒',
    objetoNombre: 'cerezas',
    secreto: '¡El truco del Doble! Multiplicar por 2 es sumar dos veces el mismo número. Todos los resultados terminan en número par: 0, 2, 4, 6 u 8.',
    pista: 'Para 2 x 6, piensa: 6 + 6 = 12. ¡Siempre es sumar el mismo número dos veces!',
    desafio: { factor: 7, opciones: [12, 14, 16], correcta: 14 }
  },
  3: {
    nombre: 'Tabla del 3',
    color: '#7c3aed',
    icono: '⭐',
    objetoNombre: 'estrellas',
    secreto: '¡El salto del 3! Al sumar los dígitos de cualquier resultado de la tabla del 3, siempre te dará 3, 6 o 9 (Ejemplo: 3 × 8 = 24 -> 2 + 4 = 6).',
    pista: 'Multiplicar por 3 es sumar el doble más una vez más el número.',
    desafio: { factor: 6, opciones: [15, 18, 21], correcta: 18 }
  },
  4: {
    nombre: 'Tabla del 4',
    color: '#16a34a',
    icono: '🍀',
    objetoNombre: 'tréboles',
    secreto: '¡Doble del Doble! Si sabes la tabla del 2, ¡la del 4 es pan comido! Solo duplica el resultado de la tabla del 2 (Ejemplo: 4 × 5 = doble de 10 = 20).',
    pista: 'Para 4 x 7: 2 x 7 es 14, y el doble de 14 es 28.',
    desafio: { factor: 8, opciones: [32, 28, 36], correcta: 32 }
  },
  5: {
    nombre: 'Tabla del 5',
    color: '#ea580c',
    icono: '🍎',
    objetoNombre: 'manzanas',
    secreto: '¡Ritmo del 0 y 5! Todos los resultados de la tabla del 5 terminan exactamente en 0 (si multiplicas por par) o en 5 (si multiplicas por impar).',
    pista: 'Es la mitad de la tabla del 10: 5 x 6 = mitad de 60 = 30.',
    desafio: { factor: 9, opciones: [40, 45, 50], correcta: 45 }
  },
  6: {
    nombre: 'Tabla del 6',
    color: '#2563eb',
    icono: '🚀',
    objetoNombre: 'cohetes',
    secreto: '¡El Doble de la tabla del 3! Todos los resultados del 6 son números pares y también son el doble del resultado de la tabla del 3.',
    pista: 'Para 6 x 4: 3 x 4 = 12, y el doble de 12 es 24.',
    desafio: { factor: 7, opciones: [36, 42, 48], correcta: 42 }
  },
  7: {
    nombre: 'Tabla del 7',
    color: '#db2777',
    icono: '💎',
    objetoNombre: 'diamantes',
    secreto: '¡El Secreto de los Días de la Semana! Cada semana tiene 7 días. Si cuentas las semanas, ¡estás usando la tabla del 7! (Ejemplo: 4 semanas = 28 días).',
    pista: 'Puedes descomponer: 7 x 6 = (5 x 6) + (2 x 6) = 30 + 12 = 42.',
    desafio: { factor: 6, opciones: [40, 42, 48], correcta: 42 }
  },
  8: {
    nombre: 'Tabla del 8',
    color: '#9333ea',
    icono: '🐙',
    objetoNombre: 'pulpitos',
    secreto: '¡Triple Doble! Es el doble de la tabla del 4, y cuatro veces la del 2 (Ejemplo: 8 × 3 = doble de 12 = 24). ¡Y todos terminan en número par!',
    pista: 'Un pulpo tiene 8 tentáculos. ¡Cuenta tentáculos para no olvidar!',
    desafio: { factor: 7, opciones: [54, 56, 64], correcta: 56 }
  },
  9: {
    nombre: 'Tabla del 9',
    color: '#0d9488',
    icono: '🎈',
    objetoNombre: 'globos',
    secreto: '¡La Magia de la Suma 9! Los dos dígitos de cualquier resultado de la tabla del 9 siempre suman 9: 18 (1+8=9), 27 (2+7=9), 36 (3+6=9)... ¡hasta el 90!',
    pista: 'El dígito de las decenas siempre es 1 menos que el número multiplicado (Para 9 x 4, la decena es 3 y la unidad es 6 = 36).',
    desafio: { factor: 5, opciones: [45, 54, 35], correcta: 45 }
  },
  10: {
    nombre: 'Tabla del 10',
    color: '#e11d48',
    icono: '☀️',
    objetoNombre: 'soles',
    secreto: '¡El Poder del Cero! Multiplicar cualquier número por 10 es simplemente colocar un 0 al final de ese número. (Ejemplo: 7 × 10 = 70).',
    pista: 'Cada decena agrupa 10 unidades completas.',
    desafio: { factor: 8, opciones: [70, 80, 90], correcta: 80 }
  }
};

let tablaActual = 6;
let factorActual = 4;

const MisTablasLearning = {
  init() {
    this.renderSelectorTablas();
    this.seleccionarTabla(6);
  },

  renderSelectorTablas() {
    const container = document.getElementById('tablesGridSelector');
    if (!container) return;

    const profile = MisTablasStorage.getProfile();
    container.innerHTML = '';

    for (let t = 2; t <= 10; t++) {
      const info = TABLAS_INFO[t];
      const progreso = (profile.tablasProgreso && profile.tablasProgreso[t]) || 0;
      const esDominada = progreso >= 80;

      const btn = document.createElement('div');
      btn.className = `table-select-btn ${t === tablaActual ? 'active' : ''} ${esDominada ? 'mastered' : ''}`;
      btn.id = `btn-tabla-${t}`;
      btn.innerHTML = `
        <span class="table-number">${t}</span>
        <span style="font-size: 1.2rem;">${info.icono}</span>
        <span class="table-badge-status">${progreso}%</span>
      `;

      btn.addEventListener('click', () => {
        this.seleccionarTabla(t);
        if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playClick();
      });

      container.appendChild(btn);
    }
  },

  seleccionarTabla(numero) {
    tablaActual = numero;
    factorActual = 4; // Empezamos en un factor interactivo

    // Actualizar botones de selector
    document.querySelectorAll('.table-select-btn').forEach(b => b.classList.remove('active'));
    const btnActivo = document.getElementById(`btn-tabla-${numero}`);
    if (btnActivo) btnActivo.classList.add('active');

    this.renderContenidoTabla();
  },

  renderContenidoTabla() {
    const info = TABLAS_INFO[tablaActual];
    const profile = MisTablasStorage.getProfile();
    const progreso = (profile.tablasProgreso && profile.tablasProgreso[tablaActual]) || 0;

    // Encabezado
    const titleEl = document.getElementById('currentTableTitle');
    if (titleEl) {
      titleEl.innerHTML = `<span>${info.icono}</span> <h3>${info.nombre}</h3>`;
    }

    // Botón de voz para la pista
    const btnSpeak = document.getElementById('btnSpeakTip');
    if (btnSpeak) {
      btnSpeak.onclick = () => {
        MisTablasAudio.speakText(`${info.nombre}. ${info.secreto}. ${info.pista}`);
      };
    }

    // Cuadro de Secreto / Patrón
    const secretContent = document.getElementById('secretBoxContent');
    if (secretContent) {
      secretContent.innerHTML = `
        <h4>¡El Secreto de la Tabla del ${tablaActual}!</h4>
        <p>${info.secreto}</p>
        <p style="margin-top: 6px; font-weight: 700;">💡 Pista: ${info.pista}</p>
      `;
    }

    // Selector de factores (1 al 10)
    const factorsBar = document.getElementById('factorsSelectorBar');
    if (factorsBar) {
      factorsBar.innerHTML = '';
      for (let f = 1; f <= 10; f++) {
        const pill = document.createElement('div');
        pill.className = `factor-pill ${f === factorActual ? 'active' : ''}`;
        pill.textContent = `${tablaActual} × ${f}`;
        pill.addEventListener('click', () => {
          factorActual = f;
          document.querySelectorAll('.factor-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.renderVisualRepresentations();
          if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playClick();
        });
        factorsBar.appendChild(pill);
      }
    }

    this.renderVisualRepresentations();
    this.renderMicroDesafio();
  },

  renderVisualRepresentations() {
    const info = TABLAS_INFO[tablaActual];
    const resultado = tablaActual * factorActual;

    // 1. Grupos de Objetos
    const groupsContainer = document.getElementById('groupsContainer');
    if (groupsContainer) {
      groupsContainer.innerHTML = '';
      // Mostramos 'factorActual' grupos, cada uno con 'tablaActual' objetos
      for (let g = 1; g <= factorActual; g++) {
        const basket = document.createElement('div');
        basket.className = 'group-basket';
        
        let itemsHtml = '';
        for (let i = 0; i < tablaActual; i++) {
          itemsHtml += `<span class="fruit-item" title="${info.objetoNombre}">${info.icono}</span>`;
        }

        basket.innerHTML = `
          <span class="basket-label">Grupo ${g}</span>
          <div class="items-in-basket">${itemsHtml}</div>
          <span style="font-size: 0.72rem; font-weight: 800; color: #475569; margin-top: 2px;">${tablaActual} ${info.objetoNombre}</span>
        `;
        groupsContainer.appendChild(basket);
      }
    }

    // 2. Matriz Rectangular (Filas x Columnas)
    const matrixContainer = document.getElementById('matrixContainer');
    if (matrixContainer) {
      matrixContainer.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'grid-matrix';
      grid.style.gridTemplateColumns = `repeat(${tablaActual}, 22px)`;
      grid.style.gridTemplateRows = `repeat(${factorActual}, 22px)`;

      for (let r = 0; r < factorActual; r++) {
        for (let c = 0; c < tablaActual; c++) {
          const cell = document.createElement('div');
          cell.className = 'matrix-cell';
          cell.style.background = info.color;
          cell.title = `Fila ${r + 1}, Columna ${c + 1}`;
          grid.appendChild(cell);
        }
      }

      const caption = document.createElement('div');
      caption.className = 'matrix-caption';
      caption.innerHTML = `<strong>${factorActual} filas</strong> de <strong>${tablaActual} columnas</strong> = <strong>${resultado} casillas</strong>`;

      matrixContainer.appendChild(grid);
      matrixContainer.appendChild(caption);
    }

    // 3. Recta Numérica Interactiva
    const track = document.getElementById('numberLineTrack');
    if (track) {
      track.innerHTML = '';
      const totalSteps = 10;
      for (let s = 0; s <= totalSteps; s++) {
        const stepVal = s * tablaActual;
        const stepEl = document.createElement('div');
        stepEl.className = `number-step ${s === factorActual ? 'target-jump' : ''}`;
        
        let arcHtml = '';
        if (s > 0 && s <= factorActual) {
          arcHtml = `<div class="step-jump-arc" style="border-color: ${info.color};"></div>`;
        }

        stepEl.innerHTML = `
          ${arcHtml}
          <div class="step-marker"></div>
          <div class="step-number">${stepVal}</div>
        `;
        track.appendChild(stepEl);
      }
    }

    // 4. Suma Reiterada
    const repeatedBanner = document.getElementById('repeatedAdditionBanner');
    if (repeatedBanner) {
      const sumTerms = Array(factorActual).fill(tablaActual).join(' + ');
      repeatedBanner.innerHTML = `
        <span>${tablaActual} × ${factorActual} = ${sumTerms} = <strong>${resultado}</strong></span>
      `;
    }
  },

  renderMicroDesafio() {
    const info = TABLAS_INFO[tablaActual];
    const desafio = info.desafio;
    const container = document.getElementById('quickTestCard');
    if (!container) return;

    container.innerHTML = `
      <h4>🎯 Comprobación Rápida de la ${info.nombre}</h4>
      <p style="color: var(--text-muted); font-size: 0.95rem;">Demuestra lo que aprendiste para sumar estrellas:</p>
      <div class="test-question-display">${tablaActual} × ${desafio.factor} = ?</div>
      <div class="test-options-row" id="testOptionsRow"></div>
      <div class="test-feedback-box" id="testFeedbackBox"></div>
    `;

    const row = document.getElementById('testOptionsRow');
    const feedback = document.getElementById('testFeedbackBox');

    desafio.opciones.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-test-option';
      btn.textContent = opt;

      btn.addEventListener('click', () => {
        if (opt === desafio.correcta) {
          btn.classList.add('correct');
          feedback.style.display = 'block';
          feedback.style.color = '#15803d';
          feedback.innerHTML = `🎉 ¡Excelente trabajo! ${tablaActual} × ${desafio.factor} = ${desafio.correcta}. ¡Has ganado +15 Puntos y +2 Estrellas!`;
          
          if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playSuccess();
          if (typeof MisTablasApp !== 'undefined') MisTablasApp.triggerConfetti();

          // Guardar progreso
          MisTablasStorage.updateTableProgress(tablaActual, 20);
          MisTablasStorage.addRewards(2, 15);
          MisTablasApp.updateHeaderStats();
          MisTablasLearning.renderSelectorTablas();
        } else {
          btn.classList.add('wrong');
          feedback.style.display = 'block';
          feedback.style.color = '#b91c1c';
          feedback.innerHTML = `Intenta de nuevo: recuerda que ${tablaActual} × ${desafio.factor} es sumar ${desafio.factor} veces el número ${tablaActual}. ¡Tú puedes!`;
          if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playError();
        }
      });

      row.appendChild(btn);
    });
  }
};
