import WebSocket from 'ws';

import { blink } from './led';
import { setColor } from './rgb-led';

let wss;

export function startWebServer() {
  const server = WebSocket.createServer(onPageRequest)
  server.listen(80);
  server.on('websocket', initWsServer);
}

function onPageRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  res.end('404: Page ' + parsedUrl.path + ' not found.');
}

function initWsServer(_wss) {
  wss = _wss;
  wss.on('message', onWsRequest);
}

function onWsRequest(payload) {
  blink();
  console.log(`[WS] ${payload}`);

  payload = JSON.parse(payload);
  switch (payload.command) {
    case 'setColor':
      setColor(payload.data.red, payload.data.green, payload.data.blue);
      wss.send(JSON.stringify({ event: 'colorUpdated', data: payload.data }))
      break;

    default:
      console.log(`Unknown command: ${payload.command}`)
  }
}
