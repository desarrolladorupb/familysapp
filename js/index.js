$(document).ready(function() {

	/*Inicio de lista de commite*/
	$('#committee').change(function() {
		var committe = $('#committee').val();
  		if(committe === "UPB"){
  			 $(location).attr('href',"./login.html"); 
  		}else{
  			swal({
                title: "Warning",
                text: "We do not have data for this committee of " + committe,
                type: "warning",
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Ok",
                closeOnConfirm: false
            });
  		}
	});
	/*Inicio de lista de commite*/

	/*Inicio de la validacion de los datos*/
    $( "#exampleRadios1" ).change(function() {
        var aceptar = $('#exampleRadios1').val($(this).is(':checked'));

        if($(this).is(":checked")){
            $("#btnGuardar").prop( "disabled", false );
        }else{
            $("#btnGuardar").prop( "disabled", true );
            }
        });
    $( "#exampleRadios2" ).change(function() {
        var aceptar = $('#exampleRadios1').val($(this).is(':checked'));

        if($(this).is(":checked")){
            $("#btnGuardar").prop( "disabled", true );
        }else{
            $("#btnGuardar").prop( "disabled", false );
        }
    });
    /*fin de la validación de datos*/

    /*Inicio validacion campo texto*/
    $('.ValText').on('keypress', function (e) {
        if (event.keyCode >32 && event.keyCode  <65) event.returnValue = false;
    });
    /*Fin validacion campo texto*/

    /*Inicio validacion campo num*/
    $('.ValNum').on('keypress', function (e) {
        var keyCode = event.keyCode || event.which,
            allowedKey = keyCode === 8  ||  // backspace
                         keyCode === 9  ||  // tab
                         keyCode === 13 ||  // enter
                         keyCode === 37 ||  // left
                         keyCode === 39 ||  // right
                         keyCode === 46 ||  // del
                         (keyCode >= 48 && keyCode <= 57 || keyCode >= 105 && keyCode <= 96 );
        if (!allowedKey) {
            event.preventDefault();
        }
    });
    /*Fin validacion campo num*/

    /*Inicio validacion campo num_longitud*/
    $('.ValNumLeng').on('keypress', function (e) {
        var keyCode = event.keyCode || event.which,
            allowedKey = keyCode === 8  ||  // backspace
                         keyCode === 9  ||  // tab
                         keyCode === 13 ||  // enter
                         keyCode === 37 ||  // left
                         keyCode === 39 ||  // right
                         keyCode === 46 ||  // del
                         (keyCode >= 48 && keyCode <= 57 || keyCode >= 105 && keyCode <= 96 || keyCode === 45);
        if (!allowedKey) {
            event.preventDefault();
        }
    });
    /*Fin validacion campo num_longitud*/

    /*Inicio validacion correo*/
    $('.ValEmail').change(function() {
		var $email = $('form input[name="email'); //change form to id or containment selector
		var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

		if ($email.val() == '' || !re.test($email.val())){
			$('.ValEmail').val('');
    		swal({
                    title: "Warning!",
                    text: "Invalid email",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ff1803",
                    confirmButtonText: "Close",
                    closeOnConfirm: false
            });
    		return false;
		}
	});
    /*Fin validacion correo*/
});