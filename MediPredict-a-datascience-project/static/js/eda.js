// EDA Charts and Visualizations

// Color scheme
const colors = {
    primary: '#14B8A6',
    primaryDark: '#0D9488',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    text: '#9CA3AF',
    grid: '#374151'
};

// Chart.js default configuration
Chart.defaults.color = colors.text;
Chart.defaults.borderColor = '#374151';
Chart.defaults.font.family = "'Inter', sans-serif";

// Age Distribution Chart
function createAgeDistChart() {
    const ctx = document.getElementById('ageDistChart');
    if (!ctx) return;

    // Simulated age distribution data
    const ageRanges = ['18-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90'];
    const ageCounts = [450, 720, 950, 1100, 980, 620, 180];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ageRanges,
            datasets: [{
                label: 'Number of Patients',
                data: ageCounts,
                backgroundColor: colors.primary,
                borderColor: colors.primaryDark,
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    padding: 12,
                    titleColor: colors.primary,
                    bodyColor: colors.text,
                    borderColor: colors.primary,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.grid
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                }
            }
        }
    });
}

// BMI Distribution Chart
function createBMIDistChart() {
    const ctx = document.getElementById('bmiDistChart');
    if (!ctx) return;

    const bmiRanges = ['<18.5', '18.5-24.9', '25-29.9', '30-34.9', '35+'];
    const bmiCounts = [180, 2250, 1750, 650, 170];
    const bmiColors = ['#3B82F6', '#10B981', '#F59E0B', '#FB923C', '#EF4444'];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: bmiRanges,
            datasets: [{
                label: 'BMI Distribution',
                data: bmiCounts,
                backgroundColor: bmiColors,
                borderColor: '#0A0A0A',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    padding: 12,
                    titleColor: colors.primary,
                    bodyColor: colors.text,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} patients (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Blood Pressure Distribution Chart
function createBPDistChart() {
    const ctx = document.getElementById('bpDistChart');
    if (!ctx) return;

    const bpCategories = ['Normal\n(<120/80)', 'Elevated\n(120-129/<80)', 'Stage 1\n(130-139/80-89)', 'Stage 2\n(≥140/90)'];
    const systolicData = [1800, 1100, 1300, 800];
    const diastolicData = [1900, 1000, 1200, 900];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: bpCategories,
            datasets: [
                {
                    label: 'Systolic',
                    data: systolicData,
                    backgroundColor: colors.primary,
                    borderColor: colors.primaryDark,
                    borderWidth: 2,
                    borderRadius: 8
                },
                {
                    label: 'Diastolic',
                    data: diastolicData,
                    backgroundColor: colors.info,
                    borderColor: '#2563EB',
                    borderWidth: 2,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    padding: 12,
                    titleColor: colors.primary,
                    bodyColor: colors.text,
                    borderColor: colors.primary,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: false,
                    grid: {
                        color: colors.grid
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                x: {
                    stacked: false,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                }
            }
        }
    });
}

// Glucose Distribution Chart
function createGlucoseDistChart() {
    const ctx = document.getElementById('glucoseDistChart');
    if (!ctx) return;

    const glucoseRanges = ['<70', '70-99', '100-125', '126-200', '>200'];
    const glucoseCounts = [120, 2850, 1250, 650, 130];
    const glucoseColors = ['#3B82F6', '#10B981', '#F59E0B', '#FB923C', '#EF4444'];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: glucoseRanges,
            datasets: [{
                label: 'Number of Patients',
                data: glucoseCounts,
                backgroundColor: glucoseColors,
                borderColor: glucoseColors.map(c => c),
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    padding: 12,
                    titleColor: colors.primary,
                    bodyColor: colors.text,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${value} patients (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.grid
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                }
            }
        }
    });
}

