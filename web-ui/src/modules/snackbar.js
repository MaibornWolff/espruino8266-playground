import { getControl } from './controls.js';

const snackbar = getControl('#snackbar');

export function showSnackbar(message) {
  snackbar.MaterialSnackbar.showSnackbar({ message });
}
