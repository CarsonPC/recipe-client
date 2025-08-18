import api from './api'

export interface AuthorPayload {
  data: {
    attributes: {
      name?: string
      email?: string
      password?: string
    }
  }
}

export const getAuthors = () => api.get('/api/v1/authors')

export const getAuthor = (id: number) => api.get(`/api/v1/authors/${id}`)

export const createAuthor = (payload: AuthorPayload) => api.post('/api/v1/authors', payload)

export const updateAuthor = (id: number, payload: AuthorPayload) =>
  api.patch(`/api/v1/authors/${id}`, payload)

export const deleteAuthor = (id: number) => api.delete(`/api/v1/authors/${id}`)
