import api from './api'

export interface StepPayload {
  data: {
    attributes: {
      step?: number
      description?: string
      optional?: boolean
    }
    relationships?: {
      recipe?: {
        data: {
          attributes: {
            id: number
          }
        }
      }
    }
  }
}

export const getSteps = () => api.get('/api/v1/steps')

export const getStep = (id: number) => api.get(`/api/v1/steps/${id}`)

export const createStep = (payload: StepPayload) => api.post('/api/v1/steps', payload)

export const updateStep = (id: number, payload: StepPayload) =>
  api.patch(`/api/v1/steps/${id}`, payload)

export const deleteStep = (id: number) => api.delete(`/api/v1/steps/${id}`)