// Correlation Heatmap
function createCorrelationChart() {
    const ctx = document.getElementById('correlationChart');
    if (!ctx) return;

    const features = ['Age', 'BMI', 'BP Sys', 'BP Dia', 'Glucose', 'Cholesterol', 'Heart Rate'];
    
    // Correlation matrix (simulated medical data correlations)
    const correlationData = [
        [1.00, 0.25, 0.38, 0.35, 0.42, 0.55, 0.15],  // Age
        [0.25, 1.00, 0.68, 0.62, 0.52, 0.45, 0.22],  // BMI
        [0.38, 0.68, 1.00, 0.85, 0.48, 0.52, 0.28],  // BP Systolic
        [0.35, 0.62, 0.85, 1.00, 0.44, 0.48, 0.25],  // BP Diastolic
        [0.42, 0.52, 0.48, 0.44, 1.00, 0.38, 0.18],  // Glucose
        [0.55, 0.45, 0.52, 0.48, 0.38, 1.00, 0.20],  // Cholesterol
        [0.15, 0.22, 0.28, 0.25, 0.18, 0.20, 1.00]   // Heart Rate
    ];

    // Create heatmap data
    const heatmapData = [];
    for (let i = 0; i < features.length; i++) {
        for (let j = 0; j < features.length; j++) {
            heatmapData.push({
                x: features[j],
                y: features[i],
                v: correlationData[i][j]
            });
        }
    }

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Correlation',
                data: heatmapData.map(d => ({x: d.x, y: d.y})),
                backgroundColor: heatmapData.map(d => {
                    const abs = Math.abs(d.v);
                    if (abs >= 0.7) return 'rgba(16, 185, 129, 0.9)';
                    if (abs >= 0.5) return 'rgba(20, 184, 166, 0.7)';
                    if (abs >= 0.3) return 'rgba(245, 158, 11, 0.6)';
                    return 'rgba(107, 114, 128, 0.4)';
                }),
                pointRadius: 15,
                pointHoverRadius: 18
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    padding: 12,
                    titleColor: colors.primary,
                    bodyColor: colors.text,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const dataIndex = context.dataIndex;
                            const correlation = heatmapData[dataIndex].v;
                            return `Correlation: ${correlation.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'category',
                    labels: features,
                    grid: {
                        color: colors.grid
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                y: {
                    type: 'category',
                    labels: features,
                    grid: {
                        color: colors.grid
                    },
                    ticks: {
                        color: colors.text
                    }
                }
            }
        }
    });
}

// Risk Distribution Chart
function createRiskDistChart() {
    const ctx = document.getElementById('riskDistChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Low Risk', 'High Risk'],
            datasets: [{
                data: [3000, 2000],
                backgroundColor: [colors.success, colors.danger],
                borderColor: '#0A0A0A',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    padding: 12,
                    titleColor: colors.primary,
                    bodyColor: colors.text,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} patients (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Age vs Risk Chart
function createAgeRiskChart() {
    const ctx = document.getElementById('ageRiskChart');
    if (!ctx) return;

    const ageGroups = ['18-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90'];
    const lowRiskData = [380, 580, 520, 440, 340, 250, 70];
    const highRiskData = [70, 140, 430, 660, 640, 370, 110];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ageGroups,
            datasets: [
                {
                    label: 'Low Risk',
                    data: lowRiskData,
                    backgroundColor: colors.success,
                    borderColor: '#059669',
                    borderWidth: 2,
                    borderRadius: 8
                },
                {
                    label: 'High Risk',
                    data: highRiskData,
                    backgroundColor: colors.danger,
                    borderColor: '#DC2626',
                    borderWidth: 2,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    padding: 12,
                    titleColor: colors.primary,
                    bodyColor: colors.text,
                    borderColor: colors.primary,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: {
                        color: colors.grid
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                }
            }
        }
    });
}

// Feature Importance Chart
function createFeatureImportanceChart() {
    const ctx = document.getElementById('featureImportanceChart');
    if (!ctx) return;

    const features = ['Glucose', 'BMI', 'Blood Pressure', 'Age', 'Cholesterol', 'Heart Rate', 'Smoking'];
    const importance = [32, 25, 22, 15, 12, 8, 6];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: features,
            datasets: [{
                label: 'Importance (%)',
                data: importance,
                backgroundColor: colors.primary,
                borderColor: colors.primaryDark,
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    padding: 12,
                    titleColor: colors.primary,
                    bodyColor: colors.text,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `Importance: ${context.parsed.x}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 35,
                    grid: {
                        color: colors.grid
                    },
                    ticks: {
                        color: colors.text,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createAgeDistChart();
    createBMIDistChart();
    createBPDistChart();
    createGlucoseDistChart();
    createCorrelationChart();
    createRiskDistChart();
    createAgeRiskChart();
    createFeatureImportanceChart();
});