# Espruiono 8266 Playground

## Prerequisites

* Install Node.JS v11
* Install Python
* Install the [Espruino IDE](https://chrome.google.com/webstore/detail/espruino-web-ide/bleoifhkdalbjfbobjackfdifdneehpo)
* Install the [micro controller driver](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)
* Clone the [repository](https://github.com/MaibornWolff/espruino8266-playground)

* Install esptool via pip: `pip install esptool`


## Flashing hardware

```bash
cd device
npm install
npm run device:flash
npm run espruino:reset
```


## (Optional) Connecting the Espruino IDE

* Settings -> Communications -> Baud rate: 115200
* Connect to `/dev/cu.SLAB_USBtoUART` or `COM#`


### First example code

Paste the following code in the left editor pane:

```js
const LED = NodeMCU.D4;

let on = false;
setInterval(function() {
  on = !on;
  LED.write(on);
}, 500);
```

Upload the code and the blue LED indicator should blink.


## Let's go!

### Build the backend

Run the following in a console, to create a serial connection that uploads the code to the micro controller:

```bash
npm run espruino:console
```

Now use another terminal to build to backend:

```bash
# Build once...
npm run build

# ... or keep build task in watch mode
npm run build:watch
```

### Run the frontend

Use a different terminal for running the frontend:

```bash
cd <project>/web-ui
npm install
npm start
```


## Resources

* [Simple WebSocket tool](http://www.websocket.org/echo.html)
* [Espruino WebSocket Server](https://www.espruino.com/WiFi+Websocket+Server)
