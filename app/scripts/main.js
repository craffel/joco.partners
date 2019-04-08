const grid = document.querySelector('.container');

animateCSSGrid.wrapGrid(grid, {
  duration: 350,
  stagger: 10,
  onStart: elements =>
      console.log(`started animation for ${elements.length} elements`),
  onEnd: elements =>
      console.log(`finished animation for ${elements.length} elements`)
});

grid.addEventListener('click', ev => {
  let target = ev.target;
  console.log(ev.target);
  while (target.tagName !== 'HTML') {
      if (target.classList.contains('card-grow')) {
        target.classList.toggle('card-expanded');
        var clicked_element = target;
        break;
      }
    target = target.parentElement;
  }
  var elements = document.getElementsByTagName('div');
  for (var i=0; i<elements.length; i++) {
      if (elements[i].classList.contains('card-grow') &&
          elements[i].classList.contains('card-expanded') &&
          elements[i] != clicked_element) {
            elements[i].classList.remove('card-expanded');
      }
  }
});

const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyOTDtDLXGLvk8kt' }).base('appVYJBJSrP9QrYLa');
const table = base('Website Content');
const websiteContent = ['headline', 'invitation', 'schedule', 'rsvp', 'travel', 'accommodations', 'todo', 'faq', 'contact', 'contribute', 'requests', 'draw', 'secret'];

table.select({
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
