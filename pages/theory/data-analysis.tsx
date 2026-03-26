import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const DataAnalysisPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'pandas-basics', title: 'Pandas Basics', icon: '🐼' },
    { id: 'data-loading', title: 'Data Loading', icon: '📥' },
    { id: 'data-cleaning', title: 'Data Cleaning', icon: '🧹' },
    { id: 'data-analysis', title: 'Data Analysis', icon: '📊' },
    { id: 'visualization', title: 'Data Visualization', icon: '📈' },
    { id: 'dashboard', title: 'Interactive Dashboard', icon: '🎛️' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    pandasBasics: `import pandas as pd
import numpy as np

# Creating DataFrames
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'City': ['New York', 'London', 'Tokyo', 'Sydney'],
    'Salary': [50000, 60000, 70000, 55000]
}

df = pd.DataFrame(data)
print(df)

# Basic DataFrame operations
print(f"Shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print(f"Info:")
print(df.info())

# First few rows
print(df.head())

# Last few rows
print(df.tail())

# Statistical summary
print(df.describe())`,

    dataLoading: `import pandas as pd

# Loading data from CSV
df_csv = pd.read_csv('sales_data.csv')

# Loading data from JSON
df_json = pd.read_json('user_data.json')

# Loading data from Excel
df_excel = pd.read_excel('financial_data.xlsx', sheet_name='Sheet1')

# Loading data from SQL database
import sqlite3
conn = sqlite3.connect('company.db')
df_sql = pd.read_sql_query("SELECT * FROM employees", conn)

# Creating sample data for analysis
sample_data = {
    'Date': pd.date_range('2023-01-01', periods=100, freq='D'),
    'Sales': np.random.randint(100, 1000, 100),
    'Product': np.random.choice(['A', 'B', 'C'], 100),
    'Region': np.random.choice(['North', 'South', 'East', 'West'], 100)
}

df = pd.DataFrame(sample_data)
print("Sample dataset created:")
print(df.head())

# Setting index
df.set_index('Date', inplace=True)
print("\\nDataset with Date as index:")
print(df.head())`,

    dataCleaning: `import pandas as pd
import numpy as np

# Create sample data with missing values
data = {
    'Name': ['Alice', 'Bob', None, 'Diana', 'Eve'],
    'Age': [25, None, 35, 28, 32],
    'Email': ['alice@email.com', 'bob@email.com', 'charlie@email.com', None, 'eve@email.com'],
    'Salary': [50000, 60000, 70000, 55000, None]
}

df = pd.DataFrame(data)
print("Original data with missing values:")
print(df)
print(f"\\nMissing values per column:")
print(df.isnull().sum())

# Handling missing values
# 1. Drop rows with any missing values
df_dropped = df.dropna()
print(f"\\nAfter dropping rows with missing values: {df_dropped.shape}")

# 2. Fill missing values
df_filled = df.copy()
df_filled['Name'].fillna('Unknown', inplace=True)
df_filled['Age'].fillna(df_filled['Age'].mean(), inplace=True)
df_filled['Salary'].fillna(df_filled['Salary'].median(), inplace=True)

print("\\nAfter filling missing values:")
print(df_filled)

# Data type conversion
df_filled['Age'] = df_filled['Age'].astype(int)
print(f"\\nData types after conversion:")
print(df_filled.dtypes)

# Removing duplicates
df_no_duplicates = df_filled.drop_duplicates()
print(f"\\nShape after removing duplicates: {df_no_duplicates.shape}")`,

    dataAnalysis: `import pandas as pd
import numpy as np

# Sample sales data
sales_data = {
    'Date': pd.date_range('2023-01-01', periods=365, freq='D'),
    'Product': np.random.choice(['Laptop', 'Phone', 'Tablet'], 365),
    'Category': np.random.choice(['Electronics', 'Accessories'], 365),
    'Sales': np.random.normal(1000, 200, 365),
    'Units': np.random.randint(1, 50, 365),
    'Region': np.random.choice(['North', 'South', 'East', 'West'], 365)
}

df = pd.DataFrame(sales_data)

# Basic statistical analysis
print("Basic Statistics:")
print(df.describe())

# Groupby operations
print("\\nSales by Product:")
product_sales = df.groupby('Product')['Sales'].agg(['sum', 'mean', 'count'])
print(product_sales)

print("\\nSales by Region:")
region_sales = df.groupby('Region')['Sales'].sum().sort_values(ascending=False)
print(region_sales)

# Time-based analysis
df['Month'] = df['Date'].dt.month
monthly_sales = df.groupby('Month')['Sales'].sum()
print("\\nMonthly Sales:")
print(monthly_sales)

# Correlation analysis
correlation_matrix = df[['Sales', 'Units']].corr()
print("\\nCorrelation Matrix:")
print(correlation_matrix)

# Filtering and querying
high_sales = df[df['Sales'] > 1200]
print(f"\\nHigh sales records: {len(high_sales)}")

# Advanced aggregations
summary = df.groupby(['Product', 'Region']).agg({
    'Sales': ['sum', 'mean'],
    'Units': ['sum', 'mean']
}).round(2)
print("\\nSummary by Product and Region:")
print(summary)`,

    visualization: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Set style
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Sample data
data = {
    'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    'Sales': [45000, 52000, 48000, 61000, 55000, 67000],
    'Profit': [12000, 15000, 13000, 18000, 16000, 20000]
}
df = pd.DataFrame(data)

# 1. Line plot
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.plot(df['Month'], df['Sales'], marker='o', linewidth=2, label='Sales')
plt.plot(df['Month'], df['Profit'], marker='s', linewidth=2, label='Profit')
plt.title('Sales and Profit Trends')
plt.xlabel('Month')
plt.ylabel('Amount ($)')
plt.legend()
plt.grid(True, alpha=0.3)

# 2. Bar plot
plt.subplot(2, 2, 2)
x = np.arange(len(df['Month']))
width = 0.35
plt.bar(x - width/2, df['Sales'], width, label='Sales', alpha=0.8)
plt.bar(x + width/2, df['Profit'], width, label='Profit', alpha=0.8)
plt.title('Monthly Sales vs Profit')
plt.xlabel('Month')
plt.ylabel('Amount ($)')
plt.xticks(x, df['Month'])
plt.legend()

# 3. Pie chart
plt.subplot(2, 2, 3)
plt.pie(df['Sales'], labels=df['Month'], autopct='%1.1f%%', startangle=90)
plt.title('Sales Distribution by Month')

# 4. Scatter plot with trend line
plt.subplot(2, 2, 4)
plt.scatter(df['Sales'], df['Profit'], s=100, alpha=0.7)
z = np.polyfit(df['Sales'], df['Profit'], 1)
p = np.poly1d(z)
plt.plot(df['Sales'], p(df['Sales']), "r--", alpha=0.8)
plt.title('Sales vs Profit Correlation')
plt.xlabel('Sales ($)')
plt.ylabel('Profit ($)')

plt.tight_layout()
plt.show()

# Advanced visualization with Seaborn
# Heatmap
plt.figure(figsize=(10, 6))
correlation_data = np.random.rand(5, 5)
sns.heatmap(correlation_data, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Heatmap')
plt.show()`,

    dashboard: `import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Streamlit Dashboard Example
def create_dashboard():
    st.set_page_config(page_title="Sales Dashboard", layout="wide")
    
    st.title("📊 Interactive Sales Dashboard")
    st.markdown("---")
    
    # Sample data
    @st.cache_data
    def load_data():
        data = {
            'Date': pd.date_range('2023-01-01', periods=365, freq='D'),
            'Product': np.random.choice(['Laptop', 'Phone', 'Tablet'], 365),
            'Sales': np.random.normal(1000, 200, 365),
            'Region': np.random.choice(['North', 'South', 'East', 'West'], 365)
        }
        return pd.DataFrame(data)
    
    df = load_data()
    
    # Sidebar filters
    st.sidebar.header("Filters")
    selected_products = st.sidebar.multiselect(
        "Select Products",
        df['Product'].unique(),
        default=df['Product'].unique()
    )
    
    selected_regions = st.sidebar.multiselect(
        "Select Regions",
        df['Region'].unique(),
        default=df['Region'].unique()
    )
    
    # Filter data
    filtered_df = df[
        (df['Product'].isin(selected_products)) &
        (df['Region'].isin(selected_regions))
    ]
    
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Sales", f"$\{filtered_df['Sales'].sum():,.0f}")
    
    with col2:
        st.metric("Average Daily Sales", f"$\{filtered_df['Sales'].mean():,.0f}")
    
    with col3:
        st.metric("Total Records", f"\{len(filtered_df):,}")
    
    with col4:
        st.metric("Best Day", f"$\{filtered_df['Sales'].max():,.0f}")
    
    # Charts
    col1, col2 = st.columns(2)
    
    with col1:
        # Time series chart
        daily_sales = filtered_df.groupby('Date')['Sales'].sum().reset_index()
        fig = px.line(daily_sales, x='Date', y='Sales', 
                     title='Daily Sales Trend')
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        # Product performance
        product_sales = filtered_df.groupby('Product')['Sales'].sum().reset_index()
        fig = px.bar(product_sales, x='Product', y='Sales',
                    title='Sales by Product')
        st.plotly_chart(fig, use_container_width=True)
    
    # Regional analysis
    st.subheader("Regional Performance")
    region_sales = filtered_df.groupby('Region')['Sales'].agg(['sum', 'mean']).reset_index()
    region_sales.columns = ['Region', 'Total Sales', 'Average Sales']
    st.dataframe(region_sales, use_container_width=True)

# To run the dashboard: streamlit run dashboard.py
if __name__ == "__main__":
    create_dashboard()`,

    practice: `# Practice Exercises for Data Analysis

# Exercise 1: Sales Analysis
import pandas as pd
import matplotlib.pyplot as plt

# Create sample sales data
sales_data = {
    'Date': pd.date_range('2023-01-01', periods=100, freq='D'),
    'Product': ['A', 'B', 'C'] * 33 + ['A'],
    'Sales': [100, 150, 200] * 33 + [175],
    'Region': ['North', 'South'] * 50
}

df = pd.DataFrame(sales_data)

# TODO: Complete these tasks
# 1. Calculate total sales by product
total_by_product = df.groupby('Product')['Sales'].sum()
print("Total sales by product:")
print(total_by_product)

# 2. Find the best performing region
best_region = df.groupby('Region')['Sales'].sum().idxmax()
print(f"\\nBest performing region: {best_region}")

# 3. Create a monthly trend analysis
df['Month'] = df['Date'].dt.month
monthly_trend = df.groupby('Month')['Sales'].mean()
print("\\nMonthly average sales:")
print(monthly_trend)

# 4. Identify top 10 sales days
top_days = df.nlargest(10, 'Sales')[['Date', 'Sales']]
print("\\nTop 10 sales days:")
print(top_days)

# Exercise 2: Data Cleaning Challenge
# Create messy data
messy_data = {
    'Name': ['Alice', 'Bob', None, 'DIANA', 'eve', ''],
    'Age': [25, None, 35, 28, '32'],
    'Email': ['alice@test.com', 'BOB@TEST.COM', 'invalid-email', None, 'eve@test.com'],
    'Salary': [50000, 60000, '70000', 55000, None]
}

messy_df = pd.DataFrame(messy_data)
print("\\nMessy data:")
print(messy_df)

# TODO: Clean this data
# 1. Handle missing values
# 2. Standardize name formatting
# 3. Convert data types
# 4. Validate email addresses

print("\\nYour turn to clean this data!")`
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">📊 Data Analysis Dashboard</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Welcome to the comprehensive Data Analysis module! In this project-based lesson, you'll learn to create 
                  powerful data analysis dashboards using Python's most popular data science libraries including pandas, 
                  matplotlib, seaborn, and streamlit.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 What You'll Learn</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Pandas library fundamentals</li>
                      <li>• Data loading and cleaning techniques</li>
                      <li>• Statistical analysis and aggregations</li>
                      <li>• Data visualization with matplotlib/seaborn</li>
                      <li>• Interactive dashboard creation</li>
                      <li>• Real-world data analysis workflows</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">⏱️ Project Details</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Duration:</strong> 150 minutes</li>
                      <li>• <strong>Level:</strong> Projects</li>
                      <li>• <strong>Prerequisites:</strong> Python basics, functions</li>
                      <li>• <strong>Libraries:</strong> pandas, matplotlib, seaborn</li>
                      <li>• <strong>Outcome:</strong> Interactive dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'pandas-basics':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🐼 Pandas Basics</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Pandas is the cornerstone of data analysis in Python. Let's start with creating and manipulating DataFrames.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.pandasBasics}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Key Concepts:</h4>
                  <ul className="text-blue-800 space-y-1">
                    <li>• DataFrames are like Excel spreadsheets in Python</li>
                    <li>• Use .head() and .tail() to preview data</li>
                    <li>• .info() provides data type and memory information</li>
                    <li>• .describe() gives statistical summaries</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'data-loading':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">📥 Data Loading</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Learn to load data from various sources including CSV, JSON, Excel files, and databases.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.dataLoading}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">📊 Data Sources:</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• CSV files are most common for tabular data</li>
                    <li>• JSON for hierarchical/nested data structures</li>
                    <li>• Excel for business data with multiple sheets</li>
                    <li>• SQL databases for relational data</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'data-cleaning':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🧹 Data Cleaning</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Real-world data is messy. Learn essential techniques to clean and prepare your data for analysis.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.dataCleaning}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">🧼 Cleaning Strategies:</h4>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Always identify missing data patterns first</li>
                    <li>• Choose appropriate filling strategies (mean, median, mode)</li>
                    <li>• Convert data types for better performance</li>
                    <li>• Remove or handle duplicates based on business logic</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'data-analysis':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Data Analysis</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Perform statistical analysis and discover insights using pandas groupby operations and aggregations.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.dataAnalysis}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🔍 Analysis Techniques:</h4>
                  <ul className="text-purple-800 space-y-1">
                    <li>• Use groupby for categorical analysis</li>
                    <li>• Apply multiple aggregation functions at once</li>
                    <li>• Create time-based analyses for temporal data</li>
                    <li>• Calculate correlations to find relationships</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'visualization':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">📈 Data Visualization</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Create compelling visualizations using matplotlib and seaborn to communicate your findings effectively.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.visualization}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">📊 Visualization Tips:</h4>
                  <ul className="text-red-800 space-y-1">
                    <li>• Choose the right chart type for your data</li>
                    <li>• Use consistent colors and styling</li>
                    <li>• Add titles, labels, and legends for clarity</li>
                    <li>• Consider your audience when designing charts</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🎛️ Interactive Dashboard</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Build an interactive dashboard using Streamlit to make your data analysis accessible and engaging.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.dashboard}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">🚀 Dashboard Features:</h4>
                  <ul className="text-indigo-800 space-y-1">
                    <li>• Interactive filters for dynamic data exploration</li>
                    <li>• Real-time metric calculations</li>
                    <li>• Multiple chart types in one interface</li>
                    <li>• Responsive layout for different screen sizes</li>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">💪 Practice Exercises</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Apply your data analysis skills with these hands-on exercises covering real-world scenarios.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.practice}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🎯 Challenge Yourself:</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• Complete the data cleaning exercise</li>
                    <li>• Create additional visualizations</li>
                    <li>• Add more filtering options to the dashboard</li>
                    <li>• Experiment with different chart types</li>
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                📊 Data Analysis Dashboard
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Create powerful data analysis dashboards using pandas, matplotlib, and other data science libraries. 
                Learn to process, analyze, and visualize data to extract meaningful insights.
              </p>
              <div className="flex justify-center items-center mt-6 space-x-6">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                  ⏱️ 150 minutes
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
                        ? 'bg-green-600 text-white shadow-md'
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
                Data Analysis Dashboard • Projects Level
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
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
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

export default DataAnalysisPage;