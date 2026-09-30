// Prediction Form Handler with EDA Visualizations

const form = document.getElementById('predictionForm');
const predictBtn = document.getElementById('predictBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsPanel = document.getElementById('resultsPanel');
const placeholderPanel = document.getElementById('placeholderPanel');
const edaPanel = document.getElementById('edaPanel');

let bmiChart, bpChart, riskFactorChart;

// Form submission handler
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const patientData = {
        age: parseInt(formData.get('age')),
        bmi: parseFloat(formData.get('bmi')),
        bp_systolic: parseInt(formData.get('bp_systolic')),
        bp_diastolic: parseInt(formData.get('bp_diastolic')),
        glucose: parseInt(formData.get('glucose')),
        cholesterol: parseInt(formData.get('cholesterol')),
        heart_rate: parseInt(formData.get('heart_rate')) || 72,
        smoking: formData.get('smoking'),
        family_history: formData.get('family_history')
    };
    
    // Validate data
    if (!validatePatientData(patientData)) {
        alert('Please fill in all required fields with valid values.');
        return;
    }
    
    // Show loading state
    showLoading();
    
    try {
        // Call prediction API
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });
        
        if (!response.ok) {
            throw new Error('Prediction failed');
        }
        
        const result = await response.json();
        
        // Display EDA analysis first
        displayEDAAnalysis(result.patient_data, result.eda_insights);
        
        // Then display AI results
        displayResults(result);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to analyze patient data. Please try again.');
    } finally {
        hideLoading();
    }
});

// Reset form
resetBtn.addEventListener('click', resetForm);

function resetForm() {
    form.reset();
    resultsPanel.style.display = 'none';
    placeholderPanel.style.display = 'block';
    edaPanel.style.display = 'none';
    
    // Destroy existing charts
    if (bmiChart) bmiChart.destroy();
    if (bpChart) bpChart.destroy();
    if (riskFactorChart) riskFactorChart.destroy();
}

// Validate patient data
function validatePatientData(data) {
    if (data.age < 18 || data.age > 120) return false;
    if (data.bmi < 10 || data.bmi > 60) return false;
    if (data.bp_systolic < 70 || data.bp_systolic > 250) return false;
    if (data.bp_diastolic < 40 || data.bp_diastolic > 150) return false;
    if (data.glucose < 50 || data.glucose > 400) return false;
    if (data.cholesterol < 100 || data.cholesterol > 400) return false;
    return true;
}

// Show loading state
function showLoading() {
    predictBtn.disabled = true;
    predictBtn.querySelector('.btn-text').style.display = 'none';
    predictBtn.querySelector('.btn-loader').style.display = 'inline';
}

// Hide loading state
function hideLoading() {
    predictBtn.disabled = false;
    predictBtn.querySelector('.btn-text').style.display = 'inline';
    predictBtn.querySelector('.btn-loader').style.display = 'none';
}

