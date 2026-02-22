// PROJECT: OTO-ECOLE-MAROC SUPREME
// VERSION: 2026.1.0

const SUCCESS_THRESHOLD = 32; // المعيار الوطني للنجاح

class MarocDrivingAI {
    constructor(studentName) {
        this.studentName = studentName;
        this.status = "INITIALIZING_SYSTEM";
    }

    evaluatePerformance(points) {
        console.log(`📡 جاري تحليل أداء المتدرب: ${this.studentName}`);
        if (points >= SUCCESS_THRESHOLD) {
            return `🏁 النتيجة: ناجح بامتياز (${points}/40). أنت فخر للمدرسة!`;
        } else {
            return `⚠️ النتيجة: راسب (${points}/40). الضعف غير مسموح به، أعد التدريب فوراً.`;
        }
    }
}

const candidate = new MarocDrivingAI("Amine_Elite");
console.log(candidate.evaluatePerformance(36));
