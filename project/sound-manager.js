// Sound Manager for quiz interactions
class SoundManager {
    constructor() {
        this.enabled = true;
        this.context = null;
        this.sounds = {};
        this.init();
    }

    async init() {
        try {
            // Initialize Web Audio API context
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
            this.enabled = false;
        }
    }

    createSounds() {
        // Create different sound types using oscillators
        this.sounds = {
            click: () => this.createTone(800, 0.1, 'sine'),
            correct: () => this.createTone([523, 659, 784], 0.3, 'sine'), // C-E-G chord
            wrong: () => this.createTone([196, 185], 0.5, 'sawtooth'), // Dissonant tones
            tick: () => this.createTone(1000, 0.05, 'square'),
            complete: () => this.playMelody([
                {freq: 523, duration: 0.2}, // C
                {freq: 659, duration: 0.2}, // E
                {freq: 784, duration: 0.2}, // G
                {freq: 1047, duration: 0.4}  // C (octave)
            ]),
            start: () => this.createTone([440, 554, 659], 0.5, 'sine'), // A-C#-E chord
            skip: () => this.createTone(400, 0.2, 'triangle'),
            hint: () => this.createTone([880, 1108], 0.3, 'sine'), // Bright tones
            timeWarning: () => this.createTone([500, 600], 0.2, 'square'),
            hover: () => this.createTone(600, 0.05, 'sine')
        };
    }

    createTone(frequencies, duration, waveType = 'sine') {
        if (!this.enabled || !this.context) return;

        const freqArray = Array.isArray(frequencies) ? frequencies : [frequencies];
        
        freqArray.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.context.createOscillator();
                const gainNode = this.context.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.context.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
                oscillator.type = waveType;
                
                // Volume envelope
                gainNode.gain.setValueAtTime(0, this.context.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);
                
                oscillator.start(this.context.currentTime);
                oscillator.stop(this.context.currentTime + duration);
            }, index * 50); // Small delay between multiple tones
        });
    }

    playMelody(notes) {
        if (!this.enabled || !this.context) return;

        let currentTime = this.context.currentTime;
        
        notes.forEach(note => {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);
            
            oscillator.frequency.setValueAtTime(note.freq, currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.15, currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + note.duration);
            
            currentTime += note.duration;
        });
    }

    play(soundName) {
        if (!this.enabled || !this.sounds[soundName]) return;
        
        try {
            // Resume context if it's suspended (required by some browsers)
            if (this.context && this.context.state === 'suspended') {
                this.context.resume();
            }
            
            this.sounds[soundName]();
        } catch (error) {
            console.warn(`Error playing sound ${soundName}:`, error);
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    isEnabled() {
        return this.enabled;
    }

    // Preset sound combinations
    playUIFeedback() {
        this.play('click');
    }

    playCorrectAnswer() {
        this.play('correct');
    }

    playWrongAnswer() {
        this.play('wrong');
    }

    playQuizComplete() {
        this.play('complete');
    }

    playTimerTick() {
        this.play('tick');
    }

    playTimeWarning() {
        this.play('timeWarning');
    }

    playStartSound() {
        this.play('start');
    }

    playSkipSound() {
        this.play('skip');
    }

    playHintSound() {
        this.play('hint');
    }

    playHoverSound() {
        this.play('hover');
    }
}

// Create global sound manager instance
const soundManager = new SoundManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoundManager;
}