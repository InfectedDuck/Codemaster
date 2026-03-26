import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import PythonInterpreter from '../components/PythonInterpreter';
import ScrollAnimation from '../components/ScrollAnimation';
import AnimatedCounter from '../components/AnimatedCounter';
import AIChatPanel from '../components/AIChatPanel';
import { usePageTranslation } from '../contexts/LanguageContext';

interface CodeExample {
  id: string;
  code: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const codeExamples: CodeExample[] = [
  { id: 'hello-world', category: 'Basics', difficulty: 'Beginner', code: `# Your first Python program!\nprint("Hello, World!")\n\n# Try modifying the message\nname = "Python Learner"\nprint(f"Hello, {name}!")\n\n# Multiple prints\nprint("Welcome to Python programming!")\nprint("Let's start coding!")` },
  { id: 'variables', category: 'Basics', difficulty: 'Beginner', code: `# Different data types\ninteger_num = 42\nfloat_num = 3.14\ntext = "Python is awesome!"\nis_learning = True\n\n# Print with types\nprint(f"Integer: {integer_num}, Type: {type(integer_num)}")\nprint(f"Float: {float_num}, Type: {type(float_num)}")\nprint(f"String: {text}, Type: {type(text)}")\nprint(f"Boolean: {is_learning}, Type: {type(is_learning)}")\n\n# Type conversion\nstr_num = "123"\nconverted = int(str_num)\nprint(f"\\nConverted '{str_num}' to {converted}")` },
  { id: 'lists', category: 'Data Structures', difficulty: 'Beginner', code: `# Creating and manipulating lists\nfruits = ["apple", "banana", "orange"]\nprint("Original list:", fruits)\n\n# Adding items\nfruits.append("grape")\nfruits.insert(1, "mango")\nprint("After adding:", fruits)\n\n# Accessing items\nprint(f"\\nFirst fruit: {fruits[0]}")\nprint(f"Last fruit: {fruits[-1]}")\n\n# List slicing\nprint(f"First three: {fruits[:3]}")\n\n# List operations\nnumbers = [3, 1, 4, 1, 5, 9]\nprint(f"\\nNumbers: {numbers}")\nprint(f"Sorted: {sorted(numbers)}")\nprint(f"Sum: {sum(numbers)}")\nprint(f"Length: {len(numbers)}")` },
  { id: 'functions', category: 'Functions', difficulty: 'Intermediate', code: `# Basic function\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Alice"))\n\n# Function with default parameters\ndef calculate_area(length, width=10):\n    area = length * width\n    return f"Area: {area} square units"\n\nprint(calculate_area(5))\nprint(calculate_area(5, 20))\n\n# Function with multiple returns\ndef get_stats(numbers):\n    return min(numbers), max(numbers), sum(numbers) / len(numbers)\n\ndata = [23, 45, 12, 67, 34]\nminimum, maximum, average = get_stats(data)\nprint(f"\\nStats for {data}:")\nprint(f"Min: {minimum}, Max: {maximum}, Avg: {average:.2f}")` },
  { id: 'loops', category: 'Control Flow', difficulty: 'Beginner', code: `# For loop with range\nprint("Counting to 5:")\nfor i in range(1, 6):\n    print(f"Count: {i}")\n\n# For loop with list\ncolors = ["red", "green", "blue"]\nprint("\\nColors:")\nfor color in colors:\n    print(f"- {color.upper()}")\n\n# While loop\nprint("\\nCountdown:")\ncountdown = 5\nwhile countdown > 0:\n    print(f"{countdown}...")\n    countdown -= 1\nprint("Blast off! 🚀")\n\n# Nested loops\nprint("\\nMultiplication table (3x3):")\nfor i in range(1, 4):\n    for j in range(1, 4):\n        print(f"{i}×{j}={i*j}", end="  ")\n    print()` },
  { id: 'dictionaries', category: 'Data Structures', difficulty: 'Intermediate', code: `# Creating a dictionary\nstudent = {\n    "name": "Alex",\n    "age": 20,\n    "courses": ["Python", "Data Science", "AI"],\n    "gpa": 3.8\n}\n\nprint(f"Student: {student['name']}")\nprint(f"Age: {student['age']}")\nprint(f"Courses: {', '.join(student['courses'])}")\n\nstudent["email"] = "alex@example.com"\nstudent["age"] = 21\nprint(f"\\nUpdated: {student}")\n\nprint(f"\\nAll keys: {list(student.keys())}")\nprint(f"All values: {list(student.values())}")\n\nprint("\\nStudent details:")\nfor key, value in student.items():\n    print(f"  {key}: {value}")` },
  { id: 'list-comprehension', category: 'Advanced', difficulty: 'Intermediate', code: `# Basic list comprehension\nnumbers = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in numbers]\nprint(f"Numbers: {numbers}")\nprint(f"Squares: {squares}")\n\nevens = [x for x in range(10) if x % 2 == 0]\nprint(f"\\nEven numbers: {evens}")\n\nwords = ["hello", "world", "python", "code"]\ncapitalized = [word.capitalize() for word in words]\nprint(f"\\nCapitalized: {capitalized}")\n\nmatrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]\nprint("\\nMatrix:")\nfor row in matrix:\n    print(row)\n\nword_lengths = {word: len(word) for word in words}\nprint(f"\\nWord lengths: {word_lengths}")` },
  { id: 'file-handling', category: 'File I/O', difficulty: 'Intermediate', code: `# Note: File operations are simulated\nfile_content = []\nfile_content.append("Line 1: Hello, file!")\nfile_content.append("Line 2: Python file handling")\nfile_content.append("Line 3: Easy and powerful")\n\nprint("Writing to file...")\nfor line in file_content:\n    print(f"  Writing: {line}")\n\nprint("\\nReading from file:")\nfor i, line in enumerate(file_content, 1):\n    print(f"  {i}: {line}")\n\ncsv_data = "Name,Age,City\\nAlice,25,NYC\\nBob,30,LA\\nCarol,28,Chicago"\nprint("\\nProcessing CSV data:")\nlines = csv_data.split("\\n")\nheader = lines[0].split(",")\nprint(f"Headers: {header}")\n\nfor line in lines[1:]:\n    values = line.split(",")\n    person = dict(zip(header, values))\n    print(f"  {person}")` },
  { id: 'error-handling', category: 'Error Handling', difficulty: 'Intermediate', code: `try:\n    numerator = 10\n    denominator = 0\n    result = numerator / denominator\n    print(result)\nexcept ZeroDivisionError:\n    print("Error: Cannot divide by zero!")\n\ntry:\n    num_list = [1, 2, 'three']\nexcept (ZeroDivisionError, TypeError, IndexError) as e:\n    print(f"An error occurred: {type(e).__name__} - {e}")\nfinally:\n    print("Execution of try-except block is complete.")` },
  { id: 'classes-objects', category: 'OOP', difficulty: 'Advanced', code: `class Dog:\n    species = "Canis familiaris"\n\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def description(self):\n        return f"{self.name} is {self.age} years old."\n\n    def speak(self, sound):\n        return f"{self.name} says {sound}."\n\nmy_dog = Dog("Buddy", 5)\nyour_dog = Dog("Lucy", 3)\n\nprint(my_dog.description())\nprint(your_dog.speak("Woof!"))\nprint(f"Both dogs are of the species: {Dog.species}")` },
  { id: 'api-request', category: 'Web', difficulty: 'Advanced', code: `import json\n\ndef fetch_user_data(user_id):\n    mock_api_response = {\n        "1": {"name": "Alice", "email": "alice@example.com"},\n        "2": {"name": "Bob", "email": "bob@example.com"}\n    }\n    print(f"Fetching data for user_id: {user_id}...")\n    if str(user_id) in mock_api_response:\n        return json.dumps(mock_api_response[str(user_id)])\n    else:\n        return json.dumps({"error": "User not found"})\n\nuser_data_json = fetch_user_data(1)\nuser_data = json.loads(user_data_json)\nprint(f"User data: {user_data}")\n\nnot_found_json = fetch_user_data(3)\nnot_found_data = json.loads(not_found_json)\nprint(f"Non-existent user: {not_found_data}")` },
];

const PracticePage: NextPage = () => {
  const { t } = usePageTranslation('practice');
  const [selectedCode, setSelectedCode] = useState<CodeExample>(codeExamples[0]);
  const [filter, setFilter] = useState<{ category: string, difficulty: string }>({ category: 'All', difficulty: 'All' });
  const [search, setSearch] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSelectExample = (example: CodeExample) => {
    setSelectedCode(example);
  };

  const categories = ['All', ...Array.from(new Set(codeExamples.map(ex => ex.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const getExampleTitle = (id: string) => t(`codeExamples.${id}.title`);
  const getExampleDesc = (id: string) => t(`codeExamples.${id}.description`);

  const filteredExamples = codeExamples.filter(ex => {
    const title = getExampleTitle(ex.id);
    const desc = getExampleDesc(ex.id);
    return (filter.category === 'All' || ex.category === filter.category) &&
           (filter.difficulty === 'All' || ex.difficulty === filter.difficulty) &&
           (title.toLowerCase().includes(search.toLowerCase()) ||
            desc.toLowerCase().includes(search.toLowerCase()));
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout hideNavAndFooter={isFullscreen}>
      <div className={`bg-gray-900 min-h-screen text-white ${isFullscreen ? 'p-0' : ''}`}>
        <main className={`container mx-auto px-4 py-8 ${isFullscreen ? 'max-w-full h-screen' : ''}`}>
          {!isFullscreen && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                Python <span className="text-blue-400">{t('pageTitle')}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400">
                {t('pageSubtitle')}
              </p>
            </div>
          )}

          <div className={`flex gap-8 ${isFullscreen ? 'flex-row h-full' : 'flex-col lg:flex-row'}`}>
            {!isFullscreen && (
              <div className="lg:w-1/3">
                <div className="bg-gray-800 p-4 rounded-lg sticky top-8">
                  <h2 className="text-2xl font-bold mb-4">{t('codeExamples')}</h2>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder={t('searchExamples')}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full p-3 bg-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2 mt-2">
                      <select
                        value={filter.category}
                        onChange={(e) => setFilter(prev => ({...prev, category: e.target.value}))}
                        className="w-1/2 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select
                        value={filter.difficulty}
                        onChange={(e) => setFilter(prev => ({...prev, difficulty: e.target.value}))}
                        className="w-1/2 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                    {filteredExamples.length > 0 ? (
                      filteredExamples.map((example) => (
                        <button
                          key={example.id}
                          onClick={() => handleSelectExample(example)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                            selectedCode.id === example.id
                              ? 'bg-blue-600 shadow-lg'
                              : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        >
                          <h3 className="font-bold text-lg">{getExampleTitle(example.id)}</h3>
                          <p className="text-sm text-gray-300">{getExampleDesc(example.id)}</p>
                          <div className="mt-2 flex gap-2">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(example.difficulty)}`}>
                              {example.difficulty}
                            </span>
                            <span className="px-2 py-0.5 text-xs bg-gray-600 text-gray-200 rounded-full">
                              {example.category}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        {t('noExamplesFound')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className={`flex ${isFullscreen ? 'flex-row w-full' : 'flex-col lg:w-2/3'} gap-8`}>
              <div className={`bg-gray-800 rounded-lg overflow-hidden flex-grow flex flex-col ${isFullscreen ? 'w-2/3' : 'w-full'}`}>
                <div className="p-4 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{getExampleTitle(selectedCode.id)}</h2>
                    <p className="text-gray-400">{getExampleDesc(selectedCode.id)}</p>
                  </div>
                  <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 4l-5-5" />
                    </svg>
                  </button>
                </div>
                <div className="flex-grow">
                  <PythonInterpreter
                    height={isFullscreen ? 'calc(100vh - 80px)' : '500px'}
                    initialCode={selectedCode.code}
                    key={selectedCode.id}
                  />
                </div>
              </div>

              <AIChatPanel
                codeContext={selectedCode.code}
                className={isFullscreen ? 'w-1/3 h-full' : 'w-full'}
                compact={!isFullscreen}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default PracticePage;