// Display EDA Analysis
function displayEDAAnalysis(patientData, insights) {
    // Show EDA panel
    placeholderPanel.style.display = 'none';
    edaPanel.style.display = 'block';
    
    // Display patient profile metrics
    displayProfileMetrics(patientData, insights);
    
    // Create BMI visualization
    createBMIChart(patientData.bmi, insights.bmi_analysis);
    
    // Create Blood Pressure visualization
    createBPChart(patientData.bp_systolic, patientData.bp_diastolic, insights.bp_analysis);
    
    // Create Multi-Factor Risk Chart
    createRiskFactorChart(patientData, insights);
    
    // Scroll to EDA panel
    edaPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Display Profile Metrics
function displayProfileMetrics(data, insights) {
    const container = document.getElementById('profileMetrics');
    container.innerHTML = '';
    
    const metrics = [
        {
            icon: '🎂',
            label: 'Age',
            value: data.age + ' years',
            status: insights.age_analysis.group,
            color: data.age > 60 ? '#F59E0B' : '#10B981'
        },
        {
            icon: '⚖️',
            label: 'BMI',
            value: data.bmi.toFixed(1),
            status: insights.bmi_analysis.category,
            color: insights.bmi_analysis.color
        },
        {
            icon: '💓',
            label: 'Blood Pressure',
            value: `${data.bp_systolic}/${data.bp_diastolic}`,
            status: insights.bp_analysis.category,
            color: insights.bp_analysis.color
        },
        {
            icon: '🍬',
            label: 'Glucose',
            value: data.glucose + ' mg/dL',
            status: insights.glucose_analysis.category,
            color: insights.glucose_analysis.color
        },
        {
            icon: '🧪',
            label: 'Cholesterol',
            value: data.cholesterol + ' mg/dL',
            status: insights.cholesterol_analysis.category,
            color: insights.cholesterol_analysis.color
        },
        {
            icon: '💗',
            label: 'Heart Rate',
            value: data.heart_rate + ' bpm',
            status: insights.heart_rate_analysis.category,
            color: insights.heart_rate_analysis.color
        }
    ];
    
    metrics.forEach(metric => {
        const metricCard = document.createElement('div');
        metricCard.className = 'profile-metric-card';
        metricCard.style.borderColor = metric.color;
        metricCard.innerHTML = `
            <div class="metric-icon">${metric.icon}</div>
            <div class="metric-label">${metric.label}</div>
            <div class="metric-value" style="color: ${metric.color}">${metric.value}</div>
            <div class="metric-status" style="color: ${metric.color}">${metric.status}</div>
        `;
        container.appendChild(metricCard);
    });
}

// Create BMI Chart
function createBMIChart(userBMI, analysis) {
    const ctx = document.getElementById('liveBMIChart');
    
    if (bmiChart) bmiChart.destroy();
    
    bmiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Underweight\n(<18.5)', 'Normal\n(18.5-24.9)', 'Overweight\n(25-29.9)', 'Obese\n(≥30)', 'Your BMI'],
            datasets: [{
                label: 'BMI Distribution',
                data: [
                    userBMI < 18.5 ? 100 : 15,
                    userBMI >= 18.5 && userBMI < 25 ? 100 : 50,
                    userBMI >= 25 && userBMI < 30 ? 100 : 25,
                    userBMI >= 30 ? 100 : 10,
                    100
                ],
                backgroundColor: [
                    '#F59E0B',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    analysis.color
                ],
                borderColor: [
                    '#F59E0B',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    analysis.color
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: `Your BMI: ${userBMI.toFixed(1)} (${analysis.category})`,
                    color: '#14B8A6',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#9CA3AF' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#9CA3AF', font: { size: 11 } }
                }
            }
        }
    });
    
    // Display insight
    document.getElementById('bmiInsight').innerHTML = `
        <div class="insight-badge" style="background: ${analysis.color}20; border-color: ${analysis.color}">
            <strong>${analysis.status === 'good' ? '✅' : '⚠️'} ${analysis.message}</strong>
            <p>${analysis.recommendation}</p>
        </div>
    `;
}

// Create Blood Pressure Chart
function createBPChart(systolic, diastolic, analysis) {
    const ctx = document.getElementById('liveBPChart');
    
    if (bpChart) bpChart.destroy();
    
    bpChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Normal\n(<120/80)', 'Elevated\n(120-129/<80)', 'Stage 1\n(130-139/80-89)', 'Stage 2\n(≥140/90)', 'Your BP'],
            datasets: [
                {
                    label: 'Systolic',
                    data: [115, 125, 135, 145, systolic],
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Diastolic',
                    data: [75, 78, 85, 95, diastolic],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#9CA3AF' }
                },
                title: {
                    display: true,
                    text: `Your BP: ${systolic}/${diastolic} mmHg (${analysis.category})`,
                    color: '#14B8A6',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 160,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#9CA3AF' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#9CA3AF', font: { size: 11 } }
                }
            }
        }
    });
    
    // Display insight
    document.getElementById('bpInsight').innerHTML = `
        <div class="insight-badge" style="background: ${analysis.color}20; border-color: ${analysis.color}">
            <strong>${analysis.status === 'good' ? '✅' : '⚠️'} ${analysis.message}</strong>
            <p>${analysis.recommendation}</p>
        </div>
    `;
}

