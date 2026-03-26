import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const DatabaseOperationsPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'sqlite-basics', title: 'SQLite Basics', icon: '🗄️' },
    { id: 'sql-queries', title: 'SQL Queries', icon: '🔍' },
    { id: 'python-sqlite', title: 'Python & SQLite', icon: '🐍' },
    { id: 'orm-basics', title: 'ORM Basics', icon: '🔗' },
    { id: 'best-practices', title: 'Best Practices', icon: '⭐' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    sqliteBasics: `# SQLite is a lightweight, serverless database
# Perfect for development, small applications, and learning

# Database concepts:
"""
Table: Collection of related data (like a spreadsheet)
Row/Record: Single entry in a table
Column/Field: Attribute of each record
Primary Key: Unique identifier for each row
Foreign Key: Reference to primary key in another table
Index: Structure to speed up queries
Schema: Structure/blueprint of the database
"""

# SQLite data types:
"""
TEXT - String data (names, descriptions)
INTEGER - Whole numbers (IDs, counts, years)
REAL - Floating point numbers (prices, measurements)
BLOB - Binary data (images, files)
NULL - Missing/empty value

Note: SQLite is dynamically typed - can store any type in any column
"""

# Database design principles:
"""
1. Normalization: Avoid data duplication
   - Split data into logical tables
   - Use foreign keys to connect tables

2. Primary Keys: Every table should have one
   - Usually an INTEGER PRIMARY KEY
   - Automatically increments in SQLite

3. Relationships:
   - One-to-One: User → Profile
   - One-to-Many: Customer → Orders
   - Many-to-Many: Students ↔ Courses (needs junction table)
"""

# Example database schema:
"""
Users Table:
- id (INTEGER PRIMARY KEY)
- username (TEXT UNIQUE)
- email (TEXT UNIQUE)
- password_hash (TEXT)
- created_at (TEXT)

Posts Table:
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER, FOREIGN KEY → users.id)
- title (TEXT)
- content (TEXT)
- created_at (TEXT)
- updated_at (TEXT)

Comments Table:
- id (INTEGER PRIMARY KEY)
- post_id (INTEGER, FOREIGN KEY → posts.id)
- user_id (INTEGER, FOREIGN KEY → users.id)
- content (TEXT)
- created_at (TEXT)
"""`,

    sqlQueries: `-- Basic SQL Query Operations

-- CREATE TABLE: Define table structure
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT NOT NULL,
    content TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- INSERT: Add new records
INSERT INTO users (username, email, age) 
VALUES ('john_doe', 'john@example.com', 25);

INSERT INTO users (username, email, age) 
VALUES 
    ('jane_smith', 'jane@example.com', 30),
    ('bob_wilson', 'bob@example.com', 28);

-- SELECT: Retrieve data
-- Basic select
SELECT * FROM users;
SELECT username, email FROM users;

-- WHERE clause: Filter records
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE username = 'john_doe';
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE email LIKE '%@example.com';

-- ORDER BY: Sort results
SELECT * FROM users ORDER BY age ASC;
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users ORDER BY age DESC, username ASC;

-- LIMIT: Limit number of results
SELECT * FROM users LIMIT 5;
SELECT * FROM users ORDER BY age DESC LIMIT 3;

-- Aggregate functions
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MIN(age), MAX(age) FROM users;
SELECT SUM(age) FROM users;

-- GROUP BY: Group results
SELECT age, COUNT(*) FROM users GROUP BY age;
SELECT age, COUNT(*) FROM users GROUP BY age HAVING COUNT(*) > 1;

-- UPDATE: Modify existing records
UPDATE users SET age = 26 WHERE username = 'john_doe';
UPDATE users SET age = age + 1;  -- Increment all ages

-- DELETE: Remove records
DELETE FROM users WHERE age < 18;
DELETE FROM posts WHERE user_id = 1;

-- JOINS: Combine data from multiple tables
-- INNER JOIN: Only matching records
SELECT users.username, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- LEFT JOIN: All records from left table
SELECT users.username, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;

-- Subqueries: Query within a query
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM posts WHERE title LIKE '%Python%');

-- Complex query example
SELECT 
    users.username,
    COUNT(posts.id) as post_count,
    MAX(posts.created_at) as last_post_date
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username
HAVING post_count > 0
ORDER BY post_count DESC;

-- CREATE INDEX: Speed up queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- ALTER TABLE: Modify table structure
ALTER TABLE users ADD COLUMN last_login TEXT;
ALTER TABLE users RENAME TO app_users;

-- DROP: Remove database objects
DROP INDEX idx_users_email;
DROP TABLE old_table;`,

    pythonSQLite: `import sqlite3
import json
from datetime import datetime
from contextlib import contextmanager

# Basic database connection
def create_connection(db_file):
    """Create a database connection to SQLite database."""
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except sqlite3.Error as e:
        print(f"Error connecting to database: {e}")
        return None

# Context manager for database connections
@contextmanager
def get_db_connection(db_file):
    """Context manager for database connections."""
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        conn.row_factory = sqlite3.Row  # Enable dict-like access
        yield conn
    except sqlite3.Error as e:
        if conn:
            conn.rollback()
        print(f"Database error: {e}")
        raise
    finally:
        if conn:
            conn.close()

# Database initialization
def initialize_database(db_file):
    """Create tables and initial setup."""
    sql_commands = [
        '''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            age INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        ''',
        '''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
        ''',
        '''
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
        ''',
        '''
        CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id)
        '''
    ]
    
    with get_db_connection(db_file) as conn:
        for command in sql_commands:
            conn.execute(command)
        conn.commit()

# CRUD Operations
class UserDatabase:
    def __init__(self, db_file):
        self.db_file = db_file
        initialize_database(db_file)
    
    def create_user(self, username, email, password_hash, age=None):
        """Create a new user."""
        sql = '''
        INSERT INTO users (username, email, password_hash, age)
        VALUES (?, ?, ?, ?)
        '''
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, (username, email, password_hash, age))
            conn.commit()
            return cursor.lastrowid
    
    def get_user_by_id(self, user_id):
        """Get user by ID."""
        sql = 'SELECT * FROM users WHERE id = ?'
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, (user_id,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    def get_user_by_email(self, email):
        """Get user by email."""
        sql = 'SELECT * FROM users WHERE email = ?'
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, (email,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    def get_all_users(self, limit=None, offset=None):
        """Get all users with optional pagination."""
        sql = 'SELECT * FROM users ORDER BY created_at DESC'
        params = []
        
        if limit:
            sql += ' LIMIT ?'
            params.append(limit)
            if offset:
                sql += ' OFFSET ?'
                params.append(offset)
        
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, params)
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def update_user(self, user_id, **kwargs):
        """Update user fields."""
        if not kwargs:
            return False
        
        # Build dynamic UPDATE query
        fields = ', '.join([f"{key} = ?" for key in kwargs.keys()])
        sql = f'UPDATE users SET {fields} WHERE id = ?'
        values = list(kwargs.values()) + [user_id]
        
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, values)
            conn.commit()
            return cursor.rowcount > 0
    
    def delete_user(self, user_id):
        """Delete user and related posts."""
        with get_db_connection(self.db_file) as conn:
            # Delete related posts first
            conn.execute('DELETE FROM posts WHERE user_id = ?', (user_id,))
            # Delete user
            cursor = conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
            conn.commit()
            return cursor.rowcount > 0
    
    def create_post(self, user_id, title, content):
        """Create a new post."""
        sql = '''
        INSERT INTO posts (user_id, title, content)
        VALUES (?, ?, ?)
        '''
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, (user_id, title, content))
            conn.commit()
            return cursor.lastrowid
    
    def get_posts_by_user(self, user_id):
        """Get all posts by a user."""
        sql = '''
        SELECT p.*, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.user_id = ?
        ORDER BY p.created_at DESC
        '''
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, (user_id,))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def search_posts(self, query):
        """Search posts by title or content."""
        sql = '''
        SELECT p.*, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.title LIKE ? OR p.content LIKE ?
        ORDER BY p.created_at DESC
        '''
        search_term = f'%{query}%'
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, (search_term, search_term))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]

# Usage example
if __name__ == "__main__":
    # Initialize database
    db = UserDatabase('example.db')
    
    # Create users
    user1_id = db.create_user('john_doe', 'john@example.com', 'hashed_password', 25)
    user2_id = db.create_user('jane_smith', 'jane@example.com', 'hashed_password', 30)
    
    # Create posts
    post1_id = db.create_post(user1_id, 'My First Post', 'This is my first blog post!')
    post2_id = db.create_post(user1_id, 'Python Tips', 'Here are some Python tips...')
    
    # Query data
    user = db.get_user_by_email('john@example.com')
    print(f"User: {user['username']}")
    
    posts = db.get_posts_by_user(user1_id)
    print(f"Posts by {user['username']}: {len(posts)}")
    
    # Search
    search_results = db.search_posts('Python')
    print(f"Found {len(search_results)} posts about Python")

# Transaction handling
def transfer_operation(db_file, from_account, to_account, amount):
    """Example of transaction handling."""
    with get_db_connection(db_file) as conn:
        try:
            # Start transaction (automatic with context manager)
            
            # Deduct from source account
            conn.execute(
                'UPDATE accounts SET balance = balance - ? WHERE id = ?',
                (amount, from_account)
            )
            
            # Add to destination account
            conn.execute(
                'UPDATE accounts SET balance = balance + ? WHERE id = ?',
                (amount, to_account)
            )
            
            # Record transaction
            conn.execute(
                '''INSERT INTO transactions (from_account, to_account, amount, created_at)
                   VALUES (?, ?, ?, ?)''',
                (from_account, to_account, amount, datetime.now().isoformat())
            )
            
            # Commit transaction
            conn.commit()
            print("Transfer completed successfully")
            
        except sqlite3.Error as e:
            # Rollback happens automatically with context manager
            print(f"Transfer failed: {e}")
            raise`,

    ormBasics: `# ORM (Object-Relational Mapping) Basics
# ORMs map database tables to Python classes

# Simple ORM implementation
class SimpleORM:
    """Basic ORM functionality for educational purposes."""
    
    def __init__(self, db_file):
        self.db_file = db_file
    
    def execute(self, sql, params=None):
        """Execute SQL query."""
        with get_db_connection(self.db_file) as conn:
            cursor = conn.execute(sql, params or [])
            conn.commit()
            return cursor

class Model:
    """Base model class."""
    table_name = None
    db = None
    
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
    
    @classmethod
    def create_table(cls):
        """Create table based on model definition."""
        # This would be implemented based on field definitions
        pass
    
    def save(self):
        """Save instance to database."""
        # Implementation would insert or update based on ID
        pass
    
    @classmethod
    def find_by_id(cls, id):
        """Find record by ID."""
        sql = f"SELECT * FROM {cls.table_name} WHERE id = ?"
        cursor = cls.db.execute(sql, [id])
        row = cursor.fetchone()
        if row:
            return cls(**dict(row))
        return None
    
    @classmethod
    def all(cls):
        """Get all records."""
        sql = f"SELECT * FROM {cls.table_name}"
        cursor = cls.db.execute(sql)
        rows = cursor.fetchall()
        return [cls(**dict(row)) for row in rows]

# Example models using simple ORM
class User(Model):
    table_name = 'users'
    
    def __init__(self, id=None, username=None, email=None, age=None, **kwargs):
        self.id = id
        self.username = username
        self.email = email
        self.age = age
        super().__init__(**kwargs)
    
    def get_posts(self):
        """Get all posts by this user."""
        return Post.find_by_user_id(self.id)

class Post(Model):
    table_name = 'posts'
    
    def __init__(self, id=None, user_id=None, title=None, content=None, **kwargs):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.content = content
        super().__init__(**kwargs)
    
    @classmethod
    def find_by_user_id(cls, user_id):
        """Find posts by user ID."""
        sql = f"SELECT * FROM {cls.table_name} WHERE user_id = ?"
        cursor = cls.db.execute(sql, [user_id])
        rows = cursor.fetchall()
        return [cls(**dict(row)) for row in rows]

# Using SQLAlchemy (popular Python ORM)
"""
# Installation: pip install sqlalchemy

from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    posts = relationship("Post", back_populates="user")

class Post(Base):
    __tablename__ = 'posts'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    content = Column(Text)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="posts")

# Database setup
engine = create_engine('sqlite:///example.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# Usage
session = Session()

# Create user
new_user = User(username='john_doe', email='john@example.com')
session.add(new_user)
session.commit()

# Create post
new_post = Post(title='My Post', content='Content here', user=new_user)
session.add(new_post)
session.commit()

# Query data
users = session.query(User).all()
user = session.query(User).filter_by(username='john_doe').first()
posts = session.query(Post).filter(Post.title.like('%Python%')).all()

# Join query
user_posts = session.query(User, Post).join(Post).all()

session.close()
"""

# Django ORM example (framework-specific)
"""
# models.py
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.username

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

# Usage
from myapp.models import User, Post

# Create
user = User.objects.create(username='john', email='john@example.com')
post = Post.objects.create(title='My Post', content='Content', user=user)

# Query
users = User.objects.all()
user = User.objects.get(username='john')
posts = Post.objects.filter(title__icontains='Python')
user_posts = user.post_set.all()  # Related objects
"""

# Benefits of ORMs:
"""
1. Database Abstraction: Work with objects instead of SQL
2. Automatic SQL Generation: ORM generates optimized queries
3. Relationship Handling: Easy navigation between related objects
4. Migration Support: Version control for database schema
5. Security: Protection against SQL injection
6. Database Portability: Switch between database engines easily

Drawbacks:
1. Performance Overhead: Additional layer between code and database
2. Complex Queries: Sometimes raw SQL is more efficient
3. Learning Curve: Need to understand ORM-specific syntax
4. Limited Control: Less control over generated SQL
"""

# When to use ORM vs Raw SQL:
"""
Use ORM for:
- Standard CRUD operations
- Application development
- Rapid prototyping
- Team development (consistency)
- When portability matters

Use Raw SQL for:
- Complex analytical queries
- Performance-critical operations
- Database-specific features
- Data migrations
- Reporting and analytics
"""`,

    bestPractices: `# Database Best Practices

import sqlite3
import hashlib
import secrets
import logging
from datetime import datetime, timedelta

# 1. Connection Management
class DatabaseManager:
    """Proper database connection management."""
    
    def __init__(self, db_file, pool_size=5):
        self.db_file = db_file
        self.pool_size = pool_size
        self._connections = []
        self._setup_database()
    
    def _setup_database(self):
        """Initial database setup."""
        with self.get_connection() as conn:
            # Enable foreign key constraints
            conn.execute('PRAGMA foreign_keys = ON')
            # Set WAL mode for better concurrency
            conn.execute('PRAGMA journal_mode = WAL')
            # Set secure_delete for data security
            conn.execute('PRAGMA secure_delete = ON')
    
    @contextmanager
    def get_connection(self):
        """Get database connection with proper cleanup."""
        conn = sqlite3.connect(self.db_file)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
        except Exception as e:
            conn.rollback()
            logging.error(f"Database error: {e}")
            raise
        finally:
            conn.close()

# 2. SQL Injection Prevention
class SecureDatabase:
    """Database operations with security best practices."""
    
    def __init__(self, db_file):
        self.db_manager = DatabaseManager(db_file)
    
    def find_user_secure(self, username):
        """Secure user lookup using parameterized queries."""
        # GOOD: Parameterized query
        sql = "SELECT * FROM users WHERE username = ?"
        with self.db_manager.get_connection() as conn:
            cursor = conn.execute(sql, (username,))
            return cursor.fetchone()
    
    def find_user_insecure(self, username):
        """NEVER DO THIS: SQL injection vulnerability."""
        # BAD: String formatting
        sql = f"SELECT * FROM users WHERE username = '{username}'"
        # This allows injection: username = "'; DROP TABLE users; --"
        pass
    
    def search_posts_secure(self, query, limit=10):
        """Secure search with input validation."""
        # Validate input
        if not query or len(query.strip()) < 2:
            return []
        
        # Sanitize query
        clean_query = query.strip()[:100]  # Limit length
        search_term = f"%{clean_query}%"
        
        sql = """
        SELECT p.*, u.username 
        FROM posts p 
        JOIN users u ON p.user_id = u.id 
        WHERE p.title LIKE ? OR p.content LIKE ? 
        ORDER BY p.created_at DESC 
        LIMIT ?
        """
        
        with self.db_manager.get_connection() as conn:
            cursor = conn.execute(sql, (search_term, search_term, limit))
            return [dict(row) for row in cursor.fetchall()]

# 3. Password Security
class UserAuth:
    """Secure user authentication."""
    
    @staticmethod
    def hash_password(password):
        """Hash password securely."""
        # Generate random salt
        salt = secrets.token_hex(32)
        # Hash password with salt
        pwd_hash = hashlib.pbkdf2_hmac('sha256', 
                                       password.encode('utf-8'), 
                                       salt.encode('utf-8'), 
                                       100000)  # 100,000 iterations
        return f"{salt}$\{pwd_hash.hex()}"
    
    @staticmethod
    def verify_password(password, hashed):
        """Verify password against hash."""
        try:
            salt, pwd_hash = hashed.split('$')
            return pwd_hash == hashlib.pbkdf2_hmac('sha256',
                                                   password.encode('utf-8'),
                                                   salt.encode('utf-8'),
                                                   100000).hex()
        except ValueError:
            return False

# 4. Database Schema Best Practices
def create_optimized_schema():
    """Create database schema with best practices."""
    schema_sql = [
        # Users table with proper constraints
        '''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL CHECK(length(username) >= 3),
            email TEXT UNIQUE NOT NULL CHECK(email LIKE '%_@_%'),
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            is_active BOOLEAN DEFAULT 1,
            last_login TEXT
        )
        ''',
        
        # Posts table with proper foreign keys
        '''
        CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL CHECK(length(title) > 0),
            content TEXT,
            slug TEXT UNIQUE,
            status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        ''',
        
        # Indexes for performance
        'CREATE INDEX idx_users_email ON users(email)',
        'CREATE INDEX idx_users_username ON users(username)',
        'CREATE INDEX idx_posts_user_id ON posts(user_id)',
        'CREATE INDEX idx_posts_status ON posts(status)',
        'CREATE INDEX idx_posts_created_at ON posts(created_at)',
        'CREATE INDEX idx_posts_slug ON posts(slug)',
        
        # Trigger to update timestamp
        '''
        CREATE TRIGGER update_user_timestamp 
        AFTER UPDATE ON users
        BEGIN
            UPDATE users SET updated_at = datetime('now') WHERE id = NEW.id;
        END
        ''',
        
        '''
        CREATE TRIGGER update_post_timestamp 
        AFTER UPDATE ON posts
        BEGIN
            UPDATE posts SET updated_at = datetime('now') WHERE id = NEW.id;
        END
        '''
    ]
    
    return schema_sql

# 5. Performance Optimization
class PerformanceOptimizer:
    """Database performance optimization techniques."""
    
    def __init__(self, db_manager):
        self.db_manager = db_manager
    
    def analyze_performance(self):
        """Analyze database performance."""
        with self.db_manager.get_connection() as conn:
            # Check database size
            size_query = "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()"
            size = conn.execute(size_query).fetchone()['size']
            
            # Check table statistics
            tables_query = "SELECT name FROM sqlite_master WHERE type='table'"
            tables = [row['name'] for row in conn.execute(tables_query)]
            
            stats = {'database_size': size, 'tables': {}}
            
            for table in tables:
                count_query = f"SELECT COUNT(*) as count FROM {table}"
                count = conn.execute(count_query).fetchone()['count']
                stats['tables'][table] = {'row_count': count}
            
            return stats
    
    def optimize_database(self):
        """Perform database optimization."""
        with self.db_manager.get_connection() as conn:
            # Analyze query plans
            conn.execute('ANALYZE')
            # Rebuild indexes
            conn.execute('REINDEX')
            # Vacuum to reclaim space
            conn.execute('VACUUM')
    
    def explain_query(self, sql, params=None):
        """Explain query execution plan."""
        explain_sql = f"EXPLAIN QUERY PLAN {sql}"
        with self.db_manager.get_connection() as conn:
            cursor = conn.execute(explain_sql, params or [])
            return [dict(row) for row in cursor.fetchall()]

# 6. Backup and Recovery
class DatabaseBackup:
    """Database backup and recovery utilities."""
    
    def __init__(self, db_file):
        self.db_file = db_file
    
    def backup_database(self, backup_file):
        """Create database backup."""
        try:
            # Connect to source database
            source = sqlite3.connect(self.db_file)
            # Connect to backup database
            backup = sqlite3.connect(backup_file)
            
            # Perform backup
            source.backup(backup)
            
            backup.close()
            source.close()
            
            logging.info(f"Database backed up to {backup_file}")
            return True
            
        except sqlite3.Error as e:
            logging.error(f"Backup failed: {e}")
            return False
    
    def restore_database(self, backup_file):
        """Restore database from backup."""
        try:
            # Connect to backup database
            backup = sqlite3.connect(backup_file)
            # Connect to target database
            target = sqlite3.connect(self.db_file)
            
            # Perform restore
            backup.backup(target)
            
            target.close()
            backup.close()
            
            logging.info(f"Database restored from {backup_file}")
            return True
            
        except sqlite3.Error as e:
            logging.error(f"Restore failed: {e}")
            return False
    
    def scheduled_backup(self, backup_dir, retention_days=30):
        """Perform scheduled backup with cleanup."""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_file = f"{backup_dir}/backup_{timestamp}.db"
        
        if self.backup_database(backup_file):
            # Clean old backups
            cutoff_date = datetime.now() - timedelta(days=retention_days)
            # Implementation would scan backup_dir and remove old files
            pass

# 7. Database Migration System
class MigrationManager:
    """Simple database migration system."""
    
    def __init__(self, db_manager):
        self.db_manager = db_manager
        self._create_migration_table()
    
    def _create_migration_table(self):
        """Create migration tracking table."""
        sql = '''
        CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            applied_at TEXT DEFAULT (datetime('now'))
        )
        '''
        with self.db_manager.get_connection() as conn:
            conn.execute(sql)
            conn.commit()
    
    def apply_migration(self, name, sql_commands):
        """Apply database migration."""
        with self.db_manager.get_connection() as conn:
            # Check if migration already applied
            check_sql = "SELECT COUNT(*) as count FROM migrations WHERE name = ?"
            result = conn.execute(check_sql, (name,)).fetchone()
            
            if result['count'] > 0:
                logging.info(f"Migration {name} already applied")
                return
            
            try:
                # Apply migration
                for command in sql_commands:
                    conn.execute(command)
                
                # Record migration
                record_sql = "INSERT INTO migrations (name) VALUES (?)"
                conn.execute(record_sql, (name,))
                
                conn.commit()
                logging.info(f"Migration {name} applied successfully")
                
            except sqlite3.Error as e:
                conn.rollback()
                logging.error(f"Migration {name} failed: {e}")
                raise

# Usage example with best practices
def example_best_practices():
    """Example demonstrating database best practices."""
    
    # Initialize secure database
    db = SecureDatabase('secure_app.db')
    auth = UserAuth()
    
    # Create user with secure password
    username = "john_doe"
    password = "secure_password_123"
    hashed_password = auth.hash_password(password)
    
    # Store user securely
    sql = "INSERT INTO users (username, password_hash) VALUES (?, ?)"
    with db.db_manager.get_connection() as conn:
        conn.execute(sql, (username, hashed_password))
        conn.commit()
    
    # Authenticate user
    user = db.find_user_secure(username)
    if user and auth.verify_password(password, user['password_hash']):
        print("Authentication successful")
    
    # Perform secure search
    results = db.search_posts_secure("python programming")
    print(f"Found {len(results)} posts")
    
    # Performance analysis
    optimizer = PerformanceOptimizer(db.db_manager)
    stats = optimizer.analyze_performance()
    print(f"Database size: {stats['database_size']} bytes")
    
    # Backup database
    backup = DatabaseBackup('secure_app.db')
    backup.backup_database('backup.db')`
  };

  return (
    <Layout title="Database Operations - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Database Operations
                </h1>
                <p className="text-green-100 text-lg">
                  Intermediate Level • 70 minutes • Master SQLite, SQL queries, Python database integration, and ORM basics
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">🗄️</div>
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Database Operations</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          Database operations are fundamental to most applications. Learn how to store, retrieve, and manipulate data using SQLite and Python, from basic SQL queries to advanced database patterns.
                        </p>

                        <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-green-900">
                                <strong>What you'll learn:</strong> SQLite database fundamentals, SQL query writing, Python database integration, ORM concepts, security best practices, and performance optimization.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Database Concepts</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">🗄️ SQLite</h4>
                            <p className="text-sm text-blue-700">Lightweight, serverless database perfect for learning and small applications</p>
                          </div>
                          
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">🔍 SQL Queries</h4>
                            <p className="text-sm text-purple-700">Create, read, update, delete operations with complex queries and joins</p>
                          </div>
                          
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">🐍 Python Integration</h4>
                            <p className="text-sm text-orange-700">Use sqlite3 module for database operations in Python applications</p>
                          </div>
                          
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">🔗 ORM Basics</h4>
                            <p className="text-sm text-red-700">Object-Relational Mapping for working with databases using Python objects</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Learn Database Operations?</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li><strong>Data Persistence:</strong> Store application data permanently</li>
                          <li><strong>Data Integrity:</strong> Ensure data consistency and validity</li>
                          <li><strong>Performance:</strong> Efficient data retrieval and manipulation</li>
                          <li><strong>Scalability:</strong> Handle growing amounts of data</li>
                          <li><strong>Security:</strong> Protect sensitive information</li>
                          <li><strong>Analytics:</strong> Query and analyze data for insights</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* SQLite Basics Section */}
                {activeSection === 'sqlite-basics' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">SQLite Basics</h2>
                      
                      <p className="text-gray-700 mb-6">
                        SQLite is a self-contained, serverless database engine. It's perfect for learning database concepts, development, and applications that don't require a full database server.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.sqliteBasics}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">SQLite Features</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Zero-configuration setup</li>
                            <li>• Single file database</li>
                            <li>• Cross-platform compatibility</li>
                            <li>• ACID transactions</li>
                            <li>• SQL standard compliance</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Data Types</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <strong>TEXT:</strong> String data</li>
                            <li>• <strong>INTEGER:</strong> Whole numbers</li>
                            <li>• <strong>REAL:</strong> Floating point</li>
                            <li>• <strong>BLOB:</strong> Binary data</li>
                            <li>• <strong>NULL:</strong> Missing values</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Database Design Principles</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Normalization:</h5>
                          <p className="text-sm text-gray-700">Organize data to reduce redundancy and improve integrity</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Primary Keys:</h5>
                          <p className="text-sm text-gray-700">Unique identifier for each record in a table</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Foreign Keys:</h5>
                          <p className="text-sm text-gray-700">References to primary keys in other tables for relationships</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* SQL Queries Section */}
                {activeSection === 'sql-queries' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">SQL Queries</h2>
                      
                      <p className="text-gray-700 mb-6">
                        SQL (Structured Query Language) is the standard language for interacting with relational databases. Master the fundamental operations for data manipulation and retrieval.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.sqlQueries}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <h4 className="font-semibold text-purple-800 mb-3">CRUD Operations</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• <strong>CREATE:</strong> INSERT new records</li>
                            <li>• <strong>READ:</strong> SELECT data</li>
                            <li>• <strong>UPDATE:</strong> Modify existing data</li>
                            <li>• <strong>DELETE:</strong> Remove records</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">Advanced Features</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• JOINs for multi-table queries</li>
                            <li>• Aggregate functions (COUNT, SUM, AVG)</li>
                            <li>• GROUP BY for data grouping</li>
                            <li>• Indexes for performance</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">SQL Best Practices</h4>
                        <ul className="text-yellow-700 space-y-2">
                          <li>• Use parameterized queries to prevent SQL injection</li>
                          <li>• Create indexes on frequently queried columns</li>
                          <li>• Use LIMIT to avoid retrieving too much data</li>
                          <li>• Normalize database design to reduce redundancy</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Python & SQLite Section */}
                {activeSection === 'python-sqlite' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Python & SQLite</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Python's sqlite3 module provides a comprehensive interface for working with SQLite databases. Learn to integrate database operations seamlessly into your Python applications.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.pythonSQLite}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Connection Management</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Context managers</li>
                            <li>• Connection pooling</li>
                            <li>• Proper cleanup</li>
                            <li>• Error handling</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">CRUD Operations</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Create records</li>
                            <li>• Read/query data</li>
                            <li>• Update existing records</li>
                            <li>• Delete operations</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Advanced Features</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Transactions</li>
                            <li>• Row factories</li>
                            <li>• Prepared statements</li>
                            <li>• Batch operations</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-cyan-50 border-l-4 border-cyan-400 p-6">
                        <h4 className="font-semibold text-cyan-800 mb-3">Python Database Patterns</h4>
                        <ul className="text-cyan-700 space-y-2">
                          <li>• Use context managers for automatic cleanup</li>
                          <li>• Implement database classes for organization</li>
                          <li>• Use parameterized queries for security</li>
                          <li>• Handle exceptions appropriately</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* ORM Basics Section */}
                {activeSection === 'orm-basics' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">ORM Basics</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Object-Relational Mapping (ORM) bridges the gap between object-oriented programming and relational databases. ORMs allow you to work with database records as Python objects.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.ormBasics}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">✅ ORM Benefits</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Database abstraction</li>
                            <li>• Automatic SQL generation</li>
                            <li>• Object-oriented interface</li>
                            <li>• Relationship handling</li>
                            <li>• Migration support</li>
                          </ul>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">⚠️ ORM Drawbacks</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Performance overhead</li>
                            <li>• Learning curve</li>
                            <li>• Limited control over SQL</li>
                            <li>• Complex query limitations</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Python ORMs</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">SQLAlchemy:</h5>
                          <p className="text-sm text-gray-700">Most popular Python ORM with powerful features and flexibility</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Django ORM:</h5>
                          <p className="text-sm text-gray-700">Built into Django framework, easy to use for web applications</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Peewee:</h5>
                          <p className="text-sm text-gray-700">Lightweight ORM perfect for small to medium applications</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Best Practices Section */}
                {activeSection === 'best-practices' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Production database applications require careful attention to security, performance, and reliability. Follow these best practices for robust database operations.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.bestPractices}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">🔒 Security</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Use parameterized queries</li>
                            <li>• Hash passwords securely</li>
                            <li>• Validate input data</li>
                            <li>• Implement proper authentication</li>
                            <li>• Regular security audits</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">⚡ Performance</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Create appropriate indexes</li>
                            <li>• Optimize query patterns</li>
                            <li>• Use connection pooling</li>
                            <li>• Implement caching strategies</li>
                            <li>• Monitor query performance</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Database Security Checklist</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">✅ SQL Injection Prevention:</h5>
                          <p className="text-sm text-gray-700">Always use parameterized queries, never string formatting</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">✅ Password Security:</h5>
                          <p className="text-sm text-gray-700">Use strong hashing algorithms with salt</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">✅ Data Validation:</h5>
                          <p className="text-sm text-gray-700">Validate and sanitize all input data</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">✅ Backup Strategy:</h5>
                          <p className="text-sm text-gray-700">Regular backups with tested restore procedures</p>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Library Management System</h3>
                          <p className="text-gray-700 mb-4">
                            Create a complete library system with books, authors, members, and borrowing records using proper database design.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Tables: books, authors, members, loans<br/>
                              # Features: book search, member management, loan tracking<br/>
                              # Include proper foreign keys and constraints
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: E-commerce Database</h3>
                          <p className="text-gray-700 mb-4">
                            Build an e-commerce database with products, categories, customers, orders, and payment tracking.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Complex relationships: many-to-many, one-to-many<br/>
                              # Features: inventory management, order processing<br/>
                              # Implement transaction handling for orders
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: Social Media Analytics</h3>
                          <p className="text-gray-700 mb-4">
                            Create a database for social media analytics with users, posts, likes, comments, and engagement metrics.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Analytics queries: engagement rates, trending posts<br/>
                              # Implement efficient search and filtering<br/>
                              # Use indexes for performance optimization
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: School Management System</h3>
                          <p className="text-gray-700 mb-4">
                            Design a comprehensive school database with students, teachers, courses, grades, and schedules.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Complex scheduling logic and enrollment tracking<br/>
                              # Grade calculation and reporting features<br/>
                              # Implement data backup and migration system
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-green-100 mb-6">
                          Take our interactive quiz to see how well you've mastered database operations!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/database-operations'}
                          className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default DatabaseOperationsPage; 