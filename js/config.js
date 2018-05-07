$(document).ready(function() {
    /*Botones de Agregar nuevo registro - Editar Registro - Eliminar registro*/
    var btnInsertar = $("#btnInsertar");
    var btnEliminar = $("#btnEliminar");
    var btnModificar = $("#btnModificar");

    /*Botones de la ventana de modal*/
    var btnGuardar = $("#btnGuardar");
    var btnCancelar = $("#btnCancelar");

    /*Campos de el formulario de la modal*/
    var trainee = $("#trainee");
    var neighborhood = $("#neighborhood");
    var address = $("#address");
    var phone = $("#phone");
    var email = $("#email");
    var family = $("#family");
    var project = $("#project");
    var fundation = $("#fundation");

    /*se inicializa la datatable*/
    var dtexample = $("#dtexample").DataTable({
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
    var starCountRef = firebase.database().ref("example");
    starCountRef.on("value",
        function(snapshot) {
            dtexample.clear().draw();
            if (snapshot.val() != null) {
                $.each(snapshot.val(), function(index, value) {
                    var row = dtexample.row.add([index, 
                                                value.Neighborhood, 
                                                value.Address, 
                                                value.Phone, 
                                                value.Email, 
                                                value.family, 
                                                value.project,
                                                value.fundation])
                        .draw()
                        .node();
                });
            }
        }
    );
    /*Inicio de la tabla*/

    /*Limpiar campos del formulario*/
    var Limpiar = function() {
        trainee.val("");
        neighborhood.val("");
        address.val("");
        phone.val("");
        email.val("");
        family.val("");
        project.val("");
        fundation.val("");
    };
    /*Fin Limpiar campos del formulario*/

    /*Inicio de validación que no se envien vacios*/
    var Validar = function() {
        if (trainee.val() == "") {
            swal({
                title: "Warning",
                text: "Enter the apprentice's name",
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
        }else if (family.val() === "Select_Family") {
            swal({
                title: "Warning",
                text: "Select Family",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff1803",
                confirmButtonText: "Close",
                closeOnConfirm: false
            });
            return false;
        } else if (project.val() === "Select_Project") {
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
        } else if (fundation.val() == "Select_Fundation") {
            swal({
                title: "Warning",
                text: "Select Fundation",
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
        trainee.prop('disabled', false);
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

        var starCountRef = firebase.database().ref("Family");
          starCountRef.on("value",
            function(snapshot) {
                $('#family >option').remove();
                $('#family').append('<option value="Select_Family">Select Family</option>');
                $.each(snapshot.val(), function(index, value) {
                        $('#family').append($('<option>', { 
                          value: index,
                          text : index 
                        }));
                });
            }
        );

        var starCountRef = firebase.database().ref("Fundation");
          starCountRef.on("value",
            function(snapshot) {
                $('#fundation >option').remove();
                $('#fundation').append('<option value="Select_Fundation">Select Fundation</option>');
                $.each(snapshot.val(), function(index, value) {
                        $('#fundation').append($('<option>', { 
                          value: index,
                          text : index 
                        }));
                });
            }
        );
    });
    /*Fin Boton Insertar*/

    /*Modificar*/
    btnModificar.on("click", function(e) {

        $("#exampleRadios2").prop("checked", true);
        $('#btnGuardar').attr("disabled", true);

        accion = lstAcciones.Modificar;
        var row = dtexample.row(".selected");
        
        var starCountRef = firebase.database().ref("Project");
          starCountRef.on("value",
            function(snapshot) {
                $('#project >option').remove();
                $.each(snapshot.val(), function(index, value) {
                        $('#project').append($('<option>', { 
                          value: index,
                          text : index 
                        }));
                });
            }
        );

        var starCountRef = firebase.database().ref("Family");
          starCountRef.on("value",
            function(snapshot) {
                $('#family >option').remove();
                $.each(snapshot.val(), function(index, value) {
                        $('#family').append($('<option>', { 
                          value: index,
                          text : index 
                        }));
                });
            }
        );

        if (row.length > 0) {
            var data = row.data();
            trainee.prop('disabled', true);
            trainee.val(data[0]);
            neighborhood.val(data[1]);
            address.val(data[2]);
            phone.val(data[3]);
            email.val(data[4]);
            family.val(data[5]);
            project.val(data[6]);
            fundation.val(data[7]);
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
        var row = dtexample.row(".selected");
        if (row.length > 0) {
            var data = row.data();
            var Example = data[0];
            swal({
                    title: "¿Remove?",
                    text: "You really want to delete the selected coordinate",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ff1803",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                },
                function() {
                    var starCountRef = firebase.database().ref("example/" + Example);
                    starCountRef.remove(function(error) {
                        if (error == null) {
                            swal({
                                title: "Removed!",
                                text: "Coordinate deleted successfully",
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
                text: "You really want to delete the selected coordinate",
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
            var Example = trainee.val().toUpperCase().trim();
            if (accion == lstAcciones.Nuevo) {
                var starCountRef = firebase.database().ref("example/" + Example);
                starCountRef.once('value').then(
                    function(snapshot) {
                        if (snapshot.val() == null) {
                            firebase.database().ref('example/' + Example).set({
                                trainee: trainee.val(),
                                Neighborhood: neighborhood.val(),
                                Address: address.val(),
                                Phone: phone.val(),
                                Email: email.val(),
                                family: family.val(),
                                project: project.val(),
                                fundation: fundation.val(),
                            });
                            $('#md-insertar').modal('hide');
                            swal({
                                title: "Success!",
                                text: "Coordinate saved correctly",
                                type: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#ff1803",
                                confirmButtonText: "Close",
                                closeOnConfirm: false
                            });
                        } else {
                            swal({
                                title: "Warning",
                                text: "Coordinate already exists",
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
                firebase.database().ref('example/' + Example).set({
                    trainee: trainee.val(),
                    Neighborhood: neighborhood.val(),
                    Address: address.val(),
                    Phone: phone.val(),
                    Email: email.val(),
                    family: family.val(),
                    project: project.val(),
                    fundation: fundation.val()
                });
                $('#md-insertar').modal('hide');
                swal({
                    title: "Success!",
                    text: "Coordinate Modified correctly",
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
        if (trainee === null) {
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