document.addEventListener("DOMContentLoaded", () => {
  const debugEl = document.querySelector("#debug");

  const redInput = document.querySelector("#red");
  const greenInput = document.querySelector("#green");
  const blueInput = document.querySelector("#blue");

  const recordBtn = document.querySelector("#record");

  [redInput, greenInput, blueInput].forEach(input => {
    input.onchange = setColorBySliders;
  });

  function setInputValues(x, y, z) {
    redInput.value = x;
    greenInput.value = y;
    blueInput.value = z;
  }

  function setColorBySliders() {
    setColor(redInput.value, greenInput.value, blueInput.value);
  }

  async function setColor(red, green, blue) {
    try {
      await fetch("/set/color", {
        method: "POST",
        body: JSON.stringify({ red: red, green: green, blue: blue })
      });
    } catch (e) {
      console.error("setColor", e);
    }
  }
});
