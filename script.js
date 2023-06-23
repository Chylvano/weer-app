let mapOptions = {
    center: [51.958, 9.141],
    zoom: 10
}


let map = new L.map('map', mapOptions);

let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);