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
var partenza_icon = L.MakiMarkers.icon({icon: "pitch", color: "#EA3556", size: "m"});
var ristoro_icon = L.MakiMarkers.icon({icon: "beer", color: "#55BBEE", size: "m"});
var stazione_icon = L.MakiMarkers.icon({icon: "rail", color: "#ab89ab", size: "m"});
var parcheggio_icon = L.MakiMarkers.icon({icon: "parking", color: "4444BB", size: "m"});
var panino_icon = L.MakiMarkers.icon({icon: "fast-food", color: "#55BBEE", size: "m"});
var bar_icon = L.MakiMarkers.icon({icon: "bar", color: "#55BBEE", size: "m"});
var doccia_icon = L.MakiMarkers.icon({icon: "circle", color: "#55BBEE", size: "m"});
//Creati markers
var partenza = L.marker([45.656945208740474, 8.970540960046485], {
  icon: partenza_icon
}).on('mouseover', function() {
  this.bindPopup("<strong>PARTENZA</strong></br>Villa Isacchi</br>dalla 8:00 alle 9:00").openPopup();
}).on('mouseout', function(){this.closePopup();});
partenza.addTo(map);

var ristoro_massina = L.marker([45.6398993999927, 8.9654026], {
  icon: ristoro_icon
}).on('mouseover', function() {
  this.bindPopup("<img width=210 height=131 src=images/massina.jpg /><br /><strong>Ristoro Massina</strong>").openPopup();
}).on('mouseout', function(){this.closePopup();});
var ristoro_roccolo = L.marker([45.641661216226915, 8.953651498531297], {
  icon: panino_icon
}).on('mouseover', function() {
  this.bindPopup("<img width=210 height=131 src=images/roccolo.jpg><strong><br />Risotoro il Roccolo</strong>").openPopup();
}).on('mouseout', function(){this.closePopup();});
var ristoro_visconta = L.marker([45.651872831999938, 8.947138857978208], {
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
var cortostyle = {
"color": "#BB2233",
"weight": 4.5,
"opacity": 0.8,
"z-index": 2,
};
var mediostyle = {
"color": "#4444BB",
"weight": 4.5,
"opacity": 0.8,
"z-index": 2
};
var lungostyle = {
"color": "#779900",
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
var lungo = L.geoJson(lungo, {style: lungostyle}).bindPopup('80% BOSCO');
var medio = L.geoJson(medio, {style: mediostyle});
var corto = L.geoJson(corto, {style: cortostyle}).bindPopup('Percorribile con passeggino');
var opzione10 = L.geoJson(opzione10, {style: cortostyle}).bindPopup('DA TESTARE');
var opzione11 = L.geoJson(opzione11, {style: cortostyle}).bindPopup('DA TESTARE');

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
  "color": "#55BBEE",
  "weight": 5.5,
  "opacity": 0.8,
  "z-index": 3
  };
var doccia_route = L.geoJson(doccia_route, {style: doccia_route_style});

// Add layers control
var corto_group = L.layerGroup([corto, ristoro_massina]);
var medio_group = L.layerGroup([medio, ristoro_massina, ristoro_visconta, ristoro_roccolo]);
var lungo_group = L.layerGroup([lungo, ristoro_massina, ristoro_visconta, ristoro_roccolo]);
var opzione_10_group = L.layerGroup([opzione10, ristoro_massina, ristoro_visconta, ristoro_roccolo]);
var opzione_11_group = L.layerGroup([opzione11, ristoro_massina, ristoro_visconta, ristoro_roccolo]);
var doccia_group = L.layerGroup([doccia, doccia_parcheggio, doccia_route]);

var groupedOverlays = {
"<b>7,5 Km</b>": corto_group,
"<b>15,5 Km</b>": medio_group,
"<b>20,5 Km</b>": lungo_group,
"<b>10,5 Km</b>": opzione_10_group,
"<b>11,5 Km</b>": opzione_11_group
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
