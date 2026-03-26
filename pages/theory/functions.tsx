import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';
import { usePageTranslation } from '../../contexts/LanguageContext';

const FunctionsPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const { t } = usePageTranslation('theory-pages/functions');

  const sections = [
    { id: 'introduction', title: t('sections.introduction.navTitle'), icon: '📚' },
    { id: 'defining-functions', title: t('sections.definingFunctions.navTitle'), icon: '⚙️' },
    { id: 'parameters-arguments', title: t('sections.parametersArguments.navTitle'), icon: '📥' },
    { id: 'return-values', title: t('sections.returnValues.navTitle'), icon: '📤' },
    { id: 'scope', title: t('sections.scope.navTitle'), icon: '🎯' },
    { id: 'error-handling', title: t('sections.errorHandling.navTitle'), icon: '🛡️' },
    { id: 'practice', title: t('sections.practice.navTitle'), icon: '💪' }
  ];

  const codeExamples = {
    definingFunctions: `# Basic function definition
def greet():
    print("Hello, World!")

# Calling the function
greet()  # Output: Hello, World!

# Function with a single parameter
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")  # Output: Hello, Alice!

# Function with multiple parameters
def add_numbers(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add_numbers(5, 3)  # Output: 5 + 3 = 8

# Function with return value
def multiply(x, y):
    return x * y

result = multiply(4, 6)
print(result)  # Output: 24

# Function with docstring (documentation)
def calculate_area(length, width):
    """
    Calculate the area of a rectangle.
    
    Args:
        length: The length of the rectangle
        width: The width of the rectangle
    
    Returns:
        The area of the rectangle
    """
    return length * width

area = calculate_area(10, 5)
print(f"Area: {area}")  # Output: Area: 50`,

    parametersArguments: `# Functions with different parameter types

# Required parameters
def describe_pet(name, animal_type):
    print(f"I have a {animal_type} named {name}")

describe_pet("Max", "dog")  # Output: I have a dog named Max

# Default parameters
def describe_pet_default(name, animal_type="dog"):
    print(f"I have a {animal_type} named {name}")

describe_pet_default("Max")        # Output: I have a dog named Max
describe_pet_default("Whiskers", "cat")  # Output: I have a cat named Whiskers

# Keyword arguments
describe_pet_default(animal_type="bird", name="Polly")

# Function with multiple default parameters
def create_profile(name, age=18, city="Unknown", student=True):
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"City: {city}")
    print(f"Student: {student}")

# Different ways to call the function
create_profile("Alice")
create_profile("Bob", 25)
create_profile("Charlie", city="New York")
create_profile("Diana", 22, "Boston", False)

# Variable-length arguments (*args)
def sum_numbers(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sum_numbers(1, 2, 3))        # Output: 6
print(sum_numbers(10, 20, 30, 40)) # Output: 100

# Keyword arguments (**kwargs)
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Boston")`,

    returnValues: `# Functions with return values

# Simple return
def square(number):
    return number * number

result = square(5)
print(result)  # Output: 25

# Multiple return values
def get_name_age():
    name = "Alice"
    age = 25
    return name, age  # Returns a tuple

person_name, person_age = get_name_age()
print(f"Name: {person_name}, Age: {person_age}")

# Conditional returns
def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

grade = get_grade(85)
print(f"Grade: {grade}")  # Output: Grade: B

# Function returning different data types
def process_number(num):
    if num > 0:
        return num * 2  # Returns integer
    elif num == 0:
        return "Zero"   # Returns string
    else:
        return False    # Returns boolean

print(process_number(5))    # Output: 10
print(process_number(0))    # Output: Zero
print(process_number(-1))   # Output: False

# Function without explicit return (returns None)
def print_message(message):
    print(message)
    # No return statement

result = print_message("Hello")
print(result)  # Output: None

# Early return pattern
def check_positive(number):
    if number <= 0:
        return False  # Early return
    
    # Continue with positive number logic
    print(f"{number} is positive")
    return True`,

    scope: `# Variable scope examples

# Global variable
global_var = "I am global"

def demonstrate_scope():
    # Local variable
    local_var = "I am local"
    print(f"Inside function: {global_var}")  # Can access global
    print(f"Inside function: {local_var}")   # Can access local

demonstrate_scope()
print(f"Outside function: {global_var}")  # Can access global
# print(local_var)  # This would cause an error - local_var not accessible

# Local variables shadow global variables
name = "Global Alice"

def greet():
    name = "Local Bob"  # This shadows the global variable
    print(f"Hello, {name}")

greet()        # Output: Hello, Local Bob
print(name)    # Output: Global Alice

# Using global keyword to modify global variables
counter = 0  # Global variable

def increment():
    global counter  # Declare we want to modify the global
    counter += 1
    print(f"Counter: {counter}")

increment()  # Output: Counter: 1
increment()  # Output: Counter: 2
print(counter)  # Output: 2

# Function parameters are local
def process_value(value):
    value = value * 2  # This only affects the local parameter
    print(f"Inside function: {value}")

original = 10
process_value(original)
print(f"Original value: {original}")  # Original is unchanged

# Nested function scope
def outer_function():
    outer_var = "I am in outer function"
    
    def inner_function():
        inner_var = "I am in inner function"
        print(outer_var)  # Can access outer function's variable
        print(inner_var)  # Can access own variable
    
    inner_function()
    print(outer_var)  # Can access own variable
    # print(inner_var)  # This would cause an error

outer_function()`,

    errorHandling: `# Basic error handling with try-except

# Handling division by zero
def safe_divide(a, b):
    try:
        result = a / b
        print(f"{a} / {b} = {result}")
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None

safe_divide(10, 2)  # Output: 10 / 2 = 5.0
safe_divide(10, 0)  # Output: Error: Cannot divide by zero!

# Handling multiple exception types
def convert_to_int(value):
    try:
        number = int(value)
        print(f"Converted '{value}' to {number}")
        return number
    except ValueError:
        print(f"Error: '{value}' is not a valid number")
        return None
    except TypeError:
        print("Error: Invalid data type provided")
        return None

convert_to_int("123")   # Output: Converted '123' to 123
convert_to_int("abc")   # Output: Error: 'abc' is not a valid number
convert_to_int(None)    # Output: Error: Invalid data type provided

# Try-except-else-finally
def read_number():
    try:
        user_input = input("Enter a number: ")
        number = float(user_input)
    except ValueError:
        print("That's not a valid number!")
        return None
    else:
        print("Number successfully read!")
        return number
    finally:
        print("Input processing completed.")

# Using exception handling in functions
def get_list_item(my_list, index):
    try:
        return my_list[index]
    except IndexError:
        print(f"Error: Index {index} is out of range")
        return None
    except TypeError:
        print("Error: Invalid index type")
        return None

my_numbers = [1, 2, 3, 4, 5]
print(get_list_item(my_numbers, 2))   # Output: 3
print(get_list_item(my_numbers, 10))  # Output: Error: Index 10 is out of range

# Raising custom exceptions
def validate_age(age):
    try:
        age = int(age)
        if age < 0:
            raise ValueError("Age cannot be negative")
        if age > 150:
            raise ValueError("Age seems unrealistic")
        return age
    except ValueError as e:
        print(f"Invalid age: {e}")
        return None

validate_age(25)    # Returns 25
validate_age(-5)    # Output: Invalid age: Age cannot be negative
validate_age("abc") # Output: Invalid age: invalid literal for int()`,

    practicalExamples: `# Practical function examples

# Calculator functions
def calculator():
    def add(x, y):
        return x + y
    
    def subtract(x, y):
        return x - y
    
    def multiply(x, y):
        return x * y
    
    def divide(x, y):
        try:
            return x / y
        except ZeroDivisionError:
            return "Error: Division by zero"
    
    return add, subtract, multiply, divide

# Get the calculator functions
add_func, sub_func, mul_func, div_func = calculator()

print(add_func(10, 5))  # Output: 15
print(div_func(10, 0))  # Output: Error: Division by zero

# Password validator
def validate_password(password):
    """
    Validate password strength
    Returns: (is_valid, error_message)
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    has_upper = False
    has_lower = False
    has_digit = False
    
    for char in password:
        if char.isupper():
            has_upper = True
        elif char.islower():
            has_lower = True
        elif char.isdigit():
            has_digit = True
    
    if not has_upper:
        return False, "Password must contain at least one uppercase letter"
    if not has_lower:
        return False, "Password must contain at least one lowercase letter"
    if not has_digit:
        return False, "Password must contain at least one digit"
    
    return True, "Password is valid"

# Test the password validator
is_valid, message = validate_password("MyPass123")
print(f"Valid: {is_valid}, Message: {message}")

# Temperature converter
def celsius_to_fahrenheit(celsius):
    try:
        celsius = float(celsius)
        fahrenheit = (celsius * 9/5) + 32
        return fahrenheit
    except (ValueError, TypeError):
        return None

def fahrenheit_to_celsius(fahrenheit):
    try:
        fahrenheit = float(fahrenheit)
        celsius = (fahrenheit - 32) * 5/9
        return celsius
    except (ValueError, TypeError):
        return None

print(f"25°C = {celsius_to_fahrenheit(25)}°F")  # Output: 25°C = 77.0°F
print(f"77°F = {fahrenheit_to_celsius(77)}°C")  # Output: 77°F = 25.0°C`
  };

  return (
    <Layout title={t('pageTitle')}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {t('header.title')}
                </h1>
                <p className="text-purple-100 text-lg">
                  {t('header.subtitle')}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">⚙️</div>
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
                <h3 className="font-semibold text-gray-900 mb-4">{t('sidebar.title')}</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-purple-100 text-purple-700'
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.introduction.title')}</h2>

                        <p className="text-lg text-gray-700 mb-6">
                          {t('sections.introduction.paragraph1')}
                        </p>

                        <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-purple-900" dangerouslySetInnerHTML={{ __html: t('sections.introduction.callout') }} />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.introduction.whyTitle')}</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">{t('sections.introduction.cards.reusability.title')}</h4>
                            <p className="text-sm text-blue-700">{t('sections.introduction.cards.reusability.description')}</p>
                          </div>

                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">{t('sections.introduction.cards.organization.title')}</h4>
                            <p className="text-sm text-green-700">{t('sections.introduction.cards.organization.description')}</p>
                          </div>

                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">{t('sections.introduction.cards.testing.title')}</h4>
                            <p className="text-sm text-orange-700">{t('sections.introduction.cards.testing.description')}</p>
                          </div>

                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">{t('sections.introduction.cards.collaboration.title')}</h4>
                            <p className="text-sm text-red-700">{t('sections.introduction.cards.collaboration.description')}</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.introduction.anatomyTitle')}</h3>
                        <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                          <div className="text-blue-600">def</div> <div className="text-green-600 inline">function_name</div><div className="text-purple-600 inline">(parameters)</div><div className="text-red-600 inline">:</div><br/>
                          <div className="ml-4 text-gray-600">"""Optional docstring"""</div><br/>
                          <div className="ml-4 text-gray-800">function body</div><br/>
                          <div className="ml-4 text-orange-600">return</div> <div className="text-gray-800 inline">value  # Optional</div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Defining Functions Section */}
                {activeSection === 'defining-functions' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.definingFunctions.title')}</h2>

                      <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: t('sections.definingFunctions.paragraph1') }} />

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.definingFunctions}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">{t('sections.definingFunctions.namingRulesTitle')}</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            {[0, 1, 2, 3].map((i) => (
                              <li key={i}>• {t(`sections.definingFunctions.namingRules.${i}`)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">{t('sections.definingFunctions.bestPracticesTitle')}</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            {[0, 1, 2, 3].map((i) => (
                              <li key={i}>• {t(`sections.definingFunctions.bestPractices.${i}`)}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">💡 {t('sections.definingFunctions.tipsTitle')}</h4>
                        <ul className="text-yellow-700 space-y-2">
                          {[0, 1, 2, 3].map((i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: '• ' + t(`sections.definingFunctions.tips.${i}`) }} />
                          ))}
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Parameters & Arguments Section */}
                {activeSection === 'parameters-arguments' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.parametersArguments.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.parametersArguments.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.parametersArguments}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">{t('sections.parametersArguments.requiredTitle')}</h4>
                          <p className="text-sm text-purple-700">{t('sections.parametersArguments.requiredDescription')}</p>
                          <code className="text-xs bg-purple-100 px-2 py-1 rounded block mt-2">def func(a, b):</code>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">{t('sections.parametersArguments.defaultTitle')}</h4>
                          <p className="text-sm text-blue-700">{t('sections.parametersArguments.defaultDescription')}</p>
                          <code className="text-xs bg-blue-100 px-2 py-1 rounded block mt-2">def func(a, b=10):</code>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">{t('sections.parametersArguments.keywordTitle')}</h4>
                          <p className="text-sm text-green-700">{t('sections.parametersArguments.keywordDescription')}</p>
                          <code className="text-xs bg-green-100 px-2 py-1 rounded block mt-2">func(b=20, a=5)</code>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.parametersArguments.passingMethodsTitle')}</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.parametersArguments.positionalTitle')}</h5>
                          <code className="text-sm">func(5, 10)  # a=5, b=10</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.parametersArguments.keywordArgsTitle')}</h5>
                          <code className="text-sm">func(b=10, a=5)  # a=5, b=10</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.parametersArguments.mixedTitle')}</h5>
                          <code className="text-sm">func(5, b=10)  # a=5, b=10</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Return Values Section */}
                {activeSection === 'return-values' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.returnValues.title')}</h2>

                      <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: t('sections.returnValues.paragraph1') }} />

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.returnValues}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">✅ {t('sections.returnValues.bestPracticesTitle')}</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            {[0, 1, 2, 3].map((i) => (
                              <li key={i}>• {t(`sections.returnValues.bestPractices.${i}`)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">{t('sections.returnValues.typesTitle')}</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            {[0, 1, 2, 3].map((i) => (
                              <li key={i} dangerouslySetInnerHTML={{ __html: '• ' + t(`sections.returnValues.types.${i}`) }} />
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-orange-50 border-l-4 border-orange-400 p-6">
                        <h4 className="font-semibold text-orange-800 mb-3">⚠️ {t('sections.returnValues.importantTitle')}</h4>
                        <ul className="text-orange-700 space-y-2">
                          {[0, 1, 2, 3].map((i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: '• ' + t(`sections.returnValues.importantNotes.${i}`) }} />
                          ))}
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Variable Scope Section */}
                {activeSection === 'scope' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.scope.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.scope.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.scope}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="font-semibold text-red-800 mb-2">{t('sections.scope.localTitle')}</h4>
                          <p className="text-sm text-red-700">{t('sections.scope.localDescription')}</p>
                          <p className="text-xs text-red-600 mt-2">{t('sections.scope.localNote')}</p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">{t('sections.scope.globalTitle')}</h4>
                          <p className="text-sm text-blue-700">{t('sections.scope.globalDescription')}</p>
                          <p className="text-xs text-blue-600 mt-2">{t('sections.scope.globalNote')}</p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">{t('sections.scope.builtinTitle')}</h4>
                          <p className="text-sm text-green-700">{t('sections.scope.builtinDescription')}</p>
                          <p className="text-xs text-green-600 mt-2">{t('sections.scope.builtinNote')}</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.scope.legbTitle')}</h3>
                      <div className="bg-gray-100 rounded-lg p-6 mb-6">
                        <p className="text-gray-700 mb-4">{t('sections.scope.legbParagraph')}</p>
                        <ol className="list-decimal list-inside text-gray-700 space-y-2">
                          {[0, 1, 2, 3].map((i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: t(`sections.scope.legbRules.${i}`) }} />
                          ))}
                        </ol>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">{t('sections.scope.bestPracticesTitle')}</h4>
                        <ul className="text-yellow-700 space-y-2">
                          {[0, 1, 2, 3].map((i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: '• ' + t(`sections.scope.bestPractices.${i}`) }} />
                          ))}
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Error Handling Section */}
                {activeSection === 'error-handling' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.errorHandling.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.errorHandling.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.errorHandling}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">{t('sections.errorHandling.exceptionTypesTitle')}</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            {[0, 1, 2, 3].map((i) => (
                              <li key={i} dangerouslySetInnerHTML={{ __html: '• ' + t(`sections.errorHandling.exceptionTypes.${i}`) }} />
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">{t('sections.errorHandling.structureTitle')}</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            {[0, 1, 2, 3].map((i) => (
                              <li key={i} dangerouslySetInnerHTML={{ __html: '• ' + t(`sections.errorHandling.structureItems.${i}`) }} />
                            ))}
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.errorHandling.patternsTitle')}</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.errorHandling.basicPatternTitle')}</h5>
                          <code className="text-sm">try: risky_operation() except Exception: handle_error()</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.errorHandling.specificPatternTitle')}</h5>
                          <code className="text-sm">except ValueError: handle_value_error()</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.errorHandling.multiplePatternTitle')}</h5>
                          <code className="text-sm">except (ValueError, TypeError): handle_error()</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Practice Section */}
                {activeSection === 'practice' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.practice.title')}</h2>

                      <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise1Title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise1Description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Create functions: add(), subtract(), multiply(), divide()<br/>
                              # Each should take two parameters and return the result<br/>
                              # Handle division by zero in the divide function
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise2Title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise2Description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Function: calculate_grade(score)<br/>
                              # Returns: A, B, C, D, or F based on score<br/>
                              # Handle invalid scores (negative or &gt; 100)
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise3Title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise3Description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Function: get_positive_number(prompt)<br/>
                              # Keeps asking until user enters a positive number<br/>
                              # Use try-except to handle invalid input
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise4Title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise4Description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Functions: get_average(), find_max(), count_positive()<br/>
                              # Each takes a list of numbers as parameter<br/>
                              # Handle empty lists and invalid data types
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">{t('sections.practice.ctaTitle')}</h3>
                        <p className="text-purple-100 mb-6">
                          {t('sections.practice.ctaDescription')}
                        </p>
                        <button
                          onClick={() => window.location.href = '/test/functions'}
                          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          🎯 {t('sections.practice.ctaButton')}
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

export default FunctionsPage; 