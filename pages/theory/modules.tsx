import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const ModulesPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'basic-imports', title: 'Basic Imports', icon: '📦' },
    { id: 'creating-modules', title: 'Creating Modules', icon: '🔧' },
    { id: 'packages', title: 'Packages', icon: '📁' },
    { id: 'standard-library', title: 'Standard Library', icon: '🏛️' },
    { id: 'package-management', title: 'Package Management', icon: '⚙️' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    basicImports: `# Basic import statement
import math
print(math.pi)          # 3.141592653589793
print(math.sqrt(16))    # 4.0

# Import with alias
import math as m
print(m.sin(m.pi / 2))  # 1.0

# Import specific functions
from math import pi, sqrt, sin
print(pi)               # 3.141592653589793
print(sqrt(25))         # 5.0
print(sin(pi / 2))      # 1.0

# Import all (not recommended)
from math import *
print(cos(0))           # 1.0 (but this can cause namespace pollution)

# Import multiple items
from datetime import datetime, date, timedelta
today = date.today()
now = datetime.now()
tomorrow = today + timedelta(days=1)

# Conditional imports
try:
    import numpy as np
    has_numpy = True
except ImportError:
    has_numpy = False
    print("NumPy not installed")

# Import from subdirectories
from mypackage.utils import helper_function
from mypackage.models.user import User

# Relative imports (within packages)
from . import utils          # Import from same directory
from .. import config        # Import from parent directory
from .models import User     # Import from subdirectory

# Import examples with different syntaxes
import os                    # Import entire module
import os.path              # Import submodule
from os import environ     # Import specific function
from os.path import join    # Import from submodule

# Module search path
import sys
print(sys.path)  # Shows where Python looks for modules

# Adding custom paths
sys.path.append('/path/to/my/modules')
import my_custom_module

# Checking if module exists
def safe_import(module_name):
    try:
        return __import__(module_name)
    except ImportError:
        return None

requests = safe_import('requests')
if requests:
    response = requests.get('https://api.example.com')`,

    creatingModules: `# Creating a simple module (save as 'calculator.py')
"""
Calculator module with basic arithmetic operations.
This is a docstring describing the module.
"""

# Module-level variables
VERSION = "1.0.0"
AUTHOR = "Python Developer"

# Functions in the module
def add(a, b):
    """Add two numbers."""
    return a + b

def subtract(a, b):
    """Subtract second number from first."""
    return a - b

def multiply(a, b):
    """Multiply two numbers."""
    return a * b

def divide(a, b):
    """Divide first number by second."""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Classes in the module
class Calculator:
    """A simple calculator class."""
    
    def __init__(self):
        self.history = []
    
    def calculate(self, operation, a, b):
        """Perform calculation and store in history."""
        if operation == 'add':
            result = add(a, b)
        elif operation == 'subtract':
            result = subtract(a, b)
        elif operation == 'multiply':
            result = multiply(a, b)
        elif operation == 'divide':
            result = divide(a, b)
        else:
            raise ValueError("Unknown operation")
        
        self.history.append(f"{a} {operation} {b} = {result}")
        return result

# Module initialization code
print(f"Calculator module v{VERSION} loaded")

# Code that runs when module is imported
_default_calculator = Calculator()

def get_default_calculator():
    """Get the default calculator instance."""
    return _default_calculator

# Using the module (in another file)
"""
# Import the entire module
import calculator
result = calculator.add(5, 3)
calc = calculator.Calculator()

# Import specific functions
from calculator import add, subtract, Calculator
result = add(10, 5)

# Import with alias
import calculator as calc
result = calc.multiply(4, 7)

# Access module attributes
print(calculator.VERSION)
print(calculator.AUTHOR)
"""

# Advanced module features
__all__ = ['add', 'subtract', 'multiply', 'divide', 'Calculator']
# Controls what gets imported with "from calculator import *"

# Module docstring and metadata
__version__ = VERSION
__author__ = AUTHOR
__email__ = "developer@example.com"

# Private functions (convention: start with _)
def _internal_helper():
    """This function is for internal use only."""
    pass

# Module-level constants
PI = 3.14159
E = 2.71828

# Running code only when script is executed directly
if __name__ == "__main__":
    # This code runs only when calculator.py is run directly
    # Not when it's imported
    print("Running calculator module directly")
    print(f"5 + 3 = {add(5, 3)}")
    print(f"10 - 4 = {subtract(10, 4)}")`,

    packages: `# Package structure example:
"""
mypackage/
    __init__.py          # Makes it a package
    utils.py             # Utility functions
    config.py            # Configuration
    models/
        __init__.py      # Makes models a subpackage
        user.py          # User model
        product.py       # Product model
    api/
        __init__.py
        handlers.py      # API handlers
        middleware.py    # Middleware
"""

# mypackage/__init__.py
"""
Initialize the mypackage package.
"""
__version__ = "1.0.0"
__author__ = "Developer"

# Import key components for easy access
from .utils import helper_function
from .config import settings
from .models.user import User

# Package-level initialization
print(f"MyPackage v{__version__} initialized")

# Define what gets imported with "from mypackage import *"
__all__ = ['helper_function', 'settings', 'User']

# mypackage/utils.py
def helper_function():
    """A helpful utility function."""
    return "Helper function called"

def format_name(first, last):
    """Format a person's name."""
    return f"{first} {last}".title()

def validate_email(email):
    """Basic email validation."""
    return "@" in email and "." in email

# mypackage/config.py
import os

class Settings:
    """Application settings."""
    
    def __init__(self):
        self.debug = os.getenv('DEBUG', 'False').lower() == 'true'
        self.database_url = os.getenv('DATABASE_URL', 'sqlite:///app.db')
        self.secret_key = os.getenv('SECRET_KEY', 'development-key')

# Create global settings instance
settings = Settings()

# mypackage/models/__init__.py
"""
Models subpackage.
"""
from .user import User
from .product import Product

__all__ = ['User', 'Product']

# mypackage/models/user.py
class User:
    """User model."""
    
    def __init__(self, username, email):
        self.username = username
        self.email = email
    
    def __str__(self):
        return f"User({self.username})"

# Using the package
"""
# Import from package
from mypackage import User, helper_function
from mypackage.models import Product
from mypackage.api.handlers import handle_request

# Create instances
user = User("alice", "alice@example.com")
result = helper_function()

# Access package metadata
import mypackage
print(mypackage.__version__)
"""

# Namespace packages (advanced)
# Allow splitting a package across multiple directories

# setup.py for package distribution
"""
from setuptools import setup, find_packages

setup(
    name="mypackage",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "requests",
        "click",
    ],
    author="Your Name",
    author_email="your.email@example.com",
    description="A sample Python package",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/mypackage",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
"""`,

    standardLibrary: `# Built-in modules (no installation required)

# Operating System interface
import os
print(os.getcwd())              # Current directory
print(os.listdir('.'))          # List directory contents
os.makedirs('new_folder', exist_ok=True)

# System-specific parameters
import sys
print(sys.version)              # Python version
print(sys.platform)             # Operating system
print(sys.argv)                 # Command line arguments

# Date and time operations
import datetime
now = datetime.datetime.now()
today = datetime.date.today()
tomorrow = today + datetime.timedelta(days=1)

# Random number generation
import random
print(random.randint(1, 10))    # Random integer
print(random.choice(['a', 'b', 'c']))  # Random choice
random.shuffle([1, 2, 3, 4, 5])  # Shuffle list in place

# JSON handling
import json
data = {'name': 'Alice', 'age': 30}
json_string = json.dumps(data)
parsed_data = json.loads(json_string)

# Regular expressions
import re
pattern = r'\\d+'
text = "I have 5 apples and 10 oranges"
numbers = re.findall(pattern, text)  # ['5', '10']

# Collections - specialized data structures
from collections import Counter, defaultdict, deque
counter = Counter(['a', 'b', 'a', 'c', 'b', 'a'])  # Count occurrences
dd = defaultdict(list)          # Dict with default values
queue = deque([1, 2, 3])        # Double-ended queue

# Itertools - iterator functions
import itertools
combinations = list(itertools.combinations([1, 2, 3], 2))
permutations = list(itertools.permutations([1, 2, 3]))
cycle = itertools.cycle([1, 2, 3])  # Infinite iterator

# Math functions
import math
print(math.sqrt(16))            # 4.0
print(math.factorial(5))        # 120
print(math.gcd(12, 8))          # 4

# Path manipulation
from pathlib import Path
path = Path('folder') / 'file.txt'
print(path.exists())
print(path.suffix)

# URL handling
from urllib.parse import urlparse, urljoin
parsed = urlparse('https://example.com/path?query=value')
print(parsed.hostname)          # example.com

# Copying objects
import copy
original = {'a': [1, 2, 3]}
shallow_copy = copy.copy(original)
deep_copy = copy.deepcopy(original)

# Functional programming tools
from functools import reduce, partial
numbers = [1, 2, 3, 4, 5]
sum_all = reduce(lambda x, y: x + y, numbers)  # 15

# Argument parsing
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--input', help='Input file')
args = parser.parse_args()

# Configuration file parsing
import configparser
config = configparser.ConfigParser()
config.read('config.ini')

# Email handling
import smtplib
from email.mime.text import MIMEText
# (Email sending code would go here)

# Logging
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("This is an info message")

# Testing
import unittest
class TestMath(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(2 + 2, 4)

# Cryptographic services
import hashlib
text = "Hello World"
hash_object = hashlib.sha256(text.encode())
hex_dig = hash_object.hexdigest()`,

    packageManagement: `# Package management with pip

# Installing packages
"""
# Command line usage:
pip install requests                    # Install latest version
pip install requests==2.25.1          # Install specific version
pip install requests>=2.20.0          # Install minimum version
pip install -r requirements.txt        # Install from requirements file
pip install -e .                      # Install in editable mode (development)
"""

# Creating requirements.txt
"""
requests==2.25.1
click>=7.0
numpy
pandas>=1.2.0
flask==2.0.1
"""

# Checking installed packages
"""
pip list                              # List all installed packages
pip show requests                     # Show package information
pip freeze                            # Show all packages with versions
pip freeze > requirements.txt        # Create requirements file
"""

# Virtual environments
"""
# Creating virtual environment
python -m venv myproject_env          # Create virtual environment
python -m venv venv                   # Common name: venv

# Activating virtual environment
# On Windows:
myproject_env\\Scripts\\activate
# On macOS/Linux:
source myproject_env/bin/activate

# Deactivating
deactivate

# Using virtual environment
pip install requests                  # Installs only in virtual environment
pip freeze > requirements.txt        # Create requirements for this project
"""

# Advanced pip usage
"""
pip install --upgrade package_name   # Upgrade package
pip uninstall package_name          # Remove package
pip search package_name              # Search for packages
pip install --user package_name     # Install for current user only
pip install package_name --no-deps  # Don't install dependencies
"""

# Managing dependencies in code
import subprocess
import sys

def install_package(package):
    """Install a package programmatically."""
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def check_package_installed(package_name):
    """Check if a package is installed."""
    try:
        __import__(package_name)
        return True
    except ImportError:
        return False

# Automatic dependency handling
def ensure_package(package_name, install_name=None):
    """Ensure a package is installed, install if not."""
    if not check_package_installed(package_name):
        install_name = install_name or package_name
        print(f"Installing {install_name}...")
        install_package(install_name)

# Usage
ensure_package('requests')
ensure_package('cv2', 'opencv-python')

# Using conda (alternative package manager)
"""
# Creating conda environment
conda create --name myproject python=3.9
conda activate myproject

# Installing packages
conda install numpy pandas matplotlib
conda install -c conda-forge requests

# Environment management
conda list                           # List installed packages
conda env list                      # List environments
conda env export > environment.yml  # Export environment
conda env create -f environment.yml # Create from file
"""

# environment.yml example
"""
name: myproject
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.9
  - numpy
  - pandas
  - matplotlib
  - pip
  - pip:
    - requests
    - flask
"""

# Package development setup.py
"""
from setuptools import setup, find_packages

setup(
    name="my-awesome-package",
    version="0.1.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="A short description of your package",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/my-awesome-package",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
    ],
    python_requires=">=3.7",
    install_requires=[
        "requests>=2.20.0",
        "click>=7.0",
    ],
    extras_require={
        "dev": [
            "pytest>=6.0",
            "black",
            "flake8",
        ],
    },
    entry_points={
        "console_scripts": [
            "my-command=my_package.cli:main",
        ],
    },
)
"""

# Best practices for package management
"""
1. Always use virtual environments for projects
2. Pin exact versions in production (requirements.txt)
3. Use version ranges for libraries you publish
4. Keep requirements.txt updated
5. Use different requirement files for different purposes:
   - requirements.txt (production)
   - requirements-dev.txt (development)
   - requirements-test.txt (testing)
6. Document installation instructions
7. Use .gitignore to exclude virtual environments
8. Consider using poetry or pipenv for dependency management
"""`,

    bestPractices: `# Module and package best practices

# 1. Module organization
"""
Good module structure:
- Single responsibility principle
- Clear, descriptive names
- Proper docstrings
- Logical grouping of functions/classes
"""

# utils.py - Good example
"""
Utility functions for string and data manipulation.
"""

def clean_string(text):
    """Remove extra whitespace and convert to lowercase."""
    return text.strip().lower()

def validate_email(email):
    """Basic email validation."""
    return "@" in email and "." in email.split("@")[-1]

def format_phone(phone):
    """Format phone number to (XXX) XXX-XXXX format."""
    digits = ''.join(filter(str.isdigit, phone))
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    return phone

# 2. Import organization (PEP 8)
# Standard library imports
import os
import sys
from datetime import datetime, timedelta

# Third-party imports
import requests
import numpy as np
from flask import Flask, request

# Local application imports
from . import config
from .models import User
from .utils import helper_function

# 3. Avoiding circular imports
# models.py
from .utils import format_name

class User:
    def __init__(self, first, last):
        self.name = format_name(first, last)

# utils.py
# Don't import from models here if models imports from utils

def format_name(first, last):
    return f"{first} {last}".title()

# 4. Lazy imports for optional dependencies
def plot_data(data):
    """Plot data using matplotlib (optional dependency)."""
    try:
        import matplotlib.pyplot as plt
    except ImportError:
        raise ImportError("matplotlib required for plotting")
    
    plt.plot(data)
    plt.show()

# 5. Module configuration
# config.py
import os
from typing import Optional

class Config:
    """Application configuration."""
    
    DEBUG: bool = os.getenv('DEBUG', 'False').lower() == 'true'
    SECRET_KEY: str = os.getenv('SECRET_KEY', 'dev-key')
    DATABASE_URL: str = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    
    @classmethod
    def from_env(cls) -> 'Config':
        """Create config from environment variables."""
        return cls()

# 6. Package versioning
# __init__.py
__version__ = "1.2.3"

# Use semantic versioning:
# MAJOR.MINOR.PATCH
# MAJOR: Breaking changes
# MINOR: New features (backward compatible)
# PATCH: Bug fixes

# 7. Error handling in modules
class MyModuleError(Exception):
    """Base exception for this module."""
    pass

class ValidationError(MyModuleError):
    """Raised when validation fails."""
    pass

def validate_data(data):
    """Validate input data."""
    if not isinstance(data, dict):
        raise ValidationError("Data must be a dictionary")
    
    if 'required_field' not in data:
        raise ValidationError("Missing required field")

# 8. Testing modules
# test_utils.py
import unittest
from mypackage.utils import clean_string, validate_email

class TestUtils(unittest.TestCase):
    def test_clean_string(self):
        self.assertEqual(clean_string("  HELLO  "), "hello")
    
    def test_validate_email(self):
        self.assertTrue(validate_email("test@example.com"))
        self.assertFalse(validate_email("invalid-email"))

if __name__ == '__main__':
    unittest.main()

# 9. Documentation best practices
def complex_function(data, options=None, **kwargs):
    """
    Process complex data with various options.
    
    Args:
        data (list): Input data to process
        options (dict, optional): Processing options
        **kwargs: Additional keyword arguments
    
    Returns:
        dict: Processed results with metadata
    
    Raises:
        ValueError: If data is empty
        TypeError: If data is not a list
    
    Example:
        >>> data = [1, 2, 3, 4, 5]
        >>> result = complex_function(data, {'normalize': True})
        >>> print(result['processed'])
        [0.2, 0.4, 0.6, 0.8, 1.0]
    """
    if not isinstance(data, list):
        raise TypeError("Data must be a list")
    
    if not data:
        raise ValueError("Data cannot be empty")
    
    # Implementation here
    return {'processed': data, 'metadata': {}}

# 10. Performance considerations
# Use __slots__ for classes with many instances
class Point:
    __slots__ = ['x', 'y']
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

# Cache expensive computations
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_function(n):
    """Expensive computation with caching."""
    # Expensive calculation here
    return n ** 2`
  };

  return (
    <Layout title="Modules & Package Management - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Modules & Package Management
                </h1>
                <p className="text-cyan-100 text-lg">
                  Intermediate Level • 50 minutes • Master imports, modules, packages, and dependency management
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">📦</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-cyan-100 text-cyan-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border">
                
                {/* Introduction Section */}
                {activeSection === 'introduction' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <div className="prose max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Modules & Package Management</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          Modules and packages are fundamental to organizing Python code and managing dependencies. They enable code reuse, maintainability, and collaborative development through proper structure and dependency management.
                        </p>

                        <div className="bg-cyan-50 border-l-4 border-cyan-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-cyan-900">
                                <strong>What you'll learn:</strong> Import statements and module organization, create reusable modules and packages, manage dependencies with pip, use virtual environments, organize large projects effectively.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Module System Components</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">📄 Modules</h4>
                            <p className="text-sm text-blue-700">Single Python files containing functions, classes, and variables</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">📁 Packages</h4>
                            <p className="text-sm text-green-700">Directories containing multiple modules with __init__.py</p>
                          </div>
                          
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">🏛️ Standard Library</h4>
                            <p className="text-sm text-purple-700">Built-in modules included with Python installation</p>
                          </div>
                          
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">⚙️ Third-party Packages</h4>
                            <p className="text-sm text-orange-700">External packages installed via pip from PyPI</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits of Modular Programming</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li><strong>Code Reusability:</strong> Write once, use in multiple projects</li>
                          <li><strong>Organization:</strong> Logical separation of functionality</li>
                          <li><strong>Maintainability:</strong> Easier to update and debug</li>
                          <li><strong>Collaboration:</strong> Teams can work on different modules</li>
                          <li><strong>Testing:</strong> Individual components can be tested in isolation</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Basic Imports Section */}
                {activeSection === 'basic-imports' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Imports</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Import statements allow you to use code from other modules and packages. Understanding different import syntaxes helps you organize and access code efficiently.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.basicImports}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Import Styles</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>import module</code> - Import entire module</li>
                            <li>• <code>from module import item</code> - Import specific item</li>
                            <li>• <code>import module as alias</code> - Import with alias</li>
                            <li>• <code>from module import *</code> - Import all (avoid)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Best Practices</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Use specific imports when possible</li>
                            <li>• Group imports by type (standard, third-party, local)</li>
                            <li>• Use aliases for long module names</li>
                            <li>• Handle ImportError for optional dependencies</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">Import Guidelines (PEP 8)</h4>
                        <div className="text-yellow-700 space-y-2">
                          <p>1. <strong>Order:</strong> Standard library → Third-party → Local imports</p>
                          <p>2. <strong>Grouping:</strong> Separate groups with blank lines</p>
                          <p>3. <strong>Specificity:</strong> Prefer <code>from module import item</code> for frequently used items</p>
                          <p>4. <strong>Avoid:</strong> <code>import *</code> except in special cases</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Creating Modules Section */}
                {activeSection === 'creating-modules' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Creating Modules</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Any Python file can be a module. Creating well-structured modules with proper documentation and organization makes your code reusable and maintainable.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.creatingModules}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Module Structure</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Docstring at top</li>
                            <li>• Import statements</li>
                            <li>• Constants and variables</li>
                            <li>• Functions and classes</li>
                            <li>• Main execution block</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-800 mb-2">Special Variables</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• <code>__name__</code> - Module name</li>
                            <li>• <code>__file__</code> - File path</li>
                            <li>• <code>__all__</code> - Public interface</li>
                            <li>• <code>__version__</code> - Version info</li>
                          </ul>
                        </div>
                        
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-800 mb-2">Naming Conventions</h4>
                          <ul className="text-sm text-teal-700 space-y-1">
                            <li>• Lowercase with underscores</li>
                            <li>• Descriptive names</li>
                            <li>• Avoid built-in names</li>
                            <li>• _private for internal use</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-400 p-6">
                        <h4 className="font-semibold text-green-800 mb-3">Module Development Tips</h4>
                        <ul className="text-green-700 space-y-2">
                          <li>• Include comprehensive docstrings for all public functions</li>
                          <li>• Use <code>if __name__ == "__main__":</code> for testing code</li>
                          <li>• Define <code>__all__</code> to control public interface</li>
                          <li>• Follow single responsibility principle</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Packages Section */}
                {activeSection === 'packages' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Packages</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Packages are directories containing multiple modules. They provide a way to organize related modules into a hierarchical structure, making large projects manageable.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.packages}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Package Structure</h4>
                          <div className="text-sm text-blue-700 space-y-1 font-mono">
                            <div>mypackage/</div>
                            <div>&nbsp;&nbsp;__init__.py</div>
                            <div>&nbsp;&nbsp;module1.py</div>
                            <div>&nbsp;&nbsp;module2.py</div>
                            <div>&nbsp;&nbsp;subpackage/</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;__init__.py</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;module3.py</div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">__init__.py Purpose</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Makes directory a package</li>
                            <li>• Package initialization code</li>
                            <li>• Control package imports</li>
                            <li>• Define public interface</li>
                            <li>• Can be empty</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Package Import Patterns</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Direct Import:</h5>
                          <code className="text-sm">from mypackage import module1</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Subpackage Import:</h5>
                          <code className="text-sm">from mypackage.subpackage import module3</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Relative Import (within package):</h5>
                          <code className="text-sm">from . import module1</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Standard Library Section */}
                {activeSection === 'standard-library' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Standard Library</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Python's standard library provides a rich set of modules for common programming tasks. These modules are included with Python and don't require separate installation.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.standardLibrary}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">System & OS</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>os</code> - Operating system</li>
                            <li>• <code>sys</code> - System parameters</li>
                            <li>• <code>pathlib</code> - Path operations</li>
                            <li>• <code>subprocess</code> - Process management</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Data & Collections</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>collections</code> - Data structures</li>
                            <li>• <code>json</code> - JSON handling</li>
                            <li>• <code>csv</code> - CSV files</li>
                            <li>• <code>pickle</code> - Serialization</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Utilities</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• <code>datetime</code> - Date and time</li>
                            <li>• <code>random</code> - Random numbers</li>
                            <li>• <code>math</code> - Mathematical functions</li>
                            <li>• <code>re</code> - Regular expressions</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-cyan-50 border-l-4 border-cyan-400 p-6">
                        <h4 className="font-semibold text-cyan-800 mb-3">Exploring the Standard Library</h4>
                        <ul className="text-cyan-700 space-y-2">
                          <li>• Use <code>help(module)</code> to get documentation</li>
                          <li>• Check <code>dir(module)</code> to see available functions</li>
                          <li>• Read the official Python documentation</li>
                          <li>• Prefer standard library over third-party when possible</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Package Management Section */}
                {activeSection === 'package-management' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Package Management</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Package management with pip and virtual environments is essential for managing dependencies and creating reproducible development environments.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.packageManagement}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">pip Commands</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• <code>pip install package</code> - Install</li>
                            <li>• <code>pip uninstall package</code> - Remove</li>
                            <li>• <code>pip list</code> - List installed</li>
                            <li>• <code>pip freeze</code> - Export versions</li>
                            <li>• <code>pip show package</code> - Package info</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Virtual Environments</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>python -m venv env</code> - Create</li>
                            <li>• <code>source env/bin/activate</code> - Activate (Unix)</li>
                            <li>• <code>env\\Scripts\\activate</code> - Activate (Windows)</li>
                            <li>• <code>deactivate</code> - Deactivate</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Dependency Management Workflow</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">1. Create Virtual Environment:</h5>
                          <code className="text-sm">python -m venv myproject_env</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">2. Activate Environment:</h5>
                          <code className="text-sm">source myproject_env/bin/activate</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">3. Install Dependencies:</h5>
                          <code className="text-sm">pip install -r requirements.txt</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">4. Develop & Test:</h5>
                          <code className="text-sm">python your_script.py</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">5. Export Dependencies:</h5>
                          <code className="text-sm">pip freeze &gt; requirements.txt</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Practice Section */}
                {activeSection === 'practice' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises</h2>
                      
                      <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Utility Module Library</h3>
                          <p className="text-gray-700 mb-4">
                            Create a comprehensive utilities package with modules for string processing, data validation, and file operations.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Package structure: utils/string_utils.py, utils/validators.py, utils/file_ops.py<br/>
                              # Include proper __init__.py with public interface<br/>
                              # Add comprehensive docstrings and error handling
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: Configuration Management System</h3>
                          <p className="text-gray-700 mb-4">
                            Build a configuration package that loads settings from multiple sources with environment-specific overrides.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Modules: config/loaders.py, config/validators.py, config/settings.py<br/>
                              # Support JSON, YAML, environment variables<br/>
                              # Implement configuration merging and validation
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: API Client Package</h3>
                          <p className="text-gray-700 mb-4">
                            Create a reusable API client package with authentication, error handling, and response parsing.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Structure: api_client/auth.py, api_client/client.py, api_client/exceptions.py<br/>
                              # Include setup.py for distribution<br/>
                              # Use third-party dependencies (requests)
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: Project Template Generator</h3>
                          <p className="text-gray-700 mb-4">
                            Build a command-line tool that generates Python project templates with proper structure and dependencies.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # CLI tool using argparse or click<br/>
                              # Generate: setup.py, requirements.txt, project structure<br/>
                              # Support different project types (web, data science, etc.)
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-cyan-100 mb-6">
                          Take our interactive quiz to see how well you've mastered modules and package management!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/modules'}
                          className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          🎯 Test My Knowledge
                        </button>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModulesPage; 