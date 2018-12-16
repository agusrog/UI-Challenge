<?php

// Cabeceras de control de acceso y tipos de datos recibidos
    header('Access-Control-Allow-Origin: *'); // Si se quiere negar los permisos desde... 
// ... otros dominios, reemplazar el * por el dominio al que se le permite el ingreso.
    header('content-type: application/json; charset=utf-8');
    
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
// Decodifica el JSON que viene desde el front.
    $JSONData = file_get_contents("php://input");
    $email = json_decode($JSONData);
    echo $email;
    $emailError = false;

// Validaciones
    if($_SERVER["REQUEST_METHOD"] == "POST"){

        if(!empty($_POST["email"])){
            $email = test_input($_POST["email"]);
        
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $myJSON = json_encode($email);
                mail($myJSON,"Suscripcion","Gracias por suscribirte");
                echo true;

/* Los errores se pasan como string y se activan alerta de Ouch! en el formulario. 
No se detallan los tipos de errores */
            }else{
                echo  $emailError = 'false'; 
            };

        }else {
            echo  $emailError = 'false';            
        };

    }else{
        echo  $emailError = 'false';
    };

// Funcion para sanear el email recibido 
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        
        return $data;
    };
    
?>
