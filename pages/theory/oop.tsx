import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const OOPPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'classes-objects', title: 'Classes & Objects', icon: '🏗️' },
    { id: 'methods-attributes', title: 'Methods & Attributes', icon: '⚙️' },
    { id: 'inheritance', title: 'Inheritance', icon: '🧬' },
    { id: 'encapsulation', title: 'Encapsulation', icon: '🔒' },
    { id: 'polymorphism', title: 'Polymorphism', icon: '🎭' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    classesObjects: `# Basic class definition
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"
    
    # Constructor method
    def __init__(self, name, age, breed):
        # Instance attributes (unique to each object)
        self.name = name
        self.age = age
        self.breed = breed
    
    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"
    
    # Another instance method
    def get_info(self):
        return f"{self.name} is a {self.age} year old {self.breed}"

# Creating objects (instances)
dog1 = Dog("Buddy", 3, "Golden Retriever")
dog2 = Dog("Max", 5, "German Shepherd")

# Accessing attributes
print(dog1.name)        # Buddy
print(dog1.age)         # 3
print(Dog.species)      # Canis familiaris

# Calling methods
print(dog1.bark())      # Buddy says Woof!
print(dog2.get_info())  # Max is a 5 year old German Shepherd

# Class with no parameters
class Counter:
    def __init__(self):
        self.count = 0
    
    def increment(self):
        self.count += 1
    
    def get_count(self):
        return self.count

counter = Counter()
counter.increment()
print(counter.get_count())  # 1`,

    methodsAttributes: `class BankAccount:
    # Class attribute
    bank_name = "Python Bank"
    
    def __init__(self, account_holder, initial_balance=0):
        # Instance attributes
        self.account_holder = account_holder
        self.balance = initial_balance
        self._account_number = self._generate_account_number()
    
    # Instance method
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return f"Deposited $\{amount}. New balance: $\{self.balance}"
        return "Invalid deposit amount"
    
    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return f"Withdrew $\{amount}. New balance: $\{self.balance}"
        return "Insufficient funds or invalid amount"
    
    def get_balance(self):
        return self.balance
    
    # Private method (convention: starts with _)
    def _generate_account_number(self):
        import random
        return random.randint(100000, 999999)
    
    # Class method (works with the class, not instance)
    @classmethod
    def get_bank_name(cls):
        return cls.bank_name
    
    # Static method (doesn't need class or instance)
    @staticmethod
    def calculate_interest(principal, rate, time):
        return principal * rate * time / 100

# Using the class
account = BankAccount("Alice", 1000)
print(account.deposit(500))     # Deposited 500. New balance: 1500
print(account.withdraw(200))    # Withdrew 200. New balance: 1300

# Class method usage
print(BankAccount.get_bank_name())  # Python Bank

# Static method usage
interest = BankAccount.calculate_interest(1000, 5, 2)
print(f"Interest: $\\{interest}")  # Interest: $100

# Different types of attributes
class Student:
    # Class attribute
    school = "Python Academy"
    
    def __init__(self, name):
        # Public attribute
        self.name = name
        # Protected attribute (convention: single underscore)
        self._student_id = self._generate_id()
        # Private attribute (convention: double underscore)
        self.__password = "secret123"
    
    def _generate_id(self):
        import random
        return f"ST{random.randint(1000, 9999)}"
    
    def get_password(self):  # Getter method for private attribute
        return self.__password
    
    def set_password(self, new_password):  # Setter method
        if len(new_password) >= 8:
            self.__password = new_password
            return "Password updated"
        return "Password too short"

student = Student("Bob")
print(student.name)             # Bob (public)
print(student._student_id)      # ST1234 (protected, can access but shouldn't)
# print(student.__password)     # Error! Private attribute
print(student.get_password())   # secret123 (accessed via method)`,

    inheritance: `# Base class (parent class)
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
    
    def make_sound(self):
        return f"{self.name} makes a sound"
    
    def eat(self):
        return f"{self.name} is eating"
    
    def sleep(self):
        return f"{self.name} is sleeping"

# Derived class (child class)
class Dog(Animal):
    def __init__(self, name, breed):
        # Call parent constructor
        super().__init__(name, "Canis familiaris")
        self.breed = breed
    
    # Override parent method
    def make_sound(self):
        return f"{self.name} barks: Woof!"
    
    # Add new method specific to Dog
    def fetch(self):
        return f"{self.name} is fetching the ball"

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name, "Felis catus")
        self.color = color
    
    # Override parent method
    def make_sound(self):
        return f"{self.name} meows: Meow!"
    
    # Add new method specific to Cat
    def climb(self):
        return f"{self.name} is climbing a tree"

# Using inheritance
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers", "Orange")

print(dog.make_sound())     # Buddy barks: Woof! (overridden)
print(cat.make_sound())     # Whiskers meows: Meow! (overridden)
print(dog.eat())            # Buddy is eating (inherited)
print(cat.sleep())          # Whiskers is sleeping (inherited)
print(dog.fetch())          # Buddy is fetching the ball (new method)

# Multiple inheritance
class Flyable:
    def fly(self):
        return "Flying in the sky"

class Swimmable:
    def swim(self):
        return "Swimming in water"

class Duck(Animal, Flyable, Swimmable):
    def __init__(self, name):
        super().__init__(name, "Anas platyrhynchos")
    
    def make_sound(self):
        return f"{self.name} quacks: Quack!"

duck = Duck("Donald")
print(duck.make_sound())    # Donald quacks: Quack!
print(duck.fly())           # Flying in the sky
print(duck.swim())          # Swimming in water

# Method Resolution Order (MRO)
print(Duck.__mro__)         # Shows inheritance chain

# Using isinstance and issubclass
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True (inheritance)
print(issubclass(Dog, Animal))  # True`,

    encapsulation: `class Person:
    def __init__(self, name, age, email):
        # Public attributes
        self.name = name
        
        # Protected attributes (single underscore)
        self._age = age
        
        # Private attributes (double underscore)
        self.__email = email
        self.__ssn = None
    
    # Getter methods (accessors)
    def get_age(self):
        return self._age
    
    def get_email(self):
        return self.__email
    
    # Setter methods (mutators)
    def set_age(self, age):
        if 0 <= age <= 150:
            self._age = age
            return "Age updated successfully"
        return "Invalid age"
    
    def set_email(self, email):
        if "@" in email and "." in email:
            self.__email = email
            return "Email updated successfully"
        return "Invalid email format"
    
    # Property decorator (Pythonic way)
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if 0 <= value <= 150:
            self._age = value
        else:
            raise ValueError("Invalid age")
    
    @property
    def email(self):
        return self.__email
    
    @email.setter
    def email(self, value):
        if "@" in value and "." in value:
            self.__email = value
        else:
            raise ValueError("Invalid email format")

# Using encapsulation
person = Person("Alice", 30, "alice@email.com")

# Accessing public attribute
print(person.name)          # Alice

# Using getter methods
print(person.get_age())     # 30
print(person.get_email())   # alice@email.com

# Using setter methods
print(person.set_age(25))   # Age updated successfully
print(person.set_email("alice.smith@email.com"))  # Email updated successfully

# Using properties (more Pythonic)
person.age = 35             # Uses setter
print(person.age)           # Uses getter: 35

try:
    person.age = -5         # Will raise ValueError
except ValueError as e:
    print(f"Error: {e}")

# Advanced encapsulation example
class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height
    
    @property
    def width(self):
        return self._width
    
    @width.setter
    def width(self, value):
        if value > 0:
            self._width = value
        else:
            raise ValueError("Width must be positive")
    
    @property
    def height(self):
        return self._height
    
    @height.setter
    def height(self, value):
        if value > 0:
            self._height = value
        else:
            raise ValueError("Height must be positive")
    
    @property
    def area(self):  # Read-only property
        return self._width * self._height
    
    @property
    def perimeter(self):  # Read-only property
        return 2 * (self._width + self._height)

rect = Rectangle(5, 3)
print(f"Area: {rect.area}")         # Area: 15
print(f"Perimeter: {rect.perimeter}")  # Perimeter: 16

rect.width = 10
print(f"New area: {rect.area}")     # New area: 30`,

    polymorphism: `# Polymorphism through inheritance
class Shape:
    def area(self):
        pass
    
    def perimeter(self):
        pass
    
    def describe(self):
        return f"This is a shape with area {self.area()}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Triangle(Shape):
    def __init__(self, base, height, side1, side2):
        self.base = base
        self.height = height
        self.side1 = side1
        self.side2 = side2
    
    def area(self):
        return 0.5 * self.base * self.height
    
    def perimeter(self):
        return self.base + self.side1 + self.side2

# Polymorphism in action
shapes = [
    Circle(5),
    Rectangle(4, 6),
    Triangle(3, 4, 5, 5)
]

# Same method call, different behavior
for shape in shapes:
    print(f"Area: {shape.area():.2f}")
    print(f"Perimeter: {shape.perimeter():.2f}")
    print(shape.describe())
    print("-" * 30)

# Polymorphism through duck typing
class Duck:
    def make_sound(self):
        return "Quack!"
    
    def swim(self):
        return "Swimming like a duck"

class Robot:
    def make_sound(self):
        return "Beep beep!"
    
    def swim(self):
        return "Propellers activated"

def interact_with_entity(entity):
    # We don't care what type entity is, as long as it has these methods
    print(entity.make_sound())
    print(entity.swim())

duck = Duck()
robot = Robot()

interact_with_entity(duck)    # Quack! Swimming like a duck
interact_with_entity(robot)   # Beep beep! Propellers activated

# Method overloading simulation (Python doesn't have true overloading)
class Calculator:
    def add(self, *args):
        if len(args) == 2:
            return args[0] + args[1]
        elif len(args) == 3:
            return args[0] + args[1] + args[2]
        else:
            return sum(args)
    
    def multiply(self, a, b=None, c=None):
        if b is None:
            return a * a  # Square
        elif c is None:
            return a * b  # Two numbers
        else:
            return a * b * c  # Three numbers

calc = Calculator()
print(calc.add(2, 3))           # 5
print(calc.add(1, 2, 3))        # 6
print(calc.add(1, 2, 3, 4, 5))  # 15
print(calc.multiply(4))         # 16 (square)
print(calc.multiply(3, 4))      # 12
print(calc.multiply(2, 3, 4))   # 24`
  };

  return (
    <Layout title="Object-Oriented Programming - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Object-Oriented Programming
                </h1>
                <p className="text-indigo-100 text-lg">
                  Intermediate Level • 80 minutes • Master classes, objects, inheritance, and encapsulation
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">🏗️</div>
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
                          ? 'bg-indigo-100 text-indigo-700'
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction to Object-Oriented Programming</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects and classes. It provides a way to structure programs that makes them more modular, reusable, and easier to maintain.
                        </p>

                        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-indigo-900">
                                <strong>What you'll learn:</strong> Create classes and objects, understand inheritance and polymorphism, implement encapsulation for data protection, and build well-structured object-oriented applications.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Four Pillars of OOP</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">🏗️ Encapsulation</h4>
                            <p className="text-sm text-blue-700">Bundling data and methods together, controlling access to internal state</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">🧬 Inheritance</h4>
                            <p className="text-sm text-green-700">Creating new classes based on existing classes, promoting code reuse</p>
                          </div>
                          
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">🎭 Polymorphism</h4>
                            <p className="text-sm text-purple-700">Same interface, different implementations - objects behaving differently</p>
                          </div>
                          
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">📦 Abstraction</h4>
                            <p className="text-sm text-orange-700">Hiding complex implementation details, showing only essential features</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits of OOP</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li><strong>Modularity:</strong> Code is organized into discrete, reusable components</li>
                          <li><strong>Reusability:</strong> Classes can be used in multiple programs</li>
                          <li><strong>Maintainability:</strong> Changes to one class don't affect others</li>
                          <li><strong>Scalability:</strong> Easy to extend functionality through inheritance</li>
                          <li><strong>Security:</strong> Data encapsulation protects internal state</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Classes & Objects Section */}
                {activeSection === 'classes-objects' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Classes & Objects</h2>
                      
                      <p className="text-gray-700 mb-6">
                        A class is a blueprint for creating objects. Objects are instances of classes that contain both data (attributes) and functionality (methods).
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.classesObjects}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Class Components</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>__init__()</code> - Constructor method</li>
                            <li>• Class attributes - Shared by all instances</li>
                            <li>• Instance attributes - Unique to each object</li>
                            <li>• Methods - Functions defined in the class</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Object Creation</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Instantiate with <code>ClassName()</code></li>
                            <li>• Pass arguments to <code>__init__()</code></li>
                            <li>• Each object has its own memory space</li>
                            <li>• Access attributes with dot notation</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">💡 Class Naming Conventions</h4>
                        <ul className="text-yellow-700 space-y-2">
                          <li>• Use PascalCase for class names (e.g., <code>BankAccount</code>)</li>
                          <li>• Use snake_case for method and attribute names</li>
                          <li>• Start with a capital letter, be descriptive</li>
                          <li>• Avoid built-in names and keywords</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Methods & Attributes Section */}
                {activeSection === 'methods-attributes' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Methods & Attributes</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Methods are functions that belong to a class and operate on class data. Attributes store the state of objects. Python provides different types of methods and attributes for various purposes.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.methodsAttributes}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Instance Methods</h4>
                          <p className="text-sm text-purple-700 mb-2">Work with specific object instances</p>
                          <code className="text-xs bg-purple-100 px-2 py-1 rounded block">def method(self):</code>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Class Methods</h4>
                          <p className="text-sm text-blue-700 mb-2">Work with the class itself</p>
                          <code className="text-xs bg-blue-100 px-2 py-1 rounded block">@classmethod</code>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Static Methods</h4>
                          <p className="text-sm text-green-700 mb-2">Independent utility functions</p>
                          <code className="text-xs bg-green-100 px-2 py-1 rounded block">@staticmethod</code>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Attribute Visibility</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Public: <code>attribute</code></h5>
                          <p className="text-sm text-gray-700">Accessible from anywhere</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Protected: <code>_attribute</code></h5>
                          <p className="text-sm text-gray-700">Internal use (convention, not enforced)</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Private: <code>__attribute</code></h5>
                          <p className="text-sm text-gray-700">Name mangling applied (harder to access)</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Inheritance Section */}
                {activeSection === 'inheritance' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Inheritance</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Inheritance allows you to create new classes based on existing classes. The new class (child) inherits attributes and methods from the parent class, promoting code reuse and creating hierarchical relationships.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.inheritance}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Benefits of Inheritance</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Code reusability</li>
                            <li>• Method overriding</li>
                            <li>• Hierarchical organization</li>
                            <li>• Polymorphic behavior</li>
                            <li>• Easier maintenance</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">Key Concepts</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• <code>super()</code> - Call parent methods</li>
                            <li>• Method overriding - Replace parent methods</li>
                            <li>• Multiple inheritance - Multiple parents</li>
                            <li>• MRO - Method Resolution Order</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                        <h4 className="font-semibold text-blue-800 mb-3">Inheritance Best Practices</h4>
                        <ul className="text-blue-700 space-y-2">
                          <li>• Use inheritance for "is-a" relationships</li>
                          <li>• Keep inheritance hierarchies simple</li>
                          <li>• Use composition for "has-a" relationships</li>
                          <li>• Override methods thoughtfully</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Encapsulation Section */}
                {activeSection === 'encapsulation' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Encapsulation</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Encapsulation is the bundling of data and methods that operate on that data within a single unit (class). It also involves restricting direct access to some components, providing controlled access through methods.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.encapsulation}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">Access Control Methods</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Getter methods - Retrieve values</li>
                            <li>• Setter methods - Modify values safely</li>
                            <li>• Validation in setters</li>
                            <li>• Error handling for invalid data</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <h4 className="font-semibold text-purple-800 mb-3">Property Decorators</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• <code>@property</code> - Getter</li>
                            <li>• <code>@attribute.setter</code> - Setter</li>
                            <li>• More Pythonic approach</li>
                            <li>• Clean, attribute-like access</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits of Encapsulation</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-800 mb-2">Data Protection</h5>
                          <p className="text-sm text-blue-700">Prevent unauthorized access to internal data</p>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h5 className="font-semibold text-green-800 mb-2">Validation</h5>
                          <p className="text-sm text-green-700">Ensure data integrity through controlled access</p>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h5 className="font-semibold text-orange-800 mb-2">Maintainability</h5>
                          <p className="text-sm text-orange-700">Change internal implementation without affecting users</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Polymorphism Section */}
                {activeSection === 'polymorphism' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Polymorphism</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Polymorphism allows objects of different types to be treated as instances of the same type through a common interface. This enables writing more flexible and reusable code.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.polymorphism}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Types of Polymorphism</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <strong>Runtime:</strong> Method overriding</li>
                            <li>• <strong>Duck typing:</strong> "If it walks like a duck..."</li>
                            <li>• <strong>Operator overloading:</strong> Custom operators</li>
                            <li>• <strong>Method overloading:</strong> Multiple signatures</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Benefits</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Code flexibility</li>
                            <li>• Easy to extend</li>
                            <li>• Cleaner interfaces</li>
                            <li>• Better maintainability</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-purple-50 border-l-4 border-purple-400 p-6">
                        <h4 className="font-semibold text-purple-800 mb-3">Duck Typing in Python</h4>
                        <p className="text-purple-700 mb-3">
                          Python uses duck typing: "If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck."
                        </p>
                        <p className="text-purple-700">
                          Objects are evaluated based on their methods and properties, not their class hierarchy.
                        </p>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Library Management System</h3>
                          <p className="text-gray-700 mb-4">
                            Create a library system with Book, Member, and Library classes. Implement borrowing, returning, and searching functionality.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Classes: Book, Member, Library<br/>
                              # Features: borrow_book(), return_book(), search_books()<br/>
                              # Use encapsulation for member data and book availability
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: Vehicle Hierarchy</h3>
                          <p className="text-gray-700 mb-4">
                            Build a vehicle inheritance hierarchy with Car, Motorcycle, and Truck classes inheriting from Vehicle.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Base: Vehicle class with common properties<br/>
                              # Derived: Car, Motorcycle, Truck with specific features<br/>
                              # Implement polymorphism with start_engine() method
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: Banking System</h3>
                          <p className="text-gray-700 mb-4">
                            Create a banking system with Account, SavingsAccount, and CheckingAccount classes with proper encapsulation.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Use properties for balance validation<br/>
                              # Implement transaction history<br/>
                              # Different account types with specific rules
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: Game Character System</h3>
                          <p className="text-gray-700 mb-4">
                            Design a game with different character types, each with unique abilities and behaviors.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Base: Character class<br/>
                              # Types: Warrior, Mage, Archer with special abilities<br/>
                              # Polymorphic attack() and defend() methods
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-indigo-100 mb-6">
                          Take our interactive quiz to see how well you've mastered object-oriented programming!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/oop'}
                          className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default OOPPage; 