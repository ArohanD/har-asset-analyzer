import * as puppeteer from "puppeteer";
const getPort = 3000
import fastify from 'fastify'

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://example.com");
//   await page.screenshot({ path: "example.png" });

//   await browser.close();
// })();

const server = fastify({ logger: true })

// Declare a route
server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

server.post('/test', async (request, reply) => {
  console.log(request.body)
})

// Run the server!
const start = async (port: number) => {
  try {
    await server.listen(port)
    console.log('Server live on port ' + port)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

export default start;
