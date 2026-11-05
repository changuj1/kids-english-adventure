
// ==========================================
// Kids English Adventure - 遊戲主程式
// ==========================================

// 遊戲模式介紹
const gameModes = {
    picture: {
        title: "🖼️ 看圖猜單字",
        description: "觀察圖片，選出正確的英文單字！"
    },
    listening: {
        title: "🎧 聽力挑戰",
        description: "聽聽看英文發音，找出正確答案！"
    },
    spelling: {
        title: "✏️ 拼字挑戰",
        description: "練習英文拼字，成為拼字小高手！"
    },
    review: {
        title: "📚 錯題複習",
        description: "重新挑戰之前答錯的單字，加深記憶！"
    },
    vocabulary: {
        title: "📖 單字圖鑑",
        description: "探索所有英文單字，認識更多新朋友！"
    },
    sentence: {
        title: "💬 英文問答練習",
        description: "練習生活中常用的英文問答，聽懂問題並選出正確回答！"
    },
    grammar: {
        title: "📝 英文文法挑戰",
        description: "挑戰 50 道英文文法題目，學會正確的英文句型！"
    }
};

// ==========================================
// 遊戲資料
// ==========================================

const QUESTIONS_PER_ROUND = 10;

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// 從 localStorage 讀取星星數
let totalStars = Number(localStorage.getItem("kidsAdventureStars")) || 0;

// 從 localStorage 讀取錯題
let wrongWordIds = JSON.parse(
    localStorage.getItem("kidsAdventureWrongWords") || "[]"
);

// ==========================================
// 英文問答與文法錯題紀錄
// ==========================================

// 英文問答錯題
let wrongSentenceIds = JSON.parse(
    localStorage.getItem("kidsAdventureWrongSentences") || "[]"
);

// 英文文法錯題
let wrongGrammarIds = JSON.parse(
    localStorage.getItem("kidsAdventureWrongGrammar") || "[]"
);

// ==========================================
// 英文問答遊戲狀態
// ==========================================

let currentSentenceQuestions = [];
let currentSentenceQuestionIndex = 0;
let sentenceScore = 0;
let sentenceAnswered = false;

// 是否正在進行英文問答錯題複習
let sentenceReviewMode = false;

// ==========================================
// 英文文法遊戲狀態
// ==========================================

let currentGrammarQuestions = [];
let currentGrammarQuestionIndex = 0;
let grammarScore = 0;
let grammarAnswered = false;

let grammarReviewMode = false;

// 全部錯題複習狀態
let allReviewMode = false;
let allReviewStage = "";
let allReviewResults = {
    word: 0,
    sentence: 0,
    grammar: 0
};
let allReviewTotals = {
    word: 0,
    sentence: 0,
    grammar: 0
};

// ==========================================
// 網頁元素
// ==========================================

const gameCards = document.querySelectorAll(".game-card");
const gamePanel = document.getElementById("gamePanel");
const panelTitle = document.getElementById("panelTitle");
const panelDescription = document.getElementById("panelDescription");
const backBtn = document.getElementById("backBtn");

const starCount = document.getElementById("starCount");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

// 初始化首頁資料
updateStarDisplay();
updateProgressDisplay();

// ==========================================
// 首頁遊戲模式按鈕
// ==========================================

gameCards.forEach(card => {
    card.addEventListener("click", () => {
        const mode = card.dataset.mode;
        const game = gameModes[mode];

        if (!game) return;

        panelTitle.textContent = game.title;
        panelDescription.textContent = game.description;

        gamePanel.classList.remove("hidden");
        gamePanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // 看圖猜單字：啟動真正的遊戲
        if (mode === "picture") {
            startPictureGame();
        } else if (mode === "spelling") {
            startSpellingGame();
        } else if (mode === "listening") {
            startListeningGame();
        } else if (mode === "review") {
            startReviewGame();
        } else if (mode === "vocabulary") {
            startVocabularyLibrary();
        } else if (mode === "sentence") {
            startSentenceGame();
        } else if (mode === "grammar") {
            startGrammarGame();
        } else {
            clearQuizArea();
        }
    });
});

// ==========================================
// 返回首頁
// ==========================================

