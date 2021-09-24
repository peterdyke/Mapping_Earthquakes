// // Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Satellite: satStreets
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7,-79.3],
    zoom: 11,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let hoodData = "https://raw.githubusercontent.com/peterdyke/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";
// Create a style for the lines.
let myStyle = {
  color: "blue",
  weight: 1,
  opacity: .75,
  fillColor: "yellow"
}

// Grabbing our GeoJSON data.
d3.json(hoodData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    style: myStyle
})
.addTo(map);
});




