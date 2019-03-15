import { getControl } from './controls.js';
import { deviceProxy } from './device-proxy.js';

const recordBtn = getControl('#record');
const speechMsg = getControl('#speech-msg');

let recognition;

const colors = ["rot", "grün", "blau"];
const colorMap = {
  aus: [0, 0, 0],
  rot: [255, 0, 0],
  'grün': [0, 255, 0],
  blau: [0, 0, 255],
  lila: [255, 0, 255],
  'weiß': [255, 255, 255],
};
const grammar =
  "#JSGF V1.0; grammar colors; public <color> = " +
  colors.join(" | ") +
  " ;";

export function initSpeechRecognition() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = "de-DE";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = onResult;
  recognition.onspeechend = onSpeechEnd;
  recognition.onnomatch = onNoMatch;
  recognition.onerror = onError;
  recordBtn.onclick = onStart;
}

function onStart() {
  recognition.start();
  recordBtn.classList.add("red");
  speechMsg.textContent = "Ready to receive a color command.";
  };

function onResult(event) {
  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;
  speechMsg.textContent = `Result received: ${color}.\r\n`
    + `Confidence: ${event.results[0][0].confidence}`;

  const res = colorMap[color];
  if (!res) {
    speechMsg.textContent += `\r\n`
      + `No matching color found for "${color}".`;
    return;
  }

  speechMsg.textContent += `\r\n`
   + `Matching color found: ${JSON.stringify(res)}`;

  deviceProxy.setColor(...res);
}

function onSpeechEnd() {
  recordBtn.classList.remove("red");
  recognition.stop();
}

function onNoMatch(event) {
  speechMsg.textContent = "I didnt recognise that color.";
}

function onError(event) {
  speechMsg.textContent = "Error occurred in recognition: " + event.error;
}
