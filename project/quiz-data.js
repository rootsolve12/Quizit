// Quiz data with multiple topics and questions
const quizData = {
    programming: {
        name: "Programming",
        icon: "fas fa-code",
        color: "#4f46e5",
        questions: [
            {
                id: 1,
                question: "Which programming language is known as the 'mother of all languages'?",
                options: ["C", "FORTRAN", "Assembly", "COBOL"],
                correct: 0,
                hint: "This language was developed by Dennis Ritchie at Bell Labs.",
                difficulty: "medium"
            },
            {
                id: 2,
                question: "What does 'DOM' stand for in web development?",
                options: ["Document Object Model", "Data Object Management", "Dynamic Object Module", "Document Oriented Markup"],
                correct: 0,
                hint: "It's a programming interface for web documents.",
                difficulty: "easy"
            },
            {
                id: 3,
                question: "Which data structure uses LIFO (Last In First Out) principle?",
                options: ["Queue", "Stack", "Array", "Linked List"],
                correct: 1,
                hint: "Think about a stack of plates - which one do you take first?",
                difficulty: "easy"
            },
            {
                id: 4,
                question: "What is the time complexity of binary search?",
                options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                correct: 1,
                hint: "It divides the search space in half each time.",
                difficulty: "medium"
            },
            {
                id: 5,
                question: "Which design pattern ensures a class has only one instance?",
                options: ["Factory", "Observer", "Singleton", "Strategy"],
                correct: 2,
                hint: "There can be only one!",
                difficulty: "medium"
            },
            {
                id: 6,
                question: "What does 'SQL' stand for?",
                options: ["System Query Language", "Structured Query Language", "Simple Query Language", "Standard Query Language"],
                correct: 1,
                hint: "It's used for managing relational databases.",
                difficulty: "easy"
            },
            {
                id: 7,
                question: "Which HTTP status code indicates 'Not Found'?",
                options: ["200", "401", "404", "500"],
                correct: 2,
                hint: "This error is very common when a page doesn't exist.",
                difficulty: "easy"
            },
            {
                id: 8,
                question: "What is recursion in programming?",
                options: ["A loop that never ends", "A function calling itself", "A type of variable", "An error handling method"],
                correct: 1,
                hint: "It's like looking into a mirror that reflects another mirror.",
                difficulty: "medium"
            },
            {
                id: 9,
                question: "Which sorting algorithm has the best average-case time complexity?",
                options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
                correct: 1,
                hint: "It uses divide and conquer approach.",
                difficulty: "hard"
            },
            {
                id: 10,
                question: "What does 'API' stand for?",
                options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Program Integration", "Application Process Interface"],
                correct: 0,
                hint: "It's a set of protocols for building software applications.",
                difficulty: "easy"
            },
            {
                id: 11,
                question: "Which programming paradigm does JavaScript primarily support?",
                options: ["Object-Oriented only", "Functional only", "Multi-paradigm", "Procedural only"],
                correct: 2,
                hint: "JavaScript is flexible and supports multiple programming styles.",
                difficulty: "medium"
            },
            {
                id: 12,
                question: "What is the purpose of version control systems like Git?",
                options: ["To compile code", "To track changes in files", "To run programs", "To design user interfaces"],
                correct: 1,
                hint: "It helps developers collaborate and track code history.",
                difficulty: "easy"
            },
            {
                id: 13,
                question: "Which database type is MongoDB?",
                options: ["Relational", "NoSQL", "Graph", "Time-series"],
                correct: 1,
                hint: "It stores data in JSON-like documents.",
                difficulty: "easy"
            },
            {
                id: 14,
                question: "What is Big O notation used for?",
                options: ["Measuring code quality", "Describing algorithm complexity", "Counting lines of code", "Measuring memory usage only"],
                correct: 1,
                hint: "It describes how algorithm performance scales with input size.",
                difficulty: "medium"
            },
            {
                id: 15,
                question: "Which principle suggests that software entities should be open for extension but closed for modification?",
                options: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation"],
                correct: 1,
                hint: "It's one of the SOLID principles in software design.",
                difficulty: "hard"
            }
        ]
    },
    science: {
        name: "Science",
        icon: "fas fa-flask",
        color: "#059669",
        questions: [
            {
                id: 1,
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                correct: 2,
                hint: "It comes from the Latin word 'aurum'.",
                difficulty: "easy"
            },
            {
                id: 2,
                question: "How many chambers does a human heart have?",
                options: ["2", "3", "4", "5"],
                correct: 2,
                hint: "Think about the upper and lower sections on both sides.",
                difficulty: "easy"
            },
            {
                id: 3,
                question: "What is the speed of light in vacuum?",
                options: ["300,000 km/s", "299,792,458 m/s", "186,000 miles/h", "150,000 km/s"],
                correct: 1,
                hint: "It's approximately 3 × 10⁸ meters per second.",
                difficulty: "medium"
            },
            {
                id: 4,
                question: "Which planet is known as the 'Red Planet'?",
                options: ["Venus", "Mars", "Jupiter", "Mercury"],
                correct: 1,
                hint: "It's named after the Roman god of war.",
                difficulty: "easy"
            },
            {
                id: 5,
                question: "What is the most abundant gas in Earth's atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
                correct: 2,
                hint: "It makes up about 78% of our atmosphere.",
                difficulty: "easy"
            },
            {
                id: 6,
                question: "What is the pH of pure water at 25°C?",
                options: ["6", "7", "8", "9"],
                correct: 1,
                hint: "It's perfectly neutral on the pH scale.",
                difficulty: "easy"
            },
            {
                id: 7,
                question: "Which scientist developed the theory of evolution by natural selection?",
                options: ["Isaac Newton", "Albert Einstein", "Charles Darwin", "Gregor Mendel"],
                correct: 2,
                hint: "He wrote 'On the Origin of Species'.",
                difficulty: "easy"
            },
            {
                id: 8,
                question: "What is the smallest unit of matter?",
                options: ["Molecule", "Atom", "Electron", "Proton"],
                correct: 1,
                hint: "It's from the Greek word meaning 'indivisible'.",
                difficulty: "easy"
            },
            {
                id: 9,
                question: "Which force keeps planets in orbit around the sun?",
                options: ["Electromagnetic", "Nuclear", "Gravitational", "Magnetic"],
                correct: 2,
                hint: "Newton described this universal force.",
                difficulty: "easy"
            },
            {
                id: 10,
                question: "What is the chemical formula for water?",
                options: ["H2O", "CO2", "NaCl", "CH4"],
                correct: 0,
                hint: "Two hydrogen atoms and one oxygen atom.",
                difficulty: "easy"
            },
            {
                id: 11,
                question: "Which organelle is known as the 'powerhouse of the cell'?",
                options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
                correct: 2,
                hint: "It produces ATP for cellular energy.",
                difficulty: "medium"
            },
            {
                id: 12,
                question: "What type of wave is sound?",
                options: ["Electromagnetic", "Longitudinal", "Transverse", "Light"],
                correct: 1,
                hint: "The particles vibrate parallel to the wave direction.",
                difficulty: "medium"
            },
            {
                id: 13,
                question: "Which element has the highest electronegativity?",
                options: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"],
                correct: 1,
                hint: "It's the most electronegative element on the periodic table.",
                difficulty: "hard"
            },
            {
                id: 14,
                question: "What is the study of earthquakes called?",
                options: ["Geology", "Seismology", "Meteorology", "Volcanology"],
                correct: 1,
                hint: "It comes from the Greek word for 'shake'.",
                difficulty: "medium"
            },
            {
                id: 15,
                question: "Which law states that energy cannot be created or destroyed?",
                options: ["Newton's First Law", "Law of Conservation of Energy", "Boyle's Law", "Ohm's Law"],
                correct: 1,
                hint: "It's the first law of thermodynamics.",
                difficulty: "medium"
            }
        ]
    },
    history: {
        name: "History",
        icon: "fas fa-monument",
        color: "#dc2626",
        questions: [
            {
                id: 1,
                question: "In which year did World War II end?",
                options: ["1944", "1945", "1946", "1947"],
                correct: 1,
                hint: "It ended shortly after the atomic bombs were dropped.",
                difficulty: "easy"
            },
            {
                id: 2,
                question: "Who was the first President of the United States?",
                options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                correct: 2,
                hint: "He's on the dollar bill and quarter.",
                difficulty: "easy"
            },
            {
                id: 3,
                question: "Which ancient wonder of the world was located in Alexandria?",
                options: ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"],
                correct: 1,
                hint: "It helped guide ships to safety.",
                difficulty: "medium"
            },
            {
                id: 4,
                question: "The French Revolution began in which year?",
                options: ["1789", "1776", "1799", "1804"],
                correct: 0,
                hint: "It started with the storming of the Bastille.",
                difficulty: "medium"
            },
            {
                id: 5,
                question: "Which empire was ruled by Julius Caesar?",
                options: ["Greek", "Roman", "Persian", "Egyptian"],
                correct: 1,
                hint: "All roads lead to this empire's capital.",
                difficulty: "easy"
            },
            {
                id: 6,
                question: "Who wrote the 'I Have a Dream' speech?",
                options: ["Malcolm X", "John F. Kennedy", "Martin Luther King Jr.", "Rosa Parks"],
                correct: 2,
                hint: "He led the March on Washington in 1963.",
                difficulty: "easy"
            },
            {
                id: 7,
                question: "Which wall divided Berlin during the Cold War?",
                options: ["Iron Curtain", "Berlin Wall", "Great Wall", "Hadrian's Wall"],
                correct: 1,
                hint: "It fell in 1989, reuniting East and West.",
                difficulty: "easy"
            },
            {
                id: 8,
                question: "The Renaissance period began in which country?",
                options: ["France", "England", "Italy", "Spain"],
                correct: 2,
                hint: "Cities like Florence and Venice were major centers.",
                difficulty: "easy"
            },
            {
                id: 9,
                question: "Which explorer is credited with discovering America?",
                options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
                correct: 1,
                hint: "He sailed west to reach the East Indies.",
                difficulty: "easy"
            },
            {
                id: 10,
                question: "The Industrial Revolution started in which country?",
                options: ["France", "Germany", "United States", "Great Britain"],
                correct: 3,
                hint: "It began with textile manufacturing and steam power.",
                difficulty: "medium"
            },
            {
                id: 11,
                question: "Which ancient civilization built Machu Picchu?",
                options: ["Aztecs", "Mayans", "Incas", "Olmecs"],
                correct: 2,
                hint: "This empire was based in the Andes Mountains.",
                difficulty: "medium"
            },
            {
                id: 12,
                question: "Who was known as the 'Iron Lady'?",
                options: ["Queen Elizabeth II", "Margaret Thatcher", "Golda Meir", "Indira Gandhi"],
                correct: 1,
                hint: "She was Britain's first female Prime Minister.",
                difficulty: "medium"
            },
            {
                id: 13,
                question: "The Magna Carta was signed in which year?",
                options: ["1066", "1215", "1348", "1453"],
                correct: 1,
                hint: "It limited the power of the English king.",
                difficulty: "hard"
            },
            {
                id: 14,
                question: "Which war was fought between 1950-1953?",
                options: ["Vietnam War", "Korean War", "Cold War", "Gulf War"],
                correct: 1,
                hint: "It divided a peninsula that remains split today.",
                difficulty: "medium"
            },
            {
                id: 15,
                question: "The Black Death occurred during which century?",
                options: ["13th century", "14th century", "15th century", "16th century"],
                correct: 1,
                hint: "It killed about one-third of Europe's population.",
                difficulty: "hard"
            }
        ]
    },
    sports: {
        name: "Sports",
        icon: "fas fa-futbol",
        color: "#ea580c",
        questions: [
            {
                id: 1,
                question: "How many players are on a basketball team on the court at one time?",
                options: ["4", "5", "6", "7"],
                correct: 1,
                hint: "Think about positions: point guard, shooting guard, small forward, power forward, and center.",
                difficulty: "easy"
            },
            {
                id: 2,
                question: "Which country hosted the 2016 Summer Olympics?",
                options: ["China", "Brazil", "Russia", "Japan"],
                correct: 1,
                hint: "The games were held in Rio de Janeiro.",
                difficulty: "easy"
            },
            {
                id: 3,
                question: "In golf, what is the term for one stroke under par?",
                options: ["Eagle", "Birdie", "Bogey", "Albatross"],
                correct: 1,
                hint: "It's named after a small flying creature.",
                difficulty: "easy"
            },
            {
                id: 4,
                question: "Which sport is known as 'The Beautiful Game'?",
                options: ["Basketball", "Tennis", "Soccer/Football", "Baseball"],
                correct: 2,
                hint: "It's the world's most popular sport.",
                difficulty: "easy"
            },
            {
                id: 5,
                question: "How many Grand Slam tournaments are there in tennis?",
                options: ["3", "4", "5", "6"],
                correct: 1,
                hint: "Wimbledon, US Open, French Open, and one more.",
                difficulty: "easy"
            },
            {
                id: 6,
                question: "Which athlete is known as 'The Greatest' in boxing?",
                options: ["Mike Tyson", "Sugar Ray Robinson", "Muhammad Ali", "Floyd Mayweather"],
                correct: 2,
                hint: "He famously said 'Float like a butterfly, sting like a bee.'",
                difficulty: "easy"
            },
            {
                id: 7,
                question: "In American football, how many points is a touchdown worth?",
                options: ["3", "6", "7", "8"],
                correct: 1,
                hint: "You can kick an extra point after for a total of 7.",
                difficulty: "easy"
            },
            {
                id: 8,
                question: "Which swimmer has won the most Olympic gold medals?",
                options: ["Mark Spitz", "Michael Phelps", "Ian Thorpe", "Ryan Lochte"],
                correct: 1,
                hint: "He's known as the 'Baltimore Bullet'.",
                difficulty: "medium"
            },
            {
                id: 9,
                question: "The Masters Tournament is associated with which sport?",
                options: ["Tennis", "Golf", "Swimming", "Track and Field"],
                correct: 1,
                hint: "The winner receives a green jacket.",
                difficulty: "easy"
            },
            {
                id: 10,
                question: "How long is a marathon race?",
                options: ["24.2 miles", "25.2 miles", "26.2 miles", "27.2 miles"],
                correct: 2,
                hint: "It commemorates the run from Marathon to Athens.",
                difficulty: "medium"
            },
            {
                id: 11,
                question: "Which team sport has the most players on the field at one time?",
                options: ["Soccer", "American Football", "Rugby", "Australian Rules Football"],
                correct: 3,
                hint: "It's played on a large oval field in Australia.",
                difficulty: "hard"
            },
            {
                id: 12,
                question: "In cricket, what is the maximum number of runs a batsman can score off one ball?",
                options: ["4", "6", "8", "There's no limit"],
                correct: 3,
                hint: "While 6 is common for a maximum hit, overthrows can add more runs.",
                difficulty: "hard"
            },
            {
                id: 13,
                question: "Which country has won the most FIFA World Cups?",
                options: ["Germany", "Argentina", "Brazil", "Italy"],
                correct: 2,
                hint: "Pelé won three World Cups with this country.",
                difficulty: "medium"
            },
            {
                id: 14,
                question: "What is the diameter of a basketball hoop in inches?",
                options: ["16", "17", "18", "19"],
                correct: 2,
                hint: "It's exactly 1.5 feet across.",
                difficulty: "hard"
            },
            {
                id: 15,
                question: "Which tennis tournament is played on clay courts?",
                options: ["Wimbledon", "US Open", "French Open", "Australian Open"],
                correct: 2,
                hint: "It's held in Roland Garros, Paris.",
                difficulty: "medium"
            }
        ]
    },
    general: {
        name: "General Knowledge",
        icon: "fas fa-globe",
        color: "#7c3aed",
        questions: [
            {
                id: 1,
                question: "What is the capital of Australia?",
                options: ["Sydney", "Melbourne", "Canberra", "Perth"],
                correct: 2,
                hint: "It's not the largest city, but it was specifically built to be the capital.",
                difficulty: "medium"
            },
            {
                id: 2,
                question: "Which is the longest river in the world?",
                options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
                correct: 1,
                hint: "It flows through Egypt and several other African countries.",
                difficulty: "easy"
            },
            {
                id: 3,
                question: "How many continents are there?",
                options: ["5", "6", "7", "8"],
                correct: 2,
                hint: "Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
                difficulty: "easy"
            },
            {
                id: 4,
                question: "What is the smallest country in the world?",
                options: ["Monaco", "Vatican City", "Nauru", "San Marino"],
                correct: 1,
                hint: "The Pope lives here.",
                difficulty: "medium"
            },
            {
                id: 5,
                question: "Which ocean is the largest?",
                options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                correct: 3,
                hint: "It covers about one-third of Earth's surface.",
                difficulty: "easy"
            },
            {
                id: 6,
                question: "What is the most spoken language in the world by number of native speakers?",
                options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
                correct: 2,
                hint: "It's the official language of China.",
                difficulty: "easy"
            },
            {
                id: 7,
                question: "Which country has the most time zones?",
                options: ["Russia", "United States", "China", "France"],
                correct: 3,
                hint: "It includes overseas territories and departments.",
                difficulty: "hard"
            },
            {
                id: 8,
                question: "What is the currency of Japan?",
                options: ["Yuan", "Won", "Yen", "Ringgit"],
                correct: 2,
                hint: "The symbol is ¥.",
                difficulty: "easy"
            },
            {
                id: 9,
                question: "Which mountain range contains Mount Everest?",
                options: ["Andes", "Himalayas", "Rocky Mountains", "Alps"],
                correct: 1,
                hint: "It's located between Nepal and Tibet.",
                difficulty: "easy"
            },
            {
                id: 10,
                question: "What is the most abundant element in the universe?",
                options: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
                correct: 2,
                hint: "It's the simplest and lightest element.",
                difficulty: "medium"
            },
            {
                id: 11,
                question: "Which country is known as the Land of the Rising Sun?",
                options: ["China", "South Korea", "Japan", "Thailand"],
                correct: 2,
                hint: "The sun appears on their flag.",
                difficulty: "easy"
            },
            {
                id: 12,
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Quartz"],
                correct: 2,
                hint: "It's used in jewelry and industrial cutting tools.",
                difficulty: "easy"
            },
            {
                id: 13,
                question: "Which planet is closest to the Sun?",
                options: ["Venus", "Mercury", "Earth", "Mars"],
                correct: 1,
                hint: "It's named after the Roman messenger god.",
                difficulty: "easy"
            },
            {
                id: 14,
                question: "What does 'www' stand for?",
                options: ["World Wide Web", "World Wide Website", "Web World Wide", "Website World Wide"],
                correct: 0,
                hint: "It's the system of interlinked documents on the internet.",
                difficulty: "easy"
            },
            {
                id: 15,
                question: "Which book series features the character Harry Potter?",
                options: ["Lord of the Rings", "Harry Potter", "Chronicles of Narnia", "Percy Jackson"],
                correct: 1,
                hint: "The author is J.K. Rowling.",
                difficulty: "easy"
            }
        ]
    }
};

// Utility function to get random questions from a topic
function getRandomQuestions(topic, count = 15) {
    const questions = quizData[topic]?.questions || [];
    if (questions.length <= count) {
        return [...questions];
    }
    
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Utility function to get all topics
function getAllTopics() {
    return Object.keys(quizData).map(key => ({
        key,
        ...quizData[key]
    }));
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quizData, getRandomQuestions, getAllTopics };
}