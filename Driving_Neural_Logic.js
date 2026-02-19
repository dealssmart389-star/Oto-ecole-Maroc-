/**
 * 🛰️ DRIVING AI 2026 | THE NEURAL CORE (Final Integration)
 * محرك مدمج يعالج الصور والبيانات من المصادر الموثوقة
 */

const MasterSystem = {
    config: Object.freeze({
        passingScore: 32,
        totalQuestions: 40,
        initialPoints: 30,
        deduction: 2
    }),

    state: { score: 0, points: 30, index: 0, db: [] },

    async init() {
        try {
            const res = await fetch('questions.json');
            this.state.db = await res.json();
            this.renderQuestion();
        } catch (e) {
            console.error("فشل الاتصال بقاعدة البيانات السيادية");
        }
    },

    renderQuestion() {
        const q = this.state.db[this.state.index];
        const display = document.getElementById('app-display');
        
        // المسار الذكي للصور: يبحث في مجلد assets
        const imgPath = q.img ? q.img : 'assets/placeholder.jpg';

        display.innerHTML = `
            <div class="img-card fade-in">
                <img src="${imgPath}" id="question-image" alt="Driving Scenario" 
                     onerror="this.src='https://via.placeholder.com/400x200?text=جاري_تحميل_الصورة'">
            </div>
            <div class="question-box">
                <h2 id="question-text">${q.q}</h2>
            </div>
            <div class="options-grid">
                ${q.options.map((opt, i) => `
                    <button class="option-btn" onclick="MasterSystem.verify(${i})">
                        <span>${opt}</span>
                    </button>
                `).join('')}
            </div>
        `;
    },

    verify(choice) {
        const isCorrect = choice === this.state.db[this.state.index].answer;
        if (isCorrect) {
            this.state.score++;
        } else {
            this.state.points -= this.config.deduction;
            document.getElementById('score-counter').innerText = `النقاط: ${this.state.points}`;
        }

        this.proceed();
    },

    proceed() {
        this.state.index++;
        if (this.state.index < this.state.db.length && this.state.points > 0) {
            this.renderQuestion();
        } else {
            this.finish();
        }
    },

    finish() {
        // كود عرض النتيجة النهائية
        document.getElementById('app-display').innerHTML = `<h1>النتيجة: ${this.state.score}</h1>`;
    }
};

window.onload = () => MasterSystem.init();
