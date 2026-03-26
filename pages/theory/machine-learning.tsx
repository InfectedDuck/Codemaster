import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const MachineLearningPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'problem-definition', title: 'Problem Definition', icon: '🎯' },
    { id: 'data-preprocessing', title: 'Data Preprocessing', icon: '🧹' },
    { id: 'feature-engineering', title: 'Feature Engineering', icon: '⚙️' },
    { id: 'model-training', title: 'Model Training', icon: '🤖' },
    { id: 'model-evaluation', title: 'Model Evaluation', icon: '📊' },
    { id: 'model-deployment', title: 'Model Deployment', icon: '🚀' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    problemDefinition: `# Machine Learning Problem Definition

# 1. Define the Problem Type
# Classification: Predict categories (spam/not spam, cat/dog)
# Regression: Predict continuous values (price, temperature)
# Clustering: Group similar data points

# Example: House Price Prediction (Regression)
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Load and explore data
data = pd.read_csv('house_prices.csv')
print("Dataset shape:", data.shape)
print("\\nFirst 5 rows:")
print(data.head())

print("\\nDataset info:")
print(data.info())

print("\\nMissing values:")
print(data.isnull().sum())

print("\\nTarget variable statistics:")
print(data['price'].describe())

# Define features and target
features = ['bedrooms', 'bathrooms', 'sqft_living', 'sqft_lot', 'floors']
X = data[features]
y = data['price']

print(f"\\nFeatures shape: {X.shape}")
print(f"Target shape: {y.shape}")`,

    dataPreprocessing: `# Data Preprocessing Pipeline

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Sample dataset with missing values and mixed data types
data = {
    'age': [25, 30, np.nan, 35, 28, 45, np.nan, 33],
    'income': [50000, 60000, 55000, np.nan, 52000, 80000, 75000, 58000],
    'education': ['Bachelor', 'Master', 'PhD', 'Bachelor', np.nan, 'Master', 'PhD', 'Bachelor'],
    'city': ['NYC', 'LA', 'Chicago', 'NYC', 'LA', 'Chicago', 'NYC', 'LA'],
    'target': [0, 1, 1, 0, 0, 1, 1, 0]
}

df = pd.DataFrame(data)
print("Original data:")
print(df)

# Separate features and target
X = df.drop('target', axis=1)
y = df['target']

# Identify column types
numeric_features = ['age', 'income']
categorical_features = ['education', 'city']

# Create preprocessing pipelines
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='unknown')),
    ('onehot', OneHotEncoder(drop='first', sparse=False))
])

# Combine preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ]
)

# Apply preprocessing
X_processed = preprocessor.fit_transform(X)
print(f"\\nProcessed data shape: {X_processed.shape}")
print("Processed data (first 3 rows):")
print(X_processed[:3])

# Get feature names after preprocessing
feature_names = (numeric_features + 
                list(preprocessor.named_transformers_['cat']
                    .named_steps['onehot']
                    .get_feature_names_out(categorical_features)))
print(f"\\nFeature names: {feature_names}")`,

    featureEngineering: `# Feature Engineering Techniques

import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.feature_selection import SelectKBest, f_regression, RFE
from sklearn.ensemble import RandomForestRegressor

# Sample real estate dataset
data = {
    'bedrooms': [3, 4, 2, 5, 3, 4, 2, 3],
    'bathrooms': [2, 3, 1, 4, 2, 3, 2, 2],
    'sqft_living': [1500, 2000, 800, 3000, 1200, 2500, 1000, 1800],
    'sqft_lot': [5000, 6000, 3000, 8000, 4000, 7000, 3500, 5500],
    'floors': [1, 2, 1, 2, 1, 2, 1, 2],
    'year_built': [1990, 2005, 1980, 2010, 1995, 2000, 1985, 1998],
    'price': [300000, 450000, 200000, 700000, 250000, 550000, 220000, 380000]
}

df = pd.DataFrame(data)

# 1. Create new features
print("Creating new features...")

# Feature ratios
df['price_per_sqft'] = df['price'] / df['sqft_living']
df['bathroom_bedroom_ratio'] = df['bathrooms'] / df['bedrooms']
df['living_lot_ratio'] = df['sqft_living'] / df['sqft_lot']

# Age of house
current_year = 2023
df['house_age'] = current_year - df['year_built']

# Binning continuous variables
df['size_category'] = pd.cut(df['sqft_living'], 
                            bins=[0, 1000, 2000, float('inf')], 
                            labels=['Small', 'Medium', 'Large'])

# Log transformation for skewed data
df['log_price'] = np.log(df['price'])
df['log_sqft'] = np.log(df['sqft_living'])

print("New features created:")
print(df.columns.tolist())

# 2. Polynomial features
X_basic = df[['bedrooms', 'bathrooms', 'sqft_living']].values
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X_basic)

print(f"\\nOriginal features: {X_basic.shape[1]}")
print(f"Polynomial features: {X_poly.shape[1]}")
print("Polynomial feature names:")
print(poly.get_feature_names_out(['bedrooms', 'bathrooms', 'sqft_living']))

# 3. Feature selection
X = df[['bedrooms', 'bathrooms', 'sqft_living', 'sqft_lot', 'floors', 
        'house_age', 'price_per_sqft', 'bathroom_bedroom_ratio']]
y = df['price']

# Statistical feature selection
selector = SelectKBest(score_func=f_regression, k=5)
X_selected = selector.fit_transform(X, y)

print(f"\\nSelected features:")
selected_features = X.columns[selector.get_support()]
print(selected_features.tolist())

# Feature importance using Random Forest
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X, y)

feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)

print(f"\\nFeature importance:")
print(feature_importance)`,

    modelTraining: `# Model Training and Selection

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Sample dataset
np.random.seed(42)
n_samples = 1000
X = np.random.randn(n_samples, 5)
y = 2*X[:, 0] + 3*X[:, 1] - X[:, 2] + 0.5*X[:, 3] + np.random.randn(n_samples)*0.1

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training set size: {X_train.shape}")
print(f"Test set size: {X_test.shape}")

# 1. Train multiple models
models = {
    'Linear Regression': LinearRegression(),
    'Ridge Regression': Ridge(),
    'Lasso Regression': Lasso(),
    'Random Forest': RandomForestRegressor(random_state=42),
    'Gradient Boosting': GradientBoostingRegressor(random_state=42),
    'SVM': SVR()
}

# Train and evaluate models
results = {}
for name, model in models.items():
    print(f"\\nTraining {name}...")
    
    # Cross-validation scores
    cv_scores = cross_val_score(model, X_train, y_train, cv=5, 
                               scoring='neg_mean_squared_error')
    cv_rmse = np.sqrt(-cv_scores)
    
    # Train on full training set
    model.fit(X_train, y_train)
    
    # Predictions
    y_pred = model.predict(X_test)
    
    # Metrics
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)
    
    results[name] = {
        'cv_rmse_mean': cv_rmse.mean(),
        'cv_rmse_std': cv_rmse.std(),
        'test_rmse': rmse,
        'test_r2': r2
    }
    
    print(f"CV RMSE: {cv_rmse.mean():.4f} (+/- {cv_rmse.std() * 2:.4f})")
    print(f"Test RMSE: {rmse:.4f}")
    print(f"Test R²: {r2:.4f}")

# 2. Hyperparameter tuning for best model
print("\\n" + "="*50)
print("HYPERPARAMETER TUNING")
print("="*50)

# Random Forest tuning
rf_params = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

rf_grid = GridSearchCV(RandomForestRegressor(random_state=42), 
                       rf_params, cv=5, scoring='neg_mean_squared_error',
                       n_jobs=-1, verbose=1)
rf_grid.fit(X_train, y_train)

print(f"\\nBest Random Forest parameters:")
print(rf_grid.best_params_)
print(f"Best CV score: {np.sqrt(-rf_grid.best_score_):.4f}")

# Test the tuned model
best_rf = rf_grid.best_estimator_
y_pred_tuned = best_rf.predict(X_test)
tuned_rmse = np.sqrt(mean_squared_error(y_test, y_pred_tuned))
tuned_r2 = r2_score(y_test, y_pred_tuned)

print(f"Tuned model test RMSE: {tuned_rmse:.4f}")
print(f"Tuned model test R²: {tuned_r2:.4f}")

# 3. Model comparison
print("\\n" + "="*50)
print("MODEL COMPARISON SUMMARY")
print("="*50)

comparison_df = pd.DataFrame(results).T
comparison_df = comparison_df.sort_values('test_rmse')
print(comparison_df.round(4))`,

    modelEvaluation: `# Model Evaluation and Validation

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, learning_curve, validation_curve
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import cross_validate
import warnings
warnings.filterwarnings('ignore')

# Generate sample data
np.random.seed(42)
n_samples = 1000
X = np.random.randn(n_samples, 8)
y = (2*X[:, 0] + 3*X[:, 1] - X[:, 2] + 0.5*X[:, 3] + 
     np.random.randn(n_samples)*0.2)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 1. Basic Evaluation Metrics
y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("BASIC EVALUATION METRICS")
print("="*40)
print(f"Mean Squared Error (MSE): {mse:.4f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.4f}")
print(f"Mean Absolute Error (MAE): {mae:.4f}")
print(f"R-squared (R²): {r2:.4f}")

# 2. Cross-Validation
print("\\nCROSS-VALIDATION RESULTS")
print("="*40)

cv_results = cross_validate(model, X_train, y_train, cv=5,
                           scoring=['neg_mean_squared_error', 'neg_mean_absolute_error', 'r2'],
                           return_train_score=True)

for metric in ['neg_mean_squared_error', 'neg_mean_absolute_error', 'r2']:
    train_scores = cv_results[f'train_{metric}']
    val_scores = cv_results[f'test_{metric}']
    
    print(f"\\n{metric.upper()}:")
    print(f"  Train: {train_scores.mean():.4f} (+/- {train_scores.std() * 2:.4f})")
    print(f"  Validation: {val_scores.mean():.4f} (+/- {val_scores.std() * 2:.4f})")

# 3. Residual Analysis
print("\\nRESIDUAL ANALYSIS")
print("="*40)

residuals = y_test - y_pred

# Residual statistics
print(f"Residual mean: {residuals.mean():.4f}")
print(f"Residual std: {residuals.std():.4f}")
print(f"Residual min: {residuals.min():.4f}")
print(f"Residual max: {residuals.max():.4f}")

# Check for patterns in residuals
residual_stats = {
    'Shapiro-Wilk p-value': 'Use scipy.stats.shapiro(residuals)[1]',
    'Durbin-Watson statistic': 'Use statsmodels for autocorrelation test'
}

# 4. Feature Importance
print("\\nFEATURE IMPORTANCE")
print("="*40)

if hasattr(model, 'feature_importances_'):
    importance_df = pd.DataFrame({
        'feature': [f'Feature_{i}' for i in range(X.shape[1])],
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print(importance_df)

# 5. Learning Curves
print("\\nLEARNING CURVE ANALYSIS")
print("="*40)

train_sizes, train_scores, val_scores = learning_curve(
    model, X_train, y_train, cv=5, 
    train_sizes=np.linspace(0.1, 1.0, 10),
    scoring='neg_mean_squared_error'
)

train_rmse = np.sqrt(-train_scores)
val_rmse = np.sqrt(-val_scores)

print("Training sizes and corresponding RMSE:")
for i, size in enumerate(train_sizes):
    print(f"Size: {size:4.0f}, Train RMSE: {train_rmse[i].mean():.4f}, "
          f"Val RMSE: {val_rmse[i].mean():.4f}")

# 6. Prediction Error Analysis
print("\\nPREDICTION ERROR ANALYSIS")
print("="*40)

# Percentage errors
percentage_errors = np.abs((y_test - y_pred) / y_test) * 100
print(f"Mean Absolute Percentage Error: {percentage_errors.mean():.2f}%")
print(f"Median Absolute Percentage Error: {np.median(percentage_errors):.2f}%")

# Error distribution
error_bins = [0, 5, 10, 20, float('inf')]
error_labels = ['<5%', '5-10%', '10-20%', '>20%']
error_distribution = pd.cut(percentage_errors, bins=error_bins, labels=error_labels)
print("\\nError Distribution:")
print(error_distribution.value_counts(normalize=True) * 100)`,

    modelDeployment: `# Model Deployment and Production

import pickle
import joblib
import json
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import os
from datetime import datetime

# 1. Model Serialization and Saving
print("MODEL SERIALIZATION")
print("="*40)

# Train a sample model
np.random.seed(42)
X_train = np.random.randn(1000, 5)
y_train = 2*X_train[:, 0] + 3*X_train[:, 1] + np.random.randn(1000)*0.1

# Create a pipeline with preprocessing and model
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestRegressor(n_estimators=100, random_state=42))
])

pipeline.fit(X_train, y_train)

# Save model using different methods
model_dir = 'saved_models'
os.makedirs(model_dir, exist_ok=True)

# Method 1: Pickle
with open(f'{model_dir}/model_pickle.pkl', 'wb') as f:
    pickle.dump(pipeline, f)

# Method 2: Joblib (recommended for scikit-learn)
joblib.dump(pipeline, f'{model_dir}/model_joblib.pkl')

print("Models saved successfully!")

# Save model metadata
metadata = {
    'model_type': 'RandomForestRegressor',
    'features': ['feature_1', 'feature_2', 'feature_3', 'feature_4', 'feature_5'],
    'target': 'target_variable',
    'training_date': datetime.now().isoformat(),
    'model_version': '1.0',
    'performance_metrics': {
        'train_r2': float(pipeline.score(X_train, y_train)),
        'n_samples': len(X_train)
    }
}

with open(f'{model_dir}/model_metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

# 2. Model Loading and Prediction Function
print("\\nMODEL LOADING AND PREDICTION")
print("="*40)

def load_model(model_path):
    """Load a trained model from disk"""
    try:
        model = joblib.load(model_path)
        print(f"Model loaded successfully from {model_path}")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def predict_single(model, features, feature_names=None):
    """Make prediction for a single sample"""
    if feature_names:
        features_df = pd.DataFrame([features], columns=feature_names)
        prediction = model.predict(features_df)
    else:
        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)
    
    return prediction[0]

def predict_batch(model, features_df):
    """Make predictions for multiple samples"""
    predictions = model.predict(features_df)
    return predictions

# Load and test the model
loaded_model = load_model(f'{model_dir}/model_joblib.pkl')

if loaded_model:
    # Test prediction
    test_features = [1.0, -0.5, 0.8, -1.2, 0.3]
    prediction = predict_single(loaded_model, test_features)
    print(f"Test prediction: {prediction:.4f}")

# 3. REST API for Model Serving (Flask example)
print("\\nFLASK API EXAMPLE")
print("="*40)

flask_api_code = '''
from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)

# Load model at startup
model = joblib.load('saved_models/model_joblib.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate input
        if 'features' not in data:
            return jsonify({'error': 'Missing features'}), 400
        
        features = data['features']
        
        # Make prediction
        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)[0]
        
        # Return prediction
        return jsonify({
            'prediction': float(prediction),
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
'''

print("Flask API code:")
print(flask_api_code)

# 4. Model Monitoring and Logging
print("\\nMODEL MONITORING")
print("="*40)

class ModelMonitor:
    def __init__(self, model, log_file='model_predictions.log'):
        self.model = model
        self.log_file = log_file
        self.prediction_count = 0
    
    def predict_and_log(self, features, actual=None):
        """Make prediction and log the result"""
        prediction = self.model.predict(features.reshape(1, -1))[0]
        self.prediction_count += 1
        
        # Log prediction
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'prediction_id': self.prediction_count,
            'features': features.tolist(),
            'prediction': float(prediction),
            'actual': float(actual) if actual is not None else None
        }
        
        # Write to log file
        with open(self.log_file, 'a') as f:
            f.write(json.dumps(log_entry) + '\\n')
        
        return prediction
    
    def get_prediction_stats(self):
        """Get basic statistics about predictions"""
        return {
            'total_predictions': self.prediction_count,
            'model_type': type(self.model).__name__
        }

# Example usage
if loaded_model:
    monitor = ModelMonitor(loaded_model)
    
    # Make some monitored predictions
    for i in range(3):
        test_features = np.random.randn(5)
        pred = monitor.predict_and_log(test_features)
        print(f"Monitored prediction {i+1}: {pred:.4f}")
    
    print(f"Monitoring stats: {monitor.get_prediction_stats()}")

print("\\nDeployment checklist:")
print("✓ Model serialization and saving")
print("✓ Model loading and prediction functions")
print("✓ REST API endpoint design")
print("✓ Monitoring and logging setup")
print("✓ Error handling and validation")`,

    practice: `# Complete Machine Learning Project Practice

# Project: Predicting House Prices
# Dataset: Real estate data with multiple features
# Goal: Build, evaluate, and deploy a regression model

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import joblib

print("MACHINE LEARNING PROJECT PRACTICE")
print("="*50)

# TODO: Complete the following tasks

# 1. Data Collection and Exploration
print("\\n1. DATA COLLECTION AND EXPLORATION")
print("-" * 40)

# Create sample dataset
np.random.seed(42)
n_samples = 1000

data = {
    'bedrooms': np.random.randint(1, 6, n_samples),
    'bathrooms': np.random.randint(1, 4, n_samples),
    'sqft_living': np.random.randint(500, 4000, n_samples),
    'sqft_lot': np.random.randint(1000, 10000, n_samples),
    'floors': np.random.uniform(1, 3, n_samples),
    'age': np.random.randint(0, 100, n_samples),
    'grade': np.random.randint(1, 13, n_samples)
}

# Generate target variable with some noise
data['price'] = (
    data['bedrooms'] * 50000 +
    data['bathrooms'] * 30000 +
    data['sqft_living'] * 100 +
    data['grade'] * 25000 +
    np.random.normal(0, 50000, n_samples)
)

df = pd.DataFrame(data)

print("Dataset created!")
print(f"Shape: {df.shape}")
print("\\nFirst 5 rows:")
print(df.head())

# TODO: Add your own data exploration
# - Check for missing values
# - Analyze distributions
# - Look for correlations
# - Identify outliers

# 2. Data Preprocessing
print("\\n2. DATA PREPROCESSING")
print("-" * 40)

# Separate features and target
X = df.drop('price', axis=1)
y = df['price']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training set: {X_train.shape}")
print(f"Test set: {X_test.shape}")

# TODO: Complete preprocessing steps
# - Handle missing values
# - Feature scaling
# - Feature engineering
# - Feature selection

# 3. Model Training and Selection
print("\\n3. MODEL TRAINING AND SELECTION")
print("-" * 40)

# Train baseline model
baseline_model = RandomForestRegressor(random_state=42)
baseline_model.fit(X_train, y_train)

y_pred_baseline = baseline_model.predict(X_test)
baseline_rmse = np.sqrt(mean_squared_error(y_test, y_pred_baseline))
baseline_r2 = r2_score(y_test, y_pred_baseline)

print(f"Baseline Model:")
print(f"  RMSE: {baseline_rmse:.2f}")
print(f"  R²: {baseline_r2:.4f}")

# TODO: Try different models
# - Linear Regression
# - Ridge/Lasso
# - Gradient Boosting
# - SVM
# Compare their performance

# 4. Hyperparameter Tuning
print("\\n4. HYPERPARAMETER TUNING")
print("-" * 40)

# Example hyperparameter tuning for Random Forest
param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5]
}

grid_search = GridSearchCV(
    RandomForestRegressor(random_state=42),
    param_grid,
    cv=3,
    scoring='neg_mean_squared_error',
    n_jobs=-1
)

print("Running grid search...")
grid_search.fit(X_train, y_train)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV score: {np.sqrt(-grid_search.best_score_):.2f}")

# TODO: Tune other models and compare results

# 5. Model Evaluation
print("\\n5. MODEL EVALUATION")
print("-" * 40)

best_model = grid_search.best_estimator_
y_pred_tuned = best_model.predict(X_test)

tuned_rmse = np.sqrt(mean_squared_error(y_test, y_pred_tuned))
tuned_r2 = r2_score(y_test, y_pred_tuned)

print(f"Tuned Model:")
print(f"  RMSE: {tuned_rmse:.2f}")
print(f"  R²: {tuned_r2:.4f}")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': best_model.feature_importances_
}).sort_values('importance', ascending=False)

print(f"\\nTop 5 Important Features:")
print(feature_importance.head())

# TODO: Complete evaluation
# - Cross-validation
# - Learning curves
# - Residual analysis
# - Error analysis by segments

# 6. Model Deployment
print("\\n6. MODEL DEPLOYMENT")
print("-" * 40)

# Save the model
model_filename = 'house_price_model.pkl'
joblib.dump(best_model, model_filename)
print(f"Model saved as {model_filename}")

# Create prediction function
def predict_house_price(bedrooms, bathrooms, sqft_living, sqft_lot, floors, age, grade):
    """Predict house price given features"""
    features = np.array([[bedrooms, bathrooms, sqft_living, sqft_lot, floors, age, grade]])
    prediction = best_model.predict(features)[0]
    return prediction

# Test the prediction function
test_prediction = predict_house_price(3, 2, 1500, 5000, 1.5, 20, 7)
print(f"\\nTest prediction: \\$\\{test_prediction:,.2f\\}")

# TODO: Complete deployment tasks
# - Create REST API
# - Add input validation
# - Implement monitoring
# - Create documentation
# - Set up automated retraining

print("\\n" + "="*50)
print("PROJECT COMPLETION CHECKLIST")
print("="*50)
print("□ Data collection and cleaning")
print("□ Exploratory data analysis")
print("□ Feature engineering")
print("□ Model selection and training")
print("□ Hyperparameter tuning")
print("□ Model evaluation and validation")
print("□ Error analysis")
print("□ Model deployment")
print("□ Monitoring setup")
print("□ Documentation")

print("\\nNext steps:")
print("1. Complete all TODO sections")
print("2. Try advanced techniques (ensemble methods, feature selection)")
print("3. Deploy to cloud platform (AWS, Azure, GCP)")
print("4. Set up CI/CD pipeline")
print("5. Implement A/B testing for model versions")`
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🤖 Machine Learning Project</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Welcome to the comprehensive Machine Learning module! Build complete machine learning models from data 
                  preprocessing to deployment using scikit-learn. Learn feature engineering, model evaluation, and best 
                  practices for production ML systems.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 What You'll Learn</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• ML problem definition and approach</li>
                      <li>• Data preprocessing and cleaning</li>
                      <li>• Feature engineering techniques</li>
                      <li>• Model training and selection</li>
                      <li>• Model evaluation and validation</li>
                      <li>• Production deployment strategies</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">⏱️ Project Details</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Duration:</strong> 200 minutes</li>
                      <li>• <strong>Level:</strong> Projects</li>
                      <li>• <strong>Prerequisites:</strong> Python, NumPy, Pandas</li>
                      <li>• <strong>Libraries:</strong> scikit-learn, pandas</li>
                      <li>• <strong>Outcome:</strong> Deployed ML model</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'problem-definition':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Problem Definition</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Learn to properly define machine learning problems and understand different types of ML tasks.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.problemDefinition}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🔍 Problem Types:</h4>
                  <ul className="text-blue-800 space-y-1">
                    <li>• <strong>Classification:</strong> Predict discrete categories</li>
                    <li>• <strong>Regression:</strong> Predict continuous values</li>
                    <li>• <strong>Clustering:</strong> Group similar data points</li>
                    <li>• <strong>Dimensionality Reduction:</strong> Reduce feature space</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'data-preprocessing':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🧹 Data Preprocessing</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Master data cleaning, transformation, and preparation techniques for machine learning.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.dataPreprocessing}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🧼 Preprocessing Steps:</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• Handle missing values appropriately</li>
                    <li>• Scale numerical features</li>
                    <li>• Encode categorical variables</li>
                    <li>• Remove or treat outliers</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'feature-engineering':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">⚙️ Feature Engineering</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Create meaningful features that improve model performance through domain knowledge and techniques.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.featureEngineering}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🔧 Engineering Techniques:</h4>
                  <ul className="text-purple-800 space-y-1">
                    <li>• Create feature ratios and combinations</li>
                    <li>• Use polynomial features for interactions</li>
                    <li>• Apply feature selection methods</li>
                    <li>• Transform skewed distributions</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'model-training':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🤖 Model Training</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Train multiple models, perform hyperparameter tuning, and select the best performing algorithm.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.modelTraining}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">🎯 Training Best Practices:</h4>
                  <ul className="text-red-800 space-y-1">
                    <li>• Try multiple algorithms and compare</li>
                    <li>• Use cross-validation for robust evaluation</li>
                    <li>• Perform systematic hyperparameter tuning</li>
                    <li>• Monitor for overfitting and underfitting</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'model-evaluation':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Model Evaluation</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Thoroughly evaluate model performance using appropriate metrics and validation techniques.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.modelEvaluation}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">📈 Evaluation Techniques:</h4>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Use appropriate metrics for your problem type</li>
                    <li>• Perform cross-validation and learning curves</li>
                    <li>• Analyze residuals and prediction errors</li>
                    <li>• Test model performance on different data segments</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'model-deployment':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🚀 Model Deployment</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Deploy your machine learning model to production with proper monitoring and maintenance.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.modelDeployment}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">🔧 Deployment Considerations:</h4>
                  <ul className="text-indigo-800 space-y-1">
                    <li>• Serialize models for easy loading</li>
                    <li>• Create robust prediction APIs</li>
                    <li>• Implement monitoring and logging</li>
                    <li>• Plan for model updates and versioning</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">💪 Practice Project</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Complete an end-to-end machine learning project from data to deployment.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.practice}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🎯 Project Goals:</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• Complete full ML pipeline implementation</li>
                    <li>• Compare multiple algorithms and techniques</li>
                    <li>• Deploy model with monitoring capabilities</li>
                    <li>• Document process and findings thoroughly</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                🤖 Machine Learning Project
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Build complete machine learning models from data preprocessing to deployment using scikit-learn. 
                Learn feature engineering, model evaluation, and best practices for production ML systems.
              </p>
              <div className="flex justify-center items-center mt-6 space-x-6">
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
                  ⏱️ 200 minutes
                </span>
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
                  📈 Projects Level
                </span>
              </div>
            </div>
          </ScrollAnimation>

          {/* Navigation */}
          <ScrollAnimation>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section.icon} {section.title}
                  </button>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Content */}
          {renderContent()}

          {/* Navigation Footer */}
          <ScrollAnimation>
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Machine Learning Project • Projects Level
              </div>
              <div className="flex space-x-4">
                <a 
                  href="/theory" 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  ← Back to Topics
                </a>
                <a 
                  href="/challenges" 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Try Challenges →
                </a>
              </div>
            </div>
          </ScrollAnimation>

        </div>
      </div>
    </Layout>
  );
};

export default MachineLearningPage;