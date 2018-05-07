    var txtNombreUsuario = $("#txtNombreUsuario");

    $(document).ready(function() {
        $("#family").click(function(){
            initMappp();
        });

        $("#project").click(function(){
            initMapp();
        });

        $("#fundation").click(function(){
            initMapppp();
        });

        $("#hostel").click(function(){
            initMappppp();
        });
    });
/*$(document).ready(function() {*/
var map;
function initMapppp() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 6.238, lng: -75.583 }
    });

    var starCountRef = firebase.database().ref("Fundation");
        starCountRef.on("value",
            function(snapshot) {

                
                $.each(snapshot.val(), function(index, value) {
                    /*console.log(Object.keys("Fundation"));
                    console.log(index, value);
                    console.log(index, value);*/
                        var Lon = value.Longitud;
                        var Lat = value.Latitud;
                        var Nam = index;

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



/**/
function initMappppp() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 6.238, lng: -75.583 }
    });

    var starCountRef = firebase.database().ref("Hostel");
        starCountRef.on("value",
            function(snapshot) {

                
                $.each(snapshot.val(), function(index, value) {
                    /*console.log(Object.keys("Fundation"));
                    console.log(index, value);
                    console.log(index, value);*/
                        var Lon = value.Longitud;
                        var Lat = value.Latitud;
                        var Nam = index;

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