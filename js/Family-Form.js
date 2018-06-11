$(document).ready(function() {
    /*Botones de Agregar nuevo registro - Editar Registro - Eliminar registro*/
    var btnInsertar = $("#btnInsertar");
    var btnEliminar = $("#btnEliminar");
    var btnModificar = $("#btnModificar");

    /*Botones de la ventana de modal*/
    var btnGuardar = $("#btnGuardar");
    var btnCancelar = $("#btnCancelar");

    /*Campos de el formulario de la modal*/
    var family = $("#family");
    var neighborhood = $("#neighborhood");
    var address = $("#address");
    var phone = $("#phone");
    var email = $("#email");
    var latitud = $("#latitud");
    var longitud = $("#longitud");


    /*se inicializa la datatable*/
    var dtfamily = $("#dtfamily").DataTable({
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
        /*Inicio de la tabla*/
    var accion;
    var starCountRef = firebase.database().ref("Family");
    starCountRef.on("value",
        function(snapshot) {
            dtfamily.clear().draw();
            if (snapshot.val() != null) {
                $.each(snapshot.val(), function(index, value) {
                    var row = dtfamily.row.add([index,
                            value.Neighborhood,
                            value.Address,
                            value.Phone,
                            value.Email,
                            value.Latitud,
                            value.Longitud
                        ])
                        .draw()
                        .node();
                });
            }
        }
    );
    /*Inicio de la tabla*/

    /*Limpiar campos del formulario*/
    var Limpiar = function() {
        family.val("");
        neighborhood.val("");
        address.val("");
        phone.val("");
        email.val("");
        latitud.val("");
        longitud.val("");
    };
    /*Fin Limpiar campos del formulario*/

    /*Inicio de validación que no se envien vacios*/
    var Validar = function() {
            if (family.val() == "") {
                swal({
                    title: "Warning",
                    text: "Enter the name of the family",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ff1803",
                    confirmButtonText: "Close",
                    closeOnConfirm: false
                });
                return false;
            } else if (neighborhood.val() == "") {
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
            } else if (address.val() == "") {
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
            } else if (phone.val() == "") {
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
            } else if (email.val() == "") {
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
            } else if (latitud.val() == "") {
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
        /*Fin validación que no se envien vacios*/

    /*Boton Insertar*/
    btnInsertar.on("click", function(e) {
        accion = lstAcciones.Nuevo;
        Limpiar();
        family.prop('disabled', false);
        $("#exampleRadios2").prop("checked", true);
        $('#btnGuardar').attr("disabled", true);
        $('#md-insertar').modal('show');
    });
    /**/

    /*Modificar*/
    btnModificar.on("click", function(e) {

        $("#exampleRadios2").prop("checked", true);
        $('#btnGuardar').attr("disabled", true);

        accion = lstAcciones.Modificar;
        var row = dtfamily.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            family.prop('disabled', true);
            family.val(data[0]);
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
    /**/

    /*Inicio de Eliminar*/
    btnEliminar.on("click", function(e) {
        var row = dtfamily.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            var Family = data[0];
            swal({
                    title: "¿Remove?",
                    text: "You really want to delete the selected family",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ff1803",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                },
                function() {
                    var starCountRef = firebase.database().ref("Family/" + Family);
                    starCountRef.remove(function(error) {
                        if (error == null) {
                            swal({
                                title: "Removed!",
                                text: "Family deleted successfully",
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
                text: "You really want to delete the selected family",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            });
        }
    });
    /*Fin de Eliminar*/

    /*Inicio de Guardar*/
    btnGuardar.on("click", function(e) {

        var longitudnum = parseInt($('#longitud').val());

        if (longitudnum <= -0) {
            if (Validar()) {
                var Family = family.val().toUpperCase().trim();
                if (accion == lstAcciones.Nuevo) {
                    var starCountRef = firebase.database().ref("Family/" + Family);
                    starCountRef.once('value').then(
                        function(snapshot) {
                            if (snapshot.val() == null) {
                                firebase.database().ref('Family/' + Family).set({
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
                                    text: "Family saved correctly",
                                    type: "success",
                                    showCancelButton: true,
                                    confirmButtonColor: "#ff1803",
                                    confirmButtonText: "Close",
                                    closeOnConfirm: false
                                });
                            } else {
                                swal({
                                    title: "Warning",
                                    text: "Family already exists",
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
                    firebase.database().ref('Family/' + Family).set({
                        Latitud: latitud.val(),
                        Neighborhood: neighborhood.val(),
                        Address: address.val(),
                        Phone: phone.val(),
                        Email: email.val(),
                        Longitud: longitud.val(),
                        family: family.val()
                    });
                    $('#md-insertar').modal('hide');
                    swal({
                        title: "Success!",
                        text: "Family Modified correctly",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#ff1803",
                        confirmButtonText: "Close",
                        closeOnConfirm: false
                    });
                }
            }
        }else{
                $('#longitud').val("");
                swal({
                        title: "Warning!",
                        text: "The length field must start with -75",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#ff1803",
                        confirmButtonText: "Close",
                        closeOnConfirm: false
                });
        }

    });
    /*Fin de Guardar*/

    var validate_id = (mensaje, e) => {
        if (family === null) {
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

    admin.validarDesconectado();
});