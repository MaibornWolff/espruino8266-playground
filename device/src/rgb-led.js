const LEDS = {
  RED: NodeMCU.D0,
  GREEN: NodeMCU.D1,
  BLUE: NodeMCU.D2,
}

pinMode(LEDS.RED, 'output');
pinMode(LEDS.GREEN, 'output');
pinMode(LEDS.BLUE, 'output');

export function setColor(red, green, blue) {
  console.log(`setColor`, red, green, blue);

  red = Math.floor(red / 255 * 100) / 100;
  red = Math.max(0, Math.min(1, red)) || 0;

  green = Math.floor(green / 255 * 100) / 100;
  green = Math.max(0, Math.min(1, green)) || 0;

  blue = Math.floor(blue / 255 * 100) / 100;;
  blue = Math.max(0, Math.min(1, blue)) || 0;

  console.log(`=>`, red, green, blue);
  analogWrite(LEDS.RED, red);
  analogWrite(LEDS.GREEN, green);
  analogWrite(LEDS.BLUE, blue)
}
