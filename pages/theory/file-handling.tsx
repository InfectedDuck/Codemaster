import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const FileHandlingPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'basic-file-ops', title: 'Basic File Operations', icon: '📄' },
    { id: 'context-managers', title: 'Context Managers', icon: '🔐' },
    { id: 'csv-files', title: 'CSV Files', icon: '📊' },
    { id: 'json-files', title: 'JSON Files', icon: '🔧' },
    { id: 'file-paths', title: 'File Paths & OS', icon: '🗂️' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    basicFileOps: `# Basic file reading
# Method 1: Basic file reading (not recommended)
file = open('example.txt', 'r')
content = file.read()
print(content)
file.close()  # Important: must close manually

# Method 2: Reading line by line
file = open('example.txt', 'r')
for line in file:
    print(line.strip())  # strip() removes newline characters
file.close()

# Method 3: Reading all lines into a list
file = open('example.txt', 'r')
lines = file.readlines()
file.close()
for line in lines:
    print(line.strip())

# Reading specific amounts
file = open('example.txt', 'r')
first_10_chars = file.read(10)  # Read first 10 characters
file.close()

# Basic file writing
# Writing to a file (overwrites existing content)
file = open('output.txt', 'w')
file.write("Hello, World!\n")
file.write("This is a new line.\n")
file.close()

# Appending to a file
file = open('output.txt', 'a')
file.write("This line is appended.\n")
file.close()

# File modes explained
# 'r' - Read only (default)
# 'w' - Write only (overwrites existing file)
# 'a' - Append only
# 'r+' - Read and write
# 'x' - Create new file (fails if exists)

# Working with different encodings
file = open('utf8_file.txt', 'r', encoding='utf-8')
content = file.read()
file.close()

# Error handling with files
try:
    file = open('nonexistent.txt', 'r')
    content = file.read()
    file.close()
except FileNotFoundError:
    print("File not found!")
except PermissionError:
    print("Permission denied!")
except Exception as e:
    print(f"An error occurred: {e}")`,

    contextManagers: `# Using 'with' statement (recommended approach)
# Automatically handles opening and closing files

# Reading with context manager
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)
# File is automatically closed here, even if an error occurs

# Writing with context manager
with open('output.txt', 'w') as file:
    file.write("Hello, World!\n")
    file.write("File will be closed automatically!\n")

# Reading line by line with context manager
with open('example.txt', 'r') as file:
    for line in file:
        print(line.strip())

# Multiple files at once
with open('input.txt', 'r') as infile, open('output.txt', 'w') as outfile:
    content = infile.read()
    outfile.write(content.upper())

# Reading and processing large files efficiently
def process_large_file(filename):
    with open(filename, 'r') as file:
        for line_number, line in enumerate(file, 1):
            # Process one line at a time (memory efficient)
            processed_line = line.strip().upper()
            print(f"Line {line_number}: {processed_line}")

# Error handling with context managers
def safe_file_read(filename):
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"File '{filename}' not found")
        return None
    except PermissionError:
        print(f"Permission denied for '{filename}'")
        return None

# Creating custom context managers
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        print(f"Opening file {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing file {self.filename}")
        if self.file:
            self.file.close()

# Using custom context manager
with FileManager('example.txt', 'r') as file:
    content = file.read()
    print(content)

# Binary files
with open('image.jpg', 'rb') as binary_file:
    data = binary_file.read()
    print(f"File size: {len(data)} bytes")

with open('copy_image.jpg', 'wb') as output_file:
    output_file.write(data)`,

    csvFiles: `import csv

# Reading CSV files
# Method 1: Using csv.reader
with open('students.csv', 'r') as file:
    csv_reader = csv.reader(file)
    headers = next(csv_reader)  # Read first row as headers
    print(f"Headers: {headers}")
    
    for row in csv_reader:
        print(f"Row: {row}")

# Method 2: Using csv.DictReader (more convenient)
with open('students.csv', 'r') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        print(f"Name: {row['name']}, Age: {row['age']}, Grade: {row['grade']}")

# Writing CSV files
# Method 1: Using csv.writer
students = [
    ['Alice', 20, 'A'],
    ['Bob', 19, 'B'],
    ['Charlie', 21, 'A']
]

with open('output_students.csv', 'w', newline='') as file:
    csv_writer = csv.writer(file)
    csv_writer.writerow(['Name', 'Age', 'Grade'])  # Write header
    csv_writer.writerows(students)  # Write all data rows

# Method 2: Using csv.DictWriter
students_dict = [
    {'name': 'Alice', 'age': 20, 'grade': 'A'},
    {'name': 'Bob', 'age': 19, 'grade': 'B'},
    {'name': 'Charlie', 'age': 21, 'grade': 'A'}
]

with open('output_students_dict.csv', 'w', newline='') as file:
    fieldnames = ['name', 'age', 'grade']
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    csv_writer.writeheader()  # Write header row
    csv_writer.writerows(students_dict)  # Write data rows

# Handling different CSV formats
# Custom delimiter
with open('tab_separated.csv', 'r') as file:
    csv_reader = csv.reader(file, delimiter='\\t')
    for row in csv_reader:
        print(row)

# Custom quote character
with open('quoted_data.csv', 'r') as file:
    csv_reader = csv.reader(file, quotechar="'")
    for row in csv_reader:
        print(row)

# Data processing with CSV
def analyze_sales_data(filename):
    total_sales = 0
    product_sales = {}
    
    with open(filename, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            product = row['product']
            sales = float(row['sales'])
            
            total_sales += sales
            product_sales[product] = product_sales.get(product, 0) + sales
    
    return total_sales, product_sales

# Error handling with CSV
def safe_csv_read(filename):
    try:
        with open(filename, 'r') as file:
            csv_reader = csv.DictReader(file)
            data = list(csv_reader)
            return data
    except FileNotFoundError:
        print(f"CSV file '{filename}' not found")
        return []
    except csv.Error as e:
        print(f"CSV parsing error: {e}")
        return []

# Converting CSV to other formats
def csv_to_list_of_dicts(filename):
    result = []
    with open(filename, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            result.append(dict(row))
    return result`,

    jsonFiles: `import json

# Reading JSON files
# Simple JSON reading
with open('data.json', 'r') as file:
    data = json.load(file)
    print(data)
    print(type(data))  # Usually dict or list

# Writing JSON files
# Python data to JSON file
student_data = {
    "name": "Alice",
    "age": 20,
    "grades": [85, 90, 78],
    "enrolled": True,
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "zip": "12345"
    }
}

with open('student.json', 'w') as file:
    json.dump(student_data, file, indent=4)  # indent for pretty formatting

# Working with JSON strings
# Python object to JSON string
json_string = json.dumps(student_data, indent=2)
print(json_string)

# JSON string to Python object
parsed_data = json.loads(json_string)
print(parsed_data['name'])

# Handling different data types in JSON
data_types_example = {
    "string": "Hello",
    "number": 42,
    "float": 3.14,
    "boolean": True,
    "null_value": None,
    "list": [1, 2, 3],
    "nested_object": {
        "key": "value"
    }
}

# JSON only supports: str, int, float, bool, None, list, dict
# Does NOT support: tuples, sets, custom objects, functions

# Reading complex JSON structures
def process_json_data(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    
    if isinstance(data, dict):
        for key, value in data.items():
            print(f"{key}: {value}")
    elif isinstance(data, list):
        for i, item in enumerate(data):
            print(f"Item {i}: {item}")

# Error handling with JSON
def safe_json_read(filename):
    try:
        with open(filename, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"JSON file '{filename}' not found")
        return None
    except json.JSONDecodeError as e:
        print(f"Invalid JSON format: {e}")
        return None

# Pretty printing JSON
def pretty_print_json(data):
    formatted_json = json.dumps(data, indent=4, sort_keys=True)
    print(formatted_json)

# Working with APIs and JSON
def save_api_response(data, filename):
    """Save API response data to JSON file"""
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

# Merging JSON files
def merge_json_files(file1, file2, output_file):
    with open(file1, 'r') as f1, open(file2, 'r') as f2:
        data1 = json.load(f1)
        data2 = json.load(f2)
    
    # Merge dictionaries
    if isinstance(data1, dict) and isinstance(data2, dict):
        merged = {**data1, **data2}
    else:
        merged = [data1, data2]
    
    with open(output_file, 'w') as output:
        json.dump(merged, output, indent=4)

# JSON configuration files
def load_config(config_file='config.json'):
    """Load application configuration from JSON file"""
    default_config = {
        "debug": False,
        "database_url": "localhost:5432",
        "max_connections": 100
    }
    
    try:
        with open(config_file, 'r') as file:
            user_config = json.load(file)
            # Merge default and user config
            config = {**default_config, **user_config}
            return config
    except FileNotFoundError:
        print("Config file not found, using defaults")
        return default_config`,

    filePaths: `import os
import pathlib
from pathlib import Path

# Working with file paths using os module
# Current working directory
current_dir = os.getcwd()
print(f"Current directory: {current_dir}")

# Joining paths (cross-platform)
file_path = os.path.join('folder', 'subfolder', 'file.txt')
print(f"File path: {file_path}")

# Absolute path
abs_path = os.path.abspath('relative_file.txt')
print(f"Absolute path: {abs_path}")

# Path information
path = '/home/user/documents/file.txt'
print(f"Directory: {os.path.dirname(path)}")
print(f"Filename: {os.path.basename(path)}")
print(f"Extension: {os.path.splitext(path)[1]}")

# Check if path exists
if os.path.exists('somefile.txt'):
    print("File exists")
else:
    print("File does not exist")

# Check if it's a file or directory
if os.path.isfile('example.txt'):
    print("It's a file")
if os.path.isdir('some_folder'):
    print("It's a directory")

# Working with directories
# Create directory
os.makedirs('new_folder/subfolder', exist_ok=True)  # exist_ok prevents error if exists

# List directory contents
for item in os.listdir('.'):
    print(item)

# Walk through directory tree
for root, dirs, files in os.walk('.'):
    for file in files:
        file_path = os.path.join(root, file)
        print(file_path)

# Modern approach using pathlib (Python 3.4+)
# Creating Path objects
current_dir = Path.cwd()
print(f"Current directory: {current_dir}")

file_path = Path('folder') / 'subfolder' / 'file.txt'
print(f"File path: {file_path}")

# Path properties
path = Path('/home/user/documents/file.txt')
print(f"Parent: {path.parent}")
print(f"Name: {path.name}")
print(f"Stem: {path.stem}")  # filename without extension
print(f"Suffix: {path.suffix}")  # file extension

# Path operations
path = Path('example.txt')
print(f"Absolute: {path.absolute()}")
print(f"Exists: {path.exists()}")
print(f"Is file: {path.is_file()}")
print(f"Is directory: {path.is_dir()}")

# Reading/writing with pathlib
path = Path('data.txt')
path.write_text('Hello, World!')
content = path.read_text()
print(content)

# Working with JSON using pathlib
data = {'name': 'Alice', 'age': 25}
json_path = Path('data.json')
json_path.write_text(json.dumps(data))

# Directory operations with pathlib
folder = Path('new_folder')
folder.mkdir(exist_ok=True)

# Iterating through files
for file_path in Path('.').iterdir():
    if file_path.is_file():
        print(f"File: {file_path}")

# Finding files with specific patterns
for txt_file in Path('.').glob('*.txt'):
    print(f"Text file: {txt_file}")

for py_file in Path('.').rglob('*.py'):  # Recursive search
    print(f"Python file: {py_file}")

# Cross-platform path handling
def create_data_file(filename):
    # This works on Windows, macOS, and Linux
    data_dir = Path('data')
    data_dir.mkdir(exist_ok=True)
    
    file_path = data_dir / filename
    file_path.write_text('Sample data')
    return file_path

# File operations
def copy_file(source, destination):
    """Copy file using pathlib"""
    source_path = Path(source)
    dest_path = Path(destination)
    
    if source_path.exists():
        dest_path.write_bytes(source_path.read_bytes())
        return True
    return False

def get_file_info(file_path):
    """Get detailed file information"""
    path = Path(file_path)
    if not path.exists():
        return None
    
    stat = path.stat()
    return {
        'size': stat.st_size,
        'modified': stat.st_mtime,
        'is_file': path.is_file(),
        'parent': path.parent,
        'extension': path.suffix
    }`
  };

  return (
    <Layout title="File Handling & I/O Operations - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  File Handling & I/O Operations
                </h1>
                <p className="text-emerald-100 text-lg">
                  Intermediate Level • 60 minutes • Master file operations, CSV/JSON handling, and file paths
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">📁</div>
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
                          ? 'bg-emerald-100 text-emerald-700'
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">File Handling & I/O Operations</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          File handling is essential for persistent data storage, configuration management, and data processing. Python provides powerful tools for working with various file formats and managing file operations safely.
                        </p>

                        <div className="bg-emerald-50 border-l-4 border-emerald-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-emerald-900">
                                <strong>What you'll learn:</strong> Read and write files safely, work with CSV and JSON data formats, handle file paths cross-platform, use context managers for resource management.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">File Operation Categories</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">📄 Text Files</h4>
                            <p className="text-sm text-blue-700">Reading and writing plain text, handling encodings</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">📊 Structured Data</h4>
                            <p className="text-sm text-green-700">CSV for tabular data, JSON for complex structures</p>
                          </div>
                          
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">🔐 Safe Operations</h4>
                            <p className="text-sm text-purple-700">Context managers, error handling, resource cleanup</p>
                          </div>
                          
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">🗂️ Path Management</h4>
                            <p className="text-sm text-orange-700">Cross-platform paths, directory operations</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Configuration files and settings</li>
                          <li>Data import/export and processing</li>
                          <li>Log files and application monitoring</li>
                          <li>API data storage and caching</li>
                          <li>Backup and data migration</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Basic File Operations Section */}
                {activeSection === 'basic-file-ops' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic File Operations</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Python provides built-in functions for reading and writing files. Understanding file modes and proper resource management is crucial for reliable file operations.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.basicFileOps}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Read Modes</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>'r'</code> - Read text (default)</li>
                            <li>• <code>'rb'</code> - Read binary</li>
                            <li>• <code>'r+'</code> - Read and write</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Write Modes</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>'w'</code> - Write (overwrites)</li>
                            <li>• <code>'a'</code> - Append</li>
                            <li>• <code>'x'</code> - Create new only</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Read Methods</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• <code>read()</code> - All content</li>
                            <li>• <code>readline()</code> - One line</li>
                            <li>• <code>readlines()</code> - List of lines</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-red-50 border-l-4 border-red-400 p-6">
                        <h4 className="font-semibold text-red-800 mb-3">⚠️ Important Notes</h4>
                        <ul className="text-red-700 space-y-2">
                          <li>• Always close files when done (or use context managers)</li>
                          <li>• Handle exceptions for missing files or permission errors</li>
                          <li>• Be careful with write modes - they can overwrite data</li>
                          <li>• Consider memory usage when reading large files</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Context Managers Section */}
                {activeSection === 'context-managers' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Context Managers</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Context managers provide a clean way to manage resources like files. The `with` statement ensures files are properly closed, even if errors occur.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.contextManagers}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">✅ Benefits of Context Managers</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Automatic resource cleanup</li>
                            <li>• Exception safety</li>
                            <li>• Cleaner, more readable code</li>
                            <li>• Prevents resource leaks</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">🔧 Advanced Features</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Multiple files in one statement</li>
                            <li>• Custom context managers</li>
                            <li>• Binary file handling</li>
                            <li>• Error propagation</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                        <h4 className="font-semibold text-blue-800 mb-3">Best Practice Pattern</h4>
                        <div className="bg-blue-100 rounded-md p-4 font-mono text-sm">
                          <div>with open('filename', 'mode') as file:</div>
                          <div className="ml-4"># Do file operations here</div>
                          <div className="ml-4"># File automatically closed</div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* CSV Files Section */}
                {activeSection === 'csv-files' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">CSV Files</h2>
                      
                      <p className="text-gray-700 mb-6">
                        CSV (Comma-Separated Values) files are ideal for tabular data. Python's csv module provides tools for reading and writing CSV data with proper handling of edge cases.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.csvFiles}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">Reading Methods</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• <code>csv.reader()</code> - Returns lists</li>
                            <li>• <code>csv.DictReader()</code> - Returns dictionaries</li>
                            <li>• Custom delimiters and formats</li>
                            <li>• Header row handling</li>
                          </ul>
                        </div>
                        
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                          <h4 className="font-semibold text-teal-800 mb-3">Writing Methods</h4>
                          <ul className="text-sm text-teal-700 space-y-1">
                            <li>• <code>csv.writer()</code> - Write lists</li>
                            <li>• <code>csv.DictWriter()</code> - Write dictionaries</li>
                            <li>• Custom formatting options</li>
                            <li>• Batch writing operations</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Common CSV Patterns</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Data Processing:</h5>
                          <code className="text-sm">Read CSV → Process data → Write results</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Data Analysis:</h5>
                          <code className="text-sm">Calculate sums, averages, grouping</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Format Conversion:</h5>
                          <code className="text-sm">CSV ↔ JSON, different delimiters</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* JSON Files Section */}
                {activeSection === 'json-files' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">JSON Files</h2>
                      
                      <p className="text-gray-700 mb-6">
                        JSON (JavaScript Object Notation) is perfect for structured data with nested objects and arrays. It's widely used for APIs, configuration files, and data exchange.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.jsonFiles}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <h4 className="font-semibold text-purple-800 mb-3">JSON Functions</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• <code>json.load()</code> - File to Python</li>
                            <li>• <code>json.dump()</code> - Python to file</li>
                            <li>• <code>json.loads()</code> - String to Python</li>
                            <li>• <code>json.dumps()</code> - Python to string</li>
                          </ul>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                          <h4 className="font-semibold text-yellow-800 mb-3">Supported Types</h4>
                          <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• ✅ str, int, float, bool, None</li>
                            <li>• ✅ list, dict</li>
                            <li>• ❌ tuple, set, custom objects</li>
                            <li>• ❌ functions, classes</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-400 p-6">
                        <h4 className="font-semibold text-green-800 mb-3">JSON Best Practices</h4>
                        <ul className="text-green-700 space-y-2">
                          <li>• Use <code>indent</code> parameter for readable output</li>
                          <li>• Handle JSON parsing errors with try-except</li>
                          <li>• Validate data structure before processing</li>
                          <li>• Use JSON for configuration and API data</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* File Paths Section */}
                {activeSection === 'file-paths' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">File Paths & OS Operations</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Working with file paths correctly ensures your code works across different operating systems. Python provides both traditional and modern approaches for path manipulation.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.filePaths}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">os Module (Traditional)</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>os.path.join()</code> - Combine paths</li>
                            <li>• <code>os.path.exists()</code> - Check existence</li>
                            <li>• <code>os.makedirs()</code> - Create directories</li>
                            <li>• <code>os.listdir()</code> - List contents</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">pathlib (Modern)</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Object-oriented approach</li>
                            <li>• <code>Path('folder') / 'file.txt'</code></li>
                            <li>• Built-in methods for common operations</li>
                            <li>• Better cross-platform support</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Path Operations Comparison</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-50 border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left">Operation</th>
                              <th className="px-4 py-2 text-left">os module</th>
                              <th className="px-4 py-2 text-left">pathlib</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm">
                            <tr className="border-t">
                              <td className="px-4 py-2 font-medium">Join paths</td>
                              <td className="px-4 py-2"><code>os.path.join(a, b)</code></td>
                              <td className="px-4 py-2"><code>Path(a) / b</code></td>
                            </tr>
                            <tr className="border-t">
                              <td className="px-4 py-2 font-medium">Check exists</td>
                              <td className="px-4 py-2"><code>os.path.exists(path)</code></td>
                              <td className="px-4 py-2"><code>Path(path).exists()</code></td>
                            </tr>
                            <tr className="border-t">
                              <td className="px-4 py-2 font-medium">Read file</td>
                              <td className="px-4 py-2"><code>open(path).read()</code></td>
                              <td className="px-4 py-2"><code>Path(path).read_text()</code></td>
                            </tr>
                          </tbody>
                        </table>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Log File Analyzer</h3>
                          <p className="text-gray-700 mb-4">
                            Create a program that reads log files and generates reports on errors, warnings, and activity patterns.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Functions: parse_log_line(), count_errors(), generate_report()<br/>
                              # Use context managers and error handling<br/>
                              # Output results to CSV or JSON format
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: Data Migration Tool</h3>
                          <p className="text-gray-700 mb-4">
                            Build a tool that converts between CSV and JSON formats while handling data validation and transformation.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Functions: csv_to_json(), json_to_csv(), validate_data()<br/>
                              # Handle different data types and missing values<br/>
                              # Use pathlib for cross-platform file operations
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: Configuration Manager</h3>
                          <p className="text-gray-700 mb-4">
                            Create a configuration system that loads settings from JSON files with defaults and validation.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Classes: ConfigManager with load(), save(), validate()<br/>
                              # Support nested configuration sections<br/>
                              # Implement configuration merging and overrides
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: File Backup System</h3>
                          <p className="text-gray-700 mb-4">
                            Develop a backup system that copies files, maintains directory structure, and tracks changes.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Functions: backup_directory(), compare_files(), restore_backup()<br/>
                              # Use pathlib for directory traversal<br/>
                              # Generate backup reports and logs
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-emerald-100 mb-6">
                          Take our interactive quiz to see how well you've mastered file handling and I/O operations!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/file-handling'}
                          className="bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default FileHandlingPage; 