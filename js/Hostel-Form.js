$(document).ready(function() {
    /*Botones de Agregar nuevo registro - Editar Registro - Eliminar registro*/
    var btnInsertar = $("#btnInsertar");
    var btnEliminar = $("#btnEliminar");
    var btnModificar = $("#btnModificar");
    /*Botones de la ventana de modal*/
    var btnGuardar = $("#btnGuardar");
    var btnCancelar = $("#btnCancelar");
    /*Campos de el formulario de la modal*/
    var hostel = $("#hostel");
    var latitud = $("#latitud");
    var longitud = $("#longitud");
    /*Ventana modal*/

    /*se inicializa la datatable*/
    var dthostel = $("#dthostel").DataTable({
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
    var starCountRef = firebase.database().ref("Hostel");
    starCountRef.on("value",
        function(snapshot) {
            dthostel.clear().draw();
            if (snapshot.val() != null) {
                $.each(snapshot.val(), function(index, value) {
                    var row = dthostel.row.add([index, value.Latitud, value.Longitud])
                        .draw()
                        .node();
                });
            }
        }
    );

    /*Limpiar*/
    var Limpiar = function() {
        hostel.val("");
        latitud.val("");
        longitud.val("");
    };

    /*validación*/
    var Validar = function() {
        if (hostel.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the name of the hostel",
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
        hostel.prop('disabled', false);
        $('#md-insertar').modal('show');
    });

    /*Modificar*/
    btnModificar.on("click", function(e) {
        accion = lstAcciones.Modificar;
        var row = dthostel.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            hostel.prop('disabled', true);
            hostel.val(data[0]);
            latitud.val(data[1]);
            longitud.val(data[2]);
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
        var row = dthostel.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            var Hostel = data[0];
            swal({
                    title: "¿Remove?",
                    text: "You really want to delete the selected hostel",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ff1803",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                },
                function() {
                    var starCountRef = firebase.database().ref("Hostel/" + Hostel);
                    starCountRef.remove(function(error) {
                        if (error == null) {
                            swal({
                                title: "Removed!",
                                text: "Hostel deleted successfully",
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
                text: "You really want to delete the selected hostel",
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
            var Hostel = hostel.val().toUpperCase().trim();
            if (accion == lstAcciones.Nuevo) {
                var starCountRef = firebase.database().ref("Hostel/" + Hostel);
                starCountRef.once('value').then(
                    function(snapshot) {
                        if (snapshot.val() == null) {
                            firebase.database().ref('Hostel/' + Hostel).set({
                                Latitud: latitud.val(),
                                Longitud: longitud.val(),
                            });
                            $('#md-insertar').modal('hide');
                            swal({
                                title: "Success!",
                                text: "Hostel saved correctly",
                                type: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#ff1803",
                                confirmButtonText: "Close",
                                closeOnConfirm: false
                            });
                        } else {
                            swal({
                                title: "Warning",
                                text: "Hostel already exists",
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
                firebase.database().ref('Hostel/' + Hostel).set({
                    Latitud: latitud.val(),
                    Longitud: longitud.val(),
                    hostel: hostel.val()
                });
                $('#md-insertar').modal('hide');
                swal({
                    title: "Success!",
                    text: "Hostel Modified correctly",
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
        if (hostel === null) {
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