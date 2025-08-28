# Quizit
🧩 Quizit is an interactive quiz application built with vanilla HTML, CSS, and JavaScript. It’s designed to make learning fun through timed challenges, instant feedback, sound effects, and a competitive leaderboard. Whether you want to test your knowledge, challenge friends, or just have some fun experience right in your browser 
✨ Features

⏱ Quiz Timer – Countdown timer with pause/resume, progress circle, and warning effects.

🏆 Leaderboard – Persistent high-score tracking with sorting, filtering, and ranking.

🎮 Achievements – Unlockable milestones (perfect score, speed demon, quiz master, etc.).

📊 Player Stats – View individual performance, topic stats, and recent activity.

🎨 UI Enhancements – Timer animations, CSS pulse effect, and responsive design.

⚡ Fast Build – Powered by Vite
 for lightning-fast development and builds.

🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/quizit.git
cd quizit

2. Install dependencies
npm install

3. Start development server
npm run dev

4. Build for production
npm run build

5. Preview production build
npm run preview

🛠 Project Structure
quizit/
├── index.html          # Main entry
├── package.json        # Project metadata & scripts
├── src/
│   ├── counter.js      # Example utility (click counter)
│   ├── timer.js        # QuizTimer class (countdown & UI logic)
│   ├── leaderboard.js  # Leaderboard class (scores, achievements)
│   └── style.css       # Core styling
└── vite.config.js      # Vite configuration

📖 How It Works

When a quiz starts, the QuizTimer handles countdown and updates the UI.

At the end of each quiz, results are stored in Leaderboard (localStorage).

Players can track progress, unlock achievements, and compare with others.

The app can be extended with new quiz topics, authentication, or multiplayer support.

🌟 Achievements System
Achievement	Unlock Condition	Icon
First Steps	Complete your first quiz	🎯
Perfect!	Score 100% on a quiz	💯
Quiz Master	Complete 10 quizzes	👑
Speed Demon	Finish a quiz in under 5 minutes	⚡
Independent Thinker	Finish a quiz without using hints	🧠
📌 Roadmap / Possible Add-ons

 Dark mode toggle

 Multiplayer / real-time quiz battles

 Online leaderboard (cloud sync)

 Question randomizer & categories

 Mobile-first redesign

🤝 Contributing

Contributions are welcome! Feel free to fork this repo, submit issues, or open pull requests.

📜 License

This project is licensed under the MIT License – feel free to use, modify, and distribute.
