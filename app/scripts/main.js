/*
** SELECT 12 RANDOM PHOTOS
*/
let photoArray = []

while(photoArray.length < 12){
    let r = Math.floor(Math.random()*178) + 1;
    if(photoArray.indexOf(r) === -1) photoArray.push(r);
}

photoArray.forEach(function(photoNumber, i) {

  let newPhoto = '<div class="slideshow-image crossfade-animation" data-piio-bck="../images/' + photoNumber + '.jpg"></div>';
  let newEl = document.createElement('div');

  newEl.innerHTML = newPhoto;

  while(newEl.firstChild) {
    document.getElementById('slideshow').appendChild(newEl.firstChild);
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
** CONNECT TO AIRTABLE
*/
const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyOTDtDLXGLvk8kt' }).base('appVYJBJSrP9QrYLa');

/*
** READ DATA FROM AIRTABLE
*/
base('Website Content').select({
    view: 'Grid view'
}).eachPage(function page(records, fetchNextPage) {

    document.getElementById('invitation').innerHTML =
      '<h1>' +
      records[0].fields.Heading +
      '</h1><p>' +
      records[0].fields.Body +
      '</p>';

    document.getElementById('sched-one').innerHTML =
      '<h2 class="schedule">' +
      records[1].fields.Heading +
      '</h2><h3>' +
      records[1].fields.Body +
      '</h3>';

    document.getElementById('sched-two').innerHTML =
      '<h2 class="schedule">' +
      records[2].fields.Heading +
      '</h2><h3>' +
      records[2].fields.Body +
      '</h3>';

    document.getElementById('sched-three').innerHTML =
      '<h2 class="schedule">' +
      records[3].fields.Heading +
      '</h2><h3>' +
      records[3].fields.Body +
      '</h3>';

    document.getElementById('sched-four').innerHTML =
      '<h2 class="schedule">' +
      records[4].fields.Heading +
      '</h2><h3>' +
      records[4].fields.Body +
      '</h3>';

    document.getElementById('rsvp').innerHTML =
      '<h2>' +
      records[5].fields.Heading +
      '</h2><p>' +
      records[5].fields.Body +
      '</p>';

    document.getElementById('travel').innerHTML =
      '<a class="links">' +
      records[6].fields.Heading +
      '</a><div class="body-hidden">' +
      records[6].fields.Body +
      '</div>';

    document.getElementById('accommodations').innerHTML =
      '<a class="links">' +
      records[7].fields.Heading +
      '</a><div class="body-hidden">' +
      records[7].fields.Body +
      '</div>';
    document.getElementById('todo').innerHTML =
      '<a class="links">' +
      records[8].fields.Heading +
      '</a><div class="body-hidden">' +
      records[8].fields.Body +
      '</div>';

    document.getElementById('contact').innerHTML =
      '<a class="links">' +
      records[9].fields.Heading +
      '</a><div class="body-hidden">' +
      records[9].fields.Body +
      '</div>';

    document.getElementById('faq').innerHTML =
      '<a class="links">' +
      records[10].fields.Heading +
      '</a><div class="body-hidden">' +
      records[10].fields.Body +
      '</div>';

    document.getElementById('contribute').innerHTML =
      '<a class="links">' +
      records[11].fields.Heading +
      '</a><div class="body-hidden">' +
      records[11].fields.Body +
      '</div>';

    document.getElementById('requests').innerHTML =
      '<a class="links">' +
      records[12].fields.Heading +
      '</a><div class="body-hidden">' +
      records[12].fields.Body +
      '</div>';

    document.getElementById('secret').innerHTML =
      '<a class="links">' +
      records[13].fields.Heading +
      '</a><div class="body-hidden">' +
      records[13].fields.Body +
      '</div>';

    document.getElementById('draw').innerHTML =
      '<a class="links">' +
      records[14].fields.Heading +
      '</a><div class="body-hidden">' +
      records[14].fields.Body +
      '</div>';

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