// Create Risk Factor Chart
function createRiskFactorChart(data, insights) {
    const ctx = document.getElementById('liveRiskChart');
    
    if (riskFactorChart) riskFactorChart.destroy();
    
    // Calculate risk scores for each metric (0-100)
    const bmiRisk = data.bmi >= 30 ? 90 : data.bmi >= 25 ? 60 : 20;
    const bpRisk = data.bp_systolic >= 140 ? 95 : data.bp_systolic >= 130 ? 70 : data.bp_systolic >= 120 ? 40 : 15;
    const glucoseRisk = data.glucose >= 126 ? 95 : data.glucose >= 100 ? 65 : 20;
    const cholRisk = data.cholesterol >= 240 ? 90 : data.cholesterol >= 200 ? 55 : 25;
    const ageRisk = data.age >= 60 ? 70 : data.age >= 40 ? 40 : 15;
    const hrRisk = data.heart_rate > 100 ? 60 : data.heart_rate < 60 ? 40 : 20;
    
    riskFactorChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['BMI', 'Blood Pressure', 'Glucose', 'Cholesterol', 'Age', 'Heart Rate'],
            datasets: [{
                label: 'Your Risk Profile',
                data: [bmiRisk, bpRisk, glucoseRisk, cholRisk, ageRisk, hrRisk],
                borderColor: '#14B8A6',
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                pointBackgroundColor: '#14B8A6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#14B8A6',
                borderWidth: 3
            },
            {
                label: 'Low Risk Baseline',
                data: [20, 15, 20, 25, 30, 20],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                pointBackgroundColor: '#10B981',
                borderWidth: 2,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#9CA3AF' }
                },
                title: {
                    display: true,
                    text: 'Multi-Factor Risk Assessment',
                    color: '#14B8A6',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 25,
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#9CA3AF',
                        font: { size: 12 }
                    }
                }
            }
        }
    });
    
    // Display comprehensive insight
    const healthScore = insights.comparative_analysis.overall_health_score;
    const metricsInRange = insights.comparative_analysis.metrics_in_normal_range;
    const totalMetrics = insights.comparative_analysis.total_metrics;
    
    document.getElementById('riskInsight').innerHTML = `
        <div class="insight-badge" style="background: ${healthScore >= 70 ? '#10B98120' : healthScore >= 40 ? '#F59E0B20' : '#EF444420'}; border-color: ${healthScore >= 70 ? '#10B981' : healthScore >= 40 ? '#F59E0B' : '#EF4444'}">
            <strong>Overall Health Score: ${healthScore}/100</strong>
            <p>${metricsInRange} out of ${totalMetrics} metrics are in normal range.</p>
            <p>${insights.risk_factors.length > 0 ? '⚠️ Risk Factors: ' + insights.risk_factors.join(', ') : '✅ No major risk factors detected!'}</p>
        </div>
    `;
}

