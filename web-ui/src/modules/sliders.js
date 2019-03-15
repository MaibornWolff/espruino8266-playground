import { getControl } from './controls.js';
import { deviceProxy } from './device-proxy.js';

const redSlider = getControl('#red-slider');
const greenSlider = getControl('#green-slider');
const blueSlider = getControl('#blue-slider');

export function initSliders() {
  [redSlider, greenSlider, blueSlider].forEach(function (input) {
    input.addEventListener('change', setColorBySliders);
  });

  deviceProxy.addEventListener('colorUpdated', onColorUpdated)
}

function setColorBySliders() {
  deviceProxy.setColor(redSlider.value, greenSlider.value, blueSlider.value);
}

function onColorUpdated(event) {
  const { red, green, blue } = event.detail;
  redSlider.value = red;
  greenSlider.value = green;
  blueSlider.value = blue;
}
