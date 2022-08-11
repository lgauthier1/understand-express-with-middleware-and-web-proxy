# Description 
Resource for understanding Express middleware chaining and web proxy usage

# Installation
```bash
npm install
```

# Setup a web Proxy 
Recommanded: https://github.com/garily/nodejs-forward-proxy-server

# Understanding without proxy

1. Get Data
```bash
curl http://localhost:3000
```

2. Get with a dedicated filetering middleware
```bash
curl http://localhost:3000/filteredData
```

# Understanding with web Proxy

1. Get Data through Web proxy 
```bash
curl http://localhost:3000/proxyData
```

2. Get data through a proxy with a dedicated filetering middleware
```bash
curl http://localhost:3000/filteredData
```
