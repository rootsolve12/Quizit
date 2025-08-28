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

🚀 How to Run the Project

Follow these steps to set up and run the project locally:

1. Clone the Repository
git clone https://github.com/rootsolve12/Quizit.git
cd quizit

2. Install Dependencies

Make sure you have Node.js (v18+) and npm installed, then run:

npm install

3. Start Development Server

Launch the Vite dev server:

npm run dev


You’ll see a local server URL (usually: http://localhost:5173).

4. Open in Browser

Navigate to the shown URL in your browser to interact with the quiz app.

5. Build for Production (Optional)

To create a production-ready build:

npm run build
npm run preview


Then open the preview URL to test the optimized build.

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
