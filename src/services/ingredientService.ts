import api from './api'

export interface IngredientPayload {
  data: {
    attributes: {
      name?: string
    }
  }
}

export const getIngredients = () => api.get('/api/v1/ingredients')

export const getIngredient = (id: number) => api.get(`/api/v1/ingredients/${id}`)

export const createIngredient = (payload: IngredientPayload) =>
  api.post('/api/v1/ingredients', payload)

export const updateIngredient = (id: number, payload: IngredientPayload) =>
  api.patch(`/api/v1/ingredients/${id}`, payload)

export const deleteIngredient = (id: number) =>
  api.delete(`/api/v1/ingredients/${id}`)
