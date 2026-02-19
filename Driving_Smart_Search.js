 Driving-AI// محرك البحث القوي لـ Driving-AI
const DrivingSearch = {
    async searchViolation(keyword) {
        const response = await fetch('Morocco_Driving_Database.json');
        const db = await response.json();
        
        console.log("🔍 جاري البحث عن: " + keyword);
        
        // دالة للبحث في جميع الدرجات
        const allViolations = [
            ...db.driving_pro_2026.violations_engine.degree_1.examples,
            ...db.driving_pro_2026.violations_engine.degree_2.examples,
            ...db.driving_pro_2026.violations_engine.degree_3.examples
        ];

        const result = allViolations.filter(v => v.includes(keyword));
        this.displayResult(result);
    },

    displayResult(results) {
        const container = document.getElementById('search-results');
        container.innerHTML = results.length > 0 
            ? results.map(r => `<div class="res-card">✅ ${r}</div>`).join('')
            : "<p>❌ لم يتم العثور على مادة : مطابقة</p>";
    }
};
