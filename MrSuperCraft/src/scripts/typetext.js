const textElement = document.getElementById('typed-text');
const sentences = ["Producer", "Artist", "Creator"];
let sentenceIndex = 0;
let index = 0;
let isDeleting = false;
let timeoutId; // Variable to store the timeout ID
const pauseBetweenWords = 300; // Adjust as needed
const pauseBeforeDeleting = 800; // Adjust as needed

function typeText() {
  clearTimeout(timeoutId); // Clear existing timeout

  const currentSentence = sentences[sentenceIndex];
  const currentText = isDeleting
    ? currentSentence.slice(0, index)
    : currentSentence.slice(0, index + 1);

  textElement.innerHTML = currentText;

  if (!isDeleting && index === currentSentence.length) {
    timeoutId = setTimeout(() => {
      isDeleting = true;
      typeText(); // No need for an additional timeout here
    }, pauseBeforeDeleting); // Pause before deleting
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    sentenceIndex = (sentenceIndex + 1) % sentences.length;
    timeoutId = setTimeout(typeText, pauseBetweenWords); // Pause before starting the next word
  } else {
    index += isDeleting ? -1 : 1;
    const typingSpeed = isDeleting ? 150 : 200;
    timeoutId = setTimeout(typeText, typingSpeed);
  }
}

// Start the typing animation
typeText();
