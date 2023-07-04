# Edulink a MERN Stack Project for Institutes & Students
- This is a MERN (MongoDB, Express.js, React.js, Node.js) stack-based project that serves as an Institutes Admissions Portal. The portal provides various features to help students choose their preferred institute, prepare for entry tests, and facilitate the admission process. It includes functionality to fetch the latest admission information using a Python web scraper, display nearby institutes based on location, and offers a premium option through Stripe API integration. Additionally, it provides an institute portal for managing applications, approving/disapproving applications, and generating Excel reports.
## Installation
  1. Clone the repository to your local machine.
  2. Install the dependencies for both the server and client.
     ```
       cd edulink
      npm install

      cd client
      npm install
     ```
  3. Run the command npm start
  4. Also run the backend folder using `npm run dev`

## Features
  1. Fetching Latest Institutes Admissions: The application utilizes a Python web scraper to fetch and display the latest admission information from various institutes.
  
  2. Location-based Institutes Nearby to Student: Using the Google Maps API, the portal can determine the student's location and display nearby institutes accordingly.
  
  3. Help Students Choose Their Most Preferable Institute: The portal provides a user-friendly interface to help students search and filter institutes based on their preferences, such as location, program, fee structure, etc.
  
  4. Entry Test Preparation: The portal offers resources and study materials to help students prepare for entry tests.
  
  5. Stripe API for Premium: Students can subscribe to a premium membership plan using the Stripe API integration, unlocking additional benefits and features.
  
  6. Institute Portal: Institutes can log in to the portal to manage applications, review student profiles, approve/disapprove applications, and communicate with students.
  
  7. Excel Report Statistics: The portal generates Excel reports that provide statistical information about the admission process, including application statistics, program-wise enrollment data, and fee collection details.

  8. Google Custom Search API to search institutes through out the world

## Contributing
  Contributions are welcome! Please follow these guidelines when contributing to the project:
  
  Fork the repository.
  Create a new branch for your feature or bug fix.
  Commit your changes with descriptive commit messages.
  Push your branch to your forked repository.
