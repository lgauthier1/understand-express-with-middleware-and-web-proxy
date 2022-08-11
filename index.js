const httpProxy = require('http-proxy')
const HttpsProxyAgent = require('https-proxy-agent')
const express = require('express')
const app = express()
const port = 3000

const httpsAgent = new HttpsProxyAgent({ host: 'localhost', port: "2560" })
const proxy = httpProxy.createProxyServer({ agent: httpsAgent, toProxy: true })


app.get('/', (req, res, next) => {
  res.json([{ 'name': 'laurent' }, { 'name': 'John' }, { 'name': 'Snow' }])
})

app.get('/filteredData', (req, res, next) => {
  res.body = ([{ 'name': 'laurent' }, { 'name': 'John' }, { 'name': 'Snow' }])
  next()
}, (req, res) => {
  return res.json(res.body.filter(d => d.name === 'laurent'))
})

app.get('/proxyData', (req, res, next) => {
  req.url = '/'
  proxy.web(req, res, { changeOrigin: true, target: 'http://localhost:3000' })
})

app.get('/proxyDataFiltered', (req, res, next) => {
  req.url = '/'
  proxy.web(req, res, { changeOrigin: true, target: 'http://localhost:3000', selfHandleResponse: true }, next)
  proxy.on('proxyRes', function (proxyRes, req, res) {
    var body = []
    proxyRes.on('data', function (chunk) {
      body.push(chunk);
    })
    proxyRes.on('end', function () {
      res.body = JSON.parse(Buffer.concat(body).toString())
      next()
    })
  })
}, (req, res) => {
  const data = res.body
  res.json(data.filter(d => d.name === 'laurent'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
