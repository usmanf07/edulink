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

  router.route('/searchWebsite').get(async (req, res) => {
    const { query } = req;
  
    google.resultsPerPage = 1;
  
    google(query.institute + ' website', (err, response) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while performing the search.' });
        return;
      }
  
      if (!response.links || response.links.length === 0) {
        res.status(404).json({ error: 'No website link found.' });
        return;
      }
  
      const websiteLink = response.links[0].href;
      res.json({ website: websiteLink });
    });
  });
module.exports = router;