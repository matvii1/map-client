import { placesService } from './api.js'
import { map } from './map.js'
import './style.css'
const form = document.querySelector('.form')

const popup = document.querySelector('.popup')
const popupText = popup.querySelector('.popup-text')

const allPlaces = await placesService.getAll()
setMarkers(allPlaces)

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const allPlaces = await placesService.getAll()

  const formData = Object.fromEntries(new FormData(form).entries())
  const lat = Number(formData.latitude)
  const lon = Number(formData.longitude)

  if (isNaN(lon) || isNaN(lat)) {
    toast('Latitude and longitude should be a valid number')

    return
  }

  if (lat < -90 || lat > 90) {
    toast('Latitude is specified in degrees within the range [-90, 90]')

    return
  }

  if (lon < -180 || lon > 180) {
    toast('Longitude is specified in degrees within the range [-180, 180).')

    return
  }

  let newId = 1
  if (allPlaces.length > 0) {
    newId = allPlaces.at(-1).id + 1
  }

  const newPlace = {
    id: newId,
    longitude: formData.longitude,
    latitude: formData.latitude,
    ...formData,
  }

  await placesService.postOne(newPlace)

  setMarker(newPlace)
  form.reset()
})

async function setMarker(place) {
  const marker = L.marker([place.longitude, place.latitude]).addTo(map)

  marker.bindPopup(`<b>${place.name}</b><br>${place.description}.`)
}

async function setMarkers(places) {
  places.forEach((place) => {
    const marker = L.marker([place.longitude, place.latitude]).addTo(map)
    marker.bindPopup(`<b>${place.name}</b><br>${place.description}.`)
  })
}

function toast(text) {
  popup.classList.add('popup-active')
  popupText.textContent = text

  setTimeout(() => {
    popup.classList.remove('popup-active')
  }, 4000)
}
