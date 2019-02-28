(function(){
  var entireSite = document.querySelector('html');
  var portfolioImgs = document.querySelector('.modalpopups')
  portfolioImgs.addEventListener('contextmenu',function(e){
    e.preventDefault();
    alert('I hope ur not doing what I think youre doing😉');
    return false;
  }, false)
  entireSite.addEventListener('contextmenu',function(e){
    e.preventDefault();
    return false;
  }, false)
})()
