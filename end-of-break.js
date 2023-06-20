let timeToAdd = 10;

function copyToClipboard() {
  // Get the button
  let button = document.getElementById("copyButton");

  // Copy the text to the clipboard
  navigator.clipboard
    .writeText(returnTime())
    .then(() => {
      // Change the button text
      button.textContent = "Return time copied!";
      // Change the button color
      button.style.backgroundColor = "green";
      button.style.borderColor = "green";
      button.style.color = "white";

      // Set a timer to change the color and text back after 10 seconds
      setTimeout(function () {
        button.style.backgroundColor = "";
        button.style.borderColor = "";
        button.style.color = "";
        button.textContent = "Copy Return Time";
      }, 10000); // 10000 milliseconds = 10 seconds
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

function returnTime() {
  timeToAdd = parseInt(document.getElementById("timeToAdd").value);
  let currentTime = new Date();
  // If halfway through the minute, add 1
  if (currentTime.getSeconds() > 29) timeToAdd++;
  currentTime.setMinutes(currentTime.getMinutes() + timeToAdd);
  const futureTime = currentTime.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', hour12: true});
  return "Return at " + futureTime;
}

document.querySelector('#copyButton').addEventListener('click', function() {
  // Update the text content of the displayTime element
  document.querySelector('#displayTime').textContent = returnTime();
  
  // Reset the displayTime element after the future time has passed or when the button is clicked again
  setTimeout(function() {
    document.querySelector('#displayTime').textContent = '';
  }, timeToAdd * 60 * 1000);
});