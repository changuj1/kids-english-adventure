
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
    speech.rate = 0.6;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

// ==========================================
// 顯示最終成績
// ==========================================

function showFinalResult() {
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

        <div class="spelling-question">
            <div class="spelling-emoji">📝</div>
            <h2>${word.meaning}</h2>
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
// 錯題複習 Review Mode
// ==========================================

// 開始錯題複習
function startReviewGame() {
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
                 style="width: ${(currentQuestionIndex / currentQuestions.length) * 100}%">
            </div>
        </div>

        <div class="review-question">
            <div class="review-icon">📖</div>
            <h2>記得這個單字嗎？</h2>
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
                showReviewFinalResult();
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
// 載入完成
// ==========================================

console.log("Kids English Adventure 遊戲程式載入成功！");
console.log("目前單字數量：", getVocabularyCount());
