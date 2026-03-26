import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const TestingPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'unit-testing', title: 'Unit Testing', icon: '🧪' },
    { id: 'test-frameworks', title: 'Test Frameworks', icon: '🔧' },
    { id: 'debugging', title: 'Debugging', icon: '🐛' },
    { id: 'tdd-bdd', title: 'TDD & BDD', icon: '🔄' },
    { id: 'advanced-testing', title: 'Advanced Testing', icon: '⚡' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    unitTesting: `# Unit testing with Python's built-in unittest module

import unittest
from unittest.mock import Mock, patch, MagicMock

# Example class to test
class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
    
    def power(self, base, exponent):
        return base ** exponent

# Basic unit test class
class TestCalculator(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.calc = Calculator()
    
    def tearDown(self):
        """Clean up after each test method."""
        # Usually used for cleanup like closing files, database connections
        pass
    
    def test_add(self):
        """Test addition functionality."""
        result = self.calc.add(2, 3)
        self.assertEqual(result, 5)
        
        # Test with negative numbers
        result = self.calc.add(-1, 1)
        self.assertEqual(result, 0)
        
        # Test with floats
        result = self.calc.add(2.5, 3.7)
        self.assertAlmostEqual(result, 6.2, places=1)
    
    def test_subtract(self):
        """Test subtraction functionality."""
        self.assertEqual(self.calc.subtract(5, 3), 2)
        self.assertEqual(self.calc.subtract(0, 5), -5)
    
    def test_multiply(self):
        """Test multiplication functionality."""
        self.assertEqual(self.calc.multiply(3, 4), 12)
        self.assertEqual(self.calc.multiply(-2, 3), -6)
        self.assertEqual(self.calc.multiply(0, 100), 0)
    
    def test_divide(self):
        """Test division functionality."""
        self.assertEqual(self.calc.divide(10, 2), 5)
        self.assertAlmostEqual(self.calc.divide(1, 3), 0.333, places=3)
    
    def test_divide_by_zero(self):
        """Test division by zero raises appropriate exception."""
        with self.assertRaises(ValueError):
            self.calc.divide(10, 0)
        
        # Test the exception message
        with self.assertRaisesRegex(ValueError, "Cannot divide by zero"):
            self.calc.divide(5, 0)
    
    def test_power(self):
        """Test power functionality."""
        self.assertEqual(self.calc.power(2, 3), 8)
        self.assertEqual(self.calc.power(5, 0), 1)
        self.assertEqual(self.calc.power(2, -1), 0.5)

# Testing with different assertion methods
class TestAssertions(unittest.TestCase):
    def test_equality_assertions(self):
        """Test various equality assertions."""
        self.assertEqual(1 + 1, 2)           # Equal
        self.assertNotEqual(1 + 1, 3)        # Not equal
        self.assertAlmostEqual(0.1 + 0.2, 0.3, places=7)  # Float comparison
    
    def test_boolean_assertions(self):
        """Test boolean assertions."""
        self.assertTrue(True)                 # Is True
        self.assertFalse(False)               # Is False
        self.assertIsNone(None)               # Is None
        self.assertIsNotNone("something")     # Is not None
    
    def test_membership_assertions(self):
        """Test membership assertions."""
        self.assertIn('a', 'abc')             # In container
        self.assertNotIn('x', 'abc')          # Not in container
    
    def test_type_assertions(self):
        """Test type assertions."""
        self.assertIsInstance([], list)       # Is instance of type
        self.assertNotIsInstance([], str)     # Is not instance of type
    
    def test_comparison_assertions(self):
        """Test comparison assertions."""
        self.assertGreater(5, 3)              # Greater than
        self.assertLess(2, 5)                 # Less than
        self.assertGreaterEqual(5, 5)         # Greater or equal
        self.assertLessEqual(3, 5)            # Less or equal

# Testing with mock objects
class DatabaseManager:
    def __init__(self, connection):
        self.connection = connection
    
    def get_user(self, user_id):
        result = self.connection.execute(f"SELECT * FROM users WHERE id = {user_id}")
        return result.fetchone()
    
    def save_user(self, user_data):
        query = "INSERT INTO users (name, email) VALUES (?, ?)"
        self.connection.execute(query, (user_data['name'], user_data['email']))
        self.connection.commit()
        return True

class TestDatabaseManager(unittest.TestCase):
    def setUp(self):
        # Create a mock connection
        self.mock_connection = Mock()
        self.db_manager = DatabaseManager(self.mock_connection)
    
    def test_get_user(self):
        """Test getting a user from database."""
        # Setup mock return value
        mock_result = Mock()
        mock_result.fetchone.return_value = {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'}
        self.mock_connection.execute.return_value = mock_result
        
        # Call the method
        user = self.db_manager.get_user(1)
        
        # Assert the result
        self.assertEqual(user['name'], 'Alice')
        
        # Assert the mock was called correctly
        self.mock_connection.execute.assert_called_once_with("SELECT * FROM users WHERE id = 1")
        mock_result.fetchone.assert_called_once()
    
    def test_save_user(self):
        """Test saving a user to database."""
        user_data = {'name': 'Bob', 'email': 'bob@example.com'}
        
        # Call the method
        result = self.db_manager.save_user(user_data)
        
        # Assert the result
        self.assertTrue(result)
        
        # Assert the mock was called correctly
        expected_query = "INSERT INTO users (name, email) VALUES (?, ?)"
        self.mock_connection.execute.assert_called_once_with(
            expected_query, ('Bob', 'bob@example.com')
        )
        self.mock_connection.commit.assert_called_once()

# Running tests
if __name__ == '__main__':
    # Run all tests
    unittest.main()
    
    # Or run specific test methods
    # unittest.main(argv=[''], test_loader=unittest.TestLoader().loadTestsFromTestCase(TestCalculator))
    
    # Or run tests from command line:
    # python -m unittest test_module.py
    # python -m unittest test_module.TestClass.test_method
    # python -m unittest discover -s tests -p "*_test.py"`,

    testFrameworks: `# Popular Python testing frameworks

# 1. pytest - Most popular testing framework
import pytest
from unittest.mock import patch, Mock

class Calculator:
    def add(self, a, b):
        return a + b
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

# pytest test functions (no class needed)
def test_calculator_add():
    """Test calculator addition with pytest."""
    calc = Calculator()
    assert calc.add(2, 3) == 5
    assert calc.add(-1, 1) == 0

def test_calculator_divide():
    """Test calculator division with pytest."""
    calc = Calculator()
    assert calc.divide(10, 2) == 5

def test_calculator_divide_by_zero():
    """Test division by zero with pytest."""
    calc = Calculator()
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        calc.divide(10, 0)

# pytest fixtures for setup and teardown
@pytest.fixture
def calculator():
    """Fixture that provides a Calculator instance."""
    return Calculator()

@pytest.fixture
def sample_data():
    """Fixture that provides sample test data."""
    return {
        'numbers': [1, 2, 3, 4, 5],
        'operations': ['add', 'subtract', 'multiply']
    }

def test_with_fixture(calculator):
    """Test using a fixture."""
    result = calculator.add(5, 3)
    assert result == 8

# Parametrized tests
@pytest.mark.parametrize("a, b, expected", [
    (2, 3, 5),
    (0, 5, 5),
    (-1, 1, 0),
    (10, -5, 5),
])
def test_add_parametrized(calculator, a, b, expected):
    """Test addition with multiple parameter sets."""
    assert calculator.add(a, b) == expected

@pytest.mark.parametrize("a, b, expected", [
    (10, 2, 5),
    (15, 3, 5),
    (100, 4, 25),
])
def test_divide_parametrized(calculator, a, b, expected):
    """Test division with multiple parameter sets."""
    assert calculator.divide(a, b) == expected

# pytest markers for test categorization
@pytest.mark.slow
def test_slow_operation():
    """Test marked as slow."""
    import time
    time.sleep(1)  # Simulate slow operation
    assert True

@pytest.mark.integration
def test_database_integration():
    """Test marked as integration test."""
    # This would test actual database integration
    assert True

@pytest.mark.skip(reason="Feature not implemented yet")
def test_future_feature():
    """Test that's skipped."""
    assert False  # This won't run

@pytest.mark.skipif(sys.version_info < (3, 8), reason="Requires Python 3.8+")
def test_python38_feature():
    """Test that requires Python 3.8+."""
    assert True

# pytest fixtures with scope
@pytest.fixture(scope="module")
def database_connection():
    """Module-scoped fixture - created once per test module."""
    print("Creating database connection")
    connection = "database_connection"
    yield connection
    print("Closing database connection")

@pytest.fixture(scope="session")
def test_config():
    """Session-scoped fixture - created once per test session."""
    return {"test_mode": True, "debug": False}

# Mocking with pytest
def test_with_mock():
    """Test using unittest.mock with pytest."""
    with patch('builtins.open', mock_open(read_data='test data')) as mock_file:
        with open('test.txt', 'r') as f:
            content = f.read()
        assert content == 'test data'
        mock_file.assert_called_once_with('test.txt', 'r')

# 2. doctest - Testing within docstrings
def add_numbers(a, b):
    """
    Add two numbers together.
    
    >>> add_numbers(2, 3)
    5
    >>> add_numbers(-1, 1)
    0
    >>> add_numbers(0, 0)
    0
    """
    return a + b

def divide_numbers(a, b):
    """
    Divide two numbers.
    
    >>> divide_numbers(10, 2)
    5.0
    >>> divide_numbers(1, 3)  # doctest: +ELLIPSIS
    0.333...
    >>> divide_numbers(10, 0)
    Traceback (most recent call last):
        ...
    ValueError: Cannot divide by zero
    """
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Run doctests
if __name__ == "__main__":
    import doctest
    doctest.testmod()

# 3. Running tests from command line

# pytest commands:
# pytest                          # Run all tests
# pytest test_file.py             # Run specific file
# pytest test_file.py::test_func  # Run specific test
# pytest -v                       # Verbose output
# pytest -s                       # Don't capture output
# pytest -x                       # Stop on first failure
# pytest --tb=short               # Short traceback format
# pytest -k "test_add"            # Run tests matching pattern
# pytest -m "slow"                # Run tests with specific marker
# pytest --cov=mymodule           # Run with coverage report

# unittest commands:
# python -m unittest discover     # Discover and run all tests
# python -m unittest test_module  # Run specific module
# python -m unittest test_module.TestClass.test_method  # Run specific test

# 4. Test configuration files

# pytest.ini
"""
[tool:pytest]
testpaths = tests
python_files = test_*.py *_test.py
python_classes = Test*
python_functions = test_*
markers =
    slow: marks tests as slow
    integration: marks tests as integration tests
    unit: marks tests as unit tests
addopts = -v --tb=short --strict-markers
"""

# pyproject.toml
"""
[tool.pytest.ini_options]
minversion = "6.0"
addopts = "-ra -q --strict-markers"
testpaths = ["tests", "integration"]
markers = [
    "slow: marks tests as slow (deselect with '-m \"not slow\"')",
    "integration: marks tests as integration tests",
]
"""

# conftest.py - Shared fixtures and configuration
"""
# tests/conftest.py
import pytest

@pytest.fixture(scope="session")
def test_database():
    # Setup test database
    db = create_test_database()
    yield db
    # Cleanup
    db.close()

@pytest.fixture
def client():
    # Setup test client
    app = create_app(testing=True)
    with app.test_client() as client:
        yield client
"""

# 5. Test organization best practices

# Directory structure:
"""
project/
├── src/
│   └── mymodule/
│       ├── __init__.py
│       ├── calculator.py
│       └── database.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── unit/
│   │   ├── test_calculator.py
│   │   └── test_database.py
│   ├── integration/
│   │   ├── test_api.py
│   │   └── test_database_integration.py
│   └── fixtures/
│       ├── sample_data.json
│       └── test_database.db
└── pytest.ini
"""`,

    debugging: `# Debugging techniques and tools in Python

import pdb
import logging
import traceback
import sys
from datetime import datetime

# 1. Print debugging (basic but effective)
def debug_with_prints():
    """Example of print debugging."""
    data = [1, 2, 3, 4, 5]
    
    print(f"DEBUG: Starting with data: {data}")
    
    result = []
    for i, item in enumerate(data):
        print(f"DEBUG: Processing item {i}: {item}")
        
        if item % 2 == 0:
            processed = item * 2
            print(f"DEBUG: Even number, doubled to: {processed}")
        else:
            processed = item + 1
            print(f"DEBUG: Odd number, incremented to: {processed}")
        
        result.append(processed)
        print(f"DEBUG: Current result: {result}")
    
    print(f"DEBUG: Final result: {result}")
    return result

# 2. Logging for debugging
def setup_logging():
    """Setup logging configuration for debugging."""
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('debug.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )

def debug_with_logging():
    """Example of logging for debugging."""
    logger = logging.getLogger(__name__)
    
    logger.debug("Starting function")
    
    try:
        data = {"users": [1, 2, 3], "active": True}
        logger.info(f"Processing data: {data}")
        
        for user_id in data["users"]:
            logger.debug(f"Processing user {user_id}")
            # Simulate some processing
            if user_id == 2:
                logger.warning(f"User {user_id} has issues")
            
        logger.info("Processing completed successfully")
        
    except Exception as e:
        logger.error(f"Error occurred: {e}", exc_info=True)
        raise

# 3. Python debugger (pdb)
def debug_with_pdb():
    """Example using Python debugger."""
    numbers = [1, 2, 3, 4, 5]
    
    for i, num in enumerate(numbers):
        # Set breakpoint
        pdb.set_trace()  # Execution will pause here
        
        result = num * 2
        print(f"Number {num} doubled is {result}")

# pdb commands:
# n (next) - Execute next line
# s (step) - Step into function calls
# c (continue) - Continue execution
# l (list) - Show current code
# p <variable> - Print variable value
# pp <variable> - Pretty print variable
# h (help) - Show help
# q (quit) - Quit debugger

# 4. Exception handling and tracebacks
def handle_exceptions_with_debugging():
    """Comprehensive exception handling with debugging info."""
    
    def risky_function(x, y):
        """Function that might raise exceptions."""
        if x == 0:
            raise ValueError("x cannot be zero")
        if y < 0:
            raise ValueError("y must be positive")
        return x / y
    
    test_cases = [
        (10, 2),    # Normal case
        (0, 5),     # x is zero
        (10, -1),   # y is negative
        (10, 0),    # Division by zero
    ]
    
    for i, (x, y) in enumerate(test_cases):
        try:
            print(f"\\nTest case {i + 1}: x={x}, y={y}")
            result = risky_function(x, y)
            print(f"Result: {result}")
            
        except ValueError as e:
            print(f"ValueError caught: {e}")
            print("Full traceback:")
            traceback.print_exc()
            
        except ZeroDivisionError as e:
            print(f"ZeroDivisionError caught: {e}")
            # Get traceback as string
            tb_str = traceback.format_exc()
            print(f"Traceback string:\\n{tb_str}")
            
        except Exception as e:
            print(f"Unexpected error: {type(e).__name__}: {e}")
            # Get detailed exception info
            exc_type, exc_value, exc_traceback = sys.exc_info()
            print(f"Exception type: {exc_type}")
            print(f"Exception value: {exc_value}")
            print("Traceback details:")
            traceback.print_tb(exc_traceback)

# 5. Custom debugging decorator
def debug_function_calls(func):
    """Decorator to debug function calls."""
    def wrapper(*args, **kwargs):
        func_name = func.__name__
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        print(f"[{timestamp}] CALL: {func_name}")
        print(f"  Arguments: {args}")
        print(f"  Keyword arguments: {kwargs}")
        
        try:
            result = func(*args, **kwargs)
            print(f"  Return value: {result}")
            return result
            
        except Exception as e:
            print(f"  Exception raised: {type(e).__name__}: {e}")
            print(f"  Traceback:")
            traceback.print_exc()
            raise
            
        finally:
            end_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"[{end_time}] END: {func_name}")
    
    return wrapper

@debug_function_calls
def example_function(a, b, operation="add"):
    """Example function with debugging decorator."""
    if operation == "add":
        return a + b
    elif operation == "divide":
        return a / b
    else:
        raise ValueError(f"Unknown operation: {operation}")

# 6. Debugging tools and IDEs

# Visual Studio Code debugging:
"""
1. Set breakpoints by clicking in the gutter
2. Press F5 to start debugging
3. Use Debug Console to evaluate expressions
4. Step through code with F10 (over) and F11 (into)
"""

# PyCharm debugging:
"""
1. Set breakpoints by clicking in the gutter
2. Right-click and "Debug" or use Shift+F9
3. Use Variables pane to inspect values
4. Use Evaluate Expression (Alt+F8)
"""

# 7. Memory debugging
def debug_memory_usage():
    """Example of memory usage debugging."""
    import tracemalloc
    import gc
    
    # Start tracing memory allocations
    tracemalloc.start()
    
    # Create some objects
    large_list = [i for i in range(100000)]
    large_dict = {i: f"value_{i}" for i in range(50000)}
    
    # Get current memory usage
    current, peak = tracemalloc.get_traced_memory()
    print(f"Current memory usage: {current / 1024 / 1024:.2f} MB")
    print(f"Peak memory usage: {peak / 1024 / 1024:.2f} MB")
    
    # Get top memory allocations
    snapshot = tracemalloc.take_snapshot()
    top_stats = snapshot.statistics('lineno')
    
    print("Top 3 memory allocations:")
    for stat in top_stats[:3]:
        print(stat)
    
    # Clean up
    del large_list, large_dict
    gc.collect()
    
    tracemalloc.stop()

# 8. Performance debugging
def debug_performance():
    """Example of performance debugging."""
    import time
    import cProfile
    import pstats
    
    def slow_function():
        """Intentionally slow function."""
        result = 0
        for i in range(1000000):
            result += i ** 0.5
        return result
    
    def fast_function():
        """Faster version."""
        import math
        return sum(math.sqrt(i) for i in range(1000000))
    
    # Time functions manually
    start_time = time.time()
    result1 = slow_function()
    end_time = time.time()
    print(f"Slow function took: {end_time - start_time:.4f} seconds")
    
    start_time = time.time()
    result2 = fast_function()
    end_time = time.time()
    print(f"Fast function took: {end_time - start_time:.4f} seconds")
    
    # Profile with cProfile
    profiler = cProfile.Profile()
    profiler.enable()
    slow_function()
    profiler.disable()
    
    # Print profile statistics
    stats = pstats.Stats(profiler)
    stats.sort_stats('cumulative')
    stats.print_stats(10)  # Top 10 functions

# 9. Interactive debugging with breakpoint()
def debug_with_breakpoint():
    """Using the built-in breakpoint() function (Python 3.7+)."""
    data = [1, 2, 3, 4, 5]
    
    for i, item in enumerate(data):
        if item == 3:
            breakpoint()  # This will start the debugger
        
        processed = item * 2
        print(f"Processed {item} -> {processed}")

# 10. Custom debug context manager
class DebugContext:
    """Context manager for debugging code blocks."""
    
    def __init__(self, name, verbose=True):
        self.name = name
        self.verbose = verbose
        self.start_time = None
    
    def __enter__(self):
        self.start_time = time.time()
        if self.verbose:
            print(f"DEBUG: Entering {self.name}")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        end_time = time.time()
        duration = end_time - self.start_time
        
        if exc_type is not None:
            print(f"DEBUG: {self.name} failed with {exc_type.__name__}: {exc_val}")
            print("DEBUG: Full traceback:")
            traceback.print_exc()
        else:
            if self.verbose:
                print(f"DEBUG: {self.name} completed in {duration:.4f} seconds")
        
        # Don't suppress exceptions
        return False

# Usage of debug context manager
def example_with_debug_context():
    """Example using the debug context manager."""
    
    with DebugContext("Data processing"):
        data = [1, 2, 3, 4, 5]
        result = [x * 2 for x in data]
        print(f"Result: {result}")
    
    with DebugContext("Risky operation"):
        # This will trigger the exception handling
        risky_value = 10 / 0  # This will raise ZeroDivisionError`,

    tddBdd: `# Test-Driven Development (TDD) and Behavior-Driven Development (BDD)

# TDD Cycle: Red -> Green -> Refactor

# Example 1: TDD for a StringValidator class

# Step 1: Write failing test (Red)
import unittest

class TestStringValidator(unittest.TestCase):
    """Tests for StringValidator - written before implementation."""
    
    def test_validate_email_valid(self):
        """Test email validation with valid emails."""
        validator = StringValidator()
        
        valid_emails = [
            "user@example.com",
            "test.email@domain.co.uk",
            "user+tag@example.org"
        ]
        
        for email in valid_emails:
            with self.subTest(email=email):
                self.assertTrue(validator.validate_email(email))
    
    def test_validate_email_invalid(self):
        """Test email validation with invalid emails."""
        validator = StringValidator()
        
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user..user@example.com"
        ]
        
        for email in invalid_emails:
            with self.subTest(email=email):
                self.assertFalse(validator.validate_email(email))
    
    def test_validate_phone_number(self):
        """Test phone number validation."""
        validator = StringValidator()
        
        # Valid phone numbers
        self.assertTrue(validator.validate_phone("123-456-7890"))
        self.assertTrue(validator.validate_phone("(123) 456-7890"))
        self.assertTrue(validator.validate_phone("1234567890"))
        
        # Invalid phone numbers
        self.assertFalse(validator.validate_phone("123"))
        self.assertFalse(validator.validate_phone("abc-def-ghij"))

# Step 2: Write minimal implementation to pass tests (Green)
import re

class StringValidator:
    """String validation utilities."""
    
    def validate_email(self, email):
        """Validate email address format."""
        # Simple email regex pattern
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    def validate_phone(self, phone):
        """Validate phone number format."""
        # Remove non-digit characters
        digits_only = re.sub(r'\\D', '', phone)
        # Check if it's exactly 10 digits
        return len(digits_only) == 10

# Step 3: Refactor (improve code while keeping tests green)
class ImprovedStringValidator:
    """Improved string validation with better patterns."""
    
    EMAIL_PATTERN = re.compile(
        r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    )
    PHONE_PATTERN = re.compile(r'^[\\d\\s\\(\\)\\-\\.\\+]+$')
    
    def validate_email(self, email):
        """Validate email address format."""
        if not email or not isinstance(email, str):
            return False
        return bool(self.EMAIL_PATTERN.match(email.strip()))
    
    def validate_phone(self, phone):
        """Validate phone number format."""
        if not phone or not isinstance(phone, str):
            return False
        
        # Check if phone contains valid characters
        if not self.PHONE_PATTERN.match(phone):
            return False
        
        # Extract digits
        digits = re.sub(r'\\D', '', phone)
        return len(digits) == 10

# Example 2: TDD for a BankAccount class

# Tests first (Red phase)
class TestBankAccount(unittest.TestCase):
    """Test cases for BankAccount class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.account = BankAccount("12345", initial_balance=100.0)
    
    def test_initial_balance(self):
        """Test account is created with correct initial balance."""
        self.assertEqual(self.account.balance, 100.0)
        self.assertEqual(self.account.account_number, "12345")
    
    def test_deposit_positive_amount(self):
        """Test depositing positive amount."""
        self.account.deposit(50.0)
        self.assertEqual(self.account.balance, 150.0)
    
    def test_deposit_negative_amount_raises_error(self):
        """Test depositing negative amount raises ValueError."""
        with self.assertRaises(ValueError):
            self.account.deposit(-10.0)
    
    def test_withdraw_valid_amount(self):
        """Test withdrawing valid amount."""
        self.account.withdraw(30.0)
        self.assertEqual(self.account.balance, 70.0)
    
    def test_withdraw_insufficient_funds(self):
        """Test withdrawing more than balance raises InsufficientFundsError."""
        with self.assertRaises(InsufficientFundsError):
            self.account.withdraw(150.0)
    
    def test_transfer_to_another_account(self):
        """Test transferring money to another account."""
        target_account = BankAccount("67890", initial_balance=50.0)
        
        self.account.transfer(30.0, target_account)
        
        self.assertEqual(self.account.balance, 70.0)
        self.assertEqual(target_account.balance, 80.0)

# Implementation (Green phase)
class InsufficientFundsError(Exception):
    """Exception raised when withdrawal exceeds balance."""
    pass

class BankAccount:
    """Bank account with basic operations."""
    
    def __init__(self, account_number, initial_balance=0.0):
        """Initialize bank account."""
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")
        
        self.account_number = account_number
        self.balance = initial_balance
    
    def deposit(self, amount):
        """Deposit money to account."""
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        
        self.balance += amount
    
    def withdraw(self, amount):
        """Withdraw money from account."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        
        if amount > self.balance:
            raise InsufficientFundsError("Insufficient funds for withdrawal")
        
        self.balance -= amount
    
    def transfer(self, amount, target_account):
        """Transfer money to another account."""
        self.withdraw(amount)  # This handles validation
        target_account.deposit(amount)

# BDD with pytest-bdd (requires: pip install pytest-bdd)

# Feature file: bank_account.feature
"""
Feature: Bank Account Management
  As a bank customer
  I want to manage my bank account
  So that I can deposit, withdraw, and transfer money

  Scenario: Deposit money to account
    Given I have a bank account with balance 100
    When I deposit 50
    Then my account balance should be 150

  Scenario: Withdraw money from account
    Given I have a bank account with balance 100
    When I withdraw 30
    Then my account balance should be 70

  Scenario: Transfer money between accounts
    Given I have a bank account with balance 100
    And I have a target account with balance 50
    When I transfer 30 to the target account
    Then my account balance should be 70
    And the target account balance should be 80
"""

# BDD step definitions
import pytest
from pytest_bdd import scenarios, given, when, then

# Load scenarios from feature file
scenarios('bank_account.feature')

# Step definitions
@pytest.fixture
def bank_account():
    """Fixture for bank account."""
    return {}

@given('I have a bank account with balance <balance>')
def account_with_balance(bank_account, balance):
    """Create account with specified balance."""
    bank_account['main'] = BankAccount("12345", initial_balance=float(balance))

@given('I have a target account with balance <balance>')
def target_account_with_balance(bank_account, balance):
    """Create target account with specified balance."""
    bank_account['target'] = BankAccount("67890", initial_balance=float(balance))

@when('I deposit <amount>')
def deposit_amount(bank_account, amount):
    """Deposit amount to account."""
    bank_account['main'].deposit(float(amount))

@when('I withdraw <amount>')
def withdraw_amount(bank_account, amount):
    """Withdraw amount from account."""
    bank_account['main'].withdraw(float(amount))

@when('I transfer <amount> to the target account')
def transfer_amount(bank_account, amount):
    """Transfer amount to target account."""
    bank_account['main'].transfer(float(amount), bank_account['target'])

@then('my account balance should be <balance>')
def check_main_balance(bank_account, balance):
    """Check main account balance."""
    assert bank_account['main'].balance == float(balance)

@then('the target account balance should be <balance>')
def check_target_balance(bank_account, balance):
    """Check target account balance."""
    assert bank_account['target'].balance == float(balance)

# TDD Best Practices
class TDDGuidelines:
    """
    TDD Best Practices:
    
    1. Write tests first (Red phase)
       - Write a failing test for new functionality
       - Run test to ensure it fails for the right reason
    
    2. Write minimal code to pass (Green phase)
       - Write only enough code to make the test pass
       - Don't add extra functionality yet
    
    3. Refactor (Refactor phase)
       - Improve code structure and design
       - Keep all tests passing
       - Remove duplication
    
    4. Repeat the cycle
       - Add one test at a time
       - Keep cycles short (minutes, not hours)
    
    5. Test should be:
       - Fast: Run quickly
       - Independent: Don't depend on other tests
       - Repeatable: Same result every time
       - Self-validating: Clear pass/fail
       - Timely: Written just before production code
    """
    
    @staticmethod
    def red_phase_checklist():
        """Checklist for Red phase."""
        return [
            "✓ Test is written",
            "✓ Test fails for expected reason",
            "✓ Test is focused on one behavior",
            "✓ Test name clearly describes what it tests"
        ]
    
    @staticmethod
    def green_phase_checklist():
        """Checklist for Green phase."""
        return [
            "✓ Test passes",
            "✓ Minimal code written",
            "✓ No unnecessary features added",
            "✓ All existing tests still pass"
        ]
    
    @staticmethod
    def refactor_phase_checklist():
        """Checklist for Refactor phase."""
        return [
            "✓ Code is clean and readable",
            "✓ Duplication removed",
            "✓ Design patterns applied where appropriate",
            "✓ All tests still pass",
            "✓ Performance is acceptable"
        ]

# Example of TDD workflow
def tdd_workflow_example():
    """Example showing complete TDD workflow."""
    
    # Red: Write failing test
    def test_password_strength():
        validator = PasswordValidator()
        
        # Should be strong
        assert validator.is_strong("MyP@ssw0rd123")
        
        # Should be weak
        assert not validator.is_strong("password")
        assert not validator.is_strong("12345678")
    
    # Green: Minimal implementation
    class PasswordValidator:
        def is_strong(self, password):
            if len(password) < 8:
                return False
            
            has_upper = any(c.isupper() for c in password)
            has_lower = any(c.islower() for c in password)
            has_digit = any(c.isdigit() for c in password)
            has_special = any(c in "!@#$%^&*" for c in password)
            
            return has_upper and has_lower and has_digit and has_special
    
    # Refactor: Improve implementation
    class ImprovedPasswordValidator:
        MIN_LENGTH = 8
        SPECIAL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?"
        
        def is_strong(self, password):
            """Check if password meets strength requirements."""
            if not password or len(password) < self.MIN_LENGTH:
                return False
            
            checks = [
                any(c.isupper() for c in password),  # Has uppercase
                any(c.islower() for c in password),  # Has lowercase  
                any(c.isdigit() for c in password),  # Has digit
                any(c in self.SPECIAL_CHARS for c in password)  # Has special char
            ]
            
            return all(checks)
        
        def get_strength_score(self, password):
            """Get password strength score (0-4)."""
            if not password:
                return 0
            
            score = 0
            if len(password) >= self.MIN_LENGTH:
                score += 1
            if any(c.isupper() for c in password):
                score += 1
            if any(c.islower() for c in password):
                score += 1
            if any(c.isdigit() for c in password):
                score += 1
            if any(c in self.SPECIAL_CHARS for c in password):
                score += 1
            
            return min(score, 4)  # Cap at 4`
  };

  return (
    <Layout title="Testing & Debugging - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Testing & Debugging
                </h1>
                <p className="text-teal-100 text-lg">
                  Intermediate Level • 70 minutes • Master unit testing, debugging techniques, and TDD practices
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">🧪</div>
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
                          ? 'bg-teal-100 text-teal-700'
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing & Debugging</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          Testing and debugging are essential skills for writing reliable, maintainable code. Learn systematic approaches to finding and preventing bugs, writing effective tests, and using debugging tools efficiently.
                        </p>

                        <div className="bg-teal-50 border-l-4 border-teal-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-teal-900">
                                <strong>What you'll learn:</strong> Unit testing with unittest and pytest, debugging techniques and tools, Test-Driven Development (TDD), mocking and fixtures, and best practices for code quality.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing & Debugging Components</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">🧪 Unit Testing</h4>
                            <p className="text-sm text-blue-700">Automated tests for individual functions and classes</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">🔧 Test Frameworks</h4>
                            <p className="text-sm text-green-700">pytest, unittest, and doctest for different testing needs</p>
                          </div>
                          
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">🐛 Debugging Tools</h4>
                            <p className="text-sm text-red-700">pdb, logging, profiling, and IDE debugging features</p>
                          </div>
                          
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">🔄 TDD/BDD</h4>
                            <p className="text-sm text-purple-700">Test-driven and behavior-driven development methodologies</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Testing & Debugging Matter</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li><strong>Quality Assurance:</strong> Catch bugs before they reach production</li>
                          <li><strong>Refactoring Safety:</strong> Change code confidently with test coverage</li>
                          <li><strong>Documentation:</strong> Tests serve as living documentation</li>
                          <li><strong>Design Feedback:</strong> Testing reveals design issues early</li>
                          <li><strong>Regression Prevention:</strong> Prevent old bugs from returning</li>
                          <li><strong>Faster Development:</strong> Find issues quickly with good debugging skills</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Unit Testing Section */}
                {activeSection === 'unit-testing' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Unit Testing</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Unit testing involves testing individual components of your code in isolation. Python's unittest module provides a comprehensive framework for writing and running tests.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.unitTesting}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Test Structure</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>setUp()</code> - Initialize test data</li>
                            <li>• <code>tearDown()</code> - Clean up after tests</li>
                            <li>• Test methods start with <code>test_</code></li>
                            <li>• Use descriptive test names</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Assertion Methods</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>assertEqual(a, b)</code> - Values equal</li>
                            <li>• <code>assertTrue(x)</code> - Value is True</li>
                            <li>• <code>assertRaises(exception)</code> - Exception raised</li>
                            <li>• <code>assertIn(item, container)</code> - Item in container</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">Testing Best Practices</h4>
                        <ul className="text-yellow-700 space-y-2">
                          <li>• Test one thing at a time (single responsibility)</li>
                          <li>• Use descriptive test names that explain what's being tested</li>
                          <li>• Follow the AAA pattern: Arrange, Act, Assert</li>
                          <li>• Use mocks to isolate units under test</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Test Frameworks Section */}
                {activeSection === 'test-frameworks' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Frameworks</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Python offers several testing frameworks, each with unique strengths. pytest is the most popular due to its simplicity and powerful features, while unittest is built into Python.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.testFrameworks}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">pytest Features</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Simple assert statements</li>
                            <li>• Powerful fixtures</li>
                            <li>• Parametrized tests</li>
                            <li>• Plugin ecosystem</li>
                            <li>• Better output</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-800 mb-2">unittest Features</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Built into Python</li>
                            <li>• Class-based tests</li>
                            <li>• Rich assertion methods</li>
                            <li>• Test discovery</li>
                            <li>• Mock integration</li>
                          </ul>
                        </div>
                        
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-800 mb-2">doctest Features</h4>
                          <ul className="text-sm text-teal-700 space-y-1">
                            <li>• Tests in docstrings</li>
                            <li>• Documentation + tests</li>
                            <li>• Simple examples</li>
                            <li>• Interactive testing</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Choosing a Framework</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Use pytest for:</h5>
                          <p className="text-sm text-gray-700">New projects, complex testing needs, team development</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Use unittest for:</h5>
                          <p className="text-sm text-gray-700">Legacy projects, when external dependencies are restricted</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Use doctest for:</h5>
                          <p className="text-sm text-gray-700">Simple examples, documentation that doubles as tests</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Debugging Section */}
                {activeSection === 'debugging' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Debugging Techniques</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Effective debugging is a crucial skill for any programmer. Python provides various tools and techniques for finding and fixing bugs, from simple print statements to sophisticated debuggers.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.debugging}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">Debugging Tools</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• <code>print()</code> statements</li>
                            <li>• <code>pdb</code> Python debugger</li>
                            <li>• <code>logging</code> module</li>
                            <li>• IDE debuggers</li>
                            <li>• <code>breakpoint()</code> function</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Debugging Strategies</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Reproduce the bug consistently</li>
                            <li>• Isolate the problem area</li>
                            <li>• Check assumptions</li>
                            <li>• Use binary search approach</li>
                            <li>• Read error messages carefully</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-cyan-50 border-l-4 border-cyan-400 p-6">
                        <h4 className="font-semibold text-cyan-800 mb-3">Common pdb Commands</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-cyan-700">
                          <ul className="text-sm space-y-1">
                            <li>• <code>n</code> (next) - Execute next line</li>
                            <li>• <code>s</code> (step) - Step into functions</li>
                            <li>• <code>c</code> (continue) - Continue execution</li>
                          </ul>
                          <ul className="text-sm space-y-1">
                            <li>• <code>l</code> (list) - Show current code</li>
                            <li>• <code>p variable</code> - Print variable</li>
                            <li>• <code>q</code> (quit) - Quit debugger</li>
                          </ul>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* TDD & BDD Section */}
                {activeSection === 'tdd-bdd' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Test-Driven Development (TDD) & BDD</h2>
                      
                      <p className="text-gray-700 mb-6">
                        TDD is a development methodology where you write tests before writing code. BDD extends TDD by focusing on behavior and using natural language to describe tests.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.tddBdd}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">TDD Benefits</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Better code design</li>
                            <li>• Higher test coverage</li>
                            <li>• Faster debugging</li>
                            <li>• Confidence in changes</li>
                            <li>• Living documentation</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">TDD Cycle</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• 🔴 <strong>Red:</strong> Write failing test</li>
                            <li>• 🟢 <strong>Green:</strong> Make test pass</li>
                            <li>• 🔵 <strong>Refactor:</strong> Improve code</li>
                            <li>• ↺ Repeat the cycle</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">BDD vs TDD</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">TDD Focus:</h5>
                          <p className="text-sm text-gray-700">Technical implementation, unit tests, developer-centric</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">BDD Focus:</h5>
                          <p className="text-sm text-gray-700">Business behavior, acceptance criteria, stakeholder-centric</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Advanced Testing Section */}
                {activeSection === 'advanced-testing' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Testing</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Advanced testing techniques include integration testing, performance testing, mocking external dependencies, and testing asynchronous code.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <h4 className="font-semibold text-purple-800 mb-3">Testing Types</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Unit tests - Individual components</li>
                            <li>• Integration tests - Component interaction</li>
                            <li>• System tests - End-to-end functionality</li>
                            <li>• Performance tests - Speed and memory</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">Advanced Techniques</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Mocking and patching</li>
                            <li>• Property-based testing</li>
                            <li>• Mutation testing</li>
                            <li>• Contract testing</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Test Coverage</h3>
                      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
                        <div className="font-mono text-sm">
                          <div># Install coverage tool</div>
                          <div>pip install coverage</div>
                          <div></div>
                          <div># Run tests with coverage</div>
                          <div>coverage run -m pytest</div>
                          <div>coverage report</div>
                          <div>coverage html  # Generate HTML report</div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
                        <h4 className="font-semibold text-amber-800 mb-3">Testing Pyramid</h4>
                        <div className="text-amber-700 space-y-2">
                          <p><strong>🔺 Top - E2E Tests:</strong> Few, expensive, high confidence</p>
                          <p><strong>🔶 Middle - Integration Tests:</strong> Some, moderate cost</p>
                          <p><strong>🔻 Base - Unit Tests:</strong> Many, fast, low cost</p>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Shopping Cart TDD</h3>
                          <p className="text-gray-700 mb-4">
                            Implement a shopping cart system using TDD methodology with item management, discounts, and tax calculations.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: add/remove items, calculate totals, apply discounts<br/>
                              # Use TDD: write tests first, then implement<br/>
                              # Include edge cases and error handling
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: API Client Testing</h3>
                          <p className="text-gray-700 mb-4">
                            Create comprehensive tests for an API client including mocking external services and testing error scenarios.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Mock HTTP requests, test timeouts, retry logic<br/>
                              # Use fixtures for test data and setup<br/>
                              # Test both success and failure scenarios
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: Performance Testing Suite</h3>
                          <p className="text-gray-700 mb-4">
                            Build a performance testing framework that measures execution time, memory usage, and identifies bottlenecks.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Create performance benchmarks and regression tests<br/>
                              # Use profiling tools to identify slow functions<br/>
                              # Generate performance reports and visualizations
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: Bug Hunting Challenge</h3>
                          <p className="text-gray-700 mb-4">
                            Debug a complex program with multiple interconnected bugs using systematic debugging techniques.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Use pdb, logging, and profiling tools<br/>
                              # Practice isolating bugs and verifying fixes<br/>
                              # Write regression tests to prevent bug reoccurrence
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-teal-100 mb-6">
                          Take our interactive quiz to see how well you've mastered testing and debugging!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/testing'}
                          className="bg-white text-teal-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default TestingPage; 