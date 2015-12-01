
L.mapbox.accessToken = 'pk.eyJ1IjoibW9ybmluZzIxMzkiLCJhIjoiWWpJNloxOCJ9.mpb_pZ7JT8iNsaiu6OpZmA';
var map = L.mapbox.map('map', 'morning2139.kdon049n', { zoomControl: false })
    .setView([42.361, -71.121], 12);

new L.Control.Zoom({ position: 'topright' }).addTo(map);
map.scrollWheelZoom.disable();

//mapboxgl.accessToken = 'pk.eyJ1IjoibW9ybmluZzIxMzkiLCJhIjoiWWpJNloxOCJ9.mpb_pZ7JT8iNsaiu6OpZmA';

// var map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
//     center: [42.361, -71.121], // starting position
//     zoom: 12 // starting zoom
// });