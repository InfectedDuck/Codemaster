import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const StringManipulationPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'string-indexing', title: 'String Indexing', icon: '🔢' },
    { id: 'string-slicing', title: 'String Slicing', icon: '✂️' },
    { id: 'string-methods', title: 'String Methods', icon: '🛠️' },
    { id: 'string-formatting', title: 'String Formatting', icon: '📝' },
    { id: 'regex-basics', title: 'Regular Expressions', icon: '🔍' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    stringIndexing: `# String indexing examples
text = "Python"

# Positive indexing (starts from 0)
print(text[0])    # Output: P (first character)
print(text[1])    # Output: y (second character)
print(text[5])    # Output: n (last character)

# Negative indexing (starts from -1)
print(text[-1])   # Output: n (last character)
print(text[-2])   # Output: o (second to last)
print(text[-6])   # Output: P (first character)

# Length and indexing
message = "Hello World"
print(len(message))        # Output: 11
print(message[6])          # Output: W (7th character)
print(message[len(message)-1])  # Output: d (last character)

# Common indexing patterns
name = "Alice"
first_letter = name[0]          # A
last_letter = name[-1]          # e
middle_letter = name[len(name)//2]  # i

# Checking characters at positions
password = "secret123"
print(password[0].isalpha())    # True (first char is letter)
print(password[-1].isdigit())   # True (last char is digit)

# IndexError handling
try:
    print(text[10])  # This will raise an IndexError
except IndexError:
    print("Index out of range!")

# Using indexing in loops
word = "hello"
for i in range(len(word)):
    print(f"Character at index {i}: {word[i]}")`,

    stringSlicing: `# String slicing examples
text = "Programming"

# Basic slicing [start:stop]
print(text[0:4])     # Output: Prog (characters 0-3)
print(text[2:7])     # Output: ogram (characters 2-6)
print(text[4:])      # Output: ramming (from index 4 to end)
print(text[:4])      # Output: Prog (from start to index 3)

# Slicing with step [start:stop:step]
print(text[::2])     # Output: Pormig (every 2nd character)
print(text[1::2])    # Output: rgamn (every 2nd starting from index 1)
print(text[::3])     # Output: Prmn (every 3rd character)

# Negative slicing
print(text[-5:])     # Output: mming (last 5 characters)
print(text[:-3])     # Output: Programm (all except last 3)
print(text[-7:-2])   # Output: gramm (from -7 to -2)

# Reversing strings
print(text[::-1])    # Output: gnimmargorP (reverse entire string)
print(text[5:1:-1])  # Output: marg (reverse slice from 5 to 1)

# Advanced slicing patterns
sentence = "The quick brown fox"
words = sentence.split()
print(words[1:3])    # ['quick', 'brown']
print(words[::2])    # ['The', 'brown']

# Extracting parts of strings
email = "user@example.com"
username = email[:email.index('@')]  # user
domain = email[email.index('@')+1:]  # example.com

# Slicing with variables
start = 2
end = 8
step = 2
result = text[start:end:step]  # oga

# Safe slicing (won't raise errors)
short = "Hi"
print(short[:10])    # Output: Hi (doesn't error for out of range)
print(short[10:])    # Output: '' (empty string)`,

    stringMethods: `# Comprehensive string methods

text = "  Hello World  "

# Case modification methods
print(text.upper())      # "  HELLO WORLD  "
print(text.lower())      # "  hello world  "
print(text.title())      # "  Hello World  "
print(text.capitalize()) # "  hello world  "
print(text.swapcase())   # "  hELLO wORLD  "

# Whitespace methods
print(text.strip())      # "Hello World" (remove leading/trailing)
print(text.lstrip())     # "Hello World  " (remove leading)
print(text.rstrip())     # "  Hello World" (remove trailing)

# Search and check methods
message = "Python is awesome"
print(message.find("is"))        # 7 (index of first occurrence)
print(message.find("Java"))      # -1 (not found)
print(message.index("is"))       # 7 (index, raises error if not found)
print(message.count("o"))        # 2 (number of occurrences)

print(message.startswith("Python"))  # True
print(message.endswith("awesome"))   # True
print(message.startswith("Java"))    # False

# Content checking methods
word = "hello123"
print(word.isalnum())    # True (alphanumeric)
print(word.isalpha())    # False (contains digits)
print(word.isdigit())    # False (contains letters)
print(word.islower())    # True (all lowercase)
print(word.isupper())    # False (not all uppercase)

# Replacement methods
sentence = "I love Python programming"
print(sentence.replace("love", "enjoy"))  # "I enjoy Python programming"
print(sentence.replace("o", "0"))         # "I l0ve Pyth0n pr0gramming"
print(sentence.replace("o", "0", 2))      # "I l0ve Pyth0n programming" (max 2)

# Split and join methods
data = "apple,banana,orange"
fruits = data.split(",")         # ['apple', 'banana', 'orange']
print(" | ".join(fruits))        # "apple | banana | orange"

lines = "Line 1\nLine 2\nLine 3"
line_list = lines.split("\n")    # ['Line 1', 'Line 2', 'Line 3']

# Alignment methods
name = "Alice"
print(name.center(10))      # "  Alice   " (center in 10 chars)
print(name.ljust(10))       # "Alice     " (left justify)
print(name.rjust(10))       # "     Alice" (right justify)
print(name.center(10, "*")) # "**Alice***" (center with * padding)

# Advanced string methods
text = "hello world"
print(text.partition(" "))      # ('hello', ' ', 'world')
print(text.rpartition(" "))     # ('hello', ' ', 'world')

# String encoding/decoding
encoded = "hello".encode('utf-8')  # b'hello'
decoded = encoded.decode('utf-8')  # 'hello'

# String translation
translator = str.maketrans("aeiou", "12345")
result = "hello world".translate(translator)  # "h2ll4 w4rld"`,

    stringFormatting: `# String formatting methods

name = "Alice"
age = 25
score = 87.5

# 1. f-strings (recommended - Python 3.6+)
print(f"Hello, {name}!")
print(f"{name} is {age} years old")
print(f"Score: {score:.1f}%")  # Score: 87.5%

# f-strings with expressions
print(f"{name.upper()} scored {score:.0f} points")
print(f"Next year, {name} will be {age + 1}")
print(f"Average: {(85 + 90 + 78) / 3:.2f}")

# 2. .format() method
print("Hello, {}!".format(name))
print("{} is {} years old".format(name, age))
print("Score: {:.1f}%".format(score))

# Named placeholders with .format()
print("Hello, {name}! You are {age} years old".format(name=name, age=age))
print("{student} scored {points:.1f} points".format(student=name, points=score))

# Positional arguments with .format()
print("{0} is {1} years old. {0} likes Python".format(name, age))
print("{2}, {1}, {0}".format("A", "B", "C"))  # "C, B, A"

# 3. % formatting (older style)
print("Hello, %s!" % name)
print("%s is %d years old" % (name, age))
print("Score: %.1f%%" % score)

# Advanced formatting options
price = 19.99
quantity = 3

# Number formatting
print(f"Price: $\{price:.2f}")           # Price: $19.99
print(f"Total: $\{price * quantity:.2f}") # Total: $59.97
print(f"Quantity: {quantity:03d}")       # Quantity: 003 (zero padding)

# Alignment and width
print(f"|{name:>10}|")     # "|     Alice|" (right align in 10 chars)
print(f"|{name:<10}|")     # "|Alice     |" (left align)
print(f"|{name:^10}|")     # "|  Alice   |" (center)
print(f"|{name:*^10}|")    # "|**Alice***|" (center with * padding)

# Date and time formatting
from datetime import datetime
now = datetime.now()
print(f"Today is {now:%Y-%m-%d}")
print(f"Time: {now:%H:%M:%S}")

# Percentage formatting
accuracy = 0.8542
print(f"Accuracy: {accuracy:.1%}")      # Accuracy: 85.4%
print(f"Accuracy: {accuracy:.2%}")      # Accuracy: 85.42%

# Scientific notation
big_number = 1234567890
print(f"Scientific: {big_number:.2e}")  # Scientific: 1.23e+09

# Debugging with f-strings (Python 3.8+)
x = 10
y = 20
print(f"{x + y = }")                    # x + y = 30

# Multi-line f-strings
message = f"""
Dear {name},

Your score of {score:.1f}% is excellent!
You are {age} years old and doing great.

Best regards,
Python Academy
"""

# Complex formatting examples
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
print("Student Report:")
print("-" * 20)
for student, grade in students:
    print(f"{student:<10} {grade:>3}%")`,

    regexBasics: `# Regular expressions basics
import re

# Basic pattern matching
text = "The price is $25.99"

# Finding patterns
price_pattern = r'\$\d+\.\d+'
match = re.search(price_pattern, text)
if match:
    print(f"Found price: {match.group()}")  # Found price: $25.99

# Common regex patterns
email_pattern = r'\w+@\w+\.\w+'
phone_pattern = r'\d{3}-\d{3}-\d{4}'
date_pattern = r'\d{4}-\d{2}-\d{2}'

# Using re.findall() to find all matches
text = "Contact us at john@email.com or mary@company.org"
emails = re.findall(r'\w+@\w+\.\w+', text)
print(emails)  # ['john@email.com', 'mary@company.org']

# Using re.sub() for replacements
phone_text = "Call 123-456-7890 or 987-654-3210"
hidden_phones = re.sub(r'\d{3}-\d{3}-\d{4}', 'XXX-XXX-XXXX', phone_text)
print(hidden_phones)  # Call XXX-XXX-XXXX or XXX-XXX-XXXX

# Basic regex characters
# . - any character (except newline)
# * - zero or more repetitions
# + - one or more repetitions
# ? - zero or one repetition
# ^ - start of string
# $ - end of string
# \d - any digit
# \w - any word character
# \s - any whitespace

# Practical examples
def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def extract_numbers(text):
    return re.findall(r'\d+', text)

def clean_text(text):
    # Remove extra whitespace
    return re.sub(r'\s+', ' ', text.strip())

# Testing regex functions
print(validate_email("user@example.com"))    # True
print(validate_email("invalid-email"))       # False
print(extract_numbers("I have 5 cats and 3 dogs"))  # ['5', '3']
print(clean_text("  Hello    world  "))      # "Hello world"

# Case-insensitive matching
text = "Python is AWESOME"
matches = re.findall(r'python', text, re.IGNORECASE)
print(matches)  # ['Python']

# Grouping and capturing
date_text = "Today is 2024-01-15"
date_match = re.search(r'(\d{4})-(\d{2})-(\d{2})', date_text)
if date_match:
    year, month, day = date_match.groups()
    print(f"Year: {year}, Month: {month}, Day: {day}")

# Using regex for data cleaning
messy_data = "Name: John_Doe, Age: 25, Score: 87.5%"
clean_name = re.sub(r'_', ' ', messy_data)
numbers = re.findall(r'\d+\.?\d*', messy_data)  # ['25', '87.5']`,

    practicalExamples: `# Practical string manipulation examples

# 1. Text processing and analysis
def analyze_text(text):
    """Analyze text and return statistics"""
    text = text.lower().strip()
    
    # Count statistics
    char_count = len(text)
    word_count = len(text.split())
    sentence_count = text.count('.') + text.count('!') + text.count('?')
    
    # Find longest word
    words = text.split()
    longest_word = max(words, key=len) if words else ""
    
    return {
        'characters': char_count,
        'words': word_count,
        'sentences': sentence_count,
        'longest_word': longest_word
    }

# 2. Data validation functions
def validate_password(password):
    """Validate password strength"""
    if len(password) < 8:
        return False, "Too short"
    if not any(c.isupper() for c in password):
        return False, "No uppercase letter"
    if not any(c.islower() for c in password):
        return False, "No lowercase letter"
    if not any(c.isdigit() for c in password):
        return False, "No digit"
    return True, "Valid password"

def clean_phone_number(phone):
    """Clean and format phone number"""
    # Remove all non-digits
    digits = ''.join(filter(str.isdigit, phone))
    
    # Format as XXX-XXX-XXXX
    if len(digits) == 10:
        return f"{digits[:3]}-{digits[3:6]}-{digits[6:]}"
    return "Invalid phone number"

# 3. CSV data processing
def parse_csv_line(line):
    """Parse a CSV line handling quoted fields"""
    fields = []
    current_field = ""
    in_quotes = False
    
    for char in line:
        if char == '"':
            in_quotes = not in_quotes
        elif char == ',' and not in_quotes:
            fields.append(current_field.strip())
            current_field = ""
        else:
            current_field += char
    
    fields.append(current_field.strip())
    return fields

# 4. URL and file path manipulation
def extract_filename(url):
    """Extract filename from URL"""
    return url.split('/')[-1].split('?')[0]

def change_file_extension(filename, new_ext):
    """Change file extension"""
    name_part = filename.rsplit('.', 1)[0]
    return f"{name_part}.{new_ext}"

# 5. Text templating system
class SimpleTemplate:
    def __init__(self, template):
        self.template = template
    
    def render(self, **kwargs):
        result = self.template
        for key, value in kwargs.items():
            placeholder = f"{{{key}}}"
            result = result.replace(placeholder, str(value))
        return result

# Usage examples
sample_text = "Hello World! This is a test. How are you?"
stats = analyze_text(sample_text)
print(stats)

print(validate_password("MyPass123"))  # (True, "Valid password")
print(clean_phone_number("(555) 123-4567"))  # "555-123-4567"

csv_line = 'John,"Software Engineer","New York, NY",50000'
fields = parse_csv_line(csv_line)
print(fields)  # ['John', 'Software Engineer', 'New York, NY', '50000']

url = "https://example.com/files/document.pdf?version=1"
filename = extract_filename(url)
print(filename)  # "document.pdf"

# Template example
template = SimpleTemplate("Hello {name}, your score is {score}%")
message = template.render(name="Alice", score=95)
print(message)  # "Hello Alice, your score is 95%"`
  };

  return (
    <Layout title="String Manipulation & Formatting - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  String Manipulation & Formatting
                </h1>
                <p className="text-orange-100 text-lg">
                  Foundation Level • 45 minutes • Master advanced string operations and formatting
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">📝</div>
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
                          ? 'bg-orange-100 text-orange-700'
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced String Manipulation</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          Strings are fundamental in programming, and Python provides powerful tools for manipulating and formatting text. This lesson covers advanced string operations beyond the basics.
                        </p>

                        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-orange-900">
                                <strong>What you'll learn:</strong> String indexing and slicing, comprehensive string methods, advanced formatting techniques, and basic regular expressions for pattern matching.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">String Operations Overview</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">Indexing & Slicing</h4>
                            <p className="text-sm text-blue-700">Access individual characters and extract substrings</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">String Methods</h4>
                            <p className="text-sm text-green-700">Built-in functions for searching, replacing, and transforming</p>
                          </div>
                          
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">Formatting</h4>
                            <p className="text-sm text-purple-700">Create formatted output with f-strings and format methods</p>
                          </div>
                          
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Pattern Matching</h4>
                            <p className="text-sm text-red-700">Regular expressions for complex text processing</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Advanced String Skills Matter</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Process and validate user input effectively</li>
                          <li>Parse and extract data from text files</li>
                          <li>Create professional output formatting</li>
                          <li>Build text processing applications</li>
                          <li>Handle data cleaning and transformation tasks</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* String Indexing Section */}
                {activeSection === 'string-indexing' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">String Indexing</h2>
                      
                      <p className="text-gray-700 mb-6">
                        String indexing allows you to access individual characters in a string. Python uses zero-based indexing and supports negative indices.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.stringIndexing}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Positive Indexing</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Starts from 0 (first character)</li>
                            <li>• Goes to len(string)-1 (last character)</li>
                            <li>• Left to right direction</li>
                            <li>• Most commonly used</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Negative Indexing</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Starts from -1 (last character)</li>
                            <li>• Goes to -len(string) (first character)</li>
                            <li>• Right to left direction</li>
                            <li>• Useful for accessing from the end</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Important Notes</h4>
                        <ul className="text-yellow-700 space-y-2">
                          <li>• IndexError occurs when accessing invalid indices</li>
                          <li>• Strings are immutable - you can't change characters directly</li>
                          <li>• Use len() to get string length for safe indexing</li>
                          <li>• Negative indices count backwards from the end</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* String Slicing Section */}
                {activeSection === 'string-slicing' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">String Slicing</h2>
                      
                      <p className="text-gray-700 mb-6">
                        String slicing extracts substrings using the syntax [start:stop:step]. It's one of Python's most powerful string features.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.stringSlicing}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">[start:stop]</h4>
                          <p className="text-sm text-purple-700">Extract characters from start to stop-1</p>
                          <code className="text-xs bg-purple-100 px-2 py-1 rounded block mt-2">"hello"[1:4] → "ell"</code>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">[start:]</h4>
                          <p className="text-sm text-blue-700">From start to end of string</p>
                          <code className="text-xs bg-blue-100 px-2 py-1 rounded block mt-2">"hello"[2:] → "llo"</code>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">[:stop]</h4>
                          <p className="text-sm text-green-700">From beginning to stop-1</p>
                          <code className="text-xs bg-green-100 px-2 py-1 rounded block mt-2">"hello"[:3] → "hel"</code>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Slicing Patterns</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Reverse entire string:</h5>
                          <code className="text-sm">text[::-1]</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Every 2nd character:</h5>
                          <code className="text-sm">text[::2]</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Last 5 characters:</h5>
                          <code className="text-sm">text[-5:]</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* String Methods Section */}
                {activeSection === 'string-methods' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">String Methods</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Python provides dozens of built-in string methods for common text processing tasks. These methods don't modify the original string but return new strings.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.stringMethods}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Case Methods</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>upper()</code> - Convert to uppercase</li>
                            <li>• <code>lower()</code> - Convert to lowercase</li>
                            <li>• <code>title()</code> - Title case</li>
                            <li>• <code>capitalize()</code> - First letter uppercase</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Search Methods</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>find()</code> - Find substring index</li>
                            <li>• <code>count()</code> - Count occurrences</li>
                            <li>• <code>startswith()</code> - Check prefix</li>
                            <li>• <code>endswith()</code> - Check suffix</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Method Categories</h3>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h5 className="font-semibold text-purple-800 mb-2">Checking Methods</h5>
                          <ul className="text-xs text-purple-700 space-y-1">
                            <li>• isalpha(), isdigit()</li>
                            <li>• isalnum(), islower()</li>
                            <li>• isupper(), isspace()</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h5 className="font-semibold text-orange-800 mb-2">Modification Methods</h5>
                          <ul className="text-xs text-orange-700 space-y-1">
                            <li>• replace(), strip()</li>
                            <li>• split(), join()</li>
                            <li>• partition(), translate()</li>
                          </ul>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h5 className="font-semibold text-red-800 mb-2">Alignment Methods</h5>
                          <ul className="text-xs text-red-700 space-y-1">
                            <li>• center(), ljust()</li>
                            <li>• rjust(), zfill()</li>
                            <li>• expandtabs()</li>
                          </ul>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* String Formatting Section */}
                {activeSection === 'string-formatting' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">String Formatting</h2>
                      
                      <p className="text-gray-700 mb-6">
                        String formatting creates dynamic text by inserting variables and expressions into strings. Python offers several formatting methods.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.stringFormatting}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">f-strings (Recommended)</h4>
                          <p className="text-sm text-green-700">Modern, readable, and fast</p>
                          <code className="text-xs bg-green-100 px-2 py-1 rounded block mt-2">f"Hello {name}!"</code>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">.format() Method</h4>
                          <p className="text-sm text-blue-700">Flexible and widely supported</p>
                          <code className="text-xs bg-blue-100 px-2 py-1 rounded block mt-2">"Hello {}!".format(name)</code>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-800 mb-2">% Formatting</h4>
                          <p className="text-sm text-orange-700">Older style, still used</p>
                          <code className="text-xs bg-orange-100 px-2 py-1 rounded block mt-2">"Hello %s!" % name</code>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Formatting</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Number formatting:</h5>
                          <code className="text-sm">f"{'{'}price:.2f{'}'}" → "19.99"</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Alignment:</h5>
                          <code className="text-sm">f"{'{'}name:&gt;10{'}'}" → "     Alice"</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Percentage:</h5>
                          <code className="text-sm">f"{'{'}ratio:.1%{'}'}" → "85.4%"</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Regular Expressions Section */}
                {activeSection === 'regex-basics' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Regular Expressions Basics</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Regular expressions (regex) are powerful patterns for matching and manipulating text. Python's <code>re</code> module provides regex functionality.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.regexBasics}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Common Regex Characters</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>.</code> - Any character</li>
                            <li>• <code>\d</code> - Any digit</li>
                            <li>• <code>\w</code> - Any word character</li>
                            <li>• <code>\s</code> - Any whitespace</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Quantifiers</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>*</code> - Zero or more</li>
                            <li>• <code>+</code> - One or more</li>
                            <li>• <code>?</code> - Zero or one</li>
                            <li>• <code>{'{n}'}</code> - Exactly n times</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Regex Functions</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">re.search() - Find first match:</h5>
                          <code className="text-sm">re.search(pattern, text)</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">re.findall() - Find all matches:</h5>
                          <code className="text-sm">re.findall(pattern, text)</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">re.sub() - Replace matches:</h5>
                          <code className="text-sm">re.sub(pattern, replacement, text)</code>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Text Analyzer</h3>
                          <p className="text-gray-700 mb-4">
                            Create a function that analyzes text and returns word count, character count, and longest word.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Function: analyze_text(text)<br/>
                              # Return: dictionary with 'words', 'characters', 'longest_word'<br/>
                              # Use string methods and slicing
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: Data Formatter</h3>
                          <p className="text-gray-700 mb-4">
                            Build functions to format phone numbers, names, and prices consistently.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Functions: format_phone(), format_name(), format_price()<br/>
                              # Use string methods and f-string formatting<br/>
                              # Handle different input formats
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: String Validator</h3>
                          <p className="text-gray-700 mb-4">
                            Create validators for emails, passwords, and usernames using string methods and basic regex.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Functions: validate_email(), validate_password(), validate_username()<br/>
                              # Use string methods for basic validation<br/>
                              # Try simple regex patterns for email validation
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: Text Processor</h3>
                          <p className="text-gray-700 mb-4">
                            Build a text processing tool that cleans, extracts, and formats data from messy text.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Functions: clean_text(), extract_numbers(), extract_emails()<br/>
                              # Use string methods, slicing, and regex<br/>
                              # Handle multiple formats and edge cases
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-orange-100 mb-6">
                          Take our interactive quiz to see how well you've mastered string manipulation!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/string-manipulation'}
                          className="bg-white text-red-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default StringManipulationPage; 