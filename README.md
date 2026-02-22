/ 💾 حالة الذاكرة الحية
let _state = {
    db: [],
    currentIndex: 0,
    currentPoints: _config.MAX_POINTS,
    totalScore: 0,
    startTime: null,
    userHistory: []
};

// 🎙️ محرك الصوت المطور
const speak = (text) => {
    window.speechSynthesis.cancel(); // إيقاف أي صوت سابق فوراً
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = _config.VOICE_RATE;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
};

return {
    async powerUp() {
        try {
            console.log("🛰️ تفعيل النواة العصبية...");
            const response = await fetch(_config.API_PATH);
            _state.db = await response.json();
            _state.startTime = Date.now();
            this.renderFrame();
            speak("نظام الذكاء الاصطناعي جاهز. تم تحميل قاعدة البيانات السيادية.");
        } catch (error) {
            console.error("❌ فشل في استدعاء النواة:", error);
            speak("خطأ في الاتصال بقاعدة البيانات.");
        }
    },

    renderFrame() {
        const q = _state.db[_state.currentIndex];
        const app = document.getElementById('app-display');
        
        // تصميم زجاجي متطور يعتمد على نسب الـ CSS المبرمجة
        app.innerHTML = `
            <div class="neural-card fade-in">
                <div class="image-wrapper">
                    <img src="${q.img}" id="main-frame" onerror="this.src='https://via.placeholder.com/600x300?text=AI_SCANNING...'">
                    <div class="law-tag">${q.law_ref}</div>
                </div>
                <div class="question-content">
                    <p class="step-indicator">سؤال ${_state.currentIndex + 1} من ${_state.db.length}</p>
                    <h3>${q.q}</h3>
                </div>
                <div class="options-engine">
                    ${q.options.map((opt, i) => `
                        <button class="neural-btn" onclick="NeuralCore.processDecision(${i})">
                            <span class="btn-index">${i + 1}</span>
                            <span class="btn-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        // تفعيل "القوة الوصفية" لكل سؤال
        if(_state.currentIndex === 0) speak(q.q);
    },

    processDecision(choice) {
        const correct = _state.db[_state.currentIndex].answer;
        const isCorrect = (choice === correct);

        if (isCorrect) {
            _state.totalScore++;
            // تأثير صوتي بسيط للنجاح (اختياري)
        } else {
            _state.currentPoints -= _config.DEDUCTION_RATE;
            this.updateBioMetrics();
            speak("انتباه، مخالفة قانونية.");
        }

        this.nextCycle();
    },

    updateBioMetrics() {
        const counter = document.getElementById('score-counter');
        if (counter) {
            counter.innerText = `النقاط الحيوية: ${_state.currentPoints}`;
            counter.classList.add('pulse-red');
        }
    },

    nextCycle() {
        _state.currentIndex++;
        if (_state.currentIndex < _state.db.length && _state.currentPoints > 0) {
            this.renderFrame();
        } else {
            this.terminate();
        }
    },

    terminate() {
        const timeTaken = Math.floor((Date.now() - _state.startTime) / 1000);
        const status = _state.totalScore >= _config.PASS_MARK ? "ناجح بقوة الذكاء" : "تحتاج لمراجعة النواة";
        
        document.getElementById('app-display').innerHTML = `
            <div class="result-matrix fade-in">
                <h2>تحليل الأداء النهائي</h2>
                <div class="stat-grid">
                    <div class="stat-item"><span>النتيجة:</span> <strong>${_state.totalScore}</strong></div>
                    <div class="stat-item"><span>الوقت:</span> <strong>${timeTaken} ثانية</strong></div>
                </div>
                <h3 class="${_state.totalScore >= _config.PASS_MARK ? 'success' : 'fail'}">${status}</h3>
                <button class="neural-btn" onclick="location.reload()">إعادة تشغيل النظام</button>
            </div>
        `;
        speak(`انتهى الاختبار. نتيجتك هي ${_state.totalScore}. ${status}`);
    }
}
