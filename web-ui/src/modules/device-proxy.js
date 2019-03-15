import { showSnackbar } from './snackbar.js';

class DeviceProxy extends EventTarget {
  wsClient = undefined;

  connect(server) {
    console.log('Connect WebSocket to:', server);

    try {
      this.wsClient = new WebSocket(server, '13');
      this.wsClient.onmessage = this.onMessage.bind(this);

      this.wsClient.onopen = this.onConnected.bind(this);
      this.wsClient.onerror = this.onConnectionFailed.bind(this);
    } catch (e) {
      console.error(e);
      showSnackbar(`Error trying to connect WebSocket: ${e}`);
    }
  }

  onMessage(msg) {
    const { event, data } = JSON.parse(msg.data);
    this.dispatchEvent(new CustomEvent(event, { detail: data }));
  }

  onConnected() {
    showSnackbar('Connected');
  }

  onConnectionFailed() {
    showSnackbar(`Connection error: ${e}`);
  }

  send(msg) {
    this.wsClient.send(JSON.stringify(msg));
  }

  setColor(red, green, blue) {
    this.send({
      command: 'setColor',
      data: { red, green, blue },
    });
  }
}

export const deviceProxy = new DeviceProxy();
