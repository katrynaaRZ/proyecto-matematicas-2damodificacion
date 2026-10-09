/* ========================================================
   PLATAFORMA EDUCATIVA "MIS TABLAS"
   MÓDULO DE ENSAYO MATEMÁTICO TIPO SIMCE 4° BÁSICO (simce.js)
   10 Preguntas Contextualizadas con Retroalimentación Pedagógica
   ======================================================== */

const SIMCE_PREGUNTAS = [
  {
    id: 1,
    contexto: 'Compras en el Kiosco Escolar',
    icono: '🥪',
    enunciado: 'En el recreo del colegio, Lucas compró 6 sobres de láminas para completar su álbum. Si cada sobre costó $90, ¿cuánto dinero pagó Lucas en total?',
    art: '🏪',
    artDesc: '6 sobres a $90 cada uno',
    opciones: [
      { letra: 'A', texto: '$480', valor: 480 },
      { letra: 'B', texto: '$540', valor: 540 },
      { letra: 'C', texto: '$630', valor: 630 },
      { letra: 'D', texto: '$560', valor: 560 }
    ],
    correcta: 540,
    explicacion: 'Para saber el total que pagó Lucas, multiplicamos la cantidad de sobres (6) por el valor de cada uno ($90): 6 × 90 = 540. Por lo tanto, Lucas pagó $540 en total.'
  },
  {
    id: 2,
    contexto: 'Organización en el Acto del Colegio',
    icono: '🏫',
    enunciado: 'Para el acto de Fiestas Patrias en el patio, el profesor de educación física organizó a los estudiantes de 4° básico en 5 filas con 8 estudiantes en cada una. ¿Cuántos estudiantes hay en total en el acto?',
    art: '🚶‍♂️',
    artDesc: '5 filas de 8 estudiantes',
    opciones: [
      { letra: 'A', texto: '35 estudiantes', valor: 35 },
      { letra: 'B', texto: '40 estudiantes', valor: 40 },
      { letra: 'C', texto: '48 estudiantes', valor: 48 },
      { letra: 'D', texto: '56 estudiantes', valor: 56 }
    ],
    correcta: 40,
    explicacion: 'Organizar en filas y columnas es una multiplicación directa: 5 filas × 8 estudiantes = 40 estudiantes en total en el patio.'
  },
  {
    id: 3,
    contexto: 'Cajas de Materiales en Arte',
    icono: '🎨',
    enunciado: 'La profesora de artes visuales tiene 7 cajas organizadoras en la sala. En cada caja guardó exactamente 9 témperas de colores. ¿Cuántas témperas tiene en total la profesora?',
    art: '📦',
    artDesc: '7 cajas con 9 témperas cada una',
    opciones: [
      { letra: 'A', texto: '56 témperas', valor: 56 },
      { letra: 'B', texto: '63 témperas', valor: 63 },
      { letra: 'C', texto: '72 témperas', valor: 72 },
      { letra: 'D', texto: '81 témperas', valor: 81 }
    ],
    correcta: 63,
    explicacion: 'Multiplicamos el número de cajas (7) por las témperas por caja (9): 7 × 9 = 63 témperas en total.'
  },
  {
    id: 4,
    contexto: 'Distribución de Colación Saludable',
    icono: '🍎',
    enunciado: 'Para la colación saludable de la semana, la tía encargada repartió 8 bolsas con 6 manzanas en cada una entre las salas de clases. ¿Cuántas manzanas se repartieron en total?',
    art: '🧺',
    artDesc: '8 bolsas con 6 manzanas cada una',
    opciones: [
      { letra: 'A', texto: '42 manzanas', valor: 42 },
      { letra: 'B', texto: '48 manzanas', valor: 48 },
      { letra: 'C', texto: '54 manzanas', valor: 54 },
      { letra: 'D', texto: '56 manzanas', valor: 56 }
    ],
    correcta: 48,
    explicacion: 'Se multiplica la cantidad de bolsas por las manzanas de cada bolsa: 8 × 6 = 48 manzanas repartidas.'
  },
  {
    id: 5,
    contexto: 'Puntajes en un Juego de Mesa',
    icono: '🎲',
    enunciado: 'En un campeonato de juegos de mesa en la escuela, Sofía reunió 9 tarjetas doradas de recompensa. Si cada tarjeta dorada otorga 7 puntos, ¿cuántos puntos acumuló Sofía en total?',
    art: '🃏',
    artDesc: '9 tarjetas que valen 7 puntos c/u',
    opciones: [
      { letra: 'A', texto: '56 puntos', valor: 56 },
      { letra: 'B', texto: '63 puntos', valor: 63 },
      { letra: 'C', texto: '70 puntos', valor: 70 },
      { letra: 'D', texto: '72 puntos', valor: 72 }
    ],
    correcta: 63,
    explicacion: 'Sofía tiene 9 tarjetas de 7 puntos cada una: 9 × 7 = 63 puntos acumulados.'
  },
  {
    id: 6,
    contexto: 'Ahorro Semanal de Monedas',
    icono: '🪙',
    enunciado: 'Martín decidió guardar monedas en su alcancía durante una semana de lunes a sábado (6 días). Si cada día guardó 8 monedas, ¿cuántas monedas juntó Martín en total?',
    art: '🐖',
    artDesc: '6 días guardando 8 monedas diarias',
    opciones: [
      { letra: 'A', texto: '40 monedas', valor: 40 },
      { letra: 'B', texto: '48 monedas', valor: 48 },
      { letra: 'C', texto: '54 monedas', valor: 54 },
      { letra: 'D', texto: '64 monedas', valor: 64 }
    ],
    correcta: 48,
    explicacion: 'Calculamos los 6 días multiplicado por las 8 monedas ahorradas cada día: 6 × 8 = 48 monedas en total.'
  },
  {
    id: 7,
    contexto: 'Organización de la Biblioteca Escolar',
    icono: '📚',
    enunciado: 'En la biblioteca de la escuela hay una repisa especial con 6 estantes. Si el bibliotecario ordenó exactamente 8 libros de cuentos en cada estante, ¿cuántos libros de cuentos hay en la repisa?',
    art: '📖',
    artDesc: '6 estantes con 8 libros cada uno',
    opciones: [
      { letra: 'A', texto: '42 libros', valor: 42 },
      { letra: 'B', texto: '46 libros', valor: 46 },
      { letra: 'C', texto: '48 libros', valor: 48 },
      { letra: 'D', texto: '54 libros', valor: 54 }
    ],
    correcta: 48,
    explicacion: 'Multiplicamos el número de estantes (6) por los libros en cada uno (8): 6 × 8 = 48 libros de cuentos en total.'
  },
  {
    id: 8,
    contexto: 'Plantando en el Huerto Escolar',
    icono: '🌱',
    enunciado: 'En el taller de ciencias, los estudiantes sembraron 4 hileras con 7 plantas de lechuga en cada hilera. ¿Cuántas plantas de lechuga sembraron en total en el huerto?',
    art: '🥬',
    artDesc: '4 hileras con 7 lechugas en cada una',
    opciones: [
      { letra: 'A', texto: '24 plantas', valor: 24 },
      { letra: 'B', texto: '28 plantas', valor: 28 },
      { letra: 'C', texto: '32 plantas', valor: 32 },
      { letra: 'D', texto: '35 plantas', valor: 35 }
    ],
    correcta: 28,
    explicacion: 'Multiplicamos las 4 hileras por las 7 plantas de cada hilera: 4 × 7 = 28 plantas de lechuga.'
  },
  {
    id: 9,
    contexto: 'Autitos de Colección',
    icono: '🚗',
    enunciado: 'Vicente guarda su valiosa colección de autitos de carrera en 8 cajas transparentes. Si en cada caja guarda exactamente 5 autitos, ¿cuántos autitos tiene en total en su colección?',
    art: '🏎️',
    artDesc: '8 cajas con 5 autitos cada una',
    opciones: [
      { letra: 'A', texto: '35 autitos', valor: 35 },
      { letra: 'B', texto: '40 autitos', valor: 40 },
      { letra: 'C', texto: '45 autitos', valor: 45 },
      { letra: 'D', texto: '50 autitos', valor: 50 }
    ],
    correcta: 40,
    explicacion: 'Multiplicamos 8 cajas por 5 autitos en cada una: 8 × 5 = 40 autitos de carrera.'
  },
  {
    id: 10,
    contexto: 'Bolsitas de Sorpresa de Cumpleaños',
    icono: '🎁',
    enunciado: 'Para el cumpleaños de su hermana, Camila preparó 9 bolsitas de sorpresas. Si en cada bolsita puso 4 juguetitos pequeños, ¿cuántos juguetitos utilizó Camila en total?',
    art: '🎉',
    artDesc: '9 bolsitas con 4 juguetitos cada una',
    opciones: [
      { letra: 'A', texto: '32 juguetitos', valor: 32 },
      { letra: 'B', texto: '36 juguetitos', valor: 36 },
      { letra: 'C', texto: '40 juguetitos', valor: 40 },
      { letra: 'D', texto: '45 juguetitos', valor: 45 }
    ],
    correcta: 36,
    explicacion: 'Multiplicamos la cantidad de bolsas de sorpresa (9) por los juguetitos de cada bolsa (4): 9 × 4 = 36 juguetitos en total.'
  }
];

