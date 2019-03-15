import WebSocket from 'ws';

import { blink } from './led';
import { setColor } from './rgb-led';

let wss;

const LED = NodeMCU.D4;
export function startWebServer() {
  const server = WebSocket.createServer(onPageRequest)
  server.listen(80);
  server.on('websocket', initWsServer);
}

function onPageRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.path === '/') {
    return sendHtmlFile(res, indexHtml);
  } else if (req.method === 'GET' && parsedUrl.path === '/script.js') {
    return sendJsFile(res, scriptJs);
  } else if (req.method === 'POST' && parsedUrl.path === '/set/light') {
    return handleSetLightRequest(req, res);
  } else if (req.method === 'POST' && parsedUrl.path === '/set/color') {
    return handleSetColorRequest(req, res);
  }

  res.writeHead(404, {'Content-Type': 'text/plain'});
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

function sendHtmlFile(res, content) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(content);
}

function sendJsFile(res) {
  res.writeHead(200, {'Content-Type': 'application/javascript'});
  res.end(scriptJs);
}

function handleSetLightRequest(req, res) {
  readBody(req)
    .then(body => {
      setLight(body.value);

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end({ state: body.value });
    });

}

function setLight(state) {
  // Note: HIGH and LOW are switched
  digitalWrite(LED, !state);
}

function handleSetColorRequest(req, res) {
  readBody(req)
    .then(body => {
      setColor(body.red, body.green, body.blue);

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end({ state: body.value });
    });
}

function readBody(req) {
  return new Promise(resolve => {
    let data = '';
    req.on('data', d => data += d);
    req.on('end', () => {
      const body = JSON.parse(data);
      // console.log('received data:', body);
      resolve(body);
    });
  });
}
