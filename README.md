# Espruiono 8266 Playground

## Prerequisites

* Installed Node.JS v11
* Installed Python
* Installed [Micro controller driver](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)
* (optional) [Espruino IDE](https://chrome.google.com/webstore/detail/espruino-web-ide/bleoifhkdalbjfbobjackfdifdneehpo)
* Cloned [repository](https://github.com/MaibornWolff/espruino8266-playground)
* esptool (can be installed via python's pip)

### Installation on macOS

Having [brew](https://brew.sh/) installed:

```bash
# Note: python and git should be pre-installed on macOS

brew install n
n latest

pip install esptool
```


### Installation on Windows

Having [chocolatey](https://chocolatey.org/) installed:

```bash
choco install git
choco install python2
choco install nodejs

pip install esptool

npm install --global --production windows-build-tools
npm config set msvs_version 2015 --global
```


## Flashing the hardware

```bash
cd device
npm install
npm run device:flash
npm run espruino:reset
```


## (optional) Connecting the Espruino IDE

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
