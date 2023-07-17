#! /usr/bin/env node

const { workerData } = require('worker_threads');

const 
  port = (process.argv[2] || process.env.PORT || 3000);
  http = require('http');

http.createServer((req, res) => {
  
  //abort favicon.ico request
  if ( req.url.includes('favicon.ico')){
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }
  
  console.log(req.url);
  const nameArg = capitalize( req.url.replace(/[^\w.,-]/g, ' ').replace(/\s+/g, ' ').trim() || 'world');

  res.statusCode = 200;
  res.setHeader('Context-Type', 'text/html');
  res.end(`<h1>Hello, ${nameArg}</h1>`)
}).listen(port)

console.log(`Server running at https://localhost:${port}`);

//capitalize the first letter
function capitalize(str) {
  
  return str
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}