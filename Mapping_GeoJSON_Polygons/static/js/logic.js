// // Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let dayNav = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "navigation-day-v1",
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let nightNav = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "navigation-night-v1",
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Day: dayNav,
    Night: nightNav
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44, -80],
    zoom: 2,
    layers: [nightNav]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let routeData = "https://raw.githubusercontent.com/peterdyke/Mapping_Earthquakes/Mapping_GeoJSON_Points/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(routeData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: myStyle,
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h3> Airline: " + feature.properties.airline + 
    "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");
  }
})
.addTo(map);
});




