import axios from 'axios'

const BASE_URL = 'http://localhost:4441/places'

export const placesService = {
  async getAll() {
    try {
      const { data } = await axios.get(BASE_URL)

      return data
    } catch (error) {
      console.log(error)
    }
  },

  async postOne(place) {
    try {
      const { data } = await axios.post(BASE_URL, place)

      return data
    } catch (error) {
      console.log(error)
    }
  },
}
