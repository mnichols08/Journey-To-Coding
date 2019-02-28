(function(){
  var entireSite = document.querySelector('html');
  var portfolioImgs = document.querySelector('.modalpopups')
  portfolioImgs.addEventListener('contextmenu',function(e){
    e.preventDefault();
    alert('Do you have any idea how long that it took for me to make this art?!');
    return false;
  }, false)
  entireSite.addEventListener('contextmenu',function(e){
    e.preventDefault();
    return false;
  }, false)
})()