backBtn.addEventListener("click", () => {
    gamePanel.classList.add("hidden");
    clearQuizArea();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==========================================
// 清除遊戲畫面
// ==========================================

function clearQuizArea() {
    const oldQuiz = document.getElementById("quizArea");

    if (oldQuiz) {
        oldQuiz.remove();
    }

    backBtn.classList.remove("hidden");
}

// ==========================================
// 開始看圖猜單字
// ==========================================

function startPictureGame() {
    clearQuizArea();

    if (typeof vocabulary === "undefined" || vocabulary.length < 4) {
        panelDescription.textContent =
            "找不到單字資料，請確認 words.js 是否正確載入。";
        return;
    }

    // 隨機挑選 10 個題目
    currentQuestions = shuffleWords([...vocabulary]).slice(
        0,
        Math.min(QUESTIONS_PER_ROUND, vocabulary.length)
    );

    currentQuestionIndex = 0;
    score = 0;

    const quizArea = document.createElement("div");
    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    gamePanel.appendChild(quizArea);

    showQuestion();
}

// ==========================================
// 顯示題目
// ==========================================

function showQuestion() {
    answered = false;

    const quizArea = document.getElementById("quizArea");
    const word = currentQuestions[currentQuestionIndex];

    if (!quizArea || !word) return;

    const options = createOptions(word);

    quizArea.innerHTML = `
        <div class="quiz-info">
            <span>⭐ 本輪得分：${score}</span>
            <span>題目：${currentQuestionIndex + 1} / ${currentQuestions.length}</span>
        </div>

        <div class="quiz-progress">
            <div class="quiz-progress-fill"
                 style="width: ${(currentQuestionIndex / currentQuestions.length) * 100}%">
            </div>
        </div>

        <h2 class="quiz-question">What is this?</h2>

        <div class="quiz-image-box">
            <img
                id="quizImage"
                src="${word.image}"
                alt="Guess the English word"
            >
        </div>

        <button class="speak-button" id="speakBtn">
            🔊 聽英文發音
        </button>

        <div class="quiz-options">
            ${options.map(option => `
                <button class="answer-button"
                        data-word-id="${option.id}">
                    ${option.word}
                </button>
            `).join("")}
        </div>

        <div id="answerFeedback" class="answer-feedback"></div>

        <button id="nextQuestionBtn" class="next-button hidden">
            下一題 ➜
        </button>
    `;

    // 圖片載入失敗時顯示提示
    const quizImage = document.getElementById("quizImage");

    quizImage.addEventListener("error", () => {
        quizImage.style.display = "none";

        const imageBox = quizImage.parentElement;
        imageBox.classList.add("image-placeholder");
        imageBox.insertAdjacentHTML(
            "beforeend",
            `<div class="image-fallback">🖼️<br>圖片準備中</div>`
        );
    }, { once: true });

    // 英文發音按鈕
    document.getElementById("speakBtn").addEventListener("click", () => {
        speakEnglish(word.word);
    });

    // 選項按鈕
    document.querySelectorAll(".answer-button").forEach(button => {
        button.addEventListener("click", () => {
            checkAnswer(Number(button.dataset.wordId), word);
        });
    });

    // 下一題按鈕
    document.getElementById("nextQuestionBtn").addEventListener("click", () => {
        currentQuestionIndex++;

        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            showFinalResult();
        }
    });
}

// ==========================================
// 建立四個選項
// ==========================================

function createOptions(correctWord) {
    const otherWords = vocabulary.filter(
        word => word.id !== correctWord.id
    );

    const randomOptions = shuffleWords(otherWords).slice(0, 3);

    return shuffleWords([
        correctWord,
        ...randomOptions
    ]);
}

// ==========================================
// 檢查答案
// ==========================================

function checkAnswer(selectedId, correctWord) {
    if (answered) return;

    answered = true;

    const buttons = document.querySelectorAll(".answer-button");
    const feedback = document.getElementById("answerFeedback");
    const nextButton = document.getElementById("nextQuestionBtn");

    const isCorrect = selectedId === correctWord.id;

    buttons.forEach(button => {
        const buttonId = Number(button.dataset.wordId);

        button.disabled = true;

        if (buttonId === correctWord.id) {
            button.classList.add("correct");
        } else if (buttonId === selectedId) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        playCorrectSound();

        score++;
        totalStars++;

        localStorage.setItem(
            "kidsAdventureStars",
            totalStars
        );

        // 如果之前答錯過，答對後從錯題清單移除
        wrongWordIds = wrongWordIds.filter(
            id => id !== correctWord.id
        );

        saveWrongWords();

        feedback.innerHTML = `
            <div class="feedback-correct">
                🎉 太棒了！答對了！
                <br>
                <strong>${correctWord.word}</strong>
                <br>
                ⭐ 獲得 1 顆星星！
            </div>
        `;
    } else {
        playWrongSound();

        // 將答錯的單字加入複習清單
        if (!wrongWordIds.includes(correctWord.id)) {
            wrongWordIds.push(correctWord.id);
        }

        saveWrongWords();

        feedback.innerHTML = `
            <div class="feedback-incorrect">
                💪 再接再厲！
                <br>
                正確答案是：
                <strong>${correctWord.word}</strong>
                <br>
                中文意思：${correctWord.meaning}
            </div>
        `;
    }

    updateStarDisplay();

    nextButton.classList.remove("hidden");

    nextButton.textContent =
        currentQuestionIndex === currentQuestions.length - 1
            ? "查看本輪成績 🏆"
            : "下一題 ➜";
}

// ==========================================
// 儲存錯題
// ==========================================

function saveWrongWords() {
    localStorage.setItem(
        "kidsAdventureWrongWords",
        JSON.stringify(wrongWordIds)
    );

    updateProgressDisplay();
}

// ==========================================
// 英文語音發音
// ==========================================

function speakEnglish(word) {
    if (!("speechSynthesis" in window)) {
        alert("目前的瀏覽器不支援英文語音功能。");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";
    speech.rate = 0.55;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

// ==========================================
// 顯示最終成績
// ==========================================

function showFinalResult() {
    playLevelCompleteSound();

    const quizArea = document.getElementById("quizArea");

    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    quizArea.innerHTML = `
        <div class="final-result">
            <div class="result-trophy">🏆</div>

            <h2>冒險挑戰完成！</h2>

            <p class="result-score">
                ${score} / ${total}
            </p>

            <p>答對率：${percentage}%</p>

            <p class="result-message">
                ${
                    percentage === 100
                        ? "太厲害了！你是英文單字小達人！🌟"
                        : percentage >= 70
                            ? "表現很好！繼續加油！🎉"
                            : "別灰心，多練習就會越來越棒！💪"
                }
            </p>

            <p>⭐ 累積星星：${totalStars}</p>

            <p>📚 待複習單字：${wrongWordIds.length} 個</p>

            <button id="playAgainBtn" class="next-button">
                🔄 再玩一次
            </button>
        </div>
    `;

    updateProgressDisplay();

    document.getElementById("playAgainBtn").addEventListener("click", () => {
        startPictureGame();
    });
}

// ==========================================
// 更新首頁星星數
// ==========================================

function updateStarDisplay() {
    if (starCount) {
        starCount.textContent = totalStars;
    }
}

// ==========================================
// 更新首頁進度
// ==========================================

function updateProgressDisplay() {
    if (progressText) {
        progressText.textContent =
            `已累積 ${totalStars} 顆星星，還有 ${wrongWordIds.length} 個單字待複習`;
    }

    if (progressFill) {
        const percentage = Math.min(totalStars, 100);

        progressFill.style.width = percentage + "%";
    }
}


// ==========================================
// 拼字挑戰 Spelling Challenge
// ==========================================

let spellingLetters = [];
let spellingSelected = [];

// 開始拼字遊戲
function startSpellingGame() {
    clearQuizArea();

    currentQuestions = shuffleWords([...vocabulary]).slice(
        0,
        Math.min(QUESTIONS_PER_ROUND, vocabulary.length)
    );

    currentQuestionIndex = 0;
    score = 0;

    const quizArea = document.createElement("div");
    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    gamePanel.appendChild(quizArea);

    showSpellingQuestion();
}

// 顯示拼字題目
function showSpellingQuestion() {
    answered = false;
    spellingSelected = [];

    const quizArea = document.getElementById("quizArea");
    const word = currentQuestions[currentQuestionIndex];

    // 拆除空格，只保留英文字母
    spellingLetters = shuffleWords(
        word.word.replace(/\s/g, "").split("")
    );

    quizArea.innerHTML = `
        <div class="quiz-info">
            <span>⭐ 本輪得分：${score}</span>
            <span>題目：${currentQuestionIndex + 1} / ${currentQuestions.length}</span>
        </div>

        <div class="quiz-progress">
            <div class="quiz-progress-fill"
                 style="width: ${(currentQuestionIndex / currentQuestions.length) * 100}%">
            </div>
        </div>

        <h2 class="quiz-question">✏️ Spell the word!</h2>

        <div class="spelling-question">`
            //<div class="spelling-emoji">📝</div>
            +
            `<div class="quiz-image-box">
                <img
                    id="quizImage"
                    src="${word.image}"
                    alt="Guess the English word"
                >
            </div>`            
            +
            `<h2>${word.meaning}</h2>
            <p>請利用下方字母拼出正確的英文單字</p>
        </div>

        <button class="speak-button" id="spellingSpeakBtn">
            🔊 聽英文發音
        </button>

        <div class="spelling-slots" id="spellingSlots"></div>

        <div class="letter-bank" id="letterBank"></div>

        <div class="spelling-controls">
            <button class="spelling-control-btn" id="undoLetterBtn">
                ↩️ 復原
            </button>

            <button class="spelling-control-btn" id="clearLettersBtn">
                🗑️ 清空
            </button>
        </div>

        <div id="spellingFeedback" class="answer-feedback"></div>

        <button id="checkSpellingBtn" class="next-button">
            確認答案 ✓
        </button>

        <button id="nextSpellingBtn" class="next-button hidden">
            下一題 ➜
        </button>
    `;

    document.getElementById("spellingSpeakBtn").addEventListener("click", () => {
        speakEnglish(word.word);
    });

    document.getElementById("undoLetterBtn").addEventListener("click", () => {
        if (answered) return;

        spellingSelected.pop();
        updateSpellingDisplay();
    });

    document.getElementById("clearLettersBtn").addEventListener("click", () => {
        if (answered) return;

        spellingSelected = [];
        updateSpellingDisplay();
    });

    document.getElementById("checkSpellingBtn").addEventListener("click", () => {
        checkSpellingAnswer(word);
    });

    document.getElementById("nextSpellingBtn").addEventListener("click", () => {
        currentQuestionIndex++;

        if (currentQuestionIndex < currentQuestions.length) {
            showSpellingQuestion();
        } else {
            showSpellingFinalResult();
        }
    });

    updateSpellingDisplay();
}

// 更新字母排列畫面

function updateSpellingDisplay() {
    const slots = document.getElementById("spellingSlots");
    const bank = document.getElementById("letterBank");

    if (!slots || !bank) return;

    // 依照玩家點擊的順序顯示答案
    let answerHTML = "";

    for (let i = 0; i < spellingLetters.length; i++) {
        if (i < spellingSelected.length) {
            const selectedIndex = spellingSelected[i];

            answerHTML += `
                <div class="spelling-slot filled">
                    ${spellingLetters[selectedIndex]}
                </div>
            `;
        } else {
            answerHTML += `
                <div class="spelling-slot"></div>
            `;
        }
    }

    slots.innerHTML = answerHTML;

    // 顯示尚未使用的字母
    bank.innerHTML = spellingLetters.map((letter, index) => {
        const selected = spellingSelected.includes(index);

        return `
            <button
                class="letter-button ${selected ? "letter-used" : ""}"
                data-letter-index="${index}"
                ${selected || answered ? "disabled" : ""}
            >
                ${letter}
            </button>
        `;
    }).join("");

    // 綁定字母按鈕
    bank.querySelectorAll(".letter-button").forEach(button => {
        button.addEventListener("click", () => {
            if (answered) return;

            const index = Number(button.dataset.letterIndex);

            if (!spellingSelected.includes(index)) {
                spellingSelected.push(index);
                updateSpellingDisplay();
            }
        });
    });
}


// 檢查拼字答案
function checkSpellingAnswer(word) {
    if (answered) return;

    const feedback = document.getElementById("spellingFeedback");
    const checkButton = document.getElementById("checkSpellingBtn");
    const nextButton = document.getElementById("nextSpellingBtn");

    if (spellingSelected.length !== spellingLetters.length) {
        feedback.innerHTML = `
            <div class="feedback-incorrect">
                💡 還有字母沒有選完喔！
            </div>
        `;
        return;
    }

    const userAnswer = spellingSelected
        .map(index => spellingLetters[index])
        .join("")
        .toLowerCase();

    const correctAnswer = word.word
        .replace(/\s/g, "")
        .toLowerCase();

    answered = true;

    if (userAnswer === correctAnswer) {
        playCorrectSound();

        score++;
        totalStars++;

        localStorage.setItem(
            "kidsAdventureStars",
            totalStars
        );

        wrongWordIds = wrongWordIds.filter(
            id => id !== word.id
        );

        saveWrongWords();

        feedback.innerHTML = `
            <div class="feedback-correct">
                🎉 太棒了！拼字正確！
                <br>
                <strong>${word.word}</strong>
                <br>
                ⭐ 獲得 1 顆星星！
            </div>
        `;
    } else {
        playWrongSound();

        if (!wrongWordIds.includes(word.id)) {
            wrongWordIds.push(word.id);
        }

        saveWrongWords();

        feedback.innerHTML = `
            <div class="feedback-incorrect">
                💪 再接再厲！
                <br>
                正確拼法：
                <strong>${word.word}</strong>
                <br>
                中文意思：${word.meaning}
            </div>
        `;
    }

    updateStarDisplay();
    updateSpellingDisplay();

    checkButton.classList.add("hidden");
    nextButton.classList.remove("hidden");

    nextButton.textContent =
        currentQuestionIndex === currentQuestions.length - 1
            ? "查看本輪成績 🏆"
            : "下一題 ➜";
}

// 拼字遊戲結算
function showSpellingFinalResult() {
    playLevelCompleteSound();

    const quizArea = document.getElementById("quizArea");

    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    quizArea.innerHTML = `
        <div class="final-result">
            <div class="result-trophy">🏆</div>

            <h2>拼字挑戰完成！</h2>

            <p class="result-score">${score} / ${total}</p>

            <p>答對率：${percentage}%</p>

            <p class="result-message">
                ${
                    percentage === 100
                        ? "太厲害了！你是拼字小高手！🌟"
                        : percentage >= 70
                            ? "表現很好！繼續加油！🎉"
                            : "多練習幾次，一定會越來越棒！💪"
                }
            </p>

            <p>⭐ 累積星星：${totalStars}</p>

            <p>📚 待複習單字：${wrongWordIds.length} 個</p>

            <button id="spellingPlayAgainBtn" class="next-button">
                🔄 再玩一次
            </button>
        </div>
    `;

    updateProgressDisplay();

    document.getElementById("spellingPlayAgainBtn").addEventListener("click", () => {
        startSpellingGame();
    });
}

// ==========================================
// 聽力挑戰 Listening Challenge
// ==========================================

let listeningCurrentWord = null;

// 開始聽力遊戲
function startListeningGame() {
    clearQuizArea();

    currentQuestions = shuffleWords([...vocabulary]).slice(
        0,
        Math.min(QUESTIONS_PER_ROUND, vocabulary.length)
    );

    currentQuestionIndex = 0;
    score = 0;

    const quizArea = document.createElement("div");
    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    gamePanel.appendChild(quizArea);

    showListeningQuestion();
}

// 顯示聽力題目
function showListeningQuestion() {
    answered = false;

    const quizArea = document.getElementById("quizArea");
    const word = currentQuestions[currentQuestionIndex];

    listeningCurrentWord = word;

    // 取得正確答案及三個干擾選項
    const options = createOptions(word);

    quizArea.innerHTML = `
        <div class="quiz-info">
            <span>⭐ 本輪得分：${score}</span>
            <span>題目：${currentQuestionIndex + 1} / ${currentQuestions.length}</span>
        </div>

        <div class="quiz-progress">
            <div class="quiz-progress-fill"
                 style="width: ${(currentQuestionIndex / currentQuestions.length) * 100}%">
            </div>
        </div>

        <div class="listening-content">
            <div class="listening-icon">🎧</div>

            <h2>Listen and Choose!</h2>

            <p>仔細聽英文單字，選出正確的圖片！</p>

            <button class="listening-play-button" id="listeningPlayBtn">
                🔊 播放英文發音
            </button>

            <p class="listening-hint">
                可以重複聆聽，然後選擇下方正確的圖片。
            </p>
        </div>

        <div class="listening-image-options">
            ${options.map(option => `
                <button
                    class="listening-image-button"
                    data-word-id="${option.id}"
                    type="button"
                    aria-label="選擇圖片"
                >
                    <img
                        src="${option.image}"
                        alt="單字圖片選項"
                        loading="lazy"
                    >

                    <span class="listening-image-placeholder">
                        🖼️<br>圖片準備中
                    </span>
                </button>
            `).join("")}
        </div>

        <div id="listeningFeedback" class="answer-feedback"></div>

        <button id="nextListeningBtn" class="next-button hidden">
            下一題 ➜
        </button>
    `;

    // 圖片載入失敗時顯示預留提示
    document.querySelectorAll(".listening-image-button img")
        .forEach(img => {
            img.addEventListener("error", () => {
                img.style.display = "none";
                img.parentElement.classList.add("image-not-ready");
            }, { once: true });
        });

    // 播放英文發音
    document.getElementById("listeningPlayBtn")
        .addEventListener("click", () => {
            speakEnglish(word.word);
        });

    // 點擊圖片選擇答案
    document.querySelectorAll(".listening-image-button")
        .forEach(button => {
            button.addEventListener("click", () => {
                checkListeningAnswer(
                    Number(button.dataset.wordId),
                    word
                );
            });
        });

    // 下一題
    document.getElementById("nextListeningBtn")
        .addEventListener("click", () => {
            currentQuestionIndex++;

            if (currentQuestionIndex < currentQuestions.length) {
                showListeningQuestion();
            } else {
                showListeningFinalResult();
            }
        });
}

// 檢查聽力答案
function checkListeningAnswer(selectedId, correctWord) {
    if (answered) return;

    answered = true;

    const buttons = document.querySelectorAll(
        ".listening-image-button"
    );

    const feedback = document.getElementById("listeningFeedback");
    const nextButton = document.getElementById("nextListeningBtn");

    const isCorrect = selectedId === correctWord.id;

    buttons.forEach(button => {
        const buttonId = Number(button.dataset.wordId);

        button.disabled = true;

        if (buttonId === correctWord.id) {
            button.classList.add("correct");
        } else if (buttonId === selectedId) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        playCorrectSound();

        score++;
        totalStars++;

        localStorage.setItem(
            "kidsAdventureStars",
            totalStars
        );

        // 答對後從錯題清單移除
        wrongWordIds = wrongWordIds.filter(
            id => id !== correctWord.id
        );

        saveWrongWords();

        feedback.innerHTML = `
            <div class="feedback-correct">
                🎉 太棒了！聽力答對了！
                <br>
                <strong>${correctWord.word}</strong>
                <br>
                中文意思：${correctWord.meaning}
                <br>
                ⭐ 獲得 1 顆星星！
            </div>
        `;
    } else {
        playWrongSound();

        // 答錯後加入錯題清單
        if (!wrongWordIds.includes(correctWord.id)) {
            wrongWordIds.push(correctWord.id);
        }

        saveWrongWords();

        feedback.innerHTML = `
            <div class="feedback-incorrect">
                💪 再接再厲！
                <br>
                正確答案：
                <strong>${correctWord.word}</strong>
                <br>
                中文意思：${correctWord.meaning}
            </div>
        `;
    }

    updateStarDisplay();

    nextButton.classList.remove("hidden");

    nextButton.textContent =
        currentQuestionIndex === currentQuestions.length - 1
            ? "查看本輪成績 🏆"
            : "下一題 ➜";
}

// 聽力遊戲結算
function showListeningFinalResult() {
    playLevelCompleteSound();

    const quizArea = document.getElementById("quizArea");

    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    quizArea.innerHTML = `
        <div class="final-result">
            <div class="result-trophy">🏆</div>

            <h2>聽力挑戰完成！</h2>

            <p class="result-score">${score} / ${total}</p>

            <p>答對率：${percentage}%</p>

            <p class="result-message">
                ${
                    percentage === 100
                        ? "太厲害了！你的英文聽力真棒！🌟"
                        : percentage >= 70
                            ? "聽得很好！繼續加油！🎉"
                            : "多聽幾次英文發音，會越來越進步！💪"
                }
            </p>

            <p>⭐ 累積星星：${totalStars}</p>

            <p>📚 待複習單字：${wrongWordIds.length} 個</p>

            <button id="listeningPlayAgainBtn" class="next-button">
                🔄 再玩一次
            </button>
        </div>
    `;

    updateProgressDisplay();

    document.getElementById("listeningPlayAgainBtn")
        .addEventListener("click", () => {
            startListeningGame();
        });
}


// ==========================================
// 開始錯題複習中心
// ==========================================

function startReviewGame() {

    clearQuizArea();

    const quizArea = document.createElement("div");

    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    gamePanel.appendChild(quizArea);

    // 取得三種錯題數量
    const wordCount = wrongWordIds.length;
    const sentenceCount = wrongSentenceIds.length;
    const grammarCount = wrongGrammarIds.length;

    const totalCount =
        wordCount + sentenceCount + grammarCount;

    quizArea.innerHTML = `

        <div class="review-center">

            <h2>📚 錯題複習中心</h2>

            <p>
                選擇想重新挑戰的學習內容
            </p>

            <div class="review-category-grid">

                <button
                    class="review-category-button"
                    data-review-type="word">

                    🖼️ 單字錯題

                    <span>${wordCount} 題</span>

                </button>

                <button
                    class="review-category-button"
                    data-review-type="sentence">

                    💬 英文問答錯題

                    <span>${sentenceCount} 題</span>

                </button>

                <button
                    class="review-category-button"
                    data-review-type="grammar">

                    📝 英文文法錯題

                    <span>${grammarCount} 題</span>

                </button>

                <button
                    class="review-category-button"
                    data-review-type="all">

                    🌟 全部錯題

                    <span>${totalCount} 題</span>

                </button>

            </div>

        </div>

    `;

    // 複習分類按鈕事件
    const reviewButtons = quizArea.querySelectorAll(
        ".review-category-button"
    );

    reviewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const type = button.dataset.reviewType;

            startSelectedReview(type);

        });

    });

}

// ==========================================
// 啟動指定類型的錯題複習
// ==========================================

function startSelectedReview(type) {

    if (type === "word") {

        // 複習單字錯題
        startWordReview();

    } else if (type === "sentence") {

        // 複習英文問答錯題
        startSentenceReview();

    } else if (type === "grammar") {

        // 複習英文文法錯題
        startGrammarReview();

    } else if (type === "all") {

        // 複習全部錯題
        startAllReview();

    }

}

// ==========================================
// 開始單字錯題複習
// ==========================================

function startWordReview() {

    clearQuizArea();

    // 依照錯題 ID 找出對應單字
    const reviewWords = wrongWordIds
        .map(id => getWordById(id))
        .filter(word => word !== undefined);

    currentQuestions = shuffleWords(reviewWords);

    currentQuestionIndex = 0;
    score = 0;

    const quizArea = document.createElement("div");

    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    gamePanel.appendChild(quizArea);

    // 沒有錯題時顯示完成畫面
    if (currentQuestions.length === 0) {

        showEmptyReviewResult();

        return;

    }

    showReviewQuestion();

}

// 顯示錯題複習題目
function showReviewQuestion() {
    answered = false;

    const quizArea = document.getElementById("quizArea");
    const word = currentQuestions[currentQuestionIndex];

    const options = createOptions(word);

    quizArea.innerHTML = `
        <div class="quiz-info">
            <span>📚 待複習：${currentQuestions.length} 個</span>
            <span>題目：${currentQuestionIndex + 1} / ${currentQuestions.length}</span>
        </div>

        <div class="quiz-progress">
            <div class="quiz-progress-fill"
                 style="width: ${(currentQuestionIndex + 1 / currentQuestions.length) * 100}%">
            </div>
        </div>

        <div class="review-question">`
            //<div class="review-icon">📖</div>
            +
            `<div class="quiz-image-box">
                <img
                    id="quizImage"
                    src="${word.image}"
                    alt="Guess the English word"
                >
            </div>`            
            +            
            `<h2>記得這個單字嗎？</h2>
            <p>中文意思：</p>
            <h2 class="review-meaning">${word.meaning}</h2>
        </div>

        <button class="speak-button" id="reviewSpeakBtn">
            🔊 聽英文發音
        </button>

        <h3 class="quiz-question">請選出正確的英文單字</h3>

        <div class="quiz-options">
            ${options.map(option => `
                <button
                    class="answer-button"
                    data-word-id="${option.id}">
                    ${option.word}
                </button>
            `).join("")}
        </div>

        <div id="reviewFeedback" class="answer-feedback"></div>

        <button id="nextReviewBtn" class="next-button hidden">
            下一題 ➜
        </button>
    `;

    // 播放英文發音
    document.getElementById("reviewSpeakBtn")
        .addEventListener("click", () => {
            speakEnglish(word.word);
        });

    // 選擇答案
    document.querySelectorAll("#quizArea .answer-button")
        .forEach(button => {
            button.addEventListener("click", () => {
                checkReviewAnswer(
                    Number(button.dataset.wordId),
                    word
                );
            });
        });

    // 下一題
    document.getElementById("nextReviewBtn")
        .addEventListener("click", () => {
            currentQuestionIndex++;

            if (currentQuestionIndex < currentQuestions.length) {
                showReviewQuestion();
            } else {
                if (allReviewMode) {
                    allReviewResults.word = score;
                    startNextAllReview();
                } else {
                    showReviewFinalResult();
                }
            }
        });
}

// 檢查複習答案
function checkReviewAnswer(selectedId, correctWord) {
    if (answered) return;

    answered = true;

    const buttons = document.querySelectorAll(
        "#quizArea .answer-button"
    );

    const feedback = document.getElementById("reviewFeedback");
    const nextButton = document.getElementById("nextReviewBtn");

    const isCorrect = selectedId === correctWord.id;

    buttons.forEach(button => {
        const buttonId = Number(button.dataset.wordId);

        button.disabled = true;

        if (buttonId === correctWord.id) {
            button.classList.add("correct");
        } else if (buttonId === selectedId) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        playCorrectSound();

        score++;
        totalStars++;

        // 儲存星星
        localStorage.setItem(
            "kidsAdventureStars",
            totalStars
        );

        // 答對後從錯題清單移除
        wrongWordIds = wrongWordIds.filter(
            id => id !== correctWord.id
        );

        saveWrongWords();

        feedback.innerHTML = `
            <div class="feedback-correct">
                🎉 太棒了！這個單字已經學會了！
                <br>
                <strong>${correctWord.word}</strong>
                <br>
                中文意思：${correctWord.meaning}
                <br>
                ⭐ 獲得 1 顆星星！
            </div>
        `;
    } else {
        playWrongSound();

        // 答錯就保留在錯題清單
        if (!wrongWordIds.includes(correctWord.id)) {
            wrongWordIds.push(correctWord.id);
            saveWrongWords();
        }

        feedback.innerHTML = `
            <div class="feedback-incorrect">
                💪 再加油！這個單字還需要練習。
                <br>
                正確答案：
                <strong>${correctWord.word}</strong>
                <br>
                中文意思：${correctWord.meaning}
            </div>
        `;
    }

    updateStarDisplay();

    nextButton.classList.remove("hidden");

    nextButton.textContent =
        currentQuestionIndex === currentQuestions.length - 1
            ? "查看複習結果 🏆"
            : "下一題 ➜";
}

// 沒有錯題時的畫面
function showEmptyReviewResult() {
    const quizArea = document.getElementById("quizArea");

    quizArea.innerHTML = `
        <div class="final-result">
            <div class="result-trophy">🌟</div>

            <h2>太棒了！</h2>

            <p class="result-message">
                目前沒有需要複習的錯題！
                <br>
                你已經把所有答錯的單字都學會了！
            </p>

            <p>繼續挑戰其他遊戲，學習更多英文單字吧！</p>

            <p>⭐ 累積星星：${totalStars}</p>
        </div>
    `;

    updateProgressDisplay();
}

// 複習完成結算
function showReviewFinalResult() {
    playLevelCompleteSound();

    const quizArea = document.getElementById("quizArea");

    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    quizArea.innerHTML = `
        <div class="final-result">
            <div class="result-trophy">🏆</div>

            <h2>錯題複習完成！</h2>

            <p class="result-score">${score} / ${total}</p>

            <p>本輪複習答對率：${percentage}%</p>

            <p class="result-message">
                ${
                    wrongWordIds.length === 0
                        ? "太厲害了！所有錯題都已經學會了！🌟"
                        : "很棒！繼續練習剩下的錯題吧！💪"
                }
            </p>

            <p>📚 剩餘待複習單字：${wrongWordIds.length} 個</p>

            <p>⭐ 累積星星：${totalStars}</p>

            <button id="reviewAgainBtn" class="next-button">
                🔄 再次複習錯題
            </button>
        </div>
    `;

    updateProgressDisplay();

    document.getElementById("reviewAgainBtn")
        .addEventListener("click", () => {
            startReviewGame();
        });
}

// ==========================================
// 開始英文問答錯題複習
// ==========================================

function startSentenceReview() {

    clearQuizArea();

    // 依照錯題 ID 找出對應問答
    const reviewQuestions = wrongSentenceIds
        .map(id =>
            sentenceQuestions.find(item => item.id === id)
        )
        .filter(item => item !== undefined);

    // 隨機排列錯題
    currentSentenceQuestions = shuffleWords(
        reviewQuestions
    );

    // 重設遊戲狀態
    currentSentenceQuestionIndex = 0;
    sentenceScore = 0;
    sentenceAnswered = false;
    sentenceReviewMode = true;

    // 建立遊戲容器
    const quizArea = document.createElement("div");

    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    gamePanel.appendChild(quizArea);

    // 沒有錯題時顯示完成畫面
    if (currentSentenceQuestions.length === 0) {

        showSentenceReviewResult();

        return;

    }

    // 顯示第一題
    showSentenceQuestion();

}

// ========================================
// 英文單字收藏館
// ========================================

let currentVocabularyCategory = "all";

// 開啟單字收藏館
function startVocabularyLibrary() {

    // 預設顯示全部單字
    currentVocabularyCategory = "all";

    // 清除上一個遊戲的內容
    clearQuizArea();

    // 建立新的遊戲顯示容器
    const quizArea = document.createElement("div");
    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    // 將容器加入遊戲主畫面
    gamePanel.appendChild(quizArea);

    // 建立單字圖鑑內容
    quizArea.innerHTML = `

        <div class="vocabulary-library">

            <div class="vocabulary-categories">

                <button class="category-button active"
                    data-category="all">
                    全部
                </button>

                <button class="category-button"
                    data-category="Fruits">
                    🍎 水果
                </button>

                <button class="category-button"
                    data-category="Animals">
                    🐱 動物
                </button>

                <button class="category-button"
                    data-category="Vehicles">
                    🚗 交通工具
                </button>

                <button class="category-button"
                    data-category="Objects">
                    🎒 物品
                </button>

                <button class="category-button"
                    data-category="Food">
                    🍔 食物
                </button>

                <button class="category-button"
                    data-category="Colors">
                    🎨 顏色
                </button>

                <button class="category-button"
                    data-category="Numbers">
                    🔢 數字
                </button>

                <button class="category-button"
                    data-category="Body Parts">
                    👄 身體部位
                </button>

                <button class="category-button"
                    data-category="Family">
                    👨‍👩‍👧‍👦 家庭
                </button>

                <button class="category-button"
                    data-category="School">
                    🏫 學校
                </button>

                <button class="category-button"
                    data-category="Nature">
                    🌳 自然
                </button>

            </div>

            <div id="vocabularyCount"
                class="vocabulary-count">
            </div>

            <div id="vocabularyGrid"
                class="vocabulary-grid">
            </div>

        </div>

    `;

    // 分類按鈕事件
    const categoryButtons =
        quizArea.querySelectorAll(".category-button");

    categoryButtons.forEach(button => {

        button.addEventListener("click", function () {

            currentVocabularyCategory = this.dataset.category;

            // 更新按鈕選取狀態
            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            // 顯示所選分類的單字
            renderVocabularyWords();

        });

    });

    // 初次載入全部單字
    renderVocabularyWords();

}


// 顯示單字卡片
function renderVocabularyWords() {

    const grid = document.getElementById("vocabularyGrid");
    const count = document.getElementById("vocabularyCount");

    if (!grid || !count) return;

    let words;

    if (currentVocabularyCategory === "all") {
        words = vocabulary;
    } else {
        words = getWordsByCategory(currentVocabularyCategory);
    }

    count.textContent = `目前共有 ${words.length} 個單字`;

    grid.innerHTML = words.map(word => `
        <div class="vocabulary-card">

            <div class="vocabulary-image">
                <img
                    src="${word.image}"
                    alt="${word.word}"
                    onerror="this.style.display='none';"
                >
            </div>

            <h3>${word.word}</h3>

            <p>${word.meaning}</p>

            <button
                class="vocabulary-speak-button"
                onclick="speakEnglish('${word.word}')">
                🔊 聽發音
            </button>

        </div>
    `).join("");
}

// ==========================================
// 開始英文問答練習
// ==========================================

function startSentenceGame() {

    clearQuizArea();

    // 檢查問答題庫
    if (
        typeof sentenceQuestions === "undefined" ||
        sentenceQuestions.length < 4
    ) {
        panelDescription.textContent =
            "找不到英文問答題庫，請確認 sentences.js 是否正確載入。";
        return;
    }

    // 隨機抽取 10 題
    currentSentenceQuestions = shuffleWords(
        [...sentenceQuestions]
    ).slice(
        0,
        Math.min(QUESTIONS_PER_ROUND, sentenceQuestions.length)
    );

    // 重設遊戲狀態
    currentSentenceQuestionIndex = 0;
    sentenceScore = 0;
    sentenceAnswered = false;
    sentenceReviewMode = false;

    // 建立遊戲容器
    const quizArea = document.createElement("div");

    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    gamePanel.appendChild(quizArea);

    // 顯示第一題
    showSentenceQuestion();
}

// ==========================================
// 顯示英文問答題目
// ==========================================

function showSentenceQuestion() {

    const quizArea = document.getElementById("quizArea");

    if (!quizArea) return;

    sentenceAnswered = false;

    const currentQuestion =
        currentSentenceQuestions[currentSentenceQuestionIndex];

    // 建立四個答案選項
    const wrongAnswers = shuffleWords(
        sentenceQuestions.filter(
            item => item.id !== currentQuestion.id
        )
    ).slice(0, 3);

    const options = shuffleWords([
        currentQuestion,
        ...wrongAnswers
    ]);

    // 顯示題目
    quizArea.innerHTML = `
        <div class="quiz-info">
            <span>⭐ 本輪得分：${score}</span>
            <span>題目：${currentSentenceQuestionIndex + 1} / ${currentSentenceQuestions.length}</span>
        </div>

        <div class="quiz-progress">
            <div class="quiz-progress-fill"
                 style="width: ${(currentSentenceQuestionIndex / currentSentenceQuestions.length) * 100}%">
            </div>
        </div>
        <div class="sentence-question-area">

            <div class="sentence-question-card">

                <!--<div class="sentence-question-text">-->
                <h2>
                    ${currentQuestion.question}
                </h2>
                <!--</div>-->

                <!--<div class="sentence-question-meaning">-->
                <h3>
                    ${currentQuestion.questionMeaning}
                </h3>
                <!--</div>-->

                <button
                    class="speech-button"
                    id="speakSentenceQuestionBtn">
                    🔊 聽英文問題
                </button>

            </div>

            <h3 class="sentence-answer-title">
                請選出正確的回答：
            </h3>

            <div class="sentence-options">

                ${options.map(option => `
                    <button
                        class="sentence-option-button"
                        data-sentence-id="${option.id}">

                        ${option.answer}` +

                        // <span class="sentence-option-meaning">
                        //     ${option.answerMeaning}
                        // </span>

                    `</button>
                `).join("")}

            </div>

            <div id="sentenceFeedback"
                class="answer-feedback">
            </div>

            <button
                id="nextSentenceQuestionBtn"
                class="next-button hidden">
                下一題 ➜
            </button>

        </div>

    `;

    // 播放英文問題
    document.getElementById(
        "speakSentenceQuestionBtn"
    ).addEventListener("click", () => {

        speakEnglish(currentQuestion.question);

    });

    // 答案選項事件
    const optionButtons = quizArea.querySelectorAll(
        ".sentence-option-button"
    );

    optionButtons.forEach(button => {

        button.addEventListener("click", () => {

            checkSentenceAnswer(
                button.dataset.sentenceId,
                currentQuestion,
                optionButtons
            );

        });

    });

    // 下一題事件
    document.getElementById(
        "nextSentenceQuestionBtn"
    ).addEventListener("click", () => {

        currentSentenceQuestionIndex++;

        if (
            currentSentenceQuestionIndex <
            currentSentenceQuestions.length
        ) {

            showSentenceQuestion();

        } else {

            if (sentenceReviewMode) {

                if (allReviewMode) {
                    allReviewResults.sentence = sentenceScore;
                    startNextAllReview();
                } else {
                    showSentenceReviewResult();
                }

            } else {
                showSentenceFinalResult();
            }

        }

    });

}

// ==========================================
// 檢查英文問答答案
// ==========================================

function checkSentenceAnswer(
    selectedId,
    correctQuestion,
    optionButtons
) {

    if (sentenceAnswered) return;

    sentenceAnswered = true;

    const feedback = document.getElementById(
        "sentenceFeedback"
    );

    const nextButton = document.getElementById(
        "nextSentenceQuestionBtn"
    );

    const isCorrect = selectedId === correctQuestion.id;

    // 鎖定所有答案按鈕
    optionButtons.forEach(button => {

        button.disabled = true;

        if (button.dataset.sentenceId === correctQuestion.id) {

            button.classList.add("correct");

        } else if (button.dataset.sentenceId === selectedId) {

            button.classList.add("incorrect");

        }

    });

    if (isCorrect) {

        // 答對音效
        playCorrectSound();

        sentenceScore++;

        // 增加星星
        totalStars++;

        localStorage.setItem(
            "kidsAdventureStars",
            totalStars
        );

        // 如果之前答錯過，答對後移除錯題
        wrongSentenceIds = wrongSentenceIds.filter(
            id => id !== correctQuestion.id
        );

        localStorage.setItem(
            "kidsAdventureWrongSentences",
            JSON.stringify(wrongSentenceIds)
        );

        feedback.innerHTML = `

            <div class="feedback-correct">

                🎉 太棒了！答對了！

                <br><br>

                <strong>${correctQuestion.answer}</strong>

                <br>

                ${correctQuestion.answerMeaning}

                <br><br>

                ⭐ 獲得 1 顆星星！

                <br><br>

                <button
                    class="speech-button"
                    id="speakSentenceAnswerBtn">
                    🔊 聽正確答案
                </button>

            </div>

        `;

    } else {

        // 答錯音效
        playWrongSound();

        // 加入錯題紀錄
        if (!wrongSentenceIds.includes(correctQuestion.id)) {

            wrongSentenceIds.push(correctQuestion.id);

        }

        localStorage.setItem(
            "kidsAdventureWrongSentences",
            JSON.stringify(wrongSentenceIds)
        );

        feedback.innerHTML = `

            <div class="feedback-incorrect">

                💪 再接再厲！

                <br><br>

                正確答案是：

                <br>

                <strong>${correctQuestion.answer}</strong>

                <br>

                中文意思：${correctQuestion.answerMeaning}

                <br><br>

                <button
                    class="speech-button"
                    id="speakSentenceAnswerBtn">
                    🔊 聽正確答案
                </button>

            </div>

        `;

    }

    // 更新星星與進度
    updateStarDisplay();
    updateProgressDisplay();

    // 正確答案語音
    document.getElementById(
        "speakSentenceAnswerBtn"
    ).addEventListener("click", () => {

        speakEnglish(correctQuestion.answer);

    });

    // 顯示下一題按鈕
    nextButton.classList.remove("hidden");

    nextButton.textContent =

        currentSentenceQuestionIndex ===
        currentSentenceQuestions.length - 1

            ? "查看本輪成績 🏆"

            : "下一題 ➜";

}

// ==========================================
// 顯示英文問答最終成績
// ==========================================

function showSentenceFinalResult() {

    // 播放過關音效
    playLevelCompleteSound();

    const quizArea = document.getElementById("quizArea");

    if (!quizArea) return;

    const total = currentSentenceQuestions.length;

    const percentage = Math.round(
        (sentenceScore / total) * 100
    );

    quizArea.innerHTML = `

        <div class="final-result">

            <div class="result-trophy">🏆</div>

            <h2>英文問答挑戰完成！</h2>

            <p class="result-score">
                ${sentenceScore} / ${total}
            </p>

            <p>答對率：${percentage}%</p>

            <p class="result-message">

                ${
                    percentage === 100
                        ? "太厲害了！你是英文問答小達人！🌟"
                        : percentage >= 70
                            ? "表現很好！繼續加油！🎉"
                            : "別灰心，多練習就會越來越棒！💪"
                }

            </p>

            <p>⭐ 累積星星：${totalStars}</p>

            <p>
                📚 待複習問答：
                ${wrongSentenceIds.length} 題
            </p>

            <button
                id="playSentenceAgainBtn"
                class="next-button">

                🔄 再玩一次

            </button>

        </div>

    `;

    // 更新進度
    updateProgressDisplay();

    // 重新開始
    document.getElementById(
        "playSentenceAgainBtn"
    ).addEventListener("click", () => {

        startSentenceGame();

    });

}

// ==========================================
// 英文問答錯題複習完成畫面
// ==========================================

function showSentenceReviewResult() {

    const quizArea = document.getElementById("quizArea");

    if (!quizArea) return;

    const total = currentSentenceQuestions.length;

    const percentage = total > 0
        ? Math.round((sentenceScore / total) * 100)
        : 0;

    quizArea.innerHTML = `

        <div class="final-result">

            <div class="result-trophy">💬</div>

            <h2>英文問答複習完成！</h2>

            <p class="result-score">
                ${sentenceScore} / ${total}
            </p>

            <p>答對率：${percentage}%</p>

            <p class="result-message">

                ${
                    total === 0
                        ? "目前沒有需要複習的英文問答！🌟"
                        : percentage === 100
                            ? "太厲害了！全部答對了！🎉"
                            : "繼續練習，你會越來越進步！💪"
                }

            </p>

            <p>
                📚 剩餘問答錯題：
                ${wrongSentenceIds.length} 題
            </p>

            <button
                id="backSentenceReviewBtn"
                class="next-button">

                🔄 再次複習

            </button>

        </div>

    `;

    updateProgressDisplay();

    document.getElementById(
        "backSentenceReviewBtn"
    ).addEventListener("click", () => {

        startSentenceReview();

    });

}

// ==========================================
// 開始英文文法挑戰
// ==========================================

function startGrammarGame() {

    clearQuizArea();

    // 檢查文法題庫
    if (
        typeof grammarQuestions === "undefined" ||
        grammarQuestions.length < 4
    ) {
        panelDescription.textContent =
            "找不到英文文法題庫，請確認 grammar.js 是否正確載入。";
        return;
    }

    // 隨機抽取 10 題
    currentGrammarQuestions = shuffleWords(
        [...grammarQuestions]
    ).slice(
        0,
        Math.min(QUESTIONS_PER_ROUND, grammarQuestions.length)
    );

    // 重設遊戲狀態
    currentGrammarQuestionIndex = 0;
    grammarScore = 0;
    grammarAnswered = false;

    grammarReviewMode = false;

    // 建立遊戲容器
    const quizArea = document.createElement("div");

    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    gamePanel.appendChild(quizArea);

    // 顯示第一題
    showGrammarQuestion();
}

function startGrammarReview() {
    clearQuizArea();

    const reviewQuestions = wrongGrammarIds
        .map(id => grammarQuestions.find(item => item.id === id))
        .filter(item => item !== undefined);

    currentGrammarQuestions = shuffleWords(reviewQuestions);

    currentGrammarQuestionIndex = 0;
    grammarScore = 0;
    grammarAnswered = false;
    grammarReviewMode = true;

    const quizArea = document.createElement("div");
    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";
    gamePanel.appendChild(quizArea);

    if (currentGrammarQuestions.length === 0) {
        showGrammarReviewResult();
        return;
    }

    showGrammarQuestion();
}

// ==========================================
// 顯示英文文法題目
// ==========================================

function showGrammarQuestion() {

    const quizArea = document.getElementById("quizArea");

    if (!quizArea) return;

    grammarAnswered = false;

    const currentQuestion =
        currentGrammarQuestions[currentGrammarQuestionIndex];

    // 隨機排列四個選項
    const options = shuffleWords([
        ...currentQuestion.options
    ]);

    // 顯示題目
    quizArea.innerHTML = `
        <div class="quiz-info">
            <span>⭐ 本輪得分：${score}</span>
            <span>題目：${currentGrammarQuestionIndex + 1} / ${currentGrammarQuestions.length}</span>
        </div>

        <div class="quiz-progress">
            <div class="quiz-progress-fill"
                 style="width: ${(currentGrammarQuestionIndex / currentGrammarQuestions.length) * 100}%">
            </div>
        </div>

        <div class="grammar-question-area">

            <div class="grammar-question-card">

                <div class="grammar-category">
                    📚 ${currentQuestion.category}
                </div>

                <!--<div class="grammar-question-text">-->
                <h2>
                    ${currentQuestion.question}
                </h2>
                <!--</div>-->

                <!--<div class="grammar-question-meaning">-->
                <h3>
                    ${currentQuestion.questionMeaning}
                </h3>
                <!--</div>-->

                <button
                    class="speech-button"
                    id="speakGrammarQuestionBtn">
                    🔊 聽英文句子
                </button>

            </div>

            <h3 class="grammar-answer-title">
                請選出正確答案：
            </h3>

            <div class="grammar-options">

                ${options.map((option, index) => `
                    <button
                        class="grammar-option-button"
                        data-option="${option}">

                        <span class="option-letter">
                            ${String.fromCharCode(65 + index)}.
                        </span>

                        ${option}

                    </button>
                `).join("")}

            </div>

            <div id="grammarFeedback"
                class="answer-feedback">
            </div>

            <button
                id="nextGrammarQuestionBtn"
                class="next-button hidden">
                下一題 ➜
            </button>

        </div>

    `;

    // 播放英文句子
    document.getElementById(
        "speakGrammarQuestionBtn"
    ).addEventListener("click", () => {

        // 將填空位置替換成正確答案後朗讀
        const completeSentence =
            currentQuestion.question.replace(
                "_____",
                currentQuestion.answer
            );

        speakEnglish(completeSentence);

    });

    // 答案選項事件
    const optionButtons = quizArea.querySelectorAll(
        ".grammar-option-button"
    );

    optionButtons.forEach(button => {

        button.addEventListener("click", () => {

            checkGrammarAnswer(
                button.dataset.option,
                currentQuestion,
                optionButtons
            );

        });

    });

    // 下一題事件
    document.getElementById(
        "nextGrammarQuestionBtn"
    ).addEventListener("click", () => {

        currentGrammarQuestionIndex++;

        if (
            currentGrammarQuestionIndex <
            currentGrammarQuestions.length
        ) {

            showGrammarQuestion();

        } else {

            if (grammarReviewMode) {

                if (allReviewMode) {
                    allReviewResults.grammar = grammarScore;
                    startNextAllReview();
                } else {
                    showGrammarReviewResult();
                }

            } else {
                showGrammarFinalResult();
            }

        }

    });

}

// ==========================================
// 檢查英文文法答案
// ==========================================

function checkGrammarAnswer(
    selectedAnswer,
    correctQuestion,
    optionButtons
) {

    if (grammarAnswered) return;

    grammarAnswered = true;

    const feedback = document.getElementById(
        "grammarFeedback"
    );

    const nextButton = document.getElementById(
        "nextGrammarQuestionBtn"
    );

    const isCorrect =
        selectedAnswer === correctQuestion.answer;

    // 鎖定所有答案按鈕
    optionButtons.forEach(button => {

        button.disabled = true;

        if (
            button.dataset.option === correctQuestion.answer
        ) {

            button.classList.add("correct");

        } else if (
            button.dataset.option === selectedAnswer
        ) {

            button.classList.add("incorrect");

        }

    });

    // 將正確答案填入完整句子
    const completeSentence =
        correctQuestion.question.replace(
            "_____",
            correctQuestion.answer
        );

    if (isCorrect) {

        // 答對音效
        playCorrectSound();

        grammarScore++;

        // 增加星星
        totalStars++;

        localStorage.setItem(
            "kidsAdventureStars",
            totalStars
        );

        // 如果之前答錯過，答對後移除錯題
        wrongGrammarIds = wrongGrammarIds.filter(
            id => id !== correctQuestion.id
        );

        localStorage.setItem(
            "kidsAdventureWrongGrammar",
            JSON.stringify(wrongGrammarIds)
        );

        feedback.innerHTML = `

            <div class="feedback-correct">

                🎉 太棒了！答對了！

                <br><br>

                <strong>${completeSentence}</strong>

                <br><br>

                📖 ${correctQuestion.explanation}

                <br><br>

                ⭐ 獲得 1 顆星星！

                <br><br>

                <button
                    class="speech-button"
                    id="speakGrammarAnswerBtn">
                    🔊 聽正確句子
                </button>

            </div>

        `;

    } else {

        // 答錯音效
        playWrongSound();

        // 加入錯題紀錄
        if (!wrongGrammarIds.includes(correctQuestion.id)) {

            wrongGrammarIds.push(correctQuestion.id);

        }

        localStorage.setItem(
            "kidsAdventureWrongGrammar",
            JSON.stringify(wrongGrammarIds)
        );

        feedback.innerHTML = `

            <div class="feedback-incorrect">

                💪 再接再厲！

                <br><br>

                正確答案是：

                <br>

                <strong>${correctQuestion.answer}</strong>

                <br><br>

                完整句子：

                <br>

                <strong>${completeSentence}</strong>

                <br><br>

                📖 ${correctQuestion.explanation}

                <br><br>

                <button
                    class="speech-button"
                    id="speakGrammarAnswerBtn">
                    🔊 聽正確句子
                </button>

            </div>

        `;

    }

    // 更新星星與進度
    updateStarDisplay();
    updateProgressDisplay();

    // 播放完整正確句子
    document.getElementById(
        "speakGrammarAnswerBtn"
    ).addEventListener("click", () => {

        speakEnglish(completeSentence);

    });

    // 顯示下一題按鈕
    nextButton.classList.remove("hidden");

    nextButton.textContent =

        currentGrammarQuestionIndex ===
        currentGrammarQuestions.length - 1

            ? "查看本輪成績 🏆"

            : "下一題 ➜";

}

// ==========================================
// 顯示英文文法最終成績
// ==========================================

function showGrammarFinalResult() {

    // 播放過關音效
    playLevelCompleteSound();

    const quizArea = document.getElementById("quizArea");

    if (!quizArea) return;

    const total = currentGrammarQuestions.length;

    const percentage = Math.round(
        (grammarScore / total) * 100
    );

    quizArea.innerHTML = `

        <div class="final-result">

            <div class="result-trophy">🏆</div>

            <h2>英文文法挑戰完成！</h2>

            <p class="result-score">
                ${grammarScore} / ${total}
            </p>

            <p>答對率：${percentage}%</p>

            <p class="result-message">

                ${
                    percentage === 100
                        ? "太厲害了！你是英文文法小達人！🌟"
                        : percentage >= 70
                            ? "表現很好！繼續加油！🎉"
                            : "別灰心，多練習就會越來越棒！💪"
                }

            </p>

            <p>⭐ 累積星星：${totalStars}</p>

            <p>
                📚 待複習文法：
                ${wrongGrammarIds.length} 題
            </p>

            <button
                id="playGrammarAgainBtn"
                class="next-button">

                🔄 再玩一次

            </button>

        </div>

    `;

    // 更新進度
    updateProgressDisplay();

    // 重新開始
    document.getElementById(
        "playGrammarAgainBtn"
    ).addEventListener("click", () => {

        startGrammarGame();

    });

}

function showGrammarReviewResult() {
    const quizArea = document.getElementById("quizArea");

    const total = currentGrammarQuestions.length;
    const percentage = total > 0
        ? Math.round((grammarScore / total) * 100)
        : 0;

    quizArea.innerHTML = `
        <div class="result-card">
            <h2>📝 文法錯題複習完成！</h2>
            <p>本次複習：${total} 題</p>
            <p>答對題數：${grammarScore} 題</p>
            <p>正確率：${percentage}%</p>
            <p>尚未答對的錯題：${wrongGrammarIds.length} 題</p>

            ${
                total === 0
                    ? "<h3>目前沒有需要複習的英文文法！🌟</h3>"
                    : percentage === 100
                        ? "<h3>太棒了！全部答對！🎉</h3>"
                        : "<h3>繼續努力，你會越來越棒！💪</h3>"
            }

            <button id="replayGrammarReviewBtn" class="next-button">
                🔄 再次複習
            </button>
        </div>
    `;

    document.getElementById("replayGrammarReviewBtn")
        .addEventListener("click", startGrammarReview);

    updateProgressDisplay();
}

function startAllReview() {
    allReviewMode = true;

    allReviewStage = "";

    allReviewResults = {
        word: 0,
        sentence: 0,
        grammar: 0
    };

    // 記錄本輪開始時各類型的錯題數量
    allReviewTotals = {
        word: wrongWordIds.length,
        sentence: wrongSentenceIds.length,
        grammar: wrongGrammarIds.length
    };

    startNextAllReview();
}

function startNextAllReview() {

    // 單字錯題
    if (allReviewStage === "") {
        allReviewStage = "word";

        if (wrongWordIds.length > 0) {
            startWordReview();
            return;
        }
    }

    // 英文問答錯題
    if (allReviewStage === "word") {
        allReviewStage = "sentence";

        if (wrongSentenceIds.length > 0) {
            startSentenceReview();
            return;
        }
    }

    // 英文文法錯題
    if (allReviewStage === "sentence") {
        allReviewStage = "grammar";

        if (wrongGrammarIds.length > 0) {
            startGrammarReview();
            return;
        }
    }

    // 三種類型都完成
    allReviewMode = false;

    showAllReviewResult();
}

function showAllReviewResult() {

    const quizArea = document.getElementById("quizArea");

    const totalCorrect =
        allReviewResults.word +
        allReviewResults.sentence +
        allReviewResults.grammar;

    const remainingTotal =
        wrongWordIds.length +
        wrongSentenceIds.length +
        wrongGrammarIds.length;

    const totalQuestions =
        allReviewTotals.word +
        allReviewTotals.sentence +
        allReviewTotals.grammar;

    const percentage = totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0;

    quizArea.innerHTML = `
        <div class="final-result">

            <div class="result-trophy">🏆</div>

            <h2>全部錯題複習完成！</h2>

            <p class="result-score">
                本次答對：${totalCorrect} / ${totalQuestions} 題
            </p>

            <p>正確率：${percentage}%</p>

            <hr>

            <h3>📚 各類複習成果</h3>

            <p>🖼️ 單字答對：${allReviewResults.word} 題</p>

            <p>💬 英文問答答對：${allReviewResults.sentence} 題</p>

            <p>📝 英文文法答對：${allReviewResults.grammar} 題</p>

            <hr>

            <p>📌 剩餘單字錯題：${wrongWordIds.length} 題</p>

            <p>📌 剩餘英文問答錯題：${wrongSentenceIds.length} 題</p>

            <p>📌 剩餘英文文法錯題：${wrongGrammarIds.length} 題</p>

            <p>⭐ 累積星星：${totalStars}</p>

            <p class="result-message">
                ${
                    remainingTotal === 0
                        ? "太棒了！所有錯題都已經學會了！🌟"
                        : "繼續努力，你一定會越來越進步！💪"
                }
            </p>

            <button id="allReviewAgainBtn" class="next-button">
                🔄 再次複習全部錯題
            </button>

        </div>
    `;

    updateProgressDisplay();

    document.getElementById("allReviewAgainBtn")
        .addEventListener("click", startAllReview);
}

// ========================================
// 🎵 Kids English Adventure 音效系統
// ========================================

// 建立音效播放環境
let gameAudioContext = null;

// 取得 AudioContext
function getGameAudioContext() {
    if (!gameAudioContext) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            console.warn("目前瀏覽器不支援 Web Audio API");
            return null;
        }

        gameAudioContext = new AudioContextClass();
    }

    // 如果音效環境暫停，就重新啟動
    if (gameAudioContext.state === "suspended") {
        gameAudioContext.resume();
    }

    return gameAudioContext;
}


