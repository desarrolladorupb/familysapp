$(document).ready(function() {
        $("#btnLogout").click(function () {
            swal({
                    title: "Success!",
                    text: "Login out",
                    type: "success",
            })
        firebase.auth().signOut();
        location.href = "./login.html";
    });

});