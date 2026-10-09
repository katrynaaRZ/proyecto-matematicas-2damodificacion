/* ========================================================
   PLATAFORMA EDUCATIVA "MIS TABLAS"
   LÓGICA DE INGRESO DEL ESTUDIANTE (login.js)
   ======================================================== */

const AVATARES = [
  { id: 'zorro', nombre: 'Zorro Veloz', icono: '🦊', bg: '#ffedd5', color: '#ea580c' },
  { id: 'buho', nombre: 'Búho Sabio', icono: '🦉', bg: '#fef3c7', color: '#d97706' },
  { id: 'robot', nombre: 'Robo-Mate', icono: '🤖', bg: '#e0f2fe', color: '#0284c7' },
  { id: 'estrella', nombre: 'Estrella Mágica', icono: '🦄', bg: '#fce7f3', color: '#db2777' },
  { id: 'dino', nombre: 'Dino-Cálculo', icono: '🦖', bg: '#dcfce7', color: '#16a34a' },
  { id: 'cohete', nombre: 'Capitán Espacial', icono: '🚀', bg: '#ede9fe', color: '#7c3aed' },
  { id: 'leon', nombre: 'León Campeón', icono: '🦁', bg: '#fee2e2', color: '#dc2626' },
  { id: 'delfin', nombre: 'Delfín Ágil', icono: '🐬', bg: '#ccfbf1', color: '#0d9488' }
];

let avatarSeleccionado = AVATARES[0];

document.addEventListener('DOMContentLoaded', () => {
  renderAvatares();
  setupLoginForm();
  cargarDatosPrevios();
});

// Renderizar la cuadrícula de avatares
function renderAvatares() {
  const container = document.getElementById('avatarGrid');
  if (!container) return;

  container.innerHTML = '';
  AVATARES.forEach((av, index) => {
    const card = document.createElement('div');
    card.className = `avatar-item ${index === 0 ? 'selected' : ''}`;
    card.setAttribute('data-id', av.id);
    card.innerHTML = `
      <div class="avatar-svg-box" style="background: ${av.bg}; color: ${av.color};">
        ${av.icono}
      </div>
      <span class="avatar-name">${av.nombre}</span>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.avatar-item').forEach(el => el.classList.remove('selected'));
      card.classList.add('selected');
      avatarSeleccionado = av;
      if (typeof MisTablasAudio !== 'undefined') {
        MisTablasAudio.playCardFlip();
      }
    });

    container.appendChild(card);
  });
}

// Cargar si ya había ingresado antes
function cargarDatosPrevios() {
  try {
    const prev = localStorage.getItem('mis_tablas_perfil_estudiante');
    if (prev) {
      const data = JSON.parse(prev);
      const inputNombre = document.getElementById('studentName');
      if (inputNombre && data.nombre && data.nombre !== 'Estudiante') {
        inputNombre.value = data.nombre;
      }
      if (data.avatar && data.avatar.id) {
        const found = AVATARES.find(a => a.id === data.avatar.id);
        if (found) {
          avatarSeleccionado = found;
          document.querySelectorAll('.avatar-item').forEach(el => {
            if (el.getAttribute('data-id') === found.id) {
              el.classList.add('selected');
            } else {
              el.classList.remove('selected');
            }
          });
        }
      }
    }
  } catch (e) {
    console.warn(e);
  }
}

// Configurar formulario y validaciones
function setupLoginForm() {
  const form = document.getElementById('loginForm');
  const errorAlert = document.getElementById('errorAlert');
  const inputNombre = document.getElementById('studentName');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();

    // Validación 1: Nombre no vacío y al menos 2 caracteres
    if (!nombre || nombre.length < 2) {
      mostrarError('¡Hola! Por favor escribe tu nombre (al menos 2 letras) para crear tu pase de aventurero.');
      inputNombre.focus();
      if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playError();
      return;
    }

    // Validación 2: Avatar seleccionado
    if (!avatarSeleccionado) {
      mostrarError('Por favor selecciona un avatar para representarte en la plataforma.');
      if (typeof MisTablasAudio !== 'undefined') MisTablasAudio.playError();
      return;
    }

    // Ocultar error si todo está correcto
    if (errorAlert) errorAlert.style.display = 'none';

    // Guardar información en localStorage
    if (typeof MisTablasStorage !== 'undefined') {
      MisTablasStorage.setStudentLogin(nombre, avatarSeleccionado);
    } else {
      // Fallback
      const profile = {
        nombre: nombre,
        curso: '4° Básico',
        avatar: avatarSeleccionado,
        puntos: 100,
        estrellas: 10,
        nivel: 1,
        tituloNivel: 'Explorador Inicial',
        tablasProgreso: { 2: 20, 3: 10, 4: 0, 5: 10, 6: 0, 7: 0, 8: 0, 9: 0, 10: 20 },
        logrosDesbloqueados: ['primer_paso'],
        simceCompletado: false,
        sonidoActivo: true
      };
      localStorage.setItem('mis_tablas_perfil_estudiante', JSON.stringify(profile));
    }

    // Sonido de éxito
    if (typeof MisTablasAudio !== 'undefined') {
      MisTablasAudio.playSuccess();
    }

    // Botón de estado de carga
    const btnSubmit = form.querySelector('button[type="submit"]');
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span>¡Ingresando al Sistema...!</span> 🚀`;
    }

    // Redirección a Sistema/index.html
    setTimeout(() => {
      window.location.href = 'Sistema/index.html';
    }, 450);
  });
}

function mostrarError(mensaje) {
  const errorAlert = document.getElementById('errorAlert');
  if (errorAlert) {
    errorAlert.textContent = mensaje;
    errorAlert.style.display = 'block';
  } else {
    alert(mensaje);
  }
}
