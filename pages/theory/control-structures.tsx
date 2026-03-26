import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';
import { usePageTranslation } from '../../contexts/LanguageContext';

const ControlStructuresPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const { t } = usePageTranslation('theory-pages/control-structures');

  const sections = [
    { id: 'introduction', title: t('sections.introduction.navTitle'), icon: '📚' },
    { id: 'if-statements', title: t('sections.ifStatements.navTitle'), icon: '🔀' },
    { id: 'for-loops', title: t('sections.forLoops.navTitle'), icon: '🔄' },
    { id: 'while-loops', title: t('sections.whileLoops.navTitle'), icon: '🔁' },
    { id: 'loop-control', title: t('sections.loopControl.navTitle'), icon: '🛑' },
    { id: 'nested-structures', title: t('sections.nestedStructures.navTitle'), icon: '🏗️' },
    { id: 'practice', title: t('sections.practice.navTitle'), icon: '💪' }
  ];

  const codeExamples = {
    ifStatements: `# Basic if statement
age = 18
if age >= 18:
    print("You are an adult")

# If-else statement
temperature = 25
if temperature > 30:
    print("It's hot today!")
else:
    print("It's a nice day!")

# If-elif-else statement
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")

# Multiple conditions
x = 15
y = 20
if x > 10 and y > 15:
    print("Both conditions are true")

if x == 15 or y == 25:
    print("At least one condition is true")

# Checking membership
fruits = ["apple", "banana", "orange"]
if "banana" in fruits:
    print("We have bananas!")`,

    forLoops: `# Basic for loop with list
colors = ["red", "green", "blue"]
for color in colors:
    print(f"I like {color}")

# For loop with range()
for i in range(5):
    print(f"Number: {i}")  # Prints 0, 1, 2, 3, 4

# Range with start and stop
for i in range(2, 8):
    print(i)  # Prints 2, 3, 4, 5, 6, 7

# Range with step
for i in range(0, 10, 2):
    print(i)  # Prints 0, 2, 4, 6, 8

# Range counting backwards
for i in range(10, 0, -1):
    print(i)  # Prints 10, 9, 8, 7, 6, 5, 4, 3, 2, 1

# Iterating over strings
message = "Hello"
for letter in message:
    print(letter)  # Prints H, e, l, l, o

# Using enumerate to get index and value
fruits = ["apple", "banana", "orange"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# For loop with calculations
total = 0
for i in range(1, 6):
    total += i
print(f"Sum of 1 to 5: {total}")  # Output: 15`,

    whileLoops: `# Basic while loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1  # Important: increment to avoid infinite loop

# While loop with user input
password = ""
while password != "secret":
    password = input("Enter password: ")
    if password != "secret":
        print("Wrong password, try again!")
print("Access granted!")

# While loop with condition check
number = 16
while number > 1:
    print(number)
    number = number // 2  # Integer division
print("Final number:", number)

# While loop for validation
age = -1
while age < 0 or age > 120:
    age = int(input("Enter your age (0-120): "))
    if age < 0 or age > 120:
        print("Invalid age! Please try again.")

# While loop with multiple conditions
x = 0
y = 10
while x < 5 and y > 5:
    print(f"x: {x}, y: {y}")
    x += 1
    y -= 1

# While True with break (common pattern)
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == "quit":
        break
    print(f"You entered: {user_input}")`,

    loopControl: `# Break statement - exits the loop
for i in range(10):
    if i == 5:
        break  # Exit loop when i equals 5
    print(i)  # Prints: 0, 1, 2, 3, 4

# Continue statement - skips to next iteration
for i in range(10):
    if i % 2 == 0:  # If i is even
        continue  # Skip to next iteration
    print(i)  # Prints only odd numbers: 1, 3, 5, 7, 9

# Break in while loop
count = 0
while True:
    if count == 3:
        break
    print(count)
    count += 1

# Continue in while loop
i = 0
while i < 10:
    i += 1
    if i % 3 == 0:  # Skip multiples of 3
        continue
    print(i)

# Finding first even number
numbers = [1, 3, 7, 8, 9, 12, 15]
for num in numbers:
    if num % 2 == 0:
        print(f"First even number: {num}")
        break
else:
    print("No even number found")

# Processing valid items only
items = ["apple", "123", "banana", "456", "cherry"]
for item in items:
    if item.isdigit():  # Skip if item is a number
        continue
    print(f"Processing: {item}")`,

    nestedStructures: `# Nested if statements
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("You can drive!")
    else:
        print("You need a driver's license")
else:
    print("You're too young to drive")

# Nested for loops
for i in range(3):
    for j in range(3):
        print(f"i={i}, j={j}")

# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        product = i * j
        print(f"{i} x {j} = {product}")

# Nested loops with lists
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in matrix:
    for element in row:
        print(element, end=" ")
    print()  # New line after each row

# For loop inside while loop
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    print(f"Attempt {attempts + 1}:")
    for i in range(3):
        print(f"  Step {i + 1}")
    attempts += 1

# Nested if with multiple conditions
weather = "sunny"
temperature = 25

if weather == "sunny":
    if temperature > 20:
        if temperature < 30:
            print("Perfect day for a picnic!")
        else:
            print("Too hot, stay in shade")
    else:
        print("Sunny but cold")
else:
    print("Not a sunny day")

# Breaking out of nested loops
found = False
for i in range(5):
    for j in range(5):
        if i * j == 6:
            print(f"Found: {i} * {j} = 6")
            found = True
            break
    if found:
        break`
  };

  return (
    <Layout title={t('pageTitle')}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {t('header.title')}
                </h1>
                <p className="text-green-100 text-lg">
                  {t('header.subtitle')}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">🔀</div>
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
                          ? 'bg-green-100 text-green-700'
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

                        <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-green-900" dangerouslySetInnerHTML={{ __html: t('sections.introduction.callout') }} />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.introduction.typesTitle')}</h3>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">{t('sections.introduction.types.conditional.title')}</h4>
                            <p className="text-sm text-blue-700">{t('sections.introduction.types.conditional.description')}</p>
                          </div>

                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">{t('sections.introduction.types.iterative.title')}</h4>
                            <p className="text-sm text-purple-700">{t('sections.introduction.types.iterative.description')}</p>
                          </div>

                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">{t('sections.introduction.types.controlFlow.title')}</h4>
                            <p className="text-sm text-orange-700">{t('sections.introduction.types.controlFlow.description')}</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.introduction.whyTitle')}</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          {(['sections.introduction.whyReasons.0', 'sections.introduction.whyReasons.1', 'sections.introduction.whyReasons.2', 'sections.introduction.whyReasons.3'] as const).map((key, index) => (
                            <li key={index}>{t(key)}</li>
                          ))}
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* If Statements Section */}
                {activeSection === 'if-statements' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.ifStatements.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.ifStatements.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.ifStatements}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">{t('sections.ifStatements.structureTitle')}</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index} dangerouslySetInnerHTML={{ __html: `• ${t(`sections.ifStatements.structureItems.${index}`)}` }}></li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">{t('sections.ifStatements.operatorsTitle')}</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index} dangerouslySetInnerHTML={{ __html: `• ${t(`sections.ifStatements.operatorItems.${index}`)}` }}></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">💡 {t('sections.ifStatements.notesTitle')}</h4>
                        <ul className="text-yellow-700 space-y-2">
                          {([0, 1, 2, 3] as const).map((index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: `• ${t(`sections.ifStatements.noteItems.${index}`)}` }}></li>
                          ))}
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* For Loops Section */}
                {activeSection === 'for-loops' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.forLoops.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.forLoops.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.forLoops}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">{t('sections.forLoops.rangeStop.title')}</h4>
                          <p className="text-sm text-purple-700">{t('sections.forLoops.rangeStop.description')}</p>
                          <code className="text-xs bg-purple-100 px-2 py-1 rounded block mt-2">range(5) → 0,1,2,3,4</code>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">{t('sections.forLoops.rangeStartStop.title')}</h4>
                          <p className="text-sm text-blue-700">{t('sections.forLoops.rangeStartStop.description')}</p>
                          <code className="text-xs bg-blue-100 px-2 py-1 rounded block mt-2">range(2, 8) → 2,3,4,5,6,7</code>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">{t('sections.forLoops.rangeStartStopStep.title')}</h4>
                          <p className="text-sm text-green-700">{t('sections.forLoops.rangeStartStopStep.description')}</p>
                          <code className="text-xs bg-green-100 px-2 py-1 rounded block mt-2">range(0, 10, 2) → 0,2,4,6,8</code>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.forLoops.patternsTitle')}</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.forLoops.patterns.iteratingList')}</h5>
                          <code className="text-sm">for item in my_list:</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.forLoops.patterns.gettingIndex')}</h5>
                          <code className="text-sm">for index, value in enumerate(my_list):</code>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{t('sections.forLoops.patterns.iteratingChars')}</h5>
                          <code className="text-sm">for char in "hello":</code>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* While Loops Section */}
                {activeSection === 'while-loops' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.whileLoops.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.whileLoops.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.whileLoops}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">⚠️ {t('sections.whileLoops.infiniteLoopsTitle')}</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index}>• {t(`sections.whileLoops.infiniteLoopsItems.${index}`)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">✅ {t('sections.whileLoops.bestPracticesTitle')}</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index}>• {t(`sections.whileLoops.bestPracticesItems.${index}`)}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.whileLoops.whenToUseTitle')}</h3>
                      <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        {([0, 1, 2, 3, 4] as const).map((index) => (
                          <li key={index}>{t(`sections.whileLoops.whenToUseItems.${index}`)}</li>
                        ))}
                      </ul>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Loop Control Section */}
                {activeSection === 'loop-control' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.loopControl.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.loopControl.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.loopControl}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">🛑 {t('sections.loopControl.breakTitle')}</h4>
                          <ul className="text-sm text-red-700 space-y-2">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index}>• {t(`sections.loopControl.breakItems.${index}`)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">⏭️ {t('sections.loopControl.continueTitle')}</h4>
                          <ul className="text-sm text-blue-700 space-y-2">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index}>• {t(`sections.loopControl.continueItems.${index}`)}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">{t('sections.loopControl.useCasesTitle')}</h4>
                        <div className="space-y-3 text-yellow-700">
                          <div>
                            <strong>Break:</strong> {t('sections.loopControl.breakUseCases')}
                          </div>
                          <div>
                            <strong>Continue:</strong> {t('sections.loopControl.continueUseCases')}
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Nested Structures Section */}
                {activeSection === 'nested-structures' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.nestedStructures.title')}</h2>

                      <p className="text-gray-700 mb-6">
                        {t('sections.nestedStructures.paragraph1')}
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.nestedStructures}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <h4 className="font-semibold text-purple-800 mb-3">{t('sections.nestedStructures.nestedIfTitle')}</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index}>• {t(`sections.nestedStructures.nestedIfItems.${index}`)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">{t('sections.nestedStructures.nestedLoopsTitle')}</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index}>• {t(`sections.nestedStructures.nestedLoopsItems.${index}`)}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sections.nestedStructures.bestPracticesTitle')}</h3>
                      <div className="space-y-4">
                        <div className="bg-green-50 border-l-4 border-green-400 p-4">
                          <h5 className="font-semibold text-green-800 mb-2">✅ {t('sections.nestedStructures.doTitle')}</h5>
                          <ul className="text-green-700 space-y-1">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index}>• {t(`sections.nestedStructures.doItems.${index}`)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50 border-l-4 border-red-400 p-4">
                          <h5 className="font-semibold text-red-800 mb-2">❌ {t('sections.nestedStructures.avoidTitle')}</h5>
                          <ul className="text-red-700 space-y-1">
                            {([0, 1, 2, 3] as const).map((index) => (
                              <li key={index}>• {t(`sections.nestedStructures.avoidItems.${index}`)}</li>
                            ))}
                          </ul>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise1.title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise1.description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Create a grade calculator:<br/>
                              # A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: below 60<br/>
                              # Test with scores: 95, 87, 73, 65, 45
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise2.title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise2.description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Create these patterns using nested loops:<br/>
                              # Triangle: 1, 12, 123, 1234, 12345<br/>
                              # Multiplication table: 1x1=1, 1x2=2, etc.
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise3.title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise3.description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Create a guessing game:<br/>
                              # Generate random number 1-100<br/>
                              # Keep asking until correct guess<br/>
                              # Give "higher" or "lower" hints
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sections.practice.exercise4.title')}</h3>
                          <p className="text-gray-700 mb-4">
                            {t('sections.practice.exercise4.description')}
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Given: numbers = [12, 5, 8, 3, 19, 7, 15, 1]<br/>
                              # Find: sum of even numbers, count of odd numbers<br/>
                              # Skip numbers less than 5, stop if you find 19
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">{t('sections.practice.cta.title')}</h3>
                        <p className="text-green-100 mb-6">
                          {t('sections.practice.cta.description')}
                        </p>
                        <button
                          onClick={() => window.location.href = '/test/control-structures'}
                          className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          🎯 {t('sections.practice.cta.button')}
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

export default ControlStructuresPage;
