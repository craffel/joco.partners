var airtable_write_endpoint = "https://api.airtable.com/v0/appVYJBJSrP9QrYLa/Guests?api_key=keyOTDtDLXGLvk8kt";


/*
** SEND DATA TO AIRTABLE
*/
window.addEventListener("load", function () {

  function sendData() {

    // Extract data into a JSON object
    let data = getFormData(form);

    let date = new Date().toLocaleDateString();

    let events = [];
    if ( data.event1 ) { events.push(data.event1) }
    if ( data.event2 ) { events.push(data.event2) }
    if ( data.event3 ) { events.push(data.event3) }
    if ( data.event4 ) { events.push(data.event4) }
    
    axios.post(
      airtable_write_endpoint,
      {
        "fields": {
          "Name": data.name,
          "RSVP Date": date,
          "Email": data.email,
          "RSVP Response": data.rsvp,
          "Events Attending": events,
          "Dietary Restrictions": data.dietary,
          "Music Requests": data.music,
          "Transportation Needs": data.Transportation
        }
      }
    ).then(function(response) {
      // give it a little bit for data to hit AirTable
      setTimeout(function() {
        console.log("done");
      }, 750);
    })

    document.getElementById("rsvp-form").innerHTML = "<h2>Thanks for RSVPing!</h2>";

  }

  // Access the form data
  const form = document.getElementById("rsvp-form");
  const data = new Object();

  // Prevent default and route form data through sendData function
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});
