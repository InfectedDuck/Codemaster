import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const DataStructuresPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'lists', title: 'Lists', icon: '📋' },
    { id: 'dictionaries', title: 'Dictionaries', icon: '📖' },
    { id: 'sets', title: 'Sets', icon: '🎯' },
    { id: 'tuples', title: 'Tuples', icon: '📦' },
    { id: 'comprehensions', title: 'Comprehensions', icon: '🔄' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    lists: `# Creating lists
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]
empty_list = []

# Accessing elements
print(fruits[0])    # apple (first element)
print(fruits[-1])   # cherry (last element)
print(fruits[1:3])  # ['banana', 'cherry'] (slicing)

# Modifying lists
fruits[0] = "orange"        # Change first element
fruits.append("grape")      # Add to end
fruits.insert(1, "kiwi")    # Insert at position 1
fruits.remove("banana")     # Remove specific element
last_fruit = fruits.pop()   # Remove and return last element

# List methods
numbers = [3, 1, 4, 1, 5]
numbers.sort()              # Sort in place: [1, 1, 3, 4, 5]
numbers.reverse()           # Reverse in place: [5, 4, 3, 1, 1]
count = numbers.count(1)    # Count occurrences: 2
index = numbers.index(4)    # Find index of first occurrence: 1

# List operations
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2    # [1, 2, 3, 4, 5, 6]
repeated = list1 * 2        # [1, 2, 3, 1, 2, 3]

# Common list patterns
# Check if element exists
if "apple" in fruits:
    print("Apple found!")

# Get length
print(len(fruits))

# Iterate over list
for fruit in fruits:
    print(fruit)

# Iterate with index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Copy lists
original = [1, 2, 3]
copy1 = original.copy()     # Shallow copy
copy2 = original[:]         # Slice copy
copy3 = list(original)      # Constructor copy

# Clear list
fruits.clear()              # Remove all elements

# Nested lists
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[1][2])         # Access element: 6`,

    dictionaries: `# Creating dictionaries
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A",
    "subjects": ["Math", "Science"]
}

# Alternative creation methods
empty_dict = {}
dict_from_pairs = dict([("a", 1), ("b", 2)])
dict_from_kwargs = dict(name="Bob", age=25)

# Accessing values
print(student["name"])      # Alice
print(student.get("age"))   # 20
print(student.get("height", "Unknown"))  # Unknown (default value)

# Modifying dictionaries
student["age"] = 21         # Update existing key
student["height"] = 165     # Add new key
student.update({"grade": "A+", "city": "New York"})  # Update multiple

# Dictionary methods
keys = student.keys()       # Get all keys
values = student.values()   # Get all values
items = student.items()     # Get key-value pairs

# Removing elements
age = student.pop("age")    # Remove and return value
last_item = student.popitem()  # Remove and return last item
del student["grade"]        # Delete key
student.clear()             # Remove all items

# Dictionary operations
# Check if key exists
if "name" in student:
    print("Name exists")

# Get all keys/values as lists
key_list = list(student.keys())
value_list = list(student.values())

# Iterate over dictionary
for key in student:
    print(f"{key}: {student[key]}")

for key, value in student.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Nested dictionaries
school = {
    "students": {
        "Alice": {"grade": "A", "age": 20},
        "Bob": {"grade": "B", "age": 19}
    },
    "teachers": {
        "Mr. Smith": {"subject": "Math"},
        "Ms. Johnson": {"subject": "Science"}
    }
}

# Access nested values
alice_grade = school["students"]["Alice"]["grade"]

# Copy dictionaries
original = {"a": 1, "b": 2}
shallow_copy = original.copy()
import copy
deep_copy = copy.deepcopy(original)

# Merge dictionaries (Python 3.9+)
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = dict1 | dict2      # {a: 1, b: 2, c: 3, d: 4}`,

    sets: `# Creating sets
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 4, 5}
empty_set = set()           # Note: {} creates an empty dict, not set

# Converting to set (removes duplicates)
numbers_list = [1, 2, 2, 3, 3, 3]
unique_numbers = set(numbers_list)  # {1, 2, 3}

# Adding elements
fruits.add("orange")        # Add single element
fruits.update(["grape", "kiwi"])  # Add multiple elements

# Removing elements
fruits.remove("banana")     # Remove (raises error if not found)
fruits.discard("banana")    # Remove (no error if not found)
random_fruit = fruits.pop() # Remove and return arbitrary element
fruits.clear()              # Remove all elements

# Set operations
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Union (all elements from both sets)
union = set1 | set2         # {1, 2, 3, 4, 5, 6}
union = set1.union(set2)    # Same result

# Intersection (common elements)
intersection = set1 & set2  # {3, 4}
intersection = set1.intersection(set2)  # Same result

# Difference (elements in set1 but not set2)
difference = set1 - set2    # {1, 2}
difference = set1.difference(set2)  # Same result

# Symmetric difference (elements in either set, but not both)
sym_diff = set1 ^ set2      # {1, 2, 5, 6}
sym_diff = set1.symmetric_difference(set2)  # Same result

# Set relationships
set_a = {1, 2}
set_b = {1, 2, 3, 4}

is_subset = set_a.issubset(set_b)      # True
is_superset = set_b.issuperset(set_a)  # True
is_disjoint = set_a.isdisjoint({5, 6}) # True (no common elements)

# Set comprehension
squares = {x**2 for x in range(5)}     # {0, 1, 4, 9, 16}
even_squares = {x**2 for x in range(10) if x % 2 == 0}  # {0, 4, 16, 36, 64}

# Practical use cases
# Remove duplicates from list
def remove_duplicates(lst):
    return list(set(lst))

# Find common elements
def find_common(list1, list2):
    return list(set(list1) & set(list2))

# Check if lists have any common elements
def have_common_elements(list1, list2):
    return not set(list1).isdisjoint(set(list2))`,

    tuples: `# Creating tuples
coordinates = (3, 5)
person = ("Alice", 25, "Engineer")
single_element = (42,)      # Comma needed for single element
empty_tuple = ()

# Alternative creation
point = 10, 20              # Parentheses optional
tuple_from_list = tuple([1, 2, 3])

# Accessing elements (like lists)
print(person[0])            # Alice
print(person[-1])           # Engineer
print(person[0:2])          # ('Alice', 25)

# Tuple unpacking
name, age, job = person     # Assign to multiple variables
x, y = coordinates          # Unpack coordinates

# Swapping variables using tuples
a, b = 10, 20
a, b = b, a                 # Swap values

# Tuple methods (only 2 methods!)
numbers = (1, 2, 3, 2, 4, 2)
count = numbers.count(2)    # Count occurrences: 3
index = numbers.index(3)    # Find first index: 2

# Tuple operations
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
combined = tuple1 + tuple2  # (1, 2, 3, 4, 5, 6)
repeated = tuple1 * 2       # (1, 2, 3, 1, 2, 3)

# Checking membership
if "Alice" in person:
    print("Alice found!")

# Length
print(len(person))          # 3

# Iterate over tuple
for item in person:
    print(item)

# Iterate with index
for i, item in enumerate(person):
    print(f"{i}: {item}")

# Nested tuples
nested = ((1, 2), (3, 4), (5, 6))
print(nested[1][0])         # Access nested element: 3

# Named tuples (from collections module)
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)             # Access by name: 10 20
print(p[0], p[1])           # Access by index: 10 20

# Use cases for tuples
# Return multiple values from function
def get_name_age():
    return "Bob", 30

# Dictionary keys (must be immutable)
locations = {
    (0, 0): "origin",
    (1, 1): "northeast",
    (0, 1): "north"
}

# Configuration settings (immutable)
DATABASE_CONFIG = ("localhost", 5432, "mydb", "user")

# Comparison with lists
# Tuples: immutable, ordered, allow duplicates, faster
# Lists: mutable, ordered, allow duplicates, more methods`,

    comprehensions: `# List comprehensions
# Basic syntax: [expression for item in iterable]

# Simple list comprehension
squares = [x**2 for x in range(10)]        # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
words = ["hello", "world", "python"]
lengths = [len(word) for word in words]    # [5, 5, 6]

# With condition (filtering)
# Syntax: [expression for item in iterable if condition]
even_squares = [x**2 for x in range(10) if x % 2 == 0]  # [0, 4, 16, 36, 64]
long_words = [word for word in words if len(word) > 5]  # ['python']

# Nested loops in comprehensions
matrix = [[i*j for j in range(3)] for i in range(3)]
# [[0, 0, 0], [0, 1, 2], [0, 2, 4]]

pairs = [(x, y) for x in range(3) for y in range(3)]
# [(0,0), (0,1), (0,2), (1,0), (1,1), (1,2), (2,0), (2,1), (2,2)]

# Dictionary comprehensions
# Basic syntax: {key_expr: value_expr for item in iterable}
word_lengths = {word: len(word) for word in words}
# {'hello': 5, 'world': 5, 'python': 6}

# With condition
long_word_lengths = {word: len(word) for word in words if len(word) > 4}
# {'hello': 5, 'world': 5, 'python': 6}

# Square numbers as dict
squares_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehensions
# Basic syntax: {expression for item in iterable}
unique_lengths = {len(word) for word in words}  # {5, 6}
unique_chars = {char.lower() for word in words for char in word}
# Set of all unique characters

# Practical examples
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter and transform
even_doubled = [x * 2 for x in numbers if x % 2 == 0]  # [4, 8, 12, 16, 20]

# String processing
sentence = "Hello World Python"
word_list = sentence.split()
capitalized = [word.upper() for word in word_list]  # ['HELLO', 'WORLD', 'PYTHON']

# Nested data processing
students = [
    {"name": "Alice", "grades": [85, 90, 78]},
    {"name": "Bob", "grades": [92, 88, 94]},
    {"name": "Charlie", "grades": [76, 82, 88]}
]

# Get all grades
all_grades = [grade for student in students for grade in student["grades"]]
# [85, 90, 78, 92, 88, 94, 76, 82, 88]

# Calculate averages
averages = {student["name"]: sum(student["grades"]) / len(student["grades"]) 
           for student in students}
# {'Alice': 84.33, 'Bob': 91.33, 'Charlie': 82.0}

# Conditional expressions in comprehensions
# Using if-else in the expression part
results = ["pass" if score >= 80 else "fail" for score in [75, 85, 92, 68]]
# ['fail', 'pass', 'pass', 'fail']

# Complex example: Flattening nested lists
nested_list = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flattened = [item for sublist in nested_list for item in sublist]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Generator expressions (similar syntax, but with parentheses)
squares_gen = (x**2 for x in range(10))  # Generator object, not list
# More memory efficient for large datasets

# When to use comprehensions vs loops
# Use comprehensions for:
# - Simple transformations
# - Filtering data
# - Creating new collections

# Use regular loops for:
# - Complex logic
# - Multiple statements
# - Better readability with complex operations`,

    advanced: `# Advanced data structure operations

# Nested dictionary operations
data = {
    "users": {
        "123": {"name": "Alice", "posts": [1, 2, 3]},
        "456": {"name": "Bob", "posts": [4, 5]}
    },
    "posts": {
        "1": {"title": "Hello", "author": "123"},
        "2": {"title": "World", "author": "123"}
    }
}

# Safe nested access with get()
alice_posts = data.get("users", {}).get("123", {}).get("posts", [])

# Merging dictionaries
defaults = {"theme": "light", "language": "en"}
user_prefs = {"theme": "dark"}
final_prefs = {**defaults, **user_prefs}  # {'theme': 'dark', 'language': 'en'}

# Working with multiple data structures
# List of dictionaries
products = [
    {"name": "Laptop", "price": 999, "category": "Electronics"},
    {"name": "Book", "price": 15, "category": "Education"},
    {"name": "Phone", "price": 699, "category": "Electronics"}
]

# Filter products by category
electronics = [p for p in products if p["category"] == "Electronics"]

# Group by category
from collections import defaultdict
by_category = defaultdict(list)
for product in products:
    by_category[product["category"]].append(product)

# Sort by price
sorted_products = sorted(products, key=lambda x: x["price"])

# Data validation and cleaning
def clean_data(data_list):
    """Clean and validate list of dictionaries"""
    cleaned = []
    for item in data_list:
        if isinstance(item, dict) and "name" in item and "price" in item:
            # Ensure price is numeric
            try:
                item["price"] = float(item["price"])
                cleaned.append(item)
            except (ValueError, TypeError):
                continue  # Skip invalid items
    return cleaned

# Working with complex nested structures
json_data = {
    "metadata": {"version": "1.0", "created": "2024-01-01"},
    "data": [
        {
            "id": 1,
            "attributes": {
                "personal": {"name": "Alice", "age": 30},
                "professional": {"title": "Engineer", "skills": ["Python", "JavaScript"]}
            }
        }
    ]
}

# Extract all skills
all_skills = []
for item in json_data.get("data", []):
    skills = item.get("attributes", {}).get("professional", {}).get("skills", [])
    all_skills.extend(skills)

# Using sets for data analysis
# Find unique skills
unique_skills = set(all_skills)

# Compare skill sets
alice_skills = {"Python", "JavaScript", "SQL"}
bob_skills = {"Python", "Java", "C++"}

common_skills = alice_skills & bob_skills     # Intersection
all_skills_combined = alice_skills | bob_skills  # Union
alice_only = alice_skills - bob_skills        # Difference

# Memory and performance considerations
import sys

# Check memory usage
small_list = [1, 2, 3]
large_list = list(range(1000000))
print(f"Small list size: {sys.getsizeof(small_list)} bytes")
print(f"Large list size: {sys.getsizeof(large_list)} bytes")

# Use generators for large datasets
def fibonacci_gen(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# More efficient than creating a large list
fib_numbers = list(fibonacci_gen(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Data Structures
                </h1>
                <p className="text-blue-100 text-lg">
                  Intermediate Level • 70 minutes • Master Python's built-in data structures
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">📊</div>
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
                          ? 'bg-blue-100 text-blue-700'
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction to Data Structures</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          Data structures are fundamental building blocks for organizing and storing data efficiently. Python provides several powerful built-in data structures that form the foundation of most programs.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-blue-900">
                                <strong>What you'll learn:</strong> Master lists, dictionaries, sets, and tuples. Understand when to use each structure, explore list comprehensions, and work with nested data structures effectively.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Python's Core Data Structures</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">📋 Lists</h4>
                            <p className="text-sm text-green-700">Ordered, mutable collections that can hold any data type</p>
                          </div>
                          
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">📖 Dictionaries</h4>
                            <p className="text-sm text-purple-700">Key-value pairs for fast lookups and data mapping</p>
                          </div>
                          
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">🎯 Sets</h4>
                            <p className="text-sm text-orange-700">Unordered collections of unique elements</p>
                          </div>
                          
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">📦 Tuples</h4>
                            <p className="text-sm text-red-700">Immutable, ordered collections for fixed data</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Choosing the Right Data Structure</h3>
                        <div className="bg-gray-100 rounded-lg p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3">When to Use Lists:</h5>
                              <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Need ordered data</li>
                                <li>• Elements can change</li>
                                <li>• Allow duplicates</li>
                                <li>• Access by index</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3">When to Use Dictionaries:</h5>
                              <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Need key-value mapping</li>
                                <li>• Fast lookups required</li>
                                <li>• Represent structured data</li>
                                <li>• Dynamic key creation</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Lists Section */}
                {activeSection === 'lists' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Lists</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Lists are ordered, mutable collections that can store elements of any data type. They're one of the most versatile and commonly used data structures in Python.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.lists}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Adding Elements</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>append()</code> - Add to end</li>
                            <li>• <code>insert()</code> - Add at position</li>
                            <li>• <code>extend()</code> - Add multiple</li>
                            <li>• <code>+=</code> - Concatenate</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Removing Elements</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>remove()</code> - Remove by value</li>
                            <li>• <code>pop()</code> - Remove by index</li>
                            <li>• <code>del</code> - Delete by index</li>
                            <li>• <code>clear()</code> - Remove all</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">List Methods</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• <code>sort()</code> - Sort in place</li>
                            <li>• <code>reverse()</code> - Reverse order</li>
                            <li>• <code>count()</code> - Count occurrences</li>
                            <li>• <code>index()</code> - Find position</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">💡 List Best Practices</h4>
                        <ul className="text-yellow-700 space-y-2">
                          <li>• Use list comprehensions for simple transformations</li>
                          <li>• Be careful with list copying (shallow vs deep)</li>
                          <li>• Consider memory usage with large lists</li>
                          <li>• Use enumerate() when you need both index and value</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Dictionaries Section */}
                {activeSection === 'dictionaries' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dictionaries</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Dictionaries store data as key-value pairs, providing fast lookups and flexible data organization. They're perfect for mapping relationships and structured data.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.dictionaries}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <h4 className="font-semibold text-purple-800 mb-3">Dictionary Methods</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• <code>keys()</code> - Get all keys</li>
                            <li>• <code>values()</code> - Get all values</li>
                            <li>• <code>items()</code> - Get key-value pairs</li>
                            <li>• <code>get()</code> - Safe value access</li>
                            <li>• <code>pop()</code> - Remove and return</li>
                            <li>• <code>update()</code> - Merge dictionaries</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">Key Requirements</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Must be immutable (strings, numbers, tuples)</li>
                            <li>• Must be unique within the dictionary</li>
                            <li>• Case-sensitive for strings</li>
                            <li>• Cannot use lists or dictionaries as keys</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Dictionary Patterns</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Safe value access:</h5>
                          <code className="text-sm">value = my_dict.get('key', 'default')</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Check if key exists:</h5>
                          <code className="text-sm">if 'key' in my_dict:</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Iterate over items:</h5>
                          <code className="text-sm">for key, value in my_dict.items():</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Sets Section */}
                {activeSection === 'sets' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sets</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Sets are unordered collections of unique elements. They're perfect for removing duplicates, membership testing, and mathematical set operations.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.sets}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Set Operations</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>|</code> or <code>union()</code> - All elements</li>
                            <li>• <code>&</code> or <code>intersection()</code> - Common elements</li>
                            <li>• <code>-</code> or <code>difference()</code> - Elements in first only</li>
                            <li>• <code>^</code> or <code>symmetric_difference()</code> - Unique to each</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Set Methods</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>add()</code> - Add single element</li>
                            <li>• <code>update()</code> - Add multiple elements</li>
                            <li>• <code>remove()</code> - Remove (error if not found)</li>
                            <li>• <code>discard()</code> - Remove (no error)</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">When to Use Sets</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h5 className="font-semibold text-orange-800 mb-2">Remove Duplicates</h5>
                          <p className="text-sm text-orange-700">Convert list to set to eliminate duplicate values</p>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h5 className="font-semibold text-red-800 mb-2">Membership Testing</h5>
                          <p className="text-sm text-red-700">Fast checking if element exists in collection</p>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h5 className="font-semibold text-purple-800 mb-2">Mathematical Operations</h5>
                          <p className="text-sm text-purple-700">Union, intersection, difference operations</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Tuples Section */}
                {activeSection === 'tuples' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tuples</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Tuples are immutable, ordered collections. They're perfect for storing related data that shouldn't change, and for returning multiple values from functions.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.tuples}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">✅ Advantages of Tuples</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Immutable (data integrity)</li>
                            <li>• Faster than lists</li>
                            <li>• Can be dictionary keys</li>
                            <li>• Support unpacking</li>
                            <li>• Thread-safe</li>
                          </ul>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">⚠️ Limitations</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Cannot be modified</li>
                            <li>• Only 2 methods (count, index)</li>
                            <li>• No append/remove operations</li>
                            <li>• Comma needed for single element</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Tuple Use Cases</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Returning multiple values:</h5>
                          <code className="text-sm">def get_coordinates(): return x, y</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Dictionary keys:</h5>
                          <code className="text-sm">{`locations = {(0, 0): 'origin', (1, 1): 'northeast'}`}</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Configuration data:</h5>
                          <code className="text-sm">DATABASE_CONFIG = ('localhost', 5432, 'mydb')</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Comprehensions Section */}
                {activeSection === 'comprehensions' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">List Comprehensions & More</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Comprehensions provide a concise way to create lists, dictionaries, and sets. They're more efficient and readable than traditional loops for simple transformations.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.comprehensions}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">List Comprehensions</h4>
                          <p className="text-sm text-green-700 mb-2">Create lists with filtering and transformation</p>
                          <code className="text-xs bg-green-100 px-2 py-1 rounded block">[x*2 for x in range(5)]</code>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Dict Comprehensions</h4>
                          <p className="text-sm text-blue-700 mb-2">Create dictionaries with key-value mapping</p>
                          <code className="text-xs bg-blue-100 px-2 py-1 rounded block">{'{x: x**2 for x in range(5)}'}</code>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Set Comprehensions</h4>
                          <p className="text-sm text-purple-700 mb-2">Create sets with unique elements</p>
                          <code className="text-xs bg-purple-100 px-2 py-1 rounded block">{'{x%3 for x in range(10)}'}</code>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehension Syntax</h3>
                      <div className="bg-gray-100 rounded-lg p-6 mb-6">
                        <div className="space-y-3">
                          <div>
                            <strong>Basic:</strong> <code>[expression for item in iterable]</code>
                          </div>
                          <div>
                            <strong>With filter:</strong> <code>[expression for item in iterable if condition]</code>
                          </div>
                          <div>
                            <strong>Nested:</strong> <code>[expression for item in iterable for subitem in item]</code>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 border-l-4 border-orange-400 p-6">
                        <h4 className="font-semibold text-orange-800 mb-3">When to Use Comprehensions</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-orange-700">
                          <div>
                            <h5 className="font-medium mb-2">✅ Good for:</h5>
                            <ul className="text-sm space-y-1">
                              <li>• Simple transformations</li>
                              <li>• Filtering data</li>
                              <li>• One-line operations</li>
                              <li>• Creating new collections</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">❌ Avoid for:</h5>
                            <ul className="text-sm space-y-1">
                              <li>• Complex logic</li>
                              <li>• Multiple statements</li>
                              <li>• Hard to read code</li>
                              <li>• Side effects</li>
                            </ul>
                          </div>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Data Management System</h3>
                          <p className="text-gray-700 mb-4">
                            Create a student management system using lists and dictionaries to store and manipulate student data.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Create a list of student dictionaries<br/>
                              # Functions: add_student(), find_student(), update_grades()<br/>
                              # Use list comprehensions to filter and analyze data
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: Set Operations</h3>
                          <p className="text-gray-700 mb-4">
                            Build functions to analyze relationships between different sets of data using set operations.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Functions: find_common_interests(), unique_skills(), skill_overlap()<br/>
                              # Use sets to find intersections, unions, and differences<br/>
                              # Apply to real scenarios like job matching
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: Data Analysis</h3>
                          <p className="text-gray-700 mb-4">
                            Process and analyze complex nested data structures using comprehensions and data structure methods.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Nested dictionaries representing sales data<br/>
                              # Use comprehensions to calculate totals, averages, trends<br/>
                              # Group data by categories, time periods, regions
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: Data Structure Optimization</h3>
                          <p className="text-gray-700 mb-4">
                            Choose and implement the most efficient data structures for different scenarios.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Scenarios: inventory tracking, user preferences, task scheduling<br/>
                              # Compare performance of different approaches<br/>
                              # Implement caching, deduplication, fast lookups
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-blue-100 mb-6">
                          Take our interactive quiz to see how well you've mastered Python data structures!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/data-structures'}
                          className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default DataStructuresPage; 