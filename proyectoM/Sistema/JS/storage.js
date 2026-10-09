/* ========================================================
   PLATAFORMA EDUCATIVA "MIS TABLAS"
   GESTIÓN DE ALMACENAMIENTO Y PROGRESO (storage.js)
   ======================================================== */

const MisTablasStorage = {
  STORAGE_KEY: 'mis_tablas_perfil_estudiante',

  // Datos por defecto del estudiante
  getDefaultProfile() {
    return {
      nombre: 'Estudiante',
      curso: '4° Básico',
      avatar: {
        id: 'zorro',
        nombre: 'Zorro Veloz',
        icono: '🦊',
        bg: '#fed7aa'
      },
      puntos: 100,
      estrellas: 10,
      nivel: 1,
      tituloNivel: 'Explorador Inicial',
      tablasProgreso: {
        2: 25,
        3: 10,
        4: 0,
        5: 15,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 20
      },
      logrosDesbloqueados: ['primer_paso'],
      simceCompletado: false,
      simcePuntaje: 0,
      simceHistorial: [],
      sonidoActivo: true,
      fechaCreacion: new Date().toISOString()
    };
  },

  // Obtener perfil actual o inicializar
  getProfile() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        const defaultProfile = this.getDefaultProfile();
        this.saveProfile(defaultProfile);
        return defaultProfile;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error al leer de localStorage:', e);
      return this.getDefaultProfile();
    }
  },

  // Guardar perfil completo
  saveProfile(profile) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
    }
  },

  // Actualizar datos de ingreso inicial
  setStudentLogin(nombre, avatar) {
    let profile = this.getProfile();
    profile.nombre = nombre.trim();
    profile.avatar = avatar;
    this.saveProfile(profile);
    return profile;
  },

  // Sumar estrellas y puntos de experiencia
  addRewards(estrellasToAdd, puntosToAdd = 50) {
    let profile = this.getProfile();
    profile.estrellas = (profile.estrellas || 0) + estrellasToAdd;
    profile.puntos = (profile.puntos || 0) + puntosToAdd;
    
    // Nivel basado en puntos
    if (profile.puntos >= 1000) {
      profile.nivel = 4;
      profile.tituloNivel = '¡Maestro Matemático!';
      this.unlockAchievement('maestro_supremo');
    } else if (profile.puntos >= 500) {
      profile.nivel = 3;
      profile.tituloNivel = 'Experto de los Números';
      this.unlockAchievement('experto');
    } else if (profile.puntos >= 250) {
      profile.nivel = 2;
      profile.tituloNivel = 'Aventurero del Cálculo';
    }

    this.saveProfile(profile);
    return profile;
  },

  // Actualizar porcentaje de una tabla (2 al 10)
  updateTableProgress(tablaNum, incremento = 20) {
    let profile = this.getProfile();
    if (!profile.tablasProgreso) {
      profile.tablasProgreso = {};
    }
    const actual = profile.tablasProgreso[tablaNum] || 0;
    const nuevo = Math.min(100, actual + incremento);
    profile.tablasProgreso[tablaNum] = nuevo;

    if (nuevo === 100) {
      this.unlockAchievement(`tabla_${tablaNum}_dominada`);
    }

    // Verificar si dominó al menos 3 tablas para desbloqueo
    const dominadas = Object.values(profile.tablasProgreso).filter(v => v >= 80).length;
    if (dominadas >= 3) {
      this.unlockAchievement('trio_tablas');
    }

    this.saveProfile(profile);
    return profile;
  },

  // Desbloquear un logro
  unlockAchievement(logroId) {
    let profile = this.getProfile();
    if (!profile.logrosDesbloqueados) {
      profile.logrosDesbloqueados = [];
    }
    if (!profile.logrosDesbloqueados.includes(logroId)) {
      profile.logrosDesbloqueados.push(logroId);
      profile.estrellas += 5;
      this.saveProfile(profile);
      return true;
    }
    return false;
  },

  // Registrar resultado del ensayo SIMCE
  saveSimceResult(score, total, respuestas) {
    let profile = this.getProfile();
    profile.simceCompletado = true;
    profile.simcePuntaje = Math.max(profile.simcePuntaje || 0, score);
    
    if (!profile.simceHistorial) profile.simceHistorial = [];
    profile.simceHistorial.push({
      fecha: new Date().toLocaleDateString('es-CL'),
      puntaje: score,
      total: total,
      porcentaje: Math.round((score / total) * 100)
    });

    if (score >= 8) {
      this.unlockAchievement('simce_destacado');
    }
    if (score === 10) {
      this.unlockAchievement('simce_perfecto');
    }

    this.addRewards(score * 2, score * 30);
    this.saveProfile(profile);
    return profile;
  },

  // Obtener estado de sonido
  isSoundEnabled() {
    const profile = this.getProfile();
    return profile.sonidoActivo !== false;
  },

  // Alternar sonido
  toggleSound() {
    let profile = this.getProfile();
    profile.sonidoActivo = !profile.sonidoActivo;
    this.saveProfile(profile);
    return profile.sonidoActivo;
  }
};
