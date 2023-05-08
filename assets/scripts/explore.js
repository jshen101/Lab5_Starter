// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  
}

const synth = window.speechSynthesis;
const but = document.querySelector("button");
const inputTxt = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");
let voices = [];

let image = document.querySelector("img");

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

but.onclick = (event) => {
  event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }

  utterThis.onstart = function() {
    image.src = "assets/images/smiling-open.png";
  };

  utterThis.onend = function() {
    image.src = "assets/images/smiling.png";
  };

  synth.speak(utterThis);
};