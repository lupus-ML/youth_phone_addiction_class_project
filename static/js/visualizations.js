// ===========================================
// Visualizations.js — Final Boss Edition
// AI Teen Phone Addiction Predictor
// ===========================================

// Global chart instances
let importanceChart = null;
let mentalHealthChart = null;

// ===========================================
// RISK GAUGE (D3.js)
// ===========================================
function createRiskGauge(riskProbability) {
    d3.select("#risk-gauge").selectAll("*").remove();

    const width = 220;
    const height = 120;
    const radius = 90;

    const svg = d3.select("#risk-gauge")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height})`);

    const getColor = (risk) => {
        if (risk < 0.3) return "#00ff88";
        if (risk < 0.7) return "#ffaa00";
        return "#ff3366";
    };

    const arc = d3.arc()
        .innerRadius(radius - 10)
        .outerRadius(radius)
        .startAngle(-Math.PI / 2)
        .endAngle(-Math.PI / 2 + (Math.PI * riskProbability));

    g.append("path")
        .datum({ endAngle: -Math.PI / 2 })
        .style("fill", getColor(riskProbability))
        .style("filter", `drop-shadow(0 0 10px ${getColor(riskProbability)})`)
        .attr("d", arc)
        .transition()
        .duration(1500)
        .attrTween("d", function (d) {
            const interpolate = d3.interpolate(d.endAngle, -Math.PI / 2 + (Math.PI * riskProbability));
            return function (t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        });

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-1.2em")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("fill", getColor(riskProbability))
        .text(`${(riskProbability * 100).toFixed(1)}%`);

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "1.5em")
        .style("font-size", "14px")
        .style("fill", "#aaa")
        .text("Addiction Risk");
}

// ===========================================
// FEATURE IMPORTANCE CHART (Chart.js)
// ===========================================
function createImportanceChart(importanceData) {
    const ctx = document.getElementById('importance-chart');
    if (!ctx) return;

    if (importanceChart) importanceChart.destroy();

    const labels = importanceData.map(item =>
        item.feature.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()
    );
    const values = importanceData.map(item => item.importance);

    importanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Feature Importance',
                data: values,
                backgroundColor: '#8a2be2',
                borderColor: '#ba55d3',
                borderWidth: 1,
                barThickness: 24,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: 20 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    titleColor: '#ba55d3',
                    bodyColor: '#ffffff',
                    borderColor: '#ba55d3',
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => `Importance: ${(ctx.parsed.x * 100).toFixed(1)}%`
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(138, 43, 226, 0.2)' },
                    ticks: {
                        color: '#ffffff',
                        font: { size: 14 },
                        callback: value => (value * 100).toFixed(0) + '%'
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: {
                        color: '#ffffff',
                        font: { size: 14 }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// ===========================================
// MENTAL HEALTH RADAR (Chart.js)
// ===========================================
function createMentalHealthChart(mentalData) {
    const ctx = document.getElementById('mental-health-chart');
    if (!ctx) return;

    if (mentalHealthChart) mentalHealthChart.destroy();

    if (!mentalData) {
        mentalData = {
            sleep: parseFloat(document.getElementById('sleep_hours')?.value || 7),
            social: parseFloat(document.getElementById('social_interactions')?.value || 5),
            self_esteem: parseFloat(document.getElementById('self_esteem')?.value || 7),
            anxiety: parseFloat(document.getElementById('anxiety')?.value || 5),
            depression: parseFloat(document.getElementById('depression')?.value || 5)
        };
    }

    mentalHealthChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Sleep Quality',
                'Social Life',
                'Self Esteem',
                'Low Anxiety',
                'Low Depression'
            ],
            datasets: [{
                label: 'Mental Health Profile',
                data: [
                    mentalData.sleep * 1.25,
                    mentalData.social,
                    mentalData.self_esteem,
                    10 - mentalData.anxiety,
                    10 - mentalData.depression
                ],
                backgroundColor: 'rgba(138, 43, 226, 0.2)',
                borderColor: '#ea00ff',
                borderWidth: 2,
                pointBackgroundColor: '#ea00ff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    angleLines: { color: 'rgba(138, 43, 226, 0.3)' },
                    grid: { color: 'rgba(138, 43, 226, 0.2)' },
                    pointLabels: {
                        color: '#ffffff',
                        font: { size: 13 }
                    },
                    ticks: {
                        color: '#888',
                        showLabelBackdrop: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    });
}

// ✅ Export functions
window.createRiskGauge = createRiskGauge;
window.createImportanceChart = createImportanceChart;
window.createMentalHealthChart = createMentalHealthChart;

console.log('✅ Visualizations loaded and aestheticized 🎨');
