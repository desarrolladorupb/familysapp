// Initialize Firebase
$(document).ready(function() {

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
	    
    var btnLogin = $("#btnLogin").val();
    var passsword = $("#passsword").val();
    var txtemail = $("#txtemail").val();
    var btnSingUp = $("#btnSingUp").val();
    var btnLogout = $("#btnLogout").val();

    //admin.validarUsuarioConectado();
    $( "#btnLogin" ).click(function() {

  		let email = $("#txtemail").val();
    	let pass  = $("#passsword").val();
    	let auth = firebase.auth();

    	const promise = auth.signInWithEmailAndPassword(email, pass);
    	promise.catch(e => console.log(e.message));
        

        /*window.location.href = "http://localhost:8080/mapa/public/map.html";*/
	});



	    $( "#btnSingUp" ).click(function() {
  		alert( "btnSingUp" );

  		let email = $("#txtemail").val();
    	let pass  = $("#passsword").val();
    	let auth = firebase.auth();

    	const promise = auth.createUserWithEmailAndPassword(email, pass);
    	promise.catch(e => console.log(e.message));

	});


	$( "#btnLogout" ).click(function() {
  		alert( "btnLogout" );
  		firebase.auth().signOut();
        location.href ="./login.html";
	});

	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
            location.href ="./map.html";
			console.log(firebaseUser.email);
		}else{
			console.log('no logueado');
		}
	});
});

   