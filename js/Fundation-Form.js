$(document).ready(function() {
    /*Botones de Agregar nuevo registro - Editar Registro - Eliminar registro*/
    var btnInsertar = $("#btnInsertar");
    var btnEliminar = $("#btnEliminar");
    var btnModificar = $("#btnModificar");
    /*Botones de la ventana de modal*/
    var btnGuardar = $("#btnGuardar");
    var btnCancelar = $("#btnCancelar");
    /*Campos de el formulario de la modal*/
    var fundation = $("#fundation");
    var project = $("#project");
    var neighborhood = $("#neighborhood");
    var address = $("#address");
    var phone = $("#phone");
    var email = $("#email");
    var latitud = $("#latitud");
    var longitud = $("#longitud");
    /*Ventana modal*/

    /*se inicializa la datatable*/
    var dtfundation = $("#dtfundation").DataTable({
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
    var starCountRef = firebase.database().ref("Fundation");
    starCountRef.on("value",
        function(snapshot) {
            dtfundation.clear().draw();
            if (snapshot.val() != null) {
                $.each(snapshot.val(), function(index, value) {
                    var row = dtfundation.row.add([index,
                                                value.Project,
                                                value.Neighborhood, 
                                                value.Address, 
                                                value.Phone, 
                                                value.Email, 
                                                value.Latitud, 
                                                value.Longitud])
                        .draw()
                        .node();
                });
            }
        }
    );

    /*Limpiar*/
    var Limpiar = function() {
        fundation.val("");
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
        if (fundation.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the name of the fundation",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        }else if (project.val() === "Select_Project") {
            swal({
                title: "Warning",
                text: "Select Project",
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
        fundation.prop('disabled', false);
        $("#exampleRadios2").prop("checked", true);
        $('#btnGuardar').attr("disabled", true);
        $('#md-insertar').modal('show');

        var starCountRef = firebase.database().ref("Project");
          starCountRef.on("value",
            function(snapshot) {
                $('#project >option').remove();
                $('#project').append('<option value="Select_Project">Select Project</option>');
                $.each(snapshot.val(), function(index, value) {
                        $('#project').append($('<option>', { 
                          value: index,
                          text : index 
                        }));
                });
            }
        );

    });

    /*Modificar*/
    btnModificar.on("click", function(e) {

        $("#exampleRadios2").prop("checked", true);
        $('#btnGuardar').attr("disabled", true);

        accion = lstAcciones.Modificar;
        var row = dtfundation.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            fundation.prop('disabled', true);
            fundation.val(data[0]);
            project.val(data[1]);
            neighborhood.val(data[2]);
            address.val(data[3]);
            phone.val(data[4]);
            email.val(data[5]);
            latitud.val(data[6]);
            longitud.val(data[7]);
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
        var row = dtfundation.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            var Fundation = data[0];
            swal({
                    title: "¿Remove?",
                    text: "You really want to delete the selected fundation",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ff1803",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                },
                function() {
                    var starCountRef = firebase.database().ref("Fundation/" + Fundation);
                    starCountRef.remove(function(error) {
                        if (error == null) {
                            swal({
                                title: "Removed!",
                                text: "Fundation deleted successfully",
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
                text: "You really want to delete the selected fundation",
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
            var Fundation = fundation.val().toUpperCase().trim();
            if (accion == lstAcciones.Nuevo) {
                var starCountRef = firebase.database().ref("Fundation/" + Fundation);
                starCountRef.once('value').then(
                    function(snapshot) {
                        if (snapshot.val() == null) {
                            firebase.database().ref('Fundation/' + Fundation).set({
                                Project: project.val(),
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
                                text: "Fundation saved correctly",
                                type: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#ff1803",
                                confirmButtonText: "Close",
                                closeOnConfirm: false
                            });
                        } else {
                            swal({
                                title: "Warning",
                                text: "Fundation already exists",
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
                firebase.database().ref('Fundation/' + Fundation).set({
                    fundation: fundation.val(),
                    Project: project.val(),
                    Neighborhood: neighborhood.val(),
                    Address: address.val(),
                    Phone: phone.val(),
                    Email: email.val(),
                    Latitud: latitud.val(),
                    Longitud: longitud.val()
                });
                $('#md-insertar').modal('hide');
                swal({
                    title: "Success!",
                    text: "Fundation Modified correctly",
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
        if (fundation === null) {
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
});