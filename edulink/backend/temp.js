const https = require('https');

// Your Google Custom Search API key
const apiKey = 'AIzaSyALEwRhs0xIkEfkuYOEbldA1thTp5QMkBY';
// Your Custom Search Engine ID
const searchEngineId = 'e1ff73ad27a3d4b69';
// Query to search for
const query = 'related institutes of nust';

// URL for the Google Custom Search API
const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}&searchType=image`;


// Make a GET request to the API
https.get(apiUrl, (response) => {
  let data = '';

  // Collect the response data
  response.on('data', (chunk) => {
    data += chunk;
  });

  // Process the response data once all data has been collected
  response.on('end', () => {
    // Parse the JSON response
    const json = JSON.parse(data);

    // Print the JSON response
    console.log(json);
  });
}).on('error', (error) => {
  console.error(error);
});
