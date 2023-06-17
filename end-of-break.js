function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }
  
  function copyToClipboard() {
    // Get the time to add from the input field
    let timeToAdd = parseInt(document.getElementById("timeToAdd").value);
  
    // Create a new date and add the specified minutes to it
    let date = new Date();
    if (date.getSeconds() > 29) timeToAdd++;
    date.setMinutes(date.getMinutes() + timeToAdd);
  
    // Create the string to copy to the clipboard
    let clipboardText = "Return at " + formatAMPM(date);
  
    // Get the button
    let button = document.getElementById("copyButton");
  
    // Copy the text to the clipboard
    navigator.clipboard.writeText(clipboardText)
      .then(() => { 
        // Change the button text
        button.textContent = "Return time copied!";
        // Change the button color
        button.style.backgroundColor = "green";
        button.style.borderColor = "green";
        button.style.color = "white";
  
        // Set a timer to change the color and text back after 10 seconds
        setTimeout(function() {
          // Get computed style of the root
          const style = getComputedStyle(document.documentElement);
          // Get background color from CSS variable
          const bgColor = String(style.getPropertyValue('--input-background')).trim();
          // Get border color from CSS variable
          const borderColor = String(style.getPropertyValue('--input-border')).trim();
          button.style.backgroundColor = "";
          button.style.borderColor = "";
          button.style.color = "";
          button.textContent = "Copy Return Time";
        }, 10000);  // 10000 milliseconds = 10 seconds
      })
      .catch(err => { console.error('Could not copy text: ', err); });
  }