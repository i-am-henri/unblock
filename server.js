const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === '/proxy') {
    const targetUrl = query.url;

    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Keine URL angegeben.');
    }

    proxy.web(req, res, { target: targetUrl });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Proxy-Server</h1><p>Verwende /proxy?url=ZIELURL, um den Proxy zu nutzen.</p>');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Der Server läuft auf Port ${PORT}`);
});
