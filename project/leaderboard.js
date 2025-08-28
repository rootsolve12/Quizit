// Leaderboard functionality for tracking high scores
class Leaderboard {
    constructor() {
        this.storageKey = 'quizit-leaderboard';
        this.maxEntries = 50;
        this.scores = this.loadScores();
    }

    loadScores() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            return [];
        }
    }

    saveScores() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
        } catch (error) {
            console.error('Error saving leaderboard:', error);
        }
    }

    addScore(playerName, topic, score, totalQuestions, timeSpent, hintsUsed = 0, skipped = 0) {
        const entry = {
            id: Date.now() + Math.random(),
            playerName: playerName.trim(),
            topic: topic,
            score: score,
            totalQuestions: totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            timeSpent: timeSpent,
            hintsUsed: hintsUsed,
            skipped: skipped,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        this.scores.push(entry);
        this.sortScores();
        this.limitEntries();
        this.saveScores();

        return entry;
    }

    sortScores() {
        this.scores.sort((a, b) => {
            // Primary sort by percentage
            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }
            
            // Secondary sort by raw score
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            
            // Tertiary sort by time (less time is better)
            if (a.timeSpent !== b.timeSpent) {
                return a.timeSpent - b.timeSpent;
            }
            
            // Final sort by hints used (less hints is better)
            return a.hintsUsed - b.hintsUsed;
        });
    }

    limitEntries() {
        if (this.scores.length > this.maxEntries) {
            this.scores = this.scores.slice(0, this.maxEntries);
        }
    }

    getTopScores(limit = 10) {
        return this.scores.slice(0, limit);
    }

    getScoresByTopic(topic, limit = 10) {
        return this.scores
            .filter(score => score.topic === topic)
            .slice(0, limit);
    }

    getScoresByPlayer(playerName, limit = 10) {
        return this.scores
            .filter(score => score.playerName.toLowerCase() === playerName.toLowerCase())
            .slice(0, limit);
    }

    getPlayerRank(playerName) {
        const playerScores = this.getScoresByPlayer(playerName, 1);
        if (playerScores.length === 0) return null;

        const bestScore = playerScores[0];
        const rank = this.scores.findIndex(score => score.id === bestScore.id) + 1;
        
        return {
            rank: rank,
            score: bestScore,
            totalPlayers: this.getUniquePlayers().length
        };
    }

    getUniquePlayers() {
        const players = new Set(this.scores.map(score => score.playerName.toLowerCase()));
        return Array.from(players);
    }

    getTopicStats() {
        const topics = {};
        
        this.scores.forEach(score => {
            if (!topics[score.topic]) {
                topics[score.topic] = {
                    name: score.topic,
                    totalGames: 0,
                    averageScore: 0,
                    bestScore: 0,
                    totalScore: 0
                };
            }
            
            const topic = topics[score.topic];
            topic.totalGames++;
            topic.totalScore += score.percentage;
            topic.bestScore = Math.max(topic.bestScore, score.percentage);
        });
        
        // Calculate averages
        Object.values(topics).forEach(topic => {
            topic.averageScore = Math.round(topic.totalScore / topic.totalGames);
        });
        
        return Object.values(topics);
    }

    getPlayerStats(playerName) {
        const playerScores = this.getScoresByPlayer(playerName, 100);
        
        if (playerScores.length === 0) {
            return {
                totalQuizzes: 0,
                averageScore: 0,
                bestScore: 0,
                topics: {},
                recentActivity: []
            };
        }

        const totalQuizzes = playerScores.length;
        const totalScore = playerScores.reduce((sum, score) => sum + score.percentage, 0);
        const averageScore = Math.round(totalScore / totalQuizzes);
        const bestScore = Math.max(...playerScores.map(score => score.percentage));

        // Topic breakdown
        const topics = {};
        playerScores.forEach(score => {
            if (!topics[score.topic]) {
                topics[score.topic] = {
                    name: score.topic,
                    gamesPlayed: 0,
                    averageScore: 0,
                    bestScore: 0,
                    totalScore: 0
                };
            }
            
            const topic = topics[score.topic];
            topic.gamesPlayed++;
            topic.totalScore += score.percentage;
            topic.bestScore = Math.max(topic.bestScore, score.percentage);
        });

        // Calculate topic averages
        Object.values(topics).forEach(topic => {
            topic.averageScore = Math.round(topic.totalScore / topic.gamesPlayed);
        });

        // Recent activity (last 10 games)
        const recentActivity = playerScores.slice(0, 10);

        return {
            totalQuizzes,
            averageScore,
            bestScore,
            topics: Object.values(topics),
            recentActivity
        };
    }

    clearLeaderboard() {
        this.scores = [];
        this.saveScores();
    }

    exportData() {
        return {
            leaderboard: this.scores,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    importData(data) {
        try {
            if (data.leaderboard && Array.isArray(data.leaderboard)) {
                this.scores = data.leaderboard;
                this.sortScores();
                this.limitEntries();
                this.saveScores();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing leaderboard data:', error);
            return false;
        }
    }

    // Achievement system
    checkAchievements(playerName, currentScore) {
        const playerStats = this.getPlayerStats(playerName);
        const achievements = [];

        // First quiz completed
        if (playerStats.totalQuizzes === 1) {
            achievements.push({
                id: 'first_quiz',
                title: 'First Steps',
                description: 'Completed your first quiz',
                icon: '🎯'
            });
        }

        // Perfect score
        if (currentScore.percentage === 100) {
            achievements.push({
                id: 'perfect_score',
                title: 'Perfect!',
                description: 'Scored 100% on a quiz',
                icon: '💯'
            });
        }

        // Quiz master (10 quizzes)
        if (playerStats.totalQuizzes >= 10) {
            achievements.push({
                id: 'quiz_master',
                title: 'Quiz Master',
                description: 'Completed 10 quizzes',
                icon: '👑'
            });
        }

        // Speed demon (completed in under 5 minutes)
        if (currentScore.timeSpent < 300) {
            achievements.push({
                id: 'speed_demon',
                title: 'Speed Demon',
                description: 'Completed a quiz in under 5 minutes',
                icon: '⚡'
            });
        }

        // No hints used
        if (currentScore.hintsUsed === 0) {
            achievements.push({
                id: 'no_hints',
                title: 'Independent Thinker',
                description: 'Completed a quiz without using hints',
                icon: '🧠'
            });
        }

        return achievements;
    }
}

// Create global leaderboard instance
const leaderboard = new Leaderboard();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Leaderboard;
}