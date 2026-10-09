/* ========================================================
   PLATAFORMA EDUCATIVA "MIS TABLAS"
   SISTEMA DE AUDIO Y EFECTOS DE SONIDO (audio.js)
   Sintetizador Web Audio API puro (100% offline y ligero)
   ======================================================== */

const MisTablasAudio = {
  audioCtx: null,

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  // Reproducir tono musical puro
  playTone(frequency, type, duration, delay = 0) {
    if (typeof MisTablasStorage !== 'undefined' && !MisTablasStorage.isSoundEnabled()) {
      return;
    }

    try {
      this.initContext();
      if (!this.audioCtx) return;

      setTimeout(() => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      }, delay * 1000);
    } catch (e) {
      console.warn('Audio no disponible o bloqueado:', e);
    }
  },

  // Efecto de Clic / Botón
  playClick() {
    this.playTone(600, 'sine', 0.08);
  },

  // Efecto de Acierto / Éxito (Arpegio ascendente alegre)
  playSuccess() {
    this.playTone(523.25, 'triangle', 0.12, 0);       // C5
    this.playTone(659.25, 'triangle', 0.12, 0.08);    // E5
    this.playTone(783.99, 'triangle', 0.15, 0.16);    // G5
    this.playTone(1046.50, 'triangle', 0.25, 0.24);   // C6
  },

  // Efecto de Error (Tono amigable y no frustrante)
  playError() {
    this.playTone(330, 'sawtooth', 0.15, 0);
    this.playTone(280, 'sawtooth', 0.25, 0.1);
  },

  // Efecto de Volteo de Tarjeta
  playCardFlip() {
    this.playTone(850, 'sine', 0.06);
  },

  // Fanfarria de Victoria / Trofeo
  playFanfare() {
    this.playTone(523.25, 'triangle', 0.15, 0);
    this.playTone(523.25, 'triangle', 0.15, 0.12);
    this.playTone(523.25, 'triangle', 0.15, 0.24);
    this.playTone(659.25, 'triangle', 0.25, 0.36);
    this.playTone(783.99, 'triangle', 0.4, 0.52);
  },

  // Burbuja reventada
  playPop() {
    this.playTone(720, 'sine', 0.07);
  },

  // Sonido de Reloj Tic-Tac (Desafío contra el tiempo)
  playTick(isTac = false) {
    if (typeof MisTablasStorage !== 'undefined' && !MisTablasStorage.isSoundEnabled()) {
      return;
    }
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Tic agudo, Tac más grave
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isTac ? 920 : 1250, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.035);
    } catch (e) {
      console.warn('Audio tick:', e);
    }
  },

  // Sonido de Explosión de Dinamita (Boom profundo con ruido y decaimiento)
  playExplosion() {
    if (typeof MisTablasStorage !== 'undefined' && !MisTablasStorage.isSoundEnabled()) {
      return;
    }
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      // 1. Capa de impacto grave (bombo / caída de tono)
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 0.9);

      oscGain.gain.setValueAtTime(0.35, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(oscGain);
      oscGain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.9);

      // 2. Capa de ruido blanco filtrado (estruendo / chispas de pólvora)
      const bufferSize = this.audioCtx.sampleRate * 0.8;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.8);

      const noiseGain = this.audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.audioCtx.destination);

      noise.start(now);
      noise.stop(now + 0.8);
    } catch (e) {
      console.warn('Error en sonido explosion:', e);
    }
  },

  // Detener cualquier locución previa
  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  // Lectura en voz alta amigable para estudiantes de 4° básico
  speakText(text, callback) {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis no disponible en este navegador');
      return;
    }

    if (typeof MisTablasStorage !== 'undefined' && !MisTablasStorage.isSoundEnabled()) {
      return;
    }

    window.speechSynthesis.cancel(); // Detener locución previa

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-CL'; // Español de Chile / Latinoamérica
      utterance.rate = 0.95;    // Cadencia pausada para niños
      utterance.pitch = 1.05;   // Tono entusiasta y cálido

      // Buscar voz óptima en español
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es') || v.lang.includes('es-'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      if (callback) {
        utterance.onend = callback;
      }

      window.speechSynthesis.speak(utterance);
    }, 80);
  }
};
