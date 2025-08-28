// Main application logic for Quizit
class QuizitApp {
    constructor() {
        this.currentPlayer = '';
        this.currentTopic = '';
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hintsUsed = 0;
        this.skippedQuestions = 0;
        this.startTime = null;
        this.timer = null;
        this.mistakes = [];
        this.selectedAnswer = null;
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.showScreen('welcomeScreen');
        
        // Initialize sound toggle state
        this.updateSoundToggle();
        
        // Add sound effects to UI elements
        this.addSoundEffects();
    }

    setupEventListeners() {
        // Welcome screen
        const playerNameInput = document.getElementById('playerName');
        const startBtn = document.getElementById('startBtn');
        
        if (playerNameInput) {
            playerNameInput.addEventListener('input', () => {
                const name = playerNameInput.value.trim();
                startBtn.disabled = name.length < 2;
                
                if (name.length >= 2) {
                    startBtn.classList.add('ready');
                } else {
                    startBtn.classList.remove('ready');
                }
            });

            playerNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !startBtn.disabled) {
                    this.startQuiz();
                }
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }

        // Topic selection
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => {
                const topic = card.dataset.topic;
                this.selectTopic(topic);
            });
        });

        // Navigation buttons
        const backToWelcome = document.getElementById('backToWelcome');
        if (backToWelcome) {
            backToWelcome.addEventListener('click', () => {
                this.showScreen('welcomeScreen');
            });
        }

        const showDashboard = document.getElementById('showDashboard');
        if (showDashboard) {
            showDashboard.addEventListener('click', () => {
                this.showDashboard();
            });
        }

        const showLeaderboard = document.getElementById('showLeaderboard');
        if (showLeaderboard) {
            showLeaderboard.addEventListener('click', () => {
                this.showLeaderboard();
            });
        }

        // Dashboard navigation
        const backToTopics = document.getElementById('backToTopics');
        if (backToTopics) {
            backToTopics.addEventListener('click', () => {
                this.showScreen('topicScreen');
            });
        }

        const clearData = document.getElementById('clearData');
        if (clearData) {
            clearData.addEventListener('click', () => {
                this.confirmClearData();
            });
        }

        // Leaderboard navigation
        const backFromLeaderboard = document.getElementById('backFromLeaderboard');
        if (backFromLeaderboard) {
            backFromLeaderboard.addEventListener('click', () => {
                this.showScreen('topicScreen');
            });
        }

        // Quiz controls
        const hintBtn = document.getElementById('hintBtn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showHint());
        }

        const skipBtn = document.getElementById('skipBtn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skipQuestion());
        }

        // Results screen
        const playAgain = document.getElementById('playAgain');
        if (playAgain) {
            playAgain.addEventListener('click', () => {
                this.restartQuiz();
            });
        }

        const changeTopic = document.getElementById('changeTopic');
        if (changeTopic) {
            changeTopic.addEventListener('click', () => {
                this.showScreen('topicScreen');
            });
        }

        const viewLeaderboard = document.getElementById('viewLeaderboard');
        if (viewLeaderboard) {
            viewLeaderboard.addEventListener('click', () => {
                this.showLeaderboard();
            });
        }

        // Sound control
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.toggleSound();
            });
        }
    }

    addSoundEffects() {
        // Add hover sounds to buttons
        document.querySelectorAll('button, .topic-card, .option-btn').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!element.disabled) {
                    soundManager.playHoverSound();
                }
            });
        });

        // Add click sounds to interactive elements
        document.addEventListener('click', (e) => {
            if (e.target.matches('button:not(:disabled), .topic-card, .option-btn:not(:disabled)')) {
                soundManager.playUIFeedback();
            }
        });
    }

    startQuiz() {
        const playerName = document.getElementById('playerName').value.trim();
        if (playerName.length < 2) return;

        this.currentPlayer = playerName;
        dashboard.setCurrentPlayer(playerName);
        
        soundManager.playStartSound();
        this.showScreen('topicScreen');
        
        // Update player name displays
        const playerDisplays = document.querySelectorAll('.player-name');
        playerDisplays.forEach(display => {
            display.textContent = playerName;
        });
    }

    selectTopic(topicKey) {
        this.currentTopic = topicKey;
        const topicData = quizData[topicKey];
        
        if (!topicData) {
            console.error('Topic not found:', topicKey);
            return;
        }

        // Get random questions for the topic
        this.currentQuestions = getRandomQuestions(topicKey, 15);
        
        // Show loading screen
        this.showLoadingScreen();
        
        // Simulate loading time for better UX
        setTimeout(() => {
            this.startQuizSession();
        }, 1500);
    }

    showLoadingScreen() {
        document.getElementById('loadingScreen').classList.add('show');
    }

    hideLoadingScreen() {
        document.getElementById('loadingScreen').classList.remove('show');
    }

    startQuizSession() {
        this.hideLoadingScreen();
        
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hintsUsed = 0;
        this.skippedQuestions = 0;
        this.mistakes = [];
        this.startTime = Date.now();
        
        // Initialize timer
        this.timer = new QuizTimer(30);
        this.setupTimerCallbacks();
        
        // Update UI
        document.getElementById('currentTopic').textContent = quizData[this.currentTopic].name;
        document.getElementById('quizPlayerName').textContent = this.currentPlayer;
        document.getElementById('totalQuestions').textContent = this.currentQuestions.length;
        
        this.showScreen('quizScreen');
        this.displayQuestion();
    }

    setupTimerCallbacks() {
        this.timer.on('onTimeUp', () => {
            this.handleTimeUp();
        });

        this.timer.on('onTick', (timeLeft) => {
            if (timeLeft <= 10) {
                document.querySelector('.timer-circle').classList.add('warning');
            } else {
                document.querySelector('.timer-circle').classList.remove('warning');
            }
        });
    }

    displayQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        if (!question) return;

        // Update question info
        document.getElementById('questionNum').textContent = this.currentQuestionIndex + 1;
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('questionText').textContent = question.question;

        // Clear previous state
        this.selectedAnswer = null;
        document.getElementById('hintContainer').classList.remove('show');
        
        // Reset buttons
        const hintBtn = document.getElementById('hintBtn');
        const skipBtn = document.getElementById('skipBtn');
        hintBtn.disabled = false;
        skipBtn.disabled = false;

        // Generate options
        this.generateOptions(question);
        
        // Update progress
        this.updateProgress();
        
        // Start timer
        this.timer.reset();
        this.timer.start();
    }

    generateOptions(question) {
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            container.appendChild(button);
        });
    }

    selectAnswer(selectedIndex) {
        if (this.selectedAnswer !== null) return; // Already answered
        
        this.selectedAnswer = selectedIndex;
        this.timer.stop();

        const question = this.currentQuestions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.option-btn');
        const isCorrect = selectedIndex === question.correct;

        // Visual feedback
        options.forEach((btn, index) => {
            btn.disabled = true;
            
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        // Sound feedback
        if (isCorrect) {
            soundManager.playCorrectAnswer();
            this.score++;
        } else {
            soundManager.playWrongAnswer();
            this.recordMistake(question, selectedIndex);
        }

        // Update score display
        document.getElementById('currentScore').textContent = this.score;

        // Continue to next question after delay
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    showHint() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const hintContainer = document.getElementById('hintContainer');
        const hintText = document.getElementById('hintText');
        
        hintText.textContent = question.hint;
        hintContainer.classList.add('show');
        
        this.hintsUsed++;
        document.getElementById('hintBtn').disabled = true;
        
        soundManager.playHintSound();
    }

    skipQuestion() {
        if (this.selectedAnswer !== null) return; // Already answered
        
        this.timer.stop();
        this.skippedQuestions++;
        
        const question = this.currentQuestions[this.currentQuestionIndex];
        this.recordMistake(question, null, true);
        
        soundManager.playSkipSound();
        
        // Show correct answer
        const options = document.querySelectorAll('.option-btn');
        options.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            }
        });

        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    handleTimeUp() {
        if (this.selectedAnswer !== null) return; // Already answered
        
        const question = this.currentQuestions[this.currentQuestionIndex];
        this.recordMistake(question, null, false, true);
        
        // Show correct answer
        const options = document.querySelectorAll('.option-btn');
        options.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            }
        });

        soundManager.playWrongAnswer();

        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    recordMistake(question, selectedIndex, skipped = false, timeUp = false) {
        this.mistakes.push({
            question: question.question,
            options: question.options,
            correctAnswer: question.options[question.correct],
            userAnswer: selectedIndex !== null ? question.options[selectedIndex] : null,
            skipped,
            timeUp,
            hint: question.hint
        });
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.currentQuestions.length) {
            this.finishQuiz();
        } else {
            this.displayQuestion();
        }
    }

    finishQuiz() {
        const endTime = Date.now();
        const timeSpent = Math.round((endTime - this.startTime) / 1000);
        
        // Stop timer
        if (this.timer) {
            this.timer.stop();
        }

        // Add score to leaderboard
        const scoreEntry = leaderboard.addScore(
            this.currentPlayer,
            this.currentTopic,
            this.score,
            this.currentQuestions.length,
            timeSpent,
            this.hintsUsed,
            this.skippedQuestions
        );

        // Check achievements
        const achievements = leaderboard.checkAchievements(this.currentPlayer, scoreEntry);

        // Show results
        this.showResults(timeSpent, achievements);
        
        soundManager.playQuizComplete();
    }

    showResults(timeSpent, achievements = []) {
        // Update results data
        const percentage = Math.round((this.score / this.currentQuestions.length) * 100);
        
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('maxScore').textContent = this.currentQuestions.length;
        document.getElementById('correctAnswers').textContent = this.score;
        document.getElementById('wrongAnswers').textContent = this.mistakes.filter(m => !m.skipped).length;
        document.getElementById('skippedQuestions').textContent = this.skippedQuestions;
        document.getElementById('hintsUsed').textContent = this.hintsUsed;

        // Update results header based on performance
        const resultsIcon = document.getElementById('resultsIcon');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsSubtitle = document.getElementById('resultsSubtitle');

        if (percentage === 100) {
            resultsIcon.className = 'fas fa-trophy';
            resultsIcon.style.color = '#ffd700';
            resultsTitle.textContent = 'Perfect Score!';
            resultsSubtitle.textContent = 'Outstanding! You got every question right!';
        } else if (percentage >= 80) {
            resultsIcon.className = 'fas fa-star';
            resultsIcon.style.color = '#10b981';
            resultsTitle.textContent = 'Excellent Work!';
            resultsSubtitle.textContent = 'Great job! You really know your stuff!';
        } else if (percentage >= 60) {
            resultsIcon.className = 'fas fa-thumbs-up';
            resultsIcon.style.color = '#3b82f6';
            resultsTitle.textContent = 'Good Job!';
            resultsSubtitle.textContent = 'Not bad! Keep practicing to improve!';
        } else {
            resultsIcon.className = 'fas fa-redo';
            resultsIcon.style.color = '#ef4444';
            resultsTitle.textContent = 'Keep Learning!';
            resultsSubtitle.textContent = 'Every attempt makes you better!';
        }

        // Show mistakes review
        this.showMistakesReview();
        
        // Show achievements if any
        if (achievements.length > 0) {
            this.showAchievements(achievements);
        }

        this.showScreen('resultsScreen');
    }

    showMistakesReview() {
        const container = document.getElementById('mistakesList');
        
        if (this.mistakes.length === 0) {
            container.innerHTML = `
                <div class="no-mistakes">
                    <i class="fas fa-trophy"></i>
                    <p>Perfect! No mistakes to review.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.mistakes.map((mistake, index) => `
            <div class="mistake-item">
                <div class="mistake-question">
                    Question ${this.currentQuestions.findIndex(q => q.question === mistake.question) + 1}: 
                    ${mistake.question}
                </div>
                
                ${mistake.userAnswer ? `
                    <div class="mistake-answer your-answer">
                        <span class="answer-label">Your Answer:</span>
                        ${mistake.userAnswer}
                    </div>
                ` : mistake.skipped ? `
                    <div class="mistake-answer your-answer">
                        <span class="answer-label">Status:</span>
                        Question Skipped
                    </div>
                ` : `
                    <div class="mistake-answer your-answer">
                        <span class="answer-label">Status:</span>
                        Time Ran Out
                    </div>
                `}
                
                <div class="mistake-answer correct-answer">
                    <span class="answer-label">Correct Answer:</span>
                    ${mistake.correctAnswer}
                </div>
                
                <div class="mistake-hint">
                    <i class="fas fa-lightbulb"></i>
                    <strong>Hint:</strong> ${mistake.hint}
                </div>
            </div>
        `).join('');
    }

    showAchievements(achievements) {
        // Create achievement notification
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                this.showAchievementNotification(achievement);
            }, index * 2000);
        });
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>Achievement Unlocked!</h4>
                    <h3>${achievement.title}</h3>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);

        soundManager.play('complete');
    }

    restartQuiz() {
        this.selectTopic(this.currentTopic);
    }

    showDashboard() {
        dashboard.renderDashboard();
        this.showScreen('dashboardScreen');
    }

    showLeaderboard() {
        this.renderLeaderboard();
        this.showScreen('leaderboardScreen');
    }

    renderLeaderboard() {
        const topScores = leaderboard.getTopScores(50);
        
        // Update podium
        this.updatePodium(topScores);
        
        // Update leaderboard list
        this.updateLeaderboardList(topScores);
    }

    updatePodium(scores) {
        const positions = ['firstPlace', 'secondPlace', 'thirdPlace'];
        
        positions.forEach((position, index) => {
            const element = document.getElementById(position);
            if (scores[index]) {
                const score = scores[index];
                element.querySelector('.podium-name').textContent = score.playerName;
                element.querySelector('.podium-score').textContent = `${score.percentage}%`;
            } else {
                element.querySelector('.podium-name').textContent = '-';
                element.querySelector('.podium-score').textContent = '0';
            }
        });
    }

    updateLeaderboardList(scores) {
        const container = document.getElementById('leaderboardList');
        
        if (scores.length === 0) {
            container.innerHTML = `
                <div class="no-scores">
                    <i class="fas fa-trophy"></i>
                    <p>No scores yet. Be the first to play!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = scores.map((score, index) => {
            const isCurrentPlayer = score.playerName.toLowerCase() === this.currentPlayer.toLowerCase();
            return `
                <div class="leaderboard-entry ${isCurrentPlayer ? 'current-player' : ''}">
                    <div class="rank">${index + 1}</div>
                    <div class="player-name">${score.playerName}</div>
                    <div class="topic">${this.formatTopicName(score.topic)}</div>
                    <div class="score">${score.percentage}%</div>
                    <div class="date">${this.formatDate(score.date)}</div>
                </div>
            `;
        }).join('');
    }

    confirmClearData() {
        if (confirm('Are you sure you want to clear all your quiz data? This action cannot be undone.')) {
            dashboard.clearPlayerData();
            alert('Your data has been cleared successfully!');
        }
    }

    toggleSound() {
        const enabled = soundManager.toggle();
        this.updateSoundToggle();
        
        if (enabled) {
            soundManager.playUIFeedback();
        }
    }

    updateSoundToggle() {
        const soundBtn = document.getElementById('soundToggle');
        const icon = soundBtn.querySelector('i');
        
        if (soundManager.isEnabled()) {
            icon.className = 'fas fa-volume-up';
            soundBtn.classList.remove('muted');
        } else {
            icon.className = 'fas fa-volume-mute';
            soundBtn.classList.add('muted');
        }
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const percentage = ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100;
        progressFill.style.width = `${percentage}%`;
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }

    formatTopicName(topicKey) {
        const topicNames = {
            programming: 'Programming',
            science: 'Science',
            history: 'History',
            sports: 'Sports',
            general: 'General Knowledge'
        };
        return topicNames[topicKey] || topicKey;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
}

// Achievement notification CSS
const achievementCSS = `
.achievement-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 2px solid var(--text-accent);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    max-width: 300px;
    transform: translateX(100%);
    transition: var(--transition);
    z-index: 10000;
    box-shadow: var(--shadow-soft);
}

.achievement-notification.show {
    transform: translateX(0);
}

.achievement-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.achievement-notification .achievement-icon {
    font-size: 2rem;
    animation: bounce 1s infinite;
}

.achievement-info h4 {
    color: var(--text-accent);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 0.25rem 0;
}

.achievement-info h3 {
    color: var(--text-primary);
    font-size: 1.1rem;
    margin: 0 0 0.25rem 0;
}

.achievement-info p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

.no-dashboard {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
}

.no-dashboard-content h2 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.no-dashboard-content p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 400px;
}

.mistake-hint {
    margin-top: 1rem;
    padding: 0.75rem;
    background: rgba(139, 92, 246, 0.1);
    border-radius: var(--border-radius-sm);
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.mistake-hint i {
    color: var(--text-accent);
    margin-right: 0.5rem;
}

.no-data {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary);
}

.no-data i {
    font-size: 2rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.no-scores {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
}

.no-scores i {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}
`;

// Inject achievement styles
const achievementStyleSheet = document.createElement('style');
achievementStyleSheet.textContent = achievementCSS;
document.head.appendChild(achievementStyleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizitApp = new QuizitApp();
});