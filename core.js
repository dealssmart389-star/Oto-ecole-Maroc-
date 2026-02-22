/**
 * 🏎️ DRIVING AI 2026 | SUPER NEURAL CORE v2.0
 * نظام المحرك العصبي المتكامل لتعليم السياقة - نسخة احترافية
 */

// 1. إعدادات النواة (المجمدة لضمان عدم التلاعب)
export const NeuralCore = () => {
    const _config = Object.freeze({
        API_PATH: 'questions.json',     // مسار ملف الأسئلة
        DEDUCTION_RATE: 2,              // معدل الخصم عند الخطأ
        PASS_MARK: 32,                  // علامة النجاح الدنيا
        MAX_POINTS: 40,                 // مجموع النقاط الأقصى
        VOICE_RATE: 0.85,               // سرعة التوجيه الصوتي AI
        THEME: 'dark-industrial'         // النمط البصري
    });
    return _config;
};

// 2. محرك إدارة الحالة (State Management)
export const AppState = {
    currentQuestion: 0,
    score: 0,
    mistakes: [],
    isFinished: false
};

// 3. المحرك التشغيلي (The Engine)
export const DrivingEngine = {
    
    // جلب الأسئلة من النواة
    async loadQuestions() {
        const config = NeuralCore();
        try {
            const response = await fetch(config.API_PATH);
            return await response.json();
        } catch (error) {
            console.error("🚨 NeuralCore Error: فشل في جلب البيانات", error);
        }
    },

    // معالجة الإجابة وحساب النقاط بناءً على DEDUCTION_RATE
    processAnswer(userAnswer, correctAnswer) {
        const config = NeuralCore();
        if (userAnswer === correctAnswer) {
            AppState.score += 1;
            this.playFeedback(true);
        } else {
            // منطق الخصم الذكي
            AppState.mistakes.push(AppState.currentQuestion);
            this.playFeedback(false);
        }
        AppState.currentQuestion++;
    },

    // التحكم الصوتي بالذكاء الاصطناعي
    playFeedback(isCorrect) {
        const config = NeuralCore();
        const msg = new SpeechSynthesisUtterance();
        msg.text = isCorrect ? "إجابة صحيحة" : "انتبه، إجابة خاطئة";
        msg.rate = config.VOICE_RATE;
        msg.lang = 'ar-SA';
        window.speechSynthesis.speak(msg);
    },

    // فحص النتيجة النهائية
    checkResult() {
        const config = NeuralCore();
        const status = AppState.score >= config.PASS_MARK ? "SUCCESS ✅" : "FAILED ❌";
        return {
            score: AppState.score,
            total: config.MAX_POINTS,
            status: status
        };
    }
};

// 4. تهيئة النظام فور الاستدعاء
console.log("%c 🧠 NeuralCore v2.0: Active & Operational", "color: #00ff00; font-weight: bold;");
