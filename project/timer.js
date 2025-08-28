// Timer functionality for quiz questions
class QuizTimer {
    constructor(duration = 30) {
        this.duration = duration;
        this.timeLeft = duration;
        this.timerInterval = null;
        this.callbacks = {};
        this.isRunning = false;
        this.isPaused = false;
        
        // DOM elements
        this.timeDisplay = null;
        this.progressElement = null;
        
        this.init();
    }

    init() {
        this.timeDisplay = document.getElementById('timeLeft');
        this.progressElement = document.querySelector('.timer-progress');
    }

    start(duration = null) {
        if (duration) {
            this.duration = duration;
        }
        
        this.timeLeft = this.duration;
        this.isRunning = true;
        this.isPaused = false;
        
        this.updateDisplay();
        
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.updateDisplay();
                
                // Play tick sound for last 10 seconds
                if (this.timeLeft <= 10 && this.timeLeft > 0) {
                    soundManager.playTimerTick();
                    this.addWarningClass();
                }
                
                // Play warning sound at 10 seconds
                if (this.timeLeft === 10) {
                    soundManager.playTimeWarning();
                }
                
                // Trigger callbacks
                this.triggerCallback('onTick', this.timeLeft);
                
                if (this.timeLeft <= 0) {
                    this.stop();
                    this.triggerCallback('onTimeUp');
                }
            }
        }, 1000);
        
        this.triggerCallback('onStart');
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.isRunning = false;
        this.isPaused = false;
        this.removeWarningClass();
        
        this.triggerCallback('onStop');
    }

    pause() {
        if (this.isRunning) {
            this.isPaused = true;
            this.triggerCallback('onPause');
        }
    }

    resume() {
        if (this.isRunning && this.isPaused) {
            this.isPaused = false;
            this.triggerCallback('onResume');
        }
    }

    reset(duration = null) {
        this.stop();
        if (duration) {
            this.duration = duration;
        }
        this.timeLeft = this.duration;
        this.updateDisplay();
        this.triggerCallback('onReset');
    }

    addTime(seconds) {
        this.timeLeft += seconds;
        if (this.timeLeft > this.duration) {
            this.timeLeft = this.duration;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.timeDisplay) {
            this.timeDisplay.textContent = this.timeLeft;
            
            // Update progress circle
            if (this.progressElement) {
                const percentage = (this.timeLeft / this.duration) * 100;
                const degrees = (percentage / 100) * 360;
                
                if (percentage > 0) {
                    this.progressElement.style.background = `conic-gradient(
                        rgba(255, 255, 255, 0.3) 0deg,
                        rgba(255, 255, 255, 0.3) ${degrees}deg,
                        transparent ${degrees}deg,
                        transparent 360deg
                    )`;
                } else {
                    this.progressElement.style.background = 'transparent';
                }
            }
        }
    }

    addWarningClass() {
        if (this.timeDisplay) {
            this.timeDisplay.parentElement.classList.add('warning');
        }
    }

    removeWarningClass() {
        if (this.timeDisplay) {
            this.timeDisplay.parentElement.classList.remove('warning');
        }
    }

    // Callback system
    on(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }

    off(event, callback) {
        if (this.callbacks[event]) {
            const index = this.callbacks[event].indexOf(callback);
            if (index > -1) {
                this.callbacks[event].splice(index, 1);
            }
        }
    }

    triggerCallback(event, ...args) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => {
                try {
                    callback(...args);
                } catch (error) {
                    console.error(`Timer callback error for ${event}:`, error);
                }
            });
        }
    }

    // Getters
    getTimeLeft() {
        return this.timeLeft;
    }

    getDuration() {
        return this.duration;
    }

    getProgress() {
        return (this.timeLeft / this.duration) * 100;
    }

    isActive() {
        return this.isRunning && !this.isPaused;
    }

    // Static methods for creating different timer configurations
    static createQuickTimer(duration = 15) {
        return new QuizTimer(duration);
    }

    static createNormalTimer(duration = 30) {
        return new QuizTimer(duration);
    }

    static createLongTimer(duration = 60) {
        return new QuizTimer(duration);
    }
}

// Add CSS for timer warning state
const timerWarningCSS = `
.timer-circle.warning {
    animation: pulse 0.5s infinite alternate;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
}

@keyframes pulse {
    from { transform: scale(1); box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
    to { transform: scale(1.05); box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = timerWarningCSS;
document.head.appendChild(styleSheet);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizTimer;
}