$(document).ready(function() {
        $("#family").click(function() {
            initMap();
        });

        $("#project").click(function() {
            initMapp();
        });

        $("#fundation").click(function() {
            initMappp();
        });

        $("#hostel").click(function() {
            initMapppp();
        });
    });


    var map;

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: { lat: 6.238, lng: -75.583 }
        });

        var starCountRef = firebase.database().ref("Family");
        starCountRef.on("value",
            function(snapshot) {

            var canFamily = Object.keys(snapshot.val()).length;
            swal({
                title: canFamily,
                text: "Global families saved",
                type: "success",
            });

                $.each(snapshot.val(), function(index, value) {
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
    }
    /**/
    var map;
    window.initMapp = function() {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: { lat: 6.238, lng: -75.583 }
            });

            var starCountRef = firebase.database().ref("Project");
            starCountRef.on("value",
                function(snapshot) {

                var canProject = Object.keys(snapshot.val()).length;
                swal({
                    title: canProject,
                    text: "Projects saved",
                    type: "success",
                });

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
        /**/
    var map;

    function initMappp() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: { lat: 6.238, lng: -75.583 }
        });

        var starCountRef = firebase.database().ref("Fundation");
        starCountRef.on("value",
            function(snapshot) {

                var canFundation = Object.keys(snapshot.val()).length;
                swal({
                    title: canFundation,
                    text: "Fundations saved",
                    type: "success",
                });

                $.each(snapshot.val(), function(index, value) {
                    var Lon = value.Longitud;
                    var Lat = value.Latitud;
                    var Nam = index;

                    var iconBase = 'img/';
                    var icons = {
                        family: {
                            icon: iconBase + 'pinP.png'
                        }
                    };

                    var features = [{
                        position: new google.maps.LatLng(Lat, Lon),
                        type: 'family'
                    }];

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
    }

    /**/
    function initMapppp() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: { lat: 6.238, lng: -75.583 }
        });

        var starCountRef = firebase.database().ref("Hostel");
        starCountRef.on("value",
            function(snapshot) {

                var canHostel = Object.keys(snapshot.val()).length;
                swal({
                    title: canHostel,
                    text: "Fundations saved",
                    type: "success",
                });

                $.each(snapshot.val(), function(index, value) {
                    var Lon = value.Longitud;
                    var Lat = value.Latitud;
                    var Nam = index;

                    var iconBase = 'img/';
                    var icons = {
                        family: {
                            icon: iconBase + 'pinFu.png'
                        }
                    };

                    var features = [{
                        position: new google.maps.LatLng(Lat, Lon),
                        type: 'family'
                    }];

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
    }