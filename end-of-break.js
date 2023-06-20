function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours %= 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

let timeToAdd = 10;

function copyToClipboard() {
  // // Get the time to add from the input field
  // let timeToAdd = parseInt(document.getElementById("timeToAdd").value);

  // // Create a new date and add the specified minutes to it
  // let date = new Date();
  // // If halfway through the minute, add 1
  // if (date.getSeconds() > 29) timeToAdd++;
  // date.setMinutes(date.getMinutes() + timeToAdd);

  // // Create the string to copy to the clipboard
  // let clipboardText = "Return at " + formatAMPM(date);

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
  // // Get the amount of time entered by the user
  // var timeAdded = parseInt(document.querySelector('#timeToAdd').value) || 10;
  // // Calculate the future time
  // var currentTime = new Date();
  // if (currentTime.getSeconds() > 29) timeAdded++;
  // currentTime.setMinutes(currentTime.getMinutes() + timeAdded);

  // // Format the future time as a string
  // var futureTime = currentTime.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', hour12: true});
  // var copyText = "Return at " + futureTime;

  // console.log(copyText); // Debug line

  // Update the text content of the displayTime element
  document.querySelector('#displayTime').textContent = returnTime();
  
  // Reset the displayTime element after the future time has passed or when the button is clicked again
  setTimeout(function() {
    document.querySelector('#displayTime').textContent = '';
  }, timeToAdd * 60 * 1000);

  // ... Rest of your click event handler code ...
});