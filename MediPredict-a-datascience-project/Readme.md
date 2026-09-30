# 🏥 MediPredict - Healthcare Disease Prediction System

**Using Machine Learning for Early Detection**

A Data Science project demonstrating the complete data science lifecycle in healthcare applications.

---

## 📋 Table of Contents

- [Overview](#overview)
- [The Challenge](#the-challenge)
- [Our Objective](#our-objective)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Data Science Process](#data-science-process)
- [Project Structure](#project-structure)
- [Team](#team)
- [Disclaimer](#disclaimer)

---

## 🎯 Overview

MediPredict is a healthcare disease prediction system developed as a Data Science project. It demonstrates the complete data science lifecycle—from data collection to model deployment—using machine learning to predict disease risk from patient health parameters.

### Key Features
- **6 Health Parameters** analyzed (Age, BMI, Blood Pressure, Glucose, Cholesterol, Heart Rate)
- **Real-time Analysis** with instant predictions
- **2 Risk Categories**: Low Risk / High Risk
- **Interactive EDA Dashboard** with Chart.js visualizations
- **Complete Data Science Lifecycle** implementation

---

## 🔍 The Challenge: Late Disease Detection

Healthcare faces three critical challenges that impact patient outcomes:

### 1. **Late Detection** ⚠️
Delayed disease diagnosis significantly increases health risks for patients, often leading to more severe complications and reduced treatment options.

### 2. **Manual Analysis** ⏱️
Traditional manual analysis is time-consuming for doctors dealing with large datasets, creating bottlenecks in patient care and diagnosis.

### 3. **Higher Costs** 💰
Delayed diagnosis leads to significantly increased treatment expenses, placing financial burden on both patients and healthcare systems.

**Our Goal:** Early prediction of disease risk through automated data science analysis.

---

## ✨ Our Objective: Early & Reliable Detection

### Primary Goal
Develop a healthcare disease prediction system using data science for early and reliable detection of disease risk.

### Key Objectives

1. **Collect & Analyze Data**
   - Utilize data science techniques for patient health information
   - Process demographic, clinical, and laboratory data

2. **Apply ML Models**
   - Accurately predict disease risk with machine learning
   - Use Logistic Regression and Decision Trees

3. **Support Doctors**
   - Provide fast, data-driven decision assistance
   - Enable early intervention and preventive care

---

## 🌟 Features

### 📊 Comprehensive EDA Dashboard
- Age distribution analysis
- BMI category breakdown with visualizations
- Blood pressure pattern analysis
- Glucose level distribution
- Cholesterol analysis
- Correlation heatmap
- Risk factor identification
- Feature importance ranking

### 🤖 Disease Risk Prediction
- Real-time health data analysis
- Low/High risk classification
- Risk percentage calculation
- Primary health concerns identification
- Detailed medical analysis
- Personalized health recommendations
- Explainable insights

### 📈 Interactive Visualizations
- Bar charts for BMI distribution
- Line graphs for blood pressure trends
- Radar charts for multi-factor risk assessment
- Patient profile metrics dashboard

---

## 🛠️ Technology Stack

### Frontend
- **HTML5, CSS3, JavaScript**
- Responsive design with modern UI/UX
- Chart.js for interactive visualizations
- Custom animations and transitions

### Backend
- **Flask (Python)**
- RESTful API design
- Data validation and processing
- Session management

### Machine Learning
- **Algorithms**: Logistic Regression, Decision Trees
- **AI Integration**: Groq API with LLaMA 3.3 70B for advanced analysis
- Feature engineering and selection
- Model evaluation metrics

### Data Visualization
- **Chart.js** - Interactive charts
- Real-time data rendering
- Responsive chart design

---

## 📥 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/medipredict.git
cd medipredict
```

### Step 2: Install Dependencies
```bash
pip install flask requests
```

### Step 3: Set Up Environment Variables
Create a `.env` file or set environment variable:
```bash
export GROQ_API_KEY='your-groq-api-key-here'
```

### Step 4: Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

---

## 🚀 Usage

### 1. Access the Application
Open your web browser and navigate to `http://localhost:5000`

### 2. Navigate Through Pages
- **Home**: Overview of the project and challenges
- **EDA Analysis**: Comprehensive data exploration with visualizations
- **Predict**: Enter patient health data for risk prediction
- **About**: Detailed project information

### 3. Using the Prediction Tool

#### Input Required Health Parameters:
- **Age**: 18-120 years
- **BMI**: Body Mass Index (15-50 typical range)
- **Blood Pressure**: Systolic (90-200) / Diastolic (60-130)
- **Glucose**: Blood sugar level (70-250 mg/dL typical)
- **Cholesterol**: Total cholesterol (120-350 mg/dL typical)
- **Heart Rate**: Resting heart rate (50-120 bpm typical)
- **Smoking Status**: Yes/No/Former
- **Family History**: Yes/No

#### Quick Fill Examples:
- **Low Risk Patient**: Age 35, BMI 22.5, BP 115/75, Glucose 90, Cholesterol 180
- **High Risk Patient**: Age 62, BMI 32.5, BP 155/95, Glucose 145, Cholesterol 260

### 4. View Results
- **EDA Analysis**: Real-time visualizations of your health data
- **AI Prediction**: Risk classification, percentage, concerns, and recommendations

---

## 📊 Data Science Process

MediPredict implements the complete 6-step data science lifecycle:

### 1. **Define Problem**
Address late disease detection in healthcare systems

### 2. **Collect & Prepare Data**
- **Sources**: Hospital records, public healthcare datasets
- **Types**: Demographic (Age), Clinical (BMI, BP), Lab Results (Glucose, Cholesterol)

### 3. **Clean & Analyze**
- Handle missing values (fill using mean/median)
- Remove duplicate records
- Correct outliers and inconsistent data
- Convert categories (Yes/No → 1/0)

### 4. **Select Features**
Identify key health parameters:
- Age
- Body Mass Index (BMI)
- Blood Pressure (Systolic/Diastolic)
- Glucose Level
- Cholesterol
- Heart Rate

### 5. **Train & Evaluate**
- Split dataset into training/testing sets
- Apply ML algorithms: Logistic Regression, Decision Trees
- Evaluate using: Accuracy, Precision, Recall, Confusion Matrix

### 6. **Deploy Model**
- Web application deployment with Flask
- Real-time prediction API
- Interactive user interface

---

## 📁 Project Structure

```
medipredict/
│
├── app.py                      # Flask application (main backend)
├── requirements.txt            # Python dependencies
├── README.md                   # Project documentation
│
├── static/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   └── js/
│       ├── main.js            # Homepage scripts
│       ├── eda.js             # EDA dashboard scripts
│       └── predict.js         # Prediction page scripts
│
└── templates/
    ├── index.html             # Homepage
    ├── eda.html               # EDA analysis dashboard
    ├── predict.html           # Prediction tool
    └── about.html             # About page
```

---

## 📊 Exploratory Data Analysis (EDA)

### Visualizations Included:
1. **Age Distribution** - Understanding patient demographics
2. **BMI Categories** - Underweight, Normal, Overweight, Obese breakdown
3. **Blood Pressure Ranges** - Normal, Elevated, Hypertension stages
4. **Glucose Levels** - Normal, Prediabetes, Diabetes ranges
5. **Cholesterol Distribution** - Desirable, Borderline, High categories
6. **Correlation Analysis** - Feature relationships and dependencies
7. **Risk Factor Identification** - Multi-metric assessment

### Key Insights from EDA:
- Higher glucose levels linked to diabetes risk
- Age correlation with disease prevalence
- BMI impact on cardiovascular health
- Blood pressure patterns in high-risk patients

---

## 🤖 Model Development & Evaluation

### Feature Selection
Important health parameters identified through EDA:
- Age (15% importance)
- BMI (25% importance)
- Blood Pressure (22% importance)
- Glucose Level (32% importance - highest)
- Cholesterol (remaining importance)

### Model Building
- **Dataset Split**: 80% training, 20% testing
- **Algorithms Used**:
  - Logistic Regression
  - Decision Trees
  - AI-enhanced analysis (LLaMA 3.3 70B via Groq API)

### Model Evaluation Metrics
- Accuracy
- Precision
- Recall
- Confusion Matrix
- F1 Score

---

## 💡 Plan of Action: From Start to Deployment

### Step 1: Define Problem
Address the critical issue of late disease detection

### Step 2: Collect & Prepare Data
Gather patient health data from multiple sources

### Step 3: Clean & Analyze
Identify patterns through preprocessing and EDA

### Step 4: Select Features
Validate key health parameters for prediction

### Step 5: Train & Evaluate
Build and validate ML models rigorously

### Step 6: Deploy Model
Deploy system for healthcare applications

**Outcome**: System predicts disease risk (Low / High), aiding early diagnosis

---

## 👥 Team

**Data Science Project Team**

| Name | Registration Number | Role |
|------|-------------------|------|
| Animesh Gupta | RA2311026010375 | Project Development |
| Apurva Singh | RA2311026010376 | Project Development |
| Aastha Hotwani | RA2311026010389 | Project Development |
| Harsh Khetan | RA2311026010421 | Project Development |

**Subject**: Data Science

---

## 🎓 Educational Purpose

MediPredict is designed as an **educational prototype** demonstrating:
- Complete data science lifecycle implementation
- Machine learning in healthcare applications
- Interactive data visualization techniques
- Web application development with Flask
- Real-time prediction systems

### What You'll Learn:
- End-to-end data science project development
- Exploratory Data Analysis (EDA) with visualizations
- Machine learning model training and evaluation
- Integration of AI APIs (Groq/LLaMA)
- Building interactive web applications
- Healthcare data analysis and interpretation

---

## ⚕️ Disclaimer

**IMPORTANT**: This is a **prototype system for educational and research purposes only**. 

- This system is NOT intended for actual medical diagnosis or treatment
- Always consult qualified healthcare professionals for medical decisions
- Do not use this tool as a substitute for professional medical advice
- The predictions are for demonstration purposes only
- This is an academic project showcasing data science concepts

---

## 🔒 Privacy & Security

- No patient data is stored permanently
- All data is processed in-memory during the session
- Session data is cleared when browser is closed
- API calls are made securely over HTTPS
- No personal health information is transmitted to third parties

---

## 🚀 Future Enhancements (Potential)

- Additional health metrics integration
- Mobile application development
- Patient history tracking
- Multi-language support
- Enhanced visualization dashboard
- Model performance improvements

---

## 📄 License

This project is developed for educational purposes as part of a Data Science course.

---

## 🙏 Acknowledgments

- Data Science course instructors and mentors
- Open-source community for tools and libraries
- Healthcare professionals for domain knowledge
- Chart.js for visualization capabilities
- Groq for AI API access

---

## 📞 Contact

For questions or feedback about this project:

- **Project Repository**: [GitHub Repository URL]
- **Team Members**: See [Team](#team) section above

---

## 🌟 Empowering Healthcare with Data Science

By combining healthcare data with machine learning, this project demonstrates technology's powerful role in improving patient care and promoting preventive healthcare.

### Key Takeaways:
- **Data Insights**: Meaningful patterns from large datasets
- **Accurate Prediction**: ML models support evidence-based decisions
- **Reduced Risks**: Early detection lowers health risks and costs
- **Doctor Support**: Fast, data-driven decision assistance

---

**Made with ❤️ for Data Science Education**

© 2024 MediPredict Team - Healthcare Disease Prediction Using Machine Learning