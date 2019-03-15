# Espruiono 8266 Playground

## Prerequisites

* Install Node.JS v11
* Install Python 
* Install the [Espruino IDE](https://chrome.google.com/webstore/detail/espruino-web-ide/bleoifhkdalbjfbobjackfdifdneehpo)
* Install the [micro controller driver](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers) 
* Clone the [repository](https://github.com/MaibornWolff/espruino8266-playground)

## Flashing hardware

    $ cd device
    $ pip install esptool
    $ npm install
    $ npm run flash
    
## Connecting the Espruino IDE
 
* Settings -> Communications -> Baud rate: 115200
* Connect to /dev/cu.SLAB_USBtoUART

## First example code

Paste the following code in the left editor pane:

    var  on = false;
    setInterval(function() {
      on = !on;
      NodeMCU.D4.write(on);
    }, 500);

Upload the code and the blue LED indicator should blink.

## Let's go!

### Build the backend

    $ npm run build
    
Watch mode

    $ npm run watch
    
### Run the frontend

    $ npm install
    $ npm start