const MisTablasSimce = {
  preguntaActualIndex: 0,
  respuestasEstudiante: {}, // { 0: valor, 1: valor, ... }

  init() {
    this.preguntaActualIndex = 0;
    this.respuestasEstudiante = {};
    this.renderSidebarPreguntas();
    this.renderPreguntaActual();
    this.actualizarProgreso();
  },

  renderSidebarPreguntas() {
    const grid = document.getElementById('simceQuestionsNavGrid');
    if (!grid) return;

    grid.innerHTML = '';
    SIMCE_PREGUNTAS.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = `btn-q-nav ${idx === this.preguntaActualIndex ? 'active' : ''} ${this.respuestasEstudiante[idx] !== undefined ? 'answered' : ''}`;
      btn.id = `btn-q-nav-${idx}`;
      btn.innerHTML = `<span>P${idx + 1}</span>`;

      btn.addEventListener('click', () => {
        this.irAPregunta(idx);
        if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playClick();
      });

      grid.appendChild(btn);
    });

    const btnFinish = document.getElementById('btnFinishSimce');
    if (btnFinish) {
      btnFinish.onclick = () => this.confirmarFinalizar();
    }
  },

  irAPregunta(index) {
    this.preguntaActualIndex = index;
    
    // Actualizar estados visuales del sidebar
    document.querySelectorAll('.btn-q-nav').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
      btn.classList.toggle('answered', this.respuestasEstudiante[idx] !== undefined);
    });

    this.renderPreguntaActual();
  },

  renderPreguntaActual() {
    const q = SIMCE_PREGUNTAS[this.preguntaActualIndex];
    const container = document.getElementById('simceMainContent');
    if (!container) return;

    const respuestaGuardada = this.respuestasEstudiante[this.preguntaActualIndex];

    container.innerHTML = `
      <div class="question-context-box">
        <span class="question-number-badge">Pregunta ${this.preguntaActualIndex + 1} de 10 • ${q.contexto}</span>
        <h4 class="question-prompt">${q.enunciado}</h4>
        
        <div class="question-visual-illustration">
          <div class="visual-art-box">${q.art}</div>
          <div class="visual-art-caption">
            <strong>Situación ilustrada:</strong> ${q.artDesc}
          </div>
        </div>
      </div>

      <div class="options-list" id="simceOptionsList">
        ${q.opciones.map(opt => `
          <button class="option-row-btn ${respuestaGuardada === opt.valor ? 'selected' : ''}" data-val="${opt.valor}">
            <span class="option-letter-badge">${opt.letra}</span>
            <span class="option-text">${opt.texto}</span>
          </button>
        `).join('')}
      </div>

      <div class="question-nav-footer">
        <button class="btn-nav-arrow" id="btnPrevQ" ${this.preguntaActualIndex === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          ← Anterior
        </button>
        <span style="font-size:0.9rem; font-weight:800; color:var(--text-muted);">Pregunta ${this.preguntaActualIndex + 1} / 10</span>
        <button class="btn-nav-arrow" id="btnNextQ" ${this.preguntaActualIndex === 9 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          Siguiente →
        </button>
      </div>
    `;

    // Selección de alternativas
    container.querySelectorAll('.option-row-btn').forEach(btn => {
      btn.onclick = () => {
        const val = parseInt(btn.getAttribute('data-val'));
        this.respuestasEstudiante[this.preguntaActualIndex] = val;
        
        container.querySelectorAll('.option-row-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playClick();
        
        this.actualizarProgreso();
        this.renderSidebarPreguntas();
      };
    });

    // Botones anterior y siguiente
    const btnPrev = document.getElementById('btnPrevQ');
    const btnNext = document.getElementById('btnNextQ');

    if (btnPrev && this.preguntaActualIndex > 0) {
      btnPrev.onclick = () => this.irAPregunta(this.preguntaActualIndex - 1);
    }
    if (btnNext && this.preguntaActualIndex < SIMCE_PREGUNTAS.length - 1) {
      btnNext.onclick = () => this.irAPregunta(this.preguntaActualIndex + 1);
    }
  },

  actualizarProgreso() {
    const total = SIMCE_PREGUNTAS.length;
    const respondidas = Object.keys(this.respuestasEstudiante).length;
    const pct = Math.round((respondidas / total) * 100);

    const txt = document.getElementById('simceProgressText');
    const fill = document.getElementById('simceProgressFill');

    if (txt) txt.textContent = `${respondidas} de ${total} respondidas`;
    if (fill) fill.style.width = `${pct}%`;
  },

  confirmarFinalizar() {
    const total = SIMCE_PREGUNTAS.length;
    const respondidas = Object.keys(this.respuestasEstudiante).length;

    if (respondidas < total) {
      const faltan = total - respondidas;
      const resp = confirm(`Aún te faltan ${faltan} preguntas por responder. ¿Estás seguro de que deseas finalizar el ensayo ahora?`);
      if (!resp) return;
    }

    this.mostrarResultados();
  },

  mostrarResultados() {
    let correctas = 0;
    const total = SIMCE_PREGUNTAS.length;

    SIMCE_PREGUNTAS.forEach((q, idx) => {
      if (this.respuestasEstudiante[idx] === q.correcta) {
        correctas++;
      }
    });

    const porcentaje = Math.round((correctas / total) * 100);
    
    // Nivel SIMCE Oficial
    let nivelSimce = 'Nivel Adecuado';
    let claseTier = 'simce-tier-adecuado';
    let mensajeTier = '¡Extraordinario dominio! Comprendes y aplicas las tablas de multiplicar en problemas de la vida cotidiana con gran precisión.';

    if (porcentaje < 60) {
      nivelSimce = 'Nivel Inicial';
      claseTier = 'simce-tier-inicial';
      mensajeTier = '¡Buen esfuerzo! Te recomendamos seguir practicando los módulos interactivos de grupos y patrones para consolidar tus respuestas.';
    } else if (porcentaje < 80) {
      nivelSimce = 'Nivel Elemental';
      claseTier = 'simce-tier-elemental';
      mensajeTier = '¡Muy buen trabajo! Tienes las bases firmes y estás a pocos pasos de alcanzar el nivel de excelencia máxima.';
    }

    // Guardar en Storage
    MisTablasStorage.saveSimceResult(correctas, total, this.respuestasEstudiante);
    if (typeof MisTablasApp !== 'undefined') {
      MisTablasApp.updateHeaderStats();
      MisTablasApp.triggerConfetti();
    }
    if (typeof MisTablasAudio !== 'undefined') {
      MisTablasAudio.playFanfare();
    }

    const arena = document.getElementById('simceWorkspace');
    if (!arena) return;

    arena.innerHTML = `
      <div class="simce-results-card" style="grid-column: 1 / -1;">
        <div class="score-trophy-icon">🏆</div>
        <h3 class="results-grade-title">${correctas} de ${total} Correctas (${porcentaje}%)</h3>
        <div class="simce-tier-badge ${claseTier}">${nivelSimce}</div>
        <p style="color:var(--text-muted); font-size:1.05rem; max-width:650px; margin:0 auto 20px;">
          ${mensajeTier}
        </p>

        <div class="results-summary-stats">
          <div class="res-stat-box">
            <div class="res-stat-val" style="color:#16a34a;">${correctas}</div>
            <div class="res-stat-label">Correctas</div>
          </div>
          <div class="res-stat-box">
            <div class="res-stat-val" style="color:#dc2626;">${total - correctas}</div>
            <div class="res-stat-label">Por mejorar</div>
          </div>
          <div class="res-stat-box">
            <div class="res-stat-val" style="color:var(--yellow);">${correctas * 2} ⭐</div>
            <div class="res-stat-label">Estrellas ganadas</div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <button class="btn-primary" id="btnBackToMenuFromSimce" style="padding:14px 30px; font-size:1.1rem;">
            🏠 Volver al Menú Principal
          </button>
        </div>

        <!-- Retroalimentación Pedagógica Detallada Pregunta por Pregunta -->
        <div class="feedback-accordion">
          <h4 class="feedback-headline">📝 Retroalimentación y Explicación Detallada</h4>
          ${SIMCE_PREGUNTAS.map((q, idx) => {
            const respDada = this.respuestasEstudiante[idx];
            const esCorrecta = respDada === q.correcta;
            return `
              <div class="feedback-item ${esCorrecta ? 'correct' : 'incorrect'}">
                <div class="feedback-question-title">
                  ${esCorrecta ? '✅' : '❌'} Pregunta ${idx + 1}: ${q.contexto}
                </div>
                <div style="font-size:0.95rem; margin-bottom:8px; color:var(--text-main); font-weight:600;">
                  ${q.enunciado}
                </div>
                <div class="feedback-user-ans">
                  <strong>Tu respuesta:</strong> ${respDada !== undefined ? respDada : 'Sin responder'} | 
                  <strong>Respuesta correcta:</strong> ${q.correcta}
                </div>
                <div class="feedback-explanation">
                  <strong>💡 Explicación pedagógica:</strong> ${q.explicacion}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    document.getElementById('btnBackToMenuFromSimce').onclick = () => {
      MisTablasApp.cambiarVista('menu');
    };
  }
};
