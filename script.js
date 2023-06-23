// Openweather api key
const weatherApiKey = '834cd7ee9c2b567e09da3dbdd3485cdc';

// Array met steden gegevens
const steden = [
  { naam: 'Amsterdam', coördinaten: { latitude: 52.379189, longitude: 4.899431 } },
  { naam: 'Rotterdam', coördinaten: { latitude: 51.9225, longitude: 4.47917 } },
  { naam: 'Den Haag', coördinaten: { latitude: 52.0705, longitude: 4.3007 } },
  { naam: 'Utrecht', coördinaten: { latitude: 52.0907, longitude: 5.1214 } },
];

// Leaflet kaart toevoegen
let map = L.map('map').setView([52.3, 5], 7);

// Tilelayer toevoegen aan de kaart
let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

// Huidige temperatuureenheid
let temperatureUnit = 'C'; // Celsius als standaard

// Functie om temperatuur te converteren
function convertTemperature(tempKelvin) {
  if (temperatureUnit === 'C') {
    // Convert van Kelvin naar Celsius
    return (tempKelvin - 273.15).toFixed(1) + ' °C';
  } else {
    // Convert van Kelvin naar Fahrenheit
    return ((tempKelvin - 273.15) * 9 / 5 + 32).toFixed(1) + ' °F';
  }
}

// Functie om markers op de kaart toe te voegen
function addMarkersToMap() {
  // API-verzoek naar Openweathermap voor elke stad in de array
  steden.forEach(stad => {
    const { latitude, longitude } = stad.coördinaten;

    // API-verzoek naar OpenWeatherMap voor temperatuur
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`)
      .then(response => response.json())
      .then(weatherData => {
        // Temperatuur van stad ophalen en converteren
        const temperatureKelvin = weatherData.main.temp;

        // Markerpictogram maken
        const markerIcon = L.icon({
          iconUrl: 'marker.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });

        // Popup met temperatuur maken
        const popupContent = `<div>${stad.naam}<br>Temperatuur: <span class="temperature" data-temperature="${temperatureKelvin}"></span></div>`;

        // Markerpictogram aan de kaart toevoegen
        const marker = L.marker([latitude, longitude], { icon: markerIcon })
          .bindPopup(popupContent)
          .addTo(map);

        // Temperatuurweergave bijwerken
        updateTemperatureDisplay();
      })
      .catch(error => {
        console.log('Fout bij ophalen weergegevens:', error);
      });
  });
}

// Functie om temperatuureenheid te wisselen
function toggleTemperatureUnit() {
  if (temperatureUnit === 'C') {
    temperatureUnit = 'F'; // Wissel naar Fahrenheit
  } else {
    temperatureUnit = 'C'; // Wissel naar Celsius
  }
  updateTemperatureDisplay();
}

// Voeg markers toe aan de kaart nadat de kaart is geïnitialiseerd
addMarkersToMap();

// Voeg eventlistener toe aan de temperatuurwisselknop
const temperatureToggleBtn = document.getElementById('temperature-toggle');
temperatureToggleBtn.addEventListener('click', toggleTemperatureUnit);

// Functie om de temperatuurweergave bij te werken
function updateTemperatureDisplay() {
    const temperatureDisplays = document.getElementsByClassName('temperature');
    if (temperatureDisplays) {
      for (let i = 0; i < temperatureDisplays.length; i++) {
        const display = temperatureDisplays[i];
        const temperatureKelvin = parseFloat(display.dataset.temperature);
        const temperature = convertTemperature(temperatureKelvin);
        display.innerHTML = temperature;
      }
    }
  }
