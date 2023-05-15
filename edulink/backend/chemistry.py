import requests
from bs4 import BeautifulSoup
import random
import json

# Generate 10 random question numbers between 1025 and 1075
question_numbers = random.sample(range(1077, 1115), 10)

questions = []

for i in question_numbers:
    # Define the URL of the page to scrape
    url = f'http://www.entrytest.com/practice/chemistry-question-{i}kkksqchem.aspx'

    # Send a GET request to the URL and retrieve the HTML content
    response = requests.get(url)
    html_content = response.text

    # Parse the HTML content with BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the question and options elements by their HTML tags and class names
    question_element = soup.find('div', {'class': 'Analogy'})
    options_elements = question_element.find_all('li')

    # Extract the text content of the question element
    question = question_element.find('p').text.strip()

    # Extract the text content of each options element
    options = [option.text.strip() for option in options_elements]

    # Find the correct answer element by its HTML tags and class names
    answer_element = soup.find('div', {'id': 'exp'})
    correct_answer = answer_element.find('p').text.strip().split()[-1]

    # Build a dictionary with the question, options, and correct answer
    question_dict = {
        'question': question,
        'options': options,
        'correct_answer': correct_answer
    }

    # Add the dictionary to the list of questions
    questions.append(question_dict)

# Convert the list of questions to a JSON object and print it
print(json.dumps(questions))
