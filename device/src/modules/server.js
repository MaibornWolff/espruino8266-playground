import WebSocket from 'ws';

export function startWebServer() {
  const server = WebSocket.createServer(onPageRequest)
  server.listen(80);
  server.on('websocket', initSocket);
}

function onPageRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  res.end('404: Page ' + parsedUrl.path + ' not found.');
}

function initSocket(newConnetion) {
  console.log('[WS] New connection.')
}
