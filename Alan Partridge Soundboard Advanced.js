//A function to convert text to speech using the Web Speech
function textToAudio() {
  // Getting the input value from the text-to-speech field
  let msg = document.getElementById("text-to-speech").value;
  // Creating a new SpeechSynthesisUtterance object
  let speech = new SpeechSynthesisUtterance();
  // Setting the language for the speech synthesis to US English
  speech.lang = "en-US";
  // Setting the text for the speech synthesis to the input value
  speech.text = msg;
  // Settiing the volume, rate, and pitch for the speech synthesis
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  // To Play the speech synthesis
  window.speechSynthesis.speak(speech);
  }
// A function to play a sound when a button is clicked
function playSound(soundId) {
  // Getting the audio element with the given ID
  var sound = document.getElementById(soundId);
  // Setting the audio playback time to 0 (to restart the audio from the beginning)
  sound.currentTime = 0;
  // Playing the audio
  sound.play();
}
// An array of objects representing the soundboard buttons
const sounds = [
  { id: "sound1", name: "Ah-ha ", duration:1},
  { id: "sound2", name: "Back of the net", duration: 1  },
  { id: "sound3", name: "Bang Out Of Order", duration: 1 },
  { id: "sound4", name: "Dan" , duration: 1},
  { id: "sound5", name: "Goal" , duration: 2},
  { id: "sound6", name: "Hello Partridge" , duration: 1},
  { id: "sound7", name: "Jurassic Park" , duration: 1},
  { id: "sound8", name: "Kiss My Face" , duration: 1},
  { id: "sound9", name: "Smell My Cheese" , duration: 1},
  { id: "sound10", name: "Striker", duration: 1 },
  { id: "sound11", name: "ah come on" , duration: 1},
  { id: "sound12", name: "aboot" , duration: 1},
];

// The index of the first soundboard button to display
    let index = 0;
    // The number of soundboard buttons to display at a time
    const limit = 9;
    // The soundboard element
    const soundboard = document.querySelector(".soundboard");
    // The left and right arrow elements for navigating the soundboard
    const leftArrow = document.createElement("div");
    const rightArrow = document.createElement("div");
    
// A function to create a button element for each sound in the sound array
function createButton(sound) {
  const div = document.createElement("div"); // Creating a div element to hold the button
  div.setAttribute("class", "sound"); // Setting the class of the div element
  const button = document.createElement("button");  // Creating a button element
  button.setAttribute("class", "button"); // Setting the class of the button element
  const nameSpan = document.createElement("span"); // Creating a span for the sound name
  nameSpan.setAttribute("class", "name"); // Creating a span element for the sound name
  nameSpan.textContent = sound.name; // Setting the class of the name span element
  const durationSpan = document.createElement("span"); // Creating a span for the sound duration
  durationSpan.setAttribute("class", "duration");  // Setting the class of the duration span element
  durationSpan.textContent = `${sound.duration}s`; // Setting the text content of the duration span element
  button.appendChild(nameSpan); // Adding the name span to the button
  button.appendChild(durationSpan); // Adding the duration span to the button
  button.addEventListener("click", () => { // Adding a click event listener to the button
    playSound(sound.id);  // Playing the sound associated with the button when clicked
  });
  div.appendChild(button); // Adding the button to the div element
  return div; // Returning the div element
  }


// A function to render the sound buttons on the page
function renderButtons() {
  soundboard.innerHTML = "";// Clearing the soundboard div
  for (let i = index; i < index + limit && i < sounds.length; i++) { // to Loop through the sounds array
    if (sounds[i].name !== "") { // If the sound name is not empty
      soundboard.appendChild(createButton(sounds[i]));  // Creating a button element for the sound and add it to the soundboard div
    }  
  }
}

function init() {
  leftArrow.className = "left-arrow"; // Setting the class of the left arrow element
  leftArrow.textContent = "<"; // Setting the text content of the left arrow element
  leftArrow.addEventListener("click", () => { // Adding a click event listener to the left arrow element
  index = Math.max(index - limit, 0); // Decrementing the index by the limit or set it to 0 if it goes below 0
  renderButtons(); // Rendering the buttons again
  });
  soundboard.parentNode.insertBefore(leftArrow, soundboard); // Adding the left arrow element before the soundboard div

  rightArrow.className = "right-arrow"; // Setting the class of the right arrow element
  rightArrow.textContent = ">"; // Setting the text content of the right arrow element
  rightArrow.addEventListener("click", () => { // Adding a click event listener to the right arrow element
      
    index = Math.min(index + limit, sounds.length - limit); // Increment the index by the limit or set it to the last sound if it goes over the length of the sounds array
    renderButtons(); // Render the buttons again
  });
  soundboard.parentNode.insertBefore(rightArrow, soundboard.nextSibling); // Adding the right arrow element after the soundboard div

  renderButtons();  // Render the buttons for the first time
}

init(); // Calll the init function to initialize the soundboard