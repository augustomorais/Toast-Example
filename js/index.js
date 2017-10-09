/*Aqui vamos construir o snack bar , primeiro atribuindo a função a variavel 
para podermos usar posteriormente para cada ação.*/
var createToast = (function() {
  // Any toastbar that is already shown
  var previous = null;
  
  /*A função para criar o toast recebe 4 parametros, a mensagem de exibição,
   o texto para ação , a ação propriamente , e posição de exibição*/
  return function(message, actionText, action, position) {
    if (previous) {
      previous.dismiss();
    }
    var toastbar = document.createElement('div');
    toastbar.className = 'paper-toastbar';
    toastbar.dismiss = function() {
      this.style.opacity = 0;
    };

    var message = document.getElementById('message').value;        
    var timeSnack = document.getElementById('timeSnack').value * 1000;        
    

    var text = document.createTextNode(message);
    toastbar.appendChild(text);
    if (actionText) {
      if (!action) {
        action = toastbar.dismiss.bind(toastbar);
      }
      var actionButton = document.createElement('button');
      actionButton.className = 'action';
      actionButton.innerHTML = actionText;
      actionButton.addEventListener('click', action);
      toastbar.appendChild(actionButton);
    }
    setTimeout(function() {
      if (previous === this) {
        previous.dismiss();
      }
    }.bind(toastbar), timeSnack);
    
    toastbar.addEventListener('transitionend', function(event, elapsed) {
      if (event.propertyName === 'opacity' && this.style.opacity == 0) {
        this.parentElement.removeChild(this);
        if (previous === this) {
          previous = null;
        }
      }
    }.bind(toastbar));

    
    
    previous = toastbar;
    document.body.appendChild(toastbar);

    // Verificar se o snack deve aparecer no topo ou abaixo da tela
    if(position == 'top'){
      getComputedStyle(toastbar).top;
      toastbar.style.top = '0px';
      toastbar.style.opacity = 1;
    }else{
      getComputedStyle(toastbar).bottom;
      toastbar.style.bottom = '0px';
      toastbar.style.opacity = 1;
    }
  };
})();


document.getElementById('single').addEventListener('click', function() {
  createToast(message,'Fechar','','top');    
});

document.getElementById('multi').addEventListener('click', function() {
  createToast(message,'Fechar','','bottom');    
});

document.getElementById('multiaction').addEventListener('click', function() {
  createToast(message, 'Fechar?', function() { alert('Essa mensagem e um response ao fechar o toast!'); });    
});