import { getControl } from './modules/controls.js';
import { deviceProxy } from './modules/device-proxy.js';
import { initSliders } from './modules/sliders.js';
import { initSpeechRecognition } from './modules/speech.js';
import { loadSettings, saveSetting } from './modules/storage.js';

function onInit() {
  const settings = loadSettings() || {};
  const connectButton = getControl('#connect');

  connectButton.addEventListener('click', function() {
    const server = getControl('#server').value;
    saveSetting('server', server);
    deviceProxy.connect(server);
  });

  console.info('Initial settings', settings);
  if (settings.server) {
    getControl('#server').value = settings.server;
    deviceProxy.connect(settings.server);
  }

  initSliders();
  initSpeechRecognition();
}

try {
  onInit();
} catch(e) {
  getControl('#debug').textContent = JSON.stringify(e);
}
