import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';
import { usePageTranslation } from '../../contexts/LanguageContext';

const VariablesDataTypesPage: NextPage = () => {
  const { t } = usePageTranslation('theory-pages/variables-datatypes');
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: t('sections.introduction.navTitle'), icon: '📚' },
    { id: 'variables', title: t('sections.variables.navTitle'), icon: '📦' },
    { id: 'numbers', title: t('sections.numbers.navTitle'), icon: '🔢' },
    { id: 'strings', title: t('sections.strings.navTitle'), icon: '📝' },
    { id: 'booleans', title: t('sections.booleans.navTitle'), icon: '✅' },
    { id: 'operators', title: t('sections.operators.navTitle'), icon: '⚡' },
    { id: 'practice', title: t('sections.practice.navTitle'), icon: '💪' }
  ];

  const codeExamples = {
    variables: `# Creating variables in Python
name = "Alice"
age = 25
height = 5.6
is_student = True

# Variables are dynamically typed
score = 100        # integer
score = 95.5       # now it's a float
score = "A+"       # now it's a string

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")
print(f"Student: {is_student}")`,

    numbers: `# Integer numbers
count = 42
negative = -15
large_number = 1_000_000  # Underscores for readability

# Float numbers
pi = 3.14159
temperature = -2.5
scientific = 2.5e6  # 2,500,000

# Basic arithmetic
a = 10
b = 3

print(f"Addition: {a + b}")       # 13
print(f"Subtraction: {a - b}")    # 7
print(f"Multiplication: {a * b}") # 30
print(f"Division: {a / b}")       # 3.333...
print(f"Floor Division: {a // b}")# 3
print(f"Modulus: {a % b}")        # 1
print(f"Exponentiation: {a ** b}")# 1000`,

    strings: `# Creating strings
single_quotes = 'Hello, World!'
double_quotes = "Python Programming"
multiline = """This is a
multiline string
spanning multiple lines"""

# String operations
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name

# String methods
text = "  Hello, Python!  "
print(f"Original: '{text}'")
print(f"Upper: {text.upper()}")
print(f"Lower: {text.lower()}")
print(f"Stripped: '{text.strip()}'")
print(f"Length: {len(text)}")

# String formatting
name = "Alice"
age = 30
print(f"My name is {name} and I am {age} years old")
print("My name is {} and I am {} years old".format(name, age))`,

    booleans: `# Boolean values
is_sunny = True
is_raining = False

# Boolean operations
print(f"Sunny: {is_sunny}")
print(f"Raining: {is_raining}")

# Logical operators
print(f"Sunny AND not Raining: {is_sunny and not is_raining}")
print(f"Sunny OR Raining: {is_sunny or is_raining}")
print(f"NOT Sunny: {not is_sunny}")

# Truthiness in Python
print(f"bool(1): {bool(1)}")        # True
print(f"bool(0): {bool(0)}")        # False
print(f"bool(''): {bool('')}")      # False
print(f"bool('hello'): {bool('hello')}")  # True
print(f"bool([]): {bool([])}")      # False
print(f"bool([1,2,3]): {bool([1,2,3])}")  # True`,

    operators: `# Comparison operators
x = 10
y = 5

print(f"x == y: {x == y}")  # False
print(f"x != y: {x != y}")  # True
print(f"x > y: {x > y}")    # True
print(f"x < y: {x < y}")    # False
print(f"x >= y: {x >= y}")  # True
print(f"x <= y: {x <= y}")  # False

# Assignment operators
num = 10
print(f"Initial: {num}")

num += 5    # num = num + 5
print(f"After +=: {num}")

num -= 3    # num = num - 3
print(f"After -=: {num}")

num *= 2    # num = num * 2
print(f"After *=: {num}")

num //= 4   # num = num // 4
print(f"After //=: {num}")

# Membership operators
fruits = ["apple", "banana", "orange"]
print(f"'apple' in fruits: {'apple' in fruits}")
print(f"'grape' in fruits: {'grape' in fruits}")

# Identity operators
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(f"a is b: {a is b}")    # False (different objects)
print(f"a is c: {a is c}")    # True (same object)
print(f"a == b: {a == b}")    # True (same values)`
  };

  return (
    <Layout title={t('pageTitle')}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {t('header.title')}
                </h1>
                <p className="text-blue-100 text-lg">
                  {t('header.subtitle')}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">🔢</div>
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.introduction.title')}</h2>

                        <p className="text-lg text-gray-700 mb-6">
                          {t('sections.introduction.paragraph1')}
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: t('sections.introduction.callout') }}>
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.introduction.whyTitle')}</h3>
                        <p className="text-gray-700 mb-4">
                          {t('sections.introduction.whyParagraph')}
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>{t('sections.introduction.whyList.0')}</li>
                          <li>{t('sections.introduction.whyList.1')}</li>
                          <li>{t('sections.introduction.whyList.2')}</li>
                          <li>{t('sections.introduction.whyList.3')}</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Variables Section */}
                {activeSection === 'variables' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.variables.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.variables.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.variables}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">✅ {t('sections.variables.namingRulesTitle')}</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• {t('sections.variables.namingRules.0')}</li>
                            <li>• {t('sections.variables.namingRules.1')}</li>
                            <li>• {t('sections.variables.namingRules.2')}</li>
                            <li>• {t('sections.variables.namingRules.3')}</li>
                          </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">💡 {t('sections.variables.bestPracticesTitle')}</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• {t('sections.variables.bestPractices.0')}</li>
                            <li>• {t('sections.variables.bestPractices.1')}</li>
                            <li>• {t('sections.variables.bestPractices.2')}</li>
                            <li>• {t('sections.variables.bestPractices.3')}</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.variables.dynamicTypingTitle')}</h3>
                      <p className="text-gray-700">
                        {t('sections.variables.dynamicTypingParagraph')}
                      </p>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Numbers Section */}
                {activeSection === 'numbers' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.numbers.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.numbers.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.numbers}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">{t('sections.numbers.integersTitle')}</h4>
                          <p className="text-sm text-purple-700">{t('sections.numbers.integersDescription')}</p>
                          <code className="text-xs bg-purple-100 px-2 py-1 rounded">42, -15, 0</code>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-800 mb-2">{t('sections.numbers.floatsTitle')}</h4>
                          <p className="text-sm text-orange-700">{t('sections.numbers.floatsDescription')}</p>
                          <code className="text-xs bg-orange-100 px-2 py-1 rounded">3.14, -2.5</code>
                        </div>

                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-800 mb-2">{t('sections.numbers.scientificTitle')}</h4>
                          <p className="text-sm text-teal-700">{t('sections.numbers.scientificDescription')}</p>
                          <code className="text-xs bg-teal-100 px-2 py-1 rounded">2.5e6</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Strings Section */}
                {activeSection === 'strings' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.strings.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.strings.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.strings}</code>
                        </pre>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">{t('sections.strings.methodsTitle')}</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <code className="bg-yellow-100 px-2 py-1 rounded">upper()</code> - {t('sections.strings.methodUpper')}<br/>
                            <code className="bg-yellow-100 px-2 py-1 rounded">lower()</code> - {t('sections.strings.methodLower')}<br/>
                            <code className="bg-yellow-100 px-2 py-1 rounded">strip()</code> - {t('sections.strings.methodStrip')}
                          </div>
                          <div>
                            <code className="bg-yellow-100 px-2 py-1 rounded">len()</code> - {t('sections.strings.methodLen')}<br/>
                            <code className="bg-yellow-100 px-2 py-1 rounded">split()</code> - {t('sections.strings.methodSplit')}<br/>
                            <code className="bg-yellow-100 px-2 py-1 rounded">replace()</code> - {t('sections.strings.methodReplace')}
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Booleans Section */}
                {activeSection === 'booleans' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.booleans.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.booleans.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.booleans}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">{t('sections.booleans.falsyTitle')}</h4>
                          <div className="text-sm text-red-700 space-y-1">
                            <div><code>False</code></div>
                            <div><code>0, 0.0</code></div>
                            <div><code>""</code> {t('sections.booleans.falsyEmptyString')}</div>
                            <div><code>[]</code> {t('sections.booleans.falsyEmptyList')}</div>
                            <div><code>None</code></div>
                          </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">{t('sections.booleans.truthyTitle')}</h4>
                          <div className="text-sm text-green-700 space-y-1">
                            <div><code>True</code></div>
                            <div>{t('sections.booleans.truthyNonZero')}</div>
                            <div>{t('sections.booleans.truthyNonEmptyString')}</div>
                            <div>{t('sections.booleans.truthyNonEmptyCollection')}</div>
                            <div>{t('sections.booleans.truthyMostObjects')}</div>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Operators Section */}
                {activeSection === 'operators' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.operators.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.operators.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-8">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.operators}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-3">{t('sections.operators.arithmeticTitle')}</h4>
                          <div className="text-sm text-blue-700 space-y-1">
                            <div><code>+</code> {t('sections.operators.arithmeticAddition')}</div>
                            <div><code>-</code> {t('sections.operators.arithmeticSubtraction')}</div>
                            <div><code>*</code> {t('sections.operators.arithmeticMultiplication')}</div>
                            <div><code>/</code> {t('sections.operators.arithmeticDivision')}</div>
                            <div><code>//</code> {t('sections.operators.arithmeticFloorDivision')}</div>
                            <div><code>%</code> {t('sections.operators.arithmeticModulus')}</div>
                            <div><code>**</code> {t('sections.operators.arithmeticExponentiation')}</div>
                          </div>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-3">{t('sections.operators.comparisonTitle')}</h4>
                          <div className="text-sm text-purple-700 space-y-1">
                            <div><code>==</code> {t('sections.operators.comparisonEqual')}</div>
                            <div><code>!=</code> {t('sections.operators.comparisonNotEqual')}</div>
                            <div><code>&gt;</code> {t('sections.operators.comparisonGreater')}</div>
                            <div><code>&lt;</code> {t('sections.operators.comparisonLess')}</div>
                            <div><code>&gt;=</code> {t('sections.operators.comparisonGreaterEqual')}</div>
                            <div><code>&lt;=</code> {t('sections.operators.comparisonLessEqual')}</div>
                          </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-3">{t('sections.operators.logicalTitle')}</h4>
                          <div className="text-sm text-green-700 space-y-1">
                            <div><code>and</code> {t('sections.operators.logicalAnd')}</div>
                            <div><code>or</code> {t('sections.operators.logicalOr')}</div>
                            <div><code>not</code> {t('sections.operators.logicalNot')}</div>
                            <div><code>in</code> {t('sections.operators.logicalMembership')}</div>
                            <div><code>is</code> {t('sections.operators.logicalIdentity')}</div>
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
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.practice.title')}</h2>

                      <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise1Title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise1Description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Create variables for: name, age, city, is_student<br/>
                              # Print: "Hi, I'm [name], I'm [age] years old from [city]"<br/>
                              # Add: "I am currently a student: [True/False]"
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
                              # Given: a = 15, b = 4<br/>
                              # Calculate and print: sum, difference, product, quotient<br/>
                              # Calculate: remainder when a is divided by b
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
                              # Given: text = "  Python Programming  "<br/>
                              # Clean the text and convert to title case<br/>
                              # Count the number of characters<br/>
                              # Replace "Programming" with "Development"
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">{t('sections.practice.ctaTitle')}</h3>
                        <p className="text-yellow-100 mb-6">
                          {t('sections.practice.ctaDescription')}
                        </p>
                        <button
                          onClick={() => window.location.href = '/test/variables-datatypes'}
                          className="bg-white text-orange-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default VariablesDataTypesPage;
