const LONDON_COORDS = [51.505, -0.09]

export const map = L.map('map').setView(LONDON_COORDS, 2)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 15,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)
