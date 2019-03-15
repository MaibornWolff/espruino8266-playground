import { connectToWifi } from './networking';
import { setColor } from './rgb-led';
import { startWebServer } from './server';

const WIFI_HOSTNAME = 'espruino8266_1234';
const WIFI_SSID = '<SSID>'
const WIFI_PASSWORD = '<PASSWORD>';

function onInit() {
  console.log('Connecting to Wifi...');
  setColor(0, 0, 255);

  connectToWifi(WIFI_HOSTNAME, WIFI_SSID, WIFI_PASSWORD)
    .then(() => console.log('Connection successful'))
    .then(() => startWebServer())
    .then(() => setColor(0, 255, 0))
    .catch(e => {
      console.log('Connection failed', e);
      setColor(255, 0, 0);
    });
};

onInit();
