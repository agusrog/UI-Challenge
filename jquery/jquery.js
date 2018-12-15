
$(document).ready(function(){
	console.log('Jquery listo');


  // Toma el Modal 
  var modal = $('#miModal');

  // Toma el boton suscribete 
  var btn = $("#abrirModal");

  // Toma la X de cerrar 
  var cerrar = $("#cerrar");

  // Abre el modal con el click del boton 
  btn.click(function() {
    modal.show();
  });

  // Cierra el modal con el click en la X de cierre 
  cerrar.click(function() {
    modal.hide();
    // Limpia errores del modal 
    error.css({'display':'none'});
    error2.css({'display':'none'});
    imputEmail.css({"border":"1px solid #CCCCCC", "margin-bottom": "20px"});
    $('#rechazado').css({'display':'none'});
  });

  var error = $('#error'); // Captura el error del email en blanco 
  var error2 = $('#error2'); // Captura el parrafo de error de politica
  var imputEmail = $('#email'); // Captura el input email
  var check = $('input[name="check"]'); // Captura estado del check 
  var inBotonModal = $('#inBotonModal'); // Captura texto boton 
  var EfectoCargando = '<img class="cargando" src="assets/loading.svg" >';

  // Guardo el form en una variable
  var formulario = $('#form').submit(function(e){
    
    e.preventDefault(); // Evita comportamiento del form al enviar 
    
    var email = {
      "email": $('input[name="email"]').val().trim() // Limpia espacios y captura mail
    };      

    //  Valida y hace peticion 
        if(!email.email == '' && check.is(":checked")){                  
          inBotonModal.html(EfectoCargando);
          $.post($(this).attr("action"), email, function(response){

            // Cargando 
            enviando(); 
            function enviando () {                                   
                      inBotonModal.html('SUSCRÍBETE');
                      console.log(response);
                      imputEmail.val('');
                      check.prop('checked', false);
                      
/* Esta condicion solo se debe dejar activa si el sitio se encuentra subido a un host...
... O si la carpeta api lo esta. Sino comentar desde aqui...  */                       
                      if (response){
                        $('#resuelto').css({'display':'block'});
                        $('#rechazado').css({'display':'none'});
                      }else{
                        $('#rechazado').css({'display':'block'});
                        $('#resuelto').css({'display':'none'});
                      } // ...Hasta aqui;                                       
            };          
        });
                  
        // Validacion y mostrando errores 
        
        // Si el email esta vacio y no check
        }else if(email.email == '' && !check.is(":checked")){ 

            imputEmail.css({"border":"1px solid #E34F45", "margin-bottom": "4px"});
            error.css({'display':'block'});
            error2.css({'display':'block'}); 
        }
        // Si el email esta vacio 
        else if(email.email == '' ){

            imputEmail.css({"border":"1px solid #E34F45", "margin-bottom": "4px"});
            error.css({'display':'block'});
        }
        // Si no clickeo en check 
        else if(!check.is(":checked")){  

            error2.css({'display':'block'});                
       }

      // Limpia errores despues de enviado 
      if(!email.email == ''){
        imputEmail.css({"border":"1px solid #CCCCCC", "margin-bottom": "20px"});
        error.css({'display':'none'});
      }

      if(check.is(":checked")){
        error2.css({'display':'none'});
      }     

    return false;
  });



  

});