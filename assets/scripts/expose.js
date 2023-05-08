// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const horn = document.getElementById("horn-select");
  const img = document.querySelector("img");
  const vol = document.getElementById("volume");
  const volumeImg = document.querySelector("#volume-controls img");
  const aud = document.querySelector("audio");
  const but = document.querySelector("button");
  let bool = false;
  horn.addEventListener("change", (event) => {
    const value = event.target.value;
    // console.log(value);
    if (value == "air-horn") {
      img.src = "assets/images/air-horn.svg"
      aud.src = "assets/audio/air-horn.mp3"
    } else if (value == "car-horn") {
      img.src = "assets/images/car-horn.svg"
      aud.src = "assets/audio/car-horn.mp3"
    } else {
      img.src = "assets/images/party-horn.svg"
      aud.src = "assets/audio/party-horn.mp3"
      bool = true;
    }
  });

  vol.addEventListener("change", () => {
    // console.log(vol.value);
    let val = vol.value;
    aud.volume = val*0.01;
    if (val <= 0) {
      volumeImg.src = "assets/icons/volume-level-0.svg";
    } else if (val < 33) {
      volumeImg.src = "assets/icons/volume-level-1.svg";
    } else if (val < 67) {
      volumeImg.src = "assets/icons/volume-level-2.svg";
    } else {
      volumeImg.src = "assets/icons/volume-level-3.svg";
    }
  });
  
  const jsConfetti = new JSConfetti({img});
  but.addEventListener("click", () => {
    aud.play();
    if (bool)
      jsConfetti.addConfetti()
  });
}