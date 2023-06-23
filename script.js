// Openweather api key
const apiKey = '834cd7ee9c2b567e09da3dbdd3485cdc';

// Coordinaten van Nederland
const nederlandCoords = {
  latitude: 52.3,
  longitude: 5
};

// Leaflet kaart toevoegen
let map = L.map('map').setView([nederlandCoords.latitude, nederlandCoords.longitude], 7);

// Tilelayer toevoegen aan de kaart
let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

// API verzoek naar Openweathermap
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${nederlandCoords.latitude}&lon=${nederlandCoords.longitude}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Temperatuur van Nederland ophalen
    const temperature = data.main.temp;
    
    // Markerpictogram maken
    const markerIcon = L.icon({
      iconUrl: 'marker.png', // Voeg hier het pad naar je aangepaste markerpictogram toe
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
    
    // Popup met temperatuur maken
    const popupContent = `<div>Temperatuur: ${temperature} °C</div>`;
    const popupOptions = {
      className: 'custom-popup'
    };
    const popup = L.popup(popupOptions).setContent(popupContent);
    
    // Markeringen toevoegen aan de kaart op de coordinaten van grote steden in nederland
    const marker = L.marker([nederlandCoords.latitude, nederlandCoords.longitude], { icon: markerIcon })
      .addTo(map)
      .bindPopup(popup)
      .openPopup();
  })
  .catch(error => {
    console.error('Er is een fout opgetreden bij het ophalen van de weergegevens:', error);
  });
