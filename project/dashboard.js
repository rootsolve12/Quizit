// Dashboard functionality for personal statistics and achievements
class Dashboard {
    constructor() {
        this.leaderboard = leaderboard; // Use global leaderboard instance
        this.currentPlayer = null;
        this.achievements = this.initializeAchievements();
    }

    initializeAchievements() {
        return {
            first_quiz: {
                id: 'first_quiz',
                title: 'First Steps',
                description: 'Complete your first quiz',
                icon: '🎯',
                condition: (stats) => stats.totalQuizzes >= 1
            },
            perfect_score: {
                id: 'perfect_score',
                title: 'Perfect!',
                description: 'Score 100% on a quiz',
                icon: '💯',
                condition: (stats) => stats.bestScore === 100
            },
            quiz_master: {
                id: 'quiz_master',
                title: 'Quiz Master',
                description: 'Complete 10 quizzes',
                icon: '👑',
                condition: (stats) => stats.totalQuizzes >= 10
            },
            speed_demon: {
                id: 'speed_demon',
                title: 'Speed Demon',
                description: 'Complete a quiz in under 5 minutes',
                icon: '⚡',
                condition: (stats) => {
                    return stats.recentActivity.some(activity => activity.timeSpent < 300);
                }
            },
            no_hints: {
                id: 'no_hints',
                title: 'Independent Thinker',
                description: 'Complete a quiz without using hints',
                icon: '🧠',
                condition: (stats) => {
                    return stats.recentActivity.some(activity => activity.hintsUsed === 0);
                }
            },
            consistent_player: {
                id: 'consistent_player',
                title: 'Consistent Player',
                description: 'Maintain 80%+ average score',
                icon: '📊',
                condition: (stats) => stats.averageScore >= 80 && stats.totalQuizzes >= 5
            },
            topic_explorer: {
                id: 'topic_explorer',
                title: 'Topic Explorer',
                description: 'Play quizzes in all 5 topics',
                icon: '🌍',
                condition: (stats) => Object.keys(stats.topics).length >= 5
            },
            high_scorer: {
                id: 'high_scorer',
                title: 'High Scorer',
                description: 'Reach top 10 on leaderboard',
                icon: '🏆',
                condition: (stats, playerName) => {
                    const rank = this.leaderboard.getPlayerRank(playerName);
                    return rank && rank.rank <= 10;
                }
            },
            dedicated: {
                id: 'dedicated',
                title: 'Dedicated',
                description: 'Complete 25 quizzes',
                icon: '💪',
                condition: (stats) => stats.totalQuizzes >= 25
            },
            scholar: {
                id: 'scholar',
                title: 'Scholar',
                description: 'Average 90%+ across all topics',
                icon: '🎓',
                condition: (stats) => {
                    return stats.averageScore >= 90 && 
                           stats.totalQuizzes >= 10 &&
                           stats.topics.every(topic => topic.averageScore >= 90);
                }
            }
        };
    }

    setCurrentPlayer(playerName) {
        this.currentPlayer = playerName;
    }

    getCurrentPlayerStats() {
        if (!this.currentPlayer) return null;
        return this.leaderboard.getPlayerStats(this.currentPlayer);
    }

    renderDashboard() {
        if (!this.currentPlayer) {
            this.showNoDashboardMessage();
            return;
        }

        const stats = this.getCurrentPlayerStats();
        this.updateOverallStats(stats);
        this.updateTopicPerformance(stats);
        this.updateRecentActivity(stats);
        this.updateAchievements(stats);
    }

    updateOverallStats(stats) {
        const totalQuizzesEl = document.getElementById('totalQuizzes');
        const averageScoreEl = document.getElementById('averageScore');
        const bestScoreEl = document.getElementById('bestScore');

        if (totalQuizzesEl) totalQuizzesEl.textContent = stats.totalQuizzes;
        if (averageScoreEl) averageScoreEl.textContent = `${stats.averageScore}%`;
        if (bestScoreEl) bestScoreEl.textContent = stats.bestScore;
    }

