//alert('http://via.placeholder.com/')
let img = document.querySelector('#content .bg img');
const updateWindow = () => {
img.style = 'overflow-x: hidden;\noverflow-y: hidden;'
w = window.outerWidth;
h = window.outerHeight;
console.log(w + 'x' + h)
img.src = 'http://via.placeholder.com/' + w + 'x' + h + '&text=' + w + 'x' + h + ' - ' + window.innerWidth + 'x' + window.innerHeight;
}
const cards = (q) => {
  let card = document.createElement('p');
  let board = document.querySelector('#content .bg');
  card.style = 'display:grid;height:360px;width:240px;background:url("http://via.placeholder.com/240x360&text=' + q + '")';
  board.append(card)
}
//document.body.onload = updateWindow();
//window.addEventListener('resize',updateWindow)
for (let i = 1; i <=24;i++){
  cards(i)
}
