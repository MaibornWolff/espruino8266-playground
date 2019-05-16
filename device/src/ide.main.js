/* Utils */

function promisify(fn) {
  return function() {
    const args = arguments;
    console.log("promisify", arguments);
    return new Promise((resolve, reject) => {
      fn.apply(
        null,
        [].concat(args, (err, res) => (err ? reject(err) : resolve(res)))
      );
    });
  };
}

/* Config */

const config = {
  wifi: {
    ssid: "MaibornWolff Coding",
    password: "<PASSWORD>"
  }
};

/* Wifi */

const Wifi = require("Wifi");

function connectToWifi(hostname, ssid, password) {
  Wifi.on("connected", res => console.log("Connected to WiFi:", res.ip));
  Wifi.on("disconnected", res => console.log("Disconnected from WiFi", res));

  return promisify(Wifi.setHostname)(hostname).then(() =>
    promisify(Wifi.connect)(ssid, { password: password })
  );
}

/* Built-in LED */

const LED = NodeMCU.D4;

function blink() {
  digitalPulse(LED, 0, 1);
}

/* RGB LED */

const LEDS = {
  RED: NodeMCU.D0,
  GREEN: NodeMCU.D1,
  BLUE: NodeMCU.D2
};

function setColor(red, green, blue) {
  console.log(`setColor`, red, green, blue);
}

/* Websocket server */
const WebSocket = require("ws");

function startWSServer() {
  const server = WebSocket.createServer(onPageRequest);
  server.listen(80);
  server.on("websocket", initSocket);
}

function onPageRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  res.end("404: Page " + parsedUrl.path + " not found.");
}

function initSocket(newConnetion) {
  console.log("[WS] New connection.");
}

/* Startup */

const WIFI_HOSTNAME = "espruino8266_1234";
const WIFI_SSID = config.wifi.ssid;
const WIFI_PASSWORD = config.wifi.password;

function onInit() {
  console.log("\n>>> Starting Espruino8266 <<<\n");

  setColor(0, 0, 255);
  console.log("Connecting to Wifi...");

  connectToWifi(WIFI_HOSTNAME, WIFI_SSID, WIFI_PASSWORD)
    .then(() => console.log("Connection successful"))
    .then(() => startWSServer())
    .then(() => setColor(0, 255, 0))
    .then(() => console.log("\n>>> READY <<<\n"))
    .catch(e => {
      console.log("Could not start Espru fanino8266 due to:", e);
      setColor(255, 0, 0);
    });
}

onInit();
