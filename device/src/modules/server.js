import WebSocket from 'ws';

import { blink } from './led';
import { setColor } from './rgb-led';

const connections = [];

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
  connections.push(newConnetion);

  newConnetion.on('message', function onWsRequest(payload) {
    blink();
    console.log(`[WS] ${payload}`);

    payload = JSON.parse(payload);
    switch (payload.command) {
      case 'setColor':
        setColor(payload.data.red, payload.data.green, payload.data.blue);

        for (let connection of connections) {
          connection.send(JSON.stringify({ event: 'colorUpdated', data: payload.data }))
        }
        break;

      default:
        console.log(`Unknown command: ${payload.command}`)
    }
  });
}
