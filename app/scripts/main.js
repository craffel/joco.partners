/*
** SELECT 15 RANDOM PHOTOS
*/
let photoArray = []
while(photoArray.length < 15){
    let r = Math.floor(Math.random()*171) + 1;
    if(photoArray.indexOf(r) === -1) photoArray.push(r);
}

photoArray.forEach(function(photoNumber, i) {
  let newPhoto = '<div class="card-slideshow-slide" style="background-image: url(../images/' + photoNumber + '.jpg)"></div>';
  let newEl = document.createElement('div');

  newEl.innerHTML = newPhoto;
  newEl.className = 'card-slideshow-container';

  while(newEl.firstChild) {
    document.getElementById('content-slideshow').appendChild(newEl.firstChild);
  }
});

/*
** ANIMATE CARD OPEN AND CLOSE
*/
// const grid = document.querySelector('.container');

// animateCSSGrid.wrapGrid(grid, {
//   duration: 350,
//   stagger: 10,
//   onStart: elements =>
//       console.log(`started animation for ${elements.length} elements`),
//   onEnd: elements =>
//       console.log(`finished animation for ${elements.length} elements`)
// });

// grid.addEventListener('click', ev => {
//   let target = ev.target;
//   while (target.tagName !== 'HTML') {
//       if (target.classList.contains('card-grow')) {
//         target.classList.toggle('card-expanded');
//         let clicked_element = target;
//         break;
//       }
//     target = target.parentElement;
//   }
//   let elements = document.getElementsByTagName('div');
//   for (let i=0; i<elements.length; i++) {
//       if (elements[i].classList.contains('card-grow') &&
//           elements[i].classList.contains('card-expanded') &&
//           elements[i] != clicked_element) {
//             elements[i].classList.remove('card-expanded');
//       }
//   }
// });

/*
** READ DATA FROM AIRTABLE
*/
const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyOTDtDLXGLvk8kt' }).base('appVYJBJSrP9QrYLa');

const websiteContent = ['headline', 'invitation', 'schedule1', 'schedule2', 'schedule3', 'schedule4', 'rsvp', 'travel', 'accommodations', 'todo', 'faq', 'contact', 'contribute', 'requests', 'draw', 'secret'];

base('Website Content').select({
    view: 'Grid view'
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record, i) {
      document.getElementById('content-' + websiteContent[i]).innerHTML =
        '<div><h2>' + record.get('Name') + '</h2>'
        + record.get('Content') + '</div>';
    });

    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

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

    base('Guests').create({
      "Name": data.name,
      "RSVP Date": date,
      "Email": data.email,
      "RSVP Response": data.rsvp,
      "Events Attending": events,
      "Dietary Restrictions": data.dietary,
      "Music Requests": data.music,
      "Transportation Needs": data.transportation
    }, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.getId());
    });

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