    updateTopicPerformance(stats) {
        const container = document.getElementById('topicPerformance');
        if (!container) return;

        if (stats.topics.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-chart-bar"></i>
                    <p>No topic data yet. Play some quizzes to see your performance!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = stats.topics.map(topic => `
            <div class="topic-stat">
                <div class="topic-info">
                    <span class="topic-name">${this.formatTopicName(topic.name)}</span>
                    <span class="topic-games">${topic.gamesPlayed} games</span>
                </div>
                <div class="topic-scores">
                    <span class="topic-average">${topic.averageScore}% avg</span>
                    <span class="topic-best">${topic.bestScore}% best</span>
                </div>
            </div>
        `).join('');
    }

    updateRecentActivity(stats) {
        const container = document.getElementById('recentActivity');
        if (!container) return;

        if (stats.recentActivity.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-history"></i>
                    <p>No recent activity yet. Start playing to see your history!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = stats.recentActivity.slice(0, 5).map(activity => `
            <div class="activity-item">
                <div class="activity-details">
                    <div class="activity-topic">${this.formatTopicName(activity.topic)}</div>
                    <div class="activity-score">${activity.percentage}% (${activity.score}/${activity.totalQuestions})</div>
                </div>
                <div class="activity-date">${this.formatDate(activity.date)}</div>
            </div>
        `).join('');
    }

    updateAchievements(stats) {
        const container = document.getElementById('achievements');
        if (!container) return;

        const earnedAchievements = this.getEarnedAchievements(stats);
        const allAchievements = Object.values(this.achievements);

        container.innerHTML = allAchievements.map(achievement => {
            const earned = earnedAchievements.includes(achievement.id);
            return `
                <div class="achievement ${earned ? 'earned' : ''}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-title">${achievement.title}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                </div>
            `;
        }).join('');
    }

    getEarnedAchievements(stats) {
        const earned = [];
        
        Object.values(this.achievements).forEach(achievement => {
            if (achievement.condition(stats, this.currentPlayer)) {
                earned.push(achievement.id);
            }
        });

        return earned;
    }

    showNoDashboardMessage() {
        const container = document.querySelector('#dashboardScreen .container');
        if (container) {
            container.innerHTML = `
                <div class="no-dashboard">
                    <div class="no-dashboard-content">
                        <i class="fas fa-chart-bar" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 2rem;"></i>
                        <h2>No Dashboard Data</h2>
                        <p>Start playing quizzes to see your personalized dashboard with statistics and achievements!</p>
                        <button id="startFirstQuiz" class="primary-btn">
                            <i class="fas fa-play"></i>
                            Start Your First Quiz
                        </button>
                    </div>
                </div>
            `;

            // Add event listener for start quiz button
            const startBtn = document.getElementById('startFirstQuiz');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    this.showScreen('topicScreen');
                });
            }
        }
    }

    exportPlayerData() {
        if (!this.currentPlayer) return null;

        const stats = this.getCurrentPlayerStats();
        const playerScores = this.leaderboard.getScoresByPlayer(this.currentPlayer, 100);
        
        return {
            playerName: this.currentPlayer,
            exportDate: new Date().toISOString(),
            statistics: stats,
            gameHistory: playerScores,
            achievements: this.getEarnedAchievements(stats)
        };
    }

    clearPlayerData() {
        if (!this.currentPlayer) return;

        // Remove player's scores from leaderboard
        this.leaderboard.scores = this.leaderboard.scores.filter(
            score => score.playerName.toLowerCase() !== this.currentPlayer.toLowerCase()
        );
        this.leaderboard.saveScores();

        // Refresh dashboard
        this.renderDashboard();
        
        soundManager.playUIFeedback();
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
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }

    // Generate insights based on player performance
    generateInsights(stats) {
        const insights = [];

        if (stats.totalQuizzes === 0) {
            return ['Start playing quizzes to see personalized insights!'];
        }

        // Performance insights
        if (stats.averageScore >= 90) {
            insights.push('🌟 Excellent performance! You\'re in the top tier of players.');
        } else if (stats.averageScore >= 75) {
            insights.push('👍 Good job! Your average score is above most players.');
        } else if (stats.averageScore < 50) {
            insights.push('💪 Keep practicing! Each quiz helps you improve.');
        }

        // Topic insights
        if (stats.topics.length > 1) {
            const bestTopic = stats.topics.reduce((best, topic) => 
                topic.averageScore > best.averageScore ? topic : best
            );
            const worstTopic = stats.topics.reduce((worst, topic) => 
                topic.averageScore < worst.averageScore ? topic : worst
            );
            
            insights.push(`🏆 Your strongest topic is ${this.formatTopicName(bestTopic.name)}`);
            if (bestTopic.name !== worstTopic.name) {
                insights.push(`📚 Consider practicing more ${this.formatTopicName(worstTopic.name)} questions`);
            }
        }

        // Activity insights
        if (stats.totalQuizzes >= 10) {
            insights.push('🎯 You\'re a regular player! Consistency is key to improvement.');
        }

        return insights;
    }
}

// Create global dashboard instance
const dashboard = new Dashboard();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dashboard;
}