$(document).ready(function() {
    /*Botones de Agregar nuevo registro - Editar Registro - Eliminar registro*/
    var btnInsertar = $("#btnInsertar");
    var btnEliminar = $("#btnEliminar");
    var btnModificar = $("#btnModificar");

    /*Botones de la ventana de modal*/
    var btnGuardar = $("#btnGuardar");
    var btnCancelar = $("#btnCancelar");

    /*Campos de el formulario de la modal*/
    var project = $("#project");
    var neighborhood = $("#neighborhood");
    var address = $("#address");
    var phone = $("#phone");
    var email = $("#email");
    var latitud = $("#latitud");
    var longitud = $("#longitud");

    /*se inicializa la datatable*/
    var dtprojects = $("#dtprojects").DataTable({
        "paging": false,
        "ordering": false,
        "info": false

    });
    /*Acciones de los botones*/
    var lstAcciones = {
        Nuevo: "Guardar",
        Modificar: "Modificar",
        Eliminar: "Eliminar"
    }
    var accion;
    var starCountRef = firebase.database().ref("Project");
    starCountRef.on("value",
        function(snapshot) {
            dtprojects.clear().draw();
            if (snapshot.val() != null) {
                $.each(snapshot.val(), function(index, value) {
                    var row = dtprojects.row.add([index, value.Neighborhood, value.Address, value.Phone, value.Email, value.Latitud, value.Longitud])
                        .draw()
                        .node();
                });
            }
        }
    );

    /*Limpiar*/
    var Limpiar = function() {
        project.val("");
        neighborhood.val("");
        address.val("");
        phone.val("");
        email.val("");
        latitud.val("");
        longitud.val("");
    };

    /*validación*/
    var Validar = function() {
        if (project.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the name of the project",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        }else if (neighborhood.val() == "") {
            swal({
                title: "Warning",
                text: "Enter name of the neighborhood",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        }else if (address.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the address",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        }else if (phone.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the phone number",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        }else if (email.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the email",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        }else if (latitud.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the latitude",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        } else if (longitud.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the length",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        } else {
            return true;
        }
    }

    /*insertar*/
    btnInsertar.on("click", function(e) {
        accion = lstAcciones.Nuevo;
        Limpiar();
        project.prop('disabled', false);
        $("#exampleRadios2").prop("checked", true);
        $('#btnGuardar').attr("disabled", true);
        $('#md-insertar').modal('show');
    });

    /*Modificar*/
    btnModificar.on("click", function(e) {

        $("#exampleRadios2").prop("checked", true);
        $('#btnGuardar').attr("disabled", true);

        accion = lstAcciones.Modificar;
        var row = dtprojects.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            project.prop('disabled', true);
            project.val(data[0]);
            neighborhood.val(data[1]);
            address.val(data[2]);
            phone.val(data[3]);
            email.val(data[4]);
            latitud.val(data[5]);
            longitud.val(data[6]);
            $('#md-insertar').modal('show');
        } else {
            $('#md-insertar').modal('hide');
            swal({
                title: "Warning",
                text: "Select a record in the table",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            });
            $('#md-insertar').modal('hide');
        }
    });

    /*Eliminar*/
    btnEliminar.on("click", function(e) {
        var row = dtprojects.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            var Project = data[0];
            swal({
                    title: "¿Remove?",
                    text: "You really want to delete the selected project",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ff1803",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                },
                function() {
                    var starCountRef = firebase.database().ref("Project/" + Project);
                    starCountRef.remove(function(error) {
                        if (error == null) {
                            swal({
                                title: "Removed!",
                                text: "Project deleted successfully",
                                type: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#ff1803",
                                confirmButtonText: "Close",
                                closeOnConfirm: false
                            });
                        } else {
                            swal({
                                title: "Warning",
                                text: "The record could not be deleted",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#ff1803",
                                confirmButtonText: "Close",
                                closeOnConfirm: false
                            });
                        }
                    });

                });
        } else {
            swal({
                title: "Warning",
                text: "You really want to delete the selected project",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            });
        }
    });


    /*guardar*/
    btnGuardar.on("click", function(e) {
        if (Validar()) {
            var Project = project.val().toUpperCase().trim();
            if (accion == lstAcciones.Nuevo) {
                var starCountRef = firebase.database().ref("Project/" + Project);
                starCountRef.once('value').then(
                    function(snapshot) {
                        if (snapshot.val() == null) {
                            firebase.database().ref('Project/' + Project).set({
                                Neighborhood: neighborhood.val(),
                                Address: address.val(),
                                Phone: phone.val(),
                                Email: email.val(),
                                Latitud: latitud.val(),
                                Longitud: longitud.val(),
                            });
                            $('#md-insertar').modal('hide');
                            swal({
                                title: "Success!",
                                text: "Project saved correctly",
                                type: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#ff1803",
                                confirmButtonText: "Close",
                                closeOnConfirm: false
                            });
                        } else {
                            swal({
                                title: "Warning",
                                text: "Project already exists",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#ff1803",
                                confirmButtonText: "Yes",
                                closeOnConfirm: false
                            });

                        }
                    }
                );

            } else if (accion == lstAcciones.Modificar) {
                firebase.database().ref('Project/' + Project).set({
                    Neighborhood: neighborhood.val(),
                    Address: address.val(),
                    Phone: phone.val(),
                    Email: email.val(),
                    Latitud: latitud.val(),
                    Longitud: longitud.val(),
                    project: project.val()
                });
                $('#md-insertar').modal('hide');
                swal({
                    title: "Success!",
                    text: "Project Modified correctly",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#ff1803",
                    confirmButtonText: "Close",
                    closeOnConfirm: false
                });
            }
        }

    });
    var validate_id = (mensaje, e) => {
        if (project === null) {
            swal('', mensaje, 'error');
            e.stopPropagation();
        }

    }



    $(document).on('click', '.selectedTable tbody tr', function() {
        var table = $($(this).parent("tbody").parent("table"));

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.children('tbody').children("tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
    });

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
});