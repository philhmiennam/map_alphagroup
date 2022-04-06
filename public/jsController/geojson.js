/*    var wfsSelangor = new L.featureGroup();

    //get wfs layer from Geoserver
    var url_geoserver_wfs =
        'http://localhost:8686/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=demoloadmap%3Aloadmap01&maxFeatures=50&outputFormat=application%2Fjson';

    var url_wfs_cqlfilter = url_geoserver_wfs + "&cql_filter=STATE_FIPS=";

    //++++++++++++++++++++GET ITEM MAP WITH SELECTED++++++++++++++++++++++++++
    async function getMapWithSelected(url) {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const resp = await fetch(url, requestOptions);
            return resp.json();
        } catch (err) {
            console.log(err);
        }
    }
    // get
    function checkSelectedAddress() {
        var data = document.getElementById('checkMapWith_stateName').value; //get value of state_name
        var url_cql_filter = url_wfs_cqlfilter + "'" + data + "'"; // set url
        getMapWithSelected(url_cql_filter).then(data => {
            var wfsPolylayer = L.geoJSON([data]
                // , {
                // style: function (feature) {
                //     return {
                //         stroke: true,
                //         fillColor: '#B04173',
                //         fillOpacity: 2,
                //         color: '#000000',
                //         weight: 0.5,
                //     };
                // }
                // }
            ).addTo(map);
            map.fitBounds(wfsPolylayer.getBounds());
            //set opacity ???
        });
    }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // ++++++++++++++++++++GET ITEM MAP WITH CHECKBOX+++++++++++++++++++++++++
    //controller of group checkbox + input type range
    var value_convert;

    let object_respdata = [];
    var wfsPolylayer;

    var geoJsonwWsStyle = {
        fillOpacity: 0.2,
        weight: 0.5,
        opacity: 0.2
    }

    function getValueCheckBox(state_fips) {
        // set url
        if (state_fips < 10) {
            var a = state_fips.toString();
            value_convert = "0" + state_fips;
        } else {
            value_convert = state_fips;
        }
        var url_cql_filter = url_wfs_cqlfilter + "'" + value_convert + "'";


        
        // var group = new L.LayerGroup().addTo(map);

        // getMapWithSelected(url_cql_filter).then(data => {
        //     wfsPolylayer = L.geoJSON([data]).addTo(map);
        //     object_respdata.push(wfsPolylayer)
        //     map.fitBounds(wfsPolylayer.getBounds());

        //     var status_checkbox = document.getElementById(value_convert);
        //     if (status_checkbox.checked) {
        //         wfsPolylayer.addTo(map);
        //         map.fitBounds(wfsPolylayer.getBounds());
        //     } else {
        //         map.removeLayer(wfsPolylayer);
        //         wfsPolylayer = {};
        //     }

        //     // //check status checkbox
        //     // var status_checkbox = document.getElementById(value_convert);
        //     // if (status_checkbox.checked == true) {
        //     //     wfsPolylayer = L.geoJSON([data]);
        //     //     //add map
        //     //     wfsPolylayer.addTo(map);
        //     //     map.fitBounds(wfsPolylayer.getBounds());
        //     // } else {
        //     //     map.removeLayer(wfsPolylayer);
        //     // }
        // });
    };


    function getValueDEMO(state_fips, newVal) {
        var valueOpacity = newVal / 100;
    }
    //++++++++++++++++++++++++++++++++++++++++++++++



    //Default in load------------------------------
    //load all data geojson
    async function getWFSgeojson() {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const resp = await fetch(url_geoserver_wfs, requestOptions);
            return resp.json();
        } catch (err) {
            console.log(err);
        }
    }
    getWFSgeojson().then(data => {
        var wfsPolylayer = L.geoJSON([data], {
            onEachFeature: function (feature, layer) {
                // //value of select
                // $('#checkMapWith_stateName').append('<option value="' + feature.properties
                //     .STATE_FIPS + '">' + feature.properties
                //     .STATE_NAME + '</option>');

                // //value of checkbox
                // $('#onLoadCheckBox').append(
                //     '<div class="col-sm-4"> <p> <input id="' + feature.properties.STATE_FIPS +
                //     '" type="checkbox" name="valuecheckbox" onclick="getValueCheckBox(' +
                //     feature.properties.STATE_FIPS + ')">' +
                //     feature.properties.STATE_NAME + '</p>' +
                //     '<input type="range" id="' + feature.properties.STATE_FIPS +
                //     '" min="1" max="100" step="1" oninput="getValueDEMO(' + feature
                //     .properties.STATE_FIPS + ', this.value)" onchange="getValueDEMO(' +
                //     feature.properties.STATE_FIPS + ', this.value)">' +
                //     '</div>');

                // // console.log(feature);
                // var customOptions = {
                //     "maxWidth": "600px",
                //     "className": "customPop"
                // }
                // var popupContent = "<div> <b>" + feature.properties.STATE_NAME + "</b> <br/>" +
                //     feature.properties.STATE_ABBR + "</div>";
                // layer.bindPopup(popupContent, customOptions);
            }
        }).addTo(wfsSelangor);
        map.fitBounds(wfsPolylayer.getBounds());
    });

    //----------------CONTROLLER------------------\\
    //map attributes
    var mAttr = "";
    //------------- Setting map style -----------\\
    //osm tiles
    var osmUrl = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";
    var osm = L.tileLayer(osmUrl, {
        attribution: mAttr
    });

    //cartoDB tiles
    var cartodbUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
    var cartodb = L.tileLayer(cartodbUrl, {
        attribution: cartodbUrl
    });

    //Positron (lite)
    var WorldImageryUrl =
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
    var WorldImagery = L.tileLayer(WorldImageryUrl, {
        attribution: WorldImageryUrl
    });
    //setting base
    var baseLayer = {
        "CartoDB Light": cartodb,
        "OpenStreet Map": osm,
        "WorldImagery Map": WorldImagery
    };
    //----------------------------------------------------------------
    var wfs;

    function openTypeMap() {
        //geoserver setting
        var url_geoserver = "http://localhost:8686/geoserver/topp/wms";

        var optionTileLayer = {
            layers: "topp:states",
            format: "image/png8",
            transparent: true,
            tiled: true,
            opacity: 1.0,
            zIndex: 100,
            attribution: '&copy; topp:states - OpenStreetMap contributors</a>'
        }

        wfs = L.tileLayer.wms(url_geoserver, optionTileLayer).addTo(map);

        this.getMapWithSelected(url_geoserver_wfs).then(data => {
            var wfsPolylayer = L.geoJSON([data], {

                onEachFeature: function (feature, layer) {
                    //value of select
                    $('#checkMapWith_stateName').append('<option value="' + feature.properties
                        .STATE_FIPS + '">' + feature.properties
                        .STATE_NAME + '</option>');

                    //value of checkbox
                    $('#onLoadCheckBox').append(
                        '<div class="col-sm-4"> <p> <input id="' + feature.properties
                        .STATE_FIPS +
                        '" type="checkbox" name="valuecheckbox" onclick="getValueCheckBox(' +
                        feature.properties.STATE_FIPS + ')">' +
                        feature.properties.STATE_NAME + '</p>' +
                        '<input type="range" id="' + feature.properties.STATE_FIPS +
                        '" min="1" max="100" step="1" oninput="getValueDEMO(' + feature
                        .properties.STATE_FIPS + ', this.value)" onchange="getValueDEMO(' +
                        feature.properties.STATE_FIPS + ', this.value)">' +
                        '</div>');
                }
            })
        })
    }

    //set opacity tileLayer
    function getValueOpacity(newVal) {
        document.getElementById("opacity-value").innerHTML = newVal; // get value in input range
        wfs.setOpacity(newVal / 100); //set opacity
    }

    // //geoserver setting
    // var url_geoserver = "http://localhost:8686/geoserver/topp/wms";
    // //------------------LOAD LAYER IN MAP-----------------\\
    // // set option tileLayer
    // var optionTileLayer = {
    //     layers: "topp:states",
    //     format: "image/png8",
    //     transparent: true,
    //     tiled: true,
    //     opacity: 1.0,
    //     zIndex: 100,
    //     attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    // }
    // //get WMS layer from geoserver
    // var wmsUSA = new L.tileLayer.wms(url_geoserver, optionTileLayer);

    // //set opacity tileLayer
    // function getValueOpacity(newVal) {
    //     document.getElementById("opacity-value").innerHTML = newVal; // get value in input range
    //     wmsUSA.setOpacity(newVal / 100); //set opacity
    // }
    //----------------------------------------------------

    // load center map
    var map = L.map("map", {
        center: [39.05, -96.06], //map.getViews().getCenter()
        zoom: 4,
        minZoom: 1,
        maxZoom: 18,
        layers: [WorldImagery]
    });

    // map.fitBounds(wmsUSA.getBounds());
    //over layer
    var overlayMaps = {
        // "USA (WMS)": wmsUSA,
        "Selangor WFS": wfsSelangor
    };

    //add base layer
    var controlLayers = L.control.layers(baseLayer, overlayMaps, {
        collapsed: true
    }).addTo(map);

    //-----------------------PLUGIN----------------------
    // add map scale
    var mapScale = L.control.scale().addTo(map);

    //GET LOCATION
    var lc = L.control.locate({
        position: 'topright',
        strings: {
            title: "Vị trí hiện tại!"
        }
    }).addTo(map);

    //plugin search map
    var lgeocoder = L.Control.geocoder().addTo(map);
    //---------------------------------------------------

    // -----------------SELECT LOCATION MAP-------------------
    map.on('mousemove', function (e) { // detail 
        document.getElementsByClassName('lng')[0]
            .innerHTML = e.latlng.lat
        document.getElementsByClassName('lat')[0]
            .innerHTML = e.latlng.lng
        console.log(e);
    });*/