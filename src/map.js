// Mapbox access
L.mapbox.accessToken = 'pk.eyJ1IjoibHVjYW1vaWFuYSIsImEiOiJfeUttT1pzIn0.7_LM4jNrpSFn7a9f6QqiYA';
// Mapbox Outdoor
var mapboxTilesOutdoor = L.tileLayer('https://{s}.tiles.mapbox.com/v3/lucamoiana.lbpoe5b6/{z}/{x}/{y}.png', {
attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a> &#124; <a href="https://sites.google.com/site/5cascine/" target="_blank">GPS data 5 Cascine - Cislago</a>',
minZoom: 13,
maxZoom: 18,
continuousWorld: false,
});
// Map
var map = L.map('map', {zoomControl: false,})
.addLayer(mapboxTilesOutdoor)
.setView([45.642, 8.954], 14);

// Add control and zoom home
var zoomHome = L.Control.zoomHome({position: 'topleft'});
zoomHome.addTo(map);
// Create a layer group
var servizi = new L.LayerGroup();
// Aggiunti marker
// Creare icone
var partenza_icon = L.MakiMarkers.icon({icon: "pitch", color: "#df014a", size: "m"});
var ristoro_icon = L.MakiMarkers.icon({icon: "beer", color: "#75BACA", size: "m"});
var stazione_icon = L.MakiMarkers.icon({icon: "rail", color: "#ab89ab", size: "m"});
var parcheggio_icon = L.MakiMarkers.icon({icon: "parking", color: "4444BB", size: "m"});
var panino_icon = L.MakiMarkers.icon({icon: "fast-food", color: "#75BACA", size: "m"});
var bar_icon = L.MakiMarkers.icon({icon: "bar", color: "#75BACA", size: "m"});
var doccia_icon = L.MakiMarkers.icon({icon: "circle", color: "#75BACA", size: "m"});
//Creati markers
var partenza = L.marker([45.656945208740474, 8.970540960046485], {
  icon: partenza_icon
}).on('mouseover', function() {
  this.bindPopup("<strong>PARTENZA</strong></br>Villa Isacchi</br>dalla 8:00 alle 9:00").openPopup();
}).on('mouseout', function(){this.closePopup();});
partenza.addTo(map);

var ristoro_massina = L.marker([45.63988215475914956, 8.96780776119957501], {
  icon: ristoro_icon
}).on('mouseover', function() {
  this.bindPopup("<img width=210 height=131 src=images/massina.jpg /><br /><strong>Ristoro Massina</strong>").openPopup();
}).on('mouseout', function(){this.closePopup();});
var ristoro_roccolo = L.marker([45.6416612162269, 8.9536514985313], {
  icon: panino_icon
}).on('mouseover', function() {
  this.bindPopup("<img width=210 height=131 src=images/roccolo.jpg><strong><br />Risotoro il Roccolo</strong>").openPopup();
}).on('mouseout', function(){this.closePopup();});
var ristoro_visconta = L.marker([45.6518728319999, 8.94713885797821], {
  icon: bar_icon
}).on('mouseover', function() {
  this.bindPopup("<img width=210 height=141 src=images/visconta.jpg><strong><br />Ristoro Visconta</strong>").openPopup();
}).on('mouseout', function(){this.closePopup();});
var stazione_cislago = L.marker([45.661008099999982, 8.9777585], {icon: stazione_icon}).bindPopup('Stazione di Cislago</br><a href="http://www.trenord.it">orario</a>').addTo(servizi);

