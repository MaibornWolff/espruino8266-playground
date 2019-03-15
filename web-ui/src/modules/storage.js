export function loadSettings() {
  return JSON.parse(localStorage.getItem('appSettings'));
}

export function getSetting(key) {
  return loadSettings()[key];
}

export function saveSetting(key, value) {
  const settings = loadSettings() || {};
  settings[key] = value;
  localStorage.setItem('appSettings', JSON.stringify(settings));
}
