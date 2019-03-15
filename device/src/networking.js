import { promisify } from 'es6-promisify';
import Wifi from 'Wifi';

export function startWifiAP(ssid, password) {
  Wifi.startAP(ssid, { password: password, authMode: 'wpa2' },
    (err) => {
      if (err) throw err;
      console.log('WiFi created.');
    }
  );
}

export function connectToWifi(hostname, ssid, password) {
  Wifi.on('connected', res => console.log('Connected to WiFi:', res.ip));
  Wifi.on('disconnected', res => console.log('Disconnected from WiFi', res));

  return promisify(Wifi.setHostname)(hostname)
    .then(() => promisify(Wifi.connect)(ssid, { password: password }));
}