// Parcheggi
// Dati GeoJSON
var parcheggi = L.geoJson(parking, {
pointToLayer : function (feature, latlng) {
lat = feature.geometry.coordinates[0];
lng = feature.geometry.coordinates[1];
return L.marker([lng,lat],
{icon: parcheggio_icon}) // NOTA: questa opzione non era presente prima
}
});
parcheggi.addTo(servizi);
<!--Added track from external geojson -->
//track Style
var primostyle = {
"color": "#94D82D",
"weight": 4.5,
"opacity": 0.8,
"z-index": 2,
};
var secondostyle = {
"color": "#E3B62E",
"weight": 4.5,
"opacity": 0.8,
"z-index": 2
};
var terzostyle = {
"color": "#DF014A",
"weight": 4.5,
"opacity": 0.8,
"z-index": 2
};
var quartostyle = {
"color": "#75BACA",
"weight": 4.5,
"opacity": 0.8,
"z-index": 3
};
var chiusuratrafficostyle = {
"weight": 25.0,
"color": '#1f78b4',
"dashArray": '',
"opacity": 0.6,
"fillOpacity": 0.4
};
// track import
var primo = L.geoJson(primo, {style: primostyle}).bindPopup('Percorribile con passeggino');
var secondo = L.geoJson(secondo, {style: secondostyle}).bindPopup('DA TESTARE');
var terzo = L.geoJson(terzo, {style: terzostyle});
var quarto = L.geoJson(quarto, {style: quartostyle}).bindPopup('80% BOSCO');

// var opzione11 = L.geoJson(opzione11, {style: primostyle}).bindPopup('DA TESTARE');

var chiusuratraffico = L.geoJson(exp_chiusuratraffico, {
style: chiusuratrafficostyle
}
).bindPopup('strade chiuse alle auto</br>dalle 7.45 alle 10.00');

// servizi doccia
var doccia = L.marker([45.66445, 8.96610], {
  icon: doccia_icon
}).on('mouseover', function() {
  this.bindPopup('SERVIZIO DOCCIA</br>presso Campo Sportivo').openPopup();
});
var doccia_parcheggio = L.marker([45.66383, 8.96774], {icon: parcheggio_icon});

var doccia_route_style = {
  "color": "#75BACA",
  "weight": 5.5,
  "opacity": 0.8,
  "z-index": 3
  };
var doccia_route = L.geoJson(doccia_route, {style: doccia_route_style});

// Add layers control
var primo_group = L.layerGroup([primo, ristoro_massina]);
var secondo_group = L.layerGroup([secondo, ristoro_massina, ristoro_roccolo]);
var terzo_group = L.layerGroup([terzo, ristoro_massina, ristoro_visconta, ristoro_roccolo]);
var quarto_group = L.layerGroup([quarto, ristoro_massina, ristoro_visconta, ristoro_roccolo]);
var doccia_group = L.layerGroup([doccia, doccia_parcheggio, doccia_route]);

var groupedOverlays = {
"<b>7 Km</b>": primo_group,
"<b>10.99 Km</b>": secondo_group,
"<b>15.99 Km</b>": terzo_group,
"<b>20.99 Km</b>": quarto_group
};
var groupedOverlays2 = {
"come raggiungerci": servizi,
"chiusura traffico": chiusuratraffico,
"servizio doccia": doccia_group
};
var options = { exclusiveGroups: ["Percorsi"] };
L.control.layers(groupedOverlays, groupedOverlays2,{collapsed: false}).addTo(map);

<!-- set MaxBounds -->


<!-- eventi per zoom chiusura traffico-->
var trafficobounds = chiusuratraffico.getBounds();
map.on('layeradd', function(e) {
if (map.hasLayer(chiusuratraffico) == true) {
map.fitBounds(trafficobounds);
};
});

map.on('layerremove', function(e) {
if (map.hasLayer(chiusuratraffico) == false) {
map.setView([45.642, 8.954], 14);
};
});

<!-- eventi per zoom servizio doccia-->
var docciabounds = doccia_route.getBounds();
map.on('layeradd', function(e) {
if (map.hasLayer(doccia_group) == true) {
map.fitBounds(docciabounds);
};
});

map.on('layerremove', function(e) {
if (map.hasLayer(doccia_group) == false) {
map.setView([45.642, 8.954], 14);
};
});


<!-- Add LOGO -->

var info = L.control({position: 'bottomleft'});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    return this._div;
};
info.addTo(map);
info._div.innerHTML = '<img src="https://sites.google.com/site/5cascine/_/rsrc/1297459381504/chi-siamo/logo_uff_medium.jpg" alt="Logo" height="100" width="87">';

// set maxBounds
var bounds = L.featureGroup([quarto, doccia, doccia_parcheggio, doccia_route])
map.setMaxBounds(bounds.getBounds(), {
    padding: [6000, 6000]
});
