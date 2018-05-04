var map;

    var txtNombreUsuario = $("#txtNombreUsuario");

    $(document).ready(function() {
        $("#hostel").click(function(){
            initMapp();
        });
        $("#family").click(function(){
            initMap();
        });
    $("#project").click(function(){
        initMappp();
    });
    });
/*$(document).ready(function() {*/
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 6.238, lng: -75.583 }
    });

    var starCountRef = firebase.database().ref("example");
        starCountRef.on("value",
            function(snapshot) {

                
                $.each(snapshot.val(), function(index, value) {
                    /*console.log(Object.keys("example"));
                    console.log(index, value);*/
                    /*console.log(index, value);*/
                        var Lon = value.longitud;
                        var Lat = value.latitud;
                        var Nam = value.nombre;

                            var iconBase = 'img/';
                            var icons = {
                                family: {
                                    icon: iconBase + 'pinF.png'
                                }
                            };

                            var features = [{
                                    position: new google.maps.LatLng(Lat, Lon),
                                    type: 'family'
                            }];

                            // Create markers.
                            features.forEach(function(feature) {
                                var marker = new google.maps.Marker({
                                    position: feature.position,
                                    icon: icons[feature.type].icon,
                                    map: map,
                                    title: Nam,
                                    animation: google.maps.Animation.DROP,
                                    draggable: true,

                                });
                            });
                });
            }
        );

    admin.validarDesconectado();
    //admin.getPerfil(txtNombreUsuario);
}
/*});*/