const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const basePath = __dirname;

http.createServer((req, res) => {
  let filePath = req.url === '/' 
    ? path.join(basePath, 'homepage.html') 
    : path.join(basePath, req.url);

  const extname = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Página não encontrada');
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[extname] || 'application/octet-stream' });
      res.end(content, 'utf-8');
    }
  });
}).listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
