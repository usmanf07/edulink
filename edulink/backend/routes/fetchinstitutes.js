const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const google = require('google');
let Uni = require('../models/university.model');

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
            const filenames = ["pic1.jpeg", "pic2.jpeg", "pic3.jpeg", "pic4.jpeg", "pic5.jpeg"];
            const randomIndex = Math.floor(Math.random() * filenames.length);
            const randomFilename = filenames[randomIndex];
            const logo = `${randomFilename}`;
            jobs.push({
              uniID,
              uniName,
              href,
              lastApplyDate,
              logo: logo,
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
      key: 'AIzaSyAD4EitZQW3LhE6Kp1u8-N4oJ5B1pPSiBo',
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

  router.get('/auto-suggest', async (req, res) => {
    let { query } = req.query;
  let googlequery = query + ' institute';
  
    try {
      console.log('Query:', query);
      const universities = await Uni.find({ name: { $regex: new RegExp(query, 'i') } })
        .limit(5)
        .select('name');
      
      console.log('Universities:', universities);

      console.log(universities);
      const universitySuggestions = universities.map(university => ({
        title: university.name,
        url: university.name, 
        isRegistered: true, 
      }));
  
      const url = 'https://www.googleapis.com/customsearch/v1';
      const params = {
        key: 'AIzaSyAD4EitZQW3LhE6Kp1u8-N4oJ5B1pPSiBo',
        cx: 'd747bd398b1884125',
        q: googlequery,
        num: 2,
        siteSearch: 'edu.pk',
      };
  
      const response = await axios.get(url, { params });
  
      const googleSuggestions = response.data.items.map(item => ({
        title: item.title,
        url: item.link,
        isRegistered: false, // Add a flag to indicate it's not a university suggestion
      }));
  
      const suggestions = [...universitySuggestions, ...googleSuggestions];
  
      res.json({ suggestions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching suggestions.' });
    }
  });
  
  
  

module.exports = router;