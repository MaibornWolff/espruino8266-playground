const registry = {};

export function getControl(selector, force) {
  if (!registry[selector] || force) {
    registry[selector] = document.querySelector(selector);
  }
  return registry[selector];
};
