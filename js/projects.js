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

var map;
window.initMapp = function(){

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 6.238, lng: -75.583 }
    });

    var starCountRef = firebase.database().ref("Project");
        starCountRef.on("value",
            function(snapshot) {
                $.each(snapshot.val(), function(index, value) {
                    var Lon = value.Longitud;
                    var Lat = value.Latitud;
                    var Nam = index;

                    var iconBase = 'img/';
                        var icons = {
                            Proyecto6: {
                                icon: iconBase + 'pinH.png'
                            }
                        };

                    var features = [{
                        position: new google.maps.LatLng(Lat, Lon),
                        type: 'Proyecto6'
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
}