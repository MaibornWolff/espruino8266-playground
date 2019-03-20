const LED = NodeMCU.D4;

export function blink() {
  digitalPulse(LED, 0, 1);
}
