
const { spawn } = require('child_process');
const router = require('express').Router();


router.route('/:subjectname').get((req, res) => {
    const subjectname = req.params.subjectname;
    const script = spawn('python', [`${subjectname}.py`]);
    let data = '';
  
    // Retrieve the JSON data from the Python script
    script.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });
  
    // Send the JSON data to the front end
    script.on('close', () => {
      res.json(JSON.parse(data));
    });
});
  
module.exports = router;
