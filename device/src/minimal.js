import { config } from './config';
import { connectToWifi } from './modules/networking';

const WIFI_HOSTNAME = 'espruino8266_1234';
const WIFI_SSID = config.wifi.ssid;
const WIFI_PASSWORD = config.wifi.password;

function onInit() {
  console.log('\n>>> Starting Espruino8266 <<<\n');

  console.log('Connecting to Wifi...');

  connectToWifi(WIFI_HOSTNAME, WIFI_SSID, WIFI_PASSWORD)
    .then(() => console.log('Connection successful'))
    .then(() => console.log('\n>>> READY <<<\n'))
    .catch(e => {
      console.log('Could not start Espruino8266 due to:', e);
    });
};

onInit();
