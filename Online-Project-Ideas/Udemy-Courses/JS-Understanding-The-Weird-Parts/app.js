(function(global){
    qS('#login').addEventListener('click', function(){
        qS('#logindiv').style = 'display:none'; 
        Greetr('Jimmy','Nichols',qS('#lang').value).setName(qS('#name').value).updateHTML('greeting',qS('#formal').checked).log()
    });
})(window)