// Initialize Firebase
$(document).ready(function() {

    var btnLogin = $("#btnLogin").val();
    var passsword = $("#passsword").val();
    var txtemail = $("#txtemail").val();
    var btnSingUp = $("#btnSingUp").val();
    var btnLogout = $("#btnLogout").val();
    var txtemail = $("#txtemail").val();

  /*Inicio validacion correo*/
    $('#txtemail').blur(function() {
        var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    if (regex.test($('#txtemail').val().trim())) {
    } else {
            $('#txtemail').val('');
            swal({
                  title: "Warning!",
                  text: "Invalid email",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#ff1803",
                  confirmButtonText: "Close",
                  closeOnConfirm: false
            });
    }
  });
    /*Fin validacion correo*/

    //admin.validarUsuarioConectado();
    $( "#btnLogin" ).click(function() {

  		let email = $("#txtemail").val();
    	let pass  = $("#passsword").val();
    	let auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, pass);
      if(promise === promise){
            swal({
                  title: "Success!",
                  text: "Loading ...",
                  type: "success",
                  showCancelButton: true,
                  confirmButtonColor: "#ff1803",
                  confirmButtonText: "Close",
                  closeOnConfirm: false
            });
        const promise = auth.signInWithEmailAndPassword(email, pass)
      }else{
            $('#passsword').val('');
            swal({
                  title: "Warning!",
                  text: "Incorrect username or password.",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#ff1803",
                  confirmButtonText: "Close",
                  closeOnConfirm: false
            });
      }
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

   