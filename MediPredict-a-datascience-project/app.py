from flask import Flask, render_template, request, jsonify, session
import os
from datetime import datetime
import json
import requests

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this'

# Groq API Configuration
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', 'your-groq-api-key-here')
GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

def generate_eda_insights(patient_data):
    """Generate EDA-style insights for patient data"""
    age = int(patient_data['age'])
    bmi = float(patient_data['bmi'])
    bp_sys = int(patient_data['bp_systolic'])
    bp_dia = int(patient_data['bp_diastolic'])
    glucose = int(patient_data['glucose'])
    cholesterol = int(patient_data['cholesterol'])
    heart_rate = int(patient_data.get('heart_rate', 72))
    
    insights = {
        'bmi_analysis': {},
        'bp_analysis': {},
        'glucose_analysis': {},
        'cholesterol_analysis': {},
        'heart_rate_analysis': {},
        'age_analysis': {},
        'comparative_analysis': {},
        'risk_factors': []
    }
    
    # BMI Analysis
    if bmi < 18.5:
        insights['bmi_analysis'] = {
            'category': 'Underweight',
            'status': 'warning',
            'message': f'Your BMI of {bmi:.1f} is below the healthy range.',
            'recommendation': 'Consider consulting a nutritionist to achieve a healthy weight.',
            'percentile': 10,
            'color': '#F59E0B'
        }
    elif bmi < 25:
        insights['bmi_analysis'] = {
            'category': 'Normal Weight',
            'status': 'good',
            'message': f'Your BMI of {bmi:.1f} is in the healthy range.',
            'recommendation': 'Maintain your current healthy weight through balanced diet and exercise.',
            'percentile': 50,
            'color': '#10B981'
        }
    elif bmi < 30:
        insights['bmi_analysis'] = {
            'category': 'Overweight',
            'status': 'warning',
            'message': f'Your BMI of {bmi:.1f} indicates you are overweight.',
            'recommendation': 'Consider weight management through diet and increased physical activity.',
            'percentile': 70,
            'color': '#F59E0B'
        }
    else:
        insights['bmi_analysis'] = {
            'category': 'Obese',
            'status': 'critical',
            'message': f'Your BMI of {bmi:.1f} is in the obese range.',
            'recommendation': 'Consult a healthcare provider for a comprehensive weight management plan.',
            'percentile': 90,
            'color': '#EF4444'
        }
        insights['risk_factors'].append('High BMI (Obesity)')
    
    # Blood Pressure Analysis
    if bp_sys < 120 and bp_dia < 80:
        insights['bp_analysis'] = {
            'category': 'Normal',
            'status': 'good',
            'message': f'Your blood pressure {bp_sys}/{bp_dia} mmHg is normal.',
            'recommendation': 'Continue healthy lifestyle habits to maintain normal blood pressure.',
            'percentile': 40,
            'color': '#10B981'
        }
    elif bp_sys < 130 and bp_dia < 80:
        insights['bp_analysis'] = {
            'category': 'Elevated',
            'status': 'warning',
            'message': f'Your blood pressure {bp_sys}/{bp_dia} mmHg is elevated.',
            'recommendation': 'Monitor regularly and adopt lifestyle changes to prevent hypertension.',
            'percentile': 60,
            'color': '#F59E0B'
        }
    elif bp_sys < 140 or bp_dia < 90:
        insights['bp_analysis'] = {
            'category': 'Hypertension Stage 1',
            'status': 'warning',
            'message': f'Your blood pressure {bp_sys}/{bp_dia} mmHg indicates Stage 1 hypertension.',
            'recommendation': 'Consult your doctor. Lifestyle changes and possible medication may be needed.',
            'percentile': 80,
            'color': '#F59E0B'
        }
        insights['risk_factors'].append('High Blood Pressure (Hypertension)')
    else:
        insights['bp_analysis'] = {
            'category': 'Hypertension Stage 2',
            'status': 'critical',
            'message': f'Your blood pressure {bp_sys}/{bp_dia} mmHg indicates Stage 2 hypertension.',
            'recommendation': 'Seek immediate medical attention. This requires prompt treatment.',
            'percentile': 95,
            'color': '#EF4444'
        }
        insights['risk_factors'].append('Severe Hypertension')
    
    # Glucose Analysis
    if glucose < 100:
        insights['glucose_analysis'] = {
            'category': 'Normal',
            'status': 'good',
            'message': f'Your glucose level of {glucose} mg/dL is normal.',
            'recommendation': 'Maintain healthy eating habits and regular physical activity.',
            'percentile': 30,
            'color': '#10B981'
        }
    elif glucose < 126:
        insights['glucose_analysis'] = {
            'category': 'Prediabetes',
            'status': 'warning',
            'message': f'Your glucose level of {glucose} mg/dL indicates prediabetes.',
            'recommendation': 'Take action now: lose weight, exercise regularly, and eat healthier to prevent diabetes.',
            'percentile': 65,
            'color': '#F59E0B'
        }
        insights['risk_factors'].append('Prediabetes')
    else:
        insights['glucose_analysis'] = {
            'category': 'Diabetes Range',
            'status': 'critical',
            'message': f'Your glucose level of {glucose} mg/dL is in the diabetes range.',
            'recommendation': 'Consult an endocrinologist immediately. Diabetes management is crucial.',
            'percentile': 90,
            'color': '#EF4444'
        }
        insights['risk_factors'].append('High Glucose (Diabetes Risk)')
    
    # Cholesterol Analysis
    if cholesterol < 200:
        insights['cholesterol_analysis'] = {
            'category': 'Desirable',
            'status': 'good',
            'message': f'Your cholesterol level of {cholesterol} mg/dL is desirable.',
            'recommendation': 'Keep up the good work with a heart-healthy diet.',
            'percentile': 35,
            'color': '#10B981'
        }
    elif cholesterol < 240:
        insights['cholesterol_analysis'] = {
            'category': 'Borderline High',
            'status': 'warning',
            'message': f'Your cholesterol level of {cholesterol} mg/dL is borderline high.',
            'recommendation': 'Reduce saturated fats and increase fiber intake. Monitor regularly.',
            'percentile': 70,
            'color': '#F59E0B'
        }
        insights['risk_factors'].append('Borderline High Cholesterol')
    else:
        insights['cholesterol_analysis'] = {
            'category': 'High',
            'status': 'critical',
            'message': f'Your cholesterol level of {cholesterol} mg/dL is high.',
            'recommendation': 'Consult your doctor. Medication may be necessary along with diet changes.',
            'percentile': 88,
            'color': '#EF4444'
        }
        insights['risk_factors'].append('High Cholesterol')
    
    # Heart Rate Analysis
    if 60 <= heart_rate <= 100:
        insights['heart_rate_analysis'] = {
            'category': 'Normal',
            'status': 'good',
            'message': f'Your resting heart rate of {heart_rate} bpm is normal.',
            'recommendation': 'Your cardiovascular fitness appears good.',
            'color': '#10B981'
        }
    elif heart_rate < 60:
        insights['heart_rate_analysis'] = {
            'category': 'Bradycardia',
            'status': 'warning',
            'message': f'Your heart rate of {heart_rate} bpm is below normal.',
            'recommendation': 'This may be normal if you\'re athletic, but consult a doctor if symptomatic.',
            'color': '#F59E0B'
        }
    else:
        insights['heart_rate_analysis'] = {
            'category': 'Tachycardia',
            'status': 'warning',
            'message': f'Your resting heart rate of {heart_rate} bpm is elevated.',
            'recommendation': 'Consider stress management and cardiovascular exercise. Monitor regularly.',
            'color': '#F59E0B'
        }
    
    # Age Analysis
    if age < 40:
        insights['age_analysis'] = {
            'group': 'Young Adult',
            'message': 'You\'re in a lower-risk age group, but preventive care is important.',
            'baseline_risk': 'Low'
        }
    elif age < 60:
        insights['age_analysis'] = {
            'group': 'Middle-aged Adult',
            'message': 'Age-related disease risk increases. Regular screening is recommended.',
            'baseline_risk': 'Moderate'
        }
    else:
        insights['age_analysis'] = {
            'group': 'Senior Adult',
            'message': 'Higher risk for chronic diseases. Comprehensive health monitoring advised.',
            'baseline_risk': 'Elevated'
        }
        insights['risk_factors'].append('Advanced Age')
    
    # Comparative Analysis
    insights['comparative_analysis'] = {
        'metrics_in_normal_range': sum([
            1 if bmi >= 18.5 and bmi < 25 else 0,
            1 if bp_sys < 120 and bp_dia < 80 else 0,
            1 if glucose < 100 else 0,
            1 if cholesterol < 200 else 0,
            1 if 60 <= heart_rate <= 100 else 0
        ]),
        'total_metrics': 5,
        'overall_health_score': 0
    }
    
    # Calculate overall health score (0-100)
    score = 100
    if bmi >= 30: score -= 20
    elif bmi >= 25: score -= 10
    if bp_sys >= 140: score -= 25
    elif bp_sys >= 130: score -= 15
    if glucose >= 126: score -= 25
    elif glucose >= 100: score -= 15
    if cholesterol >= 240: score -= 15
    elif cholesterol >= 200: score -= 8
    
    insights['comparative_analysis']['overall_health_score'] = max(0, score)
    
    return insights

def analyze_with_groq(patient_data):
    """Use Groq API to analyze patient data and predict disease risk"""
    
    prompt = f"""You are a medical AI assistant specializing in disease risk prediction. 
    
Analyze the following patient health data and provide a comprehensive disease risk assessment:

Patient Data:
- Age: {patient_data['age']} years
- BMI: {patient_data['bmi']}
- Blood Pressure (Systolic/Diastolic): {patient_data['bp_systolic']}/{patient_data['bp_diastolic']} mmHg
- Glucose Level: {patient_data['glucose']} mg/dL
- Cholesterol: {patient_data['cholesterol']} mg/dL
- Heart Rate: {patient_data.get('heart_rate', 'N/A')} bpm
- Smoking Status: {patient_data.get('smoking', 'No')}
- Family History: {patient_data.get('family_history', 'No')}

Provide your analysis in the following JSON format:
{{
    "risk_level": "Low Risk" or "High Risk",
    "risk_percentage": <number between 0-100>,
    "primary_concerns": ["concern1", "concern2", "concern3"],
    "detailed_analysis": {{
        "diabetes_risk": "Low/Medium/High with explanation",
        "cardiovascular_risk": "Low/Medium/High with explanation",
        "general_health": "explanation of overall health status"
    }},
    "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
    "key_factors": {{
        "positive": ["factor1", "factor2"],
        "negative": ["factor1", "factor2"]
    }},
    "explanation": "A clear, patient-friendly explanation of the overall health status and why this risk level was assigned"
}}

Be precise, medical, and provide actionable insights."""

    headers = {
        'Authorization': f'Bearer {GROQ_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'model': 'llama-3.3-70b-versatile',
        'messages': [
            {
                'role': 'system',
                'content': 'You are a medical AI assistant that provides accurate disease risk predictions in JSON format.'
            },
            {
                'role': 'user',
                'content': prompt
            }
        ],
        'temperature': 0.3,
        'max_tokens': 2000
    }
    
    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        
        # Extract the response content
        content = result['choices'][0]['message']['content']
        
        # Try to parse JSON from the content
        if '```json' in content:
            content = content.split('```json')[1].split('```')[0].strip()
        elif '```' in content:
            content = content.split('```')[1].split('```')[0].strip()
        
        analysis = json.loads(content)
        return analysis
        
    except Exception as e:
        print(f"Groq API Error: {str(e)}")
        return generate_fallback_analysis(patient_data)

