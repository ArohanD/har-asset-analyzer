import { getSingleReading } from './functions/getSingleReading'

import express, { request, response } from 'express'
import { pathFinder } from './utils/urls';
import { timeout } from './utils/timeout';
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('client/public'));
console.log(__dirname)

app.get('/test', async (request, response) => {
  console.log('ping on test route')

  //Check if URL is valid
  const { url, iterations } = request.query
  const saveDirectory = await pathFinder(url as string)

  for(let i = 0; i < (+iterations); i++){
    await getSingleReading(url as string, saveDirectory)
  }
  
  response.send('test complete')
})

app.get('/getAssets', async (request, response) => {
  console.log(`request for assets from ${request.query.url}`)
  await timeout(3000)
  response.send('placeholder string')

})

// Add new routes above
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => console.log(`listening from port: ${port}`));
