const LEDS = {
  RED: NodeMCU.D0,
  GREEN: NodeMCU.D1,
  BLUE: NodeMCU.D2,
}

export function setColor(red, green, blue) {
  console.log(`setColor`, red, green, blue);
}
