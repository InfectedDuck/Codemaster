import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const APIIntegrationPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'http-basics', title: 'HTTP Basics', icon: '🌐' },
    { id: 'requests-library', title: 'Requests Library', icon: '📡' },
    { id: 'authentication', title: 'Authentication', icon: '🔐' },
    { id: 'json-apis', title: 'JSON APIs', icon: '📄' },
    { id: 'error-handling', title: 'Error Handling', icon: '⚠️' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    httpBasics: `# HTTP Request Types and Their Purposes

# GET - Retrieve data (read-only)
# Used for: Getting user info, fetching data, reading resources
# Should not modify server state
# Can be cached by browsers

# POST - Create new resources
# Used for: Creating new users, submitting forms, uploading files
# Modifies server state
# Not idempotent (multiple calls may have different effects)

# PUT - Update/replace entire resource
# Used for: Updating user profile, replacing file content
# Idempotent (same request can be repeated safely)

# PATCH - Partial update of resource
# Used for: Updating specific fields, incremental changes
# May or may not be idempotent

# DELETE - Remove resource
# Used for: Deleting users, removing files
# Idempotent (deleting already deleted resource is same result)

# Common HTTP Status Codes
"""
200 OK - Request successful
201 Created - Resource created successfully
204 No Content - Success, but no content to return
400 Bad Request - Client error in request
401 Unauthorized - Authentication required
403 Forbidden - Access denied
404 Not Found - Resource doesn't exist
405 Method Not Allowed - HTTP method not supported
422 Unprocessable Entity - Validation errors
429 Too Many Requests - Rate limit exceeded
500 Internal Server Error - Server error
502 Bad Gateway - Server received invalid response
503 Service Unavailable - Server temporarily unavailable
"""

# HTTP Headers
"""
Common Request Headers:
- Content-Type: application/json, text/html, multipart/form-data
- Authorization: Bearer token, Basic auth
- User-Agent: Client information
- Accept: Preferred response format
- Cache-Control: Caching preferences

Common Response Headers:
- Content-Type: Format of response body
- Content-Length: Size of response
- Set-Cookie: Set cookies in browser
- Cache-Control: Caching instructions
- Location: URL for redirects
"""

# URL Structure
"""
https://api.example.com:443/v1/users/123?include=profile&sort=name#section

Protocol: https
Host: api.example.com
Port: 443 (default for HTTPS)
Path: /v1/users/123
Query Parameters: include=profile&sort=name
Fragment: #section (not sent to server)
"""`,

    requestsLibrary: `import requests
import json

# Basic GET request
response = requests.get('https://httpbin.org/get')
print(response.status_code)  # 200
print(response.text)         # Response body as string
print(response.json())       # Parse JSON response

# GET with parameters
params = {
    'q': 'python',
    'sort': 'stars',
    'order': 'desc'
}
response = requests.get('https://api.github.com/search/repositories', params=params)
data = response.json()
print(f"Found {data['total_count']} repositories")

# GET with headers
headers = {
    'User-Agent': 'My Python App 1.0',
    'Accept': 'application/json'
}
response = requests.get('https://api.github.com/user', headers=headers)

# POST request with JSON data
user_data = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'age': 30
}
response = requests.post(
    'https://httpbin.org/post',
    json=user_data,  # Automatically sets Content-Type to application/json
    headers={'Authorization': 'Bearer your-token-here'}
)
print(response.json())

# POST with form data
form_data = {
    'username': 'john_doe',
    'password': 'secret123'
}
response = requests.post('https://httpbin.org/post', data=form_data)

# File upload
files = {'file': open('document.pdf', 'rb')}
response = requests.post('https://httpbin.org/post', files=files)
files['file'].close()  # Don't forget to close file

# PUT request (update resource)
updated_data = {
    'name': 'John Smith',
    'email': 'john.smith@example.com'
}
response = requests.put('https://httpbin.org/put', json=updated_data)

# PATCH request (partial update)
patch_data = {'email': 'newemail@example.com'}
response = requests.patch('https://httpbin.org/patch', json=patch_data)

# DELETE request
response = requests.delete('https://httpbin.org/delete')

# Session for persistent connections and cookies
session = requests.Session()
session.headers.update({'User-Agent': 'My App'})

# Login to get authentication cookie
login_data = {'username': 'user', 'password': 'pass'}
session.post('https://example.com/login', data=login_data)

# Subsequent requests use the same session
response = session.get('https://example.com/dashboard')  # Uses auth cookie

# Timeout handling
try:
    response = requests.get('https://httpbin.org/delay/10', timeout=5)
except requests.exceptions.Timeout:
    print("Request timed out")

# Connection error handling
try:
    response = requests.get('https://nonexistent-domain.com')
except requests.exceptions.ConnectionError:
    print("Failed to connect to server")

# Response object properties
response = requests.get('https://httpbin.org/get')
print(f"Status Code: {response.status_code}")
print(f"Headers: {response.headers}")
print(f"Cookies: {response.cookies}")
print(f"URL: {response.url}")
print(f"Response Time: {response.elapsed.total_seconds()}s")
print(f"Content Type: {response.headers.get('content-type')}")

# Stream large files
response = requests.get('https://httpbin.org/stream/1000', stream=True)
for line in response.iter_lines():
    if line:  # Filter out keep-alive chunks
        print(json.loads(line))`,

    authentication: `import requests
import base64
from datetime import datetime, timedelta

# 1. API Key Authentication
# Simple API key in header
headers = {'X-API-Key': 'your-api-key-here'}
response = requests.get('https://api.example.com/data', headers=headers)

# API key in query parameter
params = {'api_key': 'your-api-key-here'}
response = requests.get('https://api.example.com/data', params=params)

# 2. Basic Authentication
# Using requests.auth.HTTPBasicAuth
from requests.auth import HTTPBasicAuth
response = requests.get(
    'https://api.example.com/protected',
    auth=HTTPBasicAuth('username', 'password')
)

# Manual basic auth header
credentials = base64.b64encode(b'username:password').decode('ascii')
headers = {'Authorization': f'Basic {credentials}'}
response = requests.get('https://api.example.com/protected', headers=headers)

# 3. Bearer Token Authentication
# JWT or OAuth token
token = 'your-jwt-token-here'
headers = {'Authorization': f'Bearer {token}'}
response = requests.get('https://api.example.com/protected', headers=headers)

# 4. OAuth 2.0 Flow (simplified)
class OAuth2Client:
    def __init__(self, client_id, client_secret, auth_url, token_url):
        self.client_id = client_id
        self.client_secret = client_secret
        self.auth_url = auth_url
        self.token_url = token_url
        self.access_token = None
        self.refresh_token = None
        self.token_expires = None
    
    def get_authorization_url(self, redirect_uri, scope):
        """Generate authorization URL for user to visit."""
        params = {
            'response_type': 'code',
            'client_id': self.client_id,
            'redirect_uri': redirect_uri,
            'scope': scope
        }
        return f"{self.auth_url}?" + "&".join([f"{k}={v}" for k, v in params.items()])
    
    def exchange_code_for_token(self, code, redirect_uri):
        """Exchange authorization code for access token."""
        data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri,
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        
        response = requests.post(self.token_url, data=data)
        if response.status_code == 200:
            token_data = response.json()
            self.access_token = token_data['access_token']
            self.refresh_token = token_data.get('refresh_token')
            
            # Calculate expiration time
            expires_in = token_data.get('expires_in', 3600)
            self.token_expires = datetime.now() + timedelta(seconds=expires_in)
            
            return True
        return False
    
    def refresh_access_token(self):
        """Refresh access token using refresh token."""
        if not self.refresh_token:
            return False
        
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': self.refresh_token,
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        
        response = requests.post(self.token_url, data=data)
        if response.status_code == 200:
            token_data = response.json()
            self.access_token = token_data['access_token']
            
            expires_in = token_data.get('expires_in', 3600)
            self.token_expires = datetime.now() + timedelta(seconds=expires_in)
            
            return True
        return False
    
    def is_token_expired(self):
        """Check if current token is expired."""
        if not self.token_expires:
            return True
        return datetime.now() >= self.token_expires
    
    def get_authenticated_session(self):
        """Get requests session with authentication."""
        if self.is_token_expired():
            if not self.refresh_access_token():
                raise Exception("Unable to refresh token")
        
        session = requests.Session()
        session.headers.update({
            'Authorization': f'Bearer {self.access_token}'
        })
        return session

# 5. Custom Authentication
class CustomAuthHandler:
    def __init__(self, api_key, secret):
        self.api_key = api_key
        self.secret = secret
    
    def generate_signature(self, method, url, timestamp):
        """Generate HMAC signature for request."""
        import hmac
        import hashlib
        
        message = f"{method.upper()}{url}{timestamp}"
        signature = hmac.new(
            self.secret.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()
        return signature
    
    def get_auth_headers(self, method, url):
        """Generate authentication headers."""
        timestamp = str(int(datetime.now().timestamp()))
        signature = self.generate_signature(method, url, timestamp)
        
        return {
            'X-API-Key': self.api_key,
            'X-Timestamp': timestamp,
            'X-Signature': signature
        }

# Usage example
auth_handler = CustomAuthHandler('api-key', 'secret-key')
headers = auth_handler.get_auth_headers('GET', 'https://api.example.com/data')
response = requests.get('https://api.example.com/data', headers=headers)

# 6. Session-based authentication
def login_and_get_session(username, password, login_url):
    """Login and return authenticated session."""
    session = requests.Session()
    
    login_data = {
        'username': username,
        'password': password
    }
    
    response = session.post(login_url, data=login_data)
    
    if response.status_code == 200:
        # Session now has authentication cookies
        return session
    else:
        raise Exception(f"Login failed: {response.status_code}")

# Use authenticated session
session = login_and_get_session('user', 'pass', 'https://example.com/login')
dashboard_response = session.get('https://example.com/dashboard')`,

    jsonAPIs: `import requests
import json
from typing import Dict, Any, List, Optional

# Working with JSON APIs
def handle_json_response(response):
    """Properly handle JSON response with error checking."""
    try:
        # Check if request was successful
        response.raise_for_status()
        
        # Check if response contains JSON
        content_type = response.headers.get('content-type', '')
        if 'application/json' not in content_type:
            raise ValueError(f"Expected JSON, got {content_type}")
        
        # Parse JSON
        return response.json()
    
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}")
        return None
    except ValueError as e:
        print(f"Content Type Error: {e}")
        return None

# Example API client for a REST service
class APIClient:
    def __init__(self, base_url: str, api_key: str = None):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        
        # Set default headers
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Python API Client 1.0'
        })
        
        if api_key:
            self.session.headers.update({
                'Authorization': f'Bearer {api_key}'
            })
    
    def _make_request(self, method: str, endpoint: str, **kwargs) -> Optional[Dict[Any, Any]]:
        """Make HTTP request and handle response."""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        try:
            response = self.session.request(method, url, **kwargs)
            return handle_json_response(response)
        
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None
    
    def get(self, endpoint: str, params: Dict = None) -> Optional[Dict]:
        """GET request."""
        return self._make_request('GET', endpoint, params=params)
    
    def post(self, endpoint: str, data: Dict = None) -> Optional[Dict]:
        """POST request with JSON data."""
        return self._make_request('POST', endpoint, json=data)
    
    def put(self, endpoint: str, data: Dict = None) -> Optional[Dict]:
        """PUT request with JSON data."""
        return self._make_request('PUT', endpoint, json=data)
    
    def patch(self, endpoint: str, data: Dict = None) -> Optional[Dict]:
        """PATCH request with JSON data."""
        return self._make_request('PATCH', endpoint, json=data)
    
    def delete(self, endpoint: str) -> Optional[Dict]:
        """DELETE request."""
        return self._make_request('DELETE', endpoint)

# Usage example
api = APIClient('https://jsonplaceholder.typicode.com')

# Get all posts
posts = api.get('/posts')
if posts:
    print(f"Retrieved {len(posts)} posts")

# Get specific post
post = api.get('/posts/1')
if post:
    print(f"Post title: {post['title']}")

# Create new post
new_post = {
    'title': 'My New Post',
    'body': 'This is the content of my post.',
    'userId': 1
}
created_post = api.post('/posts', new_post)
if created_post:
    print(f"Created post with ID: {created_post['id']}")

# Update post
updated_data = {'title': 'Updated Post Title'}
updated_post = api.patch('/posts/1', updated_data)

# Delete post
result = api.delete('/posts/1')

# Pagination handling
def get_all_pages(api_client, endpoint, page_param='page'):
    """Get all pages of paginated results."""
    all_data = []
    page = 1
    
    while True:
        params = {page_param: page}
        response = api_client.get(endpoint, params=params)
        
        if not response or not response.get('data'):
            break
        
        all_data.extend(response['data'])
        
        # Check if there are more pages
        if not response.get('has_more', False):
            break
        
        page += 1
    
    return all_data

# Working with nested JSON
def extract_nested_data(data, path):
    """Extract data from nested JSON using dot notation."""
    keys = path.split('.')
    current = data
    
    try:
        for key in keys:
            if isinstance(current, list):
                # Handle array index
                current = current[int(key)]
            else:
                # Handle object key
                current = current[key]
        return current
    except (KeyError, IndexError, ValueError):
        return None

# Example usage
user_data = {
    'user': {
        'profile': {
            'personal': {
                'name': 'John Doe',
                'contacts': [
                    {'type': 'email', 'value': 'john@example.com'},
                    {'type': 'phone', 'value': '+1234567890'}
                ]
            }
        }
    }
}

name = extract_nested_data(user_data, 'user.profile.personal.name')
email = extract_nested_data(user_data, 'user.profile.personal.contacts.0.value')

# Rate limiting and retries
import time
from functools import wraps

def rate_limit(calls_per_second=1):
    """Decorator to rate limit API calls."""
    min_interval = 1.0 / calls_per_second
    last_called = [0.0]
    
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = min_interval - elapsed
            
            if left_to_wait > 0:
                time.sleep(left_to_wait)
            
            ret = func(*args, **kwargs)
            last_called[0] = time.time()
            return ret
        return wrapper
    return decorator

# Apply rate limiting
@rate_limit(calls_per_second=2)  # Max 2 calls per second
def api_call(url):
    return requests.get(url)

# Retry logic for failed requests
def retry_request(func, max_retries=3, delay=1):
    """Retry failed requests with exponential backoff."""
    for attempt in range(max_retries):
        try:
            return func()
        except requests.exceptions.RequestException as e:
            if attempt == max_retries - 1:
                raise e
            
            wait_time = delay * (2 ** attempt)  # Exponential backoff
            print(f"Request failed, retrying in {wait_time}s...")
            time.sleep(wait_time)

# Usage
def make_api_request():
    return requests.get('https://api.example.com/data', timeout=5)

try:
    response = retry_request(make_api_request, max_retries=3)
    data = response.json()
except requests.exceptions.RequestException as e:
    print(f"All retries failed: {e}")`,

    errorHandling: `import requests
import json
import logging
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Comprehensive error handling for API requests
class APIError(Exception):
    """Base exception for API errors."""
    def __init__(self, message, status_code=None, response=None):
        super().__init__(message)
        self.status_code = status_code
        self.response = response

class AuthenticationError(APIError):
    """Raised when authentication fails."""
    pass

class RateLimitError(APIError):
    """Raised when rate limit is exceeded."""
    pass

class ValidationError(APIError):
    """Raised when request validation fails."""
    pass

def handle_api_response(response):
    """Handle API response and raise appropriate exceptions."""
    try:
        # Raise HTTPError for bad status codes
        response.raise_for_status()
        return response.json()
    
    except requests.exceptions.HTTPError as e:
        status_code = response.status_code
        
        try:
            error_data = response.json()
            error_message = error_data.get('message', str(e))
        except json.JSONDecodeError:
            error_message = response.text or str(e)
        
        # Handle specific status codes
        if status_code == 401:
            raise AuthenticationError(error_message, status_code, response)
        elif status_code == 403:
            raise AuthenticationError("Access denied", status_code, response)
        elif status_code == 422:
            raise ValidationError(error_message, status_code, response)
        elif status_code == 429:
            raise RateLimitError("Rate limit exceeded", status_code, response)
        else:
            raise APIError(error_message, status_code, response)
    
    except json.JSONDecodeError as e:
        raise APIError(f"Invalid JSON response: {e}")

# Robust API client with error handling
class RobustAPIClient:
    def __init__(self, base_url, api_key=None, timeout=30, max_retries=3):
        self.base_url = base_url.rstrip('/')
        self.timeout = timeout
        self.session = requests.Session()
        
        # Configure retry strategy
        retry_strategy = Retry(
            total=max_retries,
            status_forcelist=[429, 500, 502, 503, 504],
            method_whitelist=["HEAD", "GET", "OPTIONS"],
            backoff_factor=1  # Wait 1, 2, 4 seconds between retries
        )
        
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)
        
        # Set default headers
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Robust Python API Client'
        })
        
        if api_key:
            self.session.headers.update({
                'Authorization': f'Bearer {api_key}'
            })
    
    def _make_request(self, method, endpoint, **kwargs):
        """Make HTTP request with comprehensive error handling."""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        # Set timeout if not provided
        kwargs.setdefault('timeout', self.timeout)
        
        try:
            logger.info(f"Making {method} request to {url}")
            response = self.session.request(method, url, **kwargs)
            
            # Log response details
            logger.info(f"Response: {response.status_code} ({response.elapsed.total_seconds():.2f}s)")
            
            return handle_api_response(response)
        
        except requests.exceptions.Timeout:
            raise APIError("Request timed out")
        
        except requests.exceptions.ConnectionError:
            raise APIError("Failed to connect to server")
        
        except requests.exceptions.RequestException as e:
            raise APIError(f"Request failed: {e}")
    
    def get(self, endpoint, params=None, **kwargs):
        """GET request with error handling."""
        return self._make_request('GET', endpoint, params=params, **kwargs)
    
    def post(self, endpoint, data=None, **kwargs):
        """POST request with error handling."""
        return self._make_request('POST', endpoint, json=data, **kwargs)
    
    def put(self, endpoint, data=None, **kwargs):
        """PUT request with error handling."""
        return self._make_request('PUT', endpoint, json=data, **kwargs)
    
    def patch(self, endpoint, data=None, **kwargs):
        """PATCH request with error handling."""
        return self._make_request('PATCH', endpoint, json=data, **kwargs)
    
    def delete(self, endpoint, **kwargs):
        """DELETE request with error handling."""
        return self._make_request('DELETE', endpoint, **kwargs)

# Usage with proper error handling
def example_api_usage():
    client = RobustAPIClient('https://api.example.com', api_key='your-key')
    
    try:
        # Get user data
        user = client.get('/users/123')
        print(f"User: {user['name']}")
        
        # Create new resource
        new_item = {
            'title': 'New Item',
            'description': 'Item description'
        }
        created_item = client.post('/items', new_item)
        print(f"Created item with ID: {created_item['id']}")
    
    except AuthenticationError as e:
        logger.error(f"Authentication failed: {e}")
        # Handle authentication error (redirect to login, refresh token, etc.)
    
    except RateLimitError as e:
        logger.warning(f"Rate limit exceeded: {e}")
        # Handle rate limiting (wait and retry, use different endpoint, etc.)
        if e.response and 'Retry-After' in e.response.headers:
            retry_after = int(e.response.headers['Retry-After'])
            logger.info(f"Retrying after {retry_after} seconds")
    
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        # Handle validation errors (show user-friendly error messages)
    
    except APIError as e:
        logger.error(f"API error: {e}")
        # Handle general API errors (show generic error message)
    
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        # Handle unexpected errors (log for debugging)

# Context manager for API operations
from contextlib import contextmanager

@contextmanager
def api_operation(operation_name):
    """Context manager for API operations with logging."""
    logger.info(f"Starting {operation_name}")
    start_time = time.time()
    
    try:
        yield
        elapsed = time.time() - start_time
        logger.info(f"Completed {operation_name} in {elapsed:.2f}s")
    
    except APIError as e:
        elapsed = time.time() - start_time
        logger.error(f"Failed {operation_name} after {elapsed:.2f}s: {e}")
        raise
    
    except Exception as e:
        elapsed = time.time() - start_time
        logger.error(f"Unexpected error in {operation_name} after {elapsed:.2f}s: {e}")
        raise

# Usage with context manager
def safe_api_operations():
    client = RobustAPIClient('https://api.example.com')
    
    with api_operation("fetch user data"):
        user_data = client.get('/users/me')
    
    with api_operation("update user profile"):
        updated_data = {'name': 'New Name'}
        client.patch('/users/me', updated_data)

# Circuit breaker pattern for API calls
import time
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED
    
    def call(self, func, *args, **kwargs):
        """Call function with circuit breaker protection."""
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time < self.timeout:
                raise APIError("Circuit breaker is OPEN")
            else:
                self.state = CircuitState.HALF_OPEN
        
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        
        except Exception as e:
            self._on_failure()
            raise
    
    def _on_success(self):
        """Handle successful call."""
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        """Handle failed call."""
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN

# Usage with circuit breaker
api_circuit_breaker = CircuitBreaker(failure_threshold=3, timeout=30)

def protected_api_call():
    client = RobustAPIClient('https://api.example.com')
    
    try:
        return api_circuit_breaker.call(client.get, '/data')
    except APIError as e:
        logger.error(f"API call failed: {e}")
        return None`
  };

  return (
    <Layout title="API Integration - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  API Integration
                </h1>
                <p className="text-purple-100 text-lg">
                  Intermediate Level • 60 minutes • Master HTTP requests, authentication, and REST APIs
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">🌐</div>
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">API Integration</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          API integration allows your Python applications to communicate with external services, fetch data, and build distributed systems. Modern applications rely heavily on APIs for functionality and data exchange.
                        </p>

                        <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-purple-900">
                                <strong>What you'll learn:</strong> HTTP methods and status codes, requests library for API calls, authentication methods, JSON data handling, error handling and retry strategies.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">API Integration Components</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">🌐 HTTP Protocol</h4>
                            <p className="text-sm text-blue-700">Methods, status codes, headers, and request/response cycle</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">📡 Requests Library</h4>
                            <p className="text-sm text-green-700">Python's powerful HTTP library for API communication</p>
                          </div>
                          
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">🔐 Authentication</h4>
                            <p className="text-sm text-orange-700">API keys, OAuth, JWT tokens, and security methods</p>
                          </div>
                          
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">⚠️ Error Handling</h4>
                            <p className="text-sm text-red-700">Robust error handling, retries, and circuit breakers</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Common API Use Cases</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Data retrieval from external services</li>
                          <li>User authentication and authorization</li>
                          <li>Payment processing and e-commerce</li>
                          <li>Social media integration</li>
                          <li>Weather, maps, and location services</li>
                          <li>Microservices communication</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* HTTP Basics Section */}
                {activeSection === 'http-basics' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">HTTP Basics</h2>
                      
                      <p className="text-gray-700 mb-6">
                        HTTP (HyperText Transfer Protocol) is the foundation of web communication. Understanding HTTP methods, status codes, and headers is essential for effective API integration.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.httpBasics}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">HTTP Methods</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <strong>GET:</strong> Retrieve data (read-only)</li>
                            <li>• <strong>POST:</strong> Create new resources</li>
                            <li>• <strong>PUT:</strong> Update entire resource</li>
                            <li>• <strong>PATCH:</strong> Partial updates</li>
                            <li>• <strong>DELETE:</strong> Remove resources</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Status Code Categories</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <strong>2xx:</strong> Success (200, 201, 204)</li>
                            <li>• <strong>3xx:</strong> Redirection (301, 302)</li>
                            <li>• <strong>4xx:</strong> Client errors (400, 401, 404)</li>
                            <li>• <strong>5xx:</strong> Server errors (500, 502, 503)</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">REST API Principles</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Stateless:</h5>
                          <p className="text-sm text-gray-700">Each request contains all necessary information</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Resource-based URLs:</h5>
                          <p className="text-sm text-gray-700">/users/123 represents a specific user resource</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">HTTP Methods for Actions:</h5>
                          <p className="text-sm text-gray-700">GET to read, POST to create, PUT/PATCH to update, DELETE to remove</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Requests Library Section */}
                {activeSection === 'requests-library' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Requests Library</h2>
                      
                      <p className="text-gray-700 mb-6">
                        The requests library is Python's most popular HTTP library. It provides a simple, elegant interface for making HTTP requests and handling responses.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.requestsLibrary}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Request Methods</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>requests.get()</code></li>
                            <li>• <code>requests.post()</code></li>
                            <li>• <code>requests.put()</code></li>
                            <li>• <code>requests.patch()</code></li>
                            <li>• <code>requests.delete()</code></li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Response Properties</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• <code>.status_code</code></li>
                            <li>• <code>.json()</code></li>
                            <li>• <code>.text</code></li>
                            <li>• <code>.headers</code></li>
                            <li>• <code>.cookies</code></li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Advanced Features</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Sessions</li>
                            <li>• File uploads</li>
                            <li>• Streaming</li>
                            <li>• Timeouts</li>
                            <li>• SSL verification</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">Requests Best Practices</h4>
                        <ul className="text-yellow-700 space-y-2">
                          <li>• Always set timeouts for requests</li>
                          <li>• Use sessions for multiple requests to the same host</li>
                          <li>• Handle exceptions appropriately</li>
                          <li>• Verify SSL certificates in production</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Authentication Section */}
                {activeSection === 'authentication' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication</h2>
                      
                      <p className="text-gray-700 mb-6">
                        API authentication ensures secure access to protected resources. Different authentication methods provide varying levels of security and complexity.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.authentication}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">Authentication Types</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• <strong>API Key:</strong> Simple token in header/query</li>
                            <li>• <strong>Basic Auth:</strong> Username:password encoded</li>
                            <li>• <strong>Bearer Token:</strong> JWT or OAuth tokens</li>
                            <li>• <strong>OAuth 2.0:</strong> Industry standard protocol</li>
                          </ul>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">Security Considerations</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Never hardcode credentials in source code</li>
                            <li>• Use environment variables for secrets</li>
                            <li>• Implement token refresh logic</li>
                            <li>• Handle authentication errors gracefully</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">OAuth 2.0 Flow</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">1. Authorization:</h5>
                          <p className="text-sm text-gray-700">Redirect user to authorization server</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">2. User Consent:</h5>
                          <p className="text-sm text-gray-700">User grants permission to application</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">3. Authorization Code:</h5>
                          <p className="text-sm text-gray-700">Server returns code to callback URL</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">4. Token Exchange:</h5>
                          <p className="text-sm text-gray-700">Exchange code for access token</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* JSON APIs Section */}
                {activeSection === 'json-apis' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">JSON APIs</h2>
                      
                      <p className="text-gray-700 mb-6">
                        JSON (JavaScript Object Notation) is the most common data format for web APIs. Understanding how to work with JSON data is essential for modern API integration.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.jsonAPIs}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">JSON Handling</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <code>response.json()</code> - Parse JSON response</li>
                            <li>• <code>json=data</code> - Send JSON in request</li>
                            <li>• Content-Type validation</li>
                            <li>• Error handling for invalid JSON</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">API Client Features</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Base URL configuration</li>
                            <li>• Default headers</li>
                            <li>• Session management</li>
                            <li>• Response parsing</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-cyan-50 border-l-4 border-cyan-400 p-6">
                        <h4 className="font-semibold text-cyan-800 mb-3">API Integration Patterns</h4>
                        <ul className="text-cyan-700 space-y-2">
                          <li>• Use type hints for better code documentation</li>
                          <li>• Implement pagination handling for large datasets</li>
                          <li>• Add rate limiting to respect API quotas</li>
                          <li>• Create wrapper classes for complex APIs</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Error Handling Section */}
                {activeSection === 'error-handling' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Handling</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Robust error handling is crucial for production API integrations. Proper error handling improves user experience and system reliability.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.errorHandling}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">Exception Types</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• <code>HTTPError</code> - HTTP status errors</li>
                            <li>• <code>ConnectionError</code> - Network issues</li>
                            <li>• <code>Timeout</code> - Request timeouts</li>
                            <li>• <code>JSONDecodeError</code> - Invalid JSON</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">Resilience Patterns</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Retry with exponential backoff</li>
                            <li>• Circuit breaker pattern</li>
                            <li>• Timeout configuration</li>
                            <li>• Graceful degradation</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Error Handling Strategy</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">1. Categorize Errors:</h5>
                          <p className="text-sm text-gray-700">Authentication, validation, rate limiting, server errors</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">2. Implement Retries:</h5>
                          <p className="text-sm text-gray-700">Automatic retries for transient failures</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">3. Log and Monitor:</h5>
                          <p className="text-sm text-gray-700">Comprehensive logging for debugging</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">4. Graceful Fallbacks:</h5>
                          <p className="text-sm text-gray-700">Provide alternative responses when APIs fail</p>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Weather API Client</h3>
                          <p className="text-gray-700 mb-4">
                            Build a weather service client that fetches current weather and forecasts with proper error handling.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: current weather, forecasts, location search<br/>
                              # Handle API rate limits and authentication<br/>
                              # Implement caching for repeated requests
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: Social Media API Aggregator</h3>
                          <p className="text-gray-700 mb-4">
                            Create a service that aggregates posts from multiple social media APIs with OAuth authentication.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Support multiple platforms (Twitter, Instagram, etc.)<br/>
                              # Implement OAuth 2.0 flow<br/>
                              # Handle rate limits and data normalization
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: E-commerce API Integration</h3>
                          <p className="text-gray-700 mb-4">
                            Build an e-commerce integration that manages products, orders, and payments across multiple platforms.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Product sync, order management, payment processing<br/>
                              # Webhook handling for real-time updates<br/>
                              # Implement retry logic and circuit breakers
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: API Gateway Client</h3>
                          <p className="text-gray-700 mb-4">
                            Create a flexible API client that can work with different microservices through an API gateway.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Service discovery, load balancing, health checks<br/>
                              # JWT token management and refresh<br/>
                              # Distributed tracing and monitoring
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-purple-100 mb-6">
                          Take our interactive quiz to see how well you've mastered API integration!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/api-integration'}
                          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

export default APIIntegrationPage; 