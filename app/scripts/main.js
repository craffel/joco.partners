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
        return;
      }
    target = target.parentElement;
  }
});
