// ===============================
// AI Teen Phone Addiction Predictor
// Rewritten Main JS (Guaranteed API connection)
// ===============================

class AddictionPredictor {
    constructor() {
        this.predictBtn = document.getElementById('predict-btn');
        this.resultsPanel = document.getElementById('results-panel');
        this.isLoading = false;

        this.initializeSliders();
        this.predictBtn.addEventListener('click', () => this.handlePrediction());
    }

    initializeSliders() {
        document.querySelectorAll('.slider').forEach(slider => {
            const display = document.getElementById(`${slider.id}-value`);
            if (!display) return;

            const update = () => {
                const val = parseFloat(slider.value);
                display.textContent = ['age', 'phone_checks', 'academic_performance', 'apps_used_daily'].includes(slider.id)
                    ? Math.round(val)
                    : val.toFixed(1);
            };

            update();
            slider.addEventListener('input', update);
        });
    }

    collectFormData() {
        return {
            Age: +document.getElementById('age').value,
            Gender: document.getElementById('gender').value,
            School_Grade: document.getElementById('school_grade').value,
            Daily_Usage_Hours: +document.getElementById('daily_usage').value,
            Sleep_Hours: +document.getElementById('sleep_hours').value,
            Academic_Performance: +document.getElementById('academic_performance').value,
            Social_Interactions: +document.getElementById('social_interactions').value,
            Exercise_Hours: +document.getElementById('exercise_hours').value,
            Anxiety_Level: +document.getElementById('anxiety').value,
            Depression_Level: +document.getElementById('depression').value,
            Self_Esteem: +document.getElementById('self_esteem').value,
            Parental_Control: +document.getElementById('parental_control').value,
            Screen_Time_Before_Bed: +document.getElementById('screen_before_bed').value,
            Phone_Checks_Per_Day: +document.getElementById('phone_checks').value,
            Apps_Used_Daily: +document.getElementById('apps_used_daily').value,
            Time_on_Social_Media: +document.getElementById('time_social_media').value,
            Time_on_Gaming: +document.getElementById('time_gaming').value,
            Time_on_Education: +document.getElementById('time_education').value,
            Phone_Usage_Purpose: document.getElementById('phone_usage_purpose').value,
            Family_Communication: +document.getElementById('family_communication').value,
            Weekend_Usage_Hours: +document.getElementById('weekend_usage').value
        };
    }

    async handlePrediction() {
        if (this.isLoading) return;

        this.setLoading(true);

        try {
            const data = this.collectFormData();
            console.log('📤 Sending data:', data);

            const response = await fetch(`${window.location.origin}/api/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errText}`);
            }

            const result = await response.json().catch(() => {
                throw new Error('❌ Failed to parse JSON response');
            });

            console.log('✅ Response received:', result);
            this.displayResults(result);

        } catch (err) {
            console.error(err);
            alert(`Prediction failed: ${err.message}`);
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(state) {
        this.isLoading = state;
        this.predictBtn.disabled = state;
        this.predictBtn.innerHTML = state
            ? '<i class="fas fa-spinner fa-spin"></i> Analyzing...'
            : '<i class="fas fa-magic"></i> Analyze Addiction Risk';
    }

    displayResults(result) {
        if (!result.success) {
            alert(`❌ API returned failure: ${result.error || 'Unknown error'}`);
            return;
        }

        this.resultsPanel.classList.add('show');
        this.resultsPanel.scrollIntoView({ behavior: 'smooth' });

        document.getElementById('risk-text').textContent = `${(result.risk_probability * 100).toFixed(1)}% Risk`;
        document.getElementById('risk-text').className = `risk-text risk-${result.risk_level.toLowerCase()}`;

        if (typeof window.createRiskGauge === 'function') {
            window.createRiskGauge(result.risk_probability);
        }

        if (typeof window.createImportanceChart === 'function') {
            window.createImportanceChart(result.feature_importance);
        }

        if (typeof window.createMentalHealthChart === 'function') {
            window.createMentalHealthChart({
                anxiety: +document.getElementById('anxiety').value,
                depression: +document.getElementById('depression').value,
                self_esteem: +document.getElementById('self_esteem').value,
                sleep: +document.getElementById('sleep_hours').value,
                social: +document.getElementById('social_interactions').value
            });
        }

        this.showRecommendations(result.recommendations || []);
    }

    showRecommendations(recommendations) {
        const container = document.getElementById('recommendations-container');
        if (!container) return;

        container.innerHTML = recommendations.length === 0
            ? '<p class="no-recommendations">✅ Your habits look healthy!</p>'
            : recommendations.map(r => `
                <div class="recommendation-item priority-${r.priority}">
                    <div class="icon">${r.icon}</div>
                    <div class="title">${r.title}</div>
                    <div class="description">${r.description}</div>
                </div>
            `).join('');
    }
}

// ✅ Boot
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Addiction Predictor JS loaded.');
    new AddictionPredictor();
});
