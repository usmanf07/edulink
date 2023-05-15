const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const google = require('google');

router.route('/').get((req, res) => {
    const provinceID = req.query.provinceID || '';
    const cityID = req.query.cityID || '';
    // console.log(cityID);
    const url = `https://mycareers.pk/index.php?action=list&pageID=13&searchJob=&dateSearch=&provinceID=${provinceID}&cityID=${cityID}&organizationID=`;
  
    axios.get(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const table = $('table.table-hover');
        const jobs = [];
  
        table.find('tr').slice(1).each((i, el) => {
            const cols = $(el).find('td');
            const uniName = cols.eq(2).find('a').text().trim();
            const uniID = cols.eq(2).find('a').text().trim();
            const href = 'https://mycareers.pk' + cols.eq(2).find('a').attr('href');
            const lastApplyDate = cols.eq(3).text().trim();
            const updated = cols.eq(1).text().trim();
            const logo = "http://localhost:8000/images/pic1.jpeg"
            jobs.push({
              uniID,
              uniName,
              href,
              lastApplyDate,
              program: "all programs",
              updated
            });
          });
          
  
        // Send the jobs array as a JSON response
        res.json(jobs);
       // console.log(jobs);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the data.' });
      });
  });

  router.route('/fetchImage').get((req, res) => {
    const imageUrl = req.query.imageUrl;
  
    axios.get(imageUrl)
      .then(response => {
        const html = response.data;
        const imageUrlRegex = /https:\/\/images\.mycareers\.pk\/jobAds\/\S+\.((jpe?g)|(png)|(gif)|(bmp))/i;
        const imageUrlMatch = html.match(imageUrlRegex);
        if (imageUrlMatch) {
          const imageUrl = imageUrlMatch[0];
          res.json({ imageUrl });
        } else {
          res.status(500).json({ error: 'Unable to find image URL.' });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the image.' });
      });
  });

  router.get('/fetch-data', async (req, res) => {
    const { query, apiKey, searchEngineId } = req.query;
  
    const url = 'https://www.googleapis.com/customsearch/v1';
    const params = {
      key: 'AIzaSyDuh1nSDLI1OarsGy_hmWfL9eTfEXryEBI',
      cx: 'd747bd398b1884125',
      q: query,
      num: 1, // Limit to the first 3 results
    };
  
    try {
      const response = await axios.get(url, { params });
      const item = response.data.items[0]; // Get the first result
      const result = {
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        logo: null, // Initialize logo to null
      };
    
      // Check if the item has a Pagemap object and contains a cse_image array
      if (item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length > 0) {
        // Set the logo URL to the first image in the cse_image array
        result.logo = item.pagemap.cse_image[0].src;
      }
    
      // Now you can process the results further or send them as a response
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  });

  router.get('/fetch-dataa', async (req, res) => {
    const { query, apiKey, searchEngineId } = req.query;
  
    const url = 'https://www.googleapis.com/customsearch/v1';
    const params = {
      key: 'AIzaSyDuh1nSDLI1OarsGy_hmWfL9eTfEXryEBI',
      cx: 'd747bd398b1884125',
      q: query,
      num: 3, 
      siteSearch: 'edu.pk',
    };
  
    try {
      const response = await axios.get(url, { params });
      const items = response.data.items.slice(0, params.num); 
      const results = items.map(item => {
        const result = {
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          logo: null, 
        };
  
        if (item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length > 0) {
         
          result.logo = item.pagemap.cse_image[0].src;
        }
  
        return result;
      });
  
      
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  });
  

  router.get('/auto-suggest', async (req, res) => {
    const { query, apiKey, searchEngineId } = req.query;
  
    const url = 'https://www.googleapis.com/customsearch/v1/siterestrict';
    const params = {
      key: 'AIzaSyDuh1nSDLI1OarsGy_hmWfL9eTfEXryEBI',
      cx: 'd747bd398b1884125',
      q: query,
      num: 10,
      siteSearch: 'edu.pk',
    };
  
    try {
      const response = await axios.get(url, { params });
      const items = response.data.items;
  
      if (items && Array.isArray(items)) {
        const suggestions = items.map(item => item.title);
        res.json(suggestions);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching suggestions.' });
    }
  });
  

module.exports = router;