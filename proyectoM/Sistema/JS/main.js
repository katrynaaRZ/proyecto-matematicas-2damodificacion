/* ========================================================
   PLATAFORMA EDUCATIVA "MIS TABLAS" - 4° BÁSICO
   CONTROLADOR PRINCIPAL DEL SISTEMA (main.js)
   ======================================================== */

const MisTablasApp = {
  vistaActual: 'menu',

  init() {
    this.verificarSesion();
    this.updateHeaderStats();
    this.setupEventListeners();
    this.setupConfetti();
    this.cambiarVista('menu');
  },

  verificarSesion() {
    const profile = MisTablasStorage.getProfile();
    // Si no tiene nombre configurado, redirigir al login
    if (!profile || !profile.nombre) {
      window.location.href = '../index.html';
    }
  },

  updateHeaderStats() {
    const profile = MisTablasStorage.getProfile();
    if (!profile) return;

    // Nombre y Nivel
    const nameEl = document.getElementById('studentHeaderName');
    const levelEl = document.getElementById('studentHeaderLevel');
    const avatarEl = document.getElementById('studentHeaderAvatar');
    const starsEl = document.getElementById('headerStarsCount');
    const xpEl = document.getElementById('headerXpCount');

    if (nameEl) nameEl.textContent = profile.nombre || 'Estudiante';
    if (levelEl) levelEl.textContent = profile.tituloNivel || 'Explorador Inicial';
    if (avatarEl && profile.avatar) {
      avatarEl.textContent = profile.avatar.icono || '🦊';
      avatarEl.style.background = profile.avatar.bg || '#e0f2fe';
    }
    if (starsEl) starsEl.textContent = `${profile.estrellas || 0} ⭐`;
    if (xpEl) xpEl.textContent = `${profile.puntos || 0} XP`;

    // Resumen en Banner de Bienvenida
    const bannerName = document.getElementById('bannerStudentName');
    if (bannerName) bannerName.textContent = profile.nombre || 'Estudiante';

    // Total de tablas dominadas
    const dominadas = Object.values(profile.tablasProgreso || {}).filter(v => v >= 80).length;
    const badgeTablas = document.getElementById('bannerTablasCount');
    if (badgeTablas) badgeTablas.textContent = `${dominadas} / 9 Tablas Dominadas`;

    // Botón de sonido
    const btnAudio = document.getElementById('btnToggleAudio');
    if (btnAudio) {
      btnAudio.textContent = MisTablasStorage.isSoundEnabled() ? '🔊' : '🔇';
    }
  },

  setupEventListeners() {
    // Botón Salir / Cambiar estudiante
    const btnExit = document.getElementById('btnExitSystem');
    if (btnExit) {
      btnExit.addEventListener('click', () => {
        if (confirm('¿Deseas volver a la pantalla de ingreso? Tu progreso quedará guardado.')) {
          window.location.href = '../index.html';
        }
      });
    }

    // Botón Audio
    const btnAudio = document.getElementById('btnToggleAudio');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        const activo = MisTablasStorage.toggleSound();
        btnAudio.textContent = activo ? '🔊' : '🔇';
      });
    }

    // Botones Volver de cada vista
    document.querySelectorAll('.btn-back-to-menu').forEach(btn => {
      btn.addEventListener('click', () => {
        this.cambiarVista('menu');
        if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playClick();
      });
    });

    // Tarjetas del Menú Principal con sonido y navegación
    const cardLearn = document.getElementById('cardMenuLearn');
    const cardGames = document.getElementById('cardMenuGames');
    const cardStats = document.getElementById('cardMenuStats');
    const cardAchieve = document.getElementById('cardMenuAchieve');
    const cardSimce = document.getElementById('cardMenuSimce');

    if (cardLearn) cardLearn.onclick = () => { MisTablasAudio.playClick(); this.cambiarVista('learn'); };
    if (cardGames) cardGames.onclick = () => { MisTablasAudio.playClick(); this.cambiarVista('games'); };
    if (cardStats) cardStats.onclick = () => { MisTablasAudio.playClick(); this.cambiarVista('progress'); };
    if (cardAchieve) cardAchieve.onclick = () => { MisTablasAudio.playClick(); this.cambiarVista('achievements'); };
    if (cardSimce) cardSimce.onclick = () => { MisTablasAudio.playClick(); this.cambiarVista('simce'); };

    // Botón cerrar modal de victoria
    const btnModalClose = document.getElementById('btnModalClose');
    if (btnModalClose) {
      btnModalClose.onclick = () => {
        MisTablasAudio.playClick();
        document.getElementById('victoryModal').classList.remove('active');
      };
    }

    // Efecto de sonido global al presionar cualquier botón nativo
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, .btn-primary, .btn-secondary, .btn-back, .btn-icon');
      if (target && typeof MisTablasAudio !== 'undefined') {
        MisTablasAudio.playClick();
      }
    });
  },

  cambiarVista(nuevaVista) {
    this.vistaActual = nuevaVista;

    // Detener temporizador de juegos y locuciones previas al cambiar de vista
    if (typeof MisTablasGames !== 'undefined' && MisTablasGames.timerInterval) {
      clearInterval(MisTablasGames.timerInterval);
    }
    if (typeof MisTablasAudio !== 'undefined') {
      MisTablasAudio.stopSpeech();
    }

    // Ocultar todas las secciones
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));

    // Mostrar sección solicitada
    const target = document.getElementById(`view-${nuevaVista}`);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Inicializaciones específicas según la vista
    if (nuevaVista === 'learn') {
      if (typeof MisTablasLearning !== 'undefined') MisTablasLearning.init();
    } else if (nuevaVista === 'games') {
      if (typeof MisTablasGames !== 'undefined') MisTablasGames.init();
    } else if (nuevaVista === 'progress') {
      this.renderEstadisticasProgreso();
    } else if (nuevaVista === 'achievements') {
      this.renderLogros();
    } else if (nuevaVista === 'simce') {
      if (typeof MisTablasSimce !== 'undefined') MisTablasSimce.init();
    }

    this.updateHeaderStats();
  },

  // Vista: Estadísticas y Progreso Detallado
  renderEstadisticasProgreso() {
    const container = document.getElementById('progressBarsGrid');
    if (!container) return;

    const profile = MisTablasStorage.getProfile();
    container.innerHTML = '';

    for (let t = 2; t <= 10; t++) {
      const pct = (profile.tablasProgreso && profile.tablasProgreso[t]) || 0;
      const card = document.createElement('div');
      card.className = 'playground-card';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="font-size:1.15rem; color:var(--text-main);">Tabla del ${t}</strong>
          <span style="font-weight:900; color:var(--primary); font-size:1.1rem;">${pct}%</span>
        </div>
        <div style="width:100%; height:14px; background:#e2e8f0; border-radius:50px; overflow:hidden;">
          <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, #4361ee, #2ec4b6); transition:width 0.5s ease;"></div>
        </div>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:6px; font-weight:700;">
          ${pct >= 80 ? '🌟 ¡Dominada!' : pct > 0 ? '🔄 En práctica' : '⏳ Por aprender'}
        </div>
      `;
      container.appendChild(card);
    }

    // Historial SIMCE
    const simceHistorialList = document.getElementById('simceHistorialList');
    if (simceHistorialList) {
      if (!profile.simceHistorial || profile.simceHistorial.length === 0) {
        simceHistorialList.innerHTML = `<p style="color:var(--text-muted); font-weight:700;">Aún no has rendido el Ensayo SIMCE. ¡Completa tu primer ensayo para ver tu historial!</p>`;
      } else {
        simceHistorialList.innerHTML = profile.simceHistorial.map(h => `
          <div style="display:flex; justify-content:space-between; padding:10px 14px; background:#f8fafc; border-radius:10px; margin-bottom:8px; border:1px solid #e2e8f0;">
            <span style="font-weight:800;">📅 ${h.fecha}</span>
            <span style="font-weight:900; color:var(--primary);">${h.puntaje} / ${h.total} (${h.porcentaje}%)</span>
          </div>
        `).join('');
      }
    }
  },

  // Vista: Salón de Trofeos y Logros
  renderLogros() {
    const list = document.getElementById('achievementsGalleryGrid');
    if (!list) return;

    const profile = MisTablasStorage.getProfile();
    const desbloqueados = profile.logrosDesbloqueados || [];

    const CATALOGO_LOGROS = [
      { id: 'primer_paso', nombre: 'Primer Paso', desc: '¡Bienvenido a Mis Tablas!', icono: '🎒' },
      { id: 'tabla_2_dominada', nombre: 'Maestro del Doble', desc: 'Dominaste la tabla del 2', icono: '🍒' },
      { id: 'tabla_5_dominada', nombre: 'Ritmo del Cinco', desc: 'Dominaste la tabla del 5', icono: '🍎' },
      { id: 'tabla_10_dominada', nombre: 'Rey del Cero', desc: 'Dominaste la tabla del 10', icono: '☀️' },
      { id: 'trio_tablas', nombre: 'Trío Matemático', desc: 'Dominaste al menos 3 tablas', icono: '🥉' },
      { id: 'detective', nombre: 'Detective de Números', desc: 'Resolviste los enigmas del Detective', icono: '🕵️‍♂️' },
      { id: 'mision_cosmica', nombre: 'Explorador Espacial', desc: 'Conquistaste la Misión Combinada', icono: '🚀' },
      { id: 'simce_destacado', nombre: 'SIMCE Destacado', desc: 'Obtuviste 8 o más correctas en el SIMCE', icono: '🎖️' },
      { id: 'simce_perfecto', nombre: 'Puntaje Nacional', desc: '10 de 10 perfectas en el Ensayo SIMCE', icono: '👑' },
      { id: 'experto', nombre: 'Cálculo Experto', desc: 'Alcanzaste 500 puntos XP', icono: '⭐' }
    ];

    list.innerHTML = CATALOGO_LOGROS.map(logro => {
      const obtenido = desbloqueados.includes(logro.id);
      return `
        <div style="background:${obtenido ? '#ffffff' : '#f1f5f9'}; border:3px solid ${obtenido ? '#fde047' : '#cbd5e1'}; border-radius:18px; padding:20px; text-align:center; opacity:${obtenido ? '1' : '0.55'};">
          <div style="font-size:48px; margin-bottom:8px;">${logro.icono}</div>
          <h4 style="font-size:1.15rem; font-weight:900; color:var(--text-main); margin-bottom:4px;">${logro.nombre}</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); font-weight:700;">${logro.desc}</p>
          <div style="margin-top:10px;">
            <span style="font-size:0.75rem; font-weight:900; padding:3px 10px; border-radius:20px; background:${obtenido ? '#dcfce7' : '#e2e8f0'}; color:${obtenido ? '#15803d' : '#64748b'};">
              ${obtenido ? '¡DESBLOQUEADO! 🏆' : '🔒 Bloqueado'}
            </span>
          </div>
        </div>
      `;
    }).join('');
  },

  // Modal de Victoria
  mostrarModalVictoria(titulo, mensaje) {
    const modal = document.getElementById('victoryModal');
    const titleEl = document.getElementById('modalVictoryTitle');
    const msgEl = document.getElementById('modalVictoryMessage');

    if (titleEl) titleEl.textContent = titulo;
    if (msgEl) msgEl.textContent = mensaje;
    if (modal) modal.classList.add('active');

    this.updateHeaderStats();
  },

  // Generador de Confeti
  setupConfetti() {
    let canvas = document.getElementById('confettiCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confettiCanvas';
      canvas.className = 'confetti-container';
      document.body.appendChild(canvas);
    }
  },

  triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0', '#ffb703', '#fb8500', '#2ec4b6'];

    for (let i = 0; i < 90; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 50,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 5 + 3,
        angle: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }

    let frames = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speed;
        p.angle += p.rotSpeed;
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frames++;
      if (frames < 140) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  MisTablasApp.init();
});