// Display AI Results
function displayResults(analysis) {
    // Show results panel
    resultsPanel.style.display = 'block';
    
    // Set risk badge
    const riskBadge = document.getElementById('riskBadge');
    riskBadge.textContent = analysis.risk_level;
    riskBadge.className = 'risk-badge';
    if (analysis.risk_level === 'Low Risk') {
        riskBadge.classList.add('low-risk');
    } else {
        riskBadge.classList.add('high-risk');
    }
    
    // Animate risk percentage circle
    const riskPercentage = document.getElementById('riskPercentage');
    riskPercentage.textContent = analysis.risk_percentage + '%';
    
    const circle = document.getElementById('riskCircle');
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (analysis.risk_percentage / 100) * circumference;
    
    // Set color based on risk
    if (analysis.risk_percentage < 30) {
        circle.style.stroke = '#10B981';
    } else if (analysis.risk_percentage < 70) {
        circle.style.stroke = '#F59E0B';
    } else {
        circle.style.stroke = '#EF4444';
    }
    
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
    
    // Display primary concerns
    const concernsContainer = document.getElementById('primaryConcerns');
    concernsContainer.innerHTML = '';
    
    if (analysis.primary_concerns && analysis.primary_concerns.length > 0) {
        analysis.primary_concerns.forEach(concern => {
            const concernDiv = document.createElement('div');
            concernDiv.className = 'concern-item';
            concernDiv.textContent = '⚠️ ' + concern;
            concernsContainer.appendChild(concernDiv);
        });
    } else {
        concernsContainer.innerHTML = '<div class="concern-item">✅ No major concerns detected</div>';
    }
    
    // Display detailed analysis
    const detailedAnalysis = document.getElementById('detailedAnalysis');
    detailedAnalysis.innerHTML = '';
    
    if (analysis.detailed_analysis) {
        for (const [key, value] of Object.entries(analysis.detailed_analysis)) {
            const detailDiv = document.createElement('div');
            detailDiv.className = 'analysis-detail';
            detailDiv.innerHTML = `<strong>${formatKey(key)}:</strong> ${value}`;
            detailedAnalysis.appendChild(detailDiv);
        }
    }
    
    // Display recommendations
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '';
    
    if (analysis.recommendations && analysis.recommendations.length > 0) {
        analysis.recommendations.forEach(rec => {
            const recDiv = document.createElement('div');
            recDiv.className = 'recommendation-item';
            recDiv.textContent = '💡 ' + rec;
            recommendationsContainer.appendChild(recDiv);
        });
    }
    
    // Display key factors
    const keyFactorsContainer = document.getElementById('keyFactors');
    keyFactorsContainer.innerHTML = '';
    
    if (analysis.key_factors) {
        // Positive factors
        if (analysis.key_factors.positive && analysis.key_factors.positive.length > 0) {
            const positiveDiv = document.createElement('div');
            positiveDiv.className = 'factor-group';
            positiveDiv.innerHTML = '<h4 style="color: #10B981;">✓ Positive Factors</h4>';
            const factorList = document.createElement('div');
            factorList.className = 'factor-list';
            analysis.key_factors.positive.forEach(factor => {
                const factorItem = document.createElement('div');
                factorItem.className = 'factor-item';
                factorItem.textContent = factor;
                factorList.appendChild(factorItem);
            });
            positiveDiv.appendChild(factorList);
            keyFactorsContainer.appendChild(positiveDiv);
        }
        
        // Negative factors
        if (analysis.key_factors.negative && analysis.key_factors.negative.length > 0) {
            const negativeDiv = document.createElement('div');
            negativeDiv.className = 'factor-group';
            negativeDiv.innerHTML = '<h4 style="color: #EF4444;">✗ Risk Factors</h4>';
            const factorList = document.createElement('div');
            factorList.className = 'factor-list';
            analysis.key_factors.negative.forEach(factor => {
                const factorItem = document.createElement('div');
                factorItem.className = 'factor-item';
                factorItem.textContent = factor;
                factorList.appendChild(factorItem);
            });
            negativeDiv.appendChild(factorList);
            keyFactorsContainer.appendChild(negativeDiv);
        }
    }
    
    // Display explanation
    const explanationContainer = document.getElementById('explanation');
    explanationContainer.textContent = analysis.explanation || 'Analysis complete.';
    
    // Scroll to results
    setTimeout(() => {
        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Format key names
function formatKey(key) {
    return key.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Quick fill functions
function fillLowRisk() {
    document.getElementById('age').value = 35;
    document.getElementById('bmi').value = 22.5;
    document.getElementById('bp_systolic').value = 115;
    document.getElementById('bp_diastolic').value = 75;
    document.getElementById('glucose').value = 90;
    document.getElementById('cholesterol').value = 180;
    document.getElementById('heart_rate').value = 70;
    document.getElementById('smoking').value = 'No';
    document.getElementById('family_history').value = 'No';
}

function fillHighRisk() {
    document.getElementById('age').value = 62;
    document.getElementById('bmi').value = 32.5;
    document.getElementById('bp_systolic').value = 155;
    document.getElementById('bp_diastolic').value = 95;
    document.getElementById('glucose').value = 145;
    document.getElementById('cholesterol').value = 260;
    document.getElementById('heart_rate').value = 88;
    document.getElementById('smoking').value = 'Yes';
    document.getElementById('family_history').value = 'Yes';
}