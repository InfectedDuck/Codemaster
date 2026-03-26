import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const DecoratorsPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'function-decorators', title: 'Function Decorators', icon: '🎭' },
    { id: 'decorator-patterns', title: 'Decorator Patterns', icon: '🔧' },
    { id: 'class-decorators', title: 'Class Decorators', icon: '🏗️' },
    { id: 'context-managers', title: 'Context Managers', icon: '🔒' },
    { id: 'advanced-patterns', title: 'Advanced Patterns', icon: '⚡' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    basicDecorators: `# What are decorators?
# Decorators are functions that modify or enhance other functions/classes
# They provide a clean way to add functionality without changing original code

# Basic decorator concept
def my_decorator(func):
    """A simple decorator that wraps a function."""
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

# Using the decorator
@my_decorator
def say_hello():
    print("Hello!")

# This is equivalent to:
# say_hello = my_decorator(say_hello)

# When you call say_hello(), you get:
say_hello()
# Output:
# Something is happening before the function is called.
# Hello!
# Something is happening after the function is called.

# Decorator with arguments
def my_decorator_with_args(func):
    """Decorator that handles function arguments."""
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args: {args}, kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"Function {func.__name__} returned: {result}")
        return result
    return wrapper

@my_decorator_with_args
def add_numbers(a, b):
    return a + b

result = add_numbers(5, 3)
# Output:
# Calling add_numbers with args: (5, 3), kwargs: {}
# Function add_numbers returned: 8

# Preserving function metadata
import functools

def better_decorator(func):
    """Decorator that preserves original function metadata."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@better_decorator
def greet(name):
    """Greet someone by name."""
    return f"Hello, {name}!"

print(greet.__name__)  # greet (not wrapper)
print(greet.__doc__)   # Greet someone by name.

# Multiple decorators
def bold(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return f"<b>{result}</b>"
    return wrapper

def italic(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return f"<i>{result}</i>"
    return wrapper

@bold
@italic
def format_text(text):
    return text

print(format_text("Hello World"))  # <b><i>Hello World</i></b>
# Decorators are applied bottom-up: italic first, then bold`,

    decoratorPatterns: `import time
import functools
from datetime import datetime

# 1. Timing Decorator
def timer(func):
    """Measure execution time of a function."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done!"

# 2. Logging Decorator
def log_calls(func):
    """Log function calls with arguments and results."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] Calling {func.__name__}")
        print(f"  Arguments: args={args}, kwargs={kwargs}")
        
        try:
            result = func(*args, **kwargs)
            print(f"  Result: {result}")
            return result
        except Exception as e:
            print(f"  Exception: {e}")
            raise
    return wrapper

@log_calls
def divide(a, b):
    return a / b

# 3. Retry Decorator
def retry(max_attempts=3, delay=1):
    """Retry a function on failure."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    print(f"Attempt {attempt + 1} failed: {e}")
                    if attempt < max_attempts - 1:
                        time.sleep(delay)
                    
            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def unreliable_function():
    import random
    if random.random() < 0.7:  # 70% chance of failure
        raise Exception("Random failure!")
    return "Success!"

# 4. Cache/Memoization Decorator
def memoize(func):
    """Cache function results to avoid redundant calculations."""
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Create a key from arguments
        key = str(args) + str(sorted(kwargs.items()))
        
        if key in cache:
            print(f"Cache hit for {func.__name__}{args}")
            return cache[key]
        
        print(f"Computing {func.__name__}{args}")
        result = func(*args, **kwargs)
        cache[key] = result
        return result
    
    # Add cache management methods
    wrapper.cache = cache
    wrapper.clear_cache = lambda: cache.clear()
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# 5. Validation Decorator
def validate_types(**expected_types):
    """Validate function argument types."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Get function signature
            import inspect
            sig = inspect.signature(func)
            bound_args = sig.bind(*args, **kwargs)
            bound_args.apply_defaults()
            
            # Validate types
            for param_name, expected_type in expected_types.items():
                if param_name in bound_args.arguments:
                    value = bound_args.arguments[param_name]
                    if not isinstance(value, expected_type):
                        raise TypeError(
                            f"Parameter '{param_name}' must be {expected_type.__name__}, "
                            f"got {type(value).__name__}"
                        )
            
            return func(*args, **kwargs)
        return wrapper
    return decorator

@validate_types(name=str, age=int, scores=list)
def process_student(name, age, scores):
    return f"Student {name}, age {age}, average score: {sum(scores)/len(scores)}"

# 6. Rate Limiting Decorator
def rate_limit(calls_per_second=1):
    """Limit the rate of function calls."""
    def decorator(func):
        last_called = [0.0]
        min_interval = 1.0 / calls_per_second
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = min_interval - elapsed
            
            if left_to_wait > 0:
                time.sleep(left_to_wait)
            
            result = func(*args, **kwargs)
            last_called[0] = time.time()
            return result
        return wrapper
    return decorator

@rate_limit(calls_per_second=2)  # Max 2 calls per second
def api_call(data):
    print(f"Making API call with {data}")
    return "Response"

# 7. Authorization Decorator
def requires_permission(permission):
    """Check if user has required permission."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # In real application, get current user from session/context
            current_user = kwargs.get('user')  # Simplified
            
            if not current_user:
                raise PermissionError("Authentication required")
            
            if not hasattr(current_user, 'permissions'):
                raise PermissionError("User has no permissions")
            
            if permission not in current_user.permissions:
                raise PermissionError(f"Permission '{permission}' required")
            
            return func(*args, **kwargs)
        return wrapper
    return decorator

class User:
    def __init__(self, name, permissions):
        self.name = name
        self.permissions = permissions

@requires_permission('admin')
def delete_user(user_id, user=None):
    return f"User {user_id} deleted"

# Usage
admin_user = User("Alice", ["admin", "read", "write"])
try:
    result = delete_user(123, user=admin_user)
    print(result)
except PermissionError as e:
    print(f"Access denied: {e}")`,

    classDecorators: `# Class decorators modify or enhance entire classes

# 1. Basic class decorator
def add_str_method(cls):
    """Add a __str__ method to a class."""
    def __str__(self):
        attrs = ', '.join(f"{k}={v}" for k, v in self.__dict__.items())
        return f"{cls.__name__}({attrs})"
    
    cls.__str__ = __str__
    return cls

@add_str_method
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)
print(person)  # Person(name=Alice, age=30)

# 2. Singleton decorator
def singleton(cls):
    """Ensure only one instance of a class exists."""
    instances = {}
    
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    
    return get_instance

@singleton
class Database:
    def __init__(self):
        print("Creating database connection")
        self.connection = "Connected"

# Multiple calls return same instance
db1 = Database()  # Creates instance
db2 = Database()  # Returns same instance
print(db1 is db2)  # True

# 3. Auto-property decorator
def auto_properties(cls):
    """Automatically create properties for private attributes."""
    for attr_name in dir(cls):
        if attr_name.startswith('_') and not attr_name.startswith('__'):
            prop_name = attr_name[1:]  # Remove leading underscore
            
            def make_property(attr):
                def getter(self):
                    return getattr(self, attr)
                
                def setter(self, value):
                    setattr(self, attr, value)
                
                return property(getter, setter)
            
            setattr(cls, prop_name, make_property(attr_name))
    
    return cls

@auto_properties
class Circle:
    def __init__(self, radius):
        self._radius = radius
        self._color = "red"

circle = Circle(5)
print(circle.radius)  # 5 (property access)
circle.color = "blue"  # Property setter
print(circle.color)   # blue

# 4. Validation decorator for classes
def validate_attributes(**validators):
    """Add validation to class attributes."""
    def decorator(cls):
        original_setattr = cls.__setattr__
        
        def __setattr__(self, name, value):
            if name in validators:
                validator = validators[name]
                if not validator(value):
                    raise ValueError(f"Invalid value for {name}: {value}")
            original_setattr(self, name, value)
        
        cls.__setattr__ = __setattr__
        return cls
    
    return decorator

@validate_attributes(
    age=lambda x: isinstance(x, int) and x >= 0,
    email=lambda x: isinstance(x, str) and '@' in x
)
class User:
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

# Valid user
user = User("Bob", 25, "bob@example.com")

# This would raise ValueError:
# user.age = -5

# 5. Method decorator for classes
def log_method_calls(cls):
    """Log all method calls in a class."""
    for attr_name in dir(cls):
        attr = getattr(cls, attr_name)
        
        if callable(attr) and not attr_name.startswith('__'):
            def make_logged_method(method, method_name):
                @functools.wraps(method)
                def logged_method(self, *args, **kwargs):
                    print(f"Calling {cls.__name__}.{method_name}")
                    return method(self, *args, **kwargs)
                return logged_method
            
            setattr(cls, attr_name, make_logged_method(attr, attr_name))
    
    return cls

@log_method_calls
class Calculator:
    def add(self, a, b):
        return a + b
    
    def multiply(self, a, b):
        return a * b

calc = Calculator()
calc.add(2, 3)      # Logs: Calling Calculator.add
calc.multiply(4, 5) # Logs: Calling Calculator.multiply

# 6. Dataclass-like decorator (simplified)
def dataclass(cls):
    """Add automatic __init__, __repr__, and __eq__ methods."""
    # Get class annotations
    annotations = getattr(cls, '__annotations__', {})
    
    # Create __init__ method
    def __init__(self, **kwargs):
        for name, type_hint in annotations.items():
            if name in kwargs:
                setattr(self, name, kwargs[name])
            else:
                raise TypeError(f"Missing required argument: {name}")
    
    # Create __repr__ method
    def __repr__(self):
        attrs = ', '.join(f"{k}={getattr(self, k)!r}" 
                         for k in annotations.keys())
        return f"{cls.__name__}({attrs})"
    
    # Create __eq__ method
    def __eq__(self, other):
        if not isinstance(other, cls):
            return False
        return all(getattr(self, k) == getattr(other, k) 
                  for k in annotations.keys())
    
    cls.__init__ = __init__
    cls.__repr__ = __repr__
    cls.__eq__ = __eq__
    return cls

@dataclass
class Point:
    x: int
    y: int

point1 = Point(x=10, y=20)
point2 = Point(x=10, y=20)
print(point1)           # Point(x=10, y=20)
print(point1 == point2) # True

# 7. Registry decorator
class_registry = {}

def register(name=None):
    """Register a class in a global registry."""
    def decorator(cls):
        registry_name = name or cls.__name__
        class_registry[registry_name] = cls
        cls.registry_name = registry_name
        return cls
    return decorator

@register("user_model")
class User:
    pass

@register()  # Uses class name
class Product:
    pass

print(class_registry)  # {'user_model': <class 'User'>, 'Product': <class 'Product'>}

# Factory function using registry
def create_instance(class_name, *args, **kwargs):
    if class_name in class_registry:
        cls = class_registry[class_name]
        return cls(*args, **kwargs)
    else:
        raise ValueError(f"Unknown class: {class_name}")`,

    contextManagers: `# Context managers ensure proper resource management
# They implement __enter__ and __exit__ methods

# 1. Basic context manager class
class FileManager:
    """Context manager for file operations."""
    
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        """Enter the context - open the file."""
        print(f"Opening file: {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Exit the context - close the file."""
        print(f"Closing file: {self.filename}")
        if self.file:
            self.file.close()
        
        # Return False to propagate exceptions
        # Return True to suppress exceptions
        return False

# Usage
with FileManager('example.txt', 'w') as f:
    f.write('Hello, World!')
# File automatically closed even if exception occurs

# 2. Context manager with exception handling
class DatabaseConnection:
    """Context manager for database transactions."""
    
    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None
        self.transaction_started = False
    
    def __enter__(self):
        print(f"Connecting to database: {self.db_name}")
        # Simulate database connection
        self.connection = f"Connection to {self.db_name}"
        
        print("Starting transaction")
        self.transaction_started = True
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.transaction_started:
            if exc_type is None:
                print("Committing transaction")
                # Commit transaction
            else:
                print(f"Rolling back transaction due to {exc_type.__name__}: {exc_val}")
                # Rollback transaction
        
        if self.connection:
            print("Closing database connection")
            self.connection = None
        
        # Don't suppress exceptions
        return False
    
    def execute(self, query):
        print(f"Executing: {query}")
        # Simulate query execution

# Usage
with DatabaseConnection('mydb') as db:
    db.execute("INSERT INTO users VALUES ('Alice', 'alice@example.com')")
    db.execute("INSERT INTO users VALUES ('Bob', 'bob@example.com')")
    # Transaction committed automatically

# With exception
try:
    with DatabaseConnection('mydb') as db:
        db.execute("INSERT INTO users VALUES ('Charlie', 'charlie@example.com')")
        raise ValueError("Something went wrong!")
        db.execute("This won't execute")
except ValueError:
    print("Exception handled")
# Transaction rolled back automatically

# 3. Context manager using contextlib
from contextlib import contextmanager
import tempfile
import os

@contextmanager
def temporary_file(suffix='.tmp'):
    """Create a temporary file that's automatically deleted."""
    # Setup phase
    temp_fd, temp_path = tempfile.mkstemp(suffix=suffix)
    temp_file = os.fdopen(temp_fd, 'w')
    
    try:
        print(f"Created temporary file: {temp_path}")
        yield temp_file  # This is returned to the 'as' variable
    finally:
        # Cleanup phase
        temp_file.close()
        os.unlink(temp_path)
        print(f"Deleted temporary file: {temp_path}")

# Usage
with temporary_file('.txt') as f:
    f.write("This is temporary data")
    f.flush()
    print(f"Temporary file name: {f.name}")
# File automatically deleted

# 4. Timer context manager
@contextmanager
def timer(operation_name="Operation"):
    """Time how long an operation takes."""
    start_time = time.time()
    print(f"Starting {operation_name}...")
    
    try:
        yield
    finally:
        end_time = time.time()
        duration = end_time - start_time
        print(f"{operation_name} completed in {duration:.4f} seconds")

# Usage
with timer("File processing"):
    time.sleep(1)  # Simulate work
    print("Processing files...")

# 5. Suppressing specific exceptions
@contextmanager
def ignore_errors(*exception_types):
    """Context manager that suppresses specific exceptions."""
    try:
        yield
    except exception_types as e:
        print(f"Ignoring {type(e).__name__}: {e}")

# Usage
with ignore_errors(FileNotFoundError, PermissionError):
    with open('nonexistent_file.txt', 'r') as f:
        content = f.read()
print("This will execute even if file doesn't exist")

# 6. Changing directory context manager
@contextmanager
def change_directory(path):
    """Temporarily change working directory."""
    current_dir = os.getcwd()
    try:
        os.chdir(path)
        print(f"Changed directory to: {path}")
        yield path
    finally:
        os.chdir(current_dir)
        print(f"Restored directory to: {current_dir}")

# Usage
print(f"Current directory: {os.getcwd()}")
with change_directory('/tmp'):
    print(f"Inside context: {os.getcwd()}")
    # Do work in /tmp
print(f"After context: {os.getcwd()}")

# 7. Resource pool context manager
class ResourcePool:
    """Context manager for managing a pool of resources."""
    
    def __init__(self, resources):
        self.available = list(resources)
        self.in_use = set()
    
    @contextmanager
    def get_resource(self):
        """Get a resource from the pool."""
        if not self.available:
            raise RuntimeError("No resources available")
        
        resource = self.available.pop()
        self.in_use.add(resource)
        
        try:
            print(f"Acquired resource: {resource}")
            yield resource
        finally:
            self.in_use.remove(resource)
            self.available.append(resource)
            print(f"Released resource: {resource}")

# Usage
pool = ResourcePool(['Resource1', 'Resource2', 'Resource3'])

with pool.get_resource() as resource:
    print(f"Using {resource}")
    # Do work with resource

# 8. Multiple context managers
@contextmanager
def managed_resource(name):
    print(f"Acquiring {name}")
    try:
        yield name
    finally:
        print(f"Releasing {name}")

# Using multiple context managers
with managed_resource("Database"), managed_resource("Cache"), managed_resource("Logger") as logger:
    print(f"Working with all resources, logger: {logger}")

# Or using ExitStack for dynamic context managers
from contextlib import ExitStack

def process_files(filenames):
    with ExitStack() as stack:
        files = [stack.enter_context(open(fname)) for fname in filenames]
        # All files will be automatically closed
        for f in files:
            print(f"Processing {f.name}")

# 9. Async context managers (for async/await)
class AsyncContextManager:
    async def __aenter__(self):
        print("Entering async context")
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("Exiting async context")
        return False

# Usage (in async function):
# async with AsyncContextManager() as cm:
#     await some_async_operation()`,

    advancedPatterns: `# Advanced decorator and context manager patterns

import asyncio
import threading
import weakref
from collections import defaultdict
from contextlib import contextmanager
from functools import wraps
import inspect

# 1. Decorator factory with configuration
class ConfigurableDecorator:
    """A decorator class that can be configured."""
    
    def __init__(self, **config):
        self.config = config
    
    def __call__(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if self.config.get('log_calls', False):
                print(f"Calling {func.__name__}")
            
            if self.config.get('time_calls', False):
                start = time.time()
                result = func(*args, **kwargs)
                end = time.time()
                print(f"{func.__name__} took {end - start:.4f}s")
            else:
                result = func(*args, **kwargs)
            
            if self.config.get('cache_results', False):
                # Simple caching logic here
                pass
            
            return result
        return wrapper

# Usage
@ConfigurableDecorator(log_calls=True, time_calls=True)
def example_function():
    time.sleep(0.1)
    return "Done"

# 2. Property decorator with validation
def validated_property(validator=None, setter_validator=None):
    """Create a property with validation."""
    def decorator(func):
        attr_name = f"_{func.__name__}"
        
        def getter(self):
            return getattr(self, attr_name, None)
        
        def setter(self, value):
            if setter_validator and not setter_validator(value):
                raise ValueError(f"Invalid value for {func.__name__}: {value}")
            setattr(self, attr_name, value)
        
        return property(getter, setter)
    
    return decorator

class Product:
    @validated_property(setter_validator=lambda x: x > 0)
    def price(self):
        pass
    
    @validated_property(setter_validator=lambda x: isinstance(x, str) and len(x) > 0)
    def name(self):
        pass

# 3. Observer pattern with decorators
class Observable:
    def __init__(self):
        self._observers = defaultdict(list)
    
    def add_observer(self, event, callback):
        self._observers[event].append(callback)
    
    def notify(self, event, *args, **kwargs):
        for callback in self._observers[event]:
            callback(*args, **kwargs)

def observer(event_name):
    """Decorator to register a function as an observer."""
    def decorator(func):
        # Store observer info in function
        func._observer_event = event_name
        return func
    return decorator

class EventManager:
    def __init__(self):
        self.observable = Observable()
    
    def register_observers(self, obj):
        """Register all observer methods from an object."""
        for attr_name in dir(obj):
            attr = getattr(obj, attr_name)
            if hasattr(attr, '_observer_event'):
                self.observable.add_observer(attr._observer_event, attr)

class UserService:
    @observer('user_created')
    def send_welcome_email(self, user):
        print(f"Sending welcome email to {user}")
    
    @observer('user_created')
    def create_user_profile(self, user):
        print(f"Creating profile for {user}")

# 4. Async decorator patterns
def async_retry(max_attempts=3, delay=1):
    """Async retry decorator."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            last_exception = None
            
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        await asyncio.sleep(delay)
            
            raise last_exception
        return wrapper
    return decorator

@async_retry(max_attempts=3, delay=0.5)
async def fetch_data(url):
    # Simulate network call that might fail
    import random
    if random.random() < 0.7:
        raise Exception("Network error")
    return f"Data from {url}"

# 5. Thread-safe singleton with decorator
def thread_safe_singleton(cls):
    """Thread-safe singleton decorator."""
    instances = {}
    lock = threading.Lock()
    
    @wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            with lock:
                if cls not in instances:  # Double-checked locking
                    instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    
    return get_instance

@thread_safe_singleton
class DatabaseManager:
    def __init__(self):
        print("Creating database manager")
        self.connection = "database_connection"

# 6. Weak reference context manager
@contextmanager
def weak_callback(obj, callback):
    """Context manager that calls callback when object is garbage collected."""
    weak_ref = weakref.ref(obj, callback)
    try:
        yield obj
    finally:
        # Cleanup if needed
        pass

def on_object_deleted(weak_ref):
    print("Object was garbage collected")

class SomeObject:
    def __init__(self, name):
        self.name = name

# Usage
obj = SomeObject("test")
with weak_callback(obj, on_object_deleted):
    # Use obj
    pass
# obj might be garbage collected after this

# 7. Conditional decorator
def conditional_decorator(condition):
    """Apply decorator only if condition is met."""
    def decorator(decorator_func):
        def wrapper(func):
            if condition():
                return decorator_func(func)
            return func
        return wrapper
    return decorator

# Example: Only log in debug mode
import os
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

@conditional_decorator(lambda: DEBUG)
@log_calls
def debug_function():
    return "This is only logged in debug mode"

# 8. Decorator with state
class CountCalls:
    """Decorator that counts function calls."""
    
    def __init__(self, func):
        self.func = func
        self.call_count = 0
        wraps(func)(self)
    
    def __call__(self, *args, **kwargs):
        self.call_count += 1
        print(f"{self.func.__name__} called {self.call_count} times")
        return self.func(*args, **kwargs)
    
    def reset_count(self):
        self.call_count = 0

@CountCalls
def my_function():
    return "Hello"

my_function()  # my_function called 1 times
my_function()  # my_function called 2 times
print(my_function.call_count)  # 2

# 9. Context manager for temporary attribute changes
@contextmanager
def temporary_attribute(obj, attr_name, temp_value):
    """Temporarily change an object's attribute."""
    old_value = getattr(obj, attr_name, None)
    has_attr = hasattr(obj, attr_name)
    
    setattr(obj, attr_name, temp_value)
    try:
        yield obj
    finally:
        if has_attr:
            setattr(obj, attr_name, old_value)
        else:
            delattr(obj, attr_name)

class Settings:
    debug = False

settings = Settings()
print(settings.debug)  # False

with temporary_attribute(settings, 'debug', True):
    print(settings.debug)  # True
    # Do debug operations

print(settings.debug)  # False

# 10. Metaclass + decorator combination
class AutoPropertyMeta(type):
    """Metaclass that automatically creates properties for _private attributes."""
    
    def __new__(mcs, name, bases, dct):
        for key, value in list(dct.items()):
            if key.startswith('_') and not key.startswith('__'):
                prop_name = key[1:]
                if prop_name not in dct:
                    # Create property
                    def make_property(attr_name):
                        def getter(self):
                            return getattr(self, attr_name)
                        def setter(self, value):
                            setattr(self, attr_name, value)
                        return property(getter, setter)
                    
                    dct[prop_name] = make_property(key)
        
        return super().__new__(mcs, name, bases, dct)

def auto_properties(cls):
    """Decorator that applies AutoPropertyMeta."""
    return AutoPropertyMeta(cls.__name__, cls.__bases__, dict(cls.__dict__))

@auto_properties
class AutoPropertyClass:
    def __init__(self):
        self._value = 42
        self._name = "example"

obj = AutoPropertyClass()
print(obj.value)  # 42 (property access)
obj.name = "new_name"  # Property setter
print(obj.name)  # new_name`
  };

  return (
    <Layout title="Decorators & Context Managers - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Decorators & Context Managers
                </h1>
                <p className="text-rose-100 text-lg">
                  Advanced Level • 80 minutes • Master function decorators, class decorators, and context managers
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">🎭</div>
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
                          ? 'bg-rose-100 text-rose-700'
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Decorators & Context Managers</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          Decorators and context managers are powerful Python features that enable clean, reusable code patterns. They provide elegant solutions for cross-cutting concerns like logging, timing, resource management, and more.
                        </p>

                        <div className="bg-rose-50 border-l-4 border-rose-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-rose-900">
                                <strong>What you'll learn:</strong> Function and class decorators, context manager protocols, with statements, advanced decorator patterns, and practical applications for resource management and code enhancement.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Concepts</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">🎭 Function Decorators</h4>
                            <p className="text-sm text-blue-700">Modify or enhance functions without changing their code</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">🏗️ Class Decorators</h4>
                            <p className="text-sm text-green-700">Transform entire classes by adding or modifying behavior</p>
                          </div>
                          
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">🔒 Context Managers</h4>
                            <p className="text-sm text-purple-700">Manage resources and ensure proper cleanup with with statements</p>
                          </div>
                          
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">⚡ Advanced Patterns</h4>
                            <p className="text-sm text-orange-700">Complex decorator factories, async patterns, and metaprogramming</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li><strong>Logging:</strong> Automatic function call logging</li>
                          <li><strong>Timing:</strong> Performance measurement</li>
                          <li><strong>Caching:</strong> Memoization and result caching</li>
                          <li><strong>Authentication:</strong> Access control and permissions</li>
                          <li><strong>Resource Management:</strong> File, database, and network connections</li>
                          <li><strong>Validation:</strong> Input and output validation</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Function Decorators Section */}
                {activeSection === 'function-decorators' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Function Decorators</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Function decorators are a way to modify or enhance functions without changing their source code. They're implemented as higher-order functions that take a function as input and return a modified function.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.basicDecorators}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Decorator Syntax</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>@decorator</code> - Apply decorator</li>
                            <li>• <code>*args, **kwargs</code> - Handle any arguments</li>
                            <li>• <code>@functools.wraps</code> - Preserve metadata</li>
                            <li>• Multiple decorators stack bottom-up</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Key Concepts</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Higher-order functions</li>
                            <li>• Closure and scope</li>
                            <li>• Function metadata preservation</li>
                            <li>• Return value handling</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">Decorator Best Practices</h4>
                        <ul className="text-yellow-700 space-y-2">
                          <li>• Always use <code>@functools.wraps</code> to preserve function metadata</li>
                          <li>• Handle *args and **kwargs to work with any function signature</li>
                          <li>• Document what your decorator does and any side effects</li>
                          <li>• Consider performance impact of wrapper functions</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Decorator Patterns Section */}
                {activeSection === 'decorator-patterns' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Decorator Patterns</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Common decorator patterns solve recurring programming challenges. These patterns provide reusable solutions for logging, timing, caching, validation, and more.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.decoratorPatterns}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Monitoring</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Timer decorator</li>
                            <li>• Logging decorator</li>
                            <li>• Call counter</li>
                            <li>• Performance profiling</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-800 mb-2">Reliability</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Retry decorator</li>
                            <li>• Rate limiting</li>
                            <li>• Timeout handling</li>
                            <li>• Circuit breaker</li>
                          </ul>
                        </div>
                        
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-800 mb-2">Optimization</h4>
                          <ul className="text-sm text-teal-700 space-y-1">
                            <li>• Memoization/caching</li>
                            <li>• Lazy evaluation</li>
                            <li>• Result compression</li>
                            <li>• Database caching</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-cyan-50 border-l-4 border-cyan-400 p-6">
                        <h4 className="font-semibold text-cyan-800 mb-3">Parameterized Decorators</h4>
                        <p className="text-cyan-700 mb-3">
                          Many decorators accept parameters to customize their behavior. This requires a decorator factory - a function that returns a decorator.
                        </p>
                        <div className="bg-cyan-100 rounded-md p-4 font-mono text-sm">
                          <div>@retry(max_attempts=3, delay=1)</div>
                          <div>def unreliable_function():</div>
                          <div className="ml-4">return "Success!"</div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Class Decorators Section */}
                {activeSection === 'class-decorators' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Class Decorators</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Class decorators operate on entire classes, allowing you to modify class behavior, add methods, or implement design patterns like Singleton. They provide a clean way to enhance classes without inheritance.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.classDecorators}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Class Decorator Uses</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Add methods to classes</li>
                            <li>• Implement design patterns</li>
                            <li>• Class registration systems</li>
                            <li>• Automatic property creation</li>
                            <li>• Method enhancement</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Common Patterns</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Singleton pattern</li>
                            <li>• Registry pattern</li>
                            <li>• Dataclass-like behavior</li>
                            <li>• Validation systems</li>
                            <li>• Observer pattern</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Class vs Function Decorators</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Function Decorators:</h5>
                          <p className="text-sm text-gray-700">Modify individual functions, handle calls, add logging/timing</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Class Decorators:</h5>
                          <p className="text-sm text-gray-700">Transform entire classes, add methods, implement patterns</p>
                        </div>
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
                        Context managers ensure proper resource management through the context manager protocol. They guarantee cleanup operations even when exceptions occur, making code more robust and reliable.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.contextManagers}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">Context Manager Protocol</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• <code>__enter__()</code> - Setup phase</li>
                            <li>• <code>__exit__()</code> - Cleanup phase</li>
                            <li>• <code>with</code> statement usage</li>
                            <li>• Exception handling in __exit__</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <h4 className="font-semibold text-purple-800 mb-3">Common Use Cases</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• File management</li>
                            <li>• Database transactions</li>
                            <li>• Lock acquisition</li>
                            <li>• Temporary state changes</li>
                            <li>• Resource pooling</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Creating Context Managers</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Class-based:</h5>
                          <p className="text-sm text-gray-700">Implement __enter__ and __exit__ methods</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">@contextmanager decorator:</h5>
                          <p className="text-sm text-gray-700">Use generator function with yield</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Advanced Patterns Section */}
                {activeSection === 'advanced-patterns' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Patterns</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Advanced decorator and context manager patterns combine multiple concepts for sophisticated functionality. These patterns are used in frameworks and libraries for complex metaprogramming tasks.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.advancedPatterns}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                          <h4 className="font-semibold text-indigo-800 mb-3">Advanced Techniques</h4>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• Decorator factories with configuration</li>
                            <li>• Async/await patterns</li>
                            <li>• Thread-safe implementations</li>
                            <li>• Metaclass integration</li>
                          </ul>
                        </div>
                        
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                          <h4 className="font-semibold text-emerald-800 mb-3">Real-world Applications</h4>
                          <ul className="text-sm text-emerald-700 space-y-1">
                            <li>• Framework development</li>
                            <li>• API rate limiting</li>
                            <li>• Database ORM systems</li>
                            <li>• Testing frameworks</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
                        <h4 className="font-semibold text-amber-800 mb-3">Performance Considerations</h4>
                        <ul className="text-amber-700 space-y-2">
                          <li>• Decorators add function call overhead</li>
                          <li>• Context managers have minimal overhead</li>
                          <li>• Cache compiled decorators when possible</li>
                          <li>• Profile performance-critical paths</li>
                        </ul>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: API Rate Limiter</h3>
                          <p className="text-gray-700 mb-4">
                            Create a decorator that implements rate limiting for API calls with different limits per user and endpoint.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: per-user limits, sliding window, Redis integration<br/>
                              # Handle burst requests and gradual recovery<br/>
                              # Implement different strategies (token bucket, sliding window)
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: Database Transaction Manager</h3>
                          <p className="text-gray-700 mb-4">
                            Build a context manager for database transactions with nested transaction support and rollback on exceptions.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: nested transactions, savepoints, deadlock handling<br/>
                              # Automatic retry on transient failures<br/>
                              # Integration with multiple database backends
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: Performance Monitoring System</h3>
                          <p className="text-gray-700 mb-4">
                            Create a comprehensive monitoring system using decorators for timing, memory usage, and call graphs.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: call graph visualization, memory profiling<br/>
                              # Statistical analysis of performance data<br/>
                              # Integration with monitoring services (Prometheus, etc.)
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: Configuration Management System</h3>
                          <p className="text-gray-700 mb-4">
                            Build a system that uses decorators and context managers for dynamic configuration changes and feature flags.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: feature flags, A/B testing, configuration hot-reloading<br/>
                              # Context managers for temporary config changes<br/>
                              # Integration with external configuration services
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-rose-100 mb-6">
                          Take our interactive quiz to see how well you've mastered decorators and context managers!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/decorators'}
                          className="bg-white text-rose-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default DecoratorsPage; 