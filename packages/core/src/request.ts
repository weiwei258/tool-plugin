import axios from 'axios'
import type FormData from 'form-data'

export const post = async (url: string, formData: FormData) => {
  return await axios.post(url, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
}