def generate_fallback_analysis(patient_data):
    """Generate basic analysis if API fails"""
    age = int(patient_data['age'])
    bmi = float(patient_data['bmi'])
    bp_sys = int(patient_data['bp_systolic'])
    glucose = int(patient_data['glucose'])
    cholesterol = int(patient_data['cholesterol'])
    
    risk_score = 0
    concerns = []
    
    if age > 50:
        risk_score += 15
        concerns.append("Age-related health considerations")
    
    if bmi > 30:
        risk_score += 20
        concerns.append("Obesity (BMI > 30)")
    elif bmi > 25:
        risk_score += 10
        concerns.append("Overweight (BMI > 25)")
    
    if bp_sys > 140:
        risk_score += 25
        concerns.append("High blood pressure (Hypertension)")
    elif bp_sys > 120:
        risk_score += 10
        concerns.append("Elevated blood pressure")
    
    if glucose > 125:
        risk_score += 25
        concerns.append("High glucose levels (Diabetes risk)")
    elif glucose > 100:
        risk_score += 10
        concerns.append("Elevated glucose levels")
    
    if cholesterol > 240:
        risk_score += 20
        concerns.append("High cholesterol")
    elif cholesterol > 200:
        risk_score += 10
        concerns.append("Borderline high cholesterol")
    
    risk_level = "High Risk" if risk_score > 40 else "Low Risk"
    
    return {
        "risk_level": risk_level,
        "risk_percentage": min(risk_score, 95),
        "primary_concerns": concerns[:3] if concerns else ["No major concerns detected"],
        "detailed_analysis": {
            "diabetes_risk": f"{'High' if glucose > 125 else 'Medium' if glucose > 100 else 'Low'} - Glucose level at {glucose} mg/dL",
            "cardiovascular_risk": f"{'High' if bp_sys > 140 else 'Medium' if bp_sys > 120 else 'Low'} - Blood pressure at {bp_sys} mmHg",
            "general_health": "Based on the vital signs provided, monitoring recommended"
        },
        "recommendations": [
            "Regular health checkups with your physician",
            "Maintain a balanced diet and regular exercise",
            "Monitor blood pressure and glucose levels regularly"
        ],
        "key_factors": {
            "positive": ["Taking proactive health measures", "Seeking early screening"],
            "negative": concerns if concerns else ["None identified"]
        },
        "explanation": f"Your health profile shows a {risk_level.lower()} based on current vital signs. {' Major concerns include: ' + ', '.join(concerns) if concerns else ' Continue maintaining healthy lifestyle habits.'}"
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict')
def predict_page():
    return render_template('predict.html')

@app.route('/eda')
def eda_page():
    return render_template('eda.html')

@app.route('/about')
def about_page():
    return render_template('about.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['age', 'bmi', 'bp_systolic', 'bp_diastolic', 'glucose', 'cholesterol']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Generate EDA insights
        eda_insights = generate_eda_insights(data)
        
        # Get AI analysis from Groq
        analysis = analyze_with_groq(data)
        
        # Combine both analyses
        combined_result = {
            **analysis,
            'eda_insights': eda_insights,
            'patient_data': data
        }
        
        # Store in session for history
        if 'predictions' not in session:
            session['predictions'] = []
        
        prediction_record = {
            'timestamp': datetime.now().isoformat(),
            'patient_data': data,
            'analysis': combined_result
        }
        
        session['predictions'].append(prediction_record)
        session.modified = True
        
        return jsonify(combined_result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history')
def get_history():
    return jsonify(session.get('predictions', []))

if __name__ == '__main__':
    app.run(debug=True, port=5000)