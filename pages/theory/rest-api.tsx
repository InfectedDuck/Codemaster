import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const RestApiPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'rest-principles', title: 'REST Principles', icon: '🏗️' },
    { id: 'flask-basics', title: 'Flask Basics', icon: '⚗️' },
    { id: 'authentication', title: 'Authentication', icon: '🔐' },
    { id: 'database-integration', title: 'Database Integration', icon: '🗃️' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    restPrinciples: `# REST API Design Principles

# 1. Resource-based URLs
# Good: /api/users/123
# Bad: /api/getUserById?id=123

# 2. HTTP Methods
GET /api/users          # Retrieve all users
GET /api/users/123      # Retrieve specific user
POST /api/users         # Create new user
PUT /api/users/123      # Update entire user
PATCH /api/users/123    # Partially update user
DELETE /api/users/123   # Delete user

# 3. Status Codes
200 - OK (GET, PUT, PATCH)
201 - Created (POST)
204 - No Content (DELETE)
400 - Bad Request
401 - Unauthorized
404 - Not Found
500 - Internal Server Error`,

    flaskBasics: `from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///api.db'
db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

# Routes
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(username=data['username'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)`,

    authentication: `from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

# Sample user data
users = {
    "admin": {
        "password_hash": generate_password_hash("password123"),
        "role": "admin"
    }
}

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = users.get(username)
    if user and check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity=username)
        return jsonify({'access_token': access_token})
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({'message': 'This is a protected endpoint'})`,

    databaseIntegration: `from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

# Models with relationships
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship
    posts = db.relationship('Post', backref='author', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Create tables
with app.app_context():
    db.create_all()

# Routes with error handling
@app.route('/api/users/<int:user_id>/posts', methods=['GET'])
def get_user_posts(user_id):
    user = User.query.get_or_404(user_id)
    posts = [{'id': p.id, 'title': p.title} for p in user.posts]
    return jsonify({'user': user.username, 'posts': posts})`,

    practice: `# Practice: Build a Complete REST API

# 1. User Management System
# TODO: Implement these endpoints:
# - POST /api/users (create user)
# - GET /api/users (list users with pagination)
# - GET /api/users/:id (get user by id)
# - PUT /api/users/:id (update user)
# - DELETE /api/users/:id (delete user)

# 2. Authentication System
# TODO: Implement JWT authentication:
# - POST /api/auth/register
# - POST /api/auth/login
# - POST /api/auth/refresh
# - Protect all user endpoints with JWT

# 3. Error Handling
# TODO: Add proper error handling:
# - Validation errors (400)
# - Authentication errors (401)
# - Authorization errors (403)
# - Not found errors (404)
# - Server errors (500)

# 4. Testing
# TODO: Write comprehensive tests:
# - Unit tests for models
# - Integration tests for endpoints
# - Authentication tests
# - Error handling tests

# 5. Documentation
# TODO: Create API documentation:
# - OpenAPI/Swagger specification
# - Example requests and responses
# - Authentication instructions
# - Error code explanations

print("Complete these tasks to build a production-ready REST API!")`
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 REST API Development</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Welcome to the comprehensive REST API Development module! Learn to build full-featured REST APIs using Flask and FastAPI, 
                  including authentication, database integration, and proper API documentation following industry best practices.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 What You'll Learn</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• RESTful API design principles</li>
                      <li>• Flask framework fundamentals</li>
                      <li>• Authentication and authorization</li>
                      <li>• Database integration patterns</li>
                      <li>• API documentation and testing</li>
                      <li>• Production deployment strategies</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">⏱️ Project Details</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Duration:</strong> 180 minutes</li>
                      <li>• <strong>Level:</strong> Projects</li>
                      <li>• <strong>Prerequisites:</strong> Python, OOP, databases</li>
                      <li>• <strong>Framework:</strong> Flask</li>
                      <li>• <strong>Outcome:</strong> Production-ready API</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'rest-principles':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🏗️ REST Principles</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Learn the fundamental principles of REST architecture and how to design clean, maintainable APIs.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.restPrinciples}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🔑 Key REST Principles:</h4>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Stateless communication between client and server</li>
                    <li>• Resource-based URLs with meaningful naming</li>
                    <li>• Proper use of HTTP methods and status codes</li>
                    <li>• Consistent JSON response format</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'flask-basics':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">⚗️ Flask Basics</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Build your first REST API using Flask with SQLAlchemy for database operations.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.flaskBasics}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">⚗️ Flask Features:</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• Lightweight and flexible framework</li>
                    <li>• Easy integration with SQLAlchemy</li>
                    <li>• Extensive ecosystem of extensions</li>
                    <li>• Perfect for microservices architecture</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'authentication':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🔐 Authentication</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Implement secure authentication using JWT tokens and role-based access control.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.authentication}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">🔒 Security Best Practices:</h4>
                  <ul className="text-red-800 space-y-1">
                    <li>• Use strong, randomly generated JWT secrets</li>
                    <li>• Implement token expiration and refresh mechanisms</li>
                    <li>• Hash passwords with bcrypt or similar</li>
                    <li>• Implement rate limiting on auth endpoints</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'database-integration':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🗃️ Database Integration</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Learn advanced database patterns including relationships, migrations, and error handling.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.databaseIntegration}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">🗄️ Database Best Practices:</h4>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Use database migrations for schema changes</li>
                    <li>• Implement proper error handling and rollback</li>
                    <li>• Use database relationships efficiently</li>
                    <li>• Implement pagination for large datasets</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-6">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">💪 Practice Project</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Build a complete REST API with authentication, database integration, and comprehensive testing.
                </p>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples.practice}</code>
                  </pre>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🎯 Project Goals:</h4>
                  <ul className="text-green-800 space-y-1">
                    <li>• Complete all API endpoints with proper validation</li>
                    <li>• Implement comprehensive test suite</li>
                    <li>• Add performance testing and optimization</li>
                    <li>• Deploy to production environment</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                🚀 REST API Development
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Build full-featured REST APIs with Flask, including authentication, database integration, 
                and proper API documentation. Learn industry best practices for scalable web services.
              </p>
              <div className="flex justify-center items-center mt-6 space-x-6">
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                  ⏱️ 180 minutes
                </span>
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
                  📈 Projects Level
                </span>
              </div>
            </div>
          </ScrollAnimation>

          {/* Navigation */}
          <ScrollAnimation>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section.icon} {section.title}
                  </button>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Content */}
          {renderContent()}

          {/* Navigation Footer */}
          <ScrollAnimation>
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                REST API Development • Projects Level
              </div>
              <div className="flex space-x-4">
                <a 
                  href="/theory" 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  ← Back to Topics
                </a>
                <a 
                  href="/challenges" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Try Challenges →
                </a>
              </div>
            </div>
          </ScrollAnimation>

        </div>
      </div>
    </Layout>
  );
};

export default RestApiPage;