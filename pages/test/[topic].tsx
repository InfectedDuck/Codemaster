import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import PythonInterpreter from '../../components/PythonInterpreter';
import { usePageTranslation } from '../../contexts/LanguageContext';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface TestResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  questionResults: {
    question: string;
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}

// Question pools for each topic
const questionPools: { [key: string]: Question[] } = {
  'control-structures': [
    {
      id: 'cs_001',
      question: 'What is the correct syntax for an if statement in Python?',
      options: ['if x = 5:', 'if (x == 5):', 'if x == 5:', 'if x == 5 then:'],
      correctAnswer: 2,
      explanation: 'Python if statements use a colon after the condition and don\'t require parentheses.',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_002',
      question: 'What will this code print?\n\nfor i in range(3):\n    print(i)',
      options: ['1 2 3', '0 1 2', '1 2', '0 1 2 3'],
      correctAnswer: 1,
      explanation: 'range(3) generates numbers from 0 to 2 (3 is excluded).',
      difficulty: 'easy',
      topic: 'For Loops'
    },
    {
      id: 'cs_003',
      question: 'Which keyword is used to exit a loop prematurely?',
      options: ['exit', 'break', 'stop', 'end'],
      correctAnswer: 1,
      explanation: 'The break keyword immediately exits the current loop.',
      difficulty: 'easy',
      topic: 'Loop Control'
    },
    {
      id: 'cs_004',
      question: 'What does the continue statement do in a loop?',
      options: ['Exits the loop', 'Skips to the next iteration', 'Restarts the loop', 'Does nothing'],
      correctAnswer: 1,
      explanation: 'continue skips the rest of the current iteration and moves to the next one.',
      difficulty: 'medium',
      topic: 'Loop Control'
    },
    {
      id: 'cs_005',
      question: 'What will this while loop do?\n\nx = 0\nwhile x < 5:\n    print(x)',
      options: ['Print 0 to 4', 'Print 0 to 5', 'Run forever', 'Print nothing'],
      correctAnswer: 2,
      explanation: 'x is never incremented, so the condition x < 5 remains true forever.',
      difficulty: 'medium',
      topic: 'While Loops'
    },
    {
      id: 'cs_006',
      question: 'What is the output of this code?\n\nfor i in range(2, 8, 2):\n    print(i, end=" ")',
      options: ['2 4 6', '2 4 6 8', '0 2 4 6', '2 3 4 5 6 7'],
      correctAnswer: 0,
      explanation: 'range(2, 8, 2) starts at 2, stops before 8, with step 2: 2, 4, 6.',
      difficulty: 'medium',
      topic: 'For Loops'
    },
    {
      id: 'cs_007',
      question: 'What is the purpose of the elif statement?',
      options: ['To end an if statement', 'To check additional conditions', 'To repeat code', 'To exit a program'],
      correctAnswer: 1,
      explanation: 'elif (else if) allows you to check additional conditions when the first if condition is false.',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_008',
      question: 'What will this code output?\n\nage = 16\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
      options: ['Adult', 'Minor', 'Error', 'Nothing'],
      correctAnswer: 1,
      explanation: 'Since age (16) is less than 18, the else block executes, printing "Minor".',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_009',
      question: 'What does range(5) generate?',
      options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'],
      correctAnswer: 1,
      explanation: 'range(5) generates numbers from 0 up to (but not including) 5.',
      difficulty: 'easy',
      topic: 'For Loops'
    },
    {
      id: 'cs_010',
      question: 'In a while loop, what happens if the condition never becomes false?',
      options: ['The loop stops automatically', 'The loop becomes a for loop', 'An infinite loop occurs', 'Python shows an error'],
      correctAnswer: 2,
      explanation: 'If the condition never becomes false, the loop will continue indefinitely, creating an infinite loop.',
      difficulty: 'medium',
      topic: 'While Loops'
    },
    {
      id: 'cs_011',
      question: 'What is the correct way to use logical operators in an if statement?',
      options: ['if x = 5 && y = 10:', 'if x == 5 and y == 10:', 'if (x == 5) & (y == 10):', 'if x == 5, y == 10:'],
      correctAnswer: 1,
      explanation: 'Python uses "and" for logical AND operations, and conditions are separated by "and".',
      difficulty: 'medium',
      topic: 'If Statements'
    },
    {
      id: 'cs_012',
      question: 'What will this code print?\n\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)',
      options: ['0 1 2 3', '0 1 2', '1 2 3', '0 1 2 3 4'],
      correctAnswer: 1,
      explanation: 'The loop prints 0, 1, 2, then breaks when i equals 3, so 3 is not printed.',
      difficulty: 'medium',
      topic: 'Loop Control'
    },
    {
      id: 'cs_013',
      question: 'What does range(1, 6) generate?',
      options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4, 5, 6', '2, 3, 4, 5'],
      correctAnswer: 0,
      explanation: 'range(1, 6) starts at 1 and goes up to (but not including) 6.',
      difficulty: 'easy',
      topic: 'For Loops'
    },
    {
      id: 'cs_014',
      question: 'What will this code output?\n\nfor i in range(5):\n    if i % 2 == 0:\n        continue\n    print(i)',
      options: ['0 2 4', '1 3', '0 1 2 3 4', '1 2 3 4'],
      correctAnswer: 1,
      explanation: 'continue skips even numbers (i % 2 == 0), so only odd numbers 1 and 3 are printed.',
      difficulty: 'medium',
      topic: 'Loop Control'
    },
    {
      id: 'cs_015',
      question: 'Which statement correctly checks if a variable x is between 10 and 20?',
      options: ['if 10 < x < 20:', 'if x > 10 and x < 20:', 'if (x > 10) and (x < 20):', 'All of the above'],
      correctAnswer: 3,
      explanation: 'All three forms are valid in Python. Python supports chained comparisons and explicit and operations.',
      difficulty: 'medium',
      topic: 'If Statements'
    },
    {
      id: 'cs_016',
      question: 'What will this while loop do?\n\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1',
      options: ['Print 0 1 2', 'Print 1 2 3', 'Run forever', 'Print 0 1 2 3'],
      correctAnswer: 0,
      explanation: 'The loop starts at 0, prints and increments until count reaches 3, printing 0, 1, 2.',
      difficulty: 'easy',
      topic: 'While Loops'
    },
    {
      id: 'cs_017',
      question: 'What does the "in" operator check in an if statement?',
      options: ['Equality', 'Membership', 'Identity', 'Data type'],
      correctAnswer: 1,
      explanation: 'The "in" operator checks if a value is a member of a sequence (like a list or string).',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_018',
      question: 'What will this code output?\n\nfor char in "Hi":\n    print(char)',
      options: ['Hi', 'H i', 'H\\ni', 'Error'],
      correctAnswer: 1,
      explanation: 'For loops can iterate over strings, printing each character on a separate line: H then i.',
      difficulty: 'easy',
      topic: 'For Loops'
    },
    {
      id: 'cs_019',
      question: 'What is the output of range(10, 0, -2)?',
      options: ['10, 8, 6, 4, 2', '10, 8, 6, 4, 2, 0', '8, 6, 4, 2', '10, 9, 8, 7, 6, 5, 4, 3, 2, 1'],
      correctAnswer: 0,
      explanation: 'range(10, 0, -2) starts at 10, goes down to (but not including) 0, with step -2.',
      difficulty: 'medium',
      topic: 'For Loops'
    },
    {
      id: 'cs_020',
      question: 'In nested if statements, when is the inner if executed?',
      options: ['Always', 'Never', 'Only when the outer if is true', 'Only when the outer if is false'],
      correctAnswer: 2,
      explanation: 'The inner if statement is only checked and executed when the outer if condition is true.',
      difficulty: 'medium',
      topic: 'Nested Structures'
    },
    {
      id: 'cs_021',
      question: 'What will this code print?\n\nfor i in range(3):\n    for j in range(2):\n        print(i, j)',
      options: ['0 0, 0 1, 1 0, 1 1, 2 0, 2 1', '0 1 2, 0 1', '3 times 2', 'Error'],
      correctAnswer: 0,
      explanation: 'Nested loops: outer loop runs 3 times (i=0,1,2), inner loop runs 2 times for each (j=0,1).',
      difficulty: 'medium',
      topic: 'Nested Structures'
    },
    {
      id: 'cs_022',
      question: 'What does the "not" operator do in conditions?',
      options: ['Adds negation', 'Reverses the boolean value', 'Checks inequality', 'Stops execution'],
      correctAnswer: 1,
      explanation: 'The "not" operator reverses the boolean value: not True becomes False, not False becomes True.',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_023',
      question: 'What will this code output?\n\nx = 5\nif x > 0:\n    if x % 2 == 0:\n        print("Positive even")\n    else:\n        print("Positive odd")',
      options: ['Positive even', 'Positive odd', 'Nothing', 'Error'],
      correctAnswer: 1,
      explanation: 'x is 5 (positive), so the outer if is true. 5 % 2 == 1 (not 0), so "Positive odd" is printed.',
      difficulty: 'medium',
      topic: 'Nested Structures'
    },
    {
      id: 'cs_024',
      question: 'What is the purpose of indentation in Python control structures?',
      options: ['Makes code look nice', 'Defines code blocks', 'Optional formatting', 'Increases performance'],
      correctAnswer: 1,
      explanation: 'Indentation is mandatory in Python and defines which code belongs to which block structure.',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_025',
      question: 'What will this code do?\n\nwhile True:\n    user_input = input("Enter quit to exit: ")\n    if user_input == "quit":\n        break',
      options: ['Run forever', 'Ask for input once', 'Keep asking until "quit"', 'Show error'],
      correctAnswer: 2,
      explanation: 'This is a common pattern: infinite loop with break condition to keep asking for input until "quit".',
      difficulty: 'medium',
      topic: 'While Loops'
    },
    {
      id: 'cs_026',
      question: 'What does enumerate() do in a for loop?',
      options: ['Counts iterations', 'Provides index and value', 'Sorts the list', 'Reverses the order'],
      correctAnswer: 1,
      explanation: 'enumerate() returns both the index and value of each item in the sequence.',
      difficulty: 'medium',
      topic: 'For Loops'
    },
    {
      id: 'cs_027',
      question: 'What will this code output?\n\nfor i in range(5):\n    if i == 2:\n        continue\n    if i == 4:\n        break\n    print(i)',
      options: ['0 1 2 3', '0 1 3', '0 1', '0 1 3 4'],
      correctAnswer: 1,
      explanation: 'Prints 0, 1 (skips 2 due to continue), prints 3, then breaks before printing 4.',
      difficulty: 'hard',
      topic: 'Loop Control'
    },
    {
      id: 'cs_028',
      question: 'Which is the correct way to check multiple conditions with OR?',
      options: ['if x == 1 || x == 2:', 'if x == 1 or x == 2:', 'if x == 1 | x == 2:', 'if x == (1 or 2):'],
      correctAnswer: 1,
      explanation: 'Python uses "or" for logical OR operations between conditions.',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_029',
      question: 'What will this code output?\n\nfor i in [1, 2, 3]:\n    print(i * 2)',
      options: ['1 2 3', '2 4 6', '11 22 33', 'Error'],
      correctAnswer: 1,
      explanation: 'The loop iterates over the list [1, 2, 3] and prints each number multiplied by 2.',
      difficulty: 'easy',
      topic: 'For Loops'
    },
    {
      id: 'cs_030',
      question: 'What happens when you use break in a nested loop?',
      options: ['Exits all loops', 'Exits only the inner loop', 'Exits only the outer loop', 'Continues to next iteration'],
      correctAnswer: 1,
      explanation: 'break only exits the innermost loop where it is used, not outer loops.',
      difficulty: 'medium',
      topic: 'Loop Control'
    },
    {
      id: 'cs_031',
      question: 'What will this code output?\n\nscore = 75\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\nprint(grade)',
      options: ['A', 'B', 'C', 'F'],
      correctAnswer: 2,
      explanation: 'Score 75 falls in the range >= 70 but < 80, so grade "C" is assigned.',
      difficulty: 'medium',
      topic: 'If Statements'
    },
    {
      id: 'cs_032',
      question: 'What is the difference between "and" and "&" in Python conditions?',
      options: ['No difference', '"and" is for logic, "&" is for bitwise', 'They are interchangeable', '"&" is preferred'],
      correctAnswer: 1,
      explanation: '"and" is the logical operator for conditions, "&" is for bitwise operations on numbers.',
      difficulty: 'medium',
      topic: 'If Statements'
    },
    {
      id: 'cs_033',
      question: 'What will this while loop output?\n\ni = 1\nwhile i <= 3:\n    print(i)\n    i += 1',
      options: ['1 2 3', '0 1 2', '1 2 3 4', 'Infinite loop'],
      correctAnswer: 0,
      explanation: 'Loop starts at 1, prints and increments while i <= 3, outputting 1, 2, 3.',
      difficulty: 'easy',
      topic: 'While Loops'
    },
    {
      id: 'cs_034',
      question: 'How do you iterate over both index and value in a list?',
      options: ['for i, v in list:', 'for i, v in enumerate(list):', 'for index(list):', 'for i in range(list):'],
      correctAnswer: 1,
      explanation: 'enumerate() returns tuples of (index, value) that can be unpacked in the for loop.',
      difficulty: 'medium',
      topic: 'For Loops'
    },
    {
      id: 'cs_035',
      question: 'What will this code output?\n\nif "a" in "cat":\n    print("Found")\nelse:\n    print("Not found")',
      options: ['Found', 'Not found', 'Error', 'cat'],
      correctAnswer: 0,
      explanation: 'The letter "a" is present in the string "cat", so "Found" is printed.',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_036',
      question: 'What is the output of this nested loop?\n\nfor i in range(2):\n    for j in range(3):\n        if j == 1:\n            continue\n        print(f"{i},{j}")',
      options: ['0,0 0,2 1,0 1,2', '0,1 1,1', '0,0 0,1 0,2 1,0 1,1 1,2', 'Error'],
      correctAnswer: 0,
      explanation: 'Outer loop runs twice (i=0,1), inner loop runs 3 times but skips when j=1.',
      difficulty: 'hard',
      topic: 'Nested Structures'
    },
    {
      id: 'cs_037',
      question: 'What does this condition check?\n\nif not (x < 0 or x > 100):',
      options: ['x is negative or greater than 100', 'x is between 0 and 100 inclusive', 'x is exactly 0 or 100', 'x is not a number'],
      correctAnswer: 1,
      explanation: 'Using De Morgan\'s law: not (x < 0 or x > 100) means x >= 0 and x <= 100.',
      difficulty: 'hard',
      topic: 'If Statements'
    },
    {
      id: 'cs_038',
      question: 'What will this code do?\n\ncount = 0\nwhile count < 5:\n    print(count)\n    if count == 2:\n        break\n    count += 1',
      options: ['Print 0 1 2', 'Print 0 1', 'Print 0 2', 'Infinite loop'],
      correctAnswer: 3,
      explanation: 'When count=2, it prints 2 and breaks, but count is never incremented, causing infinite loop printing 0.',
      difficulty: 'hard',
      topic: 'While Loops'
    },
    {
      id: 'cs_039',
      question: 'What is the purpose of the colon (:) in control structures?',
      options: ['Optional punctuation', 'Ends the statement', 'Starts the code block', 'Separates conditions'],
      correctAnswer: 2,
      explanation: 'The colon (:) indicates the start of an indented code block in Python control structures.',
      difficulty: 'easy',
      topic: 'If Statements'
    },
    {
      id: 'cs_040',
      question: 'What will this code output?\n\nfor num in [1, 2, 3, 4, 5]:\n    if num % 2 == 1:\n        print(num, end=" ")',
      options: ['1 3 5 ', '2 4 ', '1 2 3 4 5 ', 'Error'],
      correctAnswer: 0,
      explanation: 'The condition num % 2 == 1 checks for odd numbers, so 1, 3, 5 are printed.',
      difficulty: 'medium',
      topic: 'For Loops'
    },
    {
      id: 'cs_041',
      question: 'In a for loop, what happens after the last iteration?',
      options: ['Loop continues forever', 'Loop exits automatically', 'Error occurs', 'Loop restarts'],
      correctAnswer: 1,
      explanation: 'After processing all items in the sequence, the for loop exits automatically.',
      difficulty: 'easy',
      topic: 'For Loops'
    },
    {
      id: 'cs_042',
      question: 'What will this code output?\n\nx = 10\ny = 5\nif x > y and y > 0:\n    print("Both true")\nelif x > y:\n    print("First true")\nelse:\n    print("Neither")',
      options: ['Both true', 'First true', 'Neither', 'Error'],
      correctAnswer: 0,
      explanation: 'Both conditions (x > y and y > 0) are true (10 > 5 and 5 > 0), so "Both true" is printed.',
      difficulty: 'medium',
      topic: 'If Statements'
    }
  ],
  
  'functions': [
    {
      id: 'fn_001',
      question: 'What keyword is used to define a function in Python?',
      options: ['function', 'def', 'define', 'func'],
      correctAnswer: 1,
      explanation: 'The def keyword is used to define functions in Python.',
      difficulty: 'easy',
      topic: 'Function Definition'
    },
    {
      id: 'fn_002',
      question: 'What will this function return?\n\ndef add_numbers(a, b):\n    a + b\n\nresult = add_numbers(3, 5)',
      options: ['8', '3', '5', 'None'],
      correctAnswer: 3,
      explanation: 'Without a return statement, functions return None by default.',
      difficulty: 'medium',
      topic: 'Return Values'
    },
    {
      id: 'fn_003',
      question: 'What is a parameter in a function?',
      options: ['The value returned', 'A variable in the function definition', 'The function name', 'A function call'],
      correctAnswer: 1,
      explanation: 'Parameters are variables listed in the function definition that receive values when called.',
      difficulty: 'easy',
      topic: 'Parameters'
    },
    {
      id: 'fn_004',
      question: 'What will this code print?\n\ndef greet(name="World"):\n    return f"Hello, {name}!"\n\nprint(greet())',
      options: ['Hello, !', 'Hello, World!', 'Error', 'Hello, name!'],
      correctAnswer: 1,
      explanation: 'When no argument is provided, the default parameter value "World" is used.',
      difficulty: 'medium',
      topic: 'Default Parameters'
    },
    {
      id: 'fn_005',
      question: 'What is the scope of a variable defined inside a function?',
      options: ['Global', 'Local', 'Universal', 'Module'],
      correctAnswer: 1,
      explanation: 'Variables defined inside functions have local scope and are only accessible within that function.',
      difficulty: 'medium',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_006',
      question: 'What is the purpose of a try-except block?',
      options: ['To define functions', 'To handle errors', 'To create loops', 'To import modules'],
      correctAnswer: 1,
      explanation: 'try-except blocks are used to handle exceptions and errors gracefully.',
      difficulty: 'easy',
      topic: 'Error Handling'
    },
    {
      id: 'fn_007',
      question: 'What will this function return?\n\ndef add(a, b=5):\n    return a + b\n\nresult = add(3)',
      options: ['3', '5', '8', 'Error'],
      correctAnswer: 2,
      explanation: 'The function uses the default value b=5, so it returns 3 + 5 = 8.',
      difficulty: 'medium',
      topic: 'Parameters & Arguments'
    },
    {
      id: 'fn_008',
      question: 'Which exception is raised when dividing by zero?',
      options: ['ValueError', 'TypeError', 'ZeroDivisionError', 'ArithmeticError'],
      correctAnswer: 2,
      explanation: 'ZeroDivisionError is specifically raised when attempting division by zero.',
      difficulty: 'easy',
      topic: 'Error Handling'
    },
    {
      id: 'fn_009',
      question: 'What will this code do?\n\ndef func():\n    global x\n    x = 10\n\nx = 5\nfunc()\nprint(x)',
      options: ['Print 5', 'Print 10', 'Error', 'Print None'],
      correctAnswer: 1,
      explanation: 'The global keyword allows the function to modify the global variable x.',
      difficulty: 'medium',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_010',
      question: 'How do you call a function named "calculate" with arguments 5 and 10?',
      options: ['calculate[5, 10]', 'calculate(5, 10)', 'call calculate(5, 10)', 'run calculate(5, 10)'],
      correctAnswer: 1,
      explanation: 'Functions are called by using their name followed by parentheses with arguments.',
      difficulty: 'easy',
      topic: 'Defining Functions'
    },
    {
      id: 'fn_011',
      question: 'What happens when a function has multiple return statements?',
      options: ['All returns execute', 'Only the first return executes', 'Only the last return executes', 'Error occurs'],
      correctAnswer: 1,
      explanation: 'When a return statement is reached, the function immediately exits.',
      difficulty: 'medium',
      topic: 'Return Values'
    },
    {
      id: 'fn_012',
      question: 'What will this function return?\n\ndef check_number(n):\n    if n > 0:\n        return "positive"\n    elif n < 0:\n        return "negative"\n    else:\n        return "zero"\n\nresult = check_number(0)',
      options: ['positive', 'negative', 'zero', 'None'],
      correctAnswer: 2,
      explanation: 'Since n equals 0, the else clause executes, returning "zero".',
      difficulty: 'medium',
      topic: 'Return Values'
    },
    {
      id: 'fn_013',
      question: 'Which is correct for calling a function with keyword arguments?',
      options: ['func(a=5, b=10)', 'func(a:5, b:10)', 'func(5=a, 10=b)', 'func(a->5, b->10)'],
      correctAnswer: 0,
      explanation: 'Keyword arguments use the format parameter_name=value.',
      difficulty: 'easy',
      topic: 'Parameters & Arguments'
    },
    {
      id: 'fn_014',
      question: 'What will this code output?\n\ntry:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nelse:\n    print("Division successful")',
      options: ['Cannot divide by zero', 'Division successful', 'Both messages', 'Error'],
      correctAnswer: 0,
      explanation: 'The except block executes because ZeroDivisionError occurs; else block is skipped.',
      difficulty: 'medium',
      topic: 'Error Handling'
    },
    {
      id: 'fn_015',
      question: 'What is a docstring in a function?',
      options: ['A comment', 'Documentation string', 'A variable', 'An error message'],
      correctAnswer: 1,
      explanation: 'A docstring is a documentation string that describes what the function does.',
      difficulty: 'easy',
      topic: 'Defining Functions'
    },
    {
      id: 'fn_016',
      question: 'What will this function return?\n\ndef multiply(*args):\n    result = 1\n    for num in args:\n        result *= num\n    return result\n\nprint(multiply(2, 3, 4))',
      options: ['9', '24', '6', 'Error'],
      correctAnswer: 1,
      explanation: '*args allows variable number of arguments. 2 * 3 * 4 = 24.',
      difficulty: 'medium',
      topic: 'Parameters & Arguments'
    },
    {
      id: 'fn_017',
      question: 'In Python, what does the LEGB rule refer to?',
      options: ['Loop structure', 'Variable scope resolution', 'Function naming', 'Error handling'],
      correctAnswer: 1,
      explanation: 'LEGB stands for Local, Enclosing, Global, Built-in scope resolution order.',
      difficulty: 'medium',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_018',
      question: 'What will this code do?\n\ndef safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0\n\nresult = safe_divide(10, 0)',
      options: ['Return 10', 'Return 0', 'Raise error', 'Return None'],
      correctAnswer: 1,
      explanation: 'The except block catches ZeroDivisionError and returns 0.',
      difficulty: 'medium',
      topic: 'Error Handling'
    },
    {
      id: 'fn_019',
      question: 'What happens if you call a function before defining it?',
      options: ['It works fine', 'NameError occurs', 'Function returns None', 'Python auto-defines it'],
      correctAnswer: 1,
      explanation: 'Python raises a NameError if you try to call a function before it\'s defined.',
      difficulty: 'easy',
      topic: 'Defining Functions'
    },
    {
      id: 'fn_020',
      question: 'What will this function return?\n\ndef get_info():\n    name = "Alice"\n    age = 25\n    return name, age\n\nresult = get_info()',
      options: ['Alice', '25', '("Alice", 25)', 'Error'],
      correctAnswer: 2,
      explanation: 'Multiple return values are returned as a tuple.',
      difficulty: 'medium',
      topic: 'Return Values'
    },
    {
      id: 'fn_021',
      question: 'What is the difference between parameters and arguments?',
      options: ['No difference', 'Parameters are in definition, arguments are in calls', 'Arguments are in definition, parameters are in calls', 'Parameters are optional'],
      correctAnswer: 1,
      explanation: 'Parameters are variables in function definitions, arguments are values passed when calling.',
      difficulty: 'medium',
      topic: 'Parameters & Arguments'
    },
    {
      id: 'fn_022',
      question: 'What will this code output?\n\nx = "global"\n\ndef test():\n    x = "local"\n    print(x)\n\ntest()\nprint(x)',
      options: ['global global', 'local local', 'local global', 'global local'],
      correctAnswer: 2,
      explanation: 'The function prints its local x, then the global x is printed outside.',
      difficulty: 'medium',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_023',
      question: 'Which block always executes in try-except-finally?',
      options: ['try', 'except', 'finally', 'None guaranteed'],
      correctAnswer: 2,
      explanation: 'The finally block always executes, regardless of whether an exception occurs.',
      difficulty: 'medium',
      topic: 'Error Handling'
    },
    {
      id: 'fn_024',
      question: 'What is the correct way to define a function with default parameters?',
      options: ['def func(a=5, b):', 'def func(b, a=5):', 'def func(a, b=5):', 'Both B and C'],
      correctAnswer: 3,
      explanation: 'Default parameters can come after required ones. Both orders B and C are valid.',
      difficulty: 'medium',
      topic: 'Parameters & Arguments'
    },
    {
      id: 'fn_025',
      question: 'What will this function do?\n\ndef process_list(lst):\n    lst.append(100)\n    return lst\n\nmy_list = [1, 2, 3]\nresult = process_list(my_list)\nprint(my_list)',
      options: ['[1, 2, 3]', '[1, 2, 3, 100]', 'Error', '[100]'],
      correctAnswer: 1,
      explanation: 'Lists are mutable; the function modifies the original list.',
      difficulty: 'hard',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_026',
      question: 'What type of exception occurs when converting "abc" to int?',
      options: ['TypeError', 'ValueError', 'ConversionError', 'SyntaxError'],
      correctAnswer: 1,
      explanation: 'ValueError is raised when a value has the right type but inappropriate value.',
      difficulty: 'easy',
      topic: 'Error Handling'
    },
    {
      id: 'fn_027',
      question: 'What will this code output?\n\ndef outer():\n    x = 10\n    def inner():\n        print(x)\n    inner()\n\nouter()',
      options: ['10', 'Error', 'None', 'NameError'],
      correctAnswer: 0,
      explanation: 'Inner functions can access variables from their enclosing scope.',
      difficulty: 'medium',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_028',
      question: 'What happens when you return without a value?',
      options: ['Error occurs', 'Returns 0', 'Returns None', 'Returns empty string'],
      correctAnswer: 2,
      explanation: 'A bare return statement or no return at all returns None.',
      difficulty: 'easy',
      topic: 'Return Values'
    },
    {
      id: 'fn_029',
      question: 'How do you handle multiple exception types in one except block?',
      options: ['except ValueError, TypeError:', 'except (ValueError, TypeError):', 'except ValueError or TypeError:', 'except ValueError and TypeError:'],
      correctAnswer: 1,
      explanation: 'Multiple exception types are handled using a tuple in parentheses.',
      difficulty: 'medium',
      topic: 'Error Handling'
    },
    {
      id: 'fn_030',
      question: 'What will this function return?\n\ndef mystery(a, b, c=10):\n    return a + b * c\n\nresult = mystery(5, 2)',
      options: ['7', '25', '70', 'Error'],
      correctAnswer: 1,
      explanation: 'a=5, b=2, c=10 (default). Returns 5 + 2 * 10 = 5 + 20 = 25.',
      difficulty: 'medium',
      topic: 'Parameters & Arguments'
    },
    {
      id: 'fn_031',
      question: 'What is the purpose of the global keyword?',
      options: ['Create global variables', 'Access global variables', 'Modify global variables from functions', 'Delete global variables'],
      correctAnswer: 2,
      explanation: 'The global keyword allows functions to modify global variables.',
      difficulty: 'medium',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_032',
      question: 'What will this code do?\n\ntry:\n    result = int("123")\nexcept ValueError:\n    print("Error")\nelse:\n    print("Success")\nfinally:\n    print("Done")',
      options: ['Success Done', 'Error Done', 'Success', 'Done'],
      correctAnswer: 0,
      explanation: 'No error occurs, so else executes ("Success"), then finally always executes ("Done").',
      difficulty: 'medium',
      topic: 'Error Handling'
    },
    {
      id: 'fn_033',
      question: 'What is the correct way to document a function?',
      options: ['# Comment above function', 'Triple-quoted string inside function', '// Comment', 'docstring() function'],
      correctAnswer: 1,
      explanation: 'Docstrings are triple-quoted strings placed at the beginning of the function body.',
      difficulty: 'easy',
      topic: 'Defining Functions'
    },
    {
      id: 'fn_034',
      question: 'What will this function return?\n\ndef calculate(x, y, operation="add"):\n    if operation == "add":\n        return x + y\n    elif operation == "subtract":\n        return x - y\n    else:\n        return None\n\nresult = calculate(10, 5)',
      options: ['15', '5', 'None', 'Error'],
      correctAnswer: 0,
      explanation: 'Default operation is "add", so it returns 10 + 5 = 15.',
      difficulty: 'medium',
      topic: 'Parameters & Arguments'
    },
    {
      id: 'fn_035',
      question: 'What happens when an exception is not caught?',
      options: ['Program continues', 'Program terminates', 'Exception is ignored', 'Function returns None'],
      correctAnswer: 1,
      explanation: 'Uncaught exceptions cause the program to terminate with an error message.',
      difficulty: 'easy',
      topic: 'Error Handling'
    },
    {
      id: 'fn_036',
      question: 'What will this code output?\n\ndef modify_value(x):\n    x = x + 10\n    return x\n\nvalue = 5\nresult = modify_value(value)\nprint(value)',
      options: ['5', '15', '10', 'Error'],
      correctAnswer: 0,
      explanation: 'Integers are immutable; the original variable is not modified.',
      difficulty: 'medium',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_037',
      question: 'What is the difference between return and print in a function?',
      options: ['No difference', 'return sends value back, print displays value', 'print sends value back, return displays value', 'Both do the same thing'],
      correctAnswer: 1,
      explanation: 'return sends a value back to the caller, print displays a value to the screen.',
      difficulty: 'easy',
      topic: 'Return Values'
    },
    {
      id: 'fn_038',
      question: 'What will this function do?\n\ndef validate_input(value):\n    try:\n        num = int(value)\n        if num < 0:\n            raise ValueError("Negative number")\n        return num\n    except ValueError as e:\n        print(f"Error: {e}")\n        return None\n\nresult = validate_input("-5")',
      options: ['Return -5', 'Return None and print error', 'Raise exception', 'Return 0'],
      correctAnswer: 1,
      explanation: 'The function raises ValueError for negative numbers, which is caught and prints error.',
      difficulty: 'hard',
      topic: 'Error Handling'
    },
    {
      id: 'fn_039',
      question: 'What is the scope of function parameters?',
      options: ['Global', 'Local to the function', 'Depends on the parameter', 'Built-in'],
      correctAnswer: 1,
      explanation: 'Function parameters have local scope within the function.',
      difficulty: 'easy',
      topic: 'Variable Scope'
    },
    {
      id: 'fn_040',
      question: 'What will this code output?\n\ndef test(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key}: {value}")\n\ntest(name="Alice", age=25)',
      options: ['name: Alice age: 25', 'Alice 25', 'Error', 'name age Alice 25'],
      correctAnswer: 0,
      explanation: '**kwargs collects keyword arguments into a dictionary.',
      difficulty: 'medium',
      topic: 'Parameters & Arguments'
    },
    {
      id: 'fn_041',
      question: 'When should you use try-except blocks?',
      options: ['Always', 'Never', 'When you expect possible errors', 'Only for syntax errors'],
      correctAnswer: 2,
      explanation: 'Use try-except when you anticipate that an operation might fail.',
      difficulty: 'easy',
      topic: 'Error Handling'
    },
    {
      id: 'fn_042',
      question: 'What will this function return?\n\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nresult = fibonacci(4)',
      options: ['3', '4', '5', 'Error'],
      correctAnswer: 0,
      explanation: 'Fibonacci sequence: f(4) = f(3) + f(2) = 2 + 1 = 3.',
      difficulty: 'hard',
      topic: 'Return Values'
    },
    {
      id: 'fn_043',
      question: 'What is the purpose of the pass statement in Python?',
      options: ['To define a function', 'To create an empty loop', 'To create an empty function', 'To import a module'],
      correctAnswer: 2,
      explanation: 'The pass statement is a null operation; it does nothing and is used as a placeholder.',
      difficulty: 'medium',
      topic: 'Functions'
    },
    {
      id: 'fn_044',
      question: 'What keyword is used to define a function in Python?',
      options: ['def', 'function', 'fun', 'define'],
      correctAnswer: 1,
      explanation: 'A function must be defined before it can be called in the script.',
      difficulty: 'medium',
      topic: 'Functions'
    }
  ],
  
  'string-manipulation': [
    {
      id: 'sm_001',
      question: 'What is the index of the last character in the string "Python"?',
      options: ['5', '6', '-1', 'Both A and C'],
      correctAnswer: 3,
      explanation: 'The last character has positive index 5 and negative index -1.',
      difficulty: 'easy',
      topic: 'String Indexing'
    },
    {
      id: 'sm_002',
      question: 'What will "Hello"[1:4] return?',
      options: ['Hel', 'ell', 'ello', 'Hell'],
      correctAnswer: 1,
      explanation: 'Slicing [1:4] returns characters from index 1 to 3 (4 is excluded).',
      difficulty: 'easy',
      topic: 'String Slicing'
    },
    {
      id: 'sm_003',
      question: 'What does the strip() method do?',
      options: ['Removes all spaces', 'Removes leading/trailing whitespace', 'Converts to lowercase', 'Splits the string'],
      correctAnswer: 1,
      explanation: 'strip() removes whitespace characters from the beginning and end of the string.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_004',
      question: 'What is the modern recommended way to format strings in Python?',
      options: ['% formatting', '.format() method', 'f-strings', 'String concatenation'],
      correctAnswer: 2,
      explanation: 'f-strings (f"Hello {name}") are the modern, readable, and fast way to format strings.',
      difficulty: 'easy',
      topic: 'String Formatting'
    },
    {
      id: 'sm_005',
      question: 'What will "Python"[::-1] return?',
      options: ['Python', 'nohtyP', 'Pytho', 'Error'],
      correctAnswer: 1,
      explanation: 'The slice [::-1] reverses the entire string.',
      difficulty: 'medium',
      topic: 'String Slicing'
    },
    {
      id: 'sm_006',
      question: 'Which method checks if a string starts with a specific substring?',
      options: ['begins_with()', 'starts()', 'startswith()', 'prefix()'],
      correctAnswer: 2,
      explanation: 'The startswith() method checks if a string begins with the specified substring.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_007',
      question: 'What will "hello world".find("world") return?',
      options: ['5', '6', '7', '-1'],
      correctAnswer: 1,
      explanation: 'find() returns the starting index of the first occurrence. "world" starts at index 6.',
      difficulty: 'medium',
      topic: 'String Methods'
    },
    {
      id: 'sm_008',
      question: 'What does f"{25.6789:.2f}" output?',
      options: ['25.6789', '25.68', '25.67', '26'],
      correctAnswer: 1,
      explanation: 'The :.2f format specifier rounds to 2 decimal places.',
      difficulty: 'medium',
      topic: 'String Formatting'
    },
    {
      id: 'sm_009',
      question: 'What will "abc123".isalnum() return?',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 0,
      explanation: 'isalnum() returns True because the string contains only letters and digits.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_010',
      question: 'What does "Hello"[10:] return instead of raising an error?',
      options: ['Error occurs', 'Hello', 'Empty string', 'None'],
      correctAnswer: 2,
      explanation: 'Slicing with out-of-range indices returns an empty string instead of raising an error.',
      difficulty: 'medium',
      topic: 'String Slicing'
    },
    {
      id: 'sm_011',
      question: 'What will "apple,banana,orange".split(",") return?',
      options: ['["apple", "banana", "orange"]', '"apple" "banana" "orange"', 'Error', 'apple banana orange'],
      correctAnswer: 0,
      explanation: 'split() returns a list of substrings separated by the delimiter.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_012',
      question: 'What does " | ".join(["a", "b", "c"]) return?',
      options: ['["a", "b", "c"]', '"a | b | c"', 'a | b | c', 'Error'],
      correctAnswer: 2,
      explanation: 'join() concatenates list elements with the specified separator.',
      difficulty: 'medium',
      topic: 'String Methods'
    },
    {
      id: 'sm_013',
      question: 'What will "Hello"[::2] return?',
      options: ['Hlo', 'elo', 'Hel', 'Ho'],
      correctAnswer: 0,
      explanation: 'Slicing with step 2 takes every second character: H(0), l(2), o(4).',
      difficulty: 'medium',
      topic: 'String Slicing'
    },
    {
      id: 'sm_014',
      question: 'Which regex pattern matches any digit?',
      options: ['\\n', '\\d', '\\w', '\\s'],
      correctAnswer: 1,
      explanation: '\\d matches any digit character (0-9) in regular expressions.',
      difficulty: 'easy',
      topic: 'Regular Expressions'
    },
    {
      id: 'sm_015',
      question: 'What does "hello WORLD".swapcase() return?',
      options: ['HELLO world', 'Hello World', 'hello world', 'HELLO WORLD'],
      correctAnswer: 0,
      explanation: 'swapcase() converts uppercase to lowercase and vice versa.',
      difficulty: 'medium',
      topic: 'String Methods'
    },
    {
      id: 'sm_016',
      question: 'What will f"{10:03d}" output?',
      options: ['10', '010', '003', '100'],
      correctAnswer: 1,
      explanation: 'The :03d format pads the number with zeros to make it 3 digits wide.',
      difficulty: 'medium',
      topic: 'String Formatting'
    },
    {
      id: 'sm_017',
      question: 'What does "Python"[-2:] return?',
      options: ['on', 'ho', 'Python', 'n'],
      correctAnswer: 0,
      explanation: 'Negative slicing [-2:] returns the last 2 characters.',
      difficulty: 'medium',
      topic: 'String Slicing'
    },
    {
      id: 'sm_018',
      question: 'What will "hello".upper().lower() return?',
      options: ['hello', 'HELLO', 'Hello', 'Error'],
      correctAnswer: 0,
      explanation: 'Method chaining: first converts to uppercase, then back to lowercase.',
      difficulty: 'medium',
      topic: 'String Methods'
    },
    {
      id: 'sm_019',
      question: 'Which method returns the number of occurrences of a substring?',
      options: ['find()', 'index()', 'count()', 'search()'],
      correctAnswer: 2,
      explanation: 'count() returns the number of non-overlapping occurrences of a substring.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_020',
      question: 'What does "Alice".center(10, "*") return?',
      options: ['**Alice***', '***Alice**', '**Alice**', 'Alice*****'],
      correctAnswer: 0,
      explanation: 'center() centers the string in the specified width using the padding character.',
      difficulty: 'medium',
      topic: 'String Methods'
    },
    {
      id: 'sm_021',
      question: 'What will "Hello World"[6:11] return?',
      options: ['World', 'Worl', ' World', 'orld'],
      correctAnswer: 0,
      explanation: 'Slicing [6:11] extracts characters from index 6 to 10, which is "World".',
      difficulty: 'medium',
      topic: 'String Slicing'
    },
    {
      id: 'sm_022',
      question: 'What does re.findall() return?',
      options: ['First match only', 'Match object', 'List of all matches', 'Boolean'],
      correctAnswer: 2,
      explanation: 're.findall() returns a list containing all non-overlapping matches.',
      difficulty: 'easy',
      topic: 'Regular Expressions'
    },
    {
      id: 'sm_023',
      question: 'What will "123abc".isdigit() return?',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 1,
      explanation: 'isdigit() returns False because the string contains non-digit characters.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_024',
      question: 'What does f"{0.85:.1%}" output?',
      options: ['0.85', '85%', '85.0%', '0.9%'],
      correctAnswer: 2,
      explanation: 'The :.1% format converts to percentage with 1 decimal place.',
      difficulty: 'medium',
      topic: 'String Formatting'
    },
    {
      id: 'sm_025',
      question: 'What will "hello world".replace("l", "L", 2) return?',
      options: ['heLLo world', 'heLlo worLd', 'heLLo worLd', 'hello world'],
      correctAnswer: 0,
      explanation: 'replace() with count parameter replaces only the first 2 occurrences.',
      difficulty: 'medium',
      topic: 'String Methods'
    },
    {
      id: 'sm_026',
      question: 'What does "Programming"[2:8:2] return?',
      options: ['ogram', 'ogam', 'oga', 'ram'],
      correctAnswer: 2,
      explanation: 'Slicing [2:8:2] takes every 2nd character from index 2 to 7: o(2), r(4), m(6).',
      difficulty: 'hard',
      topic: 'String Slicing'
    },
    {
      id: 'sm_027',
      question: 'Which regex quantifier means "one or more"?',
      options: ['*', '+', '?', '{1}'],
      correctAnswer: 1,
      explanation: 'The + quantifier matches one or more occurrences of the preceding element.',
      difficulty: 'medium',
      topic: 'Regular Expressions'
    },
    {
      id: 'sm_028',
      question: 'What will "  hello  ".lstrip() return?',
      options: ['"hello  "', '"  hello"', '"hello"', 'hello  '],
      correctAnswer: 3,
      explanation: 'lstrip() removes only leading (left) whitespace characters.',
      difficulty: 'medium',
      topic: 'String Methods'
    },
    {
      id: 'sm_029',
      question: 'What does f"{42:>5}" output?',
      options: ['42   ', '  42 ', '   42', '42'],
      correctAnswer: 2,
      explanation: 'The :>5 format right-aligns the number in a field of width 5.',
      difficulty: 'medium',
      topic: 'String Formatting'
    },
    {
      id: 'sm_030',
      question: 'What will "abcdef"[1::2] return?',
      options: ['ace', 'bdf', 'abcd', 'bcde'],
      correctAnswer: 1,
      explanation: 'Slicing [1::2] starts at index 1 and takes every 2nd character: b(1), d(3), f(5).',
      difficulty: 'medium',
      topic: 'String Slicing'
    },
    {
      id: 'sm_031',
      question: 'What does "Hello".endswith("lo") return?',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 0,
      explanation: 'endswith() returns True because "Hello" ends with "lo".',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_032',
      question: 'What will re.search(r"\\d+", "abc123def") return if successful?',
      options: ['123', 'Match object', '3', 'List'],
      correctAnswer: 1,
      explanation: 're.search() returns a Match object (not the matched string directly).',
      difficulty: 'medium',
      topic: 'Regular Expressions'
    },
    {
      id: 'sm_033',
      question: 'What does "PYTHON".islower() return?',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 1,
      explanation: 'islower() returns False because the string contains uppercase characters.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_034',
      question: 'What will f"{"Alice":<8}" output?',
      options: ['Alice   ', '   Alice', ' Alice  ', 'Alice'],
      correctAnswer: 0,
      explanation: 'The :<8 format left-aligns the string in a field of width 8.',
      difficulty: 'medium',
      topic: 'String Formatting'
    },
    {
      id: 'sm_035',
      question: 'What does "test"*3 return?',
      options: ['testtesttest', 'test test test', 'Error', 'test3'],
      correctAnswer: 0,
      explanation: 'String multiplication repeats the string the specified number of times.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_036',
      question: 'What will "Python"[6:] return?',
      options: ['n', 'Error', 'Empty string', 'Python'],
      correctAnswer: 2,
      explanation: 'Slicing beyond string length returns an empty string, not an error.',
      difficulty: 'medium',
      topic: 'String Slicing'
    },
    {
      id: 'sm_037',
      question: 'Which method splits a string into exactly 3 parts?',
      options: ['split()', 'partition()', 'rsplit()', 'divide()'],
      correctAnswer: 1,
      explanation: 'partition() splits a string into exactly 3 parts: before, separator, after.',
      difficulty: 'medium',
      topic: 'String Methods'
    },
    {
      id: 'sm_038',
      question: 'What does r"\\w+" match in regex?',
      options: ['Any single character', 'One or more word characters', 'Whitespace', 'Numbers only'],
      correctAnswer: 1,
      explanation: '\\w+ matches one or more word characters (letters, digits, underscore).',
      difficulty: 'medium',
      topic: 'Regular Expressions'
    },
    {
      id: 'sm_039',
      question: 'What will "Hello World".title() return?',
      options: ['hello world', 'HELLO WORLD', 'Hello World', 'Hello world'],
      correctAnswer: 2,
      explanation: 'title() capitalizes the first letter of each word.',
      difficulty: 'easy',
      topic: 'String Methods'
    },
    {
      id: 'sm_040',
      question: 'What does f"{1234:,}" output?',
      options: ['1234', '1,234', '1.234', '1 234'],
      correctAnswer: 1,
      explanation: 'The :, format adds thousand separators (commas) to numbers.',
      difficulty: 'medium',
      topic: 'String Formatting'
    },
    {
      id: 'sm_041',
      question: 'What will "hello"[:3] + "world"[2:] return?',
      options: ['helloworld', 'helworld', 'helrld', 'hello world'],
      correctAnswer: 1,
      explanation: 'Concatenates "hel" (first 3 chars) with "rld" (from index 2 onwards).',
      difficulty: 'hard',
      topic: 'String Slicing'
    },
    {
      id: 'sm_042',
      question: 'What does re.sub() do in regular expressions?',
      options: ['Finds matches', 'Substitutes/replaces matches', 'Splits strings', 'Validates patterns'],
      correctAnswer: 1,
      explanation: 're.sub() substitutes (replaces) all occurrences of a pattern with a replacement.',
      difficulty: 'easy',
      topic: 'Regular Expressions'
    }
  ],
  
  'variables-datatypes': [
    {
      id: 'vdt_001',
      question: 'Which of the following is a valid variable name in Python?',
      options: ['2variable', 'my-variable', 'my_variable', 'my variable'],
      correctAnswer: 2,
      explanation: 'Variable names can contain letters, numbers, and underscores, but cannot start with a number or contain spaces/hyphens.',
      difficulty: 'easy',
      topic: 'Variables'
    },
    {
      id: 'vdt_002',
      question: 'What is the output of: print(type(3.14))?',
      options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'number\'>'],
      correctAnswer: 1,
      explanation: '3.14 is a floating-point number, so its type is float.',
      difficulty: 'easy',
      topic: 'Data Types'
    },
    {
      id: 'vdt_003',
      question: 'What will be the result of: 10 // 3?',
      options: ['3.33', '3', '4', '3.0'],
      correctAnswer: 1,
      explanation: 'The // operator performs floor division, returning only the integer part of the division.',
      difficulty: 'medium',
      topic: 'Operators'
    },
    {
      id: 'vdt_004',
      question: 'Which of the following evaluates to False in Python?',
      options: ['bool(1)', 'bool("hello")', 'bool([])', 'bool([1, 2, 3])'],
      correctAnswer: 2,
      explanation: 'Empty collections like empty lists [] evaluate to False in Python.',
      difficulty: 'medium',
      topic: 'Booleans'
    },
    {
      id: 'vdt_005',
      question: 'What does the expression 5 ** 2 evaluate to?',
      options: ['10', '25', '7', '52'],
      correctAnswer: 1,
      explanation: 'The ** operator is exponentiation, so 5 ** 2 equals 5 squared, which is 25.',
      difficulty: 'easy',
      topic: 'Operators'
    },
    {
      id: 'vdt_006',
      question: 'Which statement correctly assigns multiple variables?',
      options: ['a, b, c = 1, 2, 3', 'a = b = c = 1, 2, 3', 'a; b; c = 1; 2; 3', 'let a, b, c = 1, 2, 3'],
      correctAnswer: 0,
      explanation: 'Python supports tuple unpacking for multiple assignment using commas.',
      difficulty: 'medium',
      topic: 'Variables'
    },
    {
      id: 'vdt_007',
      question: 'What is the result of: "Hello" + "World"?',
      options: ['HelloWorld', 'Hello World', 'Hello+World', 'Error'],
      correctAnswer: 0,
      explanation: 'String concatenation with + joins strings directly without adding spaces.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_008',
      question: 'What will print(15 % 4) output?',
      options: ['3', '3.75', '4', '0'],
      correctAnswer: 0,
      explanation: 'The % operator returns the remainder of division. 15 divided by 4 is 3 remainder 3.',
      difficulty: 'medium',
      topic: 'Operators'
    },
    {
      id: 'vdt_009',
      question: 'Which of the following is a valid Python data type for whole numbers?',
      options: ['integer', 'int', 'number', 'whole'],
      correctAnswer: 1,
      explanation: 'The int data type is used for whole numbers in Python.',
      difficulty: 'easy',
      topic: 'Data Types'
    },
    {
      id: 'vdt_010',
      question: 'What is the output of: bool(0.0)?',
      options: ['True', 'False', '0', 'Error'],
      correctAnswer: 1,
      explanation: 'The float 0.0 is considered falsy in Python, so bool(0.0) returns False.',
      difficulty: 'medium',
      topic: 'Booleans'
    },
    {
      id: 'vdt_011',
      question: 'What does "Python".upper() return?',
      options: ['python', 'PYTHON', 'Python', 'pYTHON'],
      correctAnswer: 1,
      explanation: 'The upper() method converts all characters in the string to uppercase.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_012',
      question: 'Which operator checks for equality in Python?',
      options: ['=', '==', '===', 'eq'],
      correctAnswer: 1,
      explanation: 'The == operator checks for equality, while = is for assignment.',
      difficulty: 'easy',
      topic: 'Operators'
    },
    {
      id: 'vdt_013',
      question: 'What is the value of x after: x = 5; x += 3?',
      options: ['5', '3', '8', '53'],
      correctAnswer: 2,
      explanation: 'The += operator adds the right value to the left variable. So x becomes 5 + 3 = 8.',
      difficulty: 'easy',
      topic: 'Operators'
    },
    {
      id: 'vdt_014',
      question: 'What does len("Hello") return?',
      options: ['4', '5', '6', 'Error'],
      correctAnswer: 1,
      explanation: 'The len() function counts the number of characters in a string. "Hello" has 5 characters.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_015',
      question: 'Which is the correct way to check if a variable x is not equal to 10?',
      options: ['x !== 10', 'x != 10', 'x <> 10', 'not x == 10'],
      correctAnswer: 1,
      explanation: 'The != operator is used for "not equal to" comparisons in Python.',
      difficulty: 'easy',
      topic: 'Operators'
    },
    {
      id: 'vdt_016',
      question: 'What is the result of: True and False?',
      options: ['True', 'False', '1', '0'],
      correctAnswer: 1,
      explanation: 'The and operator returns True only when both operands are True.',
      difficulty: 'easy',
      topic: 'Booleans'
    },
    {
      id: 'vdt_017',
      question: 'What is the output of: print(type("123"))?',
      options: ['<class \'int\'>', '<class \'str\'>', '<class \'number\'>', '<class \'text\'>'],
      correctAnswer: 1,
      explanation: 'Even though "123" looks like a number, the quotes make it a string.',
      difficulty: 'easy',
      topic: 'Data Types'
    },
    {
      id: 'vdt_018',
      question: 'Which will cause a NameError when y is not defined?',
      options: ['x = 5', 'print(x)', 'print(y)', 'y = x + 1'],
      correctAnswer: 2,
      explanation: 'Trying to use variable y before it\'s defined will cause a NameError.',
      difficulty: 'medium',
      topic: 'Variables'
    },
    {
      id: 'vdt_019',
      question: 'What does "  hello  ".strip() return?',
      options: ['"hello"', '"  hello  "', 'hello', '" hello "'],
      correctAnswer: 2,
      explanation: 'The strip() method removes leading and trailing whitespace.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_020',
      question: 'What is the output of: print(10 > 5 and 3 < 2)?',
      options: ['True', 'False', 'Error', '1'],
      correctAnswer: 1,
      explanation: 'Even though 10 > 5 is True, 3 < 2 is False, so the and operation returns False.',
      difficulty: 'medium',
      topic: 'Booleans'
    },
    {
      id: 'vdt_021',
      question: 'What is the result of: 17 // 5?',
      options: ['3.4', '3', '4', '2'],
      correctAnswer: 1,
      explanation: 'Floor division // returns the quotient without the remainder.',
      difficulty: 'medium',
      topic: 'Operators'
    },
    {
      id: 'vdt_022',
      question: 'What does the expression not True or False evaluate to?',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 1,
      explanation: 'not True is False, and False or False is False.',
      difficulty: 'medium',
      topic: 'Booleans'
    },
    {
      id: 'vdt_023',
      question: 'What is the result of: 5 < 3 or 2 == 2?',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 0,
      explanation: 'Although 5 < 3 is False, 2 == 2 is True, so the or operation returns True.',
      difficulty: 'medium',
      topic: 'Booleans'
    },
    {
      id: 'vdt_024',
      question: 'What does bool(None) return?',
      options: ['True', 'False', 'None', 'Error'],
      correctAnswer: 1,
      explanation: 'None is considered falsy in Python, so bool(None) returns False.',
      difficulty: 'medium',
      topic: 'Booleans'
    },
    {
      id: 'vdt_025',
      question: 'Which comparison operator checks if two variables point to the same object?',
      options: ['==', '!=', 'is', 'in'],
      correctAnswer: 2,
      explanation: 'The "is" operator checks object identity, not just equality.',
      difficulty: 'medium',
      topic: 'Operators'
    },
    {
      id: 'vdt_026',
      question: 'What will this f-string output? name="Bob"; print(f"Hello {name}!")',
      options: ['Hello Bob!', 'Hello name!', 'Hello {name}!', 'Error'],
      correctAnswer: 0,
      explanation: 'F-strings substitute variables within curly braces into the string.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_027',
      question: 'What is the result of: 6 / 2?',
      options: ['3', '3.0', '2', '6'],
      correctAnswer: 1,
      explanation: 'The / operator always returns a float in Python 3, even if the result is a whole number.',
      difficulty: 'medium',
      topic: 'Operators'
    },
    {
      id: 'vdt_028',
      question: 'Which of these is considered "truthy" in Python?',
      options: ['0', '""', '[]', '"hello"'],
      correctAnswer: 3,
      explanation: 'Non-empty strings are truthy. Empty values like 0, "", and [] are falsy.',
      difficulty: 'medium',
      topic: 'Booleans'
    },
    {
      id: 'vdt_029',
      question: 'What is the output of: print(3 == 3.0)?',
      options: ['True', 'False', 'Error', '3.0'],
      correctAnswer: 0,
      explanation: 'Python considers 3 and 3.0 equal in value, even though they are different types.',
      difficulty: 'medium',
      topic: 'Operators'
    },
    {
      id: 'vdt_030',
      question: 'What does first_name + " " + last_name accomplish?',
      options: ['Adds the strings mathematically', 'Concatenates the strings with a space', 'Creates a list', 'Causes an error'],
      correctAnswer: 1,
      explanation: 'String concatenation using + joins strings together in the order specified.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_031',
      question: 'What will x -= 2 do if x = 10?',
      options: ['x becomes 8', 'x becomes 12', 'x becomes -2', 'Error'],
      correctAnswer: 0,
      explanation: 'The -= operator subtracts the right value from the left variable. 10 - 2 = 8.',
      difficulty: 'easy',
      topic: 'Operators'
    },
    {
      id: 'vdt_032',
      question: 'Which string formatting method uses curly braces with f before the quotes?',
      options: ['.format()', '% formatting', 'f-strings', 'concatenation'],
      correctAnswer: 2,
      explanation: 'F-strings use the f prefix and curly braces to embed expressions.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_033',
      question: 'What does bool("") return?',
      options: ['True', 'False', '""', 'Error'],
      correctAnswer: 1,
      explanation: 'Empty strings are falsy in Python, so bool("") returns False.',
      difficulty: 'medium',
      topic: 'Booleans'
    },
    {
      id: 'vdt_034',
      question: 'What is the result of: 8 % 3?',
      options: ['2', '2.67', '3', '5'],
      correctAnswer: 0,
      explanation: 'The % operator returns the remainder. 8 divided by 3 is 2 remainder 2.',
      difficulty: 'medium',
      topic: 'Operators'
    },
    {
      id: 'vdt_035',
      question: 'What does "apple" in fruits do if fruits = ["apple", "banana"]?',
      options: ['Returns True', 'Returns False', 'Returns "apple"', 'Causes error'],
      correctAnswer: 0,
      explanation: 'The "in" operator checks membership and returns True if "apple" is in the list.',
      difficulty: 'medium',
      topic: 'Operators'
    },
    {
      id: 'vdt_036',
      question: 'What is the output of: print(not False)?',
      options: ['True', 'False', 'not False', 'Error'],
      correctAnswer: 0,
      explanation: 'The not operator reverses the boolean value. not False is True.',
      difficulty: 'easy',
      topic: 'Booleans'
    },
    {
      id: 'vdt_037',
      question: 'Which method removes whitespace from both ends of a string?',
      options: ['remove()', 'strip()', 'clean()', 'trim()'],
      correctAnswer: 1,
      explanation: 'The strip() method removes leading and trailing whitespace characters.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_038',
      question: 'What does x *= 3 do if x = 4?',
      options: ['x becomes 12', 'x becomes 7', 'x becomes 1', 'Error'],
      correctAnswer: 0,
      explanation: 'The *= operator multiplies the variable by the right value. 4 * 3 = 12.',
      difficulty: 'easy',
      topic: 'Operators'
    },
    {
      id: 'vdt_039',
      question: 'What is the result of: True or False?',
      options: ['True', 'False', '1', '0'],
      correctAnswer: 0,
      explanation: 'The or operator returns True if at least one operand is True.',
      difficulty: 'easy',
      topic: 'Booleans'
    },
    {
      id: 'vdt_040',
      question: 'What does "HELLO".lower() return?',
      options: ['HELLO', 'hello', 'Hello', 'hELLO'],
      correctAnswer: 1,
      explanation: 'The lower() method converts all characters to lowercase.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_041',
      question: 'What will this code output? text = "Python"; print(len(text))',
      options: ['5', '6', '7', 'Error'],
      correctAnswer: 1,
      explanation: 'The len() function counts characters. "Python" has 6 characters.',
      difficulty: 'easy',
      topic: 'Strings'
    },
    {
      id: 'vdt_042',
      question: 'What is the result of: 2 ** 4?',
      options: ['6', '8', '16', '24'],
      correctAnswer: 2,
      explanation: 'The ** operator is exponentiation. 2 ** 4 = 2 to the power of 4 = 16.',
      difficulty: 'easy',
      topic: 'Operators'
    }
  ],
  
  'modules': [
    {
      id: 'mod_001',
      question: 'What is the purpose of the import statement in Python?',
      options: ['To define a new function', 'To import a module', 'To create a new variable', 'To execute a block of code'],
      correctAnswer: 1,
      explanation: 'The import statement is used to import modules, which contain pre-defined functions and variables.',
      difficulty: 'easy',
      topic: 'Modules'
    },
    {
      id: 'mod_002',
      question: 'What will this code do?\n\nimport math\n\nprint(math.sqrt(16))',
      options: ['4', '16', 'Error', 'None'],
      correctAnswer: 0,
      explanation: 'The math module contains the sqrt() function, which calculates the square root of a number.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_003',
      question: 'Which module is used for date and time operations?',
      options: ['datetime', 'time', 'date', 'calendar'],
      correctAnswer: 0,
      explanation: 'The datetime module is used for date and time operations in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_004',
      question: 'What will this code do?\n\nimport random\n\nprint(random.randint(1, 10))',
      options: ['1-10', '1-11', 'Error', 'None'],
      correctAnswer: 0,
      explanation: 'The random module contains the randint() function, which generates a random integer between two values.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_005',
      question: 'What module is used for regular expressions?',
      options: ['re', 'regex', 'regexp', 'regular expressions'],
      correctAnswer: 0,
      explanation: 'The re module is used for regular expressions in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_006',
      question: 'What will this code do?\n\nimport os\n\nprint(os.getcwd())',
      options: ['Current directory', 'Error', 'None', 'Operating system'],
      correctAnswer: 0,
      explanation: 'The os module contains the getcwd() function, which returns the current working directory.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_007',
      question: 'What module is used for mathematical operations?',
      options: ['math', 'maths', 'mathematics', 'math operations'],
      correctAnswer: 0,
      explanation: 'The math module contains various mathematical functions and constants.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_008',
      question: 'What will this code do?\n\nimport sys\n\nprint(sys.path)',
      options: ['Module paths', 'Error', 'None', 'System information'],
      correctAnswer: 0,
      explanation: 'The sys module contains the path attribute, which lists directories to be searched for modules.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_009',
      question: 'What module is used for string operations?',
      options: ['string', 'str', 'string operations', 'str operations'],
      correctAnswer: 0,
      explanation: 'The string module contains various string operations and functions.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_010',
      question: 'What will this code do?\n\nimport json\n\nprint(json.dumps({"name": "Alice", "age": 25}))',
      options: ['{"name": "Alice", "age": 25}', 'Error', 'None', 'JSON string'],
      correctAnswer: 0,
      explanation: 'The json module contains the dumps() function, which converts a Python object to a JSON string.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_011',
      question: 'What module is used for web development?',
      options: ['flask', 'django', 'web2py', 'web development'],
      correctAnswer: 0,
      explanation: 'Flask is a popular web framework for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_012',
      question: 'What will this code do?\n\nimport numpy as np\n\nprint(np.array([1, 2, 3]))',
      options: ['[1, 2, 3]', 'Error', 'None', 'NumPy array'],
      correctAnswer: 0,
      explanation: 'NumPy is a library for scientific computing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_013',
      question: 'What module is used for data analysis?',
      options: ['pandas', 'numpy', 'matplotlib', 'data analysis'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_014',
      question: 'What will this code do?\n\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [4, 5, 6])',
      options: ['Plot', 'Error', 'None', 'Matplotlib'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a plotting library for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_015',
      question: 'What module is used for machine learning?',
      options: ['scikit-learn', 'tensorflow', 'keras', 'machine learning'],
      correctAnswer: 0,
      explanation: 'Scikit-learn is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_016',
      question: 'What will this code do?\n\nimport requests\n\nprint(requests.get("https://api.github.com"))',
      options: ['API response', 'Error', 'None', 'Requests'],
      correctAnswer: 0,
      explanation: 'Requests is a library for making HTTP requests in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_017',
      question: 'What module is used for web scraping?',
      options: ['scrapy', 'beautifulsoup4', 'selenium', 'web scraping'],
      correctAnswer: 0,
      explanation: 'Scrapy is a library for web scraping in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_018',
      question: 'What will this code do?\n\nimport sqlite3\n\nconn = sqlite3.connect("example.db")\ncur = conn.cursor()\ncur.execute("CREATE TABLE users (name TEXT, age INTEGER)")',
      options: ['Database connection', 'Error', 'None', 'SQLite'],
      correctAnswer: 0,
      explanation: 'sqlite3 is a module for SQLite database operations in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_019',
      question: 'What module is used for data visualization?',
      options: ['matplotlib', 'seaborn', 'plotly', 'data visualization'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a library for data visualization in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_020',
      question: 'What will this code do?\n\nimport pandas as pd\n\ndf = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\ndf.plot()',
      options: ['Plot', 'Error', 'None', 'Pandas'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_021',
      question: 'What module is used for natural language processing?',
      options: ['nltk', 'spacy', 'gensim', 'natural language processing'],
      correctAnswer: 0,
      explanation: 'NLTK is a library for natural language processing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_022',
      question: 'What will this code do?\n\nimport tensorflow as tf\n\nmodel = tf.keras.models.Sequential([tf.keras.layers.Dense(10, input_shape=(784,), activation="relu"), tf.keras.layers.Dense(10, activation="softmax")])\nmodel.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])',
      options: ['Model creation', 'Error', 'None', 'TensorFlow'],
      correctAnswer: 0,
      explanation: 'TensorFlow is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_023',
      question: 'What module is used for web development?',
      options: ['flask', 'django', 'web2py', 'web development'],
      correctAnswer: 0,
      explanation: 'Flask is a popular web framework for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_024',
      question: 'What will this code do?\n\nimport numpy as np\n\nprint(np.array([1, 2, 3]))',
      options: ['[1, 2, 3]', 'Error', 'None', 'NumPy array'],
      correctAnswer: 0,
      explanation: 'NumPy is a library for scientific computing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_025',
      question: 'What module is used for data analysis?',
      options: ['pandas', 'numpy', 'matplotlib', 'data analysis'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_026',
      question: 'What will this code do?\n\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [4, 5, 6])',
      options: ['Plot', 'Error', 'None', 'Matplotlib'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a plotting library for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_027',
      question: 'What module is used for machine learning?',
      options: ['scikit-learn', 'tensorflow', 'keras', 'machine learning'],
      correctAnswer: 0,
      explanation: 'Scikit-learn is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_028',
      question: 'What will this code do?\n\nimport requests\n\nprint(requests.get("https://api.github.com"))',
      options: ['API response', 'Error', 'None', 'Requests'],
      correctAnswer: 0,
      explanation: 'Requests is a library for making HTTP requests in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_029',
      question: 'What module is used for web scraping?',
      options: ['scrapy', 'beautifulsoup4', 'selenium', 'web scraping'],
      correctAnswer: 0,
      explanation: 'Scrapy is a library for web scraping in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_030',
      question: 'What will this code do?\n\nimport sqlite3\n\nconn = sqlite3.connect("example.db")\ncur = conn.cursor()\ncur.execute("CREATE TABLE users (name TEXT, age INTEGER)")',
      options: ['Database connection', 'Error', 'None', 'SQLite'],
      correctAnswer: 0,
      explanation: 'sqlite3 is a module for SQLite database operations in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_031',
      question: 'What module is used for data visualization?',
      options: ['matplotlib', 'seaborn', 'plotly', 'data visualization'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a library for data visualization in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_032',
      question: 'What will this code do?\n\nimport pandas as pd\n\ndf = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\ndf.plot()',
      options: ['Plot', 'Error', 'None', 'Pandas'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_033',
      question: 'What module is used for natural language processing?',
      options: ['nltk', 'spacy', 'gensim', 'natural language processing'],
      correctAnswer: 0,
      explanation: 'NLTK is a library for natural language processing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_034',
      question: 'What will this code do?\n\nimport tensorflow as tf\n\nmodel = tf.keras.models.Sequential([tf.keras.layers.Dense(10, input_shape=(784,), activation="relu"), tf.keras.layers.Dense(10, activation="softmax")])\nmodel.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])',
      options: ['Model creation', 'Error', 'None', 'TensorFlow'],
      correctAnswer: 0,
      explanation: 'TensorFlow is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_035',
      question: 'What module is used for web development?',
      options: ['flask', 'django', 'web2py', 'web development'],
      correctAnswer: 0,
      explanation: 'Flask is a popular web framework for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_036',
      question: 'What will this code do?\n\nimport numpy as np\n\nprint(np.array([1, 2, 3]))',
      options: ['[1, 2, 3]', 'Error', 'None', 'NumPy array'],
      correctAnswer: 0,
      explanation: 'NumPy is a library for scientific computing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_037',
      question: 'What module is used for data analysis?',
      options: ['pandas', 'numpy', 'matplotlib', 'data analysis'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_038',
      question: 'What will this code do?\n\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [4, 5, 6])',
      options: ['Plot', 'Error', 'None', 'Matplotlib'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a plotting library for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_039',
      question: 'What module is used for machine learning?',
      options: ['scikit-learn', 'tensorflow', 'keras', 'machine learning'],
      correctAnswer: 0,
      explanation: 'Scikit-learn is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_040',
      question: 'What will this code do?\n\nimport requests\n\nprint(requests.get("https://api.github.com"))',
      options: ['API response', 'Error', 'None', 'Requests'],
      correctAnswer: 0,
      explanation: 'Requests is a library for making HTTP requests in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_041',
      question: 'What module is used for web scraping?',
      options: ['scrapy', 'beautifulsoup4', 'selenium', 'web scraping'],
      correctAnswer: 0,
      explanation: 'Scrapy is a library for web scraping in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_042',
      question: 'What will this code do?\n\nimport sqlite3\n\nconn = sqlite3.connect("example.db")\ncur = conn.cursor()\ncur.execute("CREATE TABLE users (name TEXT, age INTEGER)")',
      options: ['Database connection', 'Error', 'None', 'SQLite'],
      correctAnswer: 0,
      explanation: 'sqlite3 is a module for SQLite database operations in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_043',
      question: 'What module is used for data visualization?',
      options: ['matplotlib', 'seaborn', 'plotly', 'data visualization'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a library for data visualization in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_044',
      question: 'What will this code do?\n\nimport pandas as pd\n\ndf = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\ndf.plot()',
      options: ['Plot', 'Error', 'None', 'Pandas'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_045',
      question: 'What module is used for natural language processing?',
      options: ['nltk', 'spacy', 'gensim', 'natural language processing'],
      correctAnswer: 0,
      explanation: 'NLTK is a library for natural language processing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_046',
      question: 'What will this code do?\n\nimport tensorflow as tf\n\nmodel = tf.keras.models.Sequential([tf.keras.layers.Dense(10, input_shape=(784,), activation="relu"), tf.keras.layers.Dense(10, activation="softmax")])\nmodel.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])',
      options: ['Model creation', 'Error', 'None', 'TensorFlow'],
      correctAnswer: 0,
      explanation: 'TensorFlow is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_047',
      question: 'What module is used for web development?',
      options: ['flask', 'django', 'web2py', 'web development'],
      correctAnswer: 0,
      explanation: 'Flask is a popular web framework for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_048',
      question: 'What will this code do?\n\nimport numpy as np\n\nprint(np.array([1, 2, 3]))',
      options: ['[1, 2, 3]', 'Error', 'None', 'NumPy array'],
      correctAnswer: 0,
      explanation: 'NumPy is a library for scientific computing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_049',
      question: 'What module is used for data analysis?',
      options: ['pandas', 'numpy', 'matplotlib', 'data analysis'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_050',
      question: 'What will this code do?\n\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [4, 5, 6])',
      options: ['Plot', 'Error', 'None', 'Matplotlib'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a plotting library for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_051',
      question: 'What module is used for machine learning?',
      options: ['scikit-learn', 'tensorflow', 'keras', 'machine learning'],
      correctAnswer: 0,
      explanation: 'Scikit-learn is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_052',
      question: 'What will this code do?\n\nimport requests\n\nprint(requests.get("https://api.github.com"))',
      options: ['API response', 'Error', 'None', 'Requests'],
      correctAnswer: 0,
      explanation: 'Requests is a library for making HTTP requests in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_053',
      question: 'What module is used for web scraping?',
      options: ['scrapy', 'beautifulsoup4', 'selenium', 'web scraping'],
      correctAnswer: 0,
      explanation: 'Scrapy is a library for web scraping in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_054',
      question: 'What will this code do?\n\nimport sqlite3\n\nconn = sqlite3.connect("example.db")\ncur = conn.cursor()\ncur.execute("CREATE TABLE users (name TEXT, age INTEGER)")',
      options: ['Database connection', 'Error', 'None', 'SQLite'],
      correctAnswer: 0,
      explanation: 'sqlite3 is a module for SQLite database operations in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_055',
      question: 'What module is used for data visualization?',
      options: ['matplotlib', 'seaborn', 'plotly', 'data visualization'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a library for data visualization in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_056',
      question: 'What will this code do?\n\nimport pandas as pd\n\ndf = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\ndf.plot()',
      options: ['Plot', 'Error', 'None', 'Pandas'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_057',
      question: 'What module is used for natural language processing?',
      options: ['nltk', 'spacy', 'gensim', 'natural language processing'],
      correctAnswer: 0,
      explanation: 'NLTK is a library for natural language processing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_058',
      question: 'What will this code do?\n\nimport tensorflow as tf\n\nmodel = tf.keras.models.Sequential([tf.keras.layers.Dense(10, input_shape=(784,), activation="relu"), tf.keras.layers.Dense(10, activation="softmax")])\nmodel.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])',
      options: ['Model creation', 'Error', 'None', 'TensorFlow'],
      correctAnswer: 0,
      explanation: 'TensorFlow is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_059',
      question: 'What module is used for web development?',
      options: ['flask', 'django', 'web2py', 'web development'],
      correctAnswer: 0,
      explanation: 'Flask is a popular web framework for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_060',
      question: 'What will this code do?\n\nimport numpy as np\n\nprint(np.array([1, 2, 3]))',
      options: ['[1, 2, 3]', 'Error', 'None', 'NumPy array'],
      correctAnswer: 0,
      explanation: 'NumPy is a library for scientific computing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_061',
      question: 'What module is used for data analysis?',
      options: ['pandas', 'numpy', 'matplotlib', 'data analysis'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_062',
      question: 'What will this code do?\n\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [4, 5, 6])',
      options: ['Plot', 'Error', 'None', 'Matplotlib'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a plotting library for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_063',
      question: 'What module is used for machine learning?',
      options: ['scikit-learn', 'tensorflow', 'keras', 'machine learning'],
      correctAnswer: 0,
      explanation: 'Scikit-learn is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_064',
      question: 'What will this code do?\n\nimport requests\n\nprint(requests.get("https://api.github.com"))',
      options: ['API response', 'Error', 'None', 'Requests'],
      correctAnswer: 0,
      explanation: 'Requests is a library for making HTTP requests in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_065',
      question: 'What module is used for web scraping?',
      options: ['scrapy', 'beautifulsoup4', 'selenium', 'web scraping'],
      correctAnswer: 0,
      explanation: 'Scrapy is a library for web scraping in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_066',
      question: 'What will this code do?\n\nimport sqlite3\n\nconn = sqlite3.connect("example.db")\ncur = conn.cursor()\ncur.execute("CREATE TABLE users (name TEXT, age INTEGER)")',
      options: ['Database connection', 'Error', 'None', 'SQLite'],
      correctAnswer: 0,
      explanation: 'sqlite3 is a module for SQLite database operations in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_067',
      question: 'What module is used for data visualization?',
      options: ['matplotlib', 'seaborn', 'plotly', 'data visualization'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a library for data visualization in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_068',
      question: 'What will this code do?\n\nimport pandas as pd\n\ndf = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\ndf.plot()',
      options: ['Plot', 'Error', 'None', 'Pandas'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_069',
      question: 'What module is used for natural language processing?',
      options: ['nltk', 'spacy', 'gensim', 'natural language processing'],
      correctAnswer: 0,
      explanation: 'NLTK is a library for natural language processing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_070',
      question: 'What will this code do?\n\nimport tensorflow as tf\n\nmodel = tf.keras.models.Sequential([tf.keras.layers.Dense(10, input_shape=(784,), activation="relu"), tf.keras.layers.Dense(10, activation="softmax")])\nmodel.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])',
      options: ['Model creation', 'Error', 'None', 'TensorFlow'],
      correctAnswer: 0,
      explanation: 'TensorFlow is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_071',
      question: 'What module is used for web development?',
      options: ['flask', 'django', 'web2py', 'web development'],
      correctAnswer: 0,
      explanation: 'Flask is a popular web framework for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_072',
      question: 'What will this code do?\n\nimport numpy as np\n\nprint(np.array([1, 2, 3]))',
      options: ['[1, 2, 3]', 'Error', 'None', 'NumPy array'],
      correctAnswer: 0,
      explanation: 'NumPy is a library for scientific computing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_073',
      question: 'What module is used for data analysis?',
      options: ['pandas', 'numpy', 'matplotlib', 'data analysis'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_074',
      question: 'What will this code do?\n\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [4, 5, 6])',
      options: ['Plot', 'Error', 'None', 'Matplotlib'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a plotting library for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_075',
      question: 'What module is used for machine learning?',
      options: ['scikit-learn', 'tensorflow', 'keras', 'machine learning'],
      correctAnswer: 0,
      explanation: 'Scikit-learn is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_076',
      question: 'What will this code do?\n\nimport requests\n\nprint(requests.get("https://api.github.com"))',
      options: ['API response', 'Error', 'None', 'Requests'],
      correctAnswer: 0,
      explanation: 'Requests is a library for making HTTP requests in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_077',
      question: 'What module is used for web scraping?',
      options: ['scrapy', 'beautifulsoup4', 'selenium', 'web scraping'],
      correctAnswer: 0,
      explanation: 'Scrapy is a library for web scraping in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_078',
      question: 'What will this code do?\n\nimport sqlite3\n\nconn = sqlite3.connect("example.db")\ncur = conn.cursor()\ncur.execute("CREATE TABLE users (name TEXT, age INTEGER)")',
      options: ['Database connection', 'Error', 'None', 'SQLite'],
      correctAnswer: 0,
      explanation: 'sqlite3 is a module for SQLite database operations in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_079',
      question: 'What module is used for data visualization?',
      options: ['matplotlib', 'seaborn', 'plotly', 'data visualization'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a library for data visualization in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_080',
      question: 'What will this code do?\n\nimport pandas as pd\n\ndf = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\ndf.plot()',
      options: ['Plot', 'Error', 'None', 'Pandas'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_081',
      question: 'What module is used for natural language processing?',
      options: ['nltk', 'spacy', 'gensim', 'natural language processing'],
      correctAnswer: 0,
      explanation: 'NLTK is a library for natural language processing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_082',
      question: 'What will this code do?\n\nimport tensorflow as tf\n\nmodel = tf.keras.models.Sequential([tf.keras.layers.Dense(10, input_shape=(784,), activation="relu"), tf.keras.layers.Dense(10, activation="softmax")])\nmodel.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])',
      options: ['Model creation', 'Error', 'None', 'TensorFlow'],
      correctAnswer: 0,
      explanation: 'TensorFlow is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_083',
      question: 'What module is used for web development?',
      options: ['flask', 'django', 'web2py', 'web development'],
      correctAnswer: 0,
      explanation: 'Flask is a popular web framework for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_084',
      question: 'What will this code do?\n\nimport numpy as np\n\nprint(np.array([1, 2, 3]))',
      options: ['[1, 2, 3]', 'Error', 'None', 'NumPy array'],
      correctAnswer: 0,
      explanation: 'NumPy is a library for scientific computing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_085',
      question: 'What module is used for data analysis?',
      options: ['pandas', 'numpy', 'matplotlib', 'data analysis'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_086',
      question: 'What will this code do?\n\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [4, 5, 6])',
      options: ['Plot', 'Error', 'None', 'Matplotlib'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a plotting library for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_087',
      question: 'What module is used for machine learning?',
      options: ['scikit-learn', 'tensorflow', 'keras', 'machine learning'],
      correctAnswer: 0,
      explanation: 'Scikit-learn is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_088',
      question: 'What will this code do?\n\nimport requests\n\nprint(requests.get("https://api.github.com"))',
      options: ['API response', 'Error', 'None', 'Requests'],
      correctAnswer: 0,
      explanation: 'Requests is a library for making HTTP requests in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_089',
      question: 'What module is used for web scraping?',
      options: ['scrapy', 'beautifulsoup4', 'selenium', 'web scraping'],
      correctAnswer: 0,
      explanation: 'Scrapy is a library for web scraping in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_090',
      question: 'What will this code do?\n\nimport sqlite3\n\nconn = sqlite3.connect("example.db")\ncur = conn.cursor()\ncur.execute("CREATE TABLE users (name TEXT, age INTEGER)")',
      options: ['Database connection', 'Error', 'None', 'SQLite'],
      correctAnswer: 0,
      explanation: 'sqlite3 is a module for SQLite database operations in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_091',
      question: 'What module is used for data visualization?',
      options: ['matplotlib', 'seaborn', 'plotly', 'data visualization'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a library for data visualization in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_092',
      question: 'What will this code do?\n\nimport pandas as pd\n\ndf = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\ndf.plot()',
      options: ['Plot', 'Error', 'None', 'Pandas'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_093',
      question: 'What module is used for natural language processing?',
      options: ['nltk', 'spacy', 'gensim', 'natural language processing'],
      correctAnswer: 0,
      explanation: 'NLTK is a library for natural language processing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_094',
      question: 'What will this code do?\n\nimport tensorflow as tf\n\nmodel = tf.keras.models.Sequential([tf.keras.layers.Dense(10, input_shape=(784,), activation="relu"), tf.keras.layers.Dense(10, activation="softmax")])\nmodel.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])',
      options: ['Model creation', 'Error', 'None', 'TensorFlow'],
      correctAnswer: 0,
      explanation: 'TensorFlow is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_095',
      question: 'What module is used for web development?',
      options: ['flask', 'django', 'web2py', 'web development'],
      correctAnswer: 0,
      explanation: 'Flask is a popular web framework for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_096',
      question: 'What will this code do?\n\nimport numpy as np\n\nprint(np.array([1, 2, 3]))',
      options: ['[1, 2, 3]', 'Error', 'None', 'NumPy array'],
      correctAnswer: 0,
      explanation: 'NumPy is a library for scientific computing in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_097',
      question: 'What module is used for data analysis?',
      options: ['pandas', 'numpy', 'matplotlib', 'data analysis'],
      correctAnswer: 0,
      explanation: 'Pandas is a library for data manipulation and analysis in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_098',
      question: 'What will this code do?\n\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [4, 5, 6])',
      options: ['Plot', 'Error', 'None', 'Matplotlib'],
      correctAnswer: 0,
      explanation: 'Matplotlib is a plotting library for Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_099',
      question: 'What module is used for machine learning?',
      options: ['scikit-learn', 'tensorflow', 'keras', 'machine learning'],
      correctAnswer: 0,
      explanation: 'Scikit-learn is a library for machine learning in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    },
    {
      id: 'mod_100',
      question: 'What will this code do?\n\nimport requests\n\nprint(requests.get("https://api.github.com"))',
      options: ['API response', 'Error', 'None', 'Requests'],
      correctAnswer: 0,
      explanation: 'Requests is a library for making HTTP requests in Python.',
      difficulty: 'medium',
      topic: 'Modules'
    }
  ]
};

const TestPage: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;
  const { t, loadNamespace, locale } = usePageTranslation('quiz');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [translatedQuestions, setTranslatedQuestions] = useState<Record<string, any>>({});

  // Get random 10 questions from the pool
  const getRandomQuestions = (questions: Question[], count: number = 10): Question[] => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Load translated questions if available
  useEffect(() => {
    if (topic && typeof topic === 'string' && locale !== 'en') {
      fetch(`/locales/${locale}/quiz-questions/${topic}.json`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.questions) setTranslatedQuestions(data.questions);
        })
        .catch(() => {});
    }
  }, [topic, locale]);

  // Helper to get translated question text
  const getQ = (q: Question) => {
    const tr = translatedQuestions[q.id];
    if (!tr) return q;
    return {
      ...q,
      question: tr.question || q.question,
      options: tr.options || q.options,
      explanation: tr.explanation || q.explanation,
    };
  };

  useEffect(() => {
    if (topic && typeof topic === 'string') {
      const questions = questionPools[topic];
      if (questions) {
        const randomQuestions = getRandomQuestions(questions);
        setTestQuestions(randomQuestions);
        setSelectedAnswers(new Array(randomQuestions.length).fill(-1));
      }
      setLoading(false);
    }
  }, [topic]);

  // Timer effect
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && testStarted) {
      completeTest();
    }
  }, [timeLeft, testStarted, testCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getInitialCodeForTopic = (topic: string): string => {
    return `# Practice ${topic}
# Write your code here
print("Hello, World!")`;  };

  const startTest = () => {
    setTestStarted(true);
  };

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const completeTest = () => {
    setTestCompleted(true);
    
    let correctAnswers = 0;
    const questionResults = testQuestions.map((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      
      return {
        question: question.question,
        userAnswer: selectedAnswers[index],
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      };
    });

    const result: TestResult = {
      score: (correctAnswers / testQuestions.length) * 100,
      correctAnswers,
      totalQuestions: testQuestions.length,
      timeTaken: 1800 - timeLeft,
      questionResults
    };

    setTestResult(result);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">{t('interpreter.loading')}</div>
        </div>
      </Layout>
    );
  }

  if (!testQuestions.length) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">{t('topicNotFoundDesc')}</div>
        </div>
      </Layout>
    );
  }

  if (testCompleted && testResult) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('results.title')}</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-4">
                  {testResult.score.toFixed(0)}%
                </div>
                <p className="text-xl text-gray-600">
                  {t('results.correct')}: {testResult.correctAnswers} / {testResult.totalQuestions}
                </p>
                <p className="text-gray-500 mt-2">
                  Time taken: {formatTime(testResult.timeTaken)}
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">{t('results.review')}</h2>
                {testResult.questionResults.map((result, index) => {
                  const tq = getQ(testQuestions[index]);
                  return (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-3">
                      {t('question')} {index + 1}: {tq.question}
                    </h3>
                    <div className="space-y-2">
                      <p className={`font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {t('results.yourAnswer')}: {tq.options[result.userAnswer] || '-'}
                      </p>
                      {!result.isCorrect && (
                        <p className="text-green-600">
                          {t('results.correctAnswer')}: {tq.options[result.correctAnswer]}
                        </p>
                      )}
                      <div className="mt-3 p-4 bg-blue-50 rounded">
                        <p className="text-sm font-medium text-blue-900">{t('results.explanation')}:</p>
                        <p className="text-sm text-blue-800 mt-1">{tq.explanation}</p>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => router.push('/test')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('results.retake')}
                </button>
                <button
                  onClick={() => router.push('/theory')}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t('results.backToTheory')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!testStarted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">
              {typeof topic === 'string' ? topic.replace(/-/g, ' ').replace(/\w/g, c => c.toUpperCase()) : 'Test'} Test
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>
              <p className="text-lg text-gray-600 mb-8">{testQuestions.length} {t('questionsCount')}</p>
              <button
                onClick={startTest}
                className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('startQuiz')}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {typeof topic === 'string' ? topic.replace(/-/g, ' ').replace(/\w/g, c => c.toUpperCase()) : 'Test'} Test
              </h1>
              <div className="text-xl font-semibold text-blue-600">
                Time Left: {formatTime(timeLeft)}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{t('question')} {currentQuestion + 1} {t('of')} {testQuestions.length}</span>
                <span>{selectedAnswers.filter(a => a !== -1).length} {t('answered')}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-xl font-semibold mb-6">
              {getQ(testQuestions[currentQuestion]).question}
            </h2>
            <div className="space-y-3">
              {getQ(testQuestions[currentQuestion]).options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={selectedAnswers[currentQuestion] === index}
                    onChange={() => selectAnswer(currentQuestion, index)}
                    className="mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {t('previous')}
            </button>

            <div className="flex space-x-2">
              {testQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    currentQuestion === index
                      ? 'bg-blue-600 text-white'
                      : selectedAnswers[index] !== -1
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion < testQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('next')}
              </button>
            ) : (
              <button
                onClick={completeTest}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('submitTest')}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