// 播放單一音符
function playGameTone(frequency, delay, duration, volume = 0.15, type = "sine") {
    const audio = getGameAudioContext();

    if (!audio) return;

    const oscillator = audio.createOscillator();
    const gainNode = audio.createGain();

    const startTime = audio.currentTime + delay;
    const endTime = startTime + duration;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0.001, startTime);
    gainNode.gain.linearRampToValueAtTime(
        volume,
        startTime + 0.02
    );
    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        endTime
    );

    oscillator.connect(gainNode);
    gainNode.connect(audio.destination);

    oscillator.start(startTime);
    oscillator.stop(endTime + 0.02);
}


// ========================================
// 🔔 答對音效：叮咚叮咚
// ========================================

function playCorrectSound() {
    // 清脆、明亮的雙音組合
    playGameTone(880, 0, 0.18, 0.5, "sine");
    playGameTone(1175, 0.18, 0.25, 0.5, "sine");

    playGameTone(988, 0.45, 0.18, 0.5, "sine");
    playGameTone(1318, 0.63, 0.30, 0.5, "sine");
}


// ========================================
// 💨 答錯音效：噗噗
// ========================================

function playWrongSound() {
    // 低音、柔和的兩聲噗噗
    playGameTone(190, 0, 0.16, 0.5, "triangle");
    playGameTone(135, 0.20, 0.20, 0.5, "triangle");
}


// ========================================
// 🏆 完成關卡音效：勝利旋律
// ========================================

function playLevelCompleteSound() {
    // 音符逐漸升高，營造完成任務的感覺
    playGameTone(523, 0, 0.20, 0.5, "sine");
    playGameTone(659, 0.20, 0.20, 0.5, "sine");
    playGameTone(784, 0.40, 0.20, 0.5, "sine");
    playGameTone(1047, 0.60, 0.35, 0.5, "sine");

    // 最後加上閃亮的高音
    playGameTone(1318, 0.85, 0.55, 0.5, "sine");
}


// ==========================================
// 載入完成
// ==========================================

console.log("Kids English Adventure 遊戲程式載入成功！");
console.log("目前單字數量：", getVocabularyCount());
