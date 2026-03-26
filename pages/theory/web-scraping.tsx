import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ScrollAnimation from '../../components/ScrollAnimation';

const WebScrapingPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: '📚' },
    { id: 'requests-basics', title: 'Requests Basics', icon: '🌐' },
    { id: 'beautifulsoup', title: 'BeautifulSoup', icon: '🍲' },
    { id: 'advanced-scraping', title: 'Advanced Scraping', icon: '⚡' },
    { id: 'handling-forms', title: 'Handling Forms', icon: '📋' },
    { id: 'best-practices', title: 'Best Practices', icon: '🛡️' },
    { id: 'practice', title: 'Practice', icon: '💪' }
  ];

  const codeExamples = {
    requestsBasics: `# Web scraping starts with making HTTP requests
import requests
import time
from urllib.parse import urljoin, urlparse

# Basic web page request
def fetch_webpage(url):
    """Fetch a webpage with basic error handling."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        return response
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

# Example usage
url = "https://httpbin.org/html"
response = fetch_webpage(url)
if response:
    print(f"Status Code: {response.status_code}")
    print(f"Content Type: {response.headers.get('content-type')}")
    print(f"Page Size: {len(response.content)} bytes")

# Handling different response types
def analyze_response(response):
    """Analyze different aspects of an HTTP response."""
    print(f"URL: {response.url}")
    print(f"Status: {response.status_code}")
    print(f"Headers: {dict(response.headers)}")
    
    # Check content type
    content_type = response.headers.get('content-type', '').lower()
    
    if 'text/html' in content_type:
        print("HTML content detected")
        return response.text
    elif 'application/json' in content_type:
        print("JSON content detected")
        return response.json()
    else:
        print(f"Other content type: {content_type}")
        return response.content

# Setting custom headers (important for scraping)
def fetch_with_headers(url):
    """Fetch webpage with custom headers to avoid blocking."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

# Session management for multiple requests
def scrape_with_session():
    """Use session for multiple requests to the same site."""
    session = requests.Session()
    
    # Set default headers for the session
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (compatible; Web Scraper 1.0)'
    })
    
    urls = [
        'https://httpbin.org/headers',
        'https://httpbin.org/ip',
        'https://httpbin.org/user-agent'
    ]
    
    for url in urls:
        try:
            response = session.get(url, timeout=10)
            response.raise_for_status()
            print(f"Fetched {url}: {response.status_code}")
            
            # Add delay between requests
            time.sleep(1)
            
        except requests.exceptions.RequestException as e:
            print(f"Failed to fetch {url}: {e}")

# Handling redirects and cookies
def handle_redirects_cookies():
    """Example of handling redirects and cookies."""
    session = requests.Session()
    
    # Allow redirects (default is True)
    response = session.get('https://httpbin.org/redirect/3', allow_redirects=True)
    print(f"Final URL after redirects: {response.url}")
    print(f"Redirect history: {[r.url for r in response.history]}")
    
    # Working with cookies
    response = session.get('https://httpbin.org/cookies/set/test_cookie/test_value')
    print(f"Cookies: {session.cookies.get_dict()}")

# Rate limiting and retries
import random
from functools import wraps

def rate_limit(calls_per_second=1):
    """Decorator to rate limit function calls."""
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

@rate_limit(calls_per_second=2)  # Max 2 requests per second
def fetch_url_with_rate_limit(url):
    """Fetch URL with rate limiting."""
    return requests.get(url, timeout=10)

# Retry mechanism for failed requests
def fetch_with_retry(url, max_retries=3, backoff_factor=1):
    """Fetch URL with exponential backoff retry."""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            if attempt == max_retries - 1:
                print(f"All {max_retries} attempts failed for {url}")
                raise e
            
            wait_time = backoff_factor * (2 ** attempt) + random.uniform(0, 1)
            print(f"Attempt {attempt + 1} failed, retrying in {wait_time:.2f}s")
            time.sleep(wait_time)

# Checking robots.txt
def check_robots_txt(base_url):
    """Check robots.txt to see scraping permissions."""
    robots_url = urljoin(base_url, '/robots.txt')
    
    try:
        response = requests.get(robots_url, timeout=10)
        if response.status_code == 200:
            print(f"Robots.txt found for {base_url}:")
            print(response.text[:500])  # Show first 500 chars
        else:
            print(f"No robots.txt found for {base_url}")
    except requests.exceptions.RequestException as e:
        print(f"Error checking robots.txt: {e}")

# Example usage
if __name__ == "__main__":
    # Example scraping workflow
    base_url = "https://httpbin.org"
    
    # Check robots.txt first
    check_robots_txt(base_url)
    
    # Scrape multiple pages with session
    scrape_with_session()`,

    beautifulSoup: `# BeautifulSoup for HTML parsing
from bs4 import BeautifulSoup
import requests
import re

# Basic HTML parsing
def parse_html_basic():
    """Basic HTML parsing with BeautifulSoup."""
    html_content = """
    <html>
        <head>
            <title>Sample Page</title>
        </head>
        <body>
            <h1 class="main-title">Welcome to Web Scraping</h1>
            <div class="content">
                <p id="intro">This is an introduction paragraph.</p>
                <p class="highlight">This paragraph has a class.</p>
                <ul>
                    <li><a href="https://example.com">Example Link</a></li>
                    <li><a href="https://google.com">Google</a></li>
                </ul>
            </div>
            <div class="sidebar">
                <h2>Sidebar Content</h2>
                <p>Additional information here.</p>
            </div>
        </body>
    </html>
    """
    
    # Parse HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find elements by tag
    title = soup.find('title')
    print(f"Page title: {title.text}")
    
    # Find by class
    main_title = soup.find('h1', class_='main-title')
    print(f"Main title: {main_title.text}")
    
    # Find by ID
    intro = soup.find('p', id='intro')
    print(f"Intro: {intro.text}")
    
    # Find all matching elements
    all_paragraphs = soup.find_all('p')
    for i, p in enumerate(all_paragraphs):
        print(f"Paragraph {i + 1}: {p.text}")
    
    # Find all links
    links = soup.find_all('a')
    for link in links:
        print(f"Link text: {link.text}, URL: {link.get('href')}")

# CSS selectors
def parse_with_css_selectors():
    """Parse HTML using CSS selectors."""
    html = """
    <div class="container">
        <article class="post" data-id="1">
            <h2 class="post-title">First Post</h2>
            <p class="post-content">Content of first post</p>
            <div class="tags">
                <span class="tag">python</span>
                <span class="tag">web-scraping</span>
            </div>
        </article>
        <article class="post" data-id="2">
            <h2 class="post-title">Second Post</h2>
            <p class="post-content">Content of second post</p>
            <div class="tags">
                <span class="tag">javascript</span>
                <span class="tag">react</span>
            </div>
        </article>
    </div>
    """
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # CSS selectors
    posts = soup.select('article.post')
    print(f"Found {len(posts)} posts")
    
    for post in posts:
        title = post.select_one('h2.post-title').text
        content = post.select_one('p.post-content').text
        tags = [tag.text for tag in post.select('span.tag')]
        post_id = post.get('data-id')
        
        print(f"Post {post_id}: {title}")
        print(f"Content: {content}")
        print(f"Tags: {', '.join(tags)}")
        print("-" * 40)

# Advanced navigation and searching
def advanced_navigation():
    """Advanced BeautifulSoup navigation techniques."""
    html = """
    <div class="main">
        <header>
            <h1>Main Title</h1>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <section class="content">
                <h2>Section Title</h2>
                <p>First paragraph</p>
                <p>Second paragraph</p>
            </section>
        </main>
    </div>
    """
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # Navigate through parent/child relationships
    h1 = soup.find('h1')
    print(f"H1 text: {h1.text}")
    print(f"H1 parent: {h1.parent.name}")
    
    # Find siblings
    first_p = soup.find('p')
    print(f"First paragraph: {first_p.text}")
    
    # Next sibling
    next_p = first_p.find_next_sibling('p')
    if next_p:
        print(f"Next paragraph: {next_p.text}")
    
    # Find all following elements
    following_elements = first_p.find_next_siblings()
    print(f"Following elements: {[elem.name for elem in following_elements]}")
    
    # Search with custom functions
    def has_href_attribute(tag):
        return tag.has_attr('href')
    
    links_with_href = soup.find_all(has_href_attribute)
    for link in links_with_href:
        print(f"Link: {link.text} -> {link['href']}")

# Extracting data from tables
def scrape_table_data():
    """Extract data from HTML tables."""
    html = """
    <table class="data-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Alice Johnson</td>
                <td>28</td>
                <td>New York</td>
                <td>$75,000</td>
            </tr>
            <tr>
                <td>Bob Smith</td>
                <td>34</td>
                <td>Los Angeles</td>
                <td>$82,000</td>
            </tr>
            <tr>
                <td>Carol Davis</td>
                <td>29</td>
                <td>Chicago</td>
                <td>$71,000</td>
            </tr>
        </tbody>
    </table>
    """
    
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', class_='data-table')
    
    # Extract headers
    headers = []
    header_row = table.find('thead').find('tr')
    for th in header_row.find_all('th'):
        headers.append(th.text.strip())
    
    print(f"Headers: {headers}")
    
    # Extract data rows
    data = []
    tbody = table.find('tbody')
    for row in tbody.find_all('tr'):
        row_data = []
        for td in row.find_all('td'):
            row_data.append(td.text.strip())
        data.append(dict(zip(headers, row_data)))
    
    # Display extracted data
    for i, record in enumerate(data):
        print(f"Record {i + 1}:")
        for key, value in record.items():
            print(f"  {key}: {value}")
        print()

# Real-world scraping example
def scrape_news_headlines():
    """Example of scraping news headlines (educational purpose)."""
    # Note: Always check robots.txt and terms of service
    
    # Mock HTML that might come from a news site
    html = """
    <div class="news-container">
        <article class="news-item">
            <h2 class="headline">
                <a href="/article1">Breaking: Important News Event</a>
            </h2>
            <p class="summary">This is a summary of the news article...</p>
            <div class="metadata">
                <span class="author">By John Reporter</span>
                <span class="date">2024-01-15</span>
                <span class="category">Politics</span>
            </div>
        </article>
        <article class="news-item">
            <h2 class="headline">
                <a href="/article2">Technology Update: New Developments</a>
            </h2>
            <p class="summary">Summary of technology news...</p>
            <div class="metadata">
                <span class="author">By Jane Tech</span>
                <span class="date">2024-01-14</span>
                <span class="category">Technology</span>
            </div>
        </article>
    </div>
    """
    
    soup = BeautifulSoup(html, 'html.parser')
    
    news_items = soup.find_all('article', class_='news-item')
    
    articles = []
    for item in news_items:
        headline_link = item.find('h2', class_='headline').find('a')
        headline = headline_link.text.strip()
        link = headline_link.get('href')
        summary = item.find('p', class_='summary').text.strip()
        
        # Extract metadata
        metadata = item.find('div', class_='metadata')
        author = metadata.find('span', class_='author').text.replace('By ', '')
        date = metadata.find('span', class_='date').text
        category = metadata.find('span', class_='category').text
        
        article = {
            'headline': headline,
            'link': link,
            'summary': summary,
            'author': author,
            'date': date,
            'category': category
        }
        
        articles.append(article)
    
    return articles

# Text cleaning and processing
def clean_extracted_text(text):
    """Clean extracted text from HTML."""
    if not text:
        return ""
    
    # Remove extra whitespace
    text = re.sub(r'\\s+', ' ', text)
    
    # Strip leading/trailing whitespace
    text = text.strip()
    
    # Remove special characters if needed
    # text = re.sub(r'[^\\w\\s]', '', text)
    
    return text

def extract_and_clean_text():
    """Example of extracting and cleaning text."""
    html = """
    <div class="content">
        <p>   This is a paragraph with    extra spaces.   </p>
        <p>Another paragraph with\\n\\nnewlines and\\ttabs.</p>
        <div>
            <span>Nested</span>
            <span>content</span>
            <span>here</span>
        </div>
    </div>
    """
    
    soup = BeautifulSoup(html, 'html.parser')
    content_div = soup.find('div', class_='content')
    
    # Extract all text
    all_text = content_div.get_text()
    print(f"Raw text: {repr(all_text)}")
    
    # Clean text
    clean_text = clean_extracted_text(all_text)
    print(f"Cleaned text: {clean_text}")
    
    # Extract text with custom separator
    text_with_separator = content_div.get_text(separator=' | ')
    print(f"Text with separator: {text_with_separator}")

# Handling malformed HTML
def handle_malformed_html():
    """Handle malformed HTML gracefully."""
    malformed_html = """
    <html>
        <body>
            <div class="content">
                <p>Paragraph without closing tag
                <div>Nested div
                    <span>Some text</span>
                </div>
            <p>Another paragraph
        </body>
    </html>
    """
    
    # BeautifulSoup automatically fixes malformed HTML
    soup = BeautifulSoup(malformed_html, 'html.parser')
    
    # Print the fixed HTML
    print("Fixed HTML:")
    print(soup.prettify())
    
    # Extract content normally
    content = soup.find('div', class_='content')
    if content:
        print(f"Content text: {content.get_text()}")

# Example usage
if __name__ == "__main__":
    print("=== Basic HTML Parsing ===")
    parse_html_basic()
    
    print("\\n=== CSS Selectors ===")
    parse_with_css_selectors()
    
    print("\\n=== Advanced Navigation ===")
    advanced_navigation()
    
    print("\\n=== Table Data Extraction ===")
    scrape_table_data()
    
    print("\\n=== News Headlines Example ===")
    articles = scrape_news_headlines()
    for article in articles:
        print(f"Headline: {article['headline']}")
        print(f"Author: {article['author']}, Date: {article['date']}")
        print()`,

    advancedScraping: `# Advanced web scraping techniques
import requests
from bs4 import BeautifulSoup
import json
import time
import random
from urllib.parse import urljoin, urlparse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Advanced scraper class
class WebScraper:
    """Advanced web scraper with session management and error handling."""
    
    def __init__(self, base_url, delay_range=(1, 3), max_retries=3):
        self.base_url = base_url
        self.delay_range = delay_range
        self.max_retries = max_retries
        self.session = requests.Session()
        self.scraped_urls = set()
        
        # Set default headers
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        })
    
    def random_delay(self):
        """Add random delay between requests."""
        delay = random.uniform(*self.delay_range)
        logger.info(f"Waiting {delay:.2f} seconds...")
        time.sleep(delay)
    
    def fetch_page(self, url, **kwargs):
        """Fetch a page with error handling and retries."""
        for attempt in range(self.max_retries):
            try:
                self.random_delay()
                response = self.session.get(url, timeout=10, **kwargs)
                response.raise_for_status()
                
                logger.info(f"Successfully fetched: {url}")
                self.scraped_urls.add(url)
                return response
                
            except requests.exceptions.RequestException as e:
                logger.warning(f"Attempt {attempt + 1} failed for {url}: {e}")
                if attempt == self.max_retries - 1:
                    logger.error(f"All attempts failed for {url}")
                    return None
                time.sleep(2 ** attempt)  # Exponential backoff
    
    def parse_links(self, soup, base_url):
        """Extract and normalize all links from a page."""
        links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            # Convert relative URLs to absolute
            absolute_url = urljoin(base_url, href)
            
            # Only include HTTP/HTTPS links
            if absolute_url.startswith(('http://', 'https://')):
                links.append({
                    'url': absolute_url,
                    'text': link.get_text().strip(),
                    'title': link.get('title', '')
                })
        
        return links
    
    def scrape_page_data(self, url, selectors):
        """Scrape specific data from a page using CSS selectors."""
        response = self.fetch_page(url)
        if not response:
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        data = {'url': url}
        
        for key, selector in selectors.items():
            elements = soup.select(selector)
            if elements:
                if len(elements) == 1:
                    data[key] = elements[0].get_text().strip()
                else:
                    data[key] = [elem.get_text().strip() for elem in elements]
            else:
                data[key] = None
        
        return data

# Handling AJAX and dynamic content
def scrape_ajax_content():
    """Example of scraping AJAX-loaded content."""
    # Many modern websites load content via AJAX
    # You can often find the AJAX endpoints by inspecting network traffic
    
    # Example: Scraping JSON data from an API endpoint
    api_url = "https://httpbin.org/json"
    
    try:
        response = requests.get(api_url, timeout=10)
        response.raise_for_status()
        
        # Parse JSON response
        data = response.json()
        print(f"AJAX data: {json.dumps(data, indent=2)}")
        
        return data
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch AJAX content: {e}")
        return None

# Handling pagination
def scrape_paginated_content(base_url, max_pages=5):
    """Scrape content from paginated results."""
    scraper = WebScraper(base_url)
    all_data = []
    
    for page in range(1, max_pages + 1):
        page_url = f"{base_url}?page={page}"
        
        response = scraper.fetch_page(page_url)
        if not response:
            break
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract items from current page
        items = soup.find_all('div', class_='item')  # Adjust selector as needed
        
        if not items:
            logger.info(f"No items found on page {page}, stopping pagination")
            break
        
        page_data = []
        for item in items:
            item_data = {
                'title': item.find('h2').get_text().strip() if item.find('h2') else None,
                'description': item.find('p').get_text().strip() if item.find('p') else None,
                'link': item.find('a')['href'] if item.find('a') else None
            }
            page_data.append(item_data)
        
        all_data.extend(page_data)
        logger.info(f"Scraped {len(page_data)} items from page {page}")
        
        # Check if there's a next page
        next_link = soup.find('a', text='Next')
        if not next_link:
            logger.info("No next page found, stopping pagination")
            break
    
    return all_data

# Handling different content types
def handle_content_types():
    """Handle different types of web content."""
    
    # HTML content
    def scrape_html(url):
        response = requests.get(url)
        if 'text/html' in response.headers.get('content-type', ''):
            soup = BeautifulSoup(response.text, 'html.parser')
            return soup.get_text()
        return None
    
    # JSON content
    def scrape_json(url):
        response = requests.get(url)
        if 'application/json' in response.headers.get('content-type', ''):
            return response.json()
        return None
    
    # XML content
    def scrape_xml(url):
        response = requests.get(url)
        if 'application/xml' in response.headers.get('content-type', ''):
            # You can use BeautifulSoup for XML too
            soup = BeautifulSoup(response.text, 'xml')
            return soup
        return None
    
    # CSV content
    def scrape_csv(url):
        response = requests.get(url)
        if 'text/csv' in response.headers.get('content-type', ''):
            import csv
            import io
            
            csv_data = []
            reader = csv.DictReader(io.StringIO(response.text))
            for row in reader:
                csv_data.append(row)
            return csv_data
        return None

# Dealing with JavaScript-heavy sites
def handle_javascript_sites():
    """
    Note: For JavaScript-heavy sites, you might need selenium or similar tools.
    This is a placeholder showing the concept.
    """
    
    # Example using selenium (requires: pip install selenium)
    """
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    
    def scrape_with_selenium(url):
        # Setup Chrome driver (you need to download chromedriver)
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')  # Run in background
        driver = webdriver.Chrome(options=options)
        
        try:
            driver.get(url)
            
            # Wait for specific element to load
            wait = WebDriverWait(driver, 10)
            element = wait.until(
                EC.presence_of_element_located((By.CLASS_NAME, "dynamic-content"))
            )
            
            # Now parse with BeautifulSoup
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            return soup
            
        finally:
            driver.quit()
    """
    
    print("For JavaScript-heavy sites, consider using Selenium or Playwright")

# Extracting structured data (JSON-LD, microdata)
def extract_structured_data(html):
    """Extract structured data from HTML."""
    soup = BeautifulSoup(html, 'html.parser')
    
    # Extract JSON-LD structured data
    json_ld_scripts = soup.find_all('script', type='application/ld+json')
    structured_data = []
    
    for script in json_ld_scripts:
        try:
            data = json.loads(script.string)
            structured_data.append(data)
        except json.JSONDecodeError:
            continue
    
    # Extract microdata
    microdata = []
    items = soup.find_all(attrs={'itemscope': True})
    for item in items:
        item_data = {'type': item.get('itemtype')}
        properties = item.find_all(attrs={'itemprop': True})
        for prop in properties:
            prop_name = prop.get('itemprop')
            prop_value = prop.get_text().strip()
            item_data[prop_name] = prop_value
        microdata.append(item_data)
    
    return {
        'json_ld': structured_data,
        'microdata': microdata
    }

# Monitoring and alerting
class ScrapingMonitor:
    """Monitor scraping operations and alert on issues."""
    
    def __init__(self):
        self.stats = {
            'total_requests': 0,
            'successful_requests': 0,
            'failed_requests': 0,
            'errors': []
        }
    
    def log_request(self, url, success, error=None):
        """Log a request result."""
        self.stats['total_requests'] += 1
        
        if success:
            self.stats['successful_requests'] += 1
        else:
            self.stats['failed_requests'] += 1
            if error:
                self.stats['errors'].append({'url': url, 'error': str(error)})
    
    def get_success_rate(self):
        """Calculate success rate."""
        if self.stats['total_requests'] == 0:
            return 0
        return self.stats['successful_requests'] / self.stats['total_requests']
    
    def should_alert(self, threshold=0.8):
        """Check if success rate is below threshold."""
        return self.get_success_rate() < threshold
    
    def generate_report(self):
        """Generate monitoring report."""
        return {
            'success_rate': self.get_success_rate(),
            'total_requests': self.stats['total_requests'],
            'successful_requests': self.stats['successful_requests'],
            'failed_requests': self.stats['failed_requests'],
            'recent_errors': self.stats['errors'][-10:]  # Last 10 errors
        }

# Caching scraped data
import hashlib
import pickle
import os

class ScrapingCache:
    """Simple file-based cache for scraped data."""
    
    def __init__(self, cache_dir='scraping_cache', ttl=3600):
        self.cache_dir = cache_dir
        self.ttl = ttl  # Time to live in seconds
        
        if not os.path.exists(cache_dir):
            os.makedirs(cache_dir)
    
    def _get_cache_key(self, url):
        """Generate cache key from URL."""
        return hashlib.md5(url.encode()).hexdigest()
    
    def _get_cache_path(self, cache_key):
        """Get cache file path."""
        return os.path.join(self.cache_dir, f"{cache_key}.cache")
    
    def get(self, url):
        """Get cached data if available and not expired."""
        cache_key = self._get_cache_key(url)
        cache_path = self._get_cache_path(cache_key)
        
        if not os.path.exists(cache_path):
            return None
        
        # Check if cache is expired
        if time.time() - os.path.getmtime(cache_path) > self.ttl:
            os.remove(cache_path)
            return None
        
        try:
            with open(cache_path, 'rb') as f:
                return pickle.load(f)
        except (pickle.PickleError, IOError):
            return None
    
    def set(self, url, data):
        """Cache data for URL."""
        cache_key = self._get_cache_key(url)
        cache_path = self._get_cache_path(cache_key)
        
        try:
            with open(cache_path, 'wb') as f:
                pickle.dump(data, f)
        except (pickle.PickleError, IOError) as e:
            logger.error(f"Failed to cache data for {url}: {e}")

# Example usage combining advanced techniques
def advanced_scraping_example():
    """Example combining multiple advanced techniques."""
    
    # Initialize components
    scraper = WebScraper("https://httpbin.org")
    monitor = ScrapingMonitor()
    cache = ScrapingCache()
    
    urls_to_scrape = [
        "https://httpbin.org/html",
        "https://httpbin.org/json",
        "https://httpbin.org/xml"
    ]
    
    results = []
    
    for url in urls_to_scrape:
        try:
            # Check cache first
            cached_data = cache.get(url)
            if cached_data:
                logger.info(f"Using cached data for {url}")
                results.append(cached_data)
                monitor.log_request(url, True)
                continue
            
            # Fetch fresh data
            response = scraper.fetch_page(url)
            if response:
                # Process based on content type
                content_type = response.headers.get('content-type', '')
                
                if 'application/json' in content_type:
                    data = response.json()
                elif 'text/html' in content_type:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    data = {'title': soup.title.string if soup.title else None}
                else:
                    data = {'content': response.text[:100]}  # First 100 chars
                
                # Cache the result
                cache.set(url, data)
                results.append(data)
                monitor.log_request(url, True)
            else:
                monitor.log_request(url, False, "Failed to fetch")
                
        except Exception as e:
            logger.error(f"Error processing {url}: {e}")
            monitor.log_request(url, False, e)
    
    # Generate monitoring report
    report = monitor.generate_report()
    logger.info(f"Scraping completed. Success rate: {report['success_rate']:.2%}")
    
    return report

if __name__ == "__main__":
    # Run advanced scraping example
    results = advanced_scraping_example()
    print(f"Scraped {len(results)} pages successfully")`,

    handlingForms: `# Handling forms and user interactions in web scraping
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Basic form submission
def submit_basic_form():
    """Example of submitting a basic form."""
    
    # First, get the form page
    session = requests.Session()
    form_url = "https://httpbin.org/forms/post"
    
    response = session.get(form_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the form
    form = soup.find('form')
    if not form:
        print("No form found on the page")
        return
    
    print(f"Form action: {form.get('action')}")
    print(f"Form method: {form.get('method', 'GET')}")
    
    # Extract form fields
    form_data = {}
    
    # Get input fields
    for input_field in form.find_all('input'):
        field_name = input_field.get('name')
        field_type = input_field.get('type', 'text')
        field_value = input_field.get('value', '')
        
        if field_name and field_type not in ['submit', 'button']:
            form_data[field_name] = field_value
    
    # Get textarea fields
    for textarea in form.find_all('textarea'):
        field_name = textarea.get('name')
        if field_name:
            form_data[field_name] = textarea.get_text()
    
    # Get select fields
    for select in form.find_all('select'):
        field_name = select.get('name')
        if field_name:
            # Find selected option
            selected_option = select.find('option', selected=True)
            if selected_option:
                form_data[field_name] = selected_option.get('value')
            else:
                # Use first option if none selected
                first_option = select.find('option')
                if first_option:
                    form_data[field_name] = first_option.get('value')
    
    print(f"Form data extracted: {form_data}")
    
    # Fill in actual values (customize as needed)
    form_data.update({
        'custname': 'John Doe',
        'custtel': '123-456-7890',
        'custemail': 'john@example.com',
        'size': 'large',
        'topping': 'cheese',
        'delivery': '13:00'
    })
    
    # Submit the form
    action_url = urljoin(form_url, form.get('action', ''))
    method = form.get('method', 'GET').upper()
    
    if method == 'POST':
        response = session.post(action_url, data=form_data)
    else:
        response = session.get(action_url, params=form_data)
    
    print(f"Form submission status: {response.status_code}")
    return response

# Handling CSRF tokens
def handle_csrf_form():
    """Handle forms with CSRF tokens."""
    
    session = requests.Session()
    
    # Mock HTML with CSRF token
    html_with_csrf = """
    <form method="post" action="/submit">
        <input type="hidden" name="csrf_token" value="abc123xyz789">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <input type="submit" value="Login">
    </form>
    """
    
    soup = BeautifulSoup(html_with_csrf, 'html.parser')
    form = soup.find('form')
    
    # Extract CSRF token
    csrf_token = None
    csrf_input = form.find('input', attrs={'name': 'csrf_token'})
    if csrf_input:
        csrf_token = csrf_input.get('value')
        print(f"CSRF token found: {csrf_token}")
    
    # Prepare form data including CSRF token
    form_data = {
        'username': 'user123',
        'password': 'password123'
    }
    
    if csrf_token:
        form_data['csrf_token'] = csrf_token
    
    # Submit form (this is just an example - URL would be real)
    # response = session.post('https://example.com/submit', data=form_data)
    print(f"Would submit form with data: {form_data}")

# Login workflow
def login_and_scrape():
    """Complete login workflow and subsequent scraping."""
    
    session = requests.Session()
    
    # Step 1: Get login form
    login_url = "https://httpbin.org/forms/post"  # Mock login URL
    response = session.get(login_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Step 2: Prepare login data
    login_data = {
        'username': 'your_username',
        'password': 'your_password'
    }
    
    # Step 3: Submit login form
    # response = session.post(login_url, data=login_data)
    
    # Step 4: Check if login was successful
    # You might check for:
    # - Redirect to dashboard
    # - Absence of error messages
    # - Presence of logout link
    # - Specific cookies set
    
    def check_login_success(response):
        """Check various indicators of successful login."""
        
        # Check status code
        if response.status_code != 200:
            return False
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Check for error messages
        error_indicators = [
            soup.find(text=lambda text: 'invalid' in text.lower() if text else False),
            soup.find(class_='error'),
            soup.find(id='error-message')
        ]
        
        if any(error_indicators):
            return False
        
        # Check for success indicators
        success_indicators = [
            soup.find(text=lambda text: 'welcome' in text.lower() if text else False),
            soup.find(class_='dashboard'),
            soup.find('a', text='Logout')
        ]
        
        return any(success_indicators)
    
    # Step 5: Scrape protected content
    def scrape_protected_content():
        """Scrape content that requires authentication."""
        
        protected_urls = [
            'https://example.com/dashboard',
            'https://example.com/profile',
            'https://example.com/settings'
        ]
        
        data = []
        for url in protected_urls:
            try:
                response = session.get(url)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    # Extract relevant data
                    page_data = {
                        'url': url,
                        'title': soup.title.string if soup.title else None,
                        'content_length': len(response.text)
                    }
                    data.append(page_data)
                else:
                    print(f"Failed to access {url}: {response.status_code}")
            except Exception as e:
                print(f"Error accessing {url}: {e}")
        
        return data
    
    # Example usage (commented out as URLs are examples)
    # if check_login_success(login_response):
    #     protected_data = scrape_protected_content()
    #     return protected_data
    # else:
    #     print("Login failed")
    #     return None

# Handling multi-step forms
def handle_multi_step_form():
    """Handle forms that span multiple pages."""
    
    session = requests.Session()
    
    # Step 1: First form page
    def submit_step_one():
        form_data_step1 = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john@example.com'
        }
        
        # Submit first step
        # response = session.post('https://example.com/form/step1', data=form_data_step1)
        # return response
        return {"step1_submitted": True}
    
    # Step 2: Second form page
    def submit_step_two():
        form_data_step2 = {
            'address': '123 Main St',
            'city': 'Anytown',
            'zip_code': '12345'
        }
        
        # Submit second step
        # response = session.post('https://example.com/form/step2', data=form_data_step2)
        # return response
        return {"step2_submitted": True}
    
    # Step 3: Final confirmation
    def submit_final_step():
        # Final submission might just be a confirmation
        # response = session.post('https://example.com/form/confirm')
        # return response
        return {"form_completed": True}
    
    # Execute all steps
    try:
        result1 = submit_step_one()
        print(f"Step 1 result: {result1}")
        
        result2 = submit_step_two()
        print(f"Step 2 result: {result2}")
        
        final_result = submit_final_step()
        print(f"Final result: {final_result}")
        
        return True
    except Exception as e:
        print(f"Multi-step form submission failed: {e}")
        return False

# Handling file uploads
def handle_file_upload():
    """Handle forms with file uploads."""
    
    session = requests.Session()
    
    # Prepare file for upload
    files = {
        'file': ('test.txt', 'This is test file content', 'text/plain')
    }
    
    # Additional form data
    form_data = {
        'description': 'Test file upload',
        'category': 'documents'
    }
    
    try:
        # Submit form with file
        response = session.post(
            'https://httpbin.org/post',  # Test endpoint
            data=form_data,
            files=files
        )
        
        print(f"Upload status: {response.status_code}")
        
        # Check response
        if response.status_code == 200:
            result = response.json()
            print(f"Files uploaded: {result.get('files', {})}")
            print(f"Form data: {result.get('form', {})}")
            
        return response
        
    except Exception as e:
        print(f"File upload failed: {e}")
        return None

# Form automation class
class FormAutomator:
    """Automate form filling and submission."""
    
    def __init__(self, session=None):
        self.session = session or requests.Session()
        
        # Set realistic headers
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
        })
    
    def get_form_fields(self, url):
        """Extract all form fields from a page."""
        response = self.session.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        forms = []
        for form in soup.find_all('form'):
            form_info = {
                'action': form.get('action'),
                'method': form.get('method', 'GET'),
                'fields': {}
            }
            
            # Get all input fields
            for field in form.find_all(['input', 'textarea', 'select']):
                field_name = field.get('name')
                if not field_name:
                    continue
                
                field_info = {
                    'type': field.get('type', 'text'),
                    'required': field.has_attr('required'),
                    'value': field.get('value', ''),
                    'placeholder': field.get('placeholder', '')
                }
                
                # Handle select options
                if field.name == 'select':
                    options = []
                    for option in field.find_all('option'):
                        options.append({
                            'value': option.get('value'),
                            'text': option.get_text(),
                            'selected': option.has_attr('selected')
                        })
                    field_info['options'] = options
                
                form_info['fields'][field_name] = field_info
            
            forms.append(form_info)
        
        return forms
    
    def fill_form(self, form_info, field_values):
        """Fill form with provided values."""
        form_data = {}
        
        for field_name, field_info in form_info['fields'].items():
            if field_name in field_values:
                form_data[field_name] = field_values[field_name]
            elif field_info['value']:
                form_data[field_name] = field_info['value']
        
        return form_data
    
    def submit_form(self, action_url, method, form_data):
        """Submit form data."""
        try:
            if method.upper() == 'POST':
                response = self.session.post(action_url, data=form_data)
            else:
                response = self.session.get(action_url, params=form_data)
            
            return response
        except Exception as e:
            print(f"Form submission error: {e}")
            return None

# Example usage
def form_automation_example():
    """Example of automated form handling."""
    
    automator = FormAutomator()
    
    # Get forms from a page
    forms = automator.get_form_fields('https://httpbin.org/forms/post')
    
    if forms:
        form = forms[0]  # Use first form
        print(f"Found form with {len(form['fields'])} fields")
        
        # Define values to fill
        values = {
            'custname': 'Jane Doe',
            'custtel': '555-0123',
            'custemail': 'jane@example.com',
            'size': 'medium'
        }
        
        # Fill and submit form
        form_data = automator.fill_form(form, values)
        response = automator.submit_form(
            'https://httpbin.org/post',  # Mock submission URL
            form['method'],
            form_data
        )
        
        if response:
            print(f"Form submitted successfully: {response.status_code}")
        else:
            print("Form submission failed")

if __name__ == "__main__":
    print("=== Basic Form Submission ===")
    submit_basic_form()
    
    print("\\n=== CSRF Form Handling ===")
    handle_csrf_form()
    
    print("\\n=== Multi-step Form ===")
    handle_multi_step_form()
    
    print("\\n=== File Upload ===")
    handle_file_upload()
    
    print("\\n=== Form Automation ===")
    form_automation_example()`,

    bestPractices: `# Web scraping best practices and ethical considerations
import requests
from bs4 import BeautifulSoup
import time
import random
import logging
from urllib.robotparser import RobotFileParser
from urllib.parse import urljoin, urlparse
import re

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 1. Respecting robots.txt
class RobotsChecker:
    """Check robots.txt compliance before scraping."""
    
    def __init__(self, user_agent='*'):
        self.user_agent = user_agent
        self.robots_cache = {}
    
    def can_fetch(self, url):
        """Check if URL can be fetched according to robots.txt."""
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
        
        # Check cache first
        if base_url in self.robots_cache:
            rp = self.robots_cache[base_url]
        else:
            # Fetch and parse robots.txt
            rp = RobotFileParser()
            robots_url = urljoin(base_url, '/robots.txt')
            rp.set_url(robots_url)
            
            try:
                rp.read()
                self.robots_cache[base_url] = rp
                logger.info(f"Loaded robots.txt from {robots_url}")
            except Exception as e:
                logger.warning(f"Could not load robots.txt from {robots_url}: {e}")
                # If can't load robots.txt, assume scraping is allowed
                return True
        
        return rp.can_fetch(self.user_agent, url)
    
    def get_crawl_delay(self, url):
        """Get crawl delay from robots.txt."""
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
        
        if base_url in self.robots_cache:
            rp = self.robots_cache[base_url]
            return rp.crawl_delay(self.user_agent)
        return None

# 2. Rate limiting and respectful scraping
class RespectfulScraper:
    """Scraper that implements best practices for ethical scraping."""
    
    def __init__(self, base_url, min_delay=1, max_delay=3, user_agent=None):
        self.base_url = base_url
        self.min_delay = min_delay
        self.max_delay = max_delay
        self.session = requests.Session()
        self.robots_checker = RobotsChecker(user_agent or 'RespectfulScraper/1.0')
        self.last_request_time = 0
        
        # Set respectful headers
        self.session.headers.update({
            'User-Agent': user_agent or 'RespectfulScraper/1.0 (+https://example.com/bot)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0'
        })
    
    def respect_rate_limit(self, url):
        """Implement rate limiting based on robots.txt and manual settings."""
        
        # Check robots.txt for crawl delay
        robots_delay = self.robots_checker.get_crawl_delay(url)
        
        if robots_delay:
            delay = max(robots_delay, self.min_delay)
            logger.info(f"Using robots.txt crawl delay: {delay}s")
        else:
            delay = random.uniform(self.min_delay, self.max_delay)
        
        # Ensure minimum time has passed since last request
        time_since_last = time.time() - self.last_request_time
        if time_since_last < delay:
            sleep_time = delay - time_since_last
            logger.info(f"Waiting {sleep_time:.2f}s before next request")
            time.sleep(sleep_time)
        
        self.last_request_time = time.time()
    
    def fetch_page(self, url):
        """Fetch page while respecting robots.txt and rate limits."""
        
        # Check robots.txt
        if not self.robots_checker.can_fetch(url):
            logger.warning(f"robots.txt disallows fetching {url}")
            return None
        
        # Apply rate limiting
        self.respect_rate_limit(url)
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            logger.info(f"Successfully fetched: {url}")
            return response
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to fetch {url}: {e}")
            return None

# 3. Error handling and resilience
class ResilientScraper(RespectfulScraper):
    """Scraper with advanced error handling and resilience features."""
    
    def __init__(self, *args, max_retries=3, backoff_factor=2, **kwargs):
        super().__init__(*args, **kwargs)
        self.max_retries = max_retries
        self.backoff_factor = backoff_factor
        self.failed_urls = set()
        self.stats = {
            'total_requests': 0,
            'successful_requests': 0,
            'failed_requests': 0,
            'retries': 0
        }
    
    def fetch_page_with_retry(self, url):
        """Fetch page with exponential backoff retry."""
        
        if url in self.failed_urls:
            logger.info(f"Skipping previously failed URL: {url}")
            return None
        
        for attempt in range(self.max_retries):
            self.stats['total_requests'] += 1
            
            try:
                response = self.fetch_page(url)
                if response:
                    self.stats['successful_requests'] += 1
                    return response
                    
            except requests.exceptions.RequestException as e:
                self.stats['retries'] += 1
                
                if attempt == self.max_retries - 1:
                    logger.error(f"All {self.max_retries} attempts failed for {url}")
                    self.failed_urls.add(url)
                    self.stats['failed_requests'] += 1
                    return None
                
                # Exponential backoff
                wait_time = self.backoff_factor ** attempt + random.uniform(0, 1)
                logger.warning(f"Attempt {attempt + 1} failed for {url}, retrying in {wait_time:.2f}s")
                time.sleep(wait_time)
        
        return None
    
    def get_stats(self):
        """Get scraping statistics."""
        total = self.stats['total_requests']
        if total > 0:
            success_rate = self.stats['successful_requests'] / total
        else:
            success_rate = 0
        
        return {
            **self.stats,
            'success_rate': success_rate,
            'failed_urls_count': len(self.failed_urls)
        }

# 4. Content validation and quality checks
def validate_scraped_content(soup, url):
    """Validate that scraped content meets quality criteria."""
    
    validation_results = {
        'is_valid': True,
        'issues': [],
        'warnings': []
    }
    
    # Check if page has meaningful content
    text_content = soup.get_text(strip=True)
    if len(text_content) < 100:
        validation_results['warnings'].append("Page has very little text content")
    
    # Check for common error indicators
    error_indicators = [
        'access denied',
        'page not found',
        '404',
        'forbidden',
        'blocked',
        'captcha'
    ]
    
    page_text_lower = text_content.lower()
    for indicator in error_indicators:
        if indicator in page_text_lower:
            validation_results['issues'].append(f"Possible error page detected: '{indicator}'")
            validation_results['is_valid'] = False
    
    # Check for anti-bot measures
    suspicious_elements = [
        soup.find(text=re.compile(r'please enable javascript', re.I)),
        soup.find('noscript'),
        soup.find(id=re.compile(r'captcha', re.I)),
        soup.find(class_=re.compile(r'captcha', re.I))
    ]
    
    if any(suspicious_elements):
        validation_results['warnings'].append("Possible anti-bot measures detected")
    
    # Check response time (would need to be passed in)
    # if response_time > 10:
    #     validation_results['warnings'].append("Slow response time")
    
    return validation_results

# 5. Data quality and cleaning
class DataCleaner:
    """Clean and normalize scraped data."""
    
    @staticmethod
    def clean_text(text):
        """Clean and normalize text content."""
        if not text:
            return ""
        
        # Remove extra whitespace
        text = re.sub(r'\\s+', ' ', text)
        text = text.strip()
        
        # Remove zero-width characters
        text = re.sub(r'[\\u200b-\\u200d\\ufeff]', '', text)
        
        # Normalize quotes
        text = re.sub(r'[\\u2018\\u2019]', "'", text)
        text = re.sub(r'[\\u201c\\u201d]', '"', text)
        
        return text
    
    @staticmethod
    def extract_emails(text):
        """Extract email addresses from text."""
        email_pattern = r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b'
        return re.findall(email_pattern, text)
    
    @staticmethod
    def extract_phone_numbers(text):
        """Extract phone numbers from text."""
        phone_patterns = [
            r'\\(\\d{3}\\)\\s*\\d{3}-\\d{4}',  # (123) 456-7890
            r'\\d{3}-\\d{3}-\\d{4}',           # 123-456-7890
            r'\\d{3}\\.\\d{3}\\.\\d{4}',       # 123.456.7890
            r'\\d{10}'                         # 1234567890
        ]
        
        phones = []
        for pattern in phone_patterns:
            phones.extend(re.findall(pattern, text))
        
        return phones
    
    @staticmethod
    def normalize_url(url, base_url):
        """Normalize and validate URLs."""
        if not url:
            return None
        
        # Convert relative URLs to absolute
        absolute_url = urljoin(base_url, url)
        
        # Validate URL format
        if not re.match(r'https?://', absolute_url):
            return None
        
        return absolute_url

# 6. Legal and ethical considerations
class EthicalScrapingGuidelines:
    """Guidelines and checks for ethical web scraping."""
    
    @staticmethod
    def check_terms_of_service():
        """Checklist for reviewing website terms of service."""
        guidelines = [
            "✓ Read the website's Terms of Service",
            "✓ Check for explicit scraping policies",
            "✓ Look for API alternatives",
            "✓ Respect copyright and intellectual property",
            "✓ Consider contacting the website owner",
            "✓ Avoid scraping personal/private data",
            "✓ Don't overload the server",
            "✓ Identify your bot with User-Agent",
            "✓ Respect robots.txt",
            "✓ Consider legal implications in your jurisdiction"
        ]
        return guidelines
    
    @staticmethod
    def rate_limiting_guidelines():
        """Guidelines for appropriate rate limiting."""
        return {
            'minimum_delay': 1,  # seconds
            'recommended_delay': 2-5,  # seconds
            'respectful_delay': 5-10,  # seconds for sensitive sites
            'concurrent_requests': 1,  # avoid parallel requests to same domain
            'daily_limits': 'Respect any stated limits',
            'peak_hours': 'Avoid scraping during peak traffic hours'
        }

# 7. Monitoring and alerting
class ScrapingMonitor:
    """Monitor scraping operations for issues."""
    
    def __init__(self):
        self.alerts = []
        self.metrics = {
            'requests_per_minute': [],
            'error_rates': [],
            'response_times': []
        }
    
    def check_rate_limits(self, requests_in_last_minute):
        """Alert if making too many requests."""
        if requests_in_last_minute > 60:  # More than 1 per second
            self.alerts.append({
                'type': 'rate_limit_warning',
                'message': f"High request rate: {requests_in_last_minute} requests/minute",
                'timestamp': time.time()
            })
    
    def check_error_rate(self, error_rate):
        """Alert if error rate is too high."""
        if error_rate > 0.1:  # More than 10% errors
            self.alerts.append({
                'type': 'high_error_rate',
                'message': f"High error rate: {error_rate:.1%}",
                'timestamp': time.time()
            })
    
    def check_response_times(self, avg_response_time):
        """Alert if response times are too slow."""
        if avg_response_time > 10:  # Slower than 10 seconds
            self.alerts.append({
                'type': 'slow_responses',
                'message': f"Slow average response time: {avg_response_time:.2f}s",
                'timestamp': time.time()
            })
    
    def get_recent_alerts(self, hours=1):
        """Get alerts from the last N hours."""
        cutoff_time = time.time() - (hours * 3600)
        return [alert for alert in self.alerts if alert['timestamp'] > cutoff_time]

# 8. Example of comprehensive scraping workflow
def comprehensive_scraping_example():
    """Example showing all best practices together."""
    
    # Initialize components
    scraper = ResilientScraper(
        base_url="https://httpbin.org",
        min_delay=2,
        max_delay=5,
        user_agent="EthicalScraper/1.0 (+https://example.com/contact)"
    )
    
    cleaner = DataCleaner()
    monitor = ScrapingMonitor()
    
    # URLs to scrape (example)
    urls = [
        "https://httpbin.org/html",
        "https://httpbin.org/json",
        "https://httpbin.org/user-agent"
    ]
    
    scraped_data = []
    
    for url in urls:
        try:
            # Fetch with retries and rate limiting
            response = scraper.fetch_page_with_retry(url)
            
            if response:
                # Parse content
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Validate content quality
                validation = validate_scraped_content(soup, url)
                
                if validation['is_valid']:
                    # Extract and clean data
                    title = soup.title.string if soup.title else "No title"
                    text_content = soup.get_text()
                    
                    cleaned_data = {
                        'url': url,
                        'title': cleaner.clean_text(title),
                        'content_length': len(text_content),
                        'emails': cleaner.extract_emails(text_content),
                        'scraped_at': time.time()
                    }
                    
                    scraped_data.append(cleaned_data)
                    logger.info(f"Successfully processed {url}")
                else:
                    logger.warning(f"Content validation failed for {url}: {validation['issues']}")
            
        except Exception as e:
            logger.error(f"Error processing {url}: {e}")
            monitor.alerts.append({
                'type': 'processing_error',
                'message': str(e),
                'url': url,
                'timestamp': time.time()
            })
    
    # Generate final report
    stats = scraper.get_stats()
    recent_alerts = monitor.get_recent_alerts()
    
    report = {
        'scraped_items': len(scraped_data),
        'statistics': stats,
        'alerts': recent_alerts,
        'data_sample': scraped_data[:3]  # First 3 items
    }
    
    logger.info(f"Scraping completed. Success rate: {stats['success_rate']:.1%}")
    
    return report

# Best practices checklist
def print_best_practices_checklist():
    """Print comprehensive best practices checklist."""
    
    checklist = {
        'Legal & Ethical': [
            "✓ Read and comply with website Terms of Service",
            "✓ Check robots.txt and respect disallow rules",
            "✓ Identify your bot with appropriate User-Agent",
            "✓ Look for official APIs before scraping",
            "✓ Respect copyright and intellectual property",
            "✓ Consider privacy implications",
            "✓ Contact website owner if unsure about permissions"
        ],
        
        'Technical Best Practices': [
            "✓ Implement appropriate rate limiting (1-5 seconds between requests)",
            "✓ Use session management for efficiency",
            "✓ Handle errors gracefully with retries",
            "✓ Validate scraped content quality",
            "✓ Clean and normalize extracted data",
            "✓ Monitor for anti-bot measures",
            "✓ Cache results to avoid repeat requests"
        ],
        
        'Server Respect': [
            "✓ Don't overload servers with concurrent requests",
            "✓ Scrape during off-peak hours when possible",
            "✓ Use reasonable timeouts",
            "✓ Respect HTTP status codes",
            "✓ Handle redirects properly",
            "✓ Stop scraping if receiving 429 (Too Many Requests)"
        ],
        
        'Code Quality': [
            "✓ Use proper error handling and logging",
            "✓ Implement monitoring and alerting",
            "✓ Write maintainable, documented code",
            "✓ Test your scraper thoroughly",
            "✓ Handle edge cases and malformed HTML",
            "✓ Use appropriate parsing libraries"
        ]
    }
    
    print("WEB SCRAPING BEST PRACTICES CHECKLIST")
    print("=" * 50)
    
    for category, items in checklist.items():
        print(f"\\n{category}:")
        for item in items:
            print(f"  {item}")

if __name__ == "__main__":
    print("=== Best Practices Checklist ===")
    print_best_practices_checklist()
    
    print("\\n=== Comprehensive Scraping Example ===")
    report = comprehensive_scraping_example()
    print(f"Final report: {report}")`
  };

  return (
    <Layout title="Web Scraping - Python Theory">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Web Scraping
                </h1>
                <p className="text-indigo-100 text-lg">
                  Advanced Level • 75 minutes • Master web scraping with requests, BeautifulSoup, and ethical practices
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-6xl">🕷️</div>
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Web Scraping</h2>
                        
                        <p className="text-lg text-gray-700 mb-6">
                          Web scraping is the process of automatically extracting data from websites. Learn to gather information from web pages responsibly while respecting robots.txt, implementing rate limiting, and following ethical guidelines.
                        </p>

                        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 mb-8">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="text-2xl">💡</div>
                            </div>
                            <div className="ml-3">
                              <p className="text-indigo-900">
                                <strong>What you'll learn:</strong> HTTP requests with requests library, HTML parsing with BeautifulSoup, handling forms and sessions, advanced scraping techniques, and ethical scraping practices.
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Web Scraping Components</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">🌐 HTTP Requests</h4>
                            <p className="text-sm text-blue-700">Making web requests with headers, sessions, and error handling</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">🍲 HTML Parsing</h4>
                            <p className="text-sm text-green-700">Extracting data from HTML using BeautifulSoup and CSS selectors</p>
                          </div>
                          
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-2">📋 Form Handling</h4>
                            <p className="text-sm text-orange-700">Submitting forms, handling authentication, and managing sessions</p>
                          </div>
                          
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">🛡️ Ethical Practices</h4>
                            <p className="text-sm text-red-700">Respecting robots.txt, rate limiting, and legal considerations</p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li><strong>Data Collection:</strong> Gathering product prices, news articles, or research data</li>
                          <li><strong>Market Research:</strong> Competitor analysis and trend monitoring</li>
                          <li><strong>Content Aggregation:</strong> Collecting information from multiple sources</li>
                          <li><strong>Real Estate:</strong> Property listings and market data</li>
                          <li><strong>Academic Research:</strong> Collecting data for analysis and studies</li>
                          <li><strong>Automation:</strong> Automating repetitive web-based tasks</li>
                        </ul>

                        <div className="bg-red-50 border-l-4 border-red-400 p-6 mt-8">
                          <h4 className="font-semibold text-red-800 mb-3">⚠️ Important Legal Notice</h4>
                          <p className="text-red-700">
                            Always check website terms of service, respect robots.txt, and consider legal implications before scraping. Some websites prohibit scraping, and violating terms of service may have legal consequences.
                          </p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Requests Basics Section */}
                {activeSection === 'requests-basics' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Requests Basics</h2>
                      
                      <p className="text-gray-700 mb-6">
                        The requests library is the foundation of web scraping in Python. Learn to make HTTP requests, handle responses, manage sessions, and implement proper error handling.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.requestsBasics}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Key Features</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Simple API for HTTP requests</li>
                            <li>• Automatic JSON decoding</li>
                            <li>• Session management</li>
                            <li>• Cookie handling</li>
                            <li>• SSL verification</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Best Practices</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Set realistic User-Agent headers</li>
                            <li>• Use sessions for multiple requests</li>
                            <li>• Implement proper timeouts</li>
                            <li>• Handle HTTP errors gracefully</li>
                            <li>• Add delays between requests</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">Common Headers for Scraping</h4>
                        <div className="text-yellow-700 space-y-2 text-sm">
                          <p><strong>User-Agent:</strong> Identifies your bot - be honest but realistic</p>
                          <p><strong>Accept:</strong> Specify content types you can handle</p>
                          <p><strong>Accept-Language:</strong> Language preferences</p>
                          <p><strong>Referer:</strong> Previous page (if applicable)</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* BeautifulSoup Section */}
                {activeSection === 'beautifulsoup' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">BeautifulSoup</h2>
                      
                      <p className="text-gray-700 mb-6">
                        BeautifulSoup is a powerful HTML parsing library that makes it easy to extract data from web pages. Learn to navigate HTML documents, find elements, and extract meaningful information.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.beautifulSoup}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Finding Elements</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• <code>find()</code> - First match</li>
                            <li>• <code>find_all()</code> - All matches</li>
                            <li>• <code>select()</code> - CSS selectors</li>
                            <li>• <code>select_one()</code> - First CSS match</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-800 mb-2">Navigation</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• <code>.parent</code> - Parent element</li>
                            <li>• <code>.children</code> - Child elements</li>
                            <li>• <code>.next_sibling</code> - Next element</li>
                            <li>• <code>.previous_sibling</code> - Previous</li>
                          </ul>
                        </div>
                        
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-800 mb-2">Data Extraction</h4>
                          <ul className="text-sm text-teal-700 space-y-1">
                            <li>• <code>.text</code> - Text content</li>
                            <li>• <code>.get_text()</code> - Clean text</li>
                            <li>• <code>.get('attr')</code> - Attributes</li>
                            <li>• <code>['attr']</code> - Direct access</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">CSS Selectors</h3>
                      <div className="bg-gray-50 border rounded-lg p-4">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><code>.class</code> - Select by class</p>
                            <p><code>#id</code> - Select by ID</p>
                            <p><code>tag</code> - Select by tag name</p>
                          </div>
                          <div>
                            <p><code>tag.class</code> - Tag with class</p>
                            <p><code>parent &gt; child</code> - Direct child</p>
                            <p><code>ancestor descendant</code> - Any descendant</p>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Advanced Scraping Section */}
                {activeSection === 'advanced-scraping' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Scraping</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Advanced scraping techniques handle complex scenarios like pagination, AJAX content, sessions, and large-scale scraping operations with proper monitoring and caching.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.advancedScraping}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                          <h4 className="font-semibold text-indigo-800 mb-3">Advanced Techniques</h4>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• Session management and cookies</li>
                            <li>• Handling pagination automatically</li>
                            <li>• AJAX and JSON endpoint scraping</li>
                            <li>• Structured data extraction</li>
                            <li>• Content validation</li>
                          </ul>
                        </div>
                        
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                          <h4 className="font-semibold text-emerald-800 mb-3">Monitoring & Caching</h4>
                          <ul className="text-sm text-emerald-700 space-y-1">
                            <li>• Performance monitoring</li>
                            <li>• Error rate tracking</li>
                            <li>• Response time analysis</li>
                            <li>• File-based caching</li>
                            <li>• Cache invalidation</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-cyan-50 border-l-4 border-cyan-400 p-6">
                        <h4 className="font-semibold text-cyan-800 mb-3">JavaScript-Heavy Sites</h4>
                        <p className="text-cyan-700 mb-3">
                          For sites with heavy JavaScript content that loads dynamically, consider:
                        </p>
                        <ul className="text-cyan-700 space-y-1">
                          <li>• Selenium for browser automation</li>
                          <li>• Playwright for modern web automation</li>
                          <li>• Finding AJAX endpoints directly</li>
                          <li>• Using headless browsers</li>
                        </ul>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Handling Forms Section */}
                {activeSection === 'handling-forms' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Handling Forms</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Many websites require form submission for authentication or data entry. Learn to handle login forms, CSRF tokens, file uploads, and multi-step forms programmatically.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.handlingForms}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h4 className="font-semibold text-blue-800 mb-3">Form Elements</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Input fields (text, password, hidden)</li>
                            <li>• Select dropdowns</li>
                            <li>• Textarea elements</li>
                            <li>• Checkboxes and radio buttons</li>
                            <li>• File upload fields</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h4 className="font-semibold text-green-800 mb-3">Advanced Form Handling</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• CSRF token extraction</li>
                            <li>• Multi-step form workflows</li>
                            <li>• File upload handling</li>
                            <li>• Form validation responses</li>
                            <li>• Session-based authentication</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication Workflow</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">1. Get Login Form:</h5>
                          <p className="text-sm text-gray-700">Fetch the login page and extract form fields</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">2. Extract CSRF Token:</h5>
                          <p className="text-sm text-gray-700">Find hidden CSRF or security tokens</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">3. Submit Credentials:</h5>
                          <p className="text-sm text-gray-700">POST username, password, and tokens</p>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">4. Verify Success:</h5>
                          <p className="text-sm text-gray-700">Check for success indicators or error messages</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )}

                {/* Best Practices Section */}
                {activeSection === 'best-practices' && (
                  <div className="p-8">
                    <ScrollAnimation animationType="fadeInUp">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices & Ethics</h2>
                      
                      <p className="text-gray-700 mb-6">
                        Ethical web scraping requires respecting website policies, implementing proper rate limiting, and following legal guidelines. Learn to scrape responsibly while protecting both your projects and the websites you access.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{codeExamples.bestPractices}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">🛡️ Legal & Ethical</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Read Terms of Service</li>
                            <li>• Respect robots.txt</li>
                            <li>• Check for official APIs</li>
                            <li>• Avoid personal data</li>
                            <li>• Respect copyright</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h4 className="font-semibold text-orange-800 mb-3">⚡ Technical Best Practices</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Implement rate limiting</li>
                            <li>• Use proper error handling</li>
                            <li>• Cache responses when possible</li>
                            <li>• Monitor scraping performance</li>
                            <li>• Validate extracted data</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limiting Guidelines</h3>
                      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p><strong>Conservative:</strong> 5-10 seconds</p>
                            <p>For sensitive or small websites</p>
                          </div>
                          <div>
                            <p><strong>Moderate:</strong> 2-5 seconds</p>
                            <p>For most commercial websites</p>
                          </div>
                          <div>
                            <p><strong>Aggressive:</strong> 1-2 seconds</p>
                            <p>Only for very large sites that can handle it</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
                        <h4 className="font-semibold text-amber-800 mb-3">robots.txt Compliance</h4>
                        <p className="text-amber-700 mb-3">
                          Always check robots.txt before scraping. This file tells you:
                        </p>
                        <ul className="text-amber-700 space-y-1">
                          <li>• Which paths are allowed/disallowed</li>
                          <li>• Recommended crawl delay</li>
                          <li>• User-agent specific rules</li>
                          <li>• Sitemap locations</li>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: News Article Aggregator</h3>
                          <p className="text-gray-700 mb-4">
                            Build a news aggregator that collects headlines, summaries, and metadata from multiple news websites while respecting their robots.txt.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: multi-source scraping, duplicate detection, content cleaning<br/>
                              # Implement proper rate limiting and error handling<br/>
                              # Store results in structured format (JSON/CSV)
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: E-commerce Price Monitor</h3>
                          <p className="text-gray-700 mb-4">
                            Create a price monitoring system that tracks product prices across different e-commerce platforms and alerts on price changes.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: price comparison, historical tracking, email alerts<br/>
                              # Handle different site structures and anti-bot measures<br/>
                              # Implement caching and monitoring dashboard
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 3: Social Media Content Analyzer</h3>
                          <p className="text-gray-700 mb-4">
                            Build a tool that analyzes publicly available social media content for sentiment analysis and trend detection.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: content extraction, sentiment analysis, trend visualization<br/>
                              # Handle pagination, user profiles, and engagement metrics<br/>
                              # Respect platform terms of service and rate limits
                            </code>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: Real Estate Market Research</h3>
                          <p className="text-gray-700 mb-4">
                            Develop a comprehensive real estate scraper that collects property data, analyzes market trends, and generates reports.
                          </p>
                          <div className="bg-white rounded-md p-4 border">
                            <code className="text-sm text-gray-800">
                              # Features: property details, price analysis, location mapping<br/>
                              # Handle form-based searches and complex pagination<br/>
                              # Generate market trend reports and visualizations
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h3>
                        <p className="text-indigo-100 mb-6">
                          Take our interactive quiz to see how well you've mastered web scraping techniques!
                        </p>
                        <button 
                          onClick={() => window.location.href = '/test/web-scraping'}
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

export default WebScrapingPage; 